"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { qxtApiClient } from "@/app/lib/api/core/qxtClient";

interface UsagePoint {
  day:      string;
  requests: number;
  tokens:   number;
}

async function getWorkspaceUsageChart(workspaceId: string, days: number): Promise<UsagePoint[]> {
  const res = await qxtApiClient.get(`/api/v1/workspaces/${workspaceId}/activity`, {
    params: { days }
  });
  return res.data?.chart_data ?? [];
}

export function ApiUsageChart({ workspaceId }: { workspaceId?: string }) {
  const [period, setPeriod] = useState<7 | 14>(7);

  const { data, isLoading } = useQuery({
    queryKey:  ["workspace-usage-chart", workspaceId, period],
    queryFn:   () => getWorkspaceUsageChart(workspaceId!, period),
    enabled:   !!workspaceId,
    staleTime: 60_000,
    gcTime:    5 * 60_000,
  });

  const chart = (data ?? []).slice(-period);

  return (
    <div className="
      relative flex flex-col
      rounded-2xl border border-white/[0.06]
      bg-[#0d0d10]/95 backdrop-blur-xl
      overflow-hidden min-h-[280px]
    ">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2 shrink-0">
        <span className="text-[15px] font-semibold text-white">API Usage</span>
        <select
          value={period}
          onChange={e => setPeriod(Number(e.target.value) as 7 | 14)}
          className="rounded-lg bg-[#0d0d10] border border-white/[0.08] text-xs text-white/60 px-3 py-1.5 outline-none transition hover:bg-white/[0.04] [&>option]:bg-[#0d0d10] [&>option]:text-white"
        >
          <option value={7}>Last 7 days</option>
          <option value={14}>Last 14 days</option>
        </select>
      </div>

      {/* Chart */}
      <div className="flex-1 px-2 py-4">
        {isLoading ? (
          <div className="h-48 rounded-xl bg-white/[0.02] animate-pulse" />
        ) : chart.length === 0 ? (
          <div className="h-48 flex items-center justify-center text-white/20 text-sm">
            No usage data yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chart} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="reqGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}    />
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
                fill="url(#reqGrad)"
                dot={false}
                name="Requests"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}