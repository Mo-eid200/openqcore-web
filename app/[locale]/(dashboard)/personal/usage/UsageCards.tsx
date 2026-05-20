import React from "react";
import type { UsageCardStat } from "./types";
import { Rocket, Brush, Mic2, Users } from "lucide-react";

const icons = {
    completions: <Rocket className="w-6 h-6" />,
    images: <Brush className="w-6 h-6" />,
    voice: <Mic2 className="w-6 h-6" />,
    agents: <Users className="w-6 h-6" />,
};

export default function UsageCards({ cards }: { cards: UsageCardStat[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
            {cards.map(c => (
                <div
                    key={c.label}
                    className={`
            flex flex-col rounded-2xl border
            border-amber-500/25 bg-gradient-to-br from-[#1a140a] via-[#352707]/80 to-[#181509]/70
            p-6 shadow group hover:shadow-amber-300/10
            transition
          `}
                >
                    <div className={`flex items-center gap-2 ${c.color ?? "text-amber-400"}`}>
                        {c.icon}
                        <span className="font-bold text-amber-100/90">{c.label}</span>
                    </div>
                    <div className="text-3xl font-mono font-extrabold text-white mt-2">
                        {c.value}
                    </div>
                    <span className={`text-xs mt-2 font-semibold ${c.change > 0
                        ? "text-emerald-400"
                        : c.change < 0
                            ? "text-red-400"
                            : "text-amber-200"
                        }`}>
                        {c.change > 0 ? "▲" : c.change < 0 ? "▼" : "▬"}
                        {Math.abs(c.change)}%
                        <span className="ml-2 text-amber-100/40">Last 7d</span>
                    </span>
                </div>
            ))}
        </div>
    );
}

// مثال للإستخدام:
const cards: UsageCardStat[] = [
    { label: "Completions", value: "9,323", change: 3.2, icon: icons.completions, color: "text-emerald-400" },
    { label: "Images", value: "712", change: -1.1, icon: icons.images, color: "text-orange-400" },
    { label: "Voice", value: "96", change: 0.0, icon: icons.voice, color: "text-yellow-300" },
    { label: "Agents", value: "12", change: 2.8, icon: icons.agents, color: "text-cyan-400" },
];