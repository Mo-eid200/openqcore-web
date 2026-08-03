"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { X, Database, Bot, Check, Loader2 } from "lucide-react";

import {
  getWorkspaceKnowledge,
  linkKnowledgeToAgent,
  unlinkKnowledgeFromAgent,
} from "@/app/lib/api/workspace/knowledge";
import {
  getWorkspaceAgents,
  getAgentKnowledgeLinks,
  linkAgentToKnowledge,
  unlinkAgentFromKnowledge,
} from "@/app/lib/api/workspace/agents";

// ─── Types ────────────────────────────────────────────────────────────────────

type Mode = "agent" | "knowledge";

type Props = {
  open:        boolean;
  mode:        Mode;          // "agent" = opened from an Agent card (pick Knowledge items)
                               // "knowledge" = opened from a Knowledge card (pick Agents)
  workspaceId: string;
  entityId:    string;        // agentId (mode="agent") or knowledgeItemId (mode="knowledge")
  entityName:  string;
  onClose:     () => void;
};

// ─── Component ────────────────────────────────────────────────────────────────

export function LinkKnowledgeModal({
  open,
  mode,
  workspaceId,
  entityId,
  entityName,
  onClose,
}: Props) {
  const queryClient = useQueryClient();

  const isAgentMode = mode === "agent";

  // ── Data to pick FROM (the "other side") ────────────────────────────────
  const { data: knowledgeData, isLoading: loadingKnowledge } = useQuery({
    queryKey: ["workspace-knowledge", workspaceId],
    queryFn:  () => getWorkspaceKnowledge(workspaceId),
    enabled:  open && isAgentMode,
    staleTime: 30_000,
  });

  const { data: agentsData, isLoading: loadingAgents } = useQuery({
    queryKey: ["workspace-agents", workspaceId],
    queryFn:  () => getWorkspaceAgents(workspaceId),
    enabled:  open && !isAgentMode,
    staleTime: 30_000,
  });

  // ── Currently linked IDs ─────────────────────────────────────────────────
  const { data: linkedKnowledgeIds, isLoading: loadingLinkedForAgent } = useQuery({
    queryKey: ["agent-knowledge-links", workspaceId, entityId],
    queryFn:  () => getAgentKnowledgeLinks(workspaceId, entityId),
    enabled:  open && isAgentMode,
    staleTime: 10_000,
  });

  const { data: linkedAgents, isLoading: loadingLinkedForKnowledge } = useQuery({
    queryKey: ["knowledge-agent-links", workspaceId, entityId],
    queryFn:  () => import("@/app/lib/api/workspace/knowledge").then(m =>
      m.getKnowledgeAgents(workspaceId, entityId)
    ),
    enabled:  open && !isAgentMode,
    staleTime: 10_000,
  });

  const linkedIds: string[] = isAgentMode
    ? (linkedKnowledgeIds ?? [])
    : (linkedAgents ?? []).map(a => a.id);

  const [pendingId, setPendingId] = React.useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function toggle(targetId: string, currentlyLinked: boolean) {
    setPendingId(targetId);
    try {
      if (isAgentMode) {
        if (currentlyLinked) {
          await unlinkAgentFromKnowledge(workspaceId, entityId, targetId);
        } else {
          await linkAgentToKnowledge(workspaceId, entityId, targetId);
        }
        queryClient.invalidateQueries({ queryKey: ["agent-knowledge-links", workspaceId, entityId] });
      } else {
        if (currentlyLinked) {
          await unlinkKnowledgeFromAgent(workspaceId, entityId, targetId);
        } else {
          await linkKnowledgeToAgent(workspaceId, entityId, targetId);
        }
        queryClient.invalidateQueries({ queryKey: ["knowledge-agent-links", workspaceId, entityId] });
      }
    } finally {
      setPendingId(null);
    }
  }

  if (!open || !mounted) return null;

  const isLoading = isAgentMode
    ? (loadingKnowledge || loadingLinkedForAgent)
    : (loadingAgents || loadingLinkedForKnowledge);

  const items = isAgentMode
    ? (knowledgeData?.items ?? [])
    : (agentsData?.items ?? []);

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-[480px] max-h-[80vh] flex flex-col overflow-hidden rounded-2xl border border-white/[0.10] bg-[#111214]/98 shadow-[0_40px_120px_rgba(0,0,0,0.68)] backdrop-blur-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.05] bg-red-500/[0.10] text-red-400">
              {isAgentMode ? <Database className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-white truncate">
                {isAgentMode ? "Link Knowledge" : "Link Agents"}
              </h2>
              <p className="mt-0.5 text-xs text-white/40 truncate">
                {entityName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white/30 transition-all hover:bg-white/[0.06] hover:text-white/60"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-5 w-5 animate-spin text-white/30" />
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-2 text-center">
              <p className="text-xs text-white/40">
                {isAgentMode ? "No knowledge sources in this workspace yet" : "No agents in this workspace yet"}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {items.map((item: any) => {
                const linked = linkedIds.includes(item.id);
                const pending = pendingId === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={pending}
                    onClick={() => toggle(item.id, linked)}
                    className={`
                      flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all
                      ${linked ? "bg-red-500/[0.08] border border-red-500/20" : "border border-transparent hover:bg-white/[0.04]"}
                      disabled:opacity-50
                    `}
                  >
                    <div className={`
                      flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
                      ${linked ? "bg-red-500 border-red-500" : "border-white/[0.15] bg-white/[0.02]"}
                    `}>
                      {pending ? (
                        <Loader2 className="h-3 w-3 animate-spin text-white" />
                      ) : linked ? (
                        <Check className="h-3 w-3 text-white" />
                      ) : null}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-medium text-white truncate">
                        {isAgentMode ? item.title : item.name}
                      </p>
                      <p className="text-[11px] text-white/35 truncate">
                        {isAgentMode ? item.type?.toUpperCase() : item.role}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/[0.06] px-5 py-3 shrink-0">
          <button
            onClick={onClose}
            className="h-9 w-full rounded-xl border border-white/[0.08] bg-white/[0.02] text-xs font-medium text-white/60 transition-all hover:bg-white/[0.05] hover:text-white"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
