"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart3 } from "lucide-react";

import { RevenueChart }         from "./RevenueChart";
import { UsageChart }           from "./UsageChart";
import { AgentPerformanceTable } from "./AgentPerformanceTable";
import { TrafficSources }       from "./TrafficSources";
import { RealtimeActivity }     from "./RealtimeActivity";
import { AnalyticsSummary }     from "./AnalyticsSummary";

import { useWorkspace }           from "@/app/context/WorkspaceContext";
import { getWorkspaceAnalytics }  from "@/app/lib/api/workspace/analytics";

// ─── Fade ─────────────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div className="animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function PageSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-24 rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse"
            style={{ animationDelay: `${i * 50}ms` }} />
        ))}
      </div>
      <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
        <div className="flex flex-col gap-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="h-56 rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse" />
            <div className="h-56 rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse" />
          </div>
          <div className="h-64 rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse" />
        </div>
        <div className="flex flex-col gap-8">
          <div className="h-56 rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse" />
          <div className="h-56 rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const { activeWorkspace } = useWorkspace();
  const [days, setDays]     = useState(30);

  const { data, isLoading } = useQuery({
    queryKey:  ["workspace-analytics", activeWorkspace?.id, days],
    queryFn:   () => getWorkspaceAnalytics(activeWorkspace!.id, days),
    enabled:   !!activeWorkspace?.id,
    staleTime: 60_000,
    gcTime:    5 * 60_000,
    retry:     1,
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 xl:px-10 py-10 flex flex-col gap-8">

      {/* Header */}
      <FadeIn delay={0}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20">
              <BarChart3 className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Analytics</h1>
              <p className="text-sm text-white/40">Visualize usage, traffic, agents, and live activity</p>
            </div>
          </div>

          {/* Period selector */}
          <select
            value={days}
            onChange={e => setDays(Number(e.target.value))}
            className="rounded-xl bg-[#0d0d10] border border-white/[0.08] text-xs text-white/60 px-3 py-2 outline-none hover:bg-white/[0.04] transition [&>option]:bg-[#0d0d10] [&>option]:text-white"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </div>
      </FadeIn>

      {isLoading ? <PageSkeleton /> : (
        <>
          {/* Summary */}
          <FadeIn delay={100}>
            <AnalyticsSummary summary={data?.summary} />
          </FadeIn>

          {/* Charts + Tables */}
          <div className="grid lg:grid-cols-[2fr_1fr] gap-8">

            {/* Left */}
            <div className="flex flex-col gap-8">
              <FadeIn delay={200}>
                <div className="grid md:grid-cols-2 gap-4">
                  <RevenueChart data={data?.daily_revenue ?? []} />
                  <UsageChart   data={data?.daily_usage   ?? []} />
                </div>
              </FadeIn>

              <FadeIn delay={300}>
                <AgentPerformanceTable agents={data?.agent_performance ?? []} />
              </FadeIn>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-8">
              <FadeIn delay={400}>
                <TrafficSources sources={data?.traffic_sources ?? []} />
              </FadeIn>

              <FadeIn delay={500}>
                <RealtimeActivity events={data?.realtime ?? []} />
              </FadeIn>
            </div>
          </div>
        </>
      )}
    </div>
  );
}