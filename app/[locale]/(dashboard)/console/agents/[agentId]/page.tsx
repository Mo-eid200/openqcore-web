"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Bot,
  BrainCircuit,
  Code2,
  Cpu,
  Database,
  FolderKanban,
  MessageSquare,
  Sparkles,
} from "lucide-react";

import OpenQCoreLoader from "../../../components/ui/OpenQCoreLoader";
import { getAgent } from "@/app/lib/api/console/agents";

import { OverviewTab } from "./OverviewTab";
import { KnowledgeTab } from "./KnowledgeTab";
import { ApiCodeTab } from "./ApiCodeTab";
import { ConversationsTab } from "./ConversationsTab";

// ─── Icon resolver (same as AgentCard) ───────────────────────────────────────

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

// ─── Tabs config ──────────────────────────────────────────────────────────────

type TabKey = "overview" | "knowledge" | "api" | "conversations";

const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: "overview",      label: "Overview",      icon: Sparkles },
  { key: "conversations", label: "Conversations", icon: MessageSquare },
  { key: "knowledge",     label: "Knowledge",     icon: Database },
  { key: "api",           label: "API & Code",    icon: Code2 },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AgentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const agentId = String(params?.agentId || "");

  const [tab, setTab] = useState<TabKey>("overview");

  const { data: agent, isLoading, error } = useQuery({
    queryKey: ["agent", agentId],
    queryFn: () => getAgent(agentId),
    enabled: !!agentId,
    staleTime: 30_000,
  });

  if (isLoading) {
    return (
      <div className="relative min-h-[70vh] w-full">
        <OpenQCoreLoader />
      </div>
    );
  }

  if (error || !agent) {
    return (
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-3 py-20 sm:px-6 xl:px-10">
        <div className="rounded-2xl border border-white/[0.06] bg-[#0f1012]/92 px-6 py-5 text-center shadow-[0_8px_24px_rgba(0,0,0,0.16)] backdrop-blur-xl">
          <p className="text-sm text-white/70">Agent not found</p>
          <button
            onClick={() => router.push("/console/agents")}
            className="mt-4 rounded-xl bg-amber-300 px-5 py-2.5 text-sm font-semibold text-black transition-all hover:bg-amber-200"
          >
            Back to Agents
          </button>
        </div>
      </div>
    );
  }

  const Icon = resolveIcon(agent.icon);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-3 py-8 sm:px-6 xl:px-10">
      {/* Back */}
      <button
        onClick={() => router.push("/console/agents")}
        className="inline-flex w-fit items-center gap-1.5 text-xs text-white/40 transition-all hover:text-white/70"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Agents
      </button>

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/[0.05] bg-amber-300/[0.08] text-amber-200">
          <Icon className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold tracking-tight text-white">
            {agent.name}
          </h1>
          <p className="mt-0.5 truncate text-sm text-white/45">{agent.role}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-white/[0.06]">
        {TABS.map(({ key, label, icon: TabIcon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`
              flex items-center gap-1.5 border-b-2 px-4 py-2.5 text-sm font-medium transition-all
              ${tab === key
                ? "border-amber-300 text-white"
                : "border-transparent text-white/40 hover:text-white/70"
              }
            `}
          >
            <TabIcon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="pb-10">
        {tab === "overview" && <OverviewTab agent={agent} />}
        {tab === "conversations" && (
          <ConversationsTab agentId={agent.id} />
        )}
        {tab === "knowledge" && <KnowledgeTab agentId={agent.id} agentName={agent.name} />}
        {tab === "api" && <ApiCodeTab agentId={agent.id} />}
      </div>
    </div>
  );
}