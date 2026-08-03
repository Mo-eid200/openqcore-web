// app/lib/api/workspace/security.ts
//
// Matches app/api/v1/workspace/security.py's GET
// /workspaces/{workspace_id}/security/access-logs response exactly.

import { qxtApiClient } from "../core/qxtClient";

const API_V1 = "/api/v1";

// =========================================================
// TYPES
// =========================================================

export interface AccessLogEntry {
  id: string;
  actor_name: string | null;
  actor_email: string | null;
  ip_address: string | null;
  country: string | null;
  city: string | null;
  device_type: string | null;
  browser: string | null;
  os: string | null;
  logged_in_at: string | null;
}

export interface AccessLogsResponse {
  logs: AccessLogEntry[];
  limit: number;
  offset: number;
}

export interface ApiKeySummaryItem {
  id: number;
  name: string | null;
  active: boolean;
  plan: string | null;
  daily_limit: number | null;
  is_unlimited: boolean;
  scopes: string | null;
  monthly_token_limit: number | null;
  workspace_id: string;
  created_at: string | null;
  key_preview: string;
}

export interface ApiKeysSummaryResponse {
  items: ApiKeySummaryItem[];
  total: number;
}

export interface ThreatAlertItem {
  id: string;
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  description: string;
  status: "open" | "read" | "resolved" | "dismissed";
  metadata_json: Record<string, unknown> | null;
  read_at: string | null;
  resolved_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ThreatAlertsResponse {
  items: ThreatAlertItem[];
  total: number;
  limit: number;
  offset: number;
}

export interface SecurityOverviewResponse {
  active_sessions: number;
  open_alerts: number;
  active_api_keys: number;
  last_access_at: string | null;
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
 * GET /api/v1/workspaces/{workspace_id}/security/access-logs
 * Admin-only.
 */
export async function getAccessLogs(
  workspaceId: string,
  options?: { limit?: number; offset?: number },
): Promise<AccessLogsResponse> {
  try {
    const { data } = await qxtApiClient.get<AccessLogsResponse>(
      `${API_V1}/workspaces/${workspaceId}/security/access-logs`,
      {
        params: {
          limit: options?.limit ?? 50,
          offset: options?.offset ?? 0,
        },
      },
    );
    return data;
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to load access logs."));
  }
}

/**
 * GET /api/v1/workspaces/{workspace_id}/security/api-keys-summary
 * Admin-only. Read-only view of API keys for the Security page —
 * delegates server-side to the same logic api_keys.py's list
 * endpoint uses.
 */
export async function getApiKeysSummary(
  workspaceId: string,
  options?: { limit?: number; offset?: number },
): Promise<ApiKeysSummaryResponse> {
  try {
    const { data } = await qxtApiClient.get<ApiKeysSummaryResponse>(
      `${API_V1}/workspaces/${workspaceId}/security/api-keys-summary`,
      {
        params: {
          limit: options?.limit ?? 50,
          offset: options?.offset ?? 0,
        },
      },
    );
    return data;
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to load API keys."));
  }
}

/**
 * GET /api/v1/workspaces/{workspace_id}/security/threat-alerts
 * Admin-only.
 */
export async function getThreatAlerts(
  workspaceId: string,
  options?: {
    limit?: number;
    offset?: number;
    status?: "open" | "read" | "resolved" | "dismissed";
  },
): Promise<ThreatAlertsResponse> {
  try {
    const { data } = await qxtApiClient.get<ThreatAlertsResponse>(
      `${API_V1}/workspaces/${workspaceId}/security/threat-alerts`,
      {
        params: {
          limit: options?.limit ?? 20,
          offset: options?.offset ?? 0,
          status: options?.status,
        },
      },
    );
    return data;
  } catch (err) {
    throw new Error(
      extractErrorMessage(err, "Failed to load threat alerts."),
    );
  }
}

/**
 * POST /api/v1/workspaces/{workspace_id}/security/threat-alerts/{alert_id}/mark-read
 * Admin-only.
 */
export async function markThreatAlertRead(
  workspaceId: string,
  alertId: string,
): Promise<{ ok: boolean }> {
  try {
    const { data } = await qxtApiClient.post<{ ok: boolean }>(
      `${API_V1}/workspaces/${workspaceId}/security/threat-alerts/${alertId}/mark-read`,
    );
    return data;
  } catch (err) {
    throw new Error(
      extractErrorMessage(err, "Failed to mark threat alert as read."),
    );
  }
}

/**
 * POST /api/v1/workspaces/{workspace_id}/security/threat-alerts/{alert_id}/resolve
 * Admin-only.
 */
export async function resolveThreatAlert(
  workspaceId: string,
  alertId: string,
): Promise<{ ok: boolean }> {
  try {
    const { data } = await qxtApiClient.post<{ ok: boolean }>(
      `${API_V1}/workspaces/${workspaceId}/security/threat-alerts/${alertId}/resolve`,
    );
    return data;
  } catch (err) {
    throw new Error(
      extractErrorMessage(err, "Failed to resolve threat alert."),
    );
  }
}

/**
 * GET /api/v1/workspaces/{workspace_id}/security/overview
 * Admin-only.
 */
export async function getSecurityOverview(
  workspaceId: string,
): Promise<SecurityOverviewResponse> {
  try {
    const { data } = await qxtApiClient.get<SecurityOverviewResponse>(
      `${API_V1}/workspaces/${workspaceId}/security/overview`,
    );
    return data;
  } catch (err) {
    throw new Error(
      extractErrorMessage(err, "Failed to load security overview."),
    );
  }
}