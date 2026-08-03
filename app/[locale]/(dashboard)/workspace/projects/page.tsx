"use client";

import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { PageHeader }        from "../../components/ui/PageHeader";
import { ProjectsToolbar }   from "./ProjectsToolbar";
import { ProjectsGrid }      from "./ProjectsGrid";
import { CreateProjectModal } from "./CreateProjectModal";

import {
  getConsoleProjects,
  createConsoleProject,
  deleteConsoleProject,
  type ConsoleProject,
} from "@/app/lib/api/console/projects";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="h-40 rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse"
          style={{ animationDelay: `${i * 60}ms` }}
        />
      ))}
    </div>
  );
}

// ─── Normalize ────────────────────────────────────────────────────────────────

function formatDate(iso: string | null) {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60)  return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs  < 24)  return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function toGridProject(p: ConsoleProject) {
  return {
    id:          p.id,
    name:        p.title,
    status:      p.status,
    description: p.description,
    createdAt:   formatDate(p.created_at),
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const queryClient = useQueryClient();
  const [search,      setSearch]      = useState("");
  const [showCreate,  setShowCreate]  = useState(false);

  // ── Query ──────────────────────────────────────────────────────────────────
  const { data, isLoading } = useQuery({
    queryKey:  ["console-projects"],
    queryFn:   getConsoleProjects,
    staleTime: 60_000,
    gcTime:    5 * 60_000,
    retry: 1,
  });

  // ── Create ─────────────────────────────────────────────────────────────────
  const { mutateAsync: doCreate, isPending: creating } = useMutation({
    mutationFn: createConsoleProject,
    onSuccess: (created) => {
      queryClient.setQueryData(["console-projects"], (old: ConsoleProject[] | undefined) =>
        [created, ...(old ?? [])]
      );
      setShowCreate(false);
    },
  });

  // ── Delete ─────────────────────────────────────────────────────────────────
  const { mutateAsync: doDelete } = useMutation({
    mutationFn: deleteConsoleProject,
    onSuccess: (_, id) => {
      queryClient.setQueryData(["console-projects"], (old: ConsoleProject[] | undefined) =>
        (old ?? []).filter(p => p.id !== id)
      );
    },
  });

  // ── Filter ─────────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = data ?? [];
    if (!q) return list.map(toGridProject);
    return list
      .filter(p => p.title.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q))
      .map(toGridProject);
  }, [data, search]);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 xl:px-10 py-10 flex flex-col gap-8">

      <FadeIn delay={0}>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Projects</h1>
          <p className="text-sm text-white/40">Organize and manage your personal AI projects.</p>
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <ProjectsToolbar
          onCreate={() => setShowCreate(true)}
          searchValue={search}
          onSearch={setSearch}
        />
      </FadeIn>

      <FadeIn delay={200}>
        {isLoading ? (
          <PageSkeleton />
        ) : (
          <ProjectsGrid
            projects={filtered}
            onProjectClick={(id) => console.log("open", id)}
          />
        )}
      </FadeIn>

      <CreateProjectModal
        open={showCreate}
        loading={creating}
        onClose={() => setShowCreate(false)}
        onCreate={async ({ name, description }) => {
          await doCreate({ title: name, description, status: "active" });
        }}
      />
    </div>
  );
}