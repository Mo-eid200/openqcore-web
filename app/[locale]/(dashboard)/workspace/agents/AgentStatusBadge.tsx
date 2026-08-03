import React from "react";

type Status = "running" | "paused" | "failed" | "deploying" | "offline";

const COLORS: Record<Status, string> = {
    running: "bg-emerald-500/10 text-emerald-400 ring-emerald-500",
    paused: "bg-yellow-500/10 text-yellow-400 ring-yellow-500",
    failed: "bg-rose-500/10 text-rose-400 ring-rose-500",
    deploying: "bg-blue-500/10 text-blue-400 ring-blue-500",
    offline: "bg-slate-500/10 text-slate-400 ring-slate-500",
};

export function AgentStatusBadge({ status }: { status: Status }) {
    return (
        <span className={`
      inline-flex items-center gap-1 px-3 py-0.5 rounded-lg
      text-xs font-bold capitalize
      ring-1 ring-inset ${COLORS[status]}
    `}>
            <span className={`w-2 h-2 rounded-full ${COLORS[status].split(' ')[1]}`} />
            {status}
        </span>
    );
}