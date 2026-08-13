"use client";

import React, { useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import ActivityFeed from "./ActivityFeed";
import ActivityTimeline from "./ActivityTimeline";
import RealtimeStatus from "./RealtimeStatus";
import ActivityFilters, {
    type ActivityFilterState,
    EMPTY_FILTERS,
} from "./ActivityFilters";
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
  const [filters, setFilters] = useState<ActivityFilterState>(EMPTY_FILTERS);

  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["console-activity", filters],
    queryFn: ({ pageParam }) =>
      getConsoleActivity({
        types: filters.types.length ? filters.types : undefined,
        statuses: filters.statuses.length ? filters.statuses : undefined,
        search: filters.search || undefined,
        date_from: filters.dateFrom || undefined,
        date_to: filters.dateTo || undefined,
        cursor: pageParam,
        limit: 25,
      }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.has_more ? lastPage.next_cursor : undefined,
    staleTime: 30_000,
    refetchInterval: 60_000,
    retry: 1,
    // 🔧 FIX: keeps the PREVIOUS query's results on screen while a
    // new one (triggered by any filter/search change) is in flight,
    // instead of the whole page — including the filter bar itself —
    // disappearing behind the full-page loader on every keystroke.
    // This is the standard React Query pattern for "changing filters
    // shouldn't feel like a fresh page load".
    placeholderData: (previousData) => previousData,
  });

  // Flatten every loaded page's events into one list. Summary always
  // comes from the FIRST page — it's computed server-side over the
  // full unfiltered set, so it's identical across pages and doesn't
  // need re-merging.
  const allEvents = useMemo<ConsoleActivityEvent[]>(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => page.events);
  }, [data]);

  const summary = data?.pages?.[0]?.summary;

  const feedEvents = useMemo<ConsoleActivityEvent[]>(() => {
    return allEvents.filter(
      (event, index, self) =>
        index === self.findIndex((e) => e.id === event.id)
    );
  }, [allEvents]);

  const timelineEvents = useMemo<ConsoleActivityEvent[]>(() => {
    return allEvents
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
          index === self.findIndex((e) => e.id === event.id)
      )
      .slice(0, 8);
  }, [allEvents]);

  // 🔧 FIX: only the VERY FIRST load (nothing cached for ANY filter
  // combination yet) shows the full-page loader. Once we have any
  // data at all, subsequent filter/search changes never blank the
  // page — see isFetching handling below instead.
  if (isLoading && !data) {
    return (
      <div className="relative min-h-[70vh] w-full">
        <OpenQCoreLoader />
      </div>
    );
  }

  if (error && !data) {
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

  // isFetching is true whenever ANY fetch is in flight (including
  // filter changes on top of already-loaded data) — used below just
  // to dim the list slightly and show a small inline spinner, never
  // to blank the page.
  const isUpdating = isFetching && !isFetchingNextPage;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-2 py-8 sm:px-6 xl:px-10">
      {summary && (
        <FadeIn delay={0}>
          <section>
            <RealtimeStatus summary={summary} />
          </section>
        </FadeIn>
      )}

      <FadeIn delay={50}>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <ActivityFilters value={filters} onChange={setFilters} />
          </div>

          {isUpdating && (
            <Loader2 className="h-4 w-4 shrink-0 animate-spin text-amber-300/60" />
          )}
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <section
          className={`
            grid grid-cols-1 items-start gap-6 2xl:grid-cols-[1.4fr_0.75fr]
            transition-opacity duration-200
            ${isUpdating ? "opacity-60" : "opacity-100"}
          `}
        >
          <div className="min-w-0 flex flex-col gap-6">
            <ActivityFeed events={feedEvents} />

            {feedEvents.length === 0 && !isUpdating && (
              <div
                className="
                  rounded-2xl border border-white/[0.06]
                  bg-[#0f1012]/92 px-6 py-10 text-center
                "
              >
                <p className="text-sm text-white/50">
                  No activity matches these filters.
                </p>
              </div>
            )}

            {hasNextPage && (
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="
                  mx-auto flex items-center justify-center
                  rounded-xl border border-white/[0.08]
                  bg-white/[0.03] px-5 py-2.5
                  text-sm font-medium text-white/70
                  transition-all
                  hover:bg-white/[0.06] hover:text-white
                  disabled:opacity-50
                "
              >
                {isFetchingNextPage ? "Loading..." : "Load More"}
              </button>
            )}
          </div>

          <aside className="w-full 2xl:sticky 2xl:top-6">
            <ActivityTimeline events={timelineEvents} />
          </aside>
        </section>
      </FadeIn>
    </div>
  );
}