"use client";

import React, { useState, useRef } from "react";
import { X, Loader2, HardDrive, Upload, File } from "lucide-react";
import { formatBytes } from "@/app/lib/api/workspace/storage";

export function UploadStorageModal({
  open,
  onClose,
  onUpload,
  loading  = false,
  progress = 0,
}: {
  open:      boolean;
  onClose:   () => void;
  onUpload:  (file: File) => Promise<void>;
  loading?:  boolean;
  progress?: number;
}) {
  const [dragging,  setDragging]  = useState(false);
  const [selected,  setSelected]  = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setSelected(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    await onUpload(selected);
    setSelected(null);
  }

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/75 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0d0d10] shadow-[0_40px_120px_rgba(0,0,0,0.8)] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06]">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10">
            <HardDrive className="w-4 h-4 text-red-400" />
          </div>
          <span className="text-[15px] font-semibold text-white">Upload File</span>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="ml-auto flex h-7 w-7 items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/[0.06] transition-all disabled:opacity-40"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">

          {/* Drop zone */}
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`
              flex flex-col items-center justify-center gap-3 p-8
              rounded-2xl border-2 border-dashed cursor-pointer
              transition-all
              ${dragging
                ? "border-red-400/40 bg-red-500/10"
                : selected
                  ? "border-emerald-400/30 bg-emerald-500/5"
                  : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]"
              }
            `}
          >
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              onChange={e => {
                const f = e.target.files?.[0];
                if (f) setSelected(f);
              }}
            />

            {selected ? (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-400/20">
                  <File className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="text-center">
                  <div className="text-[13px] font-medium text-white truncate max-w-[240px]">{selected.name}</div>
                  <div className="text-[11px] text-white/30 mt-0.5">{formatBytes(selected.size)}</div>
                </div>
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); setSelected(null); }}
                  className="text-[11px] text-white/30 hover:text-red-400 transition-all"
                >
                  Remove
                </button>
              </>
            ) : (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.08]">
                  <Upload className="w-6 h-6 text-white/30" />
                </div>
                <div className="text-center">
                  <p className="text-[13px] font-medium text-white/60">
                    Drop file here or <span className="text-red-400">browse</span>
                  </p>
                  <p className="text-[11px] text-white/25 mt-1">Max 50MB — images, docs, audio, video</p>
                </div>
              </>
            )}
          </div>

          {/* Progress */}
          {loading && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-[11px] text-white/40">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                <div
                  className="h-full rounded-full bg-red-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2 border-t border-white/[0.06]">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="h-9 px-4 rounded-xl text-xs font-medium border border-white/[0.08] bg-transparent text-white/50 hover:text-white hover:bg-white/[0.04] transition-all disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !selected}
              className="h-9 px-5 rounded-xl text-xs font-semibold bg-red-500 text-white hover:bg-red-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}