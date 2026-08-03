import type { Agent, AgentRuntime } from "../../../../types/agent";
import { getChatModelWithFallback }  from "../chat/models";
import { getAgent }                  from "../console/agents";

// ─── Re-exports ───────────────────────────────────────────────────────────────

export type { AgentRuntime };
export { getAgent };

// ─── getChatRoute ─────────────────────────────────────────────────────────────

export function getChatRoute(
  sid:      string,
  agentId?: string | null,
): string {
  if (agentId) return `/qxt-chat/agent/${agentId}?sid=${sid}`;
  return `/qxt-chat?sid=${sid}`;
}

// ─── buildAgentRuntime ────────────────────────────────────────────────────────

export async function buildAgentRuntime(agent: Agent): Promise<AgentRuntime> {
  const resolvedModel = await getChatModelWithFallback(agent.model, "chat");

  return {
    agent,
    model:         resolvedModel?.id        || "pulse-core",
    systemPrompt:  agent.system_prompt      || "",
    temperature:   typeof agent.temperature === "number" ? agent.temperature : 0.7,
    capabilities:  agent.capabilities       || [],
    memoryEnabled: Boolean(agent.memory_enabled),
  };
}