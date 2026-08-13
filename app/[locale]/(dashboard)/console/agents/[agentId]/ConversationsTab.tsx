"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, MessageSquare, Pin, Star, Loader2 } from "lucide-react";

import { getAgentSessions } from "@/app/lib/api/console/agent_sessions_api";

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

export function ConversationsTab({
    agentId,
}: {
    agentId: string;
}) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["agent-sessions", agentId],
        queryFn: () => getAgentSessions(agentId),
        staleTime: 30_000,
    });

    // 🔧 FIX: confirmed against the real qxt-chat URL format —
    // it's just `/qxt-chat?sid={sessionId}`, no `/agent/{id}` path
    // segment (the session itself already knows which agent it
    // belongs to, server-side) and the param is `sid`, not
    // `session_id`.
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
            <div className="rounded-2xl border border-white/[0.06] bg-[#0f1012]/92 p-5 text-center">
                <p className="text-xs text-white/50">Failed to load conversations.</p>
            </div>
        );
    }

    const items = data?.items ?? [];

    if (items.length === 0) {
        return (
            <div className="rounded-2xl border border-white/[0.06] bg-[#0f1012]/92 p-8 text-center">
                <MessageSquare className="mx-auto h-6 w-6 text-white/20" />
                <p className="mt-3 text-sm text-white/50">
                    No conversations with this agent yet.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-white/[0.06] bg-[#0f1012]/92 overflow-hidden backdrop-blur-xl">
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
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-300/[0.08] text-amber-200">
                            <MessageSquare className="h-3.5 w-3.5" />
                        </div>

                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                                <p className="truncate text-sm font-medium text-white">
                                    {session.title || "Untitled conversation"}
                                </p>
                                {session.pinned && (
                                    <Pin className="h-3 w-3 shrink-0 text-amber-300/70" />
                                )}
                                {session.starred && (
                                    <Star className="h-3 w-3 shrink-0 text-amber-300/70" />
                                )}
                            </div>
                            <p className="mt-0.5 text-[11px] text-white/35">
                                Last active {formatDate(session.updated_at)}
                            </p>
                        </div>

                        <ExternalLink className="h-3.5 w-3.5 shrink-0 text-white/25" />
                    </a>
                ))}
            </div>
        </div>
    );
}