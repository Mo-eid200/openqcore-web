"use client";

import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bot } from "lucide-react";

import { AgentsToolbar }    from "./AgentsToolbar";
import { AgentsGrid }       from "./AgentsGrid";
import { CreateAgentModal } from "./CreateAgentModal";

import { useWorkspace } from "@/app/context/WorkspaceContext";
import {
  getWorkspaceAgents,
  createWorkspaceAgent,
  deleteWorkspaceAgent,
  updateWorkspaceAgent,
  type WorkspaceAgent,
  type AgentListResponse,
} from "@/app/lib/api/workspace/agents";

// ─── Fade ─────────────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div className="animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function PageSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="h-48 rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse"
          style={{ animationDelay: `${i * 60}ms` }}
        />
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AgentsPage() {
  const { activeWorkspace } = useWorkspace();
  const queryClient         = useQueryClient();
  const [search,     setSearch]     = useState("");
  const [showCreate, setShowCreate] = useState(false);

  // ── Query ──────────────────────────────────────────────────────────────────
  const { data, isLoading } = useQuery({
    queryKey:  ["workspace-agents", activeWorkspace?.id],
    queryFn:   () => getWorkspaceAgents(activeWorkspace!.id),
    enabled:   !!activeWorkspace?.id,
    staleTime: 60_000,
    gcTime:    5 * 60_000,
    retry:     1,
  });

  // ── Create ─────────────────────────────────────────────────────────────────
  const { mutateAsync: doCreate, isPending: creating } = useMutation({
    mutationFn: (payload: Parameters<typeof createWorkspaceAgent>[1]) =>
      createWorkspaceAgent(activeWorkspace!.id, payload),
    onSuccess: (created) => {
      queryClient.setQueryData(
        ["workspace-agents", activeWorkspace?.id],
        (old: AgentListResponse | undefined) => ({
          ...old,
          items: [created, ...(old?.items ?? [])],
          total: (old?.total ?? 0) + 1,
        })
      );
      setShowCreate(false);
    },
  });

  // ── Delete ─────────────────────────────────────────────────────────────────
  const { mutateAsync: doDelete } = useMutation({
    mutationFn: (agentId: string) =>
      deleteWorkspaceAgent(activeWorkspace!.id, agentId),
    onSuccess: (_, agentId) => {
      queryClient.setQueryData(
        ["workspace-agents", activeWorkspace?.id],
        (old: { items: WorkspaceAgent[]; total: number } | undefined) => ({
          ...old,
          items: (old?.items ?? []).filter(a => a.id !== agentId),
          total: Math.max(0, (old?.total ?? 1) - 1),
        })
      );
    },
  });

  // ── Toggle status ──────────────────────────────────────────────────────────
  const { mutateAsync: doToggle } = useMutation({
    mutationFn: ({ agentId, status }: { agentId: string; status: string }) =>
      updateWorkspaceAgent(activeWorkspace!.id, agentId, { status }),
    onSuccess: (updated) => {
      queryClient.setQueryData(
        ["workspace-agents", activeWorkspace?.id],
        (old: { items: WorkspaceAgent[] } | undefined) => ({
          ...old,
          items: (old?.items ?? []).map(a => a.id === updated.id ? updated : a),
        })
      );
    },
  });

  // ── Filter ─────────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q    = search.trim().toLowerCase();
    const list = data?.items ?? [];
    if (!q) return list;
    return list.filter(a =>
      a.name.toLowerCase().includes(q)  ||
      a.model?.toLowerCase().includes(q) ||
      a.role?.toLowerCase().includes(q)
    );
  }, [data?.items, search]);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 xl:px-10 py-10 flex flex-col gap-8">

        <FadeIn delay={0}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20">
              <Bot className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Agents</h1>
              <p className="text-sm text-white/40">Manage, deploy, and monitor AI agents</p>
            </div>
            <div className="ml-auto text-[12px] text-white/25">
              {data?.total ?? 0} agents
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <AgentsToolbar
            search={search}
            onSearch={setSearch}
            onCreate={() => setShowCreate(true)}
          />
        </FadeIn>

        <FadeIn delay={200}>
          {isLoading ? (
            <PageSkeleton />
          ) : (
            <AgentsGrid
              agents={filtered}
              workspaceId={activeWorkspace?.id ?? ""}
              onDelete={async (id) => {
                if (!window.confirm("Delete this agent?")) return;
                await doDelete(id);
              }}
              onToggle={async (id, status) => {
                await doToggle({ agentId: id, status });
              }}
            />
          )}
        </FadeIn>

      </div>

      {/* Modal — خارج الـ page div عشان الـ overlay يغطي الشاشة كلها */}
      <CreateAgentModal
        open={showCreate}
        loading={creating}
        onClose={() => setShowCreate(false)}
        onCreate={async ({ name, role, description, model, provider, systemPrompt, temperature }) => {
          await doCreate({
            name,
            role,
            description,
            config: {
              model,
              provider,
              system_prompt: systemPrompt,
              temperature,
              visibility:    "private",
              tags:          [],
              icon:          "cpu",
            },
          });
        }}
      />
    </>
  );
}