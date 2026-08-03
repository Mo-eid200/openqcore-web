"use client";

import React, { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FileText, FileUp, Loader2, X, CheckCircle2 } from "lucide-react";

const ACCEPTED = ".pdf,.doc,.docx,.txt,.md";
const ACCEPT_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "text/markdown",
];

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 / 1024).toFixed(1)} MB`;
}

export function UploadKnowledgeModal({
  open,
  onClose,
  onUpload,
  loading = false,
}: {
  open:      boolean;
  onClose:   () => void;
  loading?:  boolean;
  onUpload:  (file: File, onProgress: (pct: number) => void, description?: string) => Promise<void>;
}) {
  const [file, setFile]         = useState<File | null>(null);
  const [desc, setDesc]         = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError]       = useState<string | null>(null);
  const [done, setDone]         = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setFile(null);
    setDesc("");
    setProgress(0);
    setError(null);
    setDone(false);
  };

  const handleClose = () => {
    if (!loading) {
      reset();
      onClose();
    }
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) {
      setFile(f);
      setError(null);
    }
  }, []);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!file) {
      setError("Please select a file");
      return;
    }

    const isAccepted =
      ACCEPT_MIME.includes(file.type) ||
      ACCEPTED.split(",").some((ext) => file.name.toLowerCase().endsWith(ext));

    if (!isAccepted) {
      setError("Unsupported file type");
      return;
    }

    try {
      await onUpload(file, setProgress, desc.trim() || undefined);
      setDone(true);
      setTimeout(() => {
        reset();
        onClose();
      }, 1200);
    } catch (err: any) {
      setError(err?.response?.data?.detail || err?.message || "Upload failed");
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={handleClose} />

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-[520px] overflow-hidden rounded-2xl border border-white/[0.10] bg-[#111214]/98 shadow-[0_40px_120px_rgba(0,0,0,0.68)] backdrop-blur-2xl"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-50px] top-[-60px] h-[160px] w-[160px] rounded-full bg-red-500/[0.06] blur-[80px]" />
          <div className="absolute left-[-40px] bottom-[-50px] h-[120px] w-[120px] rounded-full bg-red-400/[0.03] blur-[70px]" />
        </div>

        <div className="relative flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.05] bg-red-500/[0.10] text-red-400">
              <FileUp className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Add Knowledge Source</h2>
              <p className="mt-0.5 text-xs text-white/40">Upload a file for this workspace</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            disabled={loading}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 transition-all hover:bg-white/[0.06] hover:text-white/60"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="relative space-y-3 px-5 py-4">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={`relative flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed transition-all duration-150 ${
              file
                ? "border-red-500/25 bg-red-500/[0.05]"
                : "border-white/[0.08] bg-white/[0.02] hover:border-red-500/20 hover:bg-red-500/[0.04]"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPTED}
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  setFile(f);
                  setError(null);
                }
              }}
            />

            {file ? (
              <>
                <FileText className="h-7 w-7 text-red-400" />
                <div className="text-center">
                  <p className="max-w-[280px] truncate text-xs font-medium text-white">{file.name}</p>
                  <p className="mt-0.5 text-[10px] text-white/40">{formatBytes(file.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-md text-white/30 hover:bg-white/[0.06] hover:text-white/60"
                >
                  <X className="h-3 w-3" />
                </button>
              </>
            ) : (
              <>
                <FileUp className="h-6 w-6 text-white/20" />
                <p className="text-xs text-white/32">
                  Drop file here or <span className="text-red-400">browse</span>
                </p>
                <p className="text-[10px] text-white/20">PDF, DOC, DOCX, TXT, MD · Max 20MB</p>
              </>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs text-white/50">
              Description <span className="text-white/25">(optional)</span>
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={2}
              placeholder="What does this knowledge source contain?"
              className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/20 transition-all focus:border-red-500/40 focus:bg-white/[0.05]"
            />
          </div>

          {loading && progress > 0 && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] text-white/40">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-red-500 transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-300/15 bg-red-300/[0.06] px-3 py-2.5 text-xs text-red-200">
              {error}
            </div>
          )}

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="h-9 flex-1 rounded-xl border border-white/[0.08] bg-white/[0.02] text-xs font-medium text-white/50 transition-all hover:bg-white/[0.05] hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || done}
              className="flex h-9 flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 text-xs font-semibold text-white transition-all hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {done ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Done!
                </>
              ) : loading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <FileUp className="h-3.5 w-3.5" />
                  Upload File
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
