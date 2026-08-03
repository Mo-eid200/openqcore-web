"use client";

import React from "react";

import {
    Activity,
    Cpu,
    Image as ImageIcon,
    MessageSquare,
    ArrowUpRight,
} from "lucide-react";

import type {
    ConsoleOverviewStats,
} from "@/app/lib/api/console/overview";

import type {
    StatMetric,
} from "./types";

type Props = {
    stats?: ConsoleOverviewStats;
};

// =====================================================
// BUILD STATS
// =====================================================

function buildStats(
    stats?: ConsoleOverviewStats
): StatMetric[] {

    return [
        {
            label: "API Requests",

            value: (
                stats?.requests_total ?? 0
            ).toLocaleString(),

            icon: Activity,

            glow:
                "from-amber-300/12 via-amber-200/6 to-transparent",

            iconClass:
                "bg-amber-300/10 text-amber-200",
        },

        {
            label: "Tokens Processed",

            value: (
                stats?.tokens_total ?? 0
            ).toLocaleString(),

            icon: Cpu,

            glow:
                "from-orange-300/12 via-orange-200/6 to-transparent",

            iconClass:
                "bg-orange-300/10 text-orange-200",
        },

        {
            label: "Chat Sessions",

            value: (
                stats?.chat_sessions ?? 0
            ).toLocaleString(),

            icon: MessageSquare,

            glow:
                "from-yellow-300/12 via-yellow-200/6 to-transparent",

            iconClass:
                "bg-yellow-300/10 text-yellow-200",
        },

        {
            label: "Image Generations",

            value: (
                stats?.image_generations ?? 0
            ).toLocaleString(),

            icon: ImageIcon,

            glow:
                "from-amber-200/12 via-amber-100/6 to-transparent",

            iconClass:
                "bg-amber-200/10 text-amber-100",
        },
    ];
}

// =====================================================
// COMPONENT
// =====================================================

export default function OverviewStats({
    stats,
}: Props) {

    const items =
        buildStats(stats);

    return (
        <section
            className="
                grid
                grid-cols-1

                gap-4

                sm:grid-cols-2
                xl:grid-cols-4
            "
        >

            {items.map((stat) => {

                const Icon =
                    stat.icon;

                return (
                    <div
                        key={stat.label}
                        className="
                            group
                            relative
                            overflow-hidden

                            rounded-2xl

                            border
                            border-white/[0.06]

                            bg-[#0f1012]/92

                            p-4

                            backdrop-blur-2xl

                            transition-all
                            duration-300

                            hover:-translate-y-1
                            hover:border-amber-300/12
                            hover:bg-[#111214]/96
                            hover:shadow-[0_12px_40px_rgba(0,0,0,0.24)]
                        "
                    >

                        {/* GLOW */}
                        <div
                            className={`
                                pointer-events-none

                                absolute
                                inset-0

                                opacity-0

                                transition-opacity
                                duration-300

                                group-hover:opacity-100

                                bg-gradient-to-br
                                ${stat.glow}
                            `}
                            style={{
                                mixBlendMode: "screen",
                            }}
                        />

                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_35%)]" />

                        {/* HEADER */}
                        <div
                            className="
                                relative

                                flex
                                items-start
                                justify-between
                            "
                        >

                            {/* ICON */}
                            <div
                                className={`
                                    flex
                                    items-center
                                    justify-center

                                    h-11
                                    w-11

                                    rounded-2xl

                                    border
                                    border-white/[0.05]

                                    shadow-[0_8px_20px_rgba(0,0,0,0.18)]

                                    ${stat.iconClass}
                                `}
                            >

                                <Icon
                                    className="
                                        h-5
                                        w-5
                                    "
                                />

                            </div>

                            {/* ACTION */}
                            <div
                                className="
                                    opacity-0

                                    translate-y-1

                                    transition-all
                                    duration-200

                                    group-hover:translate-y-0
                                    group-hover:opacity-100
                                "
                            >

                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-center

                                        h-8
                                        w-8

                                        rounded-xl

                                        border
                                        border-amber-300/10

                                        bg-amber-300/[0.08]

                                        text-amber-200/85
                                    "
                                >

                                    <ArrowUpRight
                                        className="
                                            h-4
                                            w-4
                                        "
                                    />

                                </div>

                            </div>

                        </div>

                        {/* CONTENT */}
                        <div
                            className="
                                relative
                                mt-6
                            "
                        >

                            {/* VALUE */}
                            <div
                                className="
                                    text-3xl
                                    font-semibold
                                    tracking-tight

                                    text-white
                                "
                            >
                                {stat.value}
                            </div>

                            {/* LABEL */}
                            <div
                                className="
                                    mt-2

                                    text-sm

                                    text-white/45
                                "
                            >
                                {stat.label}
                            </div>

                        </div>

                        {/* FOOTER */}
                        <div
                            className="
                                relative
                                mt-5

                                flex
                                items-center
                                justify-between
                            "
                        >

                            <div
                                className="
                                    h-px
                                    flex-1

                                    bg-gradient-to-r
                                    from-amber-300/12
                                    to-transparent
                                "
                            />

                            <span
                                className="
                                    pl-3

                                    text-[10px]
                                    font-medium
                                    uppercase
                                    tracking-[0.18em]

                                    text-amber-200/45
                                "
                            >
                                Console
                            </span>

                        </div>

                    </div>
                );
            })}

        </section>
    );
}