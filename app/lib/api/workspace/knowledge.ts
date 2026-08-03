// app/lib/api/workspace/knowledge.ts

import { qxtApiClient } from "../core/qxtClient";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WorkspaceKnowledgeItem {
  id:           string;
  title:        string;
  type:         string;
  status:       "pending" | "processing" | "processed" | "failed";
  description:  string | null;
  file_url:     string | null;
  file_size:    number | null;
  mime_type:    string | null;
  tags:         string[];
  doc_id:       string | null;
  error_msg:    string | null;
  chunks:       number;
  tokens:       number;
  workspace_id: string;
  created_at:   string;
  updated_at:   string;
}

export interface KnowledgeListResponse {
  items:  WorkspaceKnowledgeItem[];
  total:  number;
  limit:  number;
  offset: number;
}

export interface CreateKnowledgePayload {
  title:        string;
  type:         string;
  description?: string;
  file_url?:    string;
  file_size?:   number;
  mime_type?:   string;
  tags?:        string[];
}

export interface KnowledgeAgent {
  id:     string;
  name:   string;
  role:   string;
  status: string;
  model:  string | null;
}

// ─── Knowledge CRUD ───────────────────────────────────────────────────────────

export async function getWorkspaceKnowledge(
  workspaceId: string,
  params?: { search?: string; status?: string; limit?: number; offset?: number }
): Promise<KnowledgeListResponse> {
  const res = await qxtApiClient.get(
    `/api/v1/workspaces/${workspaceId}/knowledge`,
    { params }
  );
  return res.data;
}

export async function getWorkspaceKnowledgeItem(
  workspaceId: string,
  itemId:      string
): Promise<WorkspaceKnowledgeItem> {
  const res = await qxtApiClient.get(
    `/api/v1/workspaces/${workspaceId}/knowledge/${itemId}`
  );
  return res.data;
}

export async function createWorkspaceKnowledge(
  workspaceId: string,
  payload:     CreateKnowledgePayload
): Promise<WorkspaceKnowledgeItem> {
  const res = await qxtApiClient.post(
    `/api/v1/workspaces/${workspaceId}/knowledge`,
    payload
  );
  return res.data;
}

export async function uploadWorkspaceKnowledgeFile(
  workspaceId: string,
  file:        File,
  onProgress?: (pct: number) => void,
  description?: string,
): Promise<WorkspaceKnowledgeItem> {
  const form = new FormData();
  form.append("file", file);
  if (description?.trim()) {
    form.append("description", description.trim());
  }

  const res = await qxtApiClient.post(
    `/api/v1/workspaces/${workspaceId}/knowledge/upload`,
    form,
    {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (e) => {
        if (onProgress && e.total) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      },
    }
  );
  return res.data;
}

export async function deleteWorkspaceKnowledge(
  workspaceId: string,
  itemId:      string
): Promise<void> {
  await qxtApiClient.delete(
    `/api/v1/workspaces/${workspaceId}/knowledge/${itemId}`
  );
}

// ─── Agent — Knowledge Link ───────────────────────────────────────────────────

export async function linkKnowledgeToAgent(
  workspaceId: string,
  itemId:      string,
  agentId:     string
): Promise<void> {
  await qxtApiClient.post(
    `/api/v1/workspaces/${workspaceId}/knowledge/${itemId}/agents/${agentId}`
  );
}

export async function unlinkKnowledgeFromAgent(
  workspaceId: string,
  itemId:      string,
  agentId:     string
): Promise<void> {
  await qxtApiClient.delete(
    `/api/v1/workspaces/${workspaceId}/knowledge/${itemId}/agents/${agentId}`
  );
}

export async function getKnowledgeAgents(
  workspaceId: string,
  itemId:      string
): Promise<KnowledgeAgent[]> {
  const res = await qxtApiClient.get(
    `/api/v1/workspaces/${workspaceId}/knowledge/${itemId}/agents`
  );
  return res.data?.agents ?? [];
}