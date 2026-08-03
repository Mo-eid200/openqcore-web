"use client";

import React, { useState } from "react";
import {
  BarChart3,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import UsageCards from "./UsageCards";
import UsageChart from "./UsageChart";
import UsageBreakdown from "./UsageBreakdown";
import OpenQCoreLoader from "../../components/ui/OpenQCoreLoader";

import { getUsageStats } from "@/app/lib/api/console/usage";

// ─── Fade wrapper ─────────────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div
      className="animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Error ────────────────────────────────────────────────────────────────────

function ErrorState({
  onRetry,
}: {
  onRetry: () => void;
}) {
  return (
    <div
      className="
        flex items-center justify-between rounded-2xl
        border border-red-300/15
        bg-red-300/[0.06]
        px-4 py-3
      "
    >
      <p className="text-xs text-red-200">
        Failed to load usage data
      </p>

      <button
        onClick={onRetry}
        className="flex items-center gap-1.5 text-xs text-red-200/75 transition-all hover:text-red-100"
      >
        <RefreshCw className="h-3 w-3" />
        Retry
      </button>
    </div>
  );
}

// ─── Empty ────────────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <section
      className="
        relative overflow-hidden rounded-3xl
        border border-white/[0.06]
        bg-[#0f1012]/92
        shadow-[0_18px_50px_rgba(0,0,0,0.22)]
        backdrop-blur-2xl
      "
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-60px] top-[-60px] h-[180px] w-[180px] rounded-full bg-amber-300/[0.06] blur-[80px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.025),transparent_38%)]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-4 px-6 py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.05] bg-amber-300/[0.08]">
          <BarChart3 className="h-8 w-8 text-amber-300/70" />
        </div>

        <div>
          <p className="text-sm font-semibold text-white/72">
            No usage data yet
          </p>
          <p className="mt-1 text-xs text-white/30">
            Start using the platform to see analytics here.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UsagePage() {
  const [days, setDays] = useState(7);

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["usage", days],
    queryFn: () => getUsageStats(days),
    staleTime: 30_000,
    retry: 1,
  });

  const isEmpty =
    data &&
    (data.total_requests ?? 0) === 0 &&
    (data.total_images ?? 0) === 0;

  if (isLoading) {
    return (
      <div className="relative min-h-[70vh] w-full">
        <OpenQCoreLoader />
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-3 py-8 sm:px-6 xl:px-10">
      <FadeIn delay={0}>
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          {/* Left */}
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-amber-300/80">
              <Sparkles className="h-3.5 w-3.5" />
              Platform Analytics
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white lg:text-3xl">
                Usage & Analytics
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/45">
                Track your AI consumption across completions, images,
                voice, and agents in one unified analytics view.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            {[7, 14, 30].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDays(d)}
                className={`
                  h-9 rounded-xl px-4 text-xs font-medium transition-all
                  ${
                    days === d
                      ? "bg-amber-300 text-black shadow-[0_8px_24px_rgba(251,191,36,0.16)]"
                      : "border border-white/[0.08] bg-white/[0.02] text-white/40 hover:border-white/[0.12] hover:text-white/70"
                  }
                `}
              >
                {d}d
              </button>
            ))}
          </div>
        </section>
      </FadeIn>

      {error && (
        <FadeIn delay={40}>
          <ErrorState onRetry={() => refetch()} />
        </FadeIn>
      )}

      {isEmpty ? (
        <FadeIn delay={80}>
          <EmptyState />
        </FadeIn>
      ) : data ? (
        <>
          <FadeIn delay={100}>
            <UsageCards
              totalRequests={data.total_requests ?? 0}
              totalTokensIn={data.total_tokens_in ?? 0}
              totalTokensOut={data.total_tokens_out ?? 0}
              totalImages={data.total_images ?? 0}
              totalVoice={data.total_voice ?? 0}
              totalAgents={data.total_agents ?? 0}
              avgLatency={data.avg_latency_ms ?? 0}
            />
          </FadeIn>

          <FadeIn delay={180}>
            <UsageChart data={data.daily ?? []} />
          </FadeIn>

          <FadeIn delay={260}>
            <UsageBreakdown categories={data.by_category ?? []} />
          </FadeIn>
        </>
      ) : null}
    </div>
  );
}