"use client";

import React from "react";
import { Cpu, Sparkles, MessageCircle, ArrowUpRight } from "lucide-react";
import ActivityCard from "./ActivityCard";
import { ActivityItem } from "./types";

const FEED: ActivityItem[] = [
    {
        id: 1,
        title: "Started AI Chat",
        subtitle: "Project Alpha • GPT-4",
        icon: MessageCircle,
        colorClass: "bg-amber-500/15",
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },
    {
        id: 2,
        title: "Generated new workflow",
        subtitle: "Workflow QX-Dev-2024",
        icon: Cpu,
        colorClass: "bg-orange-400/20",
        timestamp: new Date(Date.now() - 63 * 60 * 1000).toISOString(),
    },
    {
        id: 3,
        title: "Prompt saved",
        subtitle: "Super Researcher Prompt",
        icon: Sparkles,
        colorClass: "bg-yellow-300/20",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 4,
        title: "Upgraded QX Credits",
        subtitle: "+5000 from purchase",
        icon: ArrowUpRight,
        colorClass: "bg-amber-400/20",
        timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
    },
];

export default function ActivityFeed() {
    return (
        <section
            className="
        rounded-xl border border-amber-500/10
        bg-[#120d05]/80 backdrop-blur-xl
        shadow-[0_6px_18px_rgba(0,0,0,0.09)]
        p-3
      "
        >
            {/* HEADER */}
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h2 className="text-base font-semibold tracking-tight text-white">
                        Feed
                    </h2>
                    <p className="mt-0.5 text-xs text-amber-100/60">
                        Live AI workspace activity stream.
                    </p>
                </div>
                <div
                    className="
            h-7 px-2 rounded-lg border border-amber-400/10
            bg-amber-400/10 flex items-center text-[11px] font-medium text-amber-300
          "
                >
                    Live
                </div>
            </div>
            {/* FEED */}
            <div className="flex flex-col gap-2">
                {FEED.map((item) => (
                    <ActivityCard key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
}