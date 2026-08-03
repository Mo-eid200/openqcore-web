import React from "react";
import { Search, HardDrive } from "lucide-react";
import { StorageFileCard } from "./StorageFileCard";
import type { WorkspaceFile } from "@/app/lib/api/workspace/storage";

const KIND_FILTERS = [
  { label: "All",       value: ""         },
  { label: "Images",    value: "image"    },
  { label: "Documents", value: "document" },
  { label: "Videos",    value: "video"    },
  { label: "Audio",     value: "audio"    },
  { label: "Other",     value: "other"    },
];

export function StorageGrid({
  files,
  search,
  onSearch,
  kindFilter,
  onKindFilter,
  onDelete,
}: {
  files:         WorkspaceFile[];
  search:        string;
  onSearch:      (v: string) => void;
  kindFilter:    string;
  onKindFilter:  (v: string) => void;
  onDelete?:     (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
          <input
            placeholder="Search files..."
            value={search}
            onChange={e => onSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-[13px] text-white placeholder:text-white/25 outline-none transition focus:border-white/[0.15]"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {KIND_FILTERS.map(f => (
            <button
              key={f.value}
              type="button"
              onClick={() => onKindFilter(f.value)}
              className={`
                h-8 px-3 rounded-xl text-xs font-medium transition-all
                ${kindFilter === f.value
                  ? "bg-white/[0.08] border border-white/[0.12] text-white"
                  : "border border-white/[0.06] text-white/40 hover:text-white/70"
                }
              `}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {files.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <HardDrive className="w-8 h-8 text-white/20" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-white/40">No files yet</p>
            <p className="text-xs text-white/20 mt-1">Upload your first file to get started</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((f, i) => (
            <div
              key={f.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <StorageFileCard
                file={f}
                onDelete={onDelete ? () => onDelete(f.id) : undefined}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}