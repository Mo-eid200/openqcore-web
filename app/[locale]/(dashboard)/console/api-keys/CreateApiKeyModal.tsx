"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  Key,
  Loader2,
  CheckCircle2,
  Copy,
  CheckCheck,
  AlertTriangle,
} from "lucide-react";

import { createApiKey } from "@/app/lib/api/console/apikeys";
import type { ApiKey } from "./types";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated: (key: ApiKey) => void;
};

export default function CreateApiKeyModal({
  open,
  onClose,
  onCreated,
}: Props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<ApiKey | null>(null);
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function reset() {
    setName("");
    setLoading(false);
    setError(null);
    setCreated(null);
    setCopied(false);
    setSubmitted(false);
  }

  function handleClose() {
    if (loading) return;

    if (created && !submitted) {
      onCreated(created);
      setSubmitted(true);
    }

    reset();
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    setError(null);
    setLoading(true);

    try {
      const res = await createApiKey(name.trim());

      setCreated({
        id: res.id,
        key: res.key.slice(0, 12),
        name: res.name,
        active: res.active,
        created_at: res.created_at,
        raw_key: res.key,
      });
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Failed to create key"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!created?.raw_key) return;

    try {
      await navigator.clipboard.writeText(created.raw_key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Failed to copy key");
    }
  }

  if (!open) return null;

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
          relative z-10 w-full max-w-[460px] overflow-hidden rounded-2xl
          border border-white/[0.10]
          bg-[#111214]/98
          shadow-[0_40px_120px_rgba(0,0,0,0.68)]
          backdrop-blur-2xl
        "
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
        <div className="relative flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.05] bg-amber-300/[0.08] text-amber-300">
              <Key className="h-4 w-4" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                {created ? "Key Created" : "New API Key"}
              </h2>
              <p className="mt-0.5 text-xs text-white/35">
                {created
                  ? "Copy it now — you won't see it again"
                  : "Create a new key for API access"}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            disabled={loading}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white/25 transition-all hover:bg-white/[0.06] hover:text-white/60 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Close modal"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Body */}
        <div className="relative px-5 py-5">
          {created ? (
            <div className="space-y-4">
              {/* Warning */}
              <div className="flex items-start gap-2.5 rounded-xl border border-amber-300/12 bg-amber-300/[0.06] px-3.5 py-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                <p className="text-xs leading-relaxed text-amber-200/80">
                  This is the only time you'll see this key. Copy it and store
                  it securely.
                </p>
              </div>

              {/* Key display */}
              <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3">
                <code className="flex-1 break-all font-mono text-xs text-amber-200 select-all">
                  {created.raw_key}
                </code>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-300/[0.08] text-amber-300 transition-all hover:bg-amber-300/[0.16]"
                  title="Copy key"
                  aria-label="Copy API key"
                >
                  {copied ? (
                    <CheckCheck className="h-4 w-4 text-emerald-300" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              {error && (
                <div className="rounded-xl border border-red-300/15 bg-red-300/[0.06] px-3.5 py-2.5 text-xs text-red-200">
                  {error}
                </div>
              )}

              {/* Done */}
              <button
                type="button"
                onClick={handleClose}
                className="
                  flex h-10 w-full items-center justify-center gap-2 rounded-xl
                  bg-amber-300 text-sm font-semibold text-black
                  transition-all hover:bg-amber-200
                "
              >
                <CheckCircle2 className="h-4 w-4" />
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs text-white/50">
                  Key Name
                </label>

                <input
                  type="text"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Production, CLI, Integration"
                  className="
                    h-10 w-full rounded-xl border border-white/[0.08]
                    bg-white/[0.03] px-3.5 text-sm text-white
                    outline-none placeholder:text-white/20
                    transition-all
                    focus:border-amber-300/12
                    focus:bg-white/[0.05]
                    focus:ring-2 focus:ring-amber-300/[0.08]
                  "
                />
              </div>

              {error && (
                <div className="rounded-xl border border-red-300/15 bg-red-300/[0.06] px-3.5 py-2.5 text-xs text-red-200">
                  {error}
                </div>
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={loading}
                  className="
                    h-10 flex-1 rounded-xl border border-white/[0.08]
                    bg-white/[0.02] text-xs font-medium text-white/50
                    transition-all hover:bg-white/[0.05] hover:text-white
                    disabled:cursor-not-allowed disabled:opacity-50
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading || !name.trim()}
                  className="
                    flex h-10 flex-1 items-center justify-center gap-2 rounded-xl
                    bg-amber-300 text-sm font-semibold text-black
                    transition-all hover:bg-amber-200
                    disabled:cursor-not-allowed disabled:opacity-50
                  "
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Key className="h-4 w-4" />
                      Create Key
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}