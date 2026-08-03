"use client";

import React, { useState, useMemo } from "react";
import { useQuery }    from "@tanstack/react-query";
import { useWorkspace } from "../../../../context/WorkspaceContext";
import { getWorkspaceActivity } from "../../../../lib/api/workspace/activity";
import type { WorkspaceActivityEvent } from "../../../../lib/api/workspace/activity";

import { RealtimeStatus }  from "./RealtimeStatus";
import { ActivityFilters } from "./ActivityFilters";
import { ActivityFeed }    from "./ActivityFeed";

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
    <div className="flex flex-col gap-6">
      <div className="h-16 rounded-xl bg-white/[0.03] animate-pulse border border-white/[0.06]" />
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-8 w-20 rounded-xl bg-white/[0.03] animate-pulse border border-white/[0.06]" />
        ))}
      </div>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="h-20 rounded-xl bg-white/[0.03] animate-pulse border border-white/[0.06]"
          style={{ animationDelay: `${i * 60}ms` }}
        />
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ActivityPage() {
  const { activeWorkspace } = useWorkspace();
  const [filter, setFilter] = useState("all");

  const { data, isLoading } = useQuery({
    queryKey:  ["workspace-activity", activeWorkspace?.id],
    queryFn:   () => getWorkspaceActivity(activeWorkspace!.id),
    enabled:   !!activeWorkspace?.id,
    staleTime: 60_000,
    gcTime:    5 * 60_000,
    refetchInterval: 60_000,
    retry: 1,
  });

  // ── Filter events ─────────────────────────────────────────────
  const filteredEvents = useMemo<WorkspaceActivityEvent[]>(() => {
    const events = data?.events ?? [];
    if (filter === "all")    return events;
    if (filter === "danger") return events.filter(e => e.status === "danger");
    return events.filter(e => e.type === filter);
  }, [data?.events, filter]);

  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-8 pb-14">

      <FadeIn delay={0}>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Activity</h1>
          <p className="text-slate-400 mb-2">
            Live platform events, deployments, errors and status. All in one place.
          </p>
        </div>
      </FadeIn>

      {isLoading ? (
        <PageSkeleton />
      ) : (
        <>
          <FadeIn delay={100}>
            <RealtimeStatus status={data?.realtime_status} />
          </FadeIn>

          <FadeIn delay={200}>
            <ActivityFilters filter={filter} onFilter={setFilter} />
          </FadeIn>

          <FadeIn delay={300}>
            <ActivityFeed
              asTimeline
              events={filteredEvents}
            />
          </FadeIn>
        </>
      )}
    </div>
  );
}