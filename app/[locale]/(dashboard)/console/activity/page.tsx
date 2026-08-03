"use client";

import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import ActivityFeed from "./ActivityFeed";
import ActivityTimeline from "./ActivityTimeline";
import RealtimeStatus from "./RealtimeStatus";
import OpenQCoreLoader from "../../components/ui/OpenQCoreLoader";

import type { ConsoleActivityEvent } from "@/app/lib/api/console/activity";
import { getConsoleActivity } from "@/app/lib/api/console/activity";

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

export default function ConsoleActivityPage() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["console-activity"],
    queryFn: getConsoleActivity,
    staleTime: 30_000,
    refetchInterval: 60_000,
    retry: 1,
  });

  const feedEvents = useMemo<ConsoleActivityEvent[]>(() => {
    if (!data?.events) return [];

    return data.events
      .slice(0, 25)
      .filter(
        (event, index, self) =>
          index === self.findIndex((e) => e.id === event.id)
      );
  }, [data]);

  const timelineEvents = useMemo<ConsoleActivityEvent[]>(() => {
    if (!data?.events) return [];

    return data.events
      .filter((e) => {
        if (e.type === "image_generation") return true;
        if (e.status === "error") return true;
        if (
          e.type === "chat" &&
          e.title &&
          e.title !== "New Chat" &&
          e.title !== "Untitled Chat"
        ) {
          return true;
        }
        return false;
      })
      .filter(
        (event, index, self) =>
          index === self.findIndex((e) => e.title === event.title)
      )
      .slice(0, 8);
  }, [data]);

  if (isLoading || !data) {
    return (
      <div className="relative min-h-[70vh] w-full">
        <OpenQCoreLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-3 px-2 py-16 sm:px-6 xl:px-10">
        <div
          className="
            rounded-2xl border border-white/[0.06]
            bg-[#0f1012]/92 px-6 py-5 text-center
            shadow-[0_8px_24px_rgba(0,0,0,0.16)]
          "
        >
          <p className="text-sm text-white/70">Failed to load activity</p>

          <button
            onClick={() => refetch()}
            className="
              mt-4 inline-flex items-center justify-center
              rounded-xl border border-amber-300/12
              bg-amber-300/[0.08] px-4 py-2
              text-xs font-medium text-amber-200/90
              transition-all duration-150 hover:bg-amber-300/[0.12]
            "
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-2 py-8 sm:px-6 xl:px-10">
      {data.summary && (
        <FadeIn delay={0}>
          <section>
            <RealtimeStatus summary={data.summary} />
          </section>
        </FadeIn>
      )}

      <FadeIn delay={100}>
        <section className="grid grid-cols-1 items-start gap-6 2xl:grid-cols-[1.4fr_0.75fr]">
          <div className="min-w-0 flex flex-col gap-6">
            <ActivityFeed events={feedEvents} />
          </div>

          <aside className="w-full 2xl:sticky 2xl:top-6">
            <ActivityTimeline events={timelineEvents} />
          </aside>
        </section>
      </FadeIn>
    </div>
  );
}