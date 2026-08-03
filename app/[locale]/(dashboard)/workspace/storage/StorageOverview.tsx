import React from "react";
import { HardDrive, Files, FolderOpen, Clock } from "lucide-react";

interface Props {
  stats: {
    total_files: number;
    total_bytes: string;
    images:      string;
    documents:   string;
    videos:      string;
    other:       string;
  };
}

const cards = [
  { key: "total_bytes", label: "Total Usage",  icon: HardDrive },
  { key: "total_files", label: "Total Files",  icon: Files     },
  { key: "images",      label: "Images",       icon: FolderOpen },
  { key: "documents",   label: "Documents",    icon: FolderOpen },
];

export function StorageOverview({ stats }: Props) {
  const values: Record<string, string> = {
    total_bytes: stats.total_bytes,
    total_files: String(stats.total_files),
    images:      stats.images,
    documents:   stats.documents,
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {cards.map(({ key, label, icon: Icon }, i) => (
        <div
          key={key}
          className="
            relative flex flex-col gap-3 p-5
            rounded-2xl border border-white/[0.06]
            bg-[#0d0d10]/95 backdrop-blur-xl
            overflow-hidden animate-fade-in-up
          "
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wider text-white/30">
              {label}
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.05]">
              <Icon className="w-3.5 h-3.5 text-white/30" />
            </div>
          </div>

          <div className="text-2xl font-bold text-white tracking-tight">
            {values[key] ?? "—"}
          </div>
        </div>
      ))}
    </div>
  );
}