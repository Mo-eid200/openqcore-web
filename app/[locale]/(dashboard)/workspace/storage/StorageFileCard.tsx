import React from "react";
import { FileText, Image, Video, Music, File, Download, Trash2 } from "lucide-react";
import { formatBytes, type WorkspaceFile } from "@/app/lib/api/workspace/storage";

const kindConfig = {
  image:    { icon: Image,    cls: "bg-purple-500/10 border-purple-400/20 text-purple-300",  label: "Image"    },
  video:    { icon: Video,    cls: "bg-blue-500/10 border-blue-400/20 text-blue-300",        label: "Video"    },
  audio:    { icon: Music,    cls: "bg-pink-500/10 border-pink-400/20 text-pink-300",        label: "Audio"    },
  document: { icon: FileText, cls: "bg-amber-500/10 border-amber-400/20 text-amber-300",    label: "Document" },
  other:    { icon: File,     cls: "bg-white/[0.05] border-white/[0.08] text-white/40",     label: "File"     },
};

function formatDate(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60)  return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs  < 24)  return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function StorageFileCard({
  file,
  onDelete,
}: {
  file:      WorkspaceFile;
  onDelete?: () => void;
}) {
  const cfg     = kindConfig[file.kind] ?? kindConfig.other;
  const Icon    = cfg.icon;
  const ext     = file.filename?.split(".").pop()?.toUpperCase() ?? "—";

  return (
    <div className="
      group relative flex flex-col gap-3 p-5
      rounded-2xl border border-white/[0.06]
      bg-[#0d0d10]/95 backdrop-blur-xl
      transition-all duration-200
      hover:border-white/[0.12] hover:bg-white/[0.02]
      overflow-hidden
    ">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${cfg.cls}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-semibold text-white truncate">
              {file.filename ?? "Unnamed file"}
            </div>
            <div className="text-[11px] text-white/30 font-mono">
              {ext} · {formatBytes(file.bytes)}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-all">
          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white/25 hover:text-white hover:bg-white/[0.06] transition-all"
          >
            <Download className="w-3.5 h-3.5" />
          </a>
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Kind badge */}
      <span className={`w-fit flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-medium ${cfg.cls}`}>
        {cfg.label}
      </span>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-white/[0.04]">
        <span className="text-[11px] text-white/20">
          {file.folder}
        </span>
        <span className="text-[11px] text-white/20">
          {formatDate(file.created_at)}
        </span>
      </div>
    </div>
  );
}
    