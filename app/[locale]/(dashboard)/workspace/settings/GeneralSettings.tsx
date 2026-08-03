"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2 } from "lucide-react";
import { useWorkspace } from "@/app/context/WorkspaceContext";

const cardCls = "rounded-2xl border border-white/[0.07] bg-[#0c0a06]/95 backdrop-blur-xl p-5";
const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-red-500/50 focus:bg-white/[0.07]";
const primaryBtnCls =
  "inline-flex items-center justify-center gap-2 h-10 rounded-xl bg-red-500 px-5 text-sm font-semibold text-white transition-all hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-40";

export function GeneralSettings() {
  const { activeWorkspace, updateWorkspace } = useWorkspace();
  const [name, setName] = useState(activeWorkspace?.name ?? "");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Keep the field in sync if the active workspace changes (e.g.
  // switching workspaces while this page is open).
  useEffect(() => {
    setName(activeWorkspace?.name ?? "");
    setSuccess(false);
    setError(null);
  }, [activeWorkspace?.id]);

  const isDirty = name.trim() !== (activeWorkspace?.name ?? "").trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!activeWorkspace) return;

    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError("Workspace name must be at least 2 characters.");
      return;
    }

    setError(null);
    setSuccess(false);
    setSubmitting(true);
    try {
      await updateWorkspace(activeWorkspace.id, { name: trimmed });
      setSuccess(true);
    } catch (err: any) {
      setError(err?.response?.data?.error?.message || err?.message || "Couldn't save changes.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={cardCls}>
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
          <Building2 className="h-5 w-5 text-red-400" />
        </div>
        <div>
          <div className="text-base font-semibold text-white">General</div>
          <div className="text-xs text-white/35">Workspace name and identity</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex max-w-sm flex-col gap-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-white/40">Workspace name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setSuccess(false);
            }}
            className={inputCls}
          />
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="rounded-lg border border-red-400/25 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                {error}
              </div>
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="rounded-lg border border-emerald-400/25 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
                Saved.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-end">
          <button type="submit" disabled={submitting || !isDirty} className={primaryBtnCls}>
            {submitting ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}