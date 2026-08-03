import React from "react";
import { FolderOpen, Trash2 } from "lucide-react";

export function ProjectCard({
  name,
  status,
  description,
  createdAt,
  onClick,
  onDelete,
}: {
  name:         string;
  status:       "active" | "paused" | "archived";
  description?: string;
  createdAt?:   string;
  onClick?:     () => void;
  onDelete?:    () => void;
}) {
  const statusConfig = {
    active:   { label: "Active",   cls: "bg-emerald-500/10 border-emerald-400/20 text-emerald-300" },
    paused:   { label: "Paused",   cls: "bg-white/[0.05] border-white/[0.08] text-white/40"        },
    archived: { label: "Archived", cls: "bg-red-500/10 border-red-400/20 text-red-300"             },
  }[status];

  return (
    <div
      onClick={onClick}
      className="
        group relative flex flex-col gap-3 p-5
        rounded-2xl border border-white/[0.06]
        bg-[#0d0d10]/95 backdrop-blur-xl
        cursor-pointer transition-all duration-200
        hover:border-white/[0.12] hover:bg-white/[0.02]
        hover:-translate-y-0.5
        overflow-hidden
      "
    >
      {/* Top glow line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/[0.05]">
            <FolderOpen className="w-4 h-4 text-white/40" />
          </div>
          <span className="text-[14px] font-semibold text-white truncate">{name}</span>
        </div>

        <span className={`shrink-0 px-2 py-0.5 rounded-full border text-[10px] font-medium ${statusConfig.cls}`}>
          {statusConfig.label}
        </span>
      </div>

      {/* Description */}
      <p className="text-[12px] text-white/35 line-clamp-2 min-h-[36px]">
        {description || "No description."}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto">
        {createdAt && (
          <span className="text-[11px] text-white/20">{createdAt}</span>
        )}

        {onDelete && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="
              ml-auto opacity-0 group-hover:opacity-100
              flex h-6 w-6 items-center justify-center
              rounded-lg text-white/25 hover:text-red-400
              hover:bg-red-500/10 transition-all
            "
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}