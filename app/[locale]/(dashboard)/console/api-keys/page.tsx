"use client";

import React, { useState } from "react";
import { Key, Plus, RefreshCw, Sparkles } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import ApiKeysTable from "./ApiKeysTable";
import CreateApiKeyModal from "./CreateApiKeyModal";
import ApiUsageChart from "./ApiUsageChart";

import OpenQCoreLoader from "../../components/ui/OpenQCoreLoader";

import { getApiKeys, disableApiKey } from "@/app/lib/api/console/apikeys";
import { getUsageStats, type DailyStat } from "@/app/lib/api/console/usage";
import type { ApiKey } from "./types";

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

// ─── Error State ──────────────────────────────────────────────────────────────

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
        Failed to load API keys
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ApiKeysPage() {
  const queryClient = useQueryClient();
  const [showCreate, setShowCreate] = useState(false);

  // ── Query ────────────────────────────────────────────────────────────────

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["api-keys"],
    queryFn: async () => {
      const [keysRes, usageRes] = await Promise.all([
        getApiKeys(),
        getUsageStats(7).catch(() => ({ daily: [] })),
      ]);

      return {
        keys: keysRes.map((k) => ({
          id: k.id,
          key: k.key,
          name: k.name,
          active: k.active,
          created_at: k.created_at,
        })),
        usageData: ((usageRes as any).daily || []) as DailyStat[],
      };
    },
    staleTime: 30_000,
    retry: 1,
  });

  const keys = data?.keys ?? [];
  const usageData = data?.usageData ?? [];

  // ── Revoke ────────────────────────────────────────────────────────────────

  const { mutateAsync: doRevoke } = useMutation({
    mutationFn: disableApiKey,
    onSuccess: (_, id) => {
      queryClient.setQueryData(["api-keys"], (old: any) => ({
        ...old,
        keys: (old?.keys ?? []).map((k: ApiKey) =>
          k.id === id ? { ...k, active: false } : k
        ),
      }));
    },
  });

  async function handleRevoke(id: number) {
    if (!window.confirm("Revoke this API key? This action cannot be undone.")) {
      return;
    }

    try {
      await doRevoke(id);
    } catch {
      // silent
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

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
              Platform Security
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white lg:text-3xl">
                API Keys
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/45">
                Create and manage API keys for programmatic access to the OpenQCore
                platform. Keys are shown only once at creation — store them securely.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <div
              className="
                flex items-center gap-2 rounded-2xl
                border border-white/[0.06]
                bg-[#0f1012]/92 px-3.5 py-2.5
                shadow-[0_8px_24px_rgba(0,0,0,0.14)]
                backdrop-blur-xl
              "
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-300/10 bg-amber-300/[0.08]">
                <Key className="h-4 w-4 text-amber-300/70" />
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-wide text-white/30">
                  Active Keys
                </div>
                <div className="text-sm font-bold text-white">
                  {keys.filter((k) => k.active).length}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowCreate(true)}
              className="
                inline-flex h-11 items-center justify-center gap-2
                rounded-xl bg-amber-300 px-5
                text-sm font-semibold text-black
                shadow-[0_8px_24px_rgba(251,191,36,0.16)]
                transition-all duration-200
                hover:scale-[1.01] hover:bg-amber-200
                active:scale-[0.99]
              "
            >
              <Plus className="h-4 w-4" />
              New Key
            </button>
          </div>
        </section>
      </FadeIn>

      {error && (
        <FadeIn delay={50}>
          <ErrorState onRetry={() => refetch()} />
        </FadeIn>
      )}

      {usageData.length > 0 && (
        <FadeIn delay={100}>
          <ApiUsageChart data={usageData} />
        </FadeIn>
      )}

      <FadeIn delay={150}>
        <ApiKeysTable keys={keys} onRevoke={handleRevoke} />
      </FadeIn>

      <CreateApiKeyModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={(key) => {
          queryClient.setQueryData(["api-keys"], (old: any) => ({
            ...old,
            keys: [key, ...(old?.keys ?? [])],
          }));
          setShowCreate(false);
        }}
      />
    </div>
  );
}