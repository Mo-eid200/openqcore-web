"use client";

import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createPortal } from "react-dom";
import { HardDrive, Plus } from "lucide-react";

import { StorageOverview }     from "./StorageOverview";
import { StorageGrid }         from "./StorageGrid";
import { UploadStorageModal }  from "./UploadStorageModal";
import { UsageChart }          from "./UsageChart";

import { useWorkspace } from "@/app/context/WorkspaceContext";
import {
  getWorkspaceStorage,
  getStorageStats,
  deleteStorageFile,
  uploadWorkspaceFile,
  formatBytes,
  type StorageListResponse,
  type WorkspaceFile,
} from "@/app/lib/api/workspace/storage";

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
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse"
            style={{ animationDelay: `${i * 60}ms` }} />
        ))}
      </div>
      <div className="h-48 rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse" />
      <div className="flex flex-col gap-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-14 rounded-xl border border-white/[0.06] bg-white/[0.02] animate-pulse"
            style={{ animationDelay: `${i * 40}ms` }} />
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StoragePage() {
  const { activeWorkspace } = useWorkspace();
  const queryClient         = useQueryClient();
  const [search,      setSearch]      = useState("");
  const [kindFilter,  setKindFilter]  = useState("");
  const [showUpload,  setShowUpload]  = useState(false);
  const [uploadPct,   setUploadPct]   = useState(0);
  const [mounted,     setMounted]     = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  // ── Files query ────────────────────────────────────────────────────────────
  const { data, isLoading } = useQuery({
    queryKey:  ["workspace-storage", activeWorkspace?.id, kindFilter],
    queryFn:   () => getWorkspaceStorage(activeWorkspace!.id, {
      kind:  kindFilter || undefined,
      limit: 50,
    }),
    enabled:   !!activeWorkspace?.id,
    staleTime: 60_000,
    gcTime:    5 * 60_000,
    retry:     1,
  });

  // ── Stats query ────────────────────────────────────────────────────────────
  const { data: stats } = useQuery({
    queryKey:  ["workspace-storage-stats", activeWorkspace?.id],
    queryFn:   () => getStorageStats(activeWorkspace!.id),
    enabled:   !!activeWorkspace?.id,
    staleTime: 60_000,
  });

  // ── Upload ─────────────────────────────────────────────────────────────────
  const { mutateAsync: doUpload, isPending: uploading } = useMutation({
    mutationFn: (file: File) =>
      uploadWorkspaceFile(activeWorkspace!.id, file, setUploadPct),
    onSuccess: (uploaded) => {
      queryClient.setQueryData(
        ["workspace-storage", activeWorkspace?.id, kindFilter],
        (old: StorageListResponse | undefined) => ({
          ...old,
          items:       [uploaded, ...(old?.items ?? [])],
          total:       (old?.total ?? 0) + 1,
          total_bytes: (old?.total_bytes ?? 0) + uploaded.bytes,
        })
      );
      queryClient.invalidateQueries({ queryKey: ["workspace-storage-stats", activeWorkspace?.id] });
      setShowUpload(false);
      setUploadPct(0);
    },
  });

  // ── Delete ─────────────────────────────────────────────────────────────────
  const { mutateAsync: doDelete } = useMutation({
    mutationFn: (fileId: string) =>
      deleteStorageFile(activeWorkspace!.id, fileId),
    onSuccess: (_, fileId) => {
      queryClient.setQueryData(
        ["workspace-storage", activeWorkspace?.id, kindFilter],
        (old: StorageListResponse | undefined) => {
          const deleted = old?.items.find(f => f.id === fileId);
          return {
            ...old,
            items:       (old?.items ?? []).filter(f => f.id !== fileId),
            total:       Math.max(0, (old?.total ?? 1) - 1),
            total_bytes: Math.max(0, (old?.total_bytes ?? 0) - (deleted?.bytes ?? 0)),
          };
        }
      );
      queryClient.invalidateQueries({ queryKey: ["workspace-storage-stats", activeWorkspace?.id] });
    },
  });

  // ── Filter ─────────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q    = search.trim().toLowerCase();
    const list = data?.items ?? [];
    if (!q) return list;
    return list.filter(f =>
      f.filename?.toLowerCase().includes(q) ||
      f.kind.toLowerCase().includes(q)
    );
  }, [data?.items, search]);

  // ── Stats display ──────────────────────────────────────────────────────────
  const statsData = {
    total_files: stats?.total_files ?? 0,
    total_bytes: formatBytes(stats?.total_bytes ?? 0),
    images:      formatBytes(stats?.by_kind?.image ?? 0),
    documents:   formatBytes(stats?.by_kind?.document ?? 0),
    videos:      formatBytes(stats?.by_kind?.video ?? 0),
    other:       formatBytes(stats?.by_kind?.other ?? 0),
  };

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 xl:px-10 py-10 flex flex-col gap-8">

        {/* Header */}
        <FadeIn delay={0}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20">
                <HardDrive className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Storage</h1>
                <p className="text-sm text-white/40">Upload, monitor, and manage workspace files</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 h-9 px-4 rounded-xl bg-red-500 text-white text-[13px] font-semibold hover:bg-red-400 transition-all shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              Upload File
            </button>
          </div>
        </FadeIn>

        {isLoading ? <PageSkeleton /> : (
          <>
            {/* Stats */}
            <FadeIn delay={100}>
              <StorageOverview stats={statsData} />
            </FadeIn>

            {/* Chart */}
            <FadeIn delay={200}>
              <UsageChart
                byKind={stats?.by_kind ?? {}}
                totalBytes={stats?.total_bytes ?? 0}
              />
            </FadeIn>

            {/* Files */}
            <FadeIn delay={300}>
              <StorageGrid
                files={filtered}
                search={search}
                onSearch={setSearch}
                kindFilter={kindFilter}
                onKindFilter={setKindFilter}
                onDelete={async (id) => {
                  if (!window.confirm("Delete this file?")) return;
                  await doDelete(id);
                }}
              />
            </FadeIn>
          </>
        )}
      </div>

      {/* Upload Modal */}
      {mounted && createPortal(
        <UploadStorageModal
          open={showUpload}
          loading={uploading}
          progress={uploadPct}
          onClose={() => { setShowUpload(false); setUploadPct(0); }}
          onUpload={async (file) => { await doUpload(file); }}
        />,
        document.body
      )}
    </>
  );
}