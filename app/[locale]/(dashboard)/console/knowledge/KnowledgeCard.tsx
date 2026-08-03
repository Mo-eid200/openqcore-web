"use client";

import React from "react";
import {
  FileText,
  File,
  Globe,
  FileSearch,
  FileQuestion,
  Trash2,
  ExternalLink,
  HardDrive,
} from "lucide-react";

import { KnowledgeStatusBadge } from "./KnowledgeStatusBadge";
import type { KnowledgeItem } from "./types";

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICON_MAP: Record<KnowledgeItem["type"], React.ElementType> = {
  pdf: FileText,
  doc: File,
  url: Globe,
  snippet: FileSearch,
  faq: FileQuestion,
};

const TYPE_COLOR: Record<KnowledgeItem["type"], string> = {
  pdf: "bg-red-300/[0.08] text-red-200 border-red-300/10",
  doc: "bg-blue-300/[0.08] text-blue-200 border-blue-300/10",
  url: "bg-cyan-300/[0.08] text-cyan-200 border-cyan-300/10",
  snippet: "bg-violet-300/[0.08] text-violet-200 border-violet-300/10",
  faq: "bg-emerald-300/[0.08] text-emerald-200 border-emerald-300/10",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatBytes(b: number | null) {
  if (!b) return null;
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 / 1024).toFixed(1)} MB`;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  item: KnowledgeItem;
  deleting?: boolean;
  onDelete?: (id: string) => void;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function KnowledgeCard({
  item,
  deleting,
  onDelete,
}: Props) {
  const Icon = ICON_MAP[item.type] ?? FileText;
  const iconColor = TYPE_COLOR[item.type] ?? TYPE_COLOR.snippet;
  const sizeLabel = formatBytes(item.file_size);

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
        {/* Icon */}
        <div
          className={`
            flex h-10 w-10 shrink-0 items-center justify-center
            rounded-xl border ${iconColor}
          `}
        >
          <Icon className="h-4.5 w-4.5" />
        </div>

        {/* Title + type */}
        <div className="min-w-0 flex-1 pt-0.5">
          <div className="truncate text-[13px] font-semibold leading-tight text-white">
            {item.title}
          </div>

          <div className="mt-1 flex items-center gap-2">
            <span
              className={`
                inline-flex items-center rounded-md border px-1.5 py-0.5
                text-[10px] font-bold uppercase tracking-wider
                ${iconColor}
              `}
            >
              {item.type}
            </span>

            {sizeLabel && (
              <span className="flex items-center gap-1 text-[10px] text-white/30">
                <HardDrive className="h-3 w-3" />
                {sizeLabel}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1 opacity-0 transition-all duration-200 group-hover:opacity-100">
          {item.file_url && (
            <a
              href={item.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 transition-all hover:bg-white/[0.06] hover:text-white/70"
              title="Open file"
            >
              <ExternalLink className="h-3.5 w-3.5" />
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

      {/* ── Description ── */}
      {item.description && (
        <p className="relative mt-3 line-clamp-2 text-xs leading-relaxed text-white/45">
          {item.description}
        </p>
      )}

      {/* ── Error ── */}
      {item.error_msg && (
        <p className="relative mt-2 line-clamp-1 text-[11px] leading-relaxed text-red-200/72">
          ⚠ {item.error_msg}
        </p>
      )}

      {/* ── Tags ── */}
      {item.tags && item.tags.length > 0 && (
        <div className="relative mt-3 flex flex-wrap gap-1.5">
          {item.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="
                rounded-full border border-amber-300/10
                bg-amber-300/[0.08] px-2 py-0.5
                text-[10px] font-medium text-amber-200/75
              "
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* ── Footer ── */}
      <div className="relative mt-3 flex items-center justify-between border-t border-white/[0.05] pt-3">
        <KnowledgeStatusBadge status={item.status} />

        <span className="text-[10px] text-white/25">
          {formatDate(item.created_at)}
        </span>
      </div>
    </div>
  );
}