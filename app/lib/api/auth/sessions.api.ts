// app/lib/api/auth/sessions.api.ts

import { qxtAuthClient } from "../core/qxtClient";

export interface UserSession {
  id: string;
  ip_address: string | null;
  device_type: string | null;
  browser: string | null;
  os: string | null;
  created_at: string;
  last_seen_at: string | null;
  is_current: boolean;
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

export async function getSessions(): Promise<UserSession[]> {
  try {
    const res = await qxtAuthClient.get("/api/v1/auth/sessions");
    return res.data;
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to load sessions."));
  }
}

export async function revokeSession(sessionId: string): Promise<void> {
  try {
    await qxtAuthClient.delete(`/api/v1/auth/sessions/${sessionId}`);
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Couldn't sign out that device."));
  }
}