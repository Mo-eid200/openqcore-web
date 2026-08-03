import React from "react";
import type { TrafficSource } from "@/app/lib/api/workspace/analytics";

const BAR_COLORS = [
  "#ef4444",
  "#22d3ee",
  "#a855f7",
  "#f59e0b",
  "#34d399",
  "#6b7280",
];

export function TrafficSources({ sources = [] }: { sources?: TrafficSource[] }) {
  return (
    <div className="
      relative flex flex-col gap-4 p-5
      rounded-2xl border border-white/[0.06]
      bg-[#0d0d10]/95 backdrop-blur-xl
      overflow-hidden
    ">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/30">
        Traffic Sources
      </span>

      {sources.length === 0 ? (
        <div className="flex items-center justify-center py-8 text-white/20 text-sm">
          No traffic data yet
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {sources.map((s, i) => (
            <div key={s.label} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-white/60 capitalize">
                  {s.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-white/30">
                    {s.requests.toLocaleString()} req
                  </span>
                  <span
                    className="text-[12px] font-semibold"
                    style={{ color: BAR_COLORS[i % BAR_COLORS.length] }}
                  >
                    {s.percent}%
                  </span>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width:           `${s.percent}%`,
                    backgroundColor: BAR_COLORS[i % BAR_COLORS.length],
                    opacity:         0.7,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}