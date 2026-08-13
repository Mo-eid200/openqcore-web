"use client";

import VoiceCard from "./VoiceCard";
import type { VoiceJobsViewProps } from "./types";

export default function VoiceGrid({
  items,
  loading,
  onDelete,
}: VoiceJobsViewProps) {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-64 animate-pulse rounded-2xl border border-white/10 bg-white/5"
          />
        ))}
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-16 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-400">
          🎙️
        </div>
        <h3 className="text-lg font-semibold text-white">No voice jobs yet</h3>
        <p className="mt-2 text-sm text-zinc-400">
          Generate speech from text or upload audio to create your first voice job.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <VoiceCard key={item.id} item={item} onDelete={onDelete} />
      ))}
    </div>
  );
}