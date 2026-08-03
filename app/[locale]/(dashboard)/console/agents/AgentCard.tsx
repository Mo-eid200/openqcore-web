"use client";

import React, { useState } from "react";

import {
    Bot,
    BrainCircuit,
    CalendarClock,
    ChevronRight,
    Cpu,
    Database,
    FolderKanban,
    MessageSquare,
    Pencil,
    Sparkles,
    Trash2,
    Zap,
} from "lucide-react";

import AgentStatusBadge from "./AgentStatusBadge";
import { LinkKnowledgeModal } from "../components/shared/LinkKnowledgeModal";

import type {
    Agent,
} from "./types";

// =========================================================
// ICON RESOLVER
// =========================================================

function resolveIcon(
    icon?: string,
) {
    switch (icon) {
        case "sparkles":
            return Sparkles;

        case "folder-kanban":
            return FolderKanban;

        case "brain":
            return BrainCircuit;

        case "bot":
            return Bot;

        case "cpu":
        default:
            return Cpu;
    }
}

// =========================================================
// HELPERS
// =========================================================

function formatDate(
    value?: string | null,
) {
    if (!value) {
        return "Recently";
    }

    try {
        return new Date(
            value
        ).toLocaleDateString(
            undefined,
            {
                month: "short",
                day: "numeric",
                year: "numeric",
            },
        );
    } catch {
        return "Recently";
    }
}

// =========================================================
// TYPES
// =========================================================

