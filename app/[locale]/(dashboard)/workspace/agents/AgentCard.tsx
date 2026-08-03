"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bot,
  BrainCircuit,
  CalendarClock,
  ChevronRight,
  Cpu,
  Database,
  FolderKanban,
  Pause,
  Play,
  Sparkles,
  Trash2,
  Zap,
} from "lucide-react";
import type { WorkspaceAgent } from "@/app/lib/api/workspace/agents";
import { LinkKnowledgeModal } from "../components/shared/LinkKnowledgeModal";

// ─── Icon resolver (kept in sync with the personal AgentCard) ───────────────

function resolveIcon(icon?: string) {
  switch (icon) {
    case "sparkles": return Sparkles;
    case "folder-kanban": return FolderKanban;
    case "brain": return BrainCircuit;
    case "bot": return Bot;
    case "cpu":
    default: return Cpu;
  }
}

const statusConfig = {
  active:   { label: "Active",   dot: "bg-emerald-400" },
  idle:     { label: "Idle",     dot: "bg-white/30" },
  inactive: { label: "Inactive", dot: "bg-white/20" },
  error:    { label: "Error",    dot: "bg-red-400" },
};

function formatDate(value?: string | null) {
  if (!value) return "Recently";
  try {
    return new Date(value).toLocaleDateString(undefined, {
      month: "short", day: "numeric", year: "numeric",
    });
  } catch {
    return "Recently";
  }
}

export function AgentCard({
  agent, workspaceId, onDelete, onToggle,
}: {
  agent:        WorkspaceAgent;
  workspaceId:  string;
  onDelete?:    () => void;
  onToggle?:    (status: string) => void;
}) {
  const router = useRouter();
  const [showLinker, setShowLinker] = useState(false);

  const Icon = resolveIcon(agent.icon);
  const cfg = statusConfig[agent.status as keyof typeof statusConfig] ?? statusConfig.idle;

  return (
    <div
      className="
        group relative overflow-hidden rounded-3xl
        border border-white/[0.06]
        bg-[#0f1012]/92 p-5
        backdrop-blur-2xl
        transition-all duration-300
        hover:-translate-y-1
        hover:border-red-500/20
        hover:bg-[#111214]/96
        hover:shadow-[0_18px_50px_rgba(0,0,0,0.26)]
      "
    >
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-40px] top-[-50px] h-[140px] w-[140px] rounded-full bg-red-500/[0.06] blur-[70px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.025),transparent_35%)]" />
      </div>

      {/* Top line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/20 to-transparent" />

      {/* Hover actions */}
      <div className="absolute right-4 top-4 z-20 flex items-center gap-2 opacity-0 transition-all duration-200 group-hover:opacity-100">
        <button
          type="button"
          onClick={() => onToggle?.(agent.status === "active" ? "inactive" : "active")}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/60 transition-all hover:border-red-500/20 hover:bg-red-500/[0.08] hover:text-red-300"
          title={agent.status === "active" ? "Deactivate" : "Activate"}
        >
          {agent.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>

        <button
          type="button"
          onClick={() => setShowLinker(true)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/60 transition-all hover:border-red-500/20 hover:bg-red-500/[0.08] hover:text-red-300"
          title="Link Knowledge"
        >
          <Database className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => onDelete?.()}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-400/10 bg-red-400/[0.05] text-red-300/70 transition-all hover:border-red-300/14 hover:bg-red-400/[0.08] hover:text-red-200"
          title="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Header */}
      <div className="relative flex items-start gap-4">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/[0.08] text-red-400 shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent" />
          <Icon className="relative h-6 w-6" />
        </div>

        <div className="min-w-0 flex-1 pr-24">
          <h3
            onClick={() => router.push(`/workspace/agents/${agent.id}`)}
            className="truncate text-lg font-bold tracking-tight text-white cursor-pointer transition-colors hover:text-red-400"
          >
            {agent.name}
          </h3>

          <div className="mt-1 flex items-center gap-2 text-xs text-white/45">
            <Zap className="h-3.5 w-3.5 text-red-400/80" />
            <span className="truncate">{agent.role}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-5 min-h-[60px] text-sm leading-7 text-white/58">
        {agent.description || "No description provided for this AI agent."}
      </div>

      {/* Metrics */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-3">
          <div className="text-[10px] uppercase tracking-wide text-white/35">Runs</div>
          <div className="mt-1 text-sm font-semibold text-white">
            {(agent.runs || 0).toLocaleString()}
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-3">
          <div className="text-[10px] uppercase tracking-wide text-white/35">Tokens</div>
          <div className="mt-1 text-sm font-semibold text-white">
            {(agent.tokens || 0).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-[11px] font-semibold text-white/70">
          <span className="relative flex h-2 w-2">
            <span className={`relative inline-flex h-2 w-2 rounded-full ${cfg.dot}`} />
          </span>
          {cfg.label}
        </div>

        {agent.model && (
          <div className="rounded-full border border-white/[0.05] bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-white/45">
            {agent.model}
          </div>
        )}

        <div className="ml-auto inline-flex items-center gap-1.5 text-[11px] text-white/35">
          <CalendarClock className="h-3.5 w-3.5" />
          {formatDate(agent.updated_at || agent.created_at)}
        </div>
      </div>

      {/* Bottom action */}
      <button
        type="button"
        onClick={() => router.push(`/workspace/agents/${agent.id}`)}
        className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] text-sm font-semibold text-white/80 transition-all hover:border-red-500/20 hover:bg-red-500/[0.08] hover:text-red-300"
      >
        View Agent
        <ChevronRight className="h-4 w-4" />
      </button>

      <LinkKnowledgeModal
        open={showLinker}
        mode="agent"
        workspaceId={workspaceId}
        entityId={agent.id}
        entityName={agent.name}
        onClose={() => setShowLinker(false)}
      />
    </div>
  );
}
