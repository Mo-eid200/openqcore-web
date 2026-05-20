"use client";

import React from "react";
import { Sparkles, ArrowUpRight } from "lucide-react";

export default function PersonalOverviewHero() {
    return (
        <section
            className="
        relative overflow-hidden
        rounded-xl border border-amber-500/10
        bg-gradient-to-br from-[#1c1208] via-[#120d05] to-[#0b0906]
        px-4 py-5 lg:px-6 lg:py-7
      "
        >
            {/* GLOW */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-[-60px] right-[-22px] w-[110px] h-[110px] rounded-full bg-amber-400/16 blur-[48px]" />
                <div className="absolute bottom-[-40px] left-[-20px] w-[70px] h-[90px] rounded-full bg-orange-500/12 blur-[38px]" />
            </div>
            {/* CONTENT */}
            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                {/* LEFT */}
                <div className="max-w-xl">
                    {/* BADGE */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/15 bg-amber-400/10 px-2.5 py-1 text-[11px] font-medium text-amber-200">
                        <Sparkles className="w-3 h-3" />
                        Personal AI Workspace
                    </div>
                    {/* TITLE */}
                    <h1 className="mt-4 text-xl font-semibold tracking-tight text-white">
                        Your AI Operating Space
                    </h1>
                    {/* DESCRIPTION */}
                    <p className="mt-2 max-w-xl text-xs leading-5 text-amber-100/70">
                        Monitor your personal AI workflows,
                        generations, chats, agents, API usage,
                        and creative tools from one unified dashboard experience.
                    </p>
                    {/* ACTIONS */}
                    <div className="mt-5 flex flex-wrap gap-3">
                        <button className="h-8 rounded-lg bg-amber-400 px-4 text-xs font-semibold text-black transition hover:scale-[1.03] hover:bg-amber-300">
                            Open Workspace
                        </button>
                        <button className="h-8 rounded-lg border border-amber-400/15 bg-white/5 px-4 text-xs font-medium text-amber-100 transition hover:bg-white/10">
                            View Usage
                        </button>
                    </div>
                </div>
                {/* RIGHT PANEL */}
                <div className="w-full max-w-[210px] rounded-xl border border-amber-500/10 bg-black/20 backdrop-blur-xl p-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-wide text-amber-200/60">
                                Personal Status
                            </p>
                            <h3 className="mt-1 text-base font-semibold text-white">
                                AI Workspace Active
                            </h3>
                        </div>
                        <div className="w-8 h-8 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-300">
                            <ArrowUpRight className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="mt-4 space-y-2">
                        {[
                            { label: "Generations Today", value: "284" },
                            { label: "Agents Running", value: "12" },
                            { label: "Credits Remaining", value: "$248" },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="
                  flex items-center justify-between
                  rounded-lg border border-amber-500/10 bg-white/5
                  px-3 py-2
                "
                            >
                                <span className="text-xs text-amber-100/75">{item.label}</span>
                                <span className="text-xs font-semibold text-white">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}