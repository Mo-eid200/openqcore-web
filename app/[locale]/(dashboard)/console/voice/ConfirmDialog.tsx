"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, X, Loader2 } from "lucide-react";

type Props = {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title = "Delete this item?",
  description = "This action cannot be undone.",
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !busy) onCancel();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, busy, onCancel]);

  if (!mounted || !open) return null;

  async function handleConfirm() {
    try {
      setBusy(true);
      await onConfirm();
    } finally {
      setBusy(false);
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[250] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={() => !busy && onCancel()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#17171c] p-5 shadow-2xl"
      >
        <div className="flex items-start gap-3">
          {/* 🔧 FIX: amber chrome to match personal/console scope
              (was copied verbatim from the workspace version, which
              uses red -- kept only the actual Delete button red,
              since red-for-destructive-action is a universal
              convention, not a scope-color choice). */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/10 text-amber-300">
            <AlertTriangle className="h-4 w-4" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-white">{title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-zinc-400">
              {description}
            </p>
          </div>

          <button
            onClick={onCancel}
            disabled={busy}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-white/5 hover:text-white disabled:opacity-40"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="h-9 rounded-xl border border-white/10 bg-white/5 px-4 text-xs font-medium text-zinc-300 transition hover:bg-white/10 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={busy}
            className="flex h-9 items-center gap-1.5 rounded-xl bg-red-500 px-4 text-xs font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Deleting...
              </>
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}