"use client";

import React from "react";

import {
    Plus,
    Search,
    Sparkles,
} from "lucide-react";

// =========================================================
// TYPES
// =========================================================

type Props = {
    search: string;
    onSearchChange: (
        value: string,
    ) => void;
    onNew?: () => void;
    loading?: boolean;
};

// =========================================================
// COMPONENT
// =========================================================

export default function AgentsToolbar({
    search,
    onSearchChange,
    onNew,
    loading = false,
}: Props) {

    return (
        <section
            className="
                flex
                flex-col

                gap-5

                lg:flex-row
                lg:items-end
                lg:justify-between
            "
        >

            {/* =====================================================
                LEFT
            ===================================================== */}

            <div
                className="
                    flex
                    flex-col

                    gap-2
                "
            >

                {/* BADGE */}

                <div
                    className="
                        inline-flex
                        items-center

                        gap-2

                        text-[11px]
                        font-medium

                        uppercase
                        tracking-[0.14em]

                        text-amber-200/85
                    "
                >

                    <Sparkles
                        className="
                            h-3.5
                            w-3.5
                        "
                    />

                    AI Workspace

                </div>

                {/* TITLE */}

                <div>

                    <h1
                        className="
                            text-2xl
                            font-bold

                            tracking-tight

                            text-white

                            lg:text-3xl
                        "
                    >
                        AI Agents
                    </h1>

                    <p
                        className="
                            mt-2

                            max-w-2xl

                            text-sm
                            leading-6

                            text-white/55
                        "
                    >
                        Create specialized AI agents for
                        automation, research, analytics,
                        customer operations, development,
                        and advanced internal workflows.
                    </p>

                </div>

            </div>

            {/* =====================================================
                RIGHT
            ===================================================== */}

            <div
                className="
                    flex
                    flex-col

                    items-stretch
                    gap-3

                    sm:flex-row
                    sm:items-center
                "
            >

                {/* =====================================================
                    SEARCH
                ===================================================== */}

                <div
                    className="
                        relative

                        min-w-[240px]
                    "
                >

                    <Search
                        className="
                            absolute
                            left-3
                            top-1/2

                            h-4
                            w-4

                            -translate-y-1/2

                            text-white/35
                        "
                    />

                    <input
                        type="text"
                        value={search}
                        autoComplete="off"
                        spellCheck={false}
                        aria-label="Search agents"
                        onChange={(e) =>
                            onSearchChange(
                                e.target.value
                            )
                        }
                        placeholder="Search agents..."
                        className="
                            h-11
                            w-full

                            rounded-xl

                            border
                            border-white/[0.08]

                            bg-[#0f1012]/92

                            pl-10
                            pr-4

                            text-sm
                            text-white

                            outline-none

                            shadow-[0_8px_24px_rgba(0,0,0,0.12)]
                            backdrop-blur-xl

                            transition-all
                            duration-200

                            placeholder:text-white/30

                            focus:border-amber-300/12
                            focus:bg-[#111214]/96
                            focus:ring-2
                            focus:ring-amber-300/10
                        "
                    />

                </div>

                {/* =====================================================
                    CREATE BUTTON
                ===================================================== */}

                <button
                    type="button"
                    disabled={loading}
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

                        shadow-[0_8px_24px_rgba(251,191,36,0.16)]

                        transition-all
                        duration-200

                        hover:scale-[1.01]
                        hover:bg-amber-200

                        active:scale-[0.99]

                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                >

                    <Plus
                        className="
                            h-4
                            w-4
                        "
                    />

                    {
                        loading
                            ? "Loading..."
                            : "Create Agent"
                    }

                </button>

            </div>

        </section>
    );
}