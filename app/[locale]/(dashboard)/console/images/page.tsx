"use client";

import React, { useMemo, useState } from "react";
import { ImageIcon, RefreshCw, Search } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import ImageToolbar from "./ImageToolbar";
import ImageGrid from "./ImageGrid";

import OpenQCoreLoader from "../../components/ui/OpenQCoreLoader";

import {
  getImages,
  getImageStats,
  deleteImage,
  type ImageItem,
} from "@/app/lib/api/console/images";

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

function EmptyState() {
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
          <ImageIcon className="h-8 w-8 text-amber-300/70" />
        </div>

        <div>
          <p className="text-sm font-semibold text-white/75">
            No images generated yet
          </p>
          <p className="mt-1 text-xs text-white/32">
            Use ChatQXT or the Iris API to generate images
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Empty Search ─────────────────────────────────────────────────────────────

function EmptySearchState() {
  return (
    <section
      className="
        rounded-3xl border border-white/[0.06]
        bg-[#0f1012]/92 px-6 py-16
        text-center shadow-[0_18px_50px_rgba(0,0,0,0.18)]
        backdrop-blur-2xl
      "
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.05] bg-white/[0.03]">
        <Search className="h-6 w-6 text-white/30" />
      </div>

      <p className="mt-4 text-sm font-semibold text-white/72">
        No matching images
      </p>

      <p className="mt-1 text-xs text-white/32">
        Try a different prompt keyword or clear the search.
      </p>
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
        Failed to load images
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

export default function PersonalImagePage() {
  const queryClient = useQueryClient();

  const [search, setSearch] =
    useState("");

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  // ── Query: images + stats معاً ───────────────────────────────────────────

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const [res, stats] = await Promise.all([
        getImages(100, 0),
        getImageStats(),
      ]);

      return {
        items: res.items,
        stats,
      };
    },
    staleTime: 30_000,
    retry: 1,
    refetchInterval: (query) => {
      const items = query.state.data?.items ?? [];

      const hasPending = items.some(
        (i: ImageItem) =>
          i.status === "pending" ||
          i.status === "processing"
      );

      return hasPending ? 8_000 : false;
    },
  });

  const items = data?.items ?? [];
  const stats = data?.stats ?? null;

  // ── Delete ────────────────────────────────────────────────────────────────

  const { mutateAsync: doDelete } = useMutation({
    mutationFn: deleteImage,
    onSuccess: (_, id) => {
      queryClient.setQueryData(["images"], (old: any) => ({
        ...old,
        items: (old?.items ?? []).filter(
          (i: ImageItem) => i.id !== id
        ),
      }));
    },
  });

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this image permanently?")) {
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

  // ── Filter ────────────────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return items;

    return items.filter((i: ImageItem) =>
      i.prompt.toLowerCase().includes(q)
    );
  }, [items, search]);

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
        <ImageToolbar
          onSearch={setSearch}
          total={stats?.total}
          ready={stats?.ready}
          pending={stats?.pending}
        />
      </FadeIn>

      {error && (
        <FadeIn delay={50}>
          <ErrorState onRetry={() => refetch()} />
        </FadeIn>
      )}

      <FadeIn delay={100}>
        {items.length === 0 ? (
          <EmptyState />
        ) : filtered.length === 0 ? (
          <EmptySearchState />
        ) : (
          <ImageGrid
            items={filtered}
            deletingId={deletingId}
            onDelete={handleDelete}
          />
        )}
      </FadeIn>
    </div>
  );
}