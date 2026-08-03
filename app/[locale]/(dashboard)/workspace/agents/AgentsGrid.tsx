import React from "react";
import { Bot } from "lucide-react";
import { AgentCard } from "./AgentCard";
import type { WorkspaceAgent } from "@/app/lib/api/workspace/agents";

export function AgentsGrid({
  agents, workspaceId, onDelete, onToggle,
}: {
  agents:      WorkspaceAgent[];
  workspaceId: string;
  onDelete?:   (id: string) => void;
  onToggle?:   (id: string, status: string) => void;
}) {
  if (!agents.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02]">
          <Bot className="w-8 h-8 text-white/20" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-white/40">No agents yet</p>
          <p className="text-xs text-white/20 mt-1">Create your first agent to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {agents.map((a, i) => (
        <div key={a.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
          <AgentCard
            agent={a}
            workspaceId={workspaceId}
            onDelete={onDelete ? () => onDelete(a.id) : undefined}
            onToggle={onToggle ? (status) => onToggle(a.id, status) : undefined}
          />
        </div>
      ))}
    </div>
  );
}