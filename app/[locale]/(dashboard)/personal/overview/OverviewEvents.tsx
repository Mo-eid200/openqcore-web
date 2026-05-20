"use client";

import React from "react";
import type { EventItem } from "./types";
import {
    MessageCircle,
    Sparkles,
    Star,
    TimerReset,
    ArrowUpRight,
} from "lucide-react";

const events: EventItem[] = [
    {
        id: 1,
        type: "chat",
        title: "Started new AI conversation",
        subtitle: "GPT-4 Turbo Workspace",
        date: "2024-05-19T13:55:00Z",
        icon: MessageCircle,
    },
    {
        id: 2,
        type: "prompt",
        title: "Saved a master prompt",
        subtitle: "Prompt Library",
        date: "2024-05-18T23:04:00Z",
        icon: Sparkles,
    },
    {
        id: 3,
        type: "workflow",
        title: "Created custom workflow",
        subtitle: "Agents Chain",
        date: "2024-05-17T09:17:00Z",
        icon: Star,
    },
    {
        id: 4,
        type: "token",
        title: "QX Credits consumed",
        subtitle: "1,240 Tokens",
        date: "2024-05-16T22:10:00Z",
        icon: TimerReset,
    },
];

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function QuickAccess() {
    return (
        <section
            className="
        relative overflow-hidden
        rounded-xl border border-amber-500/10
        bg-[#120d05]/80 backdrop-blur-2xl
        p-3
      "
        >
            {/* Glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-[-60px] right-[-40px] w-[110px] h-[110px] rounded-full bg-amber-400/10 blur-[50px]" />
            </div>

            {/* Header */}
            <div className="relative flex items-center justify-between mb-2">
                <div>
                    <p className="text-[11px] uppercase tracking-wide text-amber-200/45">
                        Live Feed
                    </p>
                    <h2 className="mt-1 text-base font-semibold tracking-tight text-white">
                        Recent Activity
                    </h2>
                </div>
                <div className="w-8 h-8 rounded-xl border border-amber-500/10 bg-amber-400/10 flex items-center justify-center text-amber-300">
                    <ArrowUpRight className="w-4 h-4" />
                </div>
            </div>

            {/* EVENTS */}
            <div className="relative mt-2 space-y-2">
                {events.map((event) => {
                    const Icon = event.icon || Sparkles;
                    return (
                        <div
                            key={event.id}
                            className="
                group relative overflow-hidden rounded-xl
                border border-amber-500/10 bg-black/10 px-2.5 py-2
                transition-all duration-200 hover:border-amber-400/15 hover:bg-amber-400/[0.023]
              "
                        >
                            {/* Hover Glow */}
                            <div className="
                pointer-events-none absolute inset-0 opacity-0
                transition-opacity duration-300 group-hover:opacity-100
                bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.06),transparent_58%)]
              " />

                            <div className="relative flex items-start gap-2.5">
                                {/* Icon */}
                                <div className="
                  w-8 h-8 rounded-lg border border-amber-500/10 bg-amber-400/10
                  flex items-center justify-center shrink-0 text-amber-300
                ">
                                    <Icon className="w-4 h-4" />
                                </div>
                                {/* Content */}
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-xs font-semibold text-white">{event.title}</h3>
                                    {event.subtitle && (
                                        <p className="mt-0.5 text-[11px] text-amber-100/60">{event.subtitle}</p>
                                    )}
                                </div>
                            </div>

                            {/* Date */}
                            <div className="relative mt-2 flex items-center justify-between">
                                <div className="h-px flex-1 bg-gradient-to-r from-amber-500/10 to-transparent" />
                                <span
                                    className="pl-2 text-[10px] text-amber-100/35"
                                >
                                    {formatDate(event.date)}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}