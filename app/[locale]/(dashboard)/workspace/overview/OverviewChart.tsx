import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { WorkspaceChartPoint } from "../../../../lib/api/workspace/overview";

interface Props {
  chartData?: WorkspaceChartPoint[];
}

export default function OverviewChart({ chartData }: Props) {
  const [period, setPeriod] = useState<"7" | "14">("7");

  const filtered = (chartData ?? []).slice(
    period === "7" ? -7 : -14
  );

  return (
    <section className="w-full">
      <div className="
        flex flex-col min-h-[300px] h-full
        rounded-2xl border border-white/[0.06]
        bg-[#0d0d10]/95 backdrop-blur-xl
        overflow-hidden
      ">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <span className="text-[15px] font-semibold text-white">System Activity</span>
          <select
  value={period}
  onChange={(e) => setPeriod(e.target.value as "7" | "14")}
  className="
    rounded-lg bg-[#0d0d10]
    border border-white/[0.08]
    text-xs text-white/60 px-3 py-1.5
    outline-none transition
    hover:bg-white/[0.06]
  "
>
  <option value="7"  className="bg-[#0d0d10] text-white">Last 7 days</option>
  <option value="14" className="bg-[#0d0d10] text-white">Last 14 days</option>
</select>
        </div>

        {/* Chart */}
        <div className="flex-1 px-2 py-4">
          {filtered.length === 0 ? (
            <div className="h-full flex items-center justify-center text-white/20 text-sm">
              No activity data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={filtered} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="reqGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#22d3ee" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => v.slice(5)}
                />
                <YAxis
                  tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#0d0d10",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 12,
                    fontSize: 12,
                    color: "#fff",
                  }}
                  cursor={{ stroke: "rgba(34,211,238,0.15)" }}
                />
                <Area
                  type="monotone"
                  dataKey="requests"
                  stroke="#22d3ee"
                  strokeWidth={1.5}
                  fill="url(#reqGrad)"
                  dot={false}
                  name="Requests"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </section>
  );
}