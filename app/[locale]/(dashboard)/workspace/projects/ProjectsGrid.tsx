import React from "react";
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
}: {
    projects: Project[];
    onProjectClick?: (id: string) => void;
}) {
    if (!projects.length)
        return (
            <div className="py-24 text-center text-slate-400 text-lg">
                No projects found.
            </div>
        );
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
                <ProjectCard
                    key={p.id}
                    name={p.name}
                    status={p.status}
                    description={p.description}
                    createdAt={p.createdAt}
                    onClick={() => onProjectClick?.(p.id)}
                />
            ))}
        </div>
    );
}