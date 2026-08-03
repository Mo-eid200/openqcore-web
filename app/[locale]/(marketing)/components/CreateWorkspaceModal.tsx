"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, Loader2, X, Zap } from "lucide-react";
import { createPortal } from "react-dom";

/* =========================================================
   TYPES
========================================================= */

interface Props {
  open: boolean;
  onClose: () => void;

  // Called with the trimmed workspace name once the user submits.
  // The caller is responsible for the actual createWorkspace() call
  // and for navigating to /workspace/overview on success — this
  // component only collects the name and shows its own loading/error
  // state while the promise is pending.
  onCreate: (name: string) => Promise<void> | void;
}

/* =========================================================
   COMPONENT
========================================================= */

export function CreateWorkspaceModal({ open, onClose, onCreate }: Props): React.ReactNode {
  const inputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* RESET ON OPEN */
  useEffect(() => {
    if (open) {
      setName("");
      setError(null);
      // Focus shortly after mount so the open animation isn't janky.
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [open]);

  /* ESC CLOSE */
  useEffect(() => {
    if (!open) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  const trimmedName = name.trim();
  const canSubmit = trimmedName.length > 0 && !loading;

  async function handleSubmit() {
    if (!canSubmit) return;
    try {
      setLoading(true);
      setError(null);
      await onCreate(trimmedName);
    } catch (err: any) {
      setError(err?.response?.data?.detail?.message || err?.message || "Failed to create workspace");
      setLoading(false);
    }
    // No finally setLoading(false) on success — the caller closes
    // this modal and navigates away, so there's no need to flicker
    // the button back to its enabled state first.
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  }

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[9999] overflow-y-auto bg-black/80 backdrop-blur-xl p-4"
      >
        <div className="relative min-h-[200px] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 14 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[440px] overflow-hidden rounded-[24px] border border-red-500/[0.12] bg-[#0a0506]/98 shadow-[0_30px_100px_rgba(180,20,20,0.18)]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.10),transparent_42%)]" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-all duration-200 hover:bg-white/[0.08] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative px-7 pt-8 pb-7">
              <div className="flex flex-col items-center text-center">
                <div className="relative h-12 w-12 shrink-0 mb-4">
                  <Image src="/oqc-logo.png" alt="OpenQCore" fill priority sizes="48px" className="object-contain" />
                </div>

                <h2 className="text-[20px] font-semibold tracking-tight text-white">Create a new workspace</h2>
                <p className="mt-1.5 text-[13px] text-white/45 max-w-[280px]">
                  Collaborate with your team on shared AI infrastructure.
                </p>

                <div className="mt-6 w-full text-left">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35">
                    Workspace name
                  </label>

                  <div className="relative mt-2">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                    <input
                      ref={inputRef}
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="e.g. Acme Corp, Marketing Team"
                      maxLength={80}
                      className="h-11 w-full rounded-xl border border-red-500/20 bg-white/[0.03] pl-10 pr-3.5 text-[13px] text-white placeholder:text-white/30 outline-none transition-colors focus:border-red-500/50 focus:bg-white/[0.05]"
                    />
                  </div>

                  {error && <p className="mt-2 text-[11px] text-red-400">{error}</p>}
                </div>

                <div className="mt-4 w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-left">
                  <div className="flex items-center gap-2 text-[12px] font-medium text-white/70">
                    <Zap className="w-3.5 h-3.5 text-red-400" />
                    Starts on the Free plan
                  </div>
                  <p className="mt-1 text-[11px] text-white/35">
                    1 seat included. Upgrade anytime from this workspace's billing page once it's created.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/[0.06] bg-[#0a0506]/95 px-7 py-4 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                disabled={loading}
                className="h-10 px-4 rounded-xl text-[13px] font-medium text-white/60 transition-all hover:text-white disabled:opacity-40"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="inline-flex items-center justify-center gap-2 h-10 min-w-[160px] rounded-xl bg-red-500 px-5 text-[13px] font-semibold text-white transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {loading ? "Creating…" : "Create Workspace"}
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}