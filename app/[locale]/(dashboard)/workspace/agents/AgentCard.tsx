import React from "react";
import { MoreVertical } from "lucide-react";
import { AgentStatusBadge } from "./AgentStatusBadge";

type Agent = {
    name: string;
    model: string;
    status: "running" | "paused" | "failed" | "deploying" | "offline";
    latency: string;
    requests: number;
    region: string;
};
export function AgentCard({
    agent,
    onMenu,
}: {
    agent: Agent;
    onMenu?: () => void;
}) {
    return (
        <div className="
      bg-[#131726]/95 rounded-2xl border border-white/8
      px-6 py-5 flex flex-col gap-2 shadow
      hover:shadow-xl transition
      relative
      group
    ">
            <div className="flex items-start justify-between gap-2">
                <div>
                    <div className="font-bold text-white text-lg leading-tight">{agent.name}</div>
                    <div className="text-slate-400 text-xs font-mono mb-1">
                        <span className="font-bold">{agent.model}</span>
                    </div>
                </div>
                {/* actions dropdown */}
                <button
                    onClick={onMenu}
                    className="p-2 rounded-lg text-slate-400 hover:text-[#d4af37] transition"
                    tabIndex={-1}
                >
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>
            <div className="flex flex-col gap-1">
                <AgentStatusBadge status={agent.status} />
                <div className="flex gap-4 flex-wrap mt-2 mb-1">
                    <Stat label="Latency" value={agent.latency} />
                    <Stat label="Requests" value={agent.requests.toLocaleString()} />
                    <Stat label="Region" value={agent.region} />
                </div>
            </div>
        </div>
    );
}

// Helper
function Stat({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <span className="flex items-center gap-1 text-xs text-slate-300">
            <span className="font-semibold text-slate-500">{label}:</span>
            <span className="font-bold">{value}</span>
        </span>
    );
}