// app/lib/api/auth/password.api.ts

import { qxtAuthClient } from "../core/qxtClient";

export interface PasswordStatus {
  has_password: boolean;
}

export interface ChangePasswordPayload {
  current_password?: string;
  new_password: string;
}

export interface ChangePasswordResult {
  success: boolean;
  action: "set" | "changed";
}

function extractErrorMessage(err: unknown, fallback: string): string {
  const responseData = (err as any)?.response?.data;
  const message = responseData?.error?.message;
  if (typeof message === "string" && message.trim()) return message;

  const detail = responseData?.detail;
  if (typeof detail === "string") return detail;
  if (detail?.message) return detail.message as string;

  return fallback;
}

export async function getPasswordStatus(): Promise<PasswordStatus> {
  try {
    const res = await qxtAuthClient.get("/api/v1/auth/password/status");
    return res.data;
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to load password status."));
  }
}

export async function changePassword(payload: ChangePasswordPayload): Promise<ChangePasswordResult> {
  try {
    const res = await qxtAuthClient.post("/api/v1/auth/password/change", payload);
    return res.data;
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Couldn't update your password."));
  }
}