"use client";

import React, { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  FileUp,
  Loader2,
  Type,
  X,
  CheckCircle2,
} from "lucide-react";

import {
  uploadKnowledgeFile,
  createSnippet,
} from "@/app/lib/api/console/knowledge";
import type { KnowledgeItem } from "@/app/lib/api/console/knowledge";

// ─── Types ────────────────────────────────────────────────────────────────────

type Mode = "file" | "snippet";

type Props = {
  open: boolean;
  onClose: () => void;
  onUpload: (item: KnowledgeItem) => void;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

// ─── Component ────────────────────────────────────────────────────────────────

export default function UploadKnowledgeModal({
  open,
  onClose,
  onUpload,
}: Props) {
  const [mode, setMode] = useState<Mode>("file");
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const dropRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setFile(null);
    setTitle("");
    setContent("");
    setDesc("");
    setTags("");
    setProgress(0);
    setLoading(false);
    setError(null);
    setDone(false);
    setMode("file");
  };

  const handleClose = () => {
    if (!loading) {
      reset();
      onClose();
    }
  };

  // ── Drag & drop ───────────────────────────────────────────────────────────

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];

    if (f) {
      setFile(f);
      setTitle(f.name.replace(/\.[^.]+$/, ""));
      setError(null);
    }
  }, []);

  // ── Submit ────────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setProgress(0);

    try {
      let item: KnowledgeItem;

      if (mode === "file") {
        if (!file) throw new Error("Please select a file");

        const isAccepted =
          ACCEPT_MIME.includes(file.type) ||
          ACCEPTED.split(",").some((ext) =>
            file.name.toLowerCase().endsWith(ext)
          );

        if (!isAccepted) {
          throw new Error("Unsupported file type");
        }

        item = await uploadKnowledgeFile(file, setProgress, desc.trim() || undefined);
      } else {
        if (!title.trim()) throw new Error("Title is required");
        if (!content.trim()) throw new Error("Content is required");

        item = await createSnippet({
          title: title.trim(),
          content: content.trim(),
          description: desc.trim() || undefined,
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        });
      }

      setDone(true);

      setTimeout(() => {
        onUpload(item);
        handleClose();
      }, 1200);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={handleClose} />

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="
  relative z-10 w-full max-w-[520px]
  overflow-hidden rounded-2xl
  border border-white/[0.10]
  bg-[#111214]/98
  shadow-[0_40px_120px_rgba(0,0,0,0.68)]
  backdrop-blur-2xl
"
      >
        {/* Atmosphere */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-50px] top-[-60px] h-[160px] w-[160px] rounded-full bg-amber-300/[0.05] blur-[80px]" />
          <div className="absolute left-[-40px] bottom-[-50px] h-[120px] w-[120px] rounded-full bg-orange-200/[0.03] blur-[70px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.025),transparent_34%)]" />
        </div>

        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.05] bg-amber-300/[0.08] text-amber-300">
              <FileUp className="h-4 w-4" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                Add to Knowledge Vault
              </h2>
              <p className="mt-0.5 text-xs text-white/40">
                Upload a file or add a text snippet
              </p>
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

        {/* Mode tabs */}
        <div className="relative flex gap-1 px-5 pt-4">
          {(
            [
              ["file", "File Upload", FileText],
              ["snippet", "Text Snippet", Type],
            ] as const
          ).map(([m, label, Icon]) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                if (!loading) setMode(m);
              }}
              className={`
                flex items-center gap-1.5 rounded-lg px-3 py-1.5
                text-xs font-medium transition-all
                ${
                  mode === m
                    ? "border border-amber-300/12 bg-amber-300/[0.08] text-amber-200"
                    : "text-white/40 hover:bg-white/[0.04] hover:text-white/70"
                }
              `}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative space-y-3 px-5 py-4">
          {mode === "file" ? (
            <>
              {/* Drop zone */}
              <div
                ref={dropRef}
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
                className={`
                  relative flex h-32 cursor-pointer flex-col items-center justify-center gap-2
                  rounded-2xl border-2 border-dashed transition-all duration-150
                  ${
                    file
                      ? "border-amber-300/20 bg-amber-300/[0.05]"
                      : "border-white/[0.08] bg-white/[0.02] hover:border-amber-300/14 hover:bg-amber-300/[0.04]"
                  }
                `}
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
                      setTitle(f.name.replace(/\.[^.]+$/, ""));
                      setError(null);
                    }
                  }}
                />

                {file ? (
                  <>
                    <FileText className="h-7 w-7 text-amber-300" />

                    <div className="text-center">
                      <p className="max-w-[280px] truncate text-xs font-medium text-white">
                        {file.name}
                      </p>
                      <p className="mt-0.5 text-[10px] text-white/40">
                        {formatBytes(file.size)}
                      </p>
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
                      Drop file here or{" "}
                      <span className="text-amber-300">browse</span>
                    </p>
                    <p className="text-[10px] text-white/20">
                      PDF, DOC, DOCX, TXT, MD · Max 20MB
                    </p>
                  </>
                )}
              </div>

              {/* Progress */}
              {loading && progress > 0 && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-white/40">
                    <span>Uploading...</span>
                    <span>{progress}%</span>
                  </div>

                  <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-amber-300 transition-all duration-200"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Title */}
              <div>
                <label className="mb-1.5 block text-xs text-white/50">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="My knowledge snippet"
                  className="
                    h-9 w-full rounded-xl border border-white/[0.08]
                    bg-white/[0.03] px-3 text-sm text-white
                    outline-none placeholder:text-white/20
                    transition-all focus:border-amber-300/12 focus:bg-white/[0.05]
                  "
                />
              </div>

              {/* Content */}
              <div>
                <label className="mb-1.5 block text-xs text-white/50">
                  Content
                </label>
                <textarea
                  value={content}
                  required
                  rows={5}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste your text content here..."
                  className="
                    w-full resize-none rounded-xl border border-white/[0.08]
                    bg-white/[0.03] px-3 py-2.5 text-sm text-white
                    outline-none placeholder:text-white/20
                    transition-all focus:border-amber-300/12 focus:bg-white/[0.05]
                  "
                />
              </div>
            </>
          )}

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-xs text-white/50">
              Description <span className="text-white/25">(optional)</span>
            </label>
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Short description..."
              className="
                h-9 w-full rounded-xl border border-white/[0.08]
                bg-white/[0.03] px-3 text-sm text-white
                outline-none placeholder:text-white/20
                transition-all focus:border-amber-300/12 focus:bg-white/[0.05]
              "
            />
          </div>

          {/* Tags */}
          <div>
            <label className="mb-1.5 block text-xs text-white/50">
              Tags <span className="text-white/25">(comma separated)</span>
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="AI, Guide, Research"
              className="
                h-9 w-full rounded-xl border border-white/[0.08]
                bg-white/[0.03] px-3 text-sm text-white
                outline-none placeholder:text-white/20
                transition-all focus:border-amber-300/12 focus:bg-white/[0.05]
              "
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-300/15 bg-red-300/[0.06] px-3 py-2.5 text-xs text-red-200">
              {error}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="
                h-9 flex-1 rounded-xl border border-white/[0.08]
                bg-white/[0.02] text-xs font-medium text-white/50
                transition-all hover:bg-white/[0.05] hover:text-white
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || done}
              className="
                flex h-9 flex-1 items-center justify-center gap-2 rounded-xl
                bg-amber-300 text-xs font-semibold text-black
                transition-all hover:bg-amber-200
                disabled:cursor-not-allowed disabled:opacity-60
              "
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
                  {mode === "file" ? "Upload File" : "Add Snippet"}
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}