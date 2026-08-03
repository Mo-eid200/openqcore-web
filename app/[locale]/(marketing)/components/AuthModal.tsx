"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion }                        from "framer-motion";
import Image                                              from "next/image";
import { X, ShieldCheck, ArrowLeft }                      from "lucide-react";
import { createPortal }                                  from "react-dom";
import { useTranslations }                                from "next-intl";

import { useAuth, MfaRequiredError }                      from "../../../context/AuthContext";
import {
  ensureWorkspaceLoaded,
  getStoredWorkspace,
  setStoredContext,
}                                                        from "../../../lib/api/core/qxtClient";

// ─── Types ────────────────────────────────────────────────────────────────────

type AuthMode = "signin" | "signup";

type Props = {
  open:     boolean;
  onClose:  () => void;
  onSuccess?: () => void; // callback after successful login - no redirect
};

// ─── Input style ─────────────────────────────────────────────────────────────

const inputCls = `
  w-full h-11 px-4 rounded-xl outline-none
  border border-white/10 bg-white/5
  text-white text-[15px] font-medium
  focus:border-[#d4af37] transition
`;

// 🎨 REDESIGN: OAuth buttons now use a small transparent SVG mark in a
// compact icon chip instead of a full-size GIF (which had a baked-in
// white background clashing with the dark/gold theme). The button
// itself stays consistent with the rest of the site's secondary-
// button style (dark, bordered, subtle hover) — only the small icon
// chip is light, since brand marks like Google's need a light
// background to render their real colors correctly. This is the same
// "icon chip + label" pattern already used in ProductLink/RuntimeSection.
const oauthButtonCls = `
  group flex items-center gap-3 w-full rounded-xl
  border border-white/10 bg-white/[0.03]
  px-3.5 py-2.5 transition-all duration-200
  hover:border-white/20 hover:bg-white/[0.06]
`;

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-4 w-4">
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg viewBox="0 0 23 23" className="h-4 w-4">
      <rect x="1" y="1" width="10" height="10" fill="#f25022" />
      <rect x="12" y="1" width="10" height="10" fill="#7fba00" />
      <rect x="1" y="12" width="10" height="10" fill="#00a4ef" />
      <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function WorkspaceModal({ open, onClose, onSuccess }: Props) {
  const t = useTranslations("auth_modal");
  const { login, register, verifyMfaLogin, loadingUser } = useAuth();

  const [mode,            setMode]            = useState<AuthMode>("signin");
  const [fullName,        setFullName]        = useState("");
  const [email,           setEmail]           = useState("");
  const [password,        setPassword]        = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [submitting,      setSubmitting]      = useState(false);
  const [errorMsg,        setErrorMsg]        = useState<string | null>(null);

  // MFA step state. When set, the form on the right swaps from
  // email/password to a single code field. The rest of the modal
  // (left panel, backdrop, close button) is unchanged.
  const [mfaChallengeId, setMfaChallengeId] = useState<string | null>(null);
  const [mfaCode,        setMfaCode]        = useState("");

  const isMounted  = useRef(true);
  const isSignin   = mode === "signin";
  const isMfaStep  = mfaChallengeId !== null;

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  // ── Body lock ─────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // ── ESC ───────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // ── Reset on close ────────────────────────────────────────────────────────

  useEffect(() => {
    if (!open) {
      setSubmitting(false);
      setErrorMsg(null);
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      setFullName("");
      setMfaChallengeId(null);
      setMfaCode("");
    }
  }, [open]);

  // ── Shared post-auth-success flow (used by both normal login and
  //    the MFA verify step) ────────────────────────────────────────

  async function finishLogin() {
    const workspaceId = await ensureWorkspaceLoaded();

    if (workspaceId) {
      setStoredContext({ spaceType: "workspace", workspaceId });
    } else {
      setStoredContext({ spaceType: "personal", workspaceId: null, companyId: null });
    }

    const storedWorkspace = getStoredWorkspace();
    if (storedWorkspace) {
      setStoredContext({ spaceType: "workspace", workspaceId: storedWorkspace });
    }

    if (!isMounted.current) return;

    onSuccess?.();
    onClose();
  }

  // ── Submit (sign in / sign up) ───────────────────────────────────────────

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (loadingUser || submitting) return;

    setErrorMsg(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass  = password;

    if (!cleanEmail || !cleanPass) {
      setErrorMsg(t("errors.missing_fields"));
      return;
    }

    if (!isSignin) {
      if (cleanPass.length < 8) {
        setErrorMsg(t("errors.password_too_short"));
        return;
      }
      if (cleanPass !== passwordConfirm) {
        setErrorMsg(t("errors.password_mismatch"));
        return;
      }
    }

    try {
      setSubmitting(true);

      if (isSignin) {
        await login(cleanEmail, cleanPass);
      } else {
        await register(
          cleanEmail,
          cleanPass,
          fullName.trim()
        );
      }

      await finishLogin();

    } catch (err: any) {
      if (!isMounted.current) return;

      // Don't show this as a generic error — swap the form to the
      // MFA code step instead.
      if (err instanceof MfaRequiredError) {
        setMfaChallengeId(err.challengeId);
        setErrorMsg(null);
        return;
      }

      setErrorMsg(
        err?.response?.data?.error?.message ||
        err?.response?.data?.detail?.message ||
        err?.message ||
        t("errors.auth_failed")
      );
    } finally {
      if (isMounted.current) setSubmitting(false);
    }
  }

  // ── Submit (MFA code) ────────────────────────────────────────────────────

  async function handleMfaSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting || !mfaChallengeId) return;

    const cleanCode = mfaCode.trim();
    if (!cleanCode) {
      setErrorMsg(t("errors.mfa_code_required"));
      return;
    }

    setErrorMsg(null);

    try {
      setSubmitting(true);
      await verifyMfaLogin(mfaChallengeId, cleanCode);
      await finishLogin();
    } catch (err: any) {
      if (!isMounted.current) return;
      setErrorMsg(
        err?.response?.data?.error?.message ||
        err?.response?.data?.detail?.message ||
        err?.message ||
        t("errors.mfa_code_invalid")
      );
      setMfaCode("");
    } finally {
      if (isMounted.current) setSubmitting(false);
    }
  }

  function backToLogin() {
    setMfaChallengeId(null);
    setMfaCode("");
    setErrorMsg(null);
  }

  // ── OAuth ─────────────────────────────────────────────────────────────────

  function startOAuth(provider: "google" | "outlook" | "apple") {
    if (typeof window === "undefined") return;

    const baseURL =
      process.env.NEXT_PUBLIC_QXT_API_BASE_URL ||
      "http://localhost:8000";

    const returnTo =
      process.env.NEXT_PUBLIC_FRONTEND_CALLBACK_URL ||
      "https://openqcore.com/auth/callback";

    const paths = {
      google: "/api/v1/auth/oauth/google/start",
      outlook: "/api/v1/auth/oauth/outlook/start",
      apple: "/api/v1/auth/oauth/apple/start",
    } as const;

    const params = new URLSearchParams({
      return_to: returnTo,
      next: "/",
    });

    window.location.assign(
      `${baseURL}${paths[provider]}?${params.toString()}`
    );
  }

  // ── SSR guard ─────────────────────────────────────────────────────────────

  if (typeof window === "undefined") return null;

  // ── Render ────────────────────────────────────────────────────────────────

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-[#101826]/95 backdrop-blur-md"
          />

          {/* Modal wrapper */}
          <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 pt-28 pb-10">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit={{    opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="
                relative grid grid-cols-[0.95fr_1.05fr]
                w-full max-w-[980px] min-h-[580px]
                rounded-[32px] overflow-hidden
                border border-white/10
                bg-gradient-to-br from-[#161d2a] via-[#1b2230] to-[#12161f]
                shadow-[0_0_80px_rgba(212,175,55,0.08)]
              "
            >
              {/* ── Left ── */}
              <aside className="relative flex flex-col justify-center px-14 py-14 bg-[#0f1725] border-r border-white/5">
                <div className="flex flex-col items-center gap-4 w-full">
                  <Image src="/oqc-logo.png" alt="OpenQCore" width={120} height={120} priority className="mx-auto" />

                  <h2 className="font-extrabold text-[22px] text-center text-white tracking-tight">
                    OpenQCore <span className="text-[#d4af37]">AI</span>
                  </h2>

                  {!isMfaStep && (
                    <div className="mt-6 flex flex-col w-full gap-3">
                      <button type="button" onClick={() => startOAuth("google")} className={oauthButtonCls}>
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
                          <GoogleIcon />
                        </div>
                        <span className="text-sm font-semibold text-white">{t("oauth.google")}</span>
                      </button>

                      <button type="button" onClick={() => startOAuth("outlook")} className={oauthButtonCls}>
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
                          <MicrosoftIcon />
                        </div>
                        <span className="text-sm font-semibold text-white">{t("oauth.microsoft")}</span>
                      </button>
                    </div>
                  )}

                  {isMfaStep && (
                    <div className="mt-6 flex flex-col items-center gap-2 text-center">
                      <ShieldCheck className="w-8 h-8 text-[#d4af37]" />
                      <p className="text-sm text-neutral-400 max-w-[200px]">
                        {t("mfa.protected_notice")}
                      </p>
                    </div>
                  )}
                </div>
              </aside>

              {/* ── Right ── */}
              <div className="relative flex flex-col justify-center px-16 py-14">
                <button
                  onClick={onClose} aria-label={t("close_aria")}
                  className="absolute top-5 right-7 p-2 rounded-full bg-black/30 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/20"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="w-full max-w-xs">
                  {/* ═══ MFA CODE STEP ═══ */}
                  {isMfaStep ? (
                    <>
                      <button
                        type="button"
                        onClick={backToLogin}
                        className="mb-4 flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        {t("mfa.back")}
                      </button>

                      <h3 className="text-xl font-bold text-white mb-1">{t("mfa.title")}</h3>
                      <p className="text-xs text-neutral-400 mb-4">
                        {t("mfa.desc")}
                      </p>

                      <form className="space-y-3" onSubmit={handleMfaSubmit}>
                        <div>
                          <label className="text-xs text-neutral-400 font-medium mb-2 block">
                            {t("mfa.code_label")}
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            value={mfaCode}
                            onChange={(e) => setMfaCode(e.target.value)}
                            placeholder="123456"
                            autoFocus
                            required
                            className={`${inputCls} text-center tracking-[0.3em] text-lg`}
                          />
                        </div>

                        {errorMsg && (
                          <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-xs text-red-200">
                            {errorMsg}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={submitting}
                          className="
                            h-11 w-full rounded-xl
                            bg-gradient-to-r from-[#d4af37] via-[#ffe89e] to-[#ffd466]
                            text-base font-bold text-[#161d2a]
                            shadow transition hover:opacity-90 disabled:opacity-50
                            border border-white/10
                          "
                        >
                          {submitting ? t("mfa.verifying") : t("mfa.verify_cta")}
                        </button>
                      </form>
                    </>
                  ) : (
                    /* ═══ SIGN IN / SIGN UP ═══ */
                    <>
                      <h3 className="text-xl font-bold text-white mb-4">
                        {isSignin ? t("titles.signin") : t("titles.signup")}
                      </h3>

                      <form className="space-y-3" onSubmit={handleSubmit} autoComplete="off">
                        {!isSignin && (
                          <div>
                            <label className="text-xs text-neutral-400 font-medium mb-2 block">
                              {t("fields.full_name")}
                            </label>
                            <input
                              type="text" autoComplete="name" value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder={t("fields.full_name_placeholder")} required className={inputCls}
                            />
                          </div>
                        )}

                        <div>
                          <label className="text-xs text-neutral-400 font-medium mb-2 block">
                            {t("fields.email")}
                          </label>
                          <input
                            type="email" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t("fields.email_placeholder")} required className={inputCls}
                          />
                        </div>

                        <div>
                          <label className="text-xs text-neutral-400 font-medium mb-2 block">
                            {t("fields.password")}
                          </label>
                          <input
                            type="password" value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            autoComplete={isSignin ? "current-password" : "new-password"}
                            required className={inputCls}
                          />
                        </div>

                        {!isSignin && (
                          <div>
                            <label className="text-xs text-neutral-400 font-medium mb-2 block">
                              {t("fields.confirm_password")}
                            </label>
                            <input
                              type="password" value={passwordConfirm}
                              onChange={(e) => setPasswordConfirm(e.target.value)}
                              placeholder="••••••••" autoComplete="new-password"
                              required className={inputCls}
                            />
                          </div>
                        )}

                        {errorMsg && (
                          <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-xs text-red-200">
                            {errorMsg}
                          </div>
                        )}

                        <button
                          type="submit" disabled={submitting || loadingUser}
                          className="
                            h-11 w-full rounded-xl
                            bg-gradient-to-r from-[#d4af37] via-[#ffe89e] to-[#ffd466]
                            text-base font-bold text-[#161d2a]
                            shadow transition hover:opacity-90 disabled:opacity-50
                            border border-white/10
                          "
                        >
                          {submitting ? t("submit.pending") : isSignin ? t("submit.signin") : t("submit.signup")}
                        </button>
                      </form>

                      {/* Mode toggle */}
                      <div className="flex justify-center gap-2 mt-6 text-xs text-neutral-400 font-medium">
                        {(["signin", "signup"] as AuthMode[]).map((m, idx) => (
                          <React.Fragment key={m}>
                            {idx > 0 && <span className="mx-1">/</span>}
                            <button
                              type="button" onClick={() => setMode(m)}
                              className={`px-2 py-1 rounded transition-all ${
                                mode === m
                                  ? "font-bold bg-[#d4af37] text-[#191d28]"
                                  : "hover:text-white"
                              }`}
                            >
                              {m === "signin" ? t("toggle.signin") : t("toggle.signup")}
                            </button>
                          </React.Fragment>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}