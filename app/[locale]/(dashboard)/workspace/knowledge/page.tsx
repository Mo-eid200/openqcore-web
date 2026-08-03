"use client";

import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Database } from "lucide-react";

import { KnowledgeToolbar }     from "./KnowledgeToolbar";
import { KnowledgeGrid }        from "./KnowledgeGrid";
import { UploadKnowledgeModal } from "./UploadKnowledgeModal";

import { useWorkspace } from "@/app/context/WorkspaceContext";
import {
  getWorkspaceKnowledge,
  uploadWorkspaceKnowledgeFile,
  deleteWorkspaceKnowledge,
  type WorkspaceKnowledgeItem,
  type KnowledgeListResponse,
} from "@/app/lib/api/workspace/knowledge";

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
          className="h-40 rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse"
          style={{ animationDelay: `${i * 60}ms` }}
        />
      ))}
    </div>
  );
}

// ─── Format ───────────────────────────────────────────────────────────────────

function formatSize(bytes: number | null): string {
  if (!bytes) return "—";
  if (bytes < 1024)        return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60)  return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs  < 24)  return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function toGridItem(item: WorkspaceKnowledgeItem) {
  return {
    id:         item.id,
    name:       item.title,
    type:       item.type.toUpperCase(),
    size:       formatSize(item.file_size),
    uploadedAt: formatDate(item.created_at),
    status:     item.status,
    embeddings: 0,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function KnowledgePage() {
  const { activeWorkspace } = useWorkspace();
  const queryClient         = useQueryClient();
  const [search,     setSearch]     = useState("");
  const [showUpload, setShowUpload] = useState(false);

  // ── Query ──────────────────────────────────────────────────────────────────
  const { data, isLoading } = useQuery({
    queryKey:  ["workspace-knowledge", activeWorkspace?.id],
    queryFn:   () => getWorkspaceKnowledge(activeWorkspace!.id),
    enabled:   !!activeWorkspace?.id,
    staleTime: 60_000,
    gcTime:    5 * 60_000,
    retry:     1,
    // Poll every 3s while any item is still processing, so the status
    // badge flips to "Processed" on its own without a manual refresh.
    // Stops polling automatically once nothing is left processing.
    refetchInterval: (query) => {
      const items = query.state.data?.items ?? [];
      const stillProcessing = items.some(
        (item: any) => item.status === "processing" || item.status === "pending"
      );
      return stillProcessing ? 3000 : false;
    },
  });

  // ── Upload ─────────────────────────────────────────────────────────────────
  const { mutateAsync: doUpload, isPending: uploading } = useMutation({
    mutationFn: ({ file, onProgress, description }: { file: File; onProgress: (pct: number) => void; description?: string }) =>
      uploadWorkspaceKnowledgeFile(activeWorkspace!.id, file, onProgress, description),
    onSuccess: (created) => {
      queryClient.setQueryData(
        ["workspace-knowledge", activeWorkspace?.id],
        (old: KnowledgeListResponse | undefined) => ({
          ...old,
          items: [created, ...(old?.items ?? [])],
          total: (old?.total ?? 0) + 1,
        })
      );
    },
  });

  // ── Delete ─────────────────────────────────────────────────────────────────
  const { mutateAsync: doDelete } = useMutation({
    mutationFn: (itemId: string) =>
      deleteWorkspaceKnowledge(activeWorkspace!.id, itemId),
    onSuccess: (_, itemId) => {
      queryClient.setQueryData(
        ["workspace-knowledge", activeWorkspace?.id],
        (old: KnowledgeListResponse | undefined) => ({
          ...old,
          items: (old?.items ?? []).filter(i => i.id !== itemId),
          total: Math.max(0, (old?.total ?? 1) - 1),
        })
      );
    },
  });

  // ── Filter ─────────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q    = search.trim().toLowerCase();
    const list = data?.items ?? [];
    return (q
      ? list.filter(i =>
          i.title.toLowerCase().includes(q) ||
          i.type.toLowerCase().includes(q)
        )
      : list
    ).map(toGridItem);
  }, [data?.items, search]);

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 xl:px-10 py-10 flex flex-col gap-8">

        <FadeIn delay={0}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20">
              <Database className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Knowledge</h1>
              <p className="text-sm text-white/40">Upload files, connect data, and manage AI knowledge sources</p>
            </div>
            <div className="ml-auto text-[12px] text-white/25">
              {data?.total ?? 0} sources
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <KnowledgeToolbar
            search={search}
            onSearch={setSearch}
            onUpload={() => setShowUpload(true)}
          />
        </FadeIn>

        <FadeIn delay={200}>
          {isLoading ? (
            <PageSkeleton />
          ) : (
            <KnowledgeGrid
              sources={filtered}
              workspaceId={activeWorkspace?.id ?? ""}
              onCardMenu={async (source) => {
                if (!window.confirm(`Delete "${source.name}"?`)) return;
                await doDelete(source.id);
              }}
            />
          )}
        </FadeIn>

      </div>

      <UploadKnowledgeModal
        open={showUpload}
        loading={uploading}
        onClose={() => setShowUpload(false)}
        onUpload={async (file, onProgress, description) => {
          await doUpload({ file, onProgress, description });
        }}
      />
    </>
  );
}