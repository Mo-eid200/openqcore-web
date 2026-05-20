import React from "react";
import type { UsageStat } from "./types";

export default function UsageBreakdown({ stats }: { stats: UsageStat[] }) {
    // يمكن هنا Pie Chart, أو breakdown أو جدول أو أي تقسيم متقدم
    // سنعرض جدول breakdown عصري مع تلوين % الذهبي/أخضر/أحمر للتفوق/الانخفاض

    const last = stats[stats.length - 1];
    const avg = {
        completions: Math.round(stats.reduce((a, b) => a + b.completions, 0) / stats.length),
        images: Math.round(stats.reduce((a, b) => a + b.images, 0) / stats.length),
        voice: Math.round(stats.reduce((a, b) => a + b.voice, 0) / stats.length),
        agents: Math.round(stats.reduce((a, b) => a + b.agents, 0) / stats.length),
        cost: +(stats.reduce((a, b) => a + b.cost, 0) / stats.length).toFixed(2),
    };
    return (
        <div className="rounded-2xl border border-amber-400/15 bg-[#181108]/95 p-5 shadow flex flex-col gap-2">
            <div className="mb-2 font-bold text-amber-100/80">Weekly Average vs Latest</div>
            <div className="flex flex-wrap gap-5">
                {["completions", "images", "voice", "agents", "cost"].map((k) => {
                    const key = k as keyof UsageStat;
                    // @ts-ignore
                    const change = Math.round(((last[key] - avg[key]) / avg[key]) * 1000) / 10;
                    return (
                        <div key={k} className="flex flex-col min-w-[120px]">
                            <span className={`text-xs text-amber-200 mb-1 capitalize`}>{k}</span>
                            <span className="text-xl font-bold text-white">{String(last[key])}</span>
                            <span className={`text-xs font-semibold ${change > 0 ? "text-emerald-400" : change < 0 ? "text-red-400" : "text-amber-200"
                                }`}>
                                {change > 0 ? "▲" : change < 0 ? "▼" : "▬"} {Math.abs(change)}% {" "}
                                <span className="text-amber-100/45">vs avg</span>
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}