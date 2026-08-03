"use client";

import React from "react";
import type { DailyStat } from "@/app/lib/api/console/usage";

export default function UsageChart({
  data,
}: {
  data: DailyStat[];
}) {
  if (!data.length) return null;

  const maxComp = Math.max(1, ...data.map((d) => d.completions));
  const maxImg = Math.max(1, ...data.map((d) => d.images));

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

      {/* Top accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/15 to-transparent" />

      <div className="relative mb-5 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30">
          Daily Activity
        </h3>

        <div className="flex gap-4 text-[10px] text-white/30">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-3 rounded-sm bg-emerald-300/70" />
            Requests
          </span>

          <span className="flex items-center gap-1.5">
            <span className="h-2 w-3 rounded-sm bg-amber-300/55" />
            Images
          </span>
        </div>
      </div>

      <div className="relative">
        {/* Baseline */}
        <div className="pointer-events-none absolute inset-x-0 bottom-5 h-px bg-white/[0.05]" />

        <div className="flex h-40 items-end gap-2">
          {data.map((d, i) => {
            const compPct = Math.max(
              Math.round((d.completions / maxComp) * 100),
              3
            );

            const imgPct = d.images > 0
              ? Math.max(Math.round((d.images / maxImg) * 100), 2)
              : 0;

            return (
              <div
                key={i}
                className="flex flex-1 flex-col items-center gap-2"
              >
                {/* Value */}
                <span className="text-[9px] font-mono text-emerald-300/55">
                  {d.completions}
                </span>

                {/* Dual bar group */}
                <div className="relative flex h-24 w-full items-end justify-center gap-[3px] rounded-xl bg-white/[0.02] px-1.5 pb-0.5">
                  <div
                    className="
                      w-[42%] rounded-t-md
                      bg-gradient-to-t from-emerald-300/70 to-emerald-200/30
                      transition-all duration-500
                    "
                    style={{ height: `${compPct}%` }}
                  />

                  <div
                    className="
                      w-[42%] rounded-t-md
                      bg-gradient-to-t from-amber-300/55 to-amber-200/20
                      transition-all duration-500
                    "
                    style={{ height: `${imgPct}%` }}
                  />
                </div>

                {/* Day */}
                <span className="text-[10px] text-white/25">
                  {new Date(d.date).toLocaleDateString(undefined, {
                    weekday: "short",
                  })}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}