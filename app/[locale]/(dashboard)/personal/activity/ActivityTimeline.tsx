"use client";

import React from "react";
import { Sparkles, FolderKanban, Cpu } from "lucide-react";
import { ActivityItem } from "./types";

const TIMELINE: ActivityItem[] = [
    {
        id: 1,
        title: "Started session",
        subtitle: "Today • Project Gamma",
        icon: Sparkles,
        colorClass: "bg-amber-400/15",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        status: "done",
    },
    {
        id: 2,
        title: "Saved a prompt",
        subtitle: "Prompt: Code Summarizer",
        icon: FolderKanban,
        colorClass: "bg-yellow-300/15",
        timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
        status: "done",
    },
    {
        id: 3,
        title: "Launched custom agent",
        subtitle: "Agent: DataScience QX",
        icon: Cpu,
        colorClass: "bg-orange-400/15",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: "done",
    },
];

export default function ActivityTimeline() {
    return (
        <section className="
      rounded-xl border border-amber-500/10
      bg-[#120d05]/80 backdrop-blur-xl
      shadow-[0_6px_18px_rgba(0,0,0,0.10)]
      p-3
    ">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h2 className="text-base font-semibold tracking-tight text-white">
                        Timeline
                    </h2>
                    <p className="mt-0.5 text-xs text-amber-100/60">
                        Recent AI workspace events.
                    </p>
                </div>
                <div className="
          h-7 px-2 rounded-lg border border-amber-400/10
          bg-amber-400/10 flex items-center text-[11px] font-medium text-amber-300
        ">
                    Live
                </div>
            </div>
            {/* TIMELINE */}
            <ol className="
        relative ml-2 border-l border-amber-300/10 space-y-4
      ">
                {TIMELINE.map((item) => (
                    <li key={item.id} className="relative ml-6">
                        {/* ICON */}
                        <span className={`
              absolute -left-8 top-0 flex items-center justify-center
              w-7 h-7 rounded-lg ring-1 ring-amber-300/10
              backdrop-blur-md ${item.colorClass}
            `}>
                            {item.icon ? (
                                <item.icon className="w-4 h-4 text-amber-300" />
                            ) : null}
                        </span>
                        {/* CARD */}
                        <div className="
              rounded-lg border border-white/5 bg-black/15
              px-3 py-2
              transition-all duration-200
              hover:border-amber-400/10 hover:bg-amber-400/10
            ">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <div className="text-[13px] font-semibold text-white">
                                        {item.title}
                                    </div>
                                    <div className="mt-0.5 text-xs text-amber-100/70">
                                        {item.subtitle}
                                    </div>
                                </div>
                                <div className="shrink-0 text-xs text-amber-200/40">
                                    {new Date(item.timestamp).toLocaleDateString(undefined, {
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
}