"use client";

import React from "react";

import {
    Sparkles,
    Activity,
    AlertTriangle,
} from "lucide-react";

import type {
    ConsoleActivitySummary,
} from "../../../../lib/api/console/activity";

type Props = {
    summary?: ConsoleActivitySummary;
};

export default function RealtimeStatus({
    summary,
}: Props) {

    const running =
        summary?.running ?? 0;

    const requests =
        summary?.total_events ?? 0;

    const models =
        summary?.chat_events ?? 0;

    const active =
        running === 0;

    const statusText = active
        ? "Active"
        : "Busy";

    const description = active
        ? "All AI Systems Operational"
        : "AI workloads processing";

    return (
        <div
            className="
                relative
                mt-5
                flex
                items-center
                gap-3

                rounded-2xl

                border
                border-white/[0.06]

                bg-[#0f1012]/92

                px-4
                py-3

                text-white

                shadow-[0_8px_24px_rgba(0,0,0,0.14)]
                backdrop-blur-xl

                lg:mt-7
            "
        >

            {/* SOFT ATMOSPHERE */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute right-[-30px] top-[-40px] h-[90px] w-[90px] rounded-full bg-amber-300/[0.04] blur-[50px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.025),transparent_35%)]" />
            </div>

            {/* ICON */}

            <span
                className="
                    relative
                    flex
                    items-center
                    justify-center

                    rounded-xl
                    border
                    border-white/[0.05]

                    bg-amber-300/[0.08]
                    p-2
                "
            >
                {
                    active
                        ? (
                            <Sparkles
                                className="
                                    h-4
                                    w-4
                                    text-amber-200
                                "
                            />
                        )
                        : (
                            <AlertTriangle
                                className="
                                    h-4
                                    w-4
                                    text-red-300
                                "
                            />
                        )
                }
            </span>

            {/* STATUS */}

            <div
                className="
                    relative
                    flex
                    min-w-0
                    flex-col
                "
            >

                <div
                    className="
                        flex
                        items-center
                        gap-2
                    "
                >

                    <span
                        className="
                            text-sm
                            text-white/65
                        "
                    >
                        Realtime Status
                    </span>

                    <span
                        className={`
                            text-sm
                            font-bold

                            ${
                                active
                                    ? "text-amber-200"
                                    : "text-red-300"
                            }
                        `}
                    >
                        {statusText}
                    </span>

                </div>

                <span
                    className="
                        text-xs
                        text-white/45
                    "
                >
                    {description}
                </span>

            </div>

            {/* METRICS */}

            <div
                className="
                    relative
                    ml-auto

                    flex
                    items-center

                    gap-5
                "
            >

                <div
                    className="
                        flex
                        flex-col
                        items-end
                    "
                >
                    <span
                        className="
                            text-[11px]
                            text-white/45
                        "
                    >
                        Events
                    </span>

                    <span
                        className="
                            text-sm
                            font-semibold
                            text-white
                        "
                    >
                        {requests}
                    </span>
                </div>

                <div
                    className="
                        flex
                        flex-col
                        items-end
                    "
                >
                    <span
                        className="
                            text-[11px]
                            text-white/45
                        "
                    >
                        Chats
                    </span>

                    <span
                        className="
                            flex
                            items-center
                            gap-1

                            text-sm
                            font-semibold
                            text-white
                        "
                    >
                        <Activity
                            className="
                                h-3
                                w-3
                                text-emerald-300
                            "
                        />

                        {models}
                    </span>
                </div>

            </div>
        </div>
    );
}