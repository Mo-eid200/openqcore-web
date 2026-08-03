import React from "react";
import { FolderOpen } from "lucide-react";
import { ProjectCard } from "./ProjectCard";

type Project = {
  id: string;
  name: string;
  status: "active" | "paused" | "archived";
  description?: string;
  createdAt?: string;
};

export function ProjectsGrid({
  projects,
  onProjectClick,
  onProjectDelete,
}: {
  projects: Project[];
  onProjectClick?: (id: string) => void;
  onProjectDelete?: (id: string) => void;
}) {
  if (!projects.length) {
    return (
      <section
        className="
          relative overflow-hidden rounded-3xl
          border border-white/[0.06]
          bg-[#0f1012]/92
          shadow-[0_18px_50px_rgba(0,0,0,0.22)]
          backdrop-blur-2xl
        "
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-60px] top-[-60px] h-[180px] w-[180px] rounded-full bg-amber-300/[0.06] blur-[80px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.025),transparent_38%)]" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center gap-4 px-6 py-24 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.05] bg-amber-300/[0.08]">
            <FolderOpen className="h-8 w-8 text-amber-300/70" />
          </div>

          <div>
            <p className="text-sm font-medium text-white/55">
              No projects yet
            </p>
            <p className="mt-1 text-xs text-white/28">
              Create your first project to get started
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3">
      {projects.map((p, i) => (
        <div
          key={p.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <ProjectCard
            name={p.name}
            status={p.status}
            description={p.description}
            createdAt={p.createdAt}
            onClick={() => onProjectClick?.(p.id)}
            onDelete={
              onProjectDelete
                ? () => onProjectDelete(p.id)
                : undefined
            }
          />
        </div>
      ))}
    </section>
  );
}