"use client";

import React, { useMemo, useState } from "react";
import { AudioLines, Plus, RefreshCw, Search } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import VoiceToolbar from "./VoiceToolbar";
import VoiceGrid from "./VoiceGrid";
import NewVoiceModal from "./NewVoiceModal";

import OpenQCoreLoader from "../../components/ui/OpenQCoreLoader";

import {
  getVoiceJobs,
  getVoiceStats,
  deleteVoiceJob,
  type VoiceItem,
} from "@/app/lib/api/console/voice";

// ─── Fade wrapper ─────────────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div className="animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── Empty ────────────────────────────────────────────────────────────────────

function EmptyState({ onCreate }: { onCreate: () => void }) {
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
          <AudioLines className="h-8 w-8 text-amber-300/70" />
        </div>

        <div>
          <p className="text-sm font-semibold text-white/75">No voice clips yet</p>
          <p className="mt-1 text-xs text-white/32">
            Generate speech from text, or transcribe an audio file
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
          + New Voice Clip
        </button>
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
      <p className="mt-4 text-sm font-semibold text-white/72">No matching voice clips</p>
      <p className="mt-1 text-xs text-white/32">Try a different title or prompt keyword.</p>
    </section>
  );
}

// ─── Error State ──────────────────────────────────────────────────────────────

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-red-300/15 bg-red-300/[0.06] px-4 py-3">
      <p className="text-xs text-red-200">Failed to load voice clips</p>
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

// ─── Tab ──────────────────────────────────────────────────────────────────────

export default function VoiceStudioTab() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["voice"],
    queryFn: async () => {
      const [res, stats] = await Promise.all([getVoiceJobs(100, 0), getVoiceStats()]);
      return { items: res.items, stats };
    },
    staleTime: 30_000,
    retry: 1,
    refetchInterval: (query) => {
      const items = query.state.data?.items ?? [];
      const hasPending = items.some(
        (i: VoiceItem) => i.status === "pending" || i.status === "processing"
      );
      return hasPending ? 8_000 : false;
    },
  });

  const items = data?.items ?? [];
  const stats = data?.stats ?? null;

  const { mutateAsync: doDelete } = useMutation({
    mutationFn: deleteVoiceJob,
    onSuccess: (_, id) => {
      queryClient.setQueryData(["voice"], (old: any) => ({
        ...old,
        items: (old?.items ?? []).filter((i: VoiceItem) => i.id !== id),
      }));
    },
  });

    async function handleDelete(id: string) {
    try {
      setDeletingId(id);
      await doDelete(id);
    } catch {
      // silent
    } finally {
      setDeletingId(null);
    }
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i: VoiceItem) =>
        (i.title || "").toLowerCase().includes(q) ||
        (i.prompt || "").toLowerCase().includes(q)
    );
  }, [items, search]);

  if (isLoading) {
    return (
      <div className="relative min-h-[50vh] w-full">
        <OpenQCoreLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <FadeIn delay={0}>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <VoiceToolbar
              onSearch={setSearch}
              total={stats?.total}
              ready={stats?.ready}
              pending={stats?.pending}
            />
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="
              flex h-11 shrink-0 items-center gap-2 rounded-xl
              bg-amber-300 px-5 text-sm font-semibold text-black
              shadow-[0_8px_24px_rgba(251,191,36,0.18)]
              transition-all duration-200
              hover:scale-[1.01] hover:bg-amber-200
              active:scale-[0.99]
            "
          >
            <Plus className="h-4 w-4" />
            New
          </button>
        </div>
      </FadeIn>

      {error && (
        <FadeIn delay={50}>
          <ErrorState onRetry={() => refetch()} />
        </FadeIn>
      )}

      <FadeIn delay={100}>
        {items.length === 0 ? (
          <EmptyState onCreate={() => setShowModal(true)} />
        ) : filtered.length === 0 ? (
          <EmptySearchState />
        ) : (
          <VoiceGrid items={filtered} deletingId={deletingId} onDelete={handleDelete} />
        )}
      </FadeIn>

      <NewVoiceModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onCreated={(item) => {
          queryClient.setQueryData(["voice"], (old: any) => ({
            ...old,
            items: [item, ...(old?.items ?? [])],
          }));
          setShowModal(false);
        }}
      />
    </div>
  );
}