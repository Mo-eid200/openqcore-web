"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { History } from "lucide-react";

import { useWorkspace } from "@/app/context/WorkspaceContext";
import {
  getAccessLogs,
  type AccessLogEntry,
} from "@/app/lib/api/workspace/security";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatRelativeTime(iso: string | null): string {
  if (!iso) return "—";

  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);

  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m ago`;

  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;

  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function formatDevice(
  browser: string | null,
  os: string | null,
  deviceType: string | null,
): string {
  const parts = [browser, os].filter(Boolean);
  if (parts.length > 0) return parts.join(" · ");
  return deviceType || "Unknown device";
}

function formatLocation(city: string | null, country: string | null): string {
  const parts = [city, country].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "—";
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function LogsSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-11 animate-pulse rounded-xl bg-white/[0.03]"
        />
      ))}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AccessLogs() {
  const { activeWorkspace } = useWorkspace();
  const [offset, setOffset] = useState(0);
  const [allLogs, setAllLogs] = useState<AccessLogEntry[]>([]);
  const limit = 20;

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["workspace-access-logs", activeWorkspace?.id, offset],
    queryFn: () => getAccessLogs(activeWorkspace!.id, { limit, offset }),
    enabled: !!activeWorkspace?.id,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  useEffect(() => {
    if (!data) return;
    setAllLogs((prev) => (offset === 0 ? data.logs : [...prev, ...data.logs]));
  }, [data, offset]);

  useEffect(() => {
    setOffset(0);
    setAllLogs([]);
  }, [activeWorkspace?.id]);

  const logs = allLogs;
  const hasMore = (data?.logs.length ?? 0) === limit;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0c0a06]/95 backdrop-blur-xl">
      <div className="flex items-center gap-3 p-5 pb-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
          <History className="h-5 w-5 text-red-400" />
        </div>

        <div>
          <div className="text-base font-semibold text-white">Access Logs</div>
          <div className="text-xs text-white/35">
            Who signed in, from where, and on what device
          </div>
        </div>
      </div>

      {logs.length === 0 && isLoading ? (
        <div className="px-5 pb-5">
          <LogsSkeleton />
        </div>
      ) : error ? (
        <div className="px-5 pb-5">
          <div className="rounded-xl border border-rose-500/15 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error instanceof Error
              ? error.message
              : "Failed to load access logs."}
          </div>
        </div>
      ) : logs.length === 0 ? (
        <div className="px-5 pb-8 text-center text-sm text-white/35">
          No login activity recorded yet.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-t border-white/[0.06]">
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-white/30">
                    User
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-white/30">
                    Action
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-white/30">
                    Location
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-white/30">
                    Device
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-white/30">
                    IP
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-white/30">
                    Time
                  </th>
                </tr>
              </thead>

              <tbody>
                {logs.map((log, idx) => (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.15,
                      delay: Math.min(idx, 10) * 0.02,
                    }}
                    className="border-t border-white/[0.04] transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3 text-sm text-white/90">
                      <div className="max-w-[180px] truncate">
                        {log.actor_name || log.actor_email || "Unknown"}
                      </div>
                    </td>

                    <td className="px-5 py-3 text-sm text-white/60">
                      Signed in
                    </td>

                    <td className="px-5 py-3 text-xs text-white/35">
                      {formatLocation(log.city, log.country)}
                    </td>

                    <td className="px-5 py-3 text-xs text-white/35">
                      <div className="max-w-[220px] truncate">
                        {formatDevice(log.browser, log.os, log.device_type)}
                      </div>
                    </td>

                    <td className="px-5 py-3 font-mono text-xs text-white/30">
                      {log.ip_address || "—"}
                    </td>

                    <td className="px-5 py-3 text-xs text-white/35">
                      {formatRelativeTime(log.logged_in_at)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {hasMore && (
            <div className="flex justify-center border-t border-white/[0.06] py-3">
              <button
                type="button"
                onClick={() => setOffset((prev) => prev + limit)}
                disabled={isFetching}
                className="text-xs text-white/40 transition-colors hover:text-white disabled:opacity-50"
              >
                {isFetching ? "Loading…" : "Load more"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}