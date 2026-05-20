"use client";

import React from "react";
import { ActivityItem } from "./types";

export default function ActivityCard({
    item,
}: { item: ActivityItem }) {
    return (
        <div
            className="
                group relative overflow-hidden
                rounded-lg border border-amber-500/10
                bg-[#0f0a05]/80 backdrop-blur-xl
                px-3 py-3
                flex items-center gap-3
                transition-all duration-200
                hover:border-amber-400/15 hover:bg-[#140d06]/90
                hover:-translate-y-0.5
                hover:shadow-[0_8px_20px_rgba(251,191,36,0.07)]
            "
        >
            {/* HOVER GLOW */}
            <div className="
                pointer-events-none absolute inset-0 opacity-0
                transition-opacity duration-200 group-hover:opacity-100
                bg-[radial-gradient(circle_at_left,rgba(251,191,36,0.10),transparent_60%)]
            " />
            {/* ICON */}
            <div className={`
                relative w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                border border-white/[0.05]
                ${item.colorClass || "bg-amber-500/10"}
            `}>
                {item.icon && (
                    <item.icon className="w-4 h-4 text-amber-300" />
                )}
            </div>
            {/* CONTENT */}
            <div className="relative flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-white truncate">
                    {item.title}
                </div>
                {!!item.subtitle && (
                    <div className="mt-0.5 text-xs text-amber-100/58 truncate">
                        {item.subtitle}
                    </div>
                )}
            </div>
            {/* TIME */}
            <div className="relative flex flex-col items-end shrink-0">
                <span className="text-xs font-medium text-amber-200/70">
                    {new Date(item.timestamp).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                </span>
                <span className="mt-0.5 text-[10px] uppercase tracking-wider text-amber-100/30">
                    Live
                </span>
            </div>
        </div>
    );
}