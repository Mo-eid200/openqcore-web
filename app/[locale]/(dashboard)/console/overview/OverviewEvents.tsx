"use client";

import React from "react";

import type {
    EventItem,
} from "./types";

import {
    MessageCircle,
    Sparkles,
    Image as ImageIcon,
    Cpu,
    Activity,
    ArrowUpRight,
} from "lucide-react";

type Props = {
    events?: EventItem[];
};

// =====================================================
// EMPTY STATE
// =====================================================

const defaultEvents: EventItem[] = [
    {
        id: "1",
        type: "chat",
        title: "Started AI conversation",
        subtitle: "GPT-4o realtime session",
        date: new Date().toISOString(),
    },

    {
        id: "2",
        type: "generation",
        title: "Generated AI content",
        subtitle: "Image generation completed",
        date: new Date().toISOString(),
    },

    {
        id: "3",
        type: "api",
        title: "API activity detected",
        subtitle: "Realtime infrastructure active",
        date: new Date().toISOString(),
    },
];

// =====================================================
// DATE FORMAT
// =====================================================

function formatDate(
    dateString: string
) {
    const date =
        new Date(dateString);

    return date.toLocaleString(
        undefined,
        {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }
    );
}

// =====================================================
// ICON RESOLVER
// =====================================================

function resolveIcon(
    type?: string
) {
    switch (type) {
        case "chat":
            return MessageCircle;

        case "generation":
            return ImageIcon;

        case "workflow":
            return Cpu;

        case "api":
            return Activity;

        default:
            return Sparkles;
    }
}

// =====================================================
// COMPONENT
// =====================================================

export default function OverviewEvents({
    events = defaultEvents,
}: Props) {
    const safeEvents =
        events.length
            ? events
            : defaultEvents;

    return (
        <section
            className="
                relative
                overflow-hidden

                rounded-2xl

                border
                border-white/[0.06]

                bg-[#0f1012]/92

                p-3

                backdrop-blur-2xl
            "
        >

            {/* GLOW */}
            <div
                className="
                    pointer-events-none

                    absolute
                    inset-0
                "
            >

                <div
                    className="
                        absolute
                        top-[-70px]
                        right-[-50px]

                        h-[130px]
                        w-[130px]

                        rounded-full

                        bg-amber-300/[0.05]

                        blur-[60px]
                    "
                />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_35%)]" />

            </div>

            {/* HEADER */}
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

                    <p
                        className="
                            text-[11px]
                            font-medium
                            uppercase
                            tracking-[0.18em]

                            text-amber-200/45
                        "
                    >
                        Live Activity
                    </p>

                    <h2
                        className="
                            mt-1.5

                            text-lg
                            font-semibold
                            tracking-tight

                            text-white
                        "
                    >
                        Recent Events
                    </h2>

                </div>

                <div
                    className="
                        flex
                        items-center
                        justify-center

                        h-9
                        w-9

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

            {/* EVENTS */}
            <div
                className="
                    relative
                    mt-5

                    space-y-3
                "
            >

                {safeEvents.map(
                    (event) => {

                        const Icon =
                            event.icon ||
                            resolveIcon(
                                event.type
                            );

                        return (
                            <div
                                key={event.id}
                                className="
                                    group
                                    relative
                                    overflow-hidden

                                    rounded-2xl

                                    border
                                    border-white/[0.05]

                                    bg-white/[0.02]

                                    p-3

                                    transition-all
                                    duration-300

                                    hover:border-amber-300/10
                                    hover:bg-white/[0.03]
                                "
                            >

                                {/* HOVER GLOW */}
                                <div
                                    className="
                                        pointer-events-none

                                        absolute
                                        inset-0

                                        opacity-0

                                        transition-opacity
                                        duration-300

                                        group-hover:opacity-100

                                        bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.05),transparent_60%)]
                                    "
                                />

                                {/* CONTENT */}
                                <div
                                    className="
                                        relative

                                        flex
                                        items-start

                                        gap-3
                                    "
                                >

                                    {/* ICON */}
                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-center

                                            h-10
                                            w-10

                                            shrink-0

                                            rounded-xl

                                            border
                                            border-white/[0.05]

                                            bg-amber-300/[0.08]

                                            text-amber-200
                                        "
                                    >

                                        <Icon
                                            className="
                                                h-4
                                                w-4
                                            "
                                        />

                                    </div>

                                    {/* TEXT */}
                                    <div
                                        className="
                                            min-w-0
                                            flex-1
                                        "
                                    >

                                        <h3
                                            className="
                                                truncate

                                                text-sm
                                                font-semibold

                                                text-white
                                            "
                                        >
                                            {event.title}
                                        </h3>

                                        {event.subtitle && (
                                            <p
                                                className="
                                                    mt-1

                                                    line-clamp-2

                                                    text-xs
                                                    leading-5

                                                    text-white/45
                                                "
                                            >
                                                {event.subtitle}
                                            </p>
                                        )}

                                    </div>

                                </div>

                                {/* FOOTER */}
                                <div
                                    className="
                                        relative
                                        mt-3

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

                                            text-amber-100/40
                                        "
                                    >
                                        {formatDate(
                                            event.date
                                        )}
                                    </span>

                                </div>

                            </div>
                        );
                    }
                )}

            </div>

        </section>
    );
}