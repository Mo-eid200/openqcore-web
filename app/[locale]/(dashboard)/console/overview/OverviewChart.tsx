"use client";

import React from "react";

import {
    Activity,
    TrendingUp,
} from "lucide-react";

import type {
    ConsoleOverviewUsagePoint,
} from "@/app/lib/api/console/overview";

type Props = {
    usagePoints:
        ConsoleOverviewUsagePoint[];
};

export default function OverviewChart({
    usagePoints,
}: Props) {

    // =====================================================
    // SAFE DATA
    // =====================================================

    const safeUsagePoints =
        usagePoints.length
            ? usagePoints
            : [
                {
                    requests: 0,
                    tokens: 0,
                },
            ];

    // =====================================================
    // METRICS
    // =====================================================

    const requestValues =
        safeUsagePoints.map(
            (point) => point.requests
        );

    const tokenValues =
        safeUsagePoints.map(
            (point) => point.tokens
        );

    const totalTokens =
        tokenValues.reduce(
            (a, b) => a + b,
            0
        );

    const totalRequests =
        requestValues.reduce(
            (a, b) => a + b,
            0
        );

    // =====================================================
    // TREND
    // =====================================================

    const first =
        requestValues[0] ?? 0;

    const last =
        requestValues[
            requestValues.length - 1
        ] ?? 0;

    const trend =
        requestValues.length >= 2 &&
        first > 0
            ? (
                (
                    (
                        last - first
                    ) /
                    first
                ) * 100
            ).toFixed(1)
            : "0.0";

    // =====================================================
    // CHART NORMALIZATION
    // =====================================================

    const maxValue =
        Math.max(
            ...requestValues,
            1
        );

    const normalizedPoints =
        requestValues.map(
            (value) =>
                Math.max(
                    (
                        value /
                        maxValue
                    ) * 72,
                    6
                )
        );

    // =====================================================
    // SVG POINTS
    // =====================================================

    const points =
        normalizedPoints
            .map(
                (value, index) =>
                    `${20 + index * 28},${94 - value}`
            )
            .join(" ");

    // =====================================================
    // AREA PATH
    // =====================================================

    const areaPath = `
        M20,94
        ${normalizedPoints
            .map(
                (value, index) =>
                    `L ${20 + index * 28},${94 - value}`
            )
            .join(" ")}
        L ${20 + (normalizedPoints.length - 1) * 28},94
        L 20,94 Z
    `;

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

                p-4

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
                        right-[-40px]

                        h-[140px]
                        w-[140px]

                        rounded-full

                        bg-amber-300/[0.05]

                        blur-[65px]
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

                    gap-4
                "
            >

                {/* LEFT */}
                <div>

                    <div
                        className="
                            inline-flex
                            items-center

                            gap-1.5

                            rounded-full

                            border
                            border-amber-300/12

                            bg-amber-300/[0.08]

                            px-2.5
                            py-1

                            text-[10px]
                            font-medium
                            uppercase
                            tracking-[0.16em]

                            text-amber-200
                        "
                    >

                        <Activity
                            className="
                                h-3
                                w-3
                            "
                        />

                        API Activity

                    </div>

                    <h2
                        className="
                            mt-4

                            text-xl
                            font-semibold
                            tracking-tight

                            text-white
                        "
                    >
                        Usage Overview
                    </h2>

                    <p
                        className="
                            mt-2

                            max-w-md

                            text-sm
                            leading-6

                            text-white/55
                        "
                    >
                        Monitor realtime API traffic,
                        token consumption, model activity,
                        and developer infrastructure usage.
                    </p>

                </div>

                {/* TREND */}
                <div
                    className="
                        inline-flex
                        items-center

                        gap-1.5

                        rounded-xl

                        border
                        border-emerald-400/12

                        bg-emerald-400/[0.07]

                        px-3
                        py-1.5

                        text-xs
                        font-semibold

                        text-emerald-300
                    "
                >

                    <TrendingUp
                        className="
                            h-3.5
                            w-3.5
                        "
                    />

                    +{trend}%

                </div>

            </div>

            {/* CHART */}
            <div
                className="
                    relative
                    mt-8
                "
            >

                <svg
                    width="100%"
                    height="120"
                    viewBox="0 0 340 120"
                    className="overflow-visible"
                >

                    {/* GRID */}
                    {[0, 1, 2, 3].map(
                        (line) => (
                            <line
                                key={line}
                                x1="12"
                                y1={
                                    18 +
                                    line * 28
                                }
                                x2="328"
                                y2={
                                    18 +
                                    line * 28
                                }
                                stroke="
                                    rgba(
                                        255,
                                        255,
                                        255,
                                        0.06
                                    )
                                "
                                strokeWidth="1"
                            />
                        )
                    )}

                    {/* GRADIENT */}
                    <defs>

                        <linearGradient
                            id="usageGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >

                            <stop
                                offset="0%"
                                stopColor="
                                    rgba(
                                        251,
                                        191,
                                        36,
                                        0.20
                                    )
                                "
                            />

                            <stop
                                offset="100%"
                                stopColor="
                                    rgba(
                                        251,
                                        191,
                                        36,
                                        0
                                    )
                                "
                            />

                        </linearGradient>

                    </defs>

                    {/* AREA */}
                    <path
                        d={areaPath}
                        fill="
                            url(#usageGradient)
                        "
                    />

                    {/* LINE */}
                    <polyline
                        fill="none"
                        stroke="#fcd34d"
                        strokeWidth="2.2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        points={points}
                    />

                    {/* POINTS */}
                    {normalizedPoints.map(
                        (value, index) => {

                            const x =
                                20 +
                                index * 28;

                            const y =
                                94 - value;

                            return (
                                <g key={index}>

                                    <circle
                                        cx={x}
                                        cy={y}
                                        r="2.8"
                                        fill="#0f1012"
                                        stroke="#fcd34d"
                                        strokeWidth="1.7"
                                    />

                                    <circle
                                        cx={x}
                                        cy={y}
                                        r="6"
                                        fill="
                                            rgba(
                                                252,
                                                211,
                                                77,
                                                0.10
                                            )
                                        "
                                    />

                                </g>
                            );
                        }
                    )}

                </svg>

                {/* FOOTER */}
                <div
                    className="
                        mt-4

                        flex
                        items-center
                        justify-between

                        text-[11px]

                        text-white/45
                    "
                >

                    <span>
                        Last {
                            safeUsagePoints.length
                        } Days
                    </span>

                    <div
                        className="
                            flex
                            items-center

                            gap-4
                        "
                    >

                        <span>
                            {totalRequests.toLocaleString()}
                            {" "}
                            Requests
                        </span>

                        <span>
                            {totalTokens.toLocaleString()}
                            {" "}
                            Tokens
                        </span>

                    </div>

                </div>

            </div>

        </section>
    );
}