type Props = {
    agent: Agent;
    deleting?: boolean;
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

export default function AgentCard({
    agent,
    onEdit,
    onDelete,
    onChat,
}: Props) {
    const Icon =
        resolveIcon(
            agent.icon
        );

    const [showLinker, setShowLinker] = useState(false);

    const chatBase =
        process.env.NEXT_PUBLIC_CHAT_URL || "http://localhost:3000";

    return (
        <div
            className="
                group
                relative
                overflow-hidden

                rounded-3xl

                border
                border-white/[0.06]

                bg-[#0f1012]/92

                p-5

                backdrop-blur-2xl

                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-amber-300/12
                hover:bg-[#111214]/96
                hover:shadow-[0_18px_50px_rgba(0,0,0,0.26)]
            "
        >

            {/* ATMOSPHERE */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute right-[-40px] top-[-50px] h-[140px] w-[140px] rounded-full bg-amber-300/[0.05] blur-[70px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.025),transparent_35%)]" />
            </div>

            {/* TOP LINE */}
            <div
                className="
                    absolute
                    inset-x-0
                    top-0

                    h-px

                    bg-gradient-to-r
                    from-transparent
                    via-amber-200/20
                    to-transparent
                "
            />

            {/* ACTIONS */}

            <div
                className="
                    absolute
                    right-4
                    top-4
                    z-20

                    flex
                    items-center
                    gap-2

                    opacity-0

                    transition-all
                    duration-200

                    group-hover:opacity-100
                "
            >

                {/* CHAT */}

                <button
                    type="button"
                    onClick={() => {
                        if (onChat) {
                            onChat(agent);
                            return;
                        }

                        window.open(
                            `${chatBase}/qxt-chat/agent/${agent.slug}`,
                            "_blank"
                        );
                    }}
                    className="
                        flex
                        h-9
                        w-9

                        items-center
                        justify-center

                        rounded-xl

                        border
                        border-white/[0.08]

                        bg-white/[0.03]

                        text-white/60

                        transition-all

                        hover:border-amber-300/12
                        hover:bg-amber-300/[0.08]
                        hover:text-amber-200
                    "
                >

                    <MessageSquare
                        className="
                            h-4
                            w-4
                        "
                    />

                </button>

                {/* EDIT */}

                <button
                    type="button"
                    onClick={() =>
                        onEdit?.(agent)
                    }
                    className="
                        flex
                        h-9
                        w-9

                        items-center
                        justify-center

                        rounded-xl

                        border
                        border-white/[0.08]

                        bg-white/[0.03]

                        text-white/60

                        transition-all

                        hover:border-blue-300/12
                        hover:bg-blue-300/[0.08]
                        hover:text-blue-200
                    "
                >

                    <Pencil
                        className="
                            h-4
                            w-4
                        "
                    />

                </button>

                {/* LINK KNOWLEDGE */}

                <button
                    type="button"
                    onClick={() => setShowLinker(true)}
                    className="
                        flex
                        h-9
                        w-9

                        items-center
                        justify-center

                        rounded-xl

                        border
                        border-white/[0.08]

                        bg-white/[0.03]

                        text-white/60

                        transition-all

                        hover:border-amber-300/12
                        hover:bg-amber-300/[0.08]
                        hover:text-amber-200
                    "
                >

                    <Database
                        className="
                            h-4
                            w-4
                        "
                    />

                </button>

                {/* DELETE */}

                <button
                    type="button"
                    onClick={() =>
                        onDelete?.(agent)
                    }
                    className="
                        flex
                        h-9
                        w-9

                        items-center
                        justify-center

                        rounded-xl

                        border
                        border-red-400/10

                        bg-red-400/[0.05]

                        text-red-300/70

                        transition-all

                        hover:border-red-300/14
                        hover:bg-red-400/[0.08]
                        hover:text-red-200
                    "
                >

                    <Trash2
                        className="
                            h-4
                            w-4
                        "
                    />

                </button>

            </div>

            {/* HEADER */}

            <div
                className="
                    relative
                    flex
                    items-start
                    gap-4
                "
            >

                {/* ICON */}

                <div
                    className="
                        relative

                        flex
                        h-14
                        w-14

                        shrink-0

                        items-center
                        justify-center

                        rounded-2xl

                        border
                        border-white/[0.05]

                        bg-amber-300/[0.08]

                        text-amber-200

                        shadow-[0_10px_24px_rgba(0,0,0,0.18)]
                    "
                >

                    <div
                        className="
                            absolute
                            inset-0

                            rounded-2xl

                            bg-gradient-to-br
                            from-white/[0.03]
                            to-transparent
                        "
                    />

                    <Icon
                        className="
                            relative

                            h-6
                            w-6
                        "
                    />

                </div>

                {/* INFO */}

                <div
                    className="
                        min-w-0
                        flex-1

                        pr-24
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >

                        <h3
                            className="
                                truncate

                                text-lg
                                font-bold

                                tracking-tight

                                text-white
                            "
                        >
                            {agent.name}
                        </h3>

                        {
                            agent.visibility === "public" && (
                                <div
                                    className="
                                        rounded-full

                                        border
                                        border-emerald-300/10

                                        bg-emerald-300/[0.08]

                                        px-2
                                        py-0.5

                                        text-[10px]
                                        font-semibold

                                        uppercase
                                        tracking-wide

                                        text-emerald-200
                                    "
                                >
                                    Public
                                </div>
                            )
                        }

                    </div>

                    <div
                        className="
                            mt-1

                            flex
                            items-center
                            gap-2

                            text-xs

                            text-white/45
                        "
                    >

                        <Zap
                            className="
                                h-3.5
                                w-3.5
                                text-amber-200/80
                            "
                        />

                        <span
                            className="
                                truncate
                            "
                        >
                            {agent.role}
                        </span>

                    </div>

                </div>

            </div>

            {/* DESCRIPTION */}

            <div
                className="
                    mt-5

                    min-h-[72px]

                    text-sm
                    leading-7

                    text-white/58
                "
            >
                {
                    agent.description ||
                    "No description provided for this AI agent."
                }
            </div>

            {/* TAGS */}

            {
                agent.tags?.length > 0 && (
                    <div
                        className="
                            mt-5

                            flex
                            flex-wrap

                            gap-2
                        "
                    >
                        {
                            agent.tags
                                .slice(0, 5)
                                .map((tag) => (
                                    <span
                                        key={tag}
                                        className="
                                            rounded-full

                                            border
                                            border-white/[0.05]

                                            bg-white/[0.03]

                                            px-3
                                            py-1

                                            text-[11px]
                                            font-medium

                                            text-amber-200/90
                                        "
                                    >
                                        #{tag}
                                    </span>
                                ))
                        }
                    </div>
                )
            }

            {/* METRICS */}

            <div
                className="
                    mt-5

                    grid
                    grid-cols-2

                    gap-3
                "
            >

                {/* RUNS */}

                <div
                    className="
                        rounded-2xl

                        border
                        border-white/[0.05]

                        bg-white/[0.02]

                        p-3
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
                        Runs
                    </div>

                    <div
                        className="
                            mt-1

                            text-sm
                            font-semibold

                            text-white
                        "
                    >
                        {
                            (
                                agent.runs || 0
                            ).toLocaleString()
                        }
                    </div>

                </div>

                {/* TOKENS */}

                <div
                    className="
                        rounded-2xl

                        border
                        border-white/[0.05]

                        bg-white/[0.02]

                        p-3
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
                        Tokens
                    </div>

                    <div
                        className="
                            mt-1

                            text-sm
                            font-semibold

                            text-white
                        "
                    >
                        {
                            (
                                agent.tokens || 0
                            ).toLocaleString()
                        }
                    </div>

                </div>

            </div>

            {/* FOOTER */}

            <div
                className="
                    mt-5

                    flex
                    items-center

                    gap-3
                "
            >

                {/* STATUS */}

                <AgentStatusBadge
                    status={agent.status}
                />

                {/* MODEL */}

                {
                    agent.model && (
                        <div
                            className="
                                rounded-full

                                border
                                border-white/[0.05]

                                bg-white/[0.03]

                                px-2.5
                                py-1

                                text-[10px]
                                font-medium

                                text-white/45
                            "
                        >
                            {agent.model}
                        </div>
                    )
                }

                {/* DATE */}

                <div
                    className="
                        ml-auto

                        inline-flex
                        items-center

                        gap-1.5

                        text-[11px]

                        text-white/35
                    "
                >

                    <CalendarClock
                        className="
                            h-3.5
                            w-3.5
                        "
                    />

                    {
                        formatDate(
                            agent.updatedAt ||
                            agent.createdAt
                        )
                    }

                </div>

            </div>

            {/* BOTTOM ACTION */}

            <button
                type="button"
                onClick={() => {
                    if (onChat) {
                        onChat(agent);
                        return;
                    }

                    window.open(
                        `${chatBase}/qxt-chat/agent/${agent.slug}`,
                        "_blank"
                    );
                }}
                className="
                    mt-5

                    inline-flex
                    h-11
                    w-full

                    items-center
                    justify-center

                    gap-2

                    rounded-2xl

                    border
                    border-white/[0.08]

                    bg-white/[0.03]

                    text-sm
                    font-semibold

                    text-white/80

                    transition-all

                    hover:border-amber-300/12
                    hover:bg-amber-300/[0.08]
                    hover:text-amber-200
                "
            >

                <MessageSquare
                    className="
                        h-4
                        w-4
                    "
                />

                Open Agent Chat

                <ChevronRight
                    className="
                        h-4
                        w-4
                    "
                />

            </button>

            <LinkKnowledgeModal
                open={showLinker}
                mode="agent"
                entityId={agent.id}
                entityName={agent.name}
                onClose={() => setShowLinker(false)}
            />

        </div>
    );
}