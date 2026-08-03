// app/lib/api/workspace/agents.ts

import { qxtApiClient } from "../core/qxtClient";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AgentConfig {
  model:         string;
  provider:      string;
  temperature:   number;
  system_prompt: string;
  visibility:    "private" | "public";
  tags:          string[];
  icon:          string;
}

export interface WorkspaceAgent {
  id:            string;
  name:          string;
  role:          string;
  description:   string | null;
  icon:          string;
  status:        "active" | "inactive" | "idle" | "error";
  tags:          string[];
  model:         string | null;
  provider:      string | null;
  visibility:    string;
  system_prompt: string | null;
  temperature:   number;
  runs:          number;
  tokens:        number;
  slug:          string | null;
  workspace_id:  string;
  last_run_at:   string | null;
  created_at:    string;
  updated_at:    string;
}

export interface AgentListResponse {
  items:  WorkspaceAgent[];
  total:  number;
  limit:  number;
  offset: number;
}

export interface CreateAgentPayload {
  name:        string;
  role:        string;
  description?: string;
  config:      Partial<AgentConfig>;
}

export interface UpdateAgentPayload {
  name?:        string;
  role?:        string;
  description?: string;
  status?:      string;
  config?:      Partial<AgentConfig>;
}

export interface AvailableModel {
  id:            string;
  public_name:   string;
  product_key:   string;
  provider:      string;
  backend_model: string;
  version:       string;
}

// ─── API ──────────────────────────────────────────────────────────────────────

export async function getWorkspaceAgents(
  workspaceId: string,
  params?: { search?: string; status?: string; limit?: number; offset?: number }
): Promise<AgentListResponse> {
  const res = await qxtApiClient.get(
    `/api/v1/workspaces/${workspaceId}/agents`,
    { params }
  );
  return res.data;
}

export async function getWorkspaceAgent(
  workspaceId: string,
  agentId: string
): Promise<WorkspaceAgent> {
  const res = await qxtApiClient.get(
    `/api/v1/workspaces/${workspaceId}/agents/${agentId}`
  );
  return res.data;
}

export async function createWorkspaceAgent(
  workspaceId: string,
  payload: CreateAgentPayload
): Promise<WorkspaceAgent> {
  const res = await qxtApiClient.post(
    `/api/v1/workspaces/${workspaceId}/agents`,
    payload
  );
  return res.data;
}

export async function updateWorkspaceAgent(
  workspaceId: string,
  agentId: string,
  payload: UpdateAgentPayload
): Promise<WorkspaceAgent> {
  const res = await qxtApiClient.patch(
    `/api/v1/workspaces/${workspaceId}/agents/${agentId}`,
    payload
  );
  return res.data;
}

export async function deleteWorkspaceAgent(
  workspaceId: string,
  agentId: string
): Promise<void> {
  await qxtApiClient.delete(
    `/api/v1/workspaces/${workspaceId}/agents/${agentId}`
  );
}

// ─── Agent — Knowledge Links ──────────────────────────────────────────────────

export async function getAgentKnowledgeLinks(
  workspaceId: string,
  agentId:     string
): Promise<string[]> {
  const res = await qxtApiClient.get(
    `/api/v1/workspaces/${workspaceId}/agents/${agentId}/knowledge`
  );
  return res.data?.knowledge_ids ?? [];
}

export async function linkAgentToKnowledge(
  workspaceId: string,
  agentId:     string,
  itemId:      string
): Promise<void> {
  await qxtApiClient.post(
    `/api/v1/workspaces/${workspaceId}/agents/${agentId}/knowledge/${itemId}`
  );
}

export async function unlinkAgentFromKnowledge(
  workspaceId: string,
  agentId:     string,
  itemId:      string
): Promise<void> {
  await qxtApiClient.delete(
    `/api/v1/workspaces/${workspaceId}/agents/${agentId}/knowledge/${itemId}`
  );
}

export async function getAvailableModels(): Promise<AvailableModel[]> {
  const res = await qxtApiClient.get("/api/v1/models/");
  return (res.data?.data ?? []).map((m: any) => ({
    id:            m.id,
    public_name:   m.public_name,
    product_key:   m.product_key,
    provider:      m.provider,
    backend_model: m.backend_model,
    version: m.generation?.label ?? (m.gen ? `G${m.gen}.${m.gen_minor ?? 0}` : ""),
  }));
}