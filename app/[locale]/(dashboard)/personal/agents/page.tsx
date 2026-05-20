"use client";

import React, { useState } from "react";
import { Cpu, FolderKanban, Sparkles } from "lucide-react";
import AgentsToolbar from "./AgentsToolbar";
import AgentsGrid from "./AgentsGrid";
import CreateAgentModal from "./CreateAgentModal";
import AgentEmptyState from "./AgentEmptyState";
import type { Agent } from "./types";

const DUMMY_AGENTS: Agent[] = [
    {
        id: "1",
        name: "Copilot",
        role: "Python Developer",
        description: "Expert in code generation, analysis, and bug fixing.",
        icon: Cpu,
        status: "online",
        tags: ["Python", "LLM"],
        createdAt: new Date(Date.now() - 3700000).toISOString(),
    },
    {
        id: "2",
        name: "Prompt Guru",
        role: "Prompt Optimizer",
        description: "Crafts effective and safe prompts for best AI results.",
        icon: Sparkles,
        status: "pending",
        tags: ["Prompts", "Lab"],
        createdAt: new Date(Date.now() - 30500000).toISOString(),
    },
    {
        id: "3",
        name: "Projector",
        role: "Kanban Assistant",
        description: "Turn your task flow into structured workflows.",
        icon: FolderKanban,
        status: "offline",
        tags: ["Kanban", "Tasks"],
        createdAt: new Date(Date.now() - 16400000).toISOString(),
    },
];

export default function AgentsPage() {
    const [agents, setAgents] = useState<Agent[]>(DUMMY_AGENTS);
    const [showCreate, setShowCreate] = useState(false);

    return (
        <div className="relative w-full max-w-5xl mx-auto min-h-screen px-2 sm:px-6 xl:px-10 py-10 flex flex-col gap-7">
            <AgentsToolbar onNew={() => setShowCreate(true)} />
            {agents.length === 0 ? (
                <AgentEmptyState onNew={() => setShowCreate(true)} />
            ) : (
                <AgentsGrid agents={agents} />
            )}
            <CreateAgentModal
                open={showCreate}
                onClose={() => setShowCreate(false)}
                onCreate={data => { setAgents([...agents, { ...data, id: Math.random().toString() }]); setShowCreate(false); }}
            />
        </div>
    );
}