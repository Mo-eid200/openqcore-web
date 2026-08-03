"use client";

import React from "react";
import type { DailyStat } from "@/app/lib/api/console/usage";

export default function ApiUsageChart({
  data,
}: {
  data: DailyStat[];
}) {
  const max = Math.max(1, ...data.map((d) => d.completions));

  if (!data?.length) {
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
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-40px] top-[-50px] h-[120px] w-[120px] rounded-full bg-amber-300/[0.04] blur-[70px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.02),transparent_35%)]" />
        </div>

        <div className="relative mb-4 text-xs font-semibold uppercase tracking-wider text-white/30">
          API Usage (Last 7 Days)
        </div>

        <div className="relative flex h-32 items-center justify-center rounded-2xl border border-white/[0.05] bg-white/[0.02]">
          <p className="text-xs text-white/35">
            No usage data yet
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

      <div className="relative mb-5 flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-wider text-white/30">
          API Usage (Last 7 Days)
        </div>

        <div className="text-[10px] text-white/22">
          Requests / day
        </div>
      </div>

      <div className="relative">
        {/* Baseline */}
        <div className="pointer-events-none absolute inset-x-0 bottom-5 h-px bg-white/[0.05]" />

        <div className="flex h-36 items-end gap-2">
          {data.map((d, i) => {
            const pct = Math.round((d.completions / max) * 100);

            return (
              <div
                key={i}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <span className="text-[10px] font-mono text-amber-300/55">
                  {d.completions}
                </span>

                <div className="relative flex h-24 w-full items-end overflow-hidden rounded-xl bg-white/[0.03]">
                  <div
                    className="
                      w-full rounded-xl
                      bg-gradient-to-t
                      from-amber-300/80
                      via-amber-300/50
                      to-amber-200/25
                      shadow-[0_0_20px_rgba(251,191,36,0.08)]
                      transition-all duration-300
                    "
                    style={{ height: `${Math.max(pct, 4)}%` }}
                  />
                </div>

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