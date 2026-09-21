"use client";

import React from "react";
import { ReceiptText, TrendingDown, TrendingUp } from "lucide-react";
import type { WorkspaceMonthlySummaryEntry } from "@/app/lib/api/workspace/billing";

function formatMonth(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
}

// ✅ Replaces the previous per-transaction list (every individual
// -$1/-$3 chat charge shown one by one, with no monthly context) —
// one row per calendar month showing total charged (top-ups) vs
// total used, so the user can compare spend across months at a
// glance instead of scrolling through dozens of raw entries.
export default function MonthlySummary({
  entries,
}: {
  entries: WorkspaceMonthlySummaryEntry[];
}) {
  if (!entries?.length) {
    return (
      <section
        className="
          relative overflow-hidden rounded-2xl
          border border-white/[0.06]
          bg-[#0f1012]/92
          shadow-[0_16px_40px_rgba(0,0,0,0.18)]
          backdrop-blur-xl
        "
      >
        <div className="relative flex flex-col items-center justify-center gap-3 px-5 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03]">
            <ReceiptText className="h-5 w-5 text-white/22" />
          </div>
          <p className="text-sm text-white/32">No billing history yet</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="
        relative overflow-hidden rounded-2xl
        border border-white/[0.06]
        bg-[#0f1012]/92
        shadow-[0_16px_40px_rgba(0,0,0,0.18)]
        backdrop-blur-xl
      "
    >
      <div className="relative border-b border-white/[0.06] px-5 py-3.5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30">
          Monthly Summary
        </h3>
      </div>

      <div className="relative divide-y divide-white/[0.04]">
        {entries.map((entry) => (
          <div
            key={entry.month}
            className="flex items-center justify-between gap-4 px-5 py-3.5"
          >
            <div className="text-sm font-medium text-white/70">
              {formatMonth(entry.month)}
            </div>

            <div className="flex items-center gap-5">
              {entry.charged > 0 && (
                <div className="flex items-center gap-1.5 text-xs">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-300" />
                  <span className="font-mono font-semibold text-emerald-200">
                    +{entry.charged.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-1.5 text-xs">
                <TrendingDown className="h-3.5 w-3.5 text-red-300" />
                <span className="font-mono font-semibold text-red-200/80">
                  -{entry.used.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
