"use client";

import { useEffect, useRef, useState } from "react";
import { MoreVertical, Download, Trash2 } from "lucide-react";

type Props = {
  downloadUrl?: string | null;
  onDelete: () => void;
};

export default function CardActionsMenu({ downloadUrl, onDelete }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((p) => !p);
        }}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 transition-all hover:bg-white/[0.06] hover:text-white/70"
        title="More options"
      >
        <MoreVertical className="h-3.5 w-3.5" />
      </button>

      {open && (
        <div
          className="
            absolute right-0 top-8 z-20 w-40 overflow-hidden rounded-xl
            border border-white/10 bg-[#17171c] p-1 shadow-2xl
          "
        >
          {downloadUrl && (
            <a
              href={downloadUrl}
              download
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </a>
          )}

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-red-300/80 transition hover:bg-red-400/[0.08] hover:text-red-200"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}