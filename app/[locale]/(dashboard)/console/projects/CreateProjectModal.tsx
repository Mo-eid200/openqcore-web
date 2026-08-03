"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Loader2, FolderPlus } from "lucide-react";

export function CreateProjectModal({
  open,
  onClose,
  onCreate,
  loading = false,
}: {
  open: boolean;
  onClose: () => void;
  loading?: boolean;
  onCreate: (args: {
    name: string;
    description: string;
  }) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!open) return null;

  function reset() {
    setName("");
    setDescription("");
  }

  function handleClose() {
    if (loading) return;
    reset();
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await onCreate({
      name: name.trim(),
      description: description.trim(),
    });

    reset();
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm"
      onClick={handleClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="
          relative w-full max-w-md overflow-hidden rounded-2xl
          border border-white/[0.10]
          bg-[#111214]/98
          shadow-[0_40px_120px_rgba(0,0,0,0.68)]
          backdrop-blur-2xl
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Crisp ring */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/[0.03]" />

        {/* Atmosphere */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-50px] top-[-60px] h-[160px] w-[160px] rounded-full bg-amber-300/[0.05] blur-[80px]" />
          <div className="absolute left-[-30px] bottom-[-40px] h-[120px] w-[120px] rounded-full bg-orange-200/[0.03] blur-[70px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.025),transparent_34%)]" />
        </div>

        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.05] bg-amber-300/[0.08] text-amber-300">
              <FolderPlus className="h-4 w-4" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                New Project
              </h2>
              <p className="mt-0.5 text-xs text-white/35">
                Create a new workspace for your team or feature
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            disabled={loading}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 transition-all hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative flex flex-col gap-4 px-6 py-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium uppercase tracking-wider text-white/40">
              Project Name
            </label>

            <input
              placeholder="e.g. Voice Infrastructure"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="
                h-10 w-full rounded-xl border border-white/[0.08]
                bg-white/[0.03] px-3 text-[14px] text-white
                outline-none placeholder:text-white/25
                transition-all
                focus:border-amber-300/12
                focus:bg-white/[0.05]
                focus:ring-2 focus:ring-amber-300/[0.08]
              "
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium uppercase tracking-wider text-white/40">
              Description{" "}
              <span className="normal-case text-white/20">(optional)</span>
            </label>

            <textarea
              placeholder="What is this project about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="
                w-full resize-none rounded-xl border border-white/[0.08]
                bg-white/[0.03] px-3 py-2.5 text-[14px] text-white
                outline-none placeholder:text-white/25
                transition-all
                focus:border-amber-300/12
                focus:bg-white/[0.05]
                focus:ring-2 focus:ring-amber-300/[0.08]
              "
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="
                h-9 rounded-xl border border-white/[0.08]
                bg-transparent px-4 text-xs font-medium text-white/50
                transition-all hover:bg-white/[0.04] hover:text-white
                disabled:cursor-not-allowed disabled:opacity-40
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="
                flex h-9 items-center gap-2 rounded-xl
                bg-amber-300 px-5 text-xs font-semibold text-black
                transition-all hover:bg-amber-200
                disabled:cursor-not-allowed disabled:opacity-40
              "
            >
              {loading && (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              )}
              {loading ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}