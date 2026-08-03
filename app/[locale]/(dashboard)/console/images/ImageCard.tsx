"use client";

import React, { useState } from "react";
import {
  ImageIcon,
  Download,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
  Zap,
  Copy,
  CheckCheck,
} from "lucide-react";
import type { ImageItem } from "./types";

// ─── Status badge ─────────────────────────────────────────────────────────────

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

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  item: ImageItem;
  deleting?: boolean;
  onDelete?: (id: string) => void;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ImageCard({
  item,
  deleting,
  onDelete,
}: Props) {
  const [copied, setCopied] = useState(false);

  const hasImage =
    item.status === "completed" && item.output_url;

  function handleCopyPrompt() {
    navigator.clipboard.writeText(item.prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div
      className={`
        group relative flex flex-col overflow-hidden rounded-2xl
        border border-white/[0.06]
        bg-[#0f1012]/92 backdrop-blur-xl
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

      {/* ── Image ── */}
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-black/20">
        {hasImage ? (
          <img
            src={item.output_url!}
            alt={item.prompt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <ImageIcon className="h-8 w-8 text-white/10" />
            <StatusBadge status={item.status} />
          </div>
        )}

        {/* Overlay actions */}
        {hasImage && (
          <div
            className="
              absolute inset-0 flex items-end justify-center gap-2 pb-3
              bg-gradient-to-t from-black/70 via-black/20 to-transparent
              opacity-0 transition-opacity duration-200 group-hover:opacity-100
            "
          >
            <a
              href={item.output_url!}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/80 backdrop-blur-sm transition-all hover:bg-white/20"
              title="Open full size"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <a
              href={item.output_url!}
              download
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/80 backdrop-blur-sm transition-all hover:bg-white/20"
              title="Download"
            >
              <Download className="h-3.5 w-3.5" />
            </a>

            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-400/[0.20] text-red-200/80 backdrop-blur-sm transition-all hover:bg-red-400/[0.28]"
                title="Delete"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Info ── */}
      <div className="relative flex flex-col gap-2 p-3.5">
        {/* Prompt */}
        <div className="flex items-start gap-2">
          <p className="flex-1 line-clamp-2 text-xs leading-relaxed text-white/65">
            {item.prompt}
          </p>

          <button
            type="button"
            onClick={handleCopyPrompt}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-white/20 transition-all hover:bg-white/[0.06] hover:text-white/50"
            title="Copy prompt"
          >
            {copied ? (
              <CheckCheck className="h-3 w-3 text-emerald-300" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </button>
        </div>

        {/* Meta row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {hasImage && <StatusBadge status={item.status} />}

            {item.provider && (
              <span className="flex items-center gap-1 text-[10px] text-white/25">
                <Zap className="h-3 w-3 text-amber-300/70" />
                {item.provider}
              </span>
            )}

            {item.size && (
              <span className="text-[10px] text-white/20">
                {item.size}
              </span>
            )}
          </div>

          <span className="text-[10px] text-white/20">
            {new Date(item.created_at).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        {/* Error */}
        {item.error && (
          <p className="line-clamp-1 text-[11px] leading-relaxed text-red-200/70">
            ⚠ {item.error}
          </p>
        )}
      </div>
    </div>
  );
}