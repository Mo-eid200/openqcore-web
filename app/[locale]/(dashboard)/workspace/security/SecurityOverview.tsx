"use client";

import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Shield, AlertTriangle, KeyRound, History } from "lucide-react";

import { useWorkspace } from "@/app/context/WorkspaceContext";
import { getSecurityOverview } from "@/app/lib/api/workspace/security";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatRelativeTime(value: string | null): string {
  if (!value) return "—";

  const date = new Date(value);
  const diffMs = Date.now() - date.getTime();

  if (Number.isNaN(diffMs)) return "—";

  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function OverviewSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-24 animate-pulse rounded-2xl bg-white/[0.03]"
        />
      ))}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SecurityOverview() {
  const { activeWorkspace } = useWorkspace();

  const { data, isLoading, error } = useQuery({
    queryKey: ["workspace-security-overview", activeWorkspace?.id],
    queryFn: () => getSecurityOverview(activeWorkspace!.id),
    enabled: !!activeWorkspace?.id,
    staleTime: 20_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const stats = [
    {
      label: "Active Sessions",
      value: String(data?.active_sessions ?? 0),
      icon: Shield,
      accent: "text-red-300",
    },
    {
      label: "Open Alerts",
      value: String(data?.open_alerts ?? 0),
      icon: AlertTriangle,
      accent: "text-[#d4af37]",
    },
    {
      label: "Active API Keys",
      value: String(data?.active_api_keys ?? 0),
      icon: KeyRound,
      accent: "text-emerald-300",
    },
    {
      label: "Last Access",
      value: formatRelativeTime(data?.last_access_at ?? null),
      icon: History,
      accent: "text-white",
    },
  ];

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0c0a06]/95 p-5 backdrop-blur-xl">
      <div className="mb-4">
        <div className="text-base font-semibold text-white">Security Overview</div>
        <div className="text-xs text-white/35">
          Snapshot of session activity, access, alerts, and workspace protection
        </div>
      </div>

      {isLoading ? (
        <OverviewSkeleton />
      ) : error ? (
        <div className="rounded-xl border border-rose-500/15 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error instanceof Error
            ? error.message
            : "Failed to load security overview."}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, delay: idx * 0.03 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-xs text-white/35">{stat.label}</div>
                  <Icon className="h-4 w-4 text-white/25" />
                </div>

                <div className={`text-xl font-bold ${stat.accent}`}>
                  {stat.value}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}