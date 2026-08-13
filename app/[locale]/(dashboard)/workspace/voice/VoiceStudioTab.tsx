"use client";

import VoiceGrid from "./VoiceGrid";
import type { VoiceStudioTabProps } from "./types";

export default function VoiceStudioTab({
  items,
  stats,
  options,
  onOpenCreate,
  onDelete,
  refreshAll,
  workspaceId,
}: VoiceStudioTabProps) {
  const recent = items.slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 p-6">
          <div className="mb-4">
            <div className="mb-3 inline-flex rounded-2xl border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-red-300">
              Speech
            </div>
            <h2 className="text-2xl font-semibold text-white">Generate lifelike voice</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
              Turn text into polished speech using your workspace voice providers and defaults.
            </p>
          </div>

          <button
            onClick={() => onOpenCreate("tts")}
            className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-400"
          >
            Create TTS
          </button>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 p-6">
          <div className="mb-4">
            <div className="mb-3 inline-flex rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-zinc-300">
              Transcription
            </div>
            <h2 className="text-2xl font-semibold text-white">Transcribe uploaded audio</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
              Upload voice recordings and convert them into text with your workspace STT providers.
            </p>
          </div>

          <button
            onClick={() => onOpenCreate("stt")}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Upload audio
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Total Jobs</p>
          <p className="mt-3 text-2xl font-semibold text-white">{stats?.total ?? 0}</p>
        </div>
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-emerald-300">Ready</p>
          <p className="mt-3 text-2xl font-semibold text-white">{stats?.ready ?? 0}</p>
        </div>
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-amber-300">Pending</p>
          <p className="mt-3 text-2xl font-semibold text-white">{stats?.pending ?? 0}</p>
        </div>
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-red-300">Failed</p>
          <p className="mt-3 text-2xl font-semibold text-white">{stats?.failed ?? 0}</p>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-white">Recent jobs</h3>
            <p className="mt-1 text-sm text-zinc-400">
              Latest voice generations and transcriptions in this workspace.
            </p>
          </div>

          <div className="text-xs text-zinc-500">
            {options.length} voice option{options.length === 1 ? "" : "s"} available
          </div>
        </div>

        <VoiceGrid
          workspaceId={workspaceId}
          refreshAll={refreshAll}
          items={recent}
          search=""
          status="all"
          onDelete={onDelete}
        />
      </section>
    </div>
  );
}