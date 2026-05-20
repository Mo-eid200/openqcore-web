"use client";

import { useState } from "react";

import { PageHeader } from "../../components/ui/PageHeader";

import { ProjectsToolbar } from "./ProjectsToolbar";
import { ProjectsGrid } from "./ProjectsGrid";
import { CreateProjectModal } from "./CreateProjectModal";

const mockProjects = [
    {
        id: "1",
        name: "Voice Infrastructure",
        status: "active" as const,
        description: "Realtime AI voice routing platform.",
        createdAt: "2 hours ago",
    },

    {
        id: "2",
        name: "OpenQCore API",
        status: "paused" as const,
        description: "Core infrastructure services.",
        createdAt: "Yesterday",
    },
];

export default function ProjectsPage() {
    const [searchValue, setSearchValue] = useState("");

    return (
        <div className="space-y-6">

            <PageHeader
                title="Projects"
                description="Manage infrastructure projects and deployments."
            />

            <ProjectsToolbar
                onCreate={() => { }}
                searchValue={searchValue}
                onSearch={setSearchValue}
            />

            <ProjectsGrid
                projects={mockProjects}
            />

            <CreateProjectModal
                open={false}
                onClose={() => { }}
                onCreate={() => { }}
            />

        </div>
    );
}