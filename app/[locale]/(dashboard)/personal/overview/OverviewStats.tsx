"use client";

import React from "react";
import { Cpu, Zap, FolderKanban, Layers, ArrowUpRight } from "lucide-react";
import type { StatMetric } from "./types";

const stats: StatMetric[] = [
    {
        label: "QX Credits",
        value: "18,150",
        icon: Zap,
        glow: "from-amber-300/15 to-amber-600/5",
        iconClass: "bg-amber-400/10 text-amber-300",
    },
    {
        label: "Models Used",
        value: 6,
        icon: Cpu,
        glow: "from-orange-300/15 to-orange-600/5",
        iconClass: "bg-orange-400/10 text-orange-300",
    },
    {
        label: "AI Workflows",
        value: 12,
        icon: Layers,
        glow: "from-yellow-300/15 to-yellow-600/5",
        iconClass: "bg-yellow-400/10 text-yellow-200",
    },
    {
        label: "Active Prompts",
        value: 14,
        icon: FolderKanban,
        glow: "from-amber-300/15 to-amber-600/5",
        iconClass: "bg-amber-300/10 text-amber-100",
    },
];

export default function OverviewStats() {
    return (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className={`
            group relative overflow-hidden
            rounded-xl border border-amber-500/10
            bg-[#120d05]/80 backdrop-blur-2xl
            p-3
            transition-all duration-200
            hover:-translate-y-0.5 hover:border-amber-400/15
          `}
                >
                    {/* BACKGROUND GLOW */}
                    <div
                        className={`
              pointer-events-none absolute inset-0 opacity-0
              transition-opacity duration-300 group-hover:opacity-100
              bg-gradient-to-br ${stat.glow}
            `}
                    />
                    {/* HEADER */}
                    <div className="relative flex items-start justify-between">
                        {/* ICON */}
                        <div
                            className={`
                w-8 h-8 rounded-lg flex items-center justify-center
                border border-white/[0.04]
                shadow-[0_0_10px_rgba(0,0,0,0.12)]
                ${stat.iconClass}
              `}
                        >
                            <stat.icon className="w-4 h-4" />
                        </div>
                        {/* ACTION */}
                        <div
                            className="
                opacity-0 transition-all duration-200
                translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
              "
                        >
                            <div className="
                w-7 h-7 rounded-lg border border-amber-500/10
                bg-amber-400/10 flex items-center justify-center text-amber-200
              ">
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </div>
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="relative mt-5">
                        {/* VALUE */}
                        <div className="text-xl font-semibold tracking-tight text-white">
                            {stat.value}
                        </div>
                        {/* LABEL */}
                        <div className="mt-1 text-xs text-amber-100/55">{stat.label}</div>
                    </div>

                    {/* FOOTER */}
                    <div className="relative mt-4 flex items-center justify-between">
                        <div className="h-px flex-1 bg-gradient-to-r from-amber-500/10 to-transparent" />
                        <span className="pl-3 text-[10px] font-medium uppercase tracking-wider text-amber-200/35">
                            Personal
                        </span>
                    </div>
                </div>
            ))}
        </section>
    );
}