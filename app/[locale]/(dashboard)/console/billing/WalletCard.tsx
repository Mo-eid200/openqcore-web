"use client";

import React from "react";
import { Zap } from "lucide-react";
import type { WalletInfo } from "./types";

export default function WalletCard({
  wallet,
}: {
  wallet: WalletInfo | null;
}) {
  if (!wallet) return null;

  return (
    <section
      className="
        relative overflow-hidden rounded-2xl
        border border-white/[0.06]
        bg-[#0f1012]/92 p-6
        shadow-[0_16px_40px_rgba(0,0,0,0.18)]
        backdrop-blur-xl
      "
    >
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-50px] top-[-60px] h-[140px] w-[140px] rounded-full bg-amber-300/[0.05] blur-[80px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.025),transparent_36%)]" />
      </div>

      {/* Top accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/15 to-transparent" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="mb-1 text-[11px] uppercase tracking-wider text-white/30">
            QX Power Balance
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">
              {wallet.balance.toLocaleString()}
            </span>

            <span className="text-xs font-medium text-amber-300/65">
              {wallet.currency}
            </span>
          </div>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-300/10 bg-amber-300/[0.08]">
          <Zap className="h-6 w-6 text-amber-300" />
        </div>
      </div>
    </section>
  );
}