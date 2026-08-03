// ─── Status ───────────────────────────────────────────────────────────────────

export type AgentStatus =
  | "idle"
  | "active"
  | "paused"
  | "failed";

// ─── Visibility ───────────────────────────────────────────────────────────────

export type AgentVisibility =
  | "private"
  | "public";

// ─── Agent ────────────────────────────────────────────────────────────────────

export interface Agent {
  id:           string;
  slug:         string;
  name:         string;
  role:         string;
  description:  string;
  avatar?:      string | null;
  icon?:        string;
  tags?:        string[];
  status:       AgentStatus;
  visibility?:  AgentVisibility;
  model?:       string | null;
  provider?:    string | null;
  system_prompt?:  string | null;
  temperature?:    number | null;
  capabilities?:   string[];
  memory_enabled?: boolean;
  workspace_id?:   string | null;
  runs?:        number;
  tokens?:      number;
  lastRunAt?:   string | null;
  last_run_at?: string | null;
  created_at?:  string;
  updated_at?:  string | null;
  createdAt?:   string;
  updatedAt?:   string | null;
}

// ─── AgentRuntime ─────────────────────────────────────────────────────────────

export interface AgentRuntime {
  agent:          Agent;
  model:          string;
  systemPrompt:   string;
  temperature:    number;
  capabilities:   string[];
  memoryEnabled:  boolean;
}