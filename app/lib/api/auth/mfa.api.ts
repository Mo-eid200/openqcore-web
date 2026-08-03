// app/lib/api/auth/mfa.api.ts
//
// Matches app/api/v1/auth_mfa.py exactly. Uses qxtAuthClient (same
// client auth.api.ts uses for everything under /auth/*).

import { qxtAuthClient } from "../core/qxtClient";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MfaStatus {
  enabled: boolean;
}

export interface MfaSetupResponse {
  secret: string;
  otpauth_uri: string;
}

export interface MfaVerifySetupResponse {
  enabled: boolean;
  backup_codes: string[]; // shown once — save these before closing
}

export interface MfaDisablePayload {
  password?: string;
  code?: string;
}

// ─── Error helper ─────────────────────────────────────────────────────────────
//
// 🔧 FIX: the backend's real error envelope is
// { success: false, error: { code, message, trace_id } } — NOT
// FastAPI's default { detail: ... }. Reading err.response.data.detail
// (what this file did before) silently missed the actual message,
// so callers only ever saw generic fallback text like "Couldn't
// verify..." instead of "That code is incorrect."

function extractErrorMessage(err: unknown, fallback: string): string {
  const responseData = (err as any)?.response?.data;
  const message = responseData?.error?.message;
  if (typeof message === "string" && message.trim()) return message;

  const detail = responseData?.detail;
  if (typeof detail === "string") return detail;
  if (detail?.message) return detail.message as string;

  return fallback;
}

// ─── API ──────────────────────────────────────────────────────────────────────

export async function getMfaStatus(): Promise<MfaStatus> {
  try {
    const res = await qxtAuthClient.get("/api/v1/auth/mfa/status");
    return res.data;
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to load MFA status."));
  }
}

export async function setupMfa(): Promise<MfaSetupResponse> {
  try {
    const res = await qxtAuthClient.post("/api/v1/auth/mfa/setup");
    return res.data;
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Couldn't start MFA setup."));
  }
}

export async function verifyMfaSetup(code: string): Promise<MfaVerifySetupResponse> {
  try {
    const res = await qxtAuthClient.post("/api/v1/auth/mfa/verify-setup", { code });
    return res.data;
  } catch (err) {
    throw new Error(extractErrorMessage(err, "That code is incorrect."));
  }
}

export async function disableMfa(payload: MfaDisablePayload): Promise<{ success: boolean; enabled: boolean }> {
  try {
    const res = await qxtAuthClient.post("/api/v1/auth/mfa/disable", payload);
    return res.data;
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Couldn't disable MFA."));
  }
}