"use client";

import React from "react";
import { ReceiptText, CalendarRange, Hash } from "lucide-react";
import type { TransactionEntry } from "./types";

export default function BillingHistory({
  entries,
}: {
  entries: TransactionEntry[];
}) {
  if (!entries?.length) {
    return (
      <section
        className="
          relative mt-5 overflow-hidden rounded-3xl
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

        <div className="relative z-10 flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.05] bg-amber-300/[0.08]">
            <ReceiptText className="h-6 w-6 text-amber-300/70" />
          </div>

          <p className="text-sm text-white/55">
            No billing history yet
          </p>
        </div>
      </section>
    );
  }

  return (
    <div
      className="
        mt-5 overflow-x-auto rounded-2xl border border-white/[0.06]
        bg-[#0f1012]/92 shadow-[0_16px_40px_rgba(0,0,0,0.18)]
        backdrop-blur-xl
      "
    >
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/[0.06] bg-white/[0.02]">
            <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-white/30">
              Time
            </th>
            <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-white/30">
              Amount
            </th>
            <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-white/30">
              Type
            </th>
            <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-white/30">
              Reference
            </th>
          </tr>
        </thead>

        <tbody>
          {entries.map((e, i) => (
            <tr
              key={e.id}
              className="border-b border-white/[0.04] transition-colors last:border-b-0 hover:bg-white/[0.02]"
            >
              <td className="px-4 py-3.5 align-middle">
                <span className="flex items-center gap-1.5 text-xs text-white/35">
                  <CalendarRange className="h-3.5 w-3.5" />
                  {new Date(e.created_at).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </td>

              <td className="px-4 py-3.5 align-middle">
                <span className="font-mono text-sm text-amber-200">
                  {e.amount}
                </span>
              </td>

              <td className="px-4 py-3.5 align-middle">
                <span className="inline-flex items-center rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-white/55">
                  {e.transaction_type}
                </span>
              </td>

              <td className="px-4 py-3.5 align-middle">
                <span className="flex items-center gap-1.5 text-xs text-white/28">
                  <Hash className="h-3.5 w-3.5" />
                  {e.reference_id || "-"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}