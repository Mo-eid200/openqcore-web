"use client";

import React from "react";
import { Activity, TrendingUp } from "lucide-react";

const usagePoints = [8, 14, 12, 18, 22, 28, 34, 31, 48, 54, 61, 58];

export default function OverviewActivity() {
    const totalUsage = usagePoints.reduce((a, b) => a + b, 0);

    return (
        <section
            className="
        relative
        rounded-xl border border-amber-500/10
        bg-[#120d05]/80 backdrop-blur-2xl
        p-4
      "
        >
            {/* BACKGROUND GLOW */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-[-70px] right-[-40px] w-[140px] h-[140px] rounded-full bg-amber-400/[0.09] blur-[65px]" />
            </div>

            {/* HEADER */}
            <div className="relative flex items-start justify-between gap-3">
                <div>
                    <div className="inline-flex items-center gap-1 rounded-full border border-amber-400/15 bg-amber-400/[0.07] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-amber-200">
                        <Activity className="w-3 h-3" />
                        AI Activity
                    </div>
                    <h2 className="mt-3 text-lg font-semibold tracking-tight text-white">
                        Usage Overview
                    </h2>
                    <p className="mt-1 max-w-md text-xs leading-5 text-amber-100/70">
                        Monitor your token consumption, AI activity, and model performance.
                    </p>
                </div>
                <div className="flex items-center gap-1 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.08] px-3 py-1.5 text-emerald-300 text-xs font-semibold">
                    <TrendingUp className="w-3 h-3" />
                    <span>+18.4%</span>
                </div>
            </div>

            {/* CHART */}
            <div className="relative mt-7">
                <svg width="100%" height="120" viewBox="0 0 340 120" className="overflow-visible">
                    {/* Background grid lines */}
                    {[0, 1, 2, 3].map((line) => (
                        <line
                            key={line}
                            x1="12"
                            y1={18 + line * 28}
                            x2="328"
                            y2={18 + line * 28}
                            stroke="rgba(255,255,255,0.07)"
                            strokeWidth="1"
                        />
                    ))}

                    <defs>
                        <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(251,191,36,0.22)" />
                            <stop offset="100%" stopColor="rgba(251,191,36,0)" />
                        </linearGradient>
                    </defs>

                    {/* Area under curve */}
                    <path
                        d={`M20,94 ${usagePoints
                            .map(
                                (y, i) => `L ${20 + i * 28},${94 - y * 1.6}`
                            )
                            .join(" ")} L ${20 + (usagePoints.length - 1) * 28},94 L 20,94 Z`}
                        fill="url(#usageGradient)"
                    />

                    {/* Line */}
                    <polyline
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        points={usagePoints
                            .map(
                                (y, i) => `${20 + i * 28},${94 - y * 1.6}`
                            )
                            .join(" ")}
                    />

                    {/* Points */}
                    {usagePoints.map((y, i) => (
                        <g key={i}>
                            <circle
                                cx={20 + i * 28}
                                cy={94 - y * 1.6}
                                r="2.7"
                                fill="#120d05"
                                stroke="#fbbf24"
                                strokeWidth="1.7"
                            />
                            <circle
                                cx={20 + i * 28}
                                cy={94 - y * 1.6}
                                r="6"
                                fill="rgba(251,191,36,0.10)"
                            />
                        </g>
                    ))}
                </svg>

                <div className="mt-2 flex items-center justify-between text-[11px] text-amber-100/50">
                    <span>Last 12 Days</span>
                    <span>
                        {totalUsage.toLocaleString()}k Tokens
                    </span>
                </div>
            </div>
        </section>
    );
}