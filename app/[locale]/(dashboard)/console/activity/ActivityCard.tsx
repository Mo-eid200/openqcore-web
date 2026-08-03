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
                rounded-xl border border-white/[0.06]
                bg-[#0f1012]/92 backdrop-blur-xl
                px-3.5 py-3
                flex items-center gap-3
                transition-all duration-200
                hover:-translate-y-0.5
                hover:border-amber-300/12
                hover:bg-[#111214]/96
                hover:shadow-[0_10px_24px_rgba(0,0,0,0.22)]
            "
        >
            {/* HOVER GLOW */}
            <div
                className="
                    pointer-events-none absolute inset-0 opacity-0
                    transition-opacity duration-200 group-hover:opacity-100
                    bg-[radial-gradient(circle_at_left,rgba(251,191,36,0.06),transparent_60%)]
                "
            />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.025),transparent_35%)]" />

            {/* ICON */}
            <div
                className={`
                    relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl
                    border border-white/[0.05]
                    shadow-[0_6px_14px_rgba(0,0,0,0.16)]
                    ${item.colorClass || "bg-amber-300/[0.10]"}
                `}
            >
                {item.icon && (
                    <item.icon className="h-4 w-4 text-amber-200" />
                )}
            </div>

            {/* CONTENT */}
            <div className="relative min-w-0 flex-1">
                <div className="truncate text-[13px] font-semibold text-white">
                    {item.title}
                </div>

                {!!item.subtitle && (
                    <div className="mt-0.5 truncate text-xs text-white/45">
                        {item.subtitle}
                    </div>
                )}
            </div>

            {/* TIME */}
            <div className="relative flex shrink-0 flex-col items-end">
                <span className="text-xs font-medium text-amber-200/75">
                    {new Date(item.timestamp).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span>

                <span className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-amber-100/35">
                    Live
                </span>
            </div>
        </div>
    );
}