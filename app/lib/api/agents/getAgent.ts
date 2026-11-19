import { qxtApiClient } from "@/app/lib/api/core/qxtClient";
import type { Agent }   from "../../../../types/agent";
import { asApiError, detailText } from "@/app/lib/errors";

export async function getAgent(agentId: string): Promise<Agent> {
  if (!agentId) throw new Error("Agent id is required");

  try {
    const { data } = await qxtApiClient.get(`/api/v1/agents/${agentId}`); // ✅ URL صح

    if (!data?.id) throw new Error("Invalid agent payload");

    return {
      id:             String(data.id),
      slug:           data.slug ? String(data.slug) : String(data.id), // ✅ slug من الـ backend
      name:           String(data.name        || ""),
      role:           String(data.role        || ""),
      description:    String(data.description || ""),
      avatar:         null,
      icon:           data.icon        || "cpu",
      model:          data.model       || null,
      system_prompt:  data.system_prompt || "",
      temperature:    typeof data.temperature === "number" ? data.temperature : 0.7,
      visibility:     data.visibility  || "private",
      status:         data.status      || "idle",
      capabilities:   data.capabilities || [],
      memory_enabled: Boolean(data.memory_enabled),
      workspace_id:   data.workspace_id || null,
      created_at:     data.created_at  || new Date().toISOString(),
      updated_at:     data.updated_at  || null,
    };

  } catch (caught) {
    const error = asApiError(caught);
    throw new Error(
      detailText(error) || "Failed to load agent"
    );
  }
}