import React from "react";
import { FolderOpen } from "lucide-react";
import { ProjectCard } from "./ProjectCard";

type Project = {
  id:           string;
  name:         string;
  status:       "active" | "paused" | "archived";
  description?: string;
  createdAt?:   string;
};

export function ProjectsGrid({
  projects,
  onProjectClick,
  onProjectDelete,
}: {
  projects:         Project[];
  onProjectClick?:  (id: string) => void;
  onProjectDelete?: (id: string) => void;
}) {
  if (!projects.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02]">
          <FolderOpen className="w-8 h-8 text-white/20" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-white/40">No projects yet</p>
          <p className="text-xs text-white/20 mt-1">Create your first project to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
            onDelete={onProjectDelete ? () => onProjectDelete(p.id) : undefined}
          />
        </div>
      ))}
    </div>
  );
}