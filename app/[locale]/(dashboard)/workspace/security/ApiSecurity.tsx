"use client";

import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { KeyRound } from "lucide-react";

import { useWorkspace } from "@/app/context/WorkspaceContext";
import {
  getApiKeysSummary,
  type ApiKeySummaryItem,
} from "@/app/lib/api/workspace/security";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatLimit(key: ApiKeySummaryItem): string {
  if (key.is_unlimited) return "Unlimited";
  if (key.monthly_token_limit) {
    return `${key.monthly_token_limit.toLocaleString()}/mo`;
  }
  if (key.daily_limit) return `${key.daily_limit.toLocaleString()}/day`;
  return "No limit set";
}

function formatScopes(scopes: string | null): string {
  if (!scopes) return "No scopes";

  return scopes
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .join(", ");
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function KeysSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className="h-14 animate-pulse rounded-xl bg-white/[0.03]"
        />
      ))}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ApiSecurity() {
  const { activeWorkspace } = useWorkspace();

  const { data, isLoading, error } = useQuery({
    queryKey: ["workspace-api-keys", activeWorkspace?.id],
    queryFn: () => getApiKeysSummary(activeWorkspace!.id, { limit: 50 }),
    enabled: !!activeWorkspace?.id,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const keys = data?.items ?? [];
  const activeCount = keys.filter((k) => k.active).length;

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0c0a06]/95 p-5 backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
          <KeyRound className="h-5 w-5 text-red-400" />
        </div>

        <div>
          <div className="text-base font-semibold text-white">API Security</div>
          <div className="text-xs text-white/35">
            Keys and access scopes for this workspace
          </div>
        </div>
      </div>

      {isLoading ? (
        <KeysSkeleton />
      ) : error ? (
        <div className="rounded-xl border border-rose-500/15 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error instanceof Error ? error.message : "Failed to load API keys."}
        </div>
      ) : keys.length === 0 ? (
        <div className="rounded-xl bg-white/[0.03] py-8 text-center text-sm text-white/35">
          No API keys created yet.
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
              <div className="text-xs text-white/35">Total keys</div>
              <div className="text-xl font-bold text-white">{keys.length}</div>
            </div>

            <div className="rounded-xl bg-white/[0.03] px-4 py-3">
              <div className="text-xs text-white/35">Active</div>
              <div className="text-xl font-bold text-emerald-400">
                {activeCount}
              </div>
            </div>
          </div>

          {/* Key list */}
          <div className="flex flex-col divide-y divide-white/[0.06]">
            {keys.map((key) => (
              <div
                key={key.id}
                className="flex items-center justify-between gap-3 py-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm text-white">
                    {key.name || "Unnamed key"}
                  </div>

                  <div className="mt-0.5 truncate text-xs text-white/35">
                    {formatScopes(key.scopes)} · {formatLimit(key)}
                  </div>

                  <div className="mt-0.5 truncate font-mono text-xs text-white/25">
                    {key.key_preview}
                  </div>
                </div>

                <span
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
                    key.active
                      ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-300"
                      : "border-white/10 bg-white/[0.04] text-white/40"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      key.active ? "bg-emerald-400" : "bg-white/30"
                    }`}
                  />
                  {key.active ? "active" : "disabled"}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}