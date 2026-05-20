import React from "react";
import { AgentCard } from "./AgentCard";
import { AgentEmptyState } from "./AgentEmptyState";

type Agent = {
    name: string;
    model: string;
    status: "running" | "paused" | "failed" | "deploying" | "offline";
    latency: string;
    requests: number;
    region: string;
};

export function AgentsGrid({
    agents,
    onAgentMenu,
}: {
    agents: Agent[];
    onAgentMenu?: (agent: Agent) => void;
}) {
    if (!agents.length) return <AgentEmptyState />;

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {agents.map((a) => (
                <AgentCard key={a.name} agent={a} onMenu={() => onAgentMenu?.(a)} />
            ))}
        </section>
    );
}