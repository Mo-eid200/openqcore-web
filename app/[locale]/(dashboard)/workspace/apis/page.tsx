"use client";

import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createPortal } from "react-dom";
import { KeyRound } from "lucide-react";

import { ApiKeysTable }     from "./ApiKeysTable";
import { CreateApiKeyModal } from "./CreateApiKeyModal";
import { ApiUsageChart }    from "./ApiUsageChart";
import { ApiEndpointCard }  from "./ApiEndpointCard";
import { RateLimitCard }    from "./RateLimitCard";

import { useWorkspace } from "@/app/context/WorkspaceContext";
import {
  getWorkspaceApiKeys,
  createWorkspaceApiKey,
  revokeWorkspaceApiKey,
  type WorkspaceApiKey,
  type WorkspaceApiKeyCreated,
  type ApiKeyListResponse,
} from "@/app/lib/api/workspace/api-keys";

// ─── Static data ──────────────────────────────────────────────────────────────

const ENDPOINTS = [
  { method: "POST" as const, path: "/v1/generate",   description: "Generate completions using your models", status: "stable" as const },
  { method: "GET"  as const, path: "/v1/usage",      description: "Get API usage and statistics.",           status: "stable" as const },
  { method: "POST" as const, path: "/v1/embeddings", description: "Create and manage vector embeddings.",    status: "beta"   as const },
];

const RATE_LIMITS = [
  { scope: "Standard", limit: "60 req/min",  window: "1 min", used: "—" },
  { scope: "Premium",  limit: "300 req/min", window: "1 min", used: "—" },
];

// ─── Fade ─────────────────────────────────────────────────────────────────────

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
    <div className="flex flex-col gap-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="h-16 rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse"
          style={{ animationDelay: `${i * 60}ms` }}
        />
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ApiPage() {
  const { activeWorkspace } = useWorkspace();
  const queryClient         = useQueryClient();
  const [showCreate,  setShowCreate]  = useState(false);
  const [createdKey,  setCreatedKey]  = useState<WorkspaceApiKeyCreated | null>(null);

  // ── Query ──────────────────────────────────────────────────────────────────
  const { data, isLoading } = useQuery({
    queryKey:  ["workspace-api-keys", activeWorkspace?.id],
    queryFn:   () => getWorkspaceApiKeys(activeWorkspace!.id),
    enabled:   !!activeWorkspace?.id,
    staleTime: 60_000,
    gcTime:    5 * 60_000,
    retry:     1,
  });

  // ── Create ─────────────────────────────────────────────────────────────────
  const { mutateAsync: doCreate, isPending: creating } = useMutation({
    mutationFn: (payload: Parameters<typeof createWorkspaceApiKey>[1]) =>
      createWorkspaceApiKey(activeWorkspace!.id, payload),
    onSuccess: (created) => {
      queryClient.setQueryData(
        ["workspace-api-keys", activeWorkspace?.id],
        (old: ApiKeyListResponse | undefined) => ({
          ...old,
          items: [created, ...(old?.items ?? [])],
          total: (old?.total ?? 0) + 1,
        })
      );
      setShowCreate(false);
      setCreatedKey(created);
    },
  });

  // ── Revoke ─────────────────────────────────────────────────────────────────
  const { mutateAsync: doRevoke } = useMutation({
    mutationFn: (keyId: number) =>
      revokeWorkspaceApiKey(activeWorkspace!.id, keyId),
    onSuccess: (_, keyId) => {
      queryClient.setQueryData(
        ["workspace-api-keys", activeWorkspace?.id],
        (old: ApiKeyListResponse | undefined) => ({
          ...old,
          items: (old?.items ?? []).map(k =>
            k.id === keyId ? { ...k, active: false } : k
          ),
        })
      );
    },
  });

  // ── Keys for table ─────────────────────────────────────────────────────────
  const tableKeys = useMemo(() =>
    (data?.items ?? []).map(k => ({
      id:        String(k.id),
      key:       k.key_preview,
      label:     k.name ?? "—",
      createdAt: k.created_at?.slice(0, 10) ?? "—",
      status:    k.active ? "active" as const : "revoked" as const,
      rawId:     k.id,
    })),
    [data?.items]
  );

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 xl:px-10 py-10 flex flex-col gap-8">

        {/* Header */}
        <FadeIn delay={0}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20">
                <KeyRound className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">API & SDK</h1>
                <p className="text-sm text-white/40">Manage API keys, track usage, and access endpoints</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 h-9 px-4 rounded-xl bg-red-500 text-white text-[13px] font-semibold hover:bg-red-400 transition-all shrink-0"
            >
              + New API Key
            </button>
          </div>
        </FadeIn>

        {/* Content */}
        <div className="grid gap-8 xl:grid-cols-[2fr_1fr]">

          {/* Left */}
          <div className="flex flex-col gap-8">
            <FadeIn delay={100}>
              {isLoading ? (
                <PageSkeleton />
              ) : (
                <ApiKeysTable
                  keys={tableKeys}
                  onRevoke={async (id) => {
                    const raw = tableKeys.find(k => k.id === id);
                    if (!raw) return;
                    if (!window.confirm("Revoke this API key?")) return;
                    await doRevoke(raw.rawId);
                  }}
                />
              )}
            </FadeIn>

            <FadeIn delay={200}>
              <ApiUsageChart workspaceId={activeWorkspace?.id} />
            </FadeIn>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-8">
            <FadeIn delay={300}>
              <div className="flex flex-col gap-3">
                <h2 className="text-[13px] font-medium uppercase tracking-wider text-white/30">Endpoints</h2>
                {ENDPOINTS.map(e => (
                  <ApiEndpointCard key={e.path} endpoint={e} />
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <div className="flex flex-col gap-3">
                <h2 className="text-[13px] font-medium uppercase tracking-wider text-white/30">Rate Limits</h2>
                {RATE_LIMITS.map(r => (
                  <RateLimitCard key={r.scope} rate={r} />
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {createPortal(
        <CreateApiKeyModal
          open={showCreate}
          loading={creating}
          onClose={() => setShowCreate(false)}
          onCreate={async (payload) => {
            await doCreate(payload);
          }}
        />,
        document.body
      )}

      {/* Show created key once */}
      {createdKey && createPortal(
        <div
          className="fixed inset-0 z-[999] bg-black/75 flex items-center justify-center px-4"
          onClick={() => setCreatedKey(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0d0d10] p-6 flex flex-col gap-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-emerald-400" />
              <span className="text-[15px] font-semibold text-white">API Key Created</span>
            </div>
            <p className="text-[12px] text-white/40">
              Copy this key now — it won't be shown again.
            </p>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04]">
              <code className="text-[12px] text-emerald-300 flex-1 truncate font-mono">
                {createdKey.key}
              </code>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(createdKey.key)}
                className="text-[11px] text-white/40 hover:text-white transition shrink-0"
              >
                Copy
              </button>
            </div>
            <button
              type="button"
              onClick={() => setCreatedKey(null)}
              className="h-9 px-4 rounded-xl bg-white/[0.06] text-white/60 text-xs hover:bg-white/[0.08] transition-all"
            >
              Done
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}