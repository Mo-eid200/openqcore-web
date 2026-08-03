"use client";

import React, { useState } from "react";
import { Brain, RefreshCw } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import KnowledgeToolbar from "./KnowledgeToolbar";
import KnowledgeGrid from "./KnowledgeGrid";
import UploadKnowledgeModal from "./UploadKnowledgeModal";

import OpenQCoreLoader from "../../components/ui/OpenQCoreLoader";

import {
  getKnowledgeItems,
  deleteKnowledgeItem,
  type KnowledgeItem,
} from "@/app/lib/api/console/knowledge";

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

// ─── Empty ────────────────────────────────────────────────────────────────────

function EmptyState({
  onUpload,
}: {
  onUpload: () => void;
}) {
  return (
    <section
      className="
        relative overflow-hidden rounded-3xl
        border border-white/[0.06]
        bg-[#0f1012]/92
        shadow-[0_18px_50px_rgba(0,0,0,0.22)]
        backdrop-blur-2xl
      "
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-60px] top-[-60px] h-[180px] w-[180px] rounded-full bg-amber-300/[0.06] blur-[80px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.025),transparent_38%)]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-4 px-6 py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.05] bg-amber-300/[0.08]">
          <Brain className="h-8 w-8 text-amber-300/70" />
        </div>

        <div>
          <p className="text-sm font-semibold text-white/75">
            No knowledge files yet
          </p>
          <p className="mt-1 text-xs text-white/32">
            Upload PDFs, documents or add text snippets
          </p>
        </div>

        <button
          onClick={onUpload}
          className="
            mt-2 h-9 rounded-xl bg-amber-300 px-5
            text-xs font-semibold text-black
            transition-all hover:bg-amber-200
          "
        >
          + Upload Knowledge
        </button>
      </div>
    </section>
  );
}

// ─── Error State ──────────────────────────────────────────────────────────────

function ErrorState({
  onRetry,
}: {
  onRetry: () => void;
}) {
  return (
    <div
      className="
        flex items-center justify-between rounded-2xl
        border border-red-300/15
        bg-red-300/[0.06]
        px-4 py-3
      "
    >
      <p className="text-xs text-red-200">
        Failed to load knowledge
      </p>

      <button
        onClick={onRetry}
        className="flex items-center gap-1.5 text-xs text-red-200/75 transition-all hover:text-red-100"
      >
        <RefreshCw className="h-3 w-3" />
        Retry
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function KnowledgePage() {
  const queryClient = useQueryClient();

  const [showUpload, setShowUpload] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  // ── Query ──────────────────────────────────────────────────────────────────

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["knowledge"],
    queryFn: () => getKnowledgeItems(50, 0),
    staleTime: 30_000,
    retry: 1,
    refetchInterval: (query) => {
      const items = query.state.data?.items ?? [];

      const hasPending = items.some(
        (i: KnowledgeItem) =>
          i.status === "pending" ||
          i.status === "processing"
      );

      return hasPending ? 5_000 : false;
    },
  });

  const items = data?.items ?? [];

  // ── Delete ─────────────────────────────────────────────────────────────────

  const { mutateAsync: doDelete } = useMutation({
    mutationFn: deleteKnowledgeItem,
    onSuccess: (_, id) => {
      queryClient.setQueryData(["knowledge"], (old: any) => ({
        ...old,
        items: (old?.items ?? []).filter(
          (i: KnowledgeItem) => i.id !== id
        ),
      }));
    },
  });

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this knowledge item permanently?")) {
      return;
    }

    try {
      setDeletingId(id);
      await doDelete(id);
    } catch {
      // silent
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

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-3 py-8 sm:px-6 xl:px-10">
      <FadeIn delay={0}>
        <KnowledgeToolbar
          onUpload={() => setShowUpload(true)}
          total={items.length}
        />
      </FadeIn>

      {error && (
        <FadeIn delay={50}>
          <ErrorState onRetry={() => refetch()} />
        </FadeIn>
      )}

      <FadeIn delay={100}>
        {items.length === 0 ? (
          <EmptyState onUpload={() => setShowUpload(true)} />
        ) : (
          <KnowledgeGrid
            items={items}
            deletingId={deletingId}
            onDelete={handleDelete}
          />
        )}
      </FadeIn>

      <UploadKnowledgeModal
        open={showUpload}
        onClose={() => setShowUpload(false)}
        onUpload={(item) => {
          queryClient.setQueryData(["knowledge"], (old: any) => ({
            ...old,
            items: [item, ...(old?.items ?? [])],
          }));
          setShowUpload(false);
        }}
      />
    </div>
  );
}