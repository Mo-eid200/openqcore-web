import { qxtApiClient } from "../core/qxtClient";

import type {
  Agent,
  AgentStatus,
  AgentVisibility,
  CreateAgentPayload,
  UpdateAgentPayload,
} from "@/app/[locale]/(dashboard)/console/agents/types";

// ─── Constants ────────────────────────────────────────────────────────────────

const BASE = "/api/v1/console/agents";

const VALID_STATUSES:   AgentStatus[]    = ["idle", "active", "paused", "failed"];
const VALID_VISIBILITY: AgentVisibility[] = ["private", "public"];

// ─── Response types ───────────────────────────────────────────────────────────

export interface GetAgentsResponse {
  items:  Agent[];
  total:  number;
  limit:  number;
  offset: number;
}

export interface AgentChatResponse {
  output?:  string;
  content?: string;
  text?:    string;
  usage?: {
    total_tokens?:      number;
    prompt_tokens?:     number;
    completion_tokens?: number;
  };
  [key: string]: any;
}

export interface AgentChatApiResponse {
  session_id: string;
  result:     AgentChatResponse;
}

export interface AgentAnalyticsOverview {
  total_agents:  number;
  active_agents: number;
  total_runs:    number;
  total_tokens:  number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normalizeStatus(status: unknown): AgentStatus {
  if (typeof status === "string" && VALID_STATUSES.includes(status as AgentStatus)) {
    return status as AgentStatus;
  }
  return "idle";
}

function normalizeVisibility(visibility: unknown): AgentVisibility {
  if (typeof visibility === "string" && VALID_VISIBILITY.includes(visibility as AgentVisibility)) {
    return visibility as AgentVisibility;
  }
  return "private";
}

function normalizeDate(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value;
  return null;
}

// ─── Normalizer ───────────────────────────────────────────────────────────────

function normalizeAgent(item: any): Agent {
  return {
    id:          String(item?.id || ""),
    slug:        typeof item?.slug === "string" && item.slug.trim() ? item.slug : String(item?.id || ""),
    name:        typeof item?.name        === "string" ? item.name        : "",
    role:        typeof item?.role        === "string" ? item.role        : "",
    description: typeof item?.description === "string" ? item.description : "",
    icon:        typeof item?.icon        === "string" ? item.icon        : "cpu",

    tags: Array.isArray(item?.tags)
      ? item.tags.filter((t: unknown): t is string => typeof t === "string")
      : [],

    status:     normalizeStatus(item?.status),
    visibility: normalizeVisibility(item?.visibility),

    model:    typeof item?.model    === "string" ? item.model    : null,
    provider: typeof item?.provider === "string" ? item.provider : null,

    system_prompt: typeof item?.system_prompt === "string" ? item.system_prompt : null,
    temperature:   typeof item?.temperature   === "number" ? item.temperature   : null,

    runs:   typeof item?.runs   === "number" ? item.runs   : 0,
    tokens: typeof item?.tokens === "number" ? item.tokens : 0,

    lastRunAt: normalizeDate(item?.lastRunAt) || normalizeDate(item?.last_run_at),

    createdAt:
      normalizeDate(item?.createdAt) ||
      normalizeDate(item?.created_at) ||
      new Date().toISOString(),

    updatedAt:
      normalizeDate(item?.updatedAt) ||
      normalizeDate(item?.updated_at),
  };
}

// ─── GET agents ───────────────────────────────────────────────────────────────

export async function getAgents(
  limit  = 20,
  offset = 0,
): Promise<GetAgentsResponse> {
  const { data } = await qxtApiClient.get(`${BASE}/`, { params: { limit, offset } });

  const rawItems = Array.isArray(data?.items)
    ? data.items
    : Array.isArray(data?.agents)
    ? data.agents
    : [];

  return {
    items:  rawItems.map(normalizeAgent),
    total:  typeof data?.total  === "number" ? data.total  : rawItems.length,
    limit:  typeof data?.limit  === "number" ? data.limit  : limit,
    offset: typeof data?.offset === "number" ? data.offset : offset,
  };
}

// ─── GET single agent ─────────────────────────────────────────────────────────

export async function getAgent(agentId: string): Promise<Agent> {
  const { data } = await qxtApiClient.get(`${BASE}/${agentId}`);
  return normalizeAgent(data);
}

// ─── CREATE agent ─────────────────────────────────────────────────────────────

export async function createAgent(payload: CreateAgentPayload): Promise<Agent> {
  const { data } = await qxtApiClient.post(`${BASE}/`, payload);
  return normalizeAgent(data);
}

// ─── UPDATE agent ─────────────────────────────────────────────────────────────

export async function updateAgent(
  agentId: string,
  payload: UpdateAgentPayload,
): Promise<Agent> {
  const { data } = await qxtApiClient.put(`${BASE}/${agentId}`, payload);
  return normalizeAgent(data);
}

// ─── DELETE agent ─────────────────────────────────────────────────────────────

export async function deleteAgent(agentId: string): Promise<{ success: boolean; agent_id?: string }> {
  const { data } = await qxtApiClient.delete(`${BASE}/${agentId}`);
  return {
    success:  Boolean(data?.success),
    agent_id: data?.agent_id,
  };
}

// ─── Knowledge Links ──────────────────────────────────────────────────────────

export async function getAgentKnowledgeLinks(agentId: string): Promise<string[]> {
  const { data } = await qxtApiClient.get(`${BASE}/${agentId}/knowledge`);
  return data?.knowledge_ids ?? [];
}

export async function linkAgentToKnowledge(agentId: string, itemId: string): Promise<void> {
  await qxtApiClient.post(`${BASE}/${agentId}/knowledge/${itemId}`);
}

export async function unlinkAgentFromKnowledge(agentId: string, itemId: string): Promise<void> {
  await qxtApiClient.delete(`${BASE}/${agentId}/knowledge/${itemId}`);
}

// ─── CHAT ─────────────────────────────────────────────────────────────────────

export async function sendAgentMessage(
  agentId: string,
  payload: { message: string; session_id?: string | null },
): Promise<AgentChatApiResponse> {
  const { data } = await qxtApiClient.post(`${BASE}/${agentId}/chat`, payload);
  return {
    session_id: data?.session_id || "",
    result:     data?.result     || {},
  };
}

// ─── ANALYTICS ───────────────────────────────────────────────────────────────
// ✅ كلها optional - لو الـ backend مش فيها هترجع empty data بدون crash

export async function getAgentAnalyticsOverview(): Promise<AgentAnalyticsOverview> {
  try {
    const { data } = await qxtApiClient.get(`${BASE}/analytics/overview`);
    return data;
  } catch {
    return { total_agents: 0, active_agents: 0, total_runs: 0, total_tokens: 0 };
  }
}

export async function getTopAgents() {
  try {
    const { data } = await qxtApiClient.get(`${BASE}/analytics/top`);
    return data;
  } catch {
    return [];
  }
}

export async function getAgentTokenAnalytics() {
  try {
    const { data } = await qxtApiClient.get(`${BASE}/analytics/tokens`);
    return data;
  } catch {
    return [];
  }
}

export async function getAgentCostAnalytics() {
  try {
    const { data } = await qxtApiClient.get(`${BASE}/analytics/costs`);
    return data;
  } catch {
    return [];
  }
}

export async function getAgentHealth() {
  try {
    const { data } = await qxtApiClient.get(`${BASE}/analytics/health`);
    return data;
  } catch {
    return [];
  }
}

export async function getAgentPerformance() {
  try {
    const { data } = await qxtApiClient.get(`${BASE}/analytics/performance`);
    return data;
  } catch {
    return [];
  }
}

export async function getAgentScalingRecommendations() {
  try {
    const { data } = await qxtApiClient.get(`${BASE}/analytics/scaling`);
    return data;
  } catch {
    return [];
  }
}