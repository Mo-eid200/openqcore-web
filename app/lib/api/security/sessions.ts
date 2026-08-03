// app/lib/api/security.ts

import { qxtApiClient } from "../core/qxtClient";

const API_V1 = "/api/v1";

// =========================================================
// TYPES
// =========================================================

export interface ActiveSessionItem {
  id: string;
  ip_address: string | null;
  user_agent: string | null;
  device_type: string | null;
  browser: string | null;
  os: string | null;
  created_at: string | null;
  last_seen_at: string | null;
  revoked: boolean;
  revoked_at: string | null;
  is_current: boolean;
}

export interface ActiveSessionsResponse {
  items: ActiveSessionItem[];
  total: number;
}

export interface RevokeSessionResponse {
  ok: boolean;
  session_id: string;
}

export interface RevokeOtherSessionsResponse {
  ok: boolean;
  revoked_count: number;
}

// =========================================================
// ERROR HELPER
// =========================================================

function extractErrorMessage(err: unknown, fallback: string): string {
  const responseData = (err as any)?.response?.data;
  const message = responseData?.error?.message;
  if (typeof message === "string" && message.trim()) return message;

  const detail = responseData?.detail;
  if (typeof detail === "string") return detail;
  if (detail?.message) return detail.message as string;

  return fallback;
}

// =========================================================
// API
// =========================================================

/**
 * GET /api/v1/security/sessions
 */
export async function getActiveSessions(): Promise<ActiveSessionsResponse> {
  try {
    const { data } = await qxtApiClient.get<ActiveSessionsResponse>(
      `${API_V1}/security/sessions`,
    );
    return data;
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to load active sessions."));
  }
}

/**
 * POST /api/v1/security/sessions/{session_id}/revoke
 */
export async function revokeSession(
  sessionId: string,
): Promise<RevokeSessionResponse> {
  try {
    const { data } = await qxtApiClient.post<RevokeSessionResponse>(
      `${API_V1}/security/sessions/${sessionId}/revoke`,
    );
    return data;
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to revoke session."));
  }
}

/**
 * POST /api/v1/security/sessions/revoke-others
 */
export async function revokeOtherSessions(): Promise<RevokeOtherSessionsResponse> {
  try {
    const { data } = await qxtApiClient.post<RevokeOtherSessionsResponse>(
      `${API_V1}/security/sessions/revoke-others`,
    );
    return data;
  } catch (err) {
    throw new Error(
      extractErrorMessage(err, "Failed to revoke other sessions."),
    );
  }
}