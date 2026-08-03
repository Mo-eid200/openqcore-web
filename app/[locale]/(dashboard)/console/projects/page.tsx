"use client";

import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@/i18n/navigation";
import {
  FolderKanban,
  Sparkles,
  RefreshCw,
  Search,
} from "lucide-react";

import { ProjectsGrid } from "./ProjectsGrid";
import { ProjectsToolbar } from "./Toolbar";
import { CreateProjectModal } from "./CreateProjectModal";
import OpenQCoreLoader from "../../components/ui/OpenQCoreLoader";

import {
  getConsoleProjects,
  createConsoleProject,
  deleteConsoleProject,
  type ConsoleProject,
} from "@/app/lib/api/console/projects";

// ─── Fade ────────────────────────────────────────────────────────────────────

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

// ─── Format ───────────────────────────────────────────────────────────────────

function formatDate(iso: string | null) {
  if (!iso) return "";

  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);

  if (mins < 60) return `${mins}m ago`;

  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;

  return `${Math.floor(hrs / 24)}d ago`;
}

// ─── Empty Search ─────────────────────────────────────────────────────────────

function EmptySearchState() {
  return (
    <section
      className="
        rounded-3xl border border-white/[0.06]
        bg-[#0f1012]/92 px-6 py-16
        text-center shadow-[0_18px_50px_rgba(0,0,0,0.18)]
        backdrop-blur-2xl
      "
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.05] bg-white/[0.03]">
        <Search className="h-6 w-6 text-white/30" />
      </div>

      <p className="mt-4 text-sm font-semibold text-white/72">
        No matching projects
      </p>

      <p className="mt-1 text-xs text-white/32">
        Try a different project name or description keyword.
      </p>
    </section>
  );
}

// ─── Error ────────────────────────────────────────────────────────────────────

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
        Failed to load projects
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

export default function ProjectsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["console-projects"],
    queryFn: getConsoleProjects,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    retry: 1,
  });

  const { mutateAsync: doCreate, isPending: creating } = useMutation({
    mutationFn: createConsoleProject,
    onSuccess: (created) => {
      queryClient.setQueryData(
        ["console-projects"],
        (old: ConsoleProject[] | undefined) => [created, ...(old ?? [])]
      );
      setShowCreate(false);
    },
  });

  const { mutateAsync: doDelete } = useMutation({
    mutationFn: deleteConsoleProject,
    onSuccess: (_, id) => {
      queryClient.setQueryData(
        ["console-projects"],
        (old: ConsoleProject[] | undefined) =>
          (old ?? []).filter((p) => p.id !== id)
      );
    },
  });

  const rawProjects = data ?? [];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = rawProjects;

    return (q
      ? list.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.description?.toLowerCase().includes(q)
        )
      : list
    ).map((p) => ({
      id: p.id,
      name: p.title,
      status: p.status,
      description: p.description,
      createdAt: formatDate(p.created_at),
    }));
  }, [rawProjects, search]);

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
              Workspace
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white lg:text-3xl">
                Projects
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/45">
                Organize your AI work into projects and keep related assets,
                workflows, and outputs in one place.
              </p>
            </div>
          </div>

          {/* Right */}
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
              <FolderKanban className="h-4 w-4 text-amber-300/70" />
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-wide text-white/30">
                Total Projects
              </div>
              <div className="text-sm font-bold text-white">
                {rawProjects.length}
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={60}>
        <ProjectsToolbar
          onCreate={() => setShowCreate(true)}
          searchValue={search}
          onSearch={setSearch}
        />
      </FadeIn>

      {error && (
        <FadeIn delay={90}>
          <ErrorState onRetry={() => refetch()} />
        </FadeIn>
      )}

      <FadeIn delay={120}>
        {rawProjects.length > 0 && filtered.length === 0 ? (
          <EmptySearchState />
        ) : (
          <ProjectsGrid
            projects={filtered}
            onProjectClick={(id) =>
              router.push(`/console/projects/${id}`)
            }
            onProjectDelete={async (id) => {
              if (!window.confirm("Delete this project?")) return;
              await doDelete(id);
            }}
          />
        )}
      </FadeIn>

      <CreateProjectModal
        open={showCreate}
        loading={creating}
        onClose={() => setShowCreate(false)}
        onCreate={async ({ name, description }) => {
          await doCreate({
            title: name,
            description,
            status: "active",
          });
        }}
      />
    </div>
  );
}