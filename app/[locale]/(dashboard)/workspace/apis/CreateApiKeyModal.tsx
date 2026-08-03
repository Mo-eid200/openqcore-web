"use client";

import React, { useState } from "react";
import { X, Loader2, KeyRound } from "lucide-react";
import type { CreateApiKeyPayload } from "@/app/lib/api/workspace/api-keys";

export function CreateApiKeyModal({
  open,
  onClose,
  onCreate,
  loading = false,
}: {
  open:     boolean;
  onClose:  () => void;
  loading?: boolean;
  onCreate: (payload: CreateApiKeyPayload) => Promise<void>;
}) {
  const [name,         setName]         = useState("");
  const [scopes,       setScopes]       = useState("");
  const [dailyLimit,   setDailyLimit]   = useState("");
  const [isUnlimited,  setIsUnlimited]  = useState(false);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onCreate({
      name,
      scopes:      scopes.trim()    || undefined,
      daily_limit: dailyLimit       ? parseInt(dailyLimit) : undefined,
      is_unlimited: isUnlimited,
    });
    setName(""); setScopes(""); setDailyLimit(""); setIsUnlimited(false);
  }

  const inputCls = "w-full h-10 px-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-[13px] text-white placeholder:text-white/25 outline-none transition focus:border-red-500/40 focus:ring-2 focus:ring-red-500/10";
  const labelCls = "text-[11px] font-medium text-white/35 uppercase tracking-wider";

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
            <KeyRound className="w-4 h-4 text-red-400" />
          </div>
          <span className="text-[15px] font-semibold text-white">New API Key</span>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto flex h-7 w-7 items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/[0.06] transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">

          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Key Name *</label>
            <input
              placeholder="e.g. Production App"
              value={name}
              onChange={e => setName(e.target.value)}
              className={inputCls}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Scopes <span className="normal-case text-white/20">(optional)</span></label>
            <input
              placeholder="e.g. read,write,generate"
              value={scopes}
              onChange={e => setScopes(e.target.value)}
              className={inputCls}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Daily Limit <span className="normal-case text-white/20">(requests)</span></label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="e.g. 1000"
              value={dailyLimit}
              onChange={e => setDailyLimit(e.target.value.replace(/\D/g, ""))}
              disabled={isUnlimited}
              className={`${inputCls} disabled:opacity-40`}
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => setIsUnlimited(v => !v)}
              className={`
                w-9 h-5 rounded-full transition-all relative
                ${isUnlimited ? "bg-red-500" : "bg-white/[0.08]"}
              `}
            >
              <span className={`
                absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all
                ${isUnlimited ? "left-[18px]" : "left-0.5"}
              `} />
            </div>
            <span className="text-[13px] text-white/60">Unlimited requests</span>
          </label>

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
              disabled={loading || !name.trim()}
              className="h-9 px-5 rounded-xl text-xs font-semibold bg-red-500 text-white hover:bg-red-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {loading ? "Creating..." : "Create Key"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}