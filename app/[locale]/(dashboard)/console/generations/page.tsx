"use client";

import React, { useState } from "react";
import { RefreshCw, Zap } from "lucide-react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ModelsProvider } from "@/app/context/ModelsContext";

import GenerationToolbar from "./GenerationToolbar";
import GenerationGrid from "./GenerationGrid";
import NewGenerationModal from "./NewGenerationModal";

import OpenQCoreLoader from "../../components/ui/OpenQCoreLoader";

import {
  getGenerations,
  deleteGeneration,
  rerunGeneration,
} from "@/app/lib/api/console/generations";
import type { GenerationItem } from "./types";

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
  onCreate,
}: {
  onCreate: () => void;
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
          <Zap className="h-8 w-8 text-amber-300/70" />
        </div>

        <div>
          <p className="text-sm font-semibold text-white/75">
            No generations yet
          </p>
          <p className="mt-1 text-xs text-white/32">
            Run your first AI prompt to get started
          </p>
        </div>

        <button
          onClick={onCreate}
          className="
            mt-2 h-9 rounded-xl bg-amber-300 px-5
            text-xs font-semibold text-black
            transition-all hover:bg-amber-200
          "
        >
          + New Generation
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
        Failed to load generations
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

// ─── Page ────────────────────────────────────────────────────────────────────

export default function GenerationsPage() {
  return (
    <ModelsProvider productKey="chat">
      <GenerationsContent />
    </ModelsProvider>
  );
}

// ─── Content ──────────────────────────────────────────────────────────────────

function GenerationsContent() {
  const queryClient = useQueryClient();

  const [showModal, setShowModal] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const [rerunningId, setRerunningId] =
    useState<string | null>(null);

  // ── Query ────────────────────────────────────────────────────────────────

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["generations"],
    queryFn: () => getGenerations(50, 0),
    staleTime: 30_000,
    retry: 1,
  });

  const items = data?.items ?? [];

  // ── Delete ────────────────────────────────────────────────────────────────

  const { mutateAsync: doDelete } = useMutation({
    mutationFn: deleteGeneration,
    onSuccess: (_, id) => {
      queryClient.setQueryData(["generations"], (old: any) => ({
        ...old,
        items: (old?.items ?? []).filter(
          (i: GenerationItem) => i.id !== id
        ),
      }));
    },
  });

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this generation?")) return;

    try {
      setDeletingId(id);
      await doDelete(id);
    } catch {
      // silent
    } finally {
      setDeletingId(null);
    }
  }

  // ── Rerun ─────────────────────────────────────────────────────────────────

  const { mutateAsync: doRerun } = useMutation({
    mutationFn: rerunGeneration,
    onSuccess: (newItem) => {
      queryClient.setQueryData(["generations"], (old: any) => ({
        ...old,
        items: [newItem, ...(old?.items ?? [])],
      }));
    },
  });

  async function handleRerun(id: string) {
    try {
      setRerunningId(id);
      await doRerun(id);
    } catch {
      // silent
    } finally {
      setRerunningId(null);
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

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
        <GenerationToolbar
          onCreate={() => setShowModal(true)}
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
          <EmptyState onCreate={() => setShowModal(true)} />
        ) : (
          <GenerationGrid
            items={items}
            deletingId={deletingId}
            rerunningId={rerunningId}
            onDelete={handleDelete}
            onRerun={handleRerun}
          />
        )}
      </FadeIn>

      <NewGenerationModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onCreated={(item) => {
          queryClient.setQueryData(["generations"], (old: any) => ({
            ...old,
            items: [item, ...(old?.items ?? [])],
          }));
          setShowModal(false);
        }}
      />
    </div>
  );
}