"use client";

import { useState } from "react";
import type { VoiceItem } from "../../../../lib/api/workspace/voice";
import ConfirmDialog from "./ConfirmDialog";
import TextActions from "./TextActions";

interface VoiceCardProps {
  item: VoiceItem;
  onDelete: (id: string) => Promise<void>;
}

function getStatusTone(status: string) {
  switch (status) {
    case "ready":
      return "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20";
    case "pending":
    case "processing":
      return "bg-amber-500/10 text-amber-300 border border-amber-500/20";
    case "failed":
      return "bg-red-500/10 text-red-300 border border-red-500/20";
    default:
      return "bg-white/5 text-zinc-300 border border-white/10";
  }
}

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

function formatDuration(seconds: number | null) {
  if (!seconds && seconds !== 0) return "—";
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return `${mins}m ${secs}s`;
}

export default function VoiceCard({ item, onDelete }: VoiceCardProps) {
  const preview = item.type === "stt" ? item.transcript : item.prompt;

  // 🔧 NEW: delete now goes through a real confirmation step -- was
  // previously calling onDelete(item.id) directly on click with zero
  // confirmation of any kind (not even a browser confirm()).
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-zinc-400">
              {item.type}
            </span>
            <span className={`rounded-full px-2.5 py-1 text-xs ${getStatusTone(item.status)}`}>
              {item.status}
            </span>
          </div>

          <h3 className="truncate text-sm font-semibold text-white">
            {item.title || (item.type === "tts" ? "Untitled speech" : "Untitled transcription")}
          </h3>

          {/* 🔧 FIX: removed `· {item.provider || "Unknown provider"}`
              from this line -- providers (Azure/OpenAI) are never
              shown to the user, per the earlier design decision. */}
          <p className="mt-1 text-xs text-zinc-400">
            {formatDate(item.created_at)} · {formatDuration(item.duration)}
          </p>
        </div>

        <button
          onClick={() => setConfirmOpen(true)}
          className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs text-red-300 transition hover:bg-red-500/15"
        >
          Delete
        </button>
      </div>

      {preview ? (
        <TextActions text={preview} filename={item.title || "voice-text"}>
          <p className="line-clamp-4 text-sm leading-6 text-zinc-300">
            {preview}
          </p>
        </TextActions>
      ) : (
        <p className="text-sm text-zinc-500">
          No preview available.
        </p>
      )}

      {item.error ? (
        <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-300">
          {item.error}
        </div>
      ) : null}

      {item.url ? (
        <div className="mt-4 space-y-3">
          <audio className="w-full" controls src={item.url} />
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex text-xs text-zinc-300 underline underline-offset-4 hover:text-white"
          >
          </a>
        </div>
      ) : null}

      <ConfirmDialog
        open={confirmOpen}
        title="Delete this voice job?"
        description={
          item.title
            ? `"${item.title}" will be permanently deleted. This cannot be undone.`
            : "This voice job will be permanently deleted. This cannot be undone."
        }
        confirmLabel="Delete"
        onConfirm={async () => {
          await onDelete(item.id);
          setConfirmOpen(false);
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}