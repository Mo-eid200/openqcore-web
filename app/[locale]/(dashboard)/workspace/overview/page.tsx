"use client";

import React from "react";
import { User, BriefcaseBusiness } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import OverviewStats  from "./OverviewStats";
import OverviewChart  from "./OverviewChart";
import OverviewEvents from "./OverviewEvents";

import { PageHeader }   from "../../components/ui/PageHeader";
import { useDashboard } from "../../components/shell/context/DashboardContext";
import { useWorkspace } from "../../../../context/WorkspaceContext";
import { getWorkspaceOverview } from "../../../../lib/api/workspace/overview";

// ─── Fade wrapper ─────────────────────────────────────────────────────────────

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
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-2xl bg-white/[0.03] animate-pulse border border-white/[0.06]"
            style={{ animationDelay: `${i * 60}ms` }}
          />
        ))}
      </div>
      <div className="flex flex-col xl:flex-row gap-10">
        <div className="flex-1 h-[300px] rounded-2xl bg-white/[0.03] animate-pulse border border-white/[0.06]" />
        <div className="w-full xl:w-[340px] h-[300px] rounded-2xl bg-white/[0.03] animate-pulse border border-white/[0.06]" />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OverviewPage() {
  const { dashboardMode }   = useDashboard();
  const { activeWorkspace } = useWorkspace();
  const isConsole = dashboardMode === "console";

  const { data, isLoading } = useQuery({
    queryKey:  ["workspace-overview", activeWorkspace?.id],
    queryFn:   () => getWorkspaceOverview(activeWorkspace!.id),
    enabled:   !!activeWorkspace?.id && !isConsole,
    staleTime: 60_000,       // ← cache دقيقة كاملة
    gcTime:    5 * 60_000,   // ← يفضل في الـ memory 5 دقايق
    retry: 1,
  });

  return (
    <div className="
      w-full max-w-7xl mx-auto
      px-2 sm:px-6 xl:px-10
      py-10 flex flex-col gap-10
    ">

      {/* HEADER */}
{/* HEADER */}
<FadeIn delay={0}>
  <div className="flex items-center gap-5">
    {isConsole ? (
      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-tr from-[#d4af37] to-[#ffe08c]">
        <User className="w-5 h-5 text-black" />
      </div>
    ) : (
      <img src="/icons/workspace.png" alt="Workspace" className="w-32 h-32 object-contain" />
    )}
    <div>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
        {isConsole ? "Console Overview" : "Workspace Overview"}
      </h1>
      <p className="mt-1 text-sm text-slate-400">
        {isConsole
          ? "Monitor your AI activity, generations, API usage, personal agents, and account insights in one unified workspace."
          : "Monitor infrastructure activity, agent performance, usage, and real-time system events — all in one place."
        }
      </p>
    </div>
  </div>
</FadeIn>

      {/* CONTENT */}
      {!isConsole && isLoading ? (
        <PageSkeleton />
      ) : (
        <>
          <FadeIn delay={100}>
            <section>
              <OverviewStats stats={data?.stats} />
            </section>
          </FadeIn>

          <FadeIn delay={200}>
            <section className="flex flex-col xl:flex-row gap-10 items-start">
              <div className="flex-1 min-w-0">
                <OverviewChart chartData={data?.chart_data} />
              </div>
              <aside className="w-full xl:w-[340px] 2xl:w-[390px] flex-shrink-0">
                <OverviewEvents events={data?.events} />
              </aside>
            </section>
          </FadeIn>
        </>
      )}
    </div>
  );
}