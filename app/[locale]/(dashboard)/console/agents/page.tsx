"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import AgentEmptyState from "./AgentEmptyState";
import AgentsGrid from "./AgentsGrid";
import AgentsToolbar from "./AgentsToolbar";
import CreateAgentModal from "./CreateAgentModal";

import OpenQCoreLoader from "../../components/ui/OpenQCoreLoader";

import type { Agent } from "./types";
import {
  createAgent,
  deleteAgent,
  getAgents,
  updateAgent,
} from "@/app/lib/api/console/agents";

// ─── Constants ────────────────────────────────────────────────────────────────

const SEARCH_STORAGE_KEY =
  "openqcore.console.agents.search";

// ─── Fade wrapper ─────────────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div
      className="animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  color = "default",
}: {
  label: string;
  value: number;
  color?: "default" | "emerald" | "amber";
}) {
  const styles = {
    default:
      "border-white/[0.06] bg-[#0f1012]/92 text-white",
    emerald:
      "border-emerald-300/10 bg-emerald-300/[0.08] text-emerald-200",
    amber:
      "border-amber-300/10 bg-amber-300/[0.08] text-amber-200",
  }[color];

  const labelStyles = {
    default: "text-white/40",
    emerald: "text-emerald-200/65",
    amber: "text-amber-200/65",
  }[color];

  return (
    <div
      className={`
        rounded-2xl border p-4 backdrop-blur-xl
        shadow-[0_8px_24px_rgba(0,0,0,0.14)]
        ${styles}
      `}
    >
      <div className={`text-xs ${labelStyles}`}>
        {label}
      </div>

      <div className="mt-1.5 text-2xl font-bold tabular-nums">
        {value}
      </div>
    </div>
  );
}

// ─── Error State ──────────────────────────────────────────────────────────────

