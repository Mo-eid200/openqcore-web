"use client";
import React, { useState } from "react";
import { AgentsToolbar } from "./AgentsToolbar";
import { AgentsGrid } from "./AgentsGrid";
import { CreateAgentModal } from "./CreateAgentModal";

type AgentStatus = "running" | "paused" | "failed" | "deploying" | "offline";
type Agent = {
    name: string;
    model: string;
    status: AgentStatus;
    latency: string;
    requests: number;
    region: string;
};

const DUMMY_AGENTS: Agent[] = [
    {
        name: "Summarizer-AI-01",
        model: "gpt-4-32k",
        status: "running",
        latency: "312ms",
        requests: 17324,
        region: "us-east-1",
    },
    {
        name: "ChatAgent-Marketing",
        model: "claude-3-opus",
        status: "paused",
        latency: "768ms",
        requests: 9382,
        region: "eu-west-2",
    },
    {
        name: "Realtime-Call-Bot",
        model: "mixtral-8x22b",
        status: "failed",
        latency: "—",
        requests: 0,
        region: "us-central-2",
    },
];


export default function AgentsPage() {
    const [agents, setAgents] = useState<Agent[]>(DUMMY_AGENTS);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);

    const visibleAgents = agents.filter(a =>
        !search ? true :
            a.name.toLowerCase().includes(search.toLowerCase())
            || a.model.toLowerCase().includes(search.toLowerCase())
    );

    const addAgent = (agent: { name: string; model: string; region: string }) => {
        setAgents([
            ...agents,
            { ...agent, latency: "—", requests: 0, status: "deploying" as AgentStatus }
        ]);
    };

    return (
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-10">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white mb-1">Agents</h1>
                <p className="text-slate-400 mb-4">Manage, deploy, and monitor AI & Intelligent Agents.</p>
            </div>

            <AgentsToolbar
                search={search}
                onSearch={setSearch}
                onCreate={() => setShowModal(true)}
            />

            <AgentsGrid
                agents={visibleAgents}
                onAgentMenu={/* attach your menu */ undefined}
            />

            <CreateAgentModal
                open={showModal}
                onClose={() => setShowModal(false)}
                onCreate={addAgent}
            />
        </div>
    );
}