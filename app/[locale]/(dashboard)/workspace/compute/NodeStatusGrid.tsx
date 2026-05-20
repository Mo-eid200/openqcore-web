import React from "react";
import { Badge } from "../../components/ui/Badge";

type Node = {
    id: string;
    type: string;
    status: "running" | "pending" | "error" | "offline";
    cpu: string;
    gpu: string;
};

export function NodeStatusGrid({ nodes }: { nodes: Node[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {nodes.map(n => (
                <div key={n.id} className="rounded-xl bg-[#212436]/90 border border-white/10 p-4 flex flex-col gap-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono font-bold text-white text-sm">{n.type}</span>
                        <Badge
                            color={
                                n.status === "running" ? "emerald" :
                                    n.status === "pending" ? "cyan" :
                                        n.status === "error" ? "danger" : "slate"
                            }
                            className="capitalize"
                        >
                            {n.status}
                        </Badge>
                    </div>
                    <div className="flex gap-3 text-xs text-slate-400">
                        <span>CPU: <span className="font-semibold text-white">{n.cpu}</span></span>
                        <span>GPU: <span className="font-semibold text-white">{n.gpu}</span></span>
                    </div>
                </div>
            ))}
        </div>
    );
}