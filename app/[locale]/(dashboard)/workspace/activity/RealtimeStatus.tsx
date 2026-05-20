import React from "react";
import { Badge } from "../../components/ui/Badge";
import { Bot, Server } from "lucide-react";

export function RealtimeStatus() {
    return (
        <div className="flex items-center gap-5 bg-[#192037]/80 rounded-xl border border-white/10 px-6 py-3 mb-8">
            <span className="flex items-center gap-2 text-white font-bold">
                <Bot className="w-5 h-5 text-emerald-400" />
                Agents <Badge color="emerald">All Healthy</Badge>
            </span>
            <span className="flex items-center gap-2 text-white font-bold">
                <Server className="w-4 h-4 text-cyan-400" />
                API <Badge color="cyan">Operational</Badge>
            </span>
            <span className="ml-auto text-xs text-slate-400">Last updated: just now</span>
        </div>
    );
}