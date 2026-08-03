"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Server } from "lucide-react";

import { ClusterCard }      from "./ClusterCard";
import { NodeStatusGrid }   from "./NodeStatusGrid";
import { RegionMap }        from "./RegionMap";
import { ComputeUsageChart } from "./ComputeUsageChart";
import { DeploymentLogs }   from "./DeploymentLogs";

import { useWorkspace } from "@/app/context/WorkspaceContext";
import {
  getComputeOverview,
  deleteCluster,
  deleteNode,
  type ComputeOverview,
} from "@/app/lib/api/workspace/compute";

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
    <div className="grid xl:grid-cols-[2fr_1fr] gap-8">
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-36 rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse"
              style={{ animationDelay: `${i * 60}ms` }} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse"
              style={{ animationDelay: `${i * 60}ms` }} />
          ))}
        </div>
        <div className="h-56 rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse" />
      </div>
      <div className="flex flex-col gap-8">
        <div className="h-56 rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse" />
        <div className="h-56 rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse" />
      </div>
    </div>
  );
}

// ─── Format ───────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60)  return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs  < 24)  return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InfraPage() {
  const { activeWorkspace } = useWorkspace();
  const queryClient         = useQueryClient();

  // ── Query ──────────────────────────────────────────────────────────────────
  const { data, isLoading } = useQuery({
    queryKey:        ["workspace-compute", activeWorkspace?.id],
    queryFn:         () => getComputeOverview(activeWorkspace!.id),
    enabled:         !!activeWorkspace?.id,
    staleTime:       30_000,
    gcTime:          5 * 60_000,
    refetchInterval: 30_000,
    retry:           1,
  });

  // ── Delete cluster ─────────────────────────────────────────────────────────
  const { mutateAsync: doDeleteCluster } = useMutation({
    mutationFn: (clusterId: string) =>
      deleteCluster(activeWorkspace!.id, clusterId),
    onSuccess: (_, clusterId) => {
      queryClient.setQueryData(
        ["workspace-compute", activeWorkspace?.id],
        (old: ComputeOverview | undefined) => ({
          ...old,
          clusters: (old?.clusters ?? []).filter(c => c.id !== clusterId),
        })
      );
    },
  });

  // ── Delete node ────────────────────────────────────────────────────────────
  const { mutateAsync: doDeleteNode } = useMutation({
    mutationFn: (nodeId: string) =>
      deleteNode(activeWorkspace!.id, nodeId),
    onSuccess: (_, nodeId) => {
      queryClient.setQueryData(
        ["workspace-compute", activeWorkspace?.id],
        (old: ComputeOverview | undefined) => ({
          ...old,
          nodes: (old?.nodes ?? []).filter(n => n.id !== nodeId),
        })
      );
    },
  });

  // ── Map data ───────────────────────────────────────────────────────────────
  const clusters = (data?.clusters ?? []).map(c => ({
    id:      c.id,
    name:    c.name,
    region:  c.region,
    status:  c.status,
    nodes:   c.nodes_count,
    updated: formatDate(c.updated_at),
  }));

  const nodes = (data?.nodes ?? []).map(n => ({
    id:     n.id,
    type:   n.type,
    name:   n.name,
    status: n.status,
    cpu:    n.cpu_usage != null ? `${n.cpu_usage}%` : "—",
    gpu:    n.gpu_usage != null ? `${n.gpu_usage}%` : "—",
  }));

  const logs = (data?.logs ?? []).map(l => ({
    id:      l.id,
    level:   l.level,
    message: l.message,
    time:    formatDate(l.created_at),
  }));

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 xl:px-10 py-10 flex flex-col gap-8">

      {/* Header */}
      <FadeIn delay={0}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20">
            <Server className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Compute</h1>
            <p className="text-sm text-white/40">Monitor clusters, nodes, and deployments in real time</p>
          </div>
          <div className="ml-auto flex items-center gap-3 text-[12px] text-white/25">
            <span>{clusters.length} clusters</span>
            <span>·</span>
            <span>{nodes.length} nodes</span>
          </div>
        </div>
      </FadeIn>

      {/* Content */}
      {isLoading ? <PageSkeleton /> : (
        <div className="grid xl:grid-cols-[2fr_1fr] gap-8">

          {/* Left */}
          <div className="flex flex-col gap-8">

            {/* Clusters */}
            <FadeIn delay={100}>
              {clusters.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {clusters.map(c => (
                    <ClusterCard
                      key={c.id}
                      cluster={c}
                      onDelete={async () => {
                        if (!window.confirm(`Delete cluster "${c.name}"?`)) return;
                        await doDeleteCluster(c.id);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center py-16 rounded-2xl border border-white/[0.06] bg-white/[0.02] text-white/20 text-sm">
                  No clusters yet
                </div>
              )}
            </FadeIn>

            {/* Nodes */}
            <FadeIn delay={200}>
              <NodeStatusGrid
                nodes={nodes}
                onDelete={async (id) => {
                  if (!window.confirm("Remove this node?")) return;
                  await doDeleteNode(id);
                }}
              />
            </FadeIn>

            {/* Chart */}
            <FadeIn delay={300}>
              <ComputeUsageChart workspaceId={activeWorkspace?.id} />
            </FadeIn>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-8">
            <FadeIn delay={400}>
              <RegionMap clusters={clusters} />
            </FadeIn>
            <FadeIn delay={500}>
              <DeploymentLogs logs={logs} />
            </FadeIn>
          </div>
        </div>
      )}
    </div>
  );
}