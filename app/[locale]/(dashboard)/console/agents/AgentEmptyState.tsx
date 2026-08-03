"use client";

import React from "react";

import {
    Cpu,
    Plus,
    Sparkles,
} from "lucide-react";

type Props = {
    onNew?: () => void;
};

export default function AgentEmptyState({
    onNew,
}: Props) {

    return (
        <section
            className="
                relative
                overflow-hidden

                rounded-3xl

                border
                border-white/[0.06]

                bg-[#0f1012]/92

                backdrop-blur-2xl

                shadow-[0_18px_50px_rgba(0,0,0,0.22)]
            "
        >

            {/* BACKGROUND ATMOSPHERE */}

            <div className="pointer-events-none absolute inset-0">
                <div className="absolute right-[-60px] top-[-60px] h-[180px] w-[180px] rounded-full bg-amber-300/[0.06] blur-[80px]" />
                <div className="absolute left-[-40px] bottom-[-60px] h-[140px] w-[140px] rounded-full bg-orange-200/[0.04] blur-[70px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.025),transparent_38%)]" />
            </div>

            {/* CONTENT */}

            <div
                className="
                    relative
                    z-10

                    flex
                    flex-col
                    items-center
                    justify-center

                    px-6
                    py-20

                    text-center
                "
            >

                {/* ICON */}

                <div
                    className="
                        relative
                        mb-6
                    "
                >

                    <div
                        className="
                            absolute
                            inset-0

                            rounded-3xl

                            bg-amber-300/[0.08]

                            blur-2xl
                        "
                    />

                    <div
                        className="
                            relative

                            flex
                            h-20
                            w-20
                            items-center
                            justify-center

                            rounded-3xl

                            border
                            border-white/[0.05]

                            bg-amber-300/[0.08]

                            text-amber-200

                            shadow-[0_12px_30px_rgba(0,0,0,0.18)]
                        "
                    >

                        <Cpu
                            className="
                                h-10
                                w-10
                            "
                        />

                    </div>

                </div>

                {/* BADGE */}

                <div
                    className="
                        mb-4
                        inline-flex
                        items-center
                        gap-2

                        rounded-full

                        border
                        border-amber-300/10

                        bg-amber-300/[0.08]

                        px-3
                        py-1

                        text-[11px]
                        font-medium
                        text-amber-200
                    "
                >

                    <Sparkles
                        className="
                            h-3
                            w-3
                        "
                    />

                    AI Workforce Ready

                </div>

                {/* TITLE */}

                <h2
                    className="
                        text-2xl
                        font-bold
                        tracking-tight

                        text-white

                        lg:text-3xl
                    "
                >
                    No AI Agents Yet
                </h2>

                {/* DESCRIPTION */}

                <p
                    className="
                        mt-4

                        max-w-xl

                        text-sm
                        leading-7

                        text-white/55
                    "
                >
                    Create specialized AI agents for
                    coding, automation, analytics,
                    customer support, research,
                    internal operations, and advanced
                    workflows.
                </p>

                {/* ACTIONS */}

                <div
                    className="
                        mt-8

                        flex
                        flex-col
                        items-center
                        gap-3

                        sm:flex-row
                    "
                >

                    <button
                        type="button"
                        onClick={onNew}
                        className="
                            inline-flex
                            h-11
                            items-center
                            justify-center
                            gap-2

                            rounded-xl

                            bg-amber-300

                            px-5

                            text-sm
                            font-semibold
                            text-black

                            transition-all
                            duration-200

                            shadow-[0_8px_24px_rgba(251,191,36,0.16)]

                            hover:scale-[1.01]
                            hover:bg-amber-200

                            active:scale-[0.99]
                        "
                    >

                        <Plus
                            className="
                                h-4
                                w-4
                            "
                        />

                        Create Your First Agent

                    </button>

                    <div
                        className="
                            text-xs
                            text-white/35
                        "
                    >
                        Launch your first autonomous
                        AI workflow in seconds.
                    </div>

                </div>

            </div>

        </section>
    );
}