"use client";

import React from "react";
import type { CategoryStat } from "./types";

export default function UsageBreakdown({
  categories,
}: {
  categories: CategoryStat[];
}) {
  if (!categories.length) return null;

  const maxCount = Math.max(1, ...categories.map((c) => c.count));

  return (
    <section
      className="
        relative overflow-hidden rounded-2xl
        border border-white/[0.06]
        bg-[#0f1012]/92 p-5
        shadow-[0_16px_40px_rgba(0,0,0,0.18)]
        backdrop-blur-xl
      "
    >
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-40px] top-[-50px] h-[120px] w-[120px] rounded-full bg-amber-300/[0.04] blur-[70px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.02),transparent_35%)]" />
      </div>

      <div className="relative mb-4 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30">
          Usage by Category
        </h3>

        <span className="text-[10px] text-white/22">
          Requests & tokens
        </span>
      </div>

      <div className="relative space-y-3">
        {categories.map((cat) => {
          const pct = Math.round((cat.count / maxCount) * 100);

          return (
            <div
              key={cat.category}
              className="flex items-center gap-3"
            >
              {/* Label */}
              <div className="w-24 shrink-0">
                <span className="text-xs font-medium capitalize text-white/60">
                  {cat.category}
                </span>
              </div>

              {/* Bar */}
              <div className="relative h-6 flex-1 overflow-hidden rounded-lg border border-white/[0.05] bg-white/[0.03]">
                <div
                  className="
                    h-full rounded-lg
                    bg-gradient-to-r from-amber-300/30 to-amber-200/15
                    transition-all duration-500
                  "
                  style={{ width: `${Math.max(pct, 2)}%` }}
                />

                <div className="absolute inset-0 flex items-center px-2.5">
                  <span className="text-[10px] font-mono text-white/40">
                    {cat.count.toLocaleString()} requests
                  </span>
                </div>
              </div>

              {/* Tokens */}
              <div className="w-24 shrink-0 text-right">
                <span className="text-[10px] font-mono text-amber-300/45">
                  {cat.tokens.toLocaleString()} tok
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}