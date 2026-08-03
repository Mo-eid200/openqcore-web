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
  name: string;
  status: "active" | "paused" | "archived";
  description?: string;
  createdAt?: string;
  onClick?: () => void;
  onDelete?: () => void;
}) {
  const statusCfg = {
    active:
      "border-amber-300/10 bg-amber-300/[0.08] text-amber-200",
    paused:
      "border-white/[0.06] bg-white/[0.03] text-white/40",
    archived:
      "border-red-300/10 bg-red-300/[0.08] text-red-200",
  }[status];

  return (
    <article
      onClick={onClick}
      className="
        group relative flex min-h-[190px] flex-col overflow-hidden rounded-2xl
        border border-white/[0.06]
        bg-[#0f1012]/92 p-5 backdrop-blur-xl
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-amber-300/12
        hover:bg-[#111214]/96
        hover:shadow-[0_18px_45px_rgba(0,0,0,0.22)]
        cursor-pointer
      "
    >
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-40px] top-[-50px] h-[120px] w-[120px] rounded-full bg-amber-300/[0.04] blur-[75px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.025),transparent_34%)]" />
      </div>

      {/* Top accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/15 to-transparent" />

      {/* Header */}
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/[0.05] bg-amber-300/[0.08]">
            <FolderOpen className="h-4.5 w-4.5 text-amber-300/75" />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-[14px] font-semibold text-white">
              {name}
            </h3>

            <div className="mt-1">
              <span
                className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize ${statusCfg}`}
              >
                {status}
              </span>
            </div>
          </div>
        </div>

        {onDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="
              flex h-8 w-8 shrink-0 items-center justify-center rounded-xl
              text-white/20 opacity-0 transition-all duration-200
              group-hover:opacity-100
              hover:bg-red-300/[0.08] hover:text-red-200
            "
            aria-label={`Delete project ${name}`}
            title="Delete project"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Description */}
      <p className="relative mt-4 line-clamp-3 text-[12px] leading-6 text-white/40">
        {description || "No description provided for this project yet."}
      </p>

      {/* Footer */}
      <div className="relative mt-auto flex items-center justify-between pt-5">
        {createdAt ? (
          <span className="text-[11px] text-white/20">
            {createdAt}
          </span>
        ) : (
          <span className="text-[11px] text-white/15">
            —
          </span>
        )}

        <span className="text-[11px] text-amber-300/0 transition-all duration-200 group-hover:text-amber-300/55">
          Open project
        </span>
      </div>
    </article>
  );
}