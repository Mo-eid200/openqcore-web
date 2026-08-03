import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { DailyUsagePoint } from "@/app/lib/api/workspace/analytics";

export function UsageChart({ data = [] }: { data?: DailyUsagePoint[] }) {
  return (
    <div className="
      relative flex flex-col
      rounded-2xl border border-white/[0.06]
      bg-[#0d0d10]/95 backdrop-blur-xl
      overflow-hidden min-h-[230px]
    ">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/10 to-transparent" />

      <div className="px-5 pt-4 pb-2">
        <span className="text-[15px] font-semibold text-white">Usage</span>
      </div>

      <div className="flex-1 px-2 py-3">
        {data.length === 0 ? (
          <div className="h-40 flex items-center justify-center text-white/20 text-sm">
            No usage data yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="reqGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}    />
                </linearGradient>
                <linearGradient id="errGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#f97316" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}    />
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
                cursor={{ stroke: "rgba(239,68,68,0.15)" }}
              />
              <Area
                type="monotone"
                dataKey="requests"
                stroke="#ef4444"
                strokeWidth={1.5}
                fill="url(#reqGrad2)"
                dot={false}
                name="Requests"
              />
              <Area
                type="monotone"
                dataKey="errors"
                stroke="#f97316"
                strokeWidth={1.5}
                fill="url(#errGrad)"
                dot={false}
                name="Errors"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}