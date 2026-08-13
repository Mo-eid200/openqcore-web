import {
    qxtApiClient,
} from "../core/qxtClient";

export interface AgentSessionItem {
    id: string;
    title: string | null;
    created_at: string;
    updated_at: string;
    pinned: boolean;
    starred: boolean;
}

export interface AgentSessionsResponse {
    items: AgentSessionItem[];
    total: number;
}

export async function getAgentSessions(
    agentId: string,
    limit = 50,
    offset = 0,
): Promise<AgentSessionsResponse> {
    const response = await qxtApiClient.get("/api/v1/sessions", {
        params: {
            agent_id: agentId,
            kind: "agent",
            limit,
            offset,
        },
    });

    const data = response.data;

    return {
        items: Array.isArray(data?.items)
            ? data.items.map((item: any) => ({
                id: String(item?.id ?? ""),
                title: item?.title ?? null,
                created_at: String(item?.created_at ?? ""),
                updated_at: String(item?.updated_at ?? item?.created_at ?? ""),
                pinned: Boolean(item?.pinned),
                starred: Boolean(item?.starred),
            }))
            : [],
        total: Number(data?.total ?? 0),
    };
}