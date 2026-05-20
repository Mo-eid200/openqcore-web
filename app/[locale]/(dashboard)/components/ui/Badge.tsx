import React from "react";

type Color = "gold" | "emerald" | "cyan" | "purple" | "pink" | "slate" | "indigo" | "danger";

const COLORS: Record<Color, string> = {
    gold: "bg-[#d4af37]/20 text-[#d4af37]",
    emerald: "bg-emerald-500/10 text-emerald-400",
    cyan: "bg-cyan-500/10 text-cyan-400",
    purple: "bg-purple-500/10 text-purple-400",
    pink: "bg-pink-600/10 text-pink-400",
    indigo: "bg-indigo-500/10 text-indigo-400",
    slate: "bg-slate-600/10 text-slate-300",
    danger: "bg-rose-600/10 text-rose-400",
};

export function Badge({
    children,
    color = "gold",
    className = "",
}: { children: React.ReactNode; color?: Color; className?: string }) {
    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-lg font-semibold text-xs ${COLORS[color]} ${className}`}>
            {children}
        </span>
    );
}