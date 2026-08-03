import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { DailyRevenuePoint } from "@/app/lib/api/workspace/analytics";

export function RevenueChart({ data = [] }: { data?: DailyRevenuePoint[] }) {
  return (
    <div className="
      relative flex flex-col
      rounded-2xl border border-white/[0.06]
      bg-[#0d0d10]/95 backdrop-blur-xl
      overflow-hidden min-h-[230px]
    ">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent" />

      <div className="px-5 pt-4 pb-2">
        <span className="text-[15px] font-semibold text-white">Revenue</span>
      </div>

      <div className="flex-1 px-2 py-3">
        {data.length === 0 ? (
          <div className="h-40 flex items-center justify-center text-white/20 text-sm">
            No revenue data yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#34d399" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => v.slice(5)}
              />
              <YAxis
                tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background:   "#0d0d10",
                  border:       "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  fontSize:     12,
                  color:        "#fff",
                }}
                cursor={{ stroke: "rgba(52,211,153,0.15)" }}
                formatter={(v) => [`${Number(v).toFixed(2)} QXP`, "Revenue"]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#34d399"
                strokeWidth={1.5}
                fill="url(#revGrad)"
                dot={false}
                name="Revenue"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}