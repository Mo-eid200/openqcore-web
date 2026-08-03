"use client";

import React from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  ReceiptText,
} from "lucide-react";
import type { TransactionEntry } from "./types";

export default function TransactionHistory({
  transactions,
}: {
  transactions: TransactionEntry[];
}) {
  if (!transactions?.length) {
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
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-40px] top-[-50px] h-[120px] w-[120px] rounded-full bg-amber-300/[0.04] blur-[70px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.02),transparent_35%)]" />
        </div>

        <div className="relative flex flex-col items-center justify-center gap-3 px-5 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03]">
            <ReceiptText className="h-5 w-5 text-white/22" />
          </div>

          <p className="text-sm text-white/32">
            No transactions yet
          </p>
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
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-40px] top-[-50px] h-[120px] w-[120px] rounded-full bg-amber-300/[0.04] blur-[70px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.02),transparent_35%)]" />
      </div>

      <div className="relative border-b border-white/[0.06] px-5 py-3.5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30">
          Transaction History
        </h3>
      </div>

      <div className="relative divide-y divide-white/[0.04]">
        {transactions.map((tx) => {
          const isCredit = tx.amount > 0;

          return (
            <div
              key={tx.id}
              className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-white/[0.02]"
            >
              <div
                className={`
                  flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border
                  ${
                    isCredit
                      ? "border-emerald-300/10 bg-emerald-300/[0.08] text-emerald-200"
                      : "border-red-300/10 bg-red-300/[0.08] text-red-200"
                  }
                `}
              >
                {isCredit ? (
                  <ArrowUpRight className="h-3.5 w-3.5" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="truncate text-xs font-medium text-white/60">
                  {tx.transaction_type
                    .replace(/_/g, " ")
                    .replace(/:/g, " → ")}
                </div>

                <div className="mt-0.5 text-[10px] text-white/20">
                  {new Date(tx.created_at).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              <div
                className={`font-mono text-sm font-semibold ${
                  isCredit
                    ? "text-emerald-200"
                    : "text-red-200/75"
                }`}
              >
                {isCredit ? "+" : ""}
                {tx.amount.toLocaleString()} QXP
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}