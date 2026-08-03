"use client";

import React from "react";

import {
    Sparkles,
    ArrowUpRight,
    Cpu,
    Activity,
    Image as ImageIcon,
} from "lucide-react";

import type {
    ConsoleOverviewStats,
    ConsoleOverviewUser,
} from "@/app/lib/api/console/overview";

type Props = {
    user?: ConsoleOverviewUser;

    stats?: ConsoleOverviewStats;
};

export default function ConsoleOverviewHero({
    user,
    stats,
}: Props) {

    // =====================================================
    // METRICS
    // =====================================================

    const metrics = [
        {
            label: "API Requests",
            value: (
                stats?.requests_total ?? 0
            ).toLocaleString(),

            icon: Activity,
        },

        {
            label: "Models Used",
            value: String(
                stats?.models_used ?? 0
            ),

            icon: Cpu,
        },

        {
            label: "Image Generations",
            value: String(
                stats?.image_generations ?? 0
            ),

            icon: ImageIcon,
        },
    ];

    // =====================================================
    // RENDER
    // =====================================================

    return (
        <section
            className="
                relative
                overflow-hidden

                rounded-2xl

                border
                border-white/[0.06]

                bg-[#0f1012]/92

                px-5
                py-6

                backdrop-blur-2xl

                lg:px-7
                lg:py-8
            "
        >

            {/* BACKGROUND GLOW */}
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
                        right-[-30px]

                        h-[150px]
                        w-[150px]

                        rounded-full

                        bg-amber-300/[0.06]

                        blur-[70px]
                    "
                />

                <div
                    className="
                        absolute
                        bottom-[-50px]
                        left-[-40px]

                        h-[120px]
                        w-[120px]

                        rounded-full

                        bg-orange-200/[0.04]

                        blur-[60px]
                    "
                />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_35%)]" />

            </div>

            {/* CONTENT */}
            <div
                className="
                    relative

                    flex
                    flex-col

                    gap-6

                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
            >

                {/* LEFT */}
                <div
                    className="
                        max-w-2xl
                    "
                >

                    {/* BADGE */}
                    <div
                        className="
                            inline-flex
                            items-center
                            gap-2

                            rounded-full

                            border
                            border-amber-300/12

                            bg-amber-300/[0.08]

                            px-3
                            py-1.5

                            text-[11px]
                            font-medium

                            text-amber-200
                        "
                    >

                        <Sparkles
                            className="
                                h-3.5
                                w-3.5
                            "
                        />

                        OpenQCore Console

                    </div>

                    {/* TITLE */}
                    <h1
                        className="
                            mt-5

                            text-2xl
                            font-semibold
                            tracking-tight

                            text-white

                            sm:text-3xl
                        "
                    >
                        {user?.full_name
                            ? `Welcome back, ${user.full_name}`
                            : "AI Developer Console"}
                    </h1>

                    {/* DESCRIPTION */}
                    <p
                        className="
                            mt-3

                            max-w-2xl

                            text-sm
                            leading-6

                            text-white/55
                        "
                    >
                        Monitor AI agents, realtime sessions,
                        image generations, model activity,
                        and API infrastructure from one
                        unified developer environment.
                    </p>

                    {/* ACTIONS */}
                    <div
                        className="
                            mt-6

                            flex
                            flex-wrap

                            gap-3
                        "
                    >

                        <button
                            className="
                                inline-flex
                                items-center
                                justify-center

                                h-10

                                rounded-xl

                                bg-amber-300

                                px-5

                                text-sm
                                font-semibold

                                text-black

                                transition-all

                                hover:scale-[1.02]
                                hover:bg-amber-200
                            "
                        >
                            Open Workspace
                        </button>

                        <button
                            className="
                                inline-flex
                                items-center
                                justify-center

                                h-10

                                rounded-xl

                                border
                                border-white/[0.08]

                                bg-white/[0.04]

                                px-5

                                text-sm
                                font-medium

                                text-white/75

                                transition-all

                                hover:bg-white/[0.07]
                                hover:text-white
                            "
                        >
                            View API Usage
                        </button>

                    </div>

                </div>

                {/* RIGHT PANEL */}
                <div
                    className="
                        w-full
                        max-w-[280px]

                        rounded-2xl

                        border
                        border-white/[0.06]

                        bg-white/[0.03]

                        p-4

                        backdrop-blur-xl
                    "
                >

                    {/* HEADER */}
                    <div
                        className="
                            flex
                            items-start
                            justify-between
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-[11px]
                                    uppercase
                                    tracking-[0.2em]

                                    text-amber-200/45
                                "
                            >
                                Console Status
                            </p>

                            <h3
                                className="
                                    mt-1

                                    text-base
                                    font-semibold

                                    text-white
                                "
                            >
                                Infrastructure Active
                            </h3>

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

                    {/* METRICS */}
                    <div
                        className="
                            mt-5

                            space-y-2.5
                        "
                    >

                        {metrics.map((item) => {

                            const Icon =
                                item.icon;

                            return (
                                <div
                                    key={item.label}
                                    className="
                                        flex
                                        items-center
                                        justify-between

                                        rounded-xl

                                        border
                                        border-white/[0.05]

                                        bg-white/[0.02]

                                        px-3
                                        py-2.5
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            items-center

                                            gap-2.5
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                items-center
                                                justify-center

                                                h-7
                                                w-7

                                                rounded-lg

                                                bg-amber-300/[0.08]

                                                text-amber-200
                                            "
                                        >

                                            <Icon
                                                className="
                                                    h-3.5
                                                    w-3.5
                                                "
                                            />

                                        </div>

                                        <span
                                            className="
                                                text-xs

                                                text-white/55
                                            "
                                        >
                                            {item.label}
                                        </span>

                                    </div>

                                    <span
                                        className="
                                            text-sm
                                            font-semibold

                                            text-white
                                        "
                                    >
                                        {item.value}
                                    </span>

                                </div>
                            );
                        })}

                    </div>

                    {/* FOOTER */}
                    <div
                        className="
                            mt-4

                            rounded-xl

                            border
                            border-emerald-400/10

                            bg-emerald-400/[0.05]

                            px-3
                            py-2.5
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                            "
                        >

                            <span
                                className="
                                    text-xs

                                    text-emerald-200/75
                                "
                            >
                                Most Used Model
                            </span>

                            <span
                                className="
                                    text-xs
                                    font-semibold

                                    text-emerald-100
                                "
                            >
                                {stats?.most_used_model ||
                                    "No activity"}
                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}