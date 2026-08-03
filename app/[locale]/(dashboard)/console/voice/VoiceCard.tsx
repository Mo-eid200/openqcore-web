"use client";

import React, { useRef, useState } from "react";
import {
  AudioLines,
  Play,
  Pause,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
  Download,
  FileText,
  Mic,
  Waves,
} from "lucide-react";
import type { VoiceItem } from "./types";

// ─── Status ───────────────────────────────────────────────────────────────────

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const map: Record<
    string,
    {
      text: string;
      cls: string;
      icon: React.ElementType;
    }
  > = {
    completed: {
      text: "Ready",
      cls: "border-emerald-300/10 bg-emerald-300/[0.08] text-emerald-200",
      icon: CheckCircle2,
    },
    processing: {
      text: "Processing",
      cls: "border-amber-300/10 bg-amber-300/[0.08] text-amber-200",
      icon: Loader2,
    },
    pending: {
      text: "Pending",
      cls: "border-amber-300/10 bg-amber-300/[0.08] text-amber-200",
      icon: Clock,
    },
    failed: {
      text: "Failed",
      cls: "border-red-300/10 bg-red-300/[0.08] text-red-200",
      icon: AlertCircle,
    },
  };

  const s = map[status] ?? map.pending;
  const Icon = s.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] font-semibold ${s.cls}`}
    >
      <Icon
        className={`h-3 w-3 ${
          status === "processing" ? "animate-spin" : ""
        }`}
      />
      {s.text}
    </span>
  );
}

// ─── Type badge ───────────────────────────────────────────────────────────────

function TypeBadge({
  type,
}: {
  type: string;
}) {
  const map: Record<
    string,
    {
      label: string;
      cls: string;
      icon: React.ElementType;
    }
  > = {
    tts: {
      label: "TTS",
      cls: "border-violet-300/10 bg-violet-300/[0.08] text-violet-200",
      icon: Waves,
    },
    stt: {
      label: "Transcript",
      cls: "border-blue-300/10 bg-blue-300/[0.08] text-blue-200",
      icon: FileText,
    },
    record: {
      label: "Recording",
      cls: "border-amber-300/10 bg-amber-300/[0.08] text-amber-200",
      icon: Mic,
    },
  };

  const t = map[type] ?? map.tts;
  const Icon = t.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${t.cls}`}
    >
      <Icon className="h-3 w-3" />
      {t.label}
    </span>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDuration(sec: number | null) {
  if (!sec) return null;
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  item: VoiceItem;
  deleting?: boolean;
  onDelete?: (id: string) => void;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function VoiceCard({
  item,
  deleting,
  onDelete,
}: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  function togglePlay() {
    if (!audioRef.current || !item.url) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  }

  return (
    <div
      className={`
        group relative flex flex-col overflow-hidden rounded-2xl
        border border-white/[0.06]
        bg-[#0f1012]/92 p-4 backdrop-blur-xl
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-amber-300/12
        hover:bg-[#111214]/96
        hover:shadow-[0_16px_40px_rgba(0,0,0,0.22)]
        ${deleting ? "pointer-events-none opacity-50" : ""}
      `}
    >
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-40px] top-[-50px] h-[120px] w-[120px] rounded-full bg-amber-300/[0.04] blur-[70px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.025),transparent_35%)]" />
      </div>

      {/* Top line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/15 to-transparent" />

      {/* ── Header ── */}
      <div className="relative flex items-start gap-3">
        {/* Play button */}
        <button
          type="button"
          onClick={togglePlay}
          disabled={!item.url}
          className={`
            flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all
            ${
              item.url
                ? playing
                  ? "border-amber-300/12 bg-amber-300/[0.10] text-amber-200"
                  : "border-white/[0.08] bg-white/[0.04] text-white/50 hover:border-amber-300/12 hover:text-amber-200"
                : "cursor-not-allowed border-white/[0.05] bg-white/[0.02] text-white/15"
            }
          `}
        >
          {playing ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="ml-0.5 h-4 w-4" />
          )}
        </button>

        {/* Hidden audio */}
        {item.url && (
          <audio
            ref={audioRef}
            src={item.url}
            onEnded={() => setPlaying(false)}
            preload="none"
          />
        )}

        {/* Info */}
        <div className="min-w-0 flex-1 pt-0.5">
          <div className="truncate text-[13px] font-semibold text-white">
            {item.title || "Untitled"}
          </div>

          <div className="mt-1 flex items-center gap-2">
            <TypeBadge type={item.type} />

            {item.duration && (
              <span className="text-[10px] text-white/25">
                {formatDuration(item.duration)}
              </span>
            )}

            {item.provider && (
              <span className="flex items-center gap-1 text-[10px] text-white/22">
                <AudioLines className="h-3 w-3 text-amber-300/65" />
                {item.provider}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1 opacity-0 transition-all duration-200 group-hover:opacity-100">
          {item.url && (
            <a
              href={item.url}
              download
              className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 transition-all hover:bg-white/[0.06] hover:text-white/70"
              title="Download"
            >
              <Download className="h-3.5 w-3.5" />
            </a>
          )}

          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(item.id)}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-red-300/40 transition-all hover:bg-red-400/[0.08] hover:text-red-200"
              title="Delete"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ── Prompt / Transcript ── */}
      {item.prompt && (
        <p className="relative mt-3 line-clamp-2 text-xs leading-relaxed text-white/45">
          {item.prompt}
        </p>
      )}

      {item.transcript && (
        <div className="relative mt-2 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5">
          <div className="mb-1 flex items-center gap-1">
            <FileText className="h-3 w-3 text-white/25" />
            <span className="text-[10px] font-medium uppercase tracking-wider text-white/25">
              Transcript
            </span>
          </div>

          <p className="line-clamp-3 text-xs leading-relaxed text-white/55">
            {item.transcript}
          </p>
        </div>
      )}

      {/* ── Error ── */}
      {item.error && (
        <p className="relative mt-2 line-clamp-1 text-[11px] text-red-200/70">
          ⚠ {item.error}
        </p>
      )}

      {/* ── Footer ── */}
      <div className="relative mt-3 flex items-center justify-between border-t border-white/[0.05] pt-3">
        <StatusBadge status={item.status} />

        <span className="text-[10px] text-white/20">
          {new Date(item.created_at).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}