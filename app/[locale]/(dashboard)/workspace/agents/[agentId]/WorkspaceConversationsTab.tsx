"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, MessageSquare, Pin, Star, Loader2, User } from "lucide-react";

import { qxtApiClient } from "@/app/lib/api/core/qxtClient";

interface WorkspaceAgentSession {
    id: string;
    title: string | null;
    created_at: string;
    updated_at: string;
    pinned: boolean;
    starred: boolean;
    user_id: number;
    user_name: string | null;
    user_email: string;
}

interface WorkspaceAgentSessionsResponse {
    items: WorkspaceAgentSession[];
    total: number;
}

async function getWorkspaceAgentSessions(
    workspaceId: string,
    agentId: string,
): Promise<WorkspaceAgentSessionsResponse> {
    const response = await qxtApiClient.get(
        `/api/v1/workspaces/${workspaceId}/agents/${agentId}/sessions`,
        { params: { limit: 50, offset: 0 } },
    );

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
                user_id: Number(item?.user_id ?? 0),
                user_name: item?.user_name ?? null,
                user_email: String(item?.user_email ?? ""),
            }))
            : [],
        total: Number(data?.total ?? 0),
    };
}

function formatDate(value: string) {
    if (!value) return "—";
    try {
        return new Date(value).toLocaleString(undefined, {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });
    } catch {
        return "—";
    }
}

export function WorkspaceConversationsTab({
    workspaceId,
    agentId,
}: {
    workspaceId: string;
    agentId: string;
}) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["workspace-agent-sessions", workspaceId, agentId],
        queryFn: () => getWorkspaceAgentSessions(workspaceId, agentId),
        staleTime: 30_000,
    });

    // Same confirmed qxt-chat resume format as the personal tab —
    // just /qxt-chat?sid={id}, no agent-id path segment needed.
    const chatBase = process.env.NEXT_PUBLIC_CHAT_URL || "http://localhost:3001";

    function buildResumeUrl(sessionId: string) {
        return `${chatBase}/qxt-chat?sid=${sessionId}`;
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-5 w-5 animate-spin text-white/30" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d10]/95 p-5 text-center">
                <p className="text-xs text-white/50">Failed to load conversations.</p>
            </div>
        );
    }

    const items = data?.items ?? [];

    if (items.length === 0) {
        return (
            <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d10]/95 p-8 text-center">
                <MessageSquare className="mx-auto h-6 w-6 text-white/20" />
                <p className="mt-3 text-sm text-white/50">
                    No workspace members have talked to this agent yet.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d10]/95 overflow-hidden backdrop-blur-xl">
            <div className="border-b border-white/[0.06] px-5 py-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white/35">
                    Conversations ({data?.total ?? items.length})
                </h3>
            </div>

            <div className="divide-y divide-white/[0.05]">
                {items.map((session) => (
                    <a
                        key={session.id}
                        href={buildResumeUrl(session.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            flex items-center gap-3 px-5 py-3.5
                            transition-colors
                            hover:bg-white/[0.03]
                        "
                    >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/[0.08] text-red-400">
                            <MessageSquare className="h-3.5 w-3.5" />
                        </div>

                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                                <p className="truncate text-sm font-medium text-white">
                                    {session.title || "Untitled conversation"}
                                </p>
                                {session.pinned && (
                                    <Pin className="h-3 w-3 shrink-0 text-red-400/70" />
                                )}
                                {session.starred && (
                                    <Star className="h-3 w-3 shrink-0 text-red-400/70" />
                                )}
                            </div>
                            <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/35">
                                <User className="h-3 w-3 shrink-0" />
                                <span className="truncate">
                                    {session.user_name || session.user_email}
                                </span>
                                <span>·</span>
                                <span>Last active {formatDate(session.updated_at)}</span>
                            </div>
                        </div>

                        <ExternalLink className="h-3.5 w-3.5 shrink-0 text-white/25" />
                    </a>
                ))}
            </div>
        </div>
    );
}