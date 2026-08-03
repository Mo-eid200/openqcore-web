"use client";

import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Loader2 } from "lucide-react";

import { getWorkspaceKnowledge } from "@/app/lib/api/workspace/knowledge";
import {
  getAgentKnowledgeLinks,
  linkAgentToKnowledge,
  unlinkAgentFromKnowledge,
} from "@/app/lib/api/workspace/agents";

export function KnowledgeTab({
  workspaceId,
  agentId,
  agentName,
}: {
  workspaceId: string;
  agentId:     string;
  agentName:   string;
}) {
  const queryClient = useQueryClient();

  const { data: knowledgeData, isLoading: loadingKnowledge } = useQuery({
    queryKey: ["workspace-knowledge", workspaceId],
    queryFn: () => getWorkspaceKnowledge(workspaceId),
    staleTime: 30_000,
  });

  const { data: linkedIds, isLoading: loadingLinks } = useQuery({
    queryKey: ["agent-knowledge-links", workspaceId, agentId],
    queryFn: () => getAgentKnowledgeLinks(workspaceId, agentId),
    staleTime: 10_000,
  });

  const [pendingId, setPendingId] = useState<string | null>(null);

  async function toggle(itemId: string, linked: boolean) {
    setPendingId(itemId);
    try {
      if (linked) {
        await unlinkAgentFromKnowledge(workspaceId, agentId, itemId);
      } else {
        await linkAgentToKnowledge(workspaceId, agentId, itemId);
      }
      queryClient.invalidateQueries({ queryKey: ["agent-knowledge-links", workspaceId, agentId] });
    } finally {
      setPendingId(null);
    }
  }

  const isLoading = loadingKnowledge || loadingLinks;
  const items = knowledgeData?.items ?? [];
  const linked = linkedIds ?? [];

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d10]/95 p-5">
      <h3 className="mb-1 text-sm font-semibold text-white">Linked Knowledge Sources</h3>
      <p className="mb-4 text-xs text-white/40">
        {agentName} will use these sources as context when answering, in addition to its system prompt.
      </p>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-5 w-5 animate-spin text-white/30" />
        </div>
      ) : items.length === 0 ? (
        <p className="py-8 text-center text-xs text-white/40">
          No knowledge sources uploaded yet in this workspace.
        </p>
      ) : (
        <div className="flex flex-col gap-1">
          {items.map((item) => {
            const isLinked = linked.includes(item.id);
            const pending = pendingId === item.id;

            return (
              <button
                key={item.id}
                type="button"
                disabled={pending}
                onClick={() => toggle(item.id, isLinked)}
                className={`
                  flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all
                  ${isLinked ? "bg-red-500/[0.08] border border-red-500/20" : "border border-transparent hover:bg-white/[0.04]"}
                  disabled:opacity-50
                `}
              >
                <div className={`
                  flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
                  ${isLinked ? "bg-red-500 border-red-500" : "border-white/[0.15] bg-white/[0.02]"}
                `}>
                  {pending ? (
                    <Loader2 className="h-3 w-3 animate-spin text-white" />
                  ) : isLinked ? (
                    <Check className="h-3 w-3 text-white" />
                  ) : null}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-white truncate">{item.title}</p>
                  <p className="text-[11px] text-white/35 truncate">{item.type.toUpperCase()}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
