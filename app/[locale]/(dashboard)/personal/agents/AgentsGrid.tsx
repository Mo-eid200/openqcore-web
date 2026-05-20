"use client";

import React from "react";
import AgentCard from "./AgentCard";
import type { Agent } from "./types";

export default function AgentsGrid({ agents }: { agents: Agent[] }) {
    if (!agents?.length) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
            ))}
        </div>
    );
}