function ErrorState({
  onRetry,
}: {
  onRetry: () => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-3 py-20 sm:px-6 xl:px-10">
      <div
        className="
          rounded-2xl border border-white/[0.06]
          bg-[#0f1012]/92 px-6 py-5 text-center
          shadow-[0_8px_24px_rgba(0,0,0,0.16)]
          backdrop-blur-xl
        "
      >
        <p className="text-sm text-white/70">
          Failed to load agents
        </p>

        <button
          onClick={onRetry}
          className="
            mt-4 rounded-xl bg-amber-300 px-5 py-2.5
            text-sm font-semibold text-black transition-all
            hover:bg-amber-200
          "
        >
          Retry
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AgentsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const [showCreate, setShowCreate] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [editingAgent, setEditingAgent] =
    useState<Agent | null>(null);

  // ── Restore search from localStorage ───────────────────────────────────────

  useEffect(() => {
    const stored =
      window.localStorage.getItem(
        SEARCH_STORAGE_KEY
      );

    if (stored) {
      setSearch(stored);
    }
  }, []);

  // ── Persist search to localStorage ─────────────────────────────────────────

  useEffect(() => {
    window.localStorage.setItem(
      SEARCH_STORAGE_KEY,
      search
    );
  }, [search]);

  // ── Query ──────────────────────────────────────────────────────────────────

  const {
    data,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["agents"],
    queryFn: () => getAgents(50, 0),
    staleTime: 30_000,
    retry: 1,
  });

  const agents = data?.items ?? [];

  // ── Mutations ──────────────────────────────────────────────────────────────

  const {
    mutateAsync: doCreate,
    isPending: submittingCreate,
  } = useMutation({
    mutationFn: createAgent,
    onSuccess: (created) => {
      queryClient.setQueryData(["agents"], (old: any) => ({
        ...old,
        items: [created, ...(old?.items ?? [])],
      }));
      // Close directly (not via closeModal()) — closeModal() guards on
      // `submitting`, which react-query's onSuccess can fire while
      // isPending is still true, causing the modal to stay open after
      // a successful create.
      setShowCreate(false);
      setEditingAgent(null);
    },
  });

  const {
    mutateAsync: doUpdate,
    isPending: submittingUpdate,
  } = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: any;
    }) => updateAgent(id, data),
    onSuccess: (updated) => {
      queryClient.setQueryData(["agents"], (old: any) => ({
        ...old,
        items: (old?.items ?? []).map((a: Agent) =>
          a.id === updated.id ? updated : a
        ),
      }));
      // Same reasoning as the create mutation above — close directly.
      setShowCreate(false);
      setEditingAgent(null);
    },
  });

  const submitting =
    submittingCreate || submittingUpdate;

  // ── Filtered ───────────────────────────────────────────────────────────────

  const filteredAgents = useMemo(() => {
    const q =
      search.trim().toLowerCase();

    if (!q) return agents;

    return agents.filter((a) =>
      a.name.toLowerCase().includes(q) ||
      a.role.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.tags.some((t) =>
        t.toLowerCase().includes(q)
      )
    );
  }, [agents, search]);

  // ── Stats ──────────────────────────────────────────────────────────────────

  const stats = useMemo(
    () => ({
      total: agents.length,
      active: agents.filter(
        (a) => a.status === "active"
      ).length,
      paused: agents.filter(
        (a) => a.status === "paused"
      ).length,
    }),
    [agents]
  );

  // ── Helpers ────────────────────────────────────────────────────────────────

  const openCreate = () => {
    setEditingAgent(null);
    setShowCreate(true);
  };

  const closeModal = () => {
    if (submitting) return;
    setShowCreate(false);
    setEditingAgent(null);
  };

  // ── CRUD ───────────────────────────────────────────────────────────────────

  async function handleCreate(data: Partial<Agent>) {
    await doCreate({
      name: data.name || "Untitled Agent",
      role: data.role || "AI Assistant",
      description: data.description || "",
      icon: data.icon || "cpu",
      tags: data.tags || [],
      model: data.model || undefined,
      provider: data.provider || undefined,
      visibility: data.visibility || "private",
      system_prompt: data.system_prompt || undefined,
      temperature:
        typeof data.temperature === "number"
          ? data.temperature
          : 0.7,
    });
  }

  async function handleUpdate(data: Partial<Agent>) {
    if (!editingAgent) return;

    await doUpdate({
      id: editingAgent.id,
      data: {
        name: data.name || editingAgent.name,
        role: data.role || editingAgent.role,
        description:
          data.description || editingAgent.description,
        icon: data.icon || editingAgent.icon,
        tags: data.tags || editingAgent.tags,
        model:
          data.model ||
          editingAgent.model ||
          undefined,
        provider:
          data.provider ||
          editingAgent.provider ||
          undefined,
        visibility:
          data.visibility ||
          editingAgent.visibility ||
          "private",
        system_prompt:
          data.system_prompt ||
          editingAgent.system_prompt ||
          undefined,
        temperature:
          typeof data.temperature === "number"
            ? data.temperature
            : editingAgent.temperature || 0.7,
      },
    });
  }

  async function handleDelete(agent: Agent) {
    if (!window.confirm(`Delete "${agent.name}" permanently?`)) {
      return;
    }

    try {
      setDeletingId(agent.id);

      await deleteAgent(agent.id);

      queryClient.setQueryData(["agents"], (old: any) => ({
        ...old,
        items: (old?.items ?? []).filter(
          (a: Agent) => a.id !== agent.id
        ),
      }));
    } finally {
      setDeletingId(null);
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="relative min-h-[70vh] w-full">
        <OpenQCoreLoader />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        onRetry={() =>
          queryClient.invalidateQueries({
            queryKey: ["agents"],
          })
        }
      />
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-3 py-8 sm:px-6 xl:px-10">

      <FadeIn delay={0}>
        <AgentsToolbar
          search={search}
          loading={isFetching}
          onSearchChange={setSearch}
          onNew={openCreate}
        />
      </FadeIn>

      <FadeIn delay={100}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard
            label="Total"
            value={stats.total}
            color="default"
          />

          <StatCard
            label="Active"
            value={stats.active}
            color="emerald"
          />

          <StatCard
            label="Paused"
            value={stats.paused}
            color="amber"
          />
        </div>
      </FadeIn>

      <FadeIn delay={200}>
        {filteredAgents.length === 0 ? (
          <AgentEmptyState onNew={openCreate} />
        ) : (
          <AgentsGrid
            agents={filteredAgents}
            deletingId={deletingId}
            onEdit={(a) => {
              setEditingAgent(a);
              setShowCreate(true);
            }}
            onDelete={handleDelete}
            onChat={(a) => {
              const chatBase =
                process.env.NEXT_PUBLIC_CHAT_URL || "http://localhost:3000";
              window.open(`${chatBase}/qxt-chat/agent/${a.slug}`, "_blank");
            }}
            onOpenDetails={(a) =>
              router.push(`/console/agents/${a.id}`)
            }
          />
        )}
      </FadeIn>

      <CreateAgentModal
        open={showCreate}
        loading={submitting}
        initialData={editingAgent || undefined}
        onClose={closeModal}
        onCreate={editingAgent ? handleUpdate : handleCreate}
      />
    </div>
  );
}