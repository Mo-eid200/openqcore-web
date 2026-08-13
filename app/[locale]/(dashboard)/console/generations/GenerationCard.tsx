"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Copy,
  Trash2,
  RotateCcw,
  CheckCheck,
  AlertCircle,
  Clock,
  Zap,
  Hash,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { GenerationItem } from "./types";

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({
  status,
}: {
  status: GenerationItem["status"];
}) {
  const map = {
    success:
      "border-emerald-300/10 bg-emerald-300/[0.08] text-emerald-200",
    pending:
      "border-amber-300/10 bg-amber-300/[0.08] text-amber-200",
    failed:
      "border-red-300/10 bg-red-300/[0.08] text-red-200",
  };

  const icons = {
    success: CheckCheck,
    pending: Clock,
    failed: AlertCircle,
  };

  const Icon = icons[status];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full border px-2 py-1
        text-[11px] font-semibold ${map[status]}
      `}
    >
      {/* 🔧 Pending now pulses gently — a static clock icon read as
          "stalled" rather than "actively working on it". */}
      <Icon
        className={`h-3 w-3 ${status === "pending" ? "animate-pulse" : ""}`}
      />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

// ─── Metadata pill (model / generation number) ───────────────────────────────

function MetaPill({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <span
      className="
        inline-flex items-center gap-1 rounded-full
        border border-white/[0.05] bg-white/[0.03]
        px-2 py-0.5 text-[10px] font-medium text-white/50
      "
    >
      <Icon className="h-2.5 w-2.5 text-amber-200/70" />
      {children}
    </span>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  item: GenerationItem;
  deleting?: boolean;
  onDelete?: (id: string) => void;
  onRerun?: (id: string) => void;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function GenerationCard({
  item,
  deleting,
  onDelete,
  onRerun,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const isLong =
    (item.result?.length ?? 0) > 200;

  function handleCopy() {
    if (!item.result) return;

    navigator.clipboard.writeText(item.result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
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
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/15 to-transparent" />

      {/* ── Header ── */}
      <div className="relative flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.05] bg-amber-300/[0.08] text-amber-200">
          <Sparkles className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <div className="truncate text-[13px] font-semibold text-white">
            {item.title || "Untitled Generation"}
          </div>

          {/* 🔧 Model + generation number as consistent pill badges
              (was plain inline text) — only these two are ever shown,
              per requirement: no provider, no other internal detail. */}
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {item.model && (
              <MetaPill icon={Zap}>{item.model}</MetaPill>
            )}

            {typeof item.sequence === "number" && (
              <MetaPill icon={Hash}>Gen {item.sequence}</MetaPill>
            )}

            {item.tokens_used ? (
              <span className="text-[10px] text-white/25">
                {item.tokens_used.toLocaleString()} tokens
              </span>
            ) : null}
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1 opacity-0 transition-all duration-200 group-hover:opacity-100">
          {item.result && (
            <button
              type="button"
              onClick={handleCopy}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 transition-all hover:bg-white/[0.06] hover:text-white/75"
              title="Copy result"
            >
              {copied ? (
                <CheckCheck className="h-3.5 w-3.5 text-emerald-300" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          )}

          {onRerun && (
            <button
              type="button"
              onClick={() => onRerun(item.id)}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 transition-all hover:bg-amber-300/[0.08] hover:text-amber-200"
              title="Re-run"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
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

      {/* ── Prompt ── */}
      <div className="relative mt-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5">
        <div className="mb-1 text-[10px] font-medium uppercase tracking-wider text-white/25">
          Prompt
        </div>

        <p className="line-clamp-2 text-xs leading-relaxed text-white/50">
          {item.prompt}
        </p>
      </div>

      {/* ── Result ── */}
      {item.result && (
        <div className="relative mt-2 rounded-xl border border-amber-300/10 bg-amber-300/[0.04] px-3 py-2.5">
          <div className="mb-1 text-[10px] font-medium uppercase tracking-wider text-amber-200/45">
            Result
          </div>

          <p
            className={`font-mono whitespace-pre-wrap text-xs leading-relaxed text-white/78 ${
              !expanded && isLong ? "line-clamp-4" : ""
            }`}
          >
            {item.result}
          </p>

          {isLong && (
            <button
              type="button"
              onClick={() => setExpanded((p) => !p)}
              className="mt-1.5 flex items-center gap-1 text-[10px] text-amber-200/55 transition-colors hover:text-amber-200"
            >
              {expanded ? (
                <>
                  <ChevronUp className="h-3 w-3" />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3" />
                  Show more
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* ── Error ── */}
      {item.error_msg && (
        <div className="relative mt-2 flex items-start gap-2 rounded-xl border border-red-300/10 bg-red-300/[0.05] px-3 py-2.5">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-300/60" />
          <p className="text-[11px] leading-relaxed text-red-200/75">
            {item.error_msg}
          </p>
        </div>
      )}

      {/* ── Footer ── */}
      <div className="relative mt-3 flex items-center justify-between border-t border-white/[0.05] pt-3">
        <StatusBadge status={item.status} />

        <span className="text-[10px] text-white/25">
          {new Date(item.created_at).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}