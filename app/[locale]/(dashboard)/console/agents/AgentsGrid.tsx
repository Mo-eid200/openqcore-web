"use client";

import React from "react";
import {
    Activity,
    Sparkles,
} from "lucide-react";

import AgentCard from "./AgentCard";

import type {
    Agent,
} from "./types";

// =========================================================
// TYPES
// =========================================================

type Props = {
    agents: Agent[];
    deletingId?: string | null;
    onEdit?: (
        agent: Agent,
    ) => void;
    onDelete?: (
        agent: Agent,
    ) => void;
    onChat?: (
        agent: Agent,
    ) => void;
    onOpenDetails?: (
        agent: Agent,
    ) => void;
};

// =========================================================
// COMPONENT
// =========================================================

export default function AgentsGrid({
    agents,
    deletingId,
    onEdit,
    onDelete,
    onChat,
    onOpenDetails,
}: Props) {

    // =====================================================
    // EMPTY
    // =====================================================

    if (!agents?.length) {
        return null;
    }

    // =====================================================
    // STATS
    // =====================================================

    const activeAgents =
        agents.filter(
            (agent: Agent) =>
                agent.status === "active"
        ).length;

    const pausedAgents =
        agents.filter(
            (agent: Agent) =>
                agent.status === "paused"
        ).length;

    const totalRuns =
        agents.reduce(
            (
                total: number,
                agent: Agent,
            ) =>
                total +
                (
                    agent.runs || 0
                ),
            0,
        );

    // =====================================================
    // UI
    // =====================================================

    return (
        <section
            className="
                w-full
            "
        >

            {/* HEADER */}

            <div
                className="
                    mb-6

                    flex
                    flex-col
                    gap-4

                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
            >

                {/* LEFT */}

                <div>

                    <div
                        className="
                            mb-2

                            inline-flex
                            items-center

                            gap-1.5

                            rounded-full

                            border
                            border-amber-300/10

                            bg-amber-300/[0.08]

                            px-3
                            py-1

                            text-[11px]
                            font-medium

                            uppercase
                            tracking-[0.18em]

                            text-amber-200/85
                        "
                    >

                        <Sparkles
                            className="
                                h-3
                                w-3
                            "
                        />

                        AI Workforce

                    </div>

                    <h2
                        className="
                            text-2xl
                            font-bold

                            tracking-tight

                            text-white
                        "
                    >
                        Active Agents
                    </h2>

                    <p
                        className="
                            mt-2

                            max-w-2xl

                            text-sm
                            leading-6

                            text-white/45
                        "
                    >
                        Monitor, manage, and interact
                        with your intelligent AI agents
                        across workflows, automation,
                        analytics, and operations.
                    </p>

                </div>

                {/* RIGHT */}

                <div
                    className="
                        flex
                        flex-wrap
                        items-center

                        gap-3
                    "
                >

                    {/* TOTAL */}

                    <div
                        className="
                            rounded-2xl

                            border
                            border-white/[0.06]

                            bg-[#0f1012]/92

                            px-4
                            py-3

                            shadow-[0_8px_24px_rgba(0,0,0,0.14)]
                            backdrop-blur-xl
                        "
                    >

                        <div
                            className="
                                text-[10px]

                                uppercase
                                tracking-wide

                                text-white/35
                            "
                        >
                            Total
                        </div>

                        <div
                            className="
                                mt-1

                                text-lg
                                font-bold

                                text-white
                            "
                        >
                            {agents.length}
                        </div>

                    </div>

                    {/* ACTIVE */}

                    <div
                        className="
                            rounded-2xl

                            border
                            border-emerald-300/10

                            bg-emerald-300/[0.08]

                            px-4
                            py-3

                            backdrop-blur-xl
                        "
                    >

                        <div
                            className="
                                text-[10px]

                                uppercase
                                tracking-wide

                                text-emerald-200/70
                            "
                        >
                            Active
                        </div>

                        <div
                            className="
                                mt-1

                                text-lg
                                font-bold

                                text-emerald-200
                            "
                        >
                            {activeAgents}
                        </div>

                    </div>

                    {/* PAUSED */}

                    <div
                        className="
                            rounded-2xl

                            border
                            border-amber-300/10

                            bg-amber-300/[0.08]

                            px-4
                            py-3

                            backdrop-blur-xl
                        "
                    >

                        <div
                            className="
                                text-[10px]

                                uppercase
                                tracking-wide

                                text-amber-200/70
                            "
                        >
                            Paused
                        </div>

                        <div
                            className="
                                mt-1

                                text-lg
                                font-bold

                                text-amber-200
                            "
                        >
                            {pausedAgents}
                        </div>

                    </div>

                    {/* RUNS */}

                    <div
                        className="
                            rounded-2xl

                            border
                            border-blue-300/10

                            bg-blue-300/[0.08]

                            px-4
                            py-3

                            backdrop-blur-xl
                        "
                    >

                        <div
                            className="
                                inline-flex
                                items-center
                                gap-1.5

                                text-[10px]

                                uppercase
                                tracking-wide

                                text-blue-200/70
                            "
                        >

                            <Activity
                                className="
                                    h-3
                                    w-3
                                "
                            />

                            Runs

                        </div>

                        <div
                            className="
                                mt-1

                                text-lg
                                font-bold

                                text-blue-200
                            "
                        >
                            {totalRuns.toLocaleString()}
                        </div>

                    </div>

                </div>

            </div>

            {/* GRID */}

            <div
                className="
                    grid
                    grid-cols-1
                    gap-6

                    md:grid-cols-2
                    2xl:grid-cols-3
                "
            >

                {
                    agents.map(
                        (agent: Agent) => (
                            <AgentCard
                                key={agent.id}
                                agent={agent}
                                deleting={
                                    deletingId === agent.id
                                }
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onChat={(agent) => {

                                    // =========================================
                                    // EXTERNAL HANDLER
                                    // =========================================

                                    if (onChat) {
                                        onChat(agent);
                                        return;
                                    }

                                    // =========================================
                                    // REDIRECT TO QXT CHAT
                                    // =========================================

                                    const chatBase =
                                        process.env.NEXT_PUBLIC_CHAT_URL ||
                                        "http://localhost:3000";

                                    window.open(
                                        `${chatBase}/qxt-chat/agent/${agent.slug}`,
                                        "_blank"
                                    );
                                }}
                                onOpenDetails={onOpenDetails}
                            />
                        )
                    )
                }

            </div>

        </section>
    );
}