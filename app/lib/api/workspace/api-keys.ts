// app/lib/api/workspace/api-keys.ts

import { qxtApiClient } from "../core/qxtClient";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WorkspaceApiKey {
  id:                   number;
  name:                 string | null;
  active:               boolean;
  plan:                 string | null;
  daily_limit:          number | null;
  is_unlimited:         boolean;
  scopes:               string | null;
  monthly_token_limit:  number | null;
  workspace_id:         string;
  created_at:           string | null;
  key_preview:          string;
}

export interface WorkspaceApiKeyCreated extends WorkspaceApiKey {
  key: string; // full key — shown once only
}

export interface ApiKeyListResponse {
  items: WorkspaceApiKey[];
  total: number;
}

export interface CreateApiKeyPayload {
  name:                 string;
  scopes?:              string;
  daily_limit?:         number;
  monthly_token_limit?: number;
  is_unlimited?:        boolean;
}

// ─── API ──────────────────────────────────────────────────────────────────────

export async function getWorkspaceApiKeys(
  workspaceId: string,
  params?: { limit?: number; offset?: number }
): Promise<ApiKeyListResponse> {
  const res = await qxtApiClient.get(
    `/api/v1/workspaces/${workspaceId}/api-keys`,
    { params }
  );
  return res.data;
}

export async function createWorkspaceApiKey(
  workspaceId: string,
  payload:     CreateApiKeyPayload
): Promise<WorkspaceApiKeyCreated> {
  const res = await qxtApiClient.post(
    `/api/v1/workspaces/${workspaceId}/api-keys`,
    payload
  );
  return res.data;
}

export async function revokeWorkspaceApiKey(
  workspaceId: string,
  keyId:       number
): Promise<void> {
  await qxtApiClient.delete(
    `/api/v1/workspaces/${workspaceId}/api-keys/${keyId}`
  );
}