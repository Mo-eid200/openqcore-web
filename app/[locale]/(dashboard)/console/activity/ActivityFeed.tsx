"use client";

import React from "react";

import {
    Cpu,
    Sparkles,
    MessageCircle,
    ArrowUpRight,
    ImageIcon,
} from "lucide-react";

import ActivityCard from "./ActivityCard";

import type {
    ConsoleActivityEvent,
    ConsoleActivitySummary,
} from "../../../../lib/api/console/activity";

type Props = {
    events: ConsoleActivityEvent[];
};

function resolveIcon(type: string) {

    switch (type) {

        case "generation":
            return ImageIcon;

        case "agent":
            return Cpu;

        case "billing":
            return ArrowUpRight;

        case "project":
            return Sparkles;

        case "chat":
        default:
            return MessageCircle;
    }
}

function resolveColor(type: string) {

    switch (type) {

        case "generation":
            return "bg-orange-300/[0.12]";

        case "agent":
            return "bg-violet-300/[0.12]";

        case "billing":
            return "bg-emerald-300/[0.12]";

        case "project":
            return "bg-yellow-300/[0.12]";

        case "chat":
        default:
            return "bg-amber-300/[0.10]";
    }
}

export default function ActivityFeed({
    events,
}: Props) {

    return (
        <section
            className="
                relative
                overflow-hidden

                rounded-2xl

                border
                border-white/[0.06]

                bg-[#0f1012]/92
                backdrop-blur-xl

                shadow-[0_8px_24px_rgba(0,0,0,0.16)]

                p-3
            "
        >

            {/* SOFT ATMOSPHERE */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-[-60px] right-[-40px] h-[120px] w-[120px] rounded-full bg-amber-300/[0.04] blur-[60px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.025),transparent_35%)]" />
            </div>

            {/* HEADER */}

            <div
                className="
                    relative
                    mb-3

                    flex
                    items-center
                    justify-between
                "
            >

                <div>

                    <h2
                        className="
                            text-base
                            font-semibold
                            tracking-tight
                            text-white
                        "
                    >
                        Feed
                    </h2>

                    <p
                        className="
                            mt-0.5
                            text-xs
                            text-white/45
                        "
                    >
                        Live AI workspace activity stream.
                    </p>

                </div>

                <div
                    className="
                        flex
                        h-7
                        items-center

                        rounded-lg

                        border
                        border-amber-300/10

                        bg-amber-300/[0.08]

                        px-2

                        text-[11px]
                        font-medium
                        text-amber-200/85
                    "
                >
                    Live
                </div>

            </div>

            {/* EMPTY */}

            {
                events.length === 0 && (
                    <div
                        className="
                            relative
                            py-10

                            flex
                            flex-col
                            items-center
                            justify-center

                            text-center
                        "
                    >

                        <Sparkles
                            className="
                                mb-3
                                h-8
                                w-8
                                text-amber-300/45
                            "
                        />

                        <p
                            className="
                                text-sm
                                text-white/70
                            "
                        >
                            No recent activity
                        </p>

                    </div>
                )
            }

            {/* FEED */}

            <div
                className="
                    relative

                    flex
                    flex-col
                    gap-2
                "
            >

                {
                    events.map((item) => {

                        const Icon =
                            resolveIcon(item.type);

                        const colorClass =
                            resolveColor(item.type);

                        return (
                            <ActivityCard
                                key={item.id}
                                item={{
                                    ...item,
                                    icon: Icon,
                                    colorClass,
                                    timestamp: item.created_at,
                                }}
                            />
                        );
                    })
                }

            </div>

        </section>
    );
}