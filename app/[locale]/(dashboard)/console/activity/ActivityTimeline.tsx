"use client";

import React from "react";

import {
    Sparkles,
    ImageIcon,
    MessageSquare,
    Cpu,
} from "lucide-react";

import type {
    ConsoleActivityEvent,
} from "../../../../lib/api/console/activity";

type Props = {
    events: ConsoleActivityEvent[];
};

function resolveIcon(type: string) {

    switch (type) {

        case "image_generation":
            return ImageIcon;

        case "api_request":
            return Cpu;

        case "chat":
        default:
            return MessageSquare;
    }
}

function resolveColor(type: string) {

    switch (type) {

        case "image_generation":
            return "bg-orange-300/[0.12]";

        case "api_request":
            return "bg-violet-300/[0.12]";

        case "chat":
        default:
            return "bg-amber-300/[0.10]";
    }
}

export default function ActivityTimeline({
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
                        Timeline
                    </h2>

                    <p
                        className="
                            mt-0.5
                            text-xs
                            text-white/45
                        "
                    >
                        Recent AI workspace events.
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
                            No activity yet
                        </p>

                    </div>
                )
            }

            {/* TIMELINE */}

            <ol
                className="
                    relative
                    ml-2

                    space-y-4

                    border-l
                    border-white/[0.06]
                "
            >

                {
                    events.map((item) => {

                        const Icon =
                            resolveIcon(item.type);

                        const colorClass =
                            resolveColor(item.type);

                        return (
                            <li
                                key={item.id}
                                className="
                                    relative
                                    ml-6
                                "
                            >

                                {/* ICON */}

                                <span
                                    className={`
                                        absolute
                                        -left-8
                                        top-0

                                        flex
                                        h-7
                                        w-7
                                        items-center
                                        justify-center

                                        rounded-lg

                                        border
                                        border-white/[0.05]

                                        shadow-[0_6px_14px_rgba(0,0,0,0.14)]

                                        backdrop-blur-md

                                        ${colorClass}
                                    `}
                                >

                                    <Icon
                                        className="
                                            h-4
                                            w-4
                                            text-amber-200
                                        "
                                    />

                                </span>

                                {/* CARD */}

                                <div
                                    className="
                                        group
                                        relative
                                        overflow-hidden

                                        rounded-xl

                                        border
                                        border-white/[0.05]

                                        bg-white/[0.02]

                                        px-3
                                        py-2.5

                                        transition-all
                                        duration-200

                                        hover:border-amber-300/10
                                        hover:bg-white/[0.03]
                                    "
                                >

                                    <div
                                        className="
                                            pointer-events-none
                                            absolute
                                            inset-0
                                            opacity-0
                                            transition-opacity
                                            duration-200
                                            group-hover:opacity-100
                                            bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.05),transparent_60%)]
                                        "
                                    />

                                    <div
                                        className="
                                            relative
                                            flex
                                            items-start
                                            justify-between

                                            gap-3
                                        "
                                    >

                                        <div>

                                            <div
                                                className="
                                                    text-[13px]
                                                    font-semibold
                                                    text-white
                                                "
                                            >
                                                {item.title}
                                            </div>

                                            <div
                                                className="
                                                    mt-0.5
                                                    text-xs
                                                    text-white/45
                                                "
                                            >
                                                {item.subtitle}
                                            </div>

                                        </div>

                                        <div
                                            className="
                                                shrink-0
                                                text-xs
                                                text-amber-100/40
                                            "
                                        >
                                            {
                                                new Date(
                                                    item.created_at
                                                ).toLocaleDateString(
                                                    undefined,
                                                    {
                                                        month: "short",
                                                        day: "numeric",
                                                    }
                                                )
                                            }
                                        </div>

                                    </div>

                                </div>

                            </li>
                        );
                    })
                }

            </ol>

        </section>
    );
}