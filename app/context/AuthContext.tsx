"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";

import {
  getStoredToken,
  loginSideEffects,
  restoreLoginSideEffects,
  logoutSideEffects,
  pickTokenFromResponse,
} from "../lib/api/auth/auth.helpers";

import {
  fetchBootstrap,
  fetchMyApiKey,
  apiLogin,
  apiRegister,
  verifyMfaLogin as apiVerifyMfaLogin,
  invalidateAuthCache,
} from "../lib/api/auth/auth.api";

import type { AuthUser, AuthContextValue } from "../lib/api/auth/auth.types";

// ─── MFA error type ───────────────────────────────────────────────────────────
//
// apiLogin() can now return { mfa_required: true, challenge_id } instead
// of a token. login() below throws THIS specific error type in that
// case so the login form can catch it and show a "enter your code"
// step, instead of it looking like a generic "login failed" error.

export class MfaRequiredError extends Error {
  challengeId: string;

  constructor(challengeId: string) {
    super("MFA verification required");
    this.name = "MfaRequiredError";
    this.challengeId = challengeId;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser]               = useState<AuthUser | null>(null);
  const [apiKey, setApiKey]           = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const mountedRef = useRef(true);
  const bootRef    = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  // ── Boot ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (bootRef.current) return;
    bootRef.current = true;

    const token = getStoredToken();

    if (!token) {
      logoutSideEffects();
      if (mountedRef.current) {
        setUser(null);
        setApiKey(null);
        setLoadingUser(false);
      }
      return;
    }

    // Restore existing browser session without destroying
    // the workspace explicitly selected by this same identity.
    restoreLoginSideEffects(token);

    let cancelled = false;

    (async () => {
      try {
        const bootstrap = await fetchBootstrap();

        if (!bootstrap) {
          if (mountedRef.current) setLoadingUser(false);
          return;
        }

        if (cancelled || !mountedRef.current) return;

        // OAuth/account switch may have replaced the JWT while this
        // bootstrap request was in flight. Never allow a response
        // belonging to the previous identity to overwrite the new one.
        if (getStoredToken() !== token) {
          console.log("[Auth] Ignoring stale bootstrap after token change");
          return;
        }

        setUser(bootstrap.user);
        setLoadingUser(false);

        const k = await fetchMyApiKey();
        if (cancelled || !mountedRef.current) return;
        setApiKey(k);

      } catch (error: any) {
        if (cancelled || !mountedRef.current) return;

        if (axios.isAxiosError(error) && error.response?.status === 401) {
          logoutSideEffects();
          invalidateAuthCache();
          setUser(null);
          setApiKey(null);
        } else {
          setUser(null);
          setApiKey(null);
        }

        setLoadingUser(false);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  // ── Helpers ───────────────────────────────────────────────────────────────

  async function refreshMeAndKeys() {
    const bootstrap = await fetchBootstrap(true);
    if (!bootstrap || !mountedRef.current) return;
    setUser(bootstrap.user);

    const k = await fetchMyApiKey(true);
    if (!mountedRef.current) return;
    setApiKey(k);
  }

  async function setAuthFromToken(token: string) {
    if (!token) throw new Error("Missing token");

    loginSideEffects(token);
    if (mountedRef.current) setLoadingUser(true);

    try {
      await refreshMeAndKeys();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        logoutSideEffects();
        invalidateAuthCache();
        if (mountedRef.current) {
          setUser(null);
          setApiKey(null);
        }
      }
      throw error;
    } finally {
      if (mountedRef.current) setLoadingUser(false);

    }
  }

  async function login(email: string, password: string) {
    const data = await apiLogin(email, password);

    // 🔧 NEW: the backend now returns this shape instead of a token
    // when the account has MFA enabled. Thrown as a typed error so
    // the login form can specifically catch MfaRequiredError and
    // show a code-entry step, rather than a generic failure message.
    if (data?.mfa_required) {
      if (!data?.challenge_id) {
        throw new Error("Server indicated MFA is required but returned no challenge_id");
      }
      throw new MfaRequiredError(data.challenge_id);
    }

    const token = pickTokenFromResponse(data);
    if (!token) throw new Error("No access token returned from backend");
    await setAuthFromToken(token);
  }

  // 🔧 NEW: second half of the MFA login flow — called by the login
  // form once the user submits their TOTP/backup code, using the
  // challengeId carried on the MfaRequiredError caught from login().
  async function verifyMfaLogin(challengeId: string, code: string) {
    const data  = await apiVerifyMfaLogin(challengeId, code);
    const token = pickTokenFromResponse(data);
    if (!token) throw new Error("No access token returned from backend");
    await setAuthFromToken(token);
  }

  async function register(email: string, password: string, fullName?: string) {
  const data = await apiRegister(email, password, fullName ?? "");
  const token = pickTokenFromResponse(data);

  if (!token) {
    await login(email, password);
    return;
  }

  await setAuthFromToken(token);
}

  function logout() {
    logoutSideEffects();
    invalidateAuthCache();
    if (mountedRef.current) {
      setUser(null);
      setApiKey(null);
      setLoadingUser(false);
    }
  }

  // ── Value ─────────────────────────────────────────────────────────────────

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      apiKey,
      loadingUser,
      login,
      verifyMfaLogin,
      register,
      logout,
      setAuthFromToken,
      refreshMeAndKeys,
    }),
    [user, apiKey, loadingUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}