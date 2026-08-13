"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Bot, Code2, Database, MessageSquare, Sparkles } from "lucide-react";

import { useWorkspace } from "@/app/context/WorkspaceContext";
import { getWorkspaceAgent } from "@/app/lib/api/workspace/agents";

import { OverviewTab } from "./OverviewTab";
import { KnowledgeTab } from "./KnowledgeTab";
import { ApiCodeTab } from "./ApiCodeTab";
import { WorkspaceConversationsTab } from "./WorkspaceConversationsTab";

type TabKey = "overview" | "conversations" | "knowledge" | "api";

const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: "overview",      label: "Overview",      icon: Sparkles },
  { key: "conversations", label: "Conversations", icon: MessageSquare },
  { key: "knowledge",     label: "Knowledge",     icon: Database },
  { key: "api",           label: "API & Code",    icon: Code2 },
];

export default function WorkspaceAgentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { activeWorkspace } = useWorkspace();
  const agentId = String(params?.agentId || "");

  const [tab, setTab] = useState<TabKey>("overview");

  const { data: agent, isLoading, error } = useQuery({
    queryKey: ["workspace-agent", activeWorkspace?.id, agentId],
    queryFn: () => getWorkspaceAgent(activeWorkspace!.id, agentId),
    enabled: !!agentId && !!activeWorkspace?.id,
    staleTime: 30_000,
  });

  if (isLoading) {
    return (
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-3 py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-red-400" />
      </div>
    );
  }

  if (error || !agent) {
    return (
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-3 py-20 sm:px-6 xl:px-10">
        <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d10]/95 px-6 py-5 text-center">
          <p className="text-sm text-white/70">Agent not found</p>
          <button
            onClick={() => router.push("/workspace/agents")}
            className="mt-4 rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-400"
          >
            Back to Agents
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-3 py-8 sm:px-6 xl:px-10">
      <button
        onClick={() => router.push("/workspace/agents")}
        className="inline-flex w-fit items-center gap-1.5 text-xs text-white/40 transition-all hover:text-white/70"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Agents
      </button>

      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/[0.08] text-red-400">
          <Bot className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold tracking-tight text-white">
            {agent.name}
          </h1>
          <p className="mt-0.5 truncate text-sm text-white/45">{agent.role}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-white/[0.06]">
        {TABS.map(({ key, label, icon: TabIcon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`
              flex items-center gap-1.5 border-b-2 px-4 py-2.5 text-sm font-medium transition-all
              ${tab === key
                ? "border-red-500 text-white"
                : "border-transparent text-white/40 hover:text-white/70"
              }
            `}
          >
            <TabIcon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      <div className="pb-10">
        {tab === "overview" && <OverviewTab agent={agent} />}
        {tab === "conversations" && (
          <WorkspaceConversationsTab
            workspaceId={activeWorkspace!.id}
            agentId={agent.id}
          />
        )}
        {tab === "knowledge" && (
          <KnowledgeTab workspaceId={activeWorkspace!.id} agentId={agent.id} agentName={agent.name} />
        )}
        {tab === "api" && (
          <ApiCodeTab workspaceId={activeWorkspace!.id} agentId={agent.id} />
        )}
      </div>
    </div>
  );
}