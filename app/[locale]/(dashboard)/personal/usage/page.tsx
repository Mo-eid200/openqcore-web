"use client";
import React from "react";
import UsageCards from "./UsageCards";
import UsageChart from "./UsageChart";
import UsageBreakdown from "./UsageBreakdown";
import type { UsageStat, UsageCardStat } from "./types";
import { Rocket, Brush, Mic2, Users } from "lucide-react";

// Mock بيانات لأسبوع:
const stats: UsageStat[] = [
    { date: "2024-05-17", completions: 1400, images: 50, voice: 16, agents: 2, cost: 7.12 },
    { date: "2024-05-18", completions: 1740, images: 69, voice: 12, agents: 2, cost: 8.04 },
    { date: "2024-05-19", completions: 1311, images: 80, voice: 15, agents: 2, cost: 6.90 },
    { date: "2024-05-20", completions: 1250, images: 100, voice: 16, agents: 1, cost: 6.20 },
    { date: "2024-05-21", completions: 1672, images: 90, voice: 18, agents: 2, cost: 8.54 },
    { date: "2024-05-22", completions: 1200, images: 63, voice: 14, agents: 3, cost: 6.38 },
    { date: "2024-05-23", completions: 1750, images: 85, voice: 21, agents: 2, cost: 8.99 },
];

const cards: UsageCardStat[] = [
    { label: "Completions", value: stats.reduce((a, s) => a + s.completions, 0).toLocaleString(), change: 3.5, icon: <Rocket className="w-5 h-5" />, color: "text-emerald-400" },
    { label: "Images", value: stats.reduce((a, s) => a + s.images, 0).toLocaleString(), change: -1.4, icon: <Brush className="w-5 h-5" />, color: "text-orange-400" },
    { label: "Voice", value: stats.reduce((a, s) => a + s.voice, 0).toLocaleString(), change: 4.2, icon: <Mic2 className="w-5 h-5" />, color: "text-yellow-300" },
    { label: "Agents", value: stats.reduce((a, s) => a + s.agents, 0).toLocaleString(), change: 2.2, icon: <Users className="w-5 h-5" />, color: "text-cyan-400" },
];

export default function UsagePage() {
    return (
        <div className="w-full max-w-5xl mx-auto min-h-screen px-2 sm:px-8 py-8 flex flex-col gap-10">
            <div>
                <h1 className="text-2xl font-bold text-white mb-2">Usage & Analytics</h1>
                <p className="text-xs text-amber-100/70">
                    Track, analyze, and compare your AI workspace consumption in depth.<br />
                    All numbers, all insights, all gold.
                </p>
            </div>
            <UsageCards cards={cards} />
            <UsageChart data={stats} />
            <UsageBreakdown stats={stats} />
        </div>
    );
}