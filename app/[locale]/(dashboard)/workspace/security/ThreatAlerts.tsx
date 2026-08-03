"use client";

import React from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ShieldAlert,
  CheckCheck,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { useWorkspace } from "@/app/context/WorkspaceContext";
import {
  getThreatAlerts,
  markThreatAlertRead,
  resolveThreatAlert,
  type ThreatAlertItem,
} from "@/app/lib/api/workspace/security";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatRelativeTime(value: string | null): string {
  if (!value) return "Unknown";

  const date = new Date(value);
  const diffMs = Date.now() - date.getTime();

  if (Number.isNaN(diffMs)) return "Unknown";

  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;

  return date.toLocaleDateString();
}

function formatAlertType(value: string): string {
  return value
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function severityClasses(severity: ThreatAlertItem["severity"]) {
  switch (severity) {
    case "critical":
      return "border-rose-500/20 bg-rose-500/10 text-rose-300";
    case "high":
      return "border-pink-500/20 bg-pink-500/10 text-pink-300";
    case "medium":
      return "border-[#d4af37]/20 bg-[#d4af37]/10 text-[#d4af37]";
    case "low":
    default:
      return "border-white/10 bg-white/[0.04] text-white/50";
  }
}

function statusClasses(status: ThreatAlertItem["status"]) {
  switch (status) {
    case "resolved":
      return "border-emerald-400/20 bg-emerald-500/10 text-emerald-300";
    case "read":
      return "border-white/10 bg-white/[0.04] text-white/45";
    case "dismissed":
      return "border-indigo-400/20 bg-indigo-500/10 text-indigo-300";
    case "open":
    default:
      return "border-rose-500/20 bg-rose-500/10 text-rose-300";
  }
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function AlertsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="h-24 animate-pulse rounded-2xl bg-white/[0.03]"
        />
      ))}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ThreatAlerts() {
  const { activeWorkspace } = useWorkspace();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["workspace-threat-alerts", activeWorkspace?.id],
    queryFn: () =>
      getThreatAlerts(activeWorkspace!.id, {
        limit: 20,
        offset: 0,
      }),
    enabled: !!activeWorkspace?.id,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const markReadMutation = useMutation({
    mutationFn: async (alertId: string) =>
      markThreatAlertRead(activeWorkspace!.id, alertId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["workspace-threat-alerts", activeWorkspace?.id],
      });
    },
  });

  const resolveMutation = useMutation({
    mutationFn: async (alertId: string) =>
      resolveThreatAlert(activeWorkspace!.id, alertId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["workspace-threat-alerts", activeWorkspace?.id],
      });
    },
  });

  const alerts = data?.items ?? [];
  const openCount = alerts.filter((a) => a.status === "open").length;
  const criticalCount = alerts.filter((a) => a.severity === "critical").length;

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0c0a06]/95 p-5 backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10">
          <ShieldAlert className="h-5 w-5 text-rose-400" />
        </div>

        <div className="min-w-0">
          <div className="text-base font-semibold text-white">Threat Alerts</div>
          <div className="text-xs text-white/35">
            Suspicious activity and security events across this workspace
          </div>
        </div>
      </div>

      {isLoading ? (
        <AlertsSkeleton />
      ) : error ? (
        <div className="rounded-xl border border-rose-500/15 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error instanceof Error
            ? error.message
            : "Failed to load threat alerts."}
        </div>
      ) : alerts.length === 0 ? (
        <div className="rounded-xl bg-white/[0.03] py-8 text-center text-sm text-white/35">
          No threat alerts found.
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-4"
        >
          {/* Summary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/[0.03] px-4 py-3">
              <div className="text-xs text-white/35">Open alerts</div>
              <div className="text-xl font-bold text-rose-300">{openCount}</div>
            </div>

            <div className="rounded-xl bg-white/[0.03] px-4 py-3">
              <div className="text-xs text-white/35">Critical alerts</div>
              <div className="text-xl font-bold text-[#d4af37]">
                {criticalCount}
              </div>
            </div>
          </div>

          {/* Alerts list */}
          <div className="flex flex-col gap-3">
            {alerts.map((alert, index) => {
              const isMarking =
                markReadMutation.isPending &&
                markReadMutation.variables === alert.id;

              const isResolving =
                resolveMutation.isPending &&
                resolveMutation.variables === alert.id;

              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, delay: Math.min(index, 8) * 0.03 }}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-4"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${severityClasses(alert.severity)}`}
                        >
                          {alert.severity}
                        </span>

                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${statusClasses(alert.status)}`}
                        >
                          {alert.status}
                        </span>
                      </div>

                      <div className="text-sm font-semibold text-white">
                        {alert.title}
                      </div>

                      <div className="mt-1 text-sm leading-6 text-white/60">
                        {alert.description}
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-white/30">
                        <span>{formatRelativeTime(alert.created_at)}</span>
                        <span className="tracking-wide text-white/25">
                          {formatAlertType(alert.type)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {alert.status === "open" && (
                        <button
                          type="button"
                          onClick={() => markReadMutation.mutate(alert.id)}
                          disabled={isMarking || isResolving}
                          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/80 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isMarking ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <CheckCheck className="h-4 w-4" />
                          )}
                          Mark as read
                        </button>
                      )}

                      {alert.status !== "resolved" && (
                        <button
                          type="button"
                          onClick={() => resolveMutation.mutate(alert.id)}
                          disabled={isMarking || isResolving}
                          className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/15 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isResolving ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4" />
                          )}
                          Resolve
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}