import React from "react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    trend?: React.ReactNode; // e.g. +3.2% or arrow up/down
    status?: "up" | "down" | "stable";
    className?: string;
    miniChart?: React.ReactNode;
}

export function StatCard({ title, value, icon, trend, status, className = "", miniChart }: StatCardProps) {
    let statusColor =
        status === "up" ? "text-emerald-400" :
            status === "down" ? "text-rose-400" :
                "text-slate-300";

    return (
        <div className={`rounded-xl bg-[#121a2b] border border-white/7 shadow flex items-center px-6 py-4 gap-4 ${className}`}>
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37]/20 to-white/2 text-[#d4af37]">
                {icon}
            </div>
            <div className="flex-1">
                <div className="text-slate-400 text-xs font-semibold mb-1">{title}</div>
                <div className="flex items-end gap-2">
                    <div className="text-2xl font-bold text-white">{value}</div>
                    {trend && (
                        <span className={`text-xs font-bold ${statusColor}`}>{trend}</span>
                    )}
                </div>
            </div>
            {miniChart && <div className="ml-auto">{miniChart}</div>}
        </div>
    );
}