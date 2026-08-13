"use client";

import React from "react";

import {
    AlertTriangle,
    CheckCircle2,
    Circle,
    PauseCircle,
} from "lucide-react";

import type {
    AgentStatus,
} from "./types";

// =========================================================
// STATUS CONFIG
// =========================================================

const STATUS: Record<
    AgentStatus,
    {
        label: string;
        icon: React.ElementType;
        className: string;
        iconClassName: string;
        pulseClassName?: string;
    }
> = {
    // =====================================================
    // ACTIVE
    // =====================================================

    active: {
        label: "Active",
        icon: CheckCircle2,
        className: `
            border-emerald-300/10
            bg-emerald-300/[0.08]
            text-emerald-200
        `,
        iconClassName: `
            text-emerald-200
        `,
        pulseClassName: `
            bg-emerald-300
        `,
    },

    // =====================================================
    // IDLE
    // =====================================================
    //
    // 🔧 FIX: was `Loader2` (a loading spinner — the same icon this
    // codebase uses everywhere else to mean "in progress") plus an
    // explicit `animate-spin` applied only for this status, making
    // it spin continuously and look like the agent is perpetually
    // loading rather than sitting idle. `Circle` (a plain static
    // dot) correctly reads as "at rest, not currently doing
    // anything" — no animation.

    idle: {
        label: "Idle",
        icon: Circle,
        className: `
            border-white/[0.08]
            bg-white/[0.04]
            text-white/65
        `,
        iconClassName: `
            text-white/55
        `,
    },

    // =====================================================
    // PAUSED
    // =====================================================

    paused: {
        label: "Paused",
        icon: PauseCircle,
        className: `
            border-amber-300/10
            bg-amber-300/[0.08]
            text-amber-200
        `,
        iconClassName: `
            text-amber-200
        `,
    },

    // =====================================================
    // FAILED
    // =====================================================

    failed: {
        label: "Failed",
        icon: AlertTriangle,
        className: `
            border-red-300/10
            bg-red-300/[0.08]
            text-red-200
        `,
        iconClassName: `
            text-red-200
        `,
    },
};

// =========================================================
// TYPES
// =========================================================

type Props = {
    status: AgentStatus;
    pulse?: boolean;
    className?: string;
};

// =========================================================
// COMPONENT
// =========================================================

export default function AgentStatusBadge({
    status,
    pulse = true,
    className = "",
}: Props) {
    const current =
        STATUS[status] ||
        STATUS.idle;

    const Icon =
        current.icon;

    return (
        <div
            className={`
                inline-flex
                items-center

                gap-2

                rounded-full

                border

                px-2.5
                py-1.5

                text-[11px]
                font-semibold

                backdrop-blur-md

                transition-all
                duration-200

                ${current.className}
                ${className}
            `}
        >

            {/* STATUS DOT */}

            {
                pulse &&
                current.pulseClassName && (
                    <span
                        className="
                            relative

                            flex
                            h-2
                            w-2
                        "
                    >

                        <span
                            className={`
                                absolute
                                inline-flex

                                h-full
                                w-full

                                animate-ping

                                rounded-full

                                opacity-70

                                ${current.pulseClassName}
                            `}
                        />

                        <span
                            className={`
                                relative
                                inline-flex

                                h-2
                                w-2

                                rounded-full

                                ${current.pulseClassName}
                            `}
                        />

                    </span>
                )
            }

            {/* ICON */}
            {/* 🔧 FIX: removed the `status === "idle" ? "animate-spin"
                : ""` class — no status icon should spin continuously;
                the pulsing dot above already conveys "live/active"
                for the active state. */}

            <Icon
                className={`
                    h-3.5
                    w-3.5

                    ${current.iconClassName}
                `}
            />

            {/* LABEL */}

            <span
                className="
                    whitespace-nowrap
                "
            >
                {current.label}
            </span>

        </div>
    );
}