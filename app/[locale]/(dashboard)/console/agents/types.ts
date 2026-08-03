// =========================================================
// STATUS
// =========================================================

export type AgentStatus =

    | "idle"

    | "active"

    | "paused"

    | "failed";

// =========================================================
// VISIBILITY
// =========================================================

export type AgentVisibility =

    | "private"

    | "public";

// =========================================================
// AGENT
// =========================================================

export interface Agent {

    // =====================================================
    // CORE
    // =====================================================

    id: string;

    slug: string;

    name: string;

    role: string;

    description: string;

    // =====================================================
    // UI
    // =====================================================

    icon?: string;

    tags: string[];

    // =====================================================
    // STATUS
    // =====================================================

    status: AgentStatus;

    visibility?: AgentVisibility;

    // =====================================================
    // MODEL
    // =====================================================

    model?: string | null;

    provider?: string | null;

    // =====================================================
    // SYSTEM
    // =====================================================

    system_prompt?: string | null;

    temperature?: number | null;

    // =====================================================
    // METRICS
    // =====================================================

    runs?: number;

    tokens?: number;

    lastRunAt?: string | null;

    // =====================================================
    // DATES
    // =====================================================

    createdAt: string;

    updatedAt?: string | null;
}

// =========================================================
// CREATE AGENT PAYLOAD
// =========================================================

export interface CreateAgentPayload {

    name: string;

    role: string;

    description: string;

    icon?: string;

    tags?: string[];

    model?: string;

    provider?: string;

    visibility?: AgentVisibility;

    system_prompt?: string;

    temperature?: number;
}

// =========================================================
// UPDATE AGENT PAYLOAD
// =========================================================

export interface UpdateAgentPayload {

    name?: string;

    role?: string;

    description?: string;

    icon?: string;

    tags?: string[];

    status?: AgentStatus;

    model?: string;

    provider?: string;

    visibility?: AgentVisibility;

    system_prompt?: string;

    temperature?: number;
}

// =========================================================
// CHAT
// =========================================================

export interface AgentChatMessage {

    role:
        | "user"
        | "assistant"
        | "system";

    content: string;

    createdAt?: string;
}

export interface AgentChatPayload {

    message: string;

    session_id?: string | null;
}

export interface AgentChatResponse {

    output?: string;

    content?: string;

    text?: string;

    usage?: {

        total_tokens?: number;

        prompt_tokens?: number;

        completion_tokens?: number;
    };

    [key: string]: any;
}

// =========================================================
// ANALYTICS
// =========================================================

export interface AgentAnalyticsOverview {

    total_agents: number;

    active_agents: number;

    total_runs: number;

    total_tokens: number;
}

export interface AgentHealthItem {

    agent_id: string;

    agent_name: string;

    status: AgentStatus;

    runs: number;

    tokens: number;

    health_score?: number;
}

// =========================================================
// API RESPONSES
// =========================================================

export interface GetAgentsResponse {

    items: Agent[];

    total: number;

    limit: number;

    offset: number;
}

export interface CreateAgentResponse {

    item: Agent;
}

export interface UpdateAgentResponse {

    item: Agent;
}

export interface DeleteAgentResponse {

    success: boolean;
}