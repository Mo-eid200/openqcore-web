import React from "react";
import { Badge } from "../../components/ui/Badge";
import { MoreVertical } from "lucide-react";

type Cluster = {
    name: string;
    region: string;
    status: "operational" | "maintenance" | "degraded";
    nodes: number;
    updated: string;
};

export function ClusterCard({ cluster }: { cluster: Cluster }) {
    const badgeColor =
        cluster.status === "operational" ? "emerald"
            : cluster.status === "maintenance" ? "cyan"
                : "danger";

    return (
        <div className="rounded-2xl border border-white/10 bg-[#181e29]/95 px-6 py-5 flex flex-col shadow hover:shadow-lg transition group">
            <div className="flex items-center justify-between gap-2">
                <div>
                    <div className="font-bold text-lg text-white mb-1">{cluster.name}</div>
                    <div className="text-xs text-slate-400 font-mono">{cluster.region}</div>
                </div>
                <button className="p-2 rounded-lg text-slate-400 hover:text-[#d4af37] transition" tabIndex={-1}>
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>
            <div className="flex items-center gap-3 mt-4">
                <Badge color={badgeColor} className="capitalize">{cluster.status}</Badge>
                <span className="text-xs text-slate-400 ml-4">
                    Nodes: <span className="font-semibold text-white">{cluster.nodes}</span>
                </span>
            </div>
            <div className="text-[11px] text-slate-500 mt-2">Updated: {cluster.updated}</div>
        </div>
    );
}