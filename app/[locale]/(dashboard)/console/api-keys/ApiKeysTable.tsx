"use client";

import React, { useState } from "react";
import {
  Key,
  Copy,
  CheckCheck,
  ShieldOff,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import type { ApiKey } from "./types";

type Props = {
  keys: ApiKey[];
  onRevoke?: (id: number) => void;
};

export default function ApiKeysTable({
  keys,
  onRevoke,
}: Props) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  function handleCopy(key: string) {
    navigator.clipboard.writeText(key).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    });
  }

  if (!keys?.length) {
    return (
      <section
        className="
          relative overflow-hidden rounded-3xl
          border border-white/[0.06]
          bg-[#0f1012]/92
          shadow-[0_18px_50px_rgba(0,0,0,0.22)]
          backdrop-blur-2xl
        "
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-60px] top-[-60px] h-[180px] w-[180px] rounded-full bg-amber-300/[0.06] blur-[80px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.025),transparent_38%)]" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.05] bg-amber-300/[0.08]">
            <Key className="h-6 w-6 text-amber-300/70" />
          </div>

          <p className="text-sm text-white/55">
            No API keys yet
          </p>
        </div>
      </section>
    );
  }

  return (
    <div
      className="
        overflow-x-auto rounded-2xl border border-white/[0.06]
        bg-[#0f1012]/92 backdrop-blur-xl
        shadow-[0_16px_40px_rgba(0,0,0,0.18)]
      "
    >
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead>
          <tr className="border-b border-white/[0.06] bg-white/[0.02]">
            <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-white/30">
              Name
            </th>
            <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-white/30">
              Key
            </th>
            <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-white/30">
              Status
            </th>
            <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-white/30">
              Created
            </th>
            <th className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-white/30">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {keys.map((k, i) => {
            const displayKey = k.raw_key || k.key;
            const isMasked = !k.raw_key;
            const maskedValue = isMasked
              ? `${displayKey}••••••••`
              : displayKey;

            return (
              <tr
                key={`${k.key}-${i}`}
                className="border-b border-white/[0.04] align-middle transition-colors last:border-b-0 hover:bg-white/[0.02]"
              >
                {/* Name */}
                <td className="px-5 py-3.5 align-middle">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`
                        flex h-8 w-8 items-center justify-center rounded-lg border
                        ${
                          k.active
                            ? "border-emerald-300/10 bg-emerald-300/[0.08] text-emerald-200"
                            : "border-white/[0.06] bg-white/[0.03] text-white/25"
                        }
                      `}
                    >
                      <Key className="h-3.5 w-3.5" />
                    </div>

                    <span className="text-xs font-semibold text-white/80">
                      {k.name || "API Key"}
                    </span>
                  </div>
                </td>

                {/* Key */}
                <td className="px-5 py-3.5 align-middle">
                  <div className="flex items-center gap-2">
                    <code className="max-w-[260px] truncate rounded-lg border border-amber-300/10 bg-amber-300/[0.08] px-2 py-1 font-mono text-xs text-amber-200/80">
                      {maskedValue}
                    </code>

                    {k.raw_key && (
                      <button
                        type="button"
                        onClick={() => handleCopy(k.raw_key!)}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white/25 transition-all hover:bg-white/[0.06] hover:text-white/60"
                        title="Copy key"
                      >
                        {copiedKey === k.raw_key ? (
                          <CheckCheck className="h-3.5 w-3.5 text-emerald-300" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    )}
                  </div>
                </td>

                {/* Status */}
                <td className="px-5 py-3.5 align-middle">
                  {k.active ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/10 bg-emerald-300/[0.08] px-2 py-1 text-[10px] font-semibold text-emerald-200">
                      <ShieldCheck className="h-3 w-3" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[10px] font-semibold text-white/35">
                      <ShieldOff className="h-3 w-3" />
                      Revoked
                    </span>
                  )}
                </td>

                {/* Created */}
                <td className="px-5 py-3.5 align-middle">
                  <span className="flex items-center gap-1.5 text-xs text-white/30">
                    <Calendar className="h-3 w-3" />
                    {new Date(k.created_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 py-3.5 text-right align-middle">
                  {k.active && onRevoke && (
                    <button
                      type="button"
                      onClick={() => onRevoke(k.id)}
                      className="
                        rounded-lg border border-red-300/12
                        bg-red-300/[0.06] px-3 py-1.5
                        text-[11px] font-medium text-red-200/80
                        transition-all hover:bg-red-300/[0.12] hover:text-red-100
                      "
                    >
                      Revoke
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}