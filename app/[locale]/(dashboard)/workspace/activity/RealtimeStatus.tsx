import React from "react";
import { Bot, Server } from "lucide-react";
import type { WorkspaceRealtimeStatus } from "../../../../lib/api/workspace/activity";

interface Props {
  status?: WorkspaceRealtimeStatus;
}

export function RealtimeStatus({ status }: Props) {
  const agentsHealthy = status?.agents.status === "healthy";
  const apiOperational = status?.api.status === "operational";

  return (
    <div className="
      flex flex-wrap items-center gap-5
      rounded-2xl border border-white/[0.06]
      bg-[#0d0d10]/95 backdrop-blur-xl
      px-6 py-3 mb-8
      relative overflow-hidden
    ">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Agents */}
      <span className="flex items-center gap-2 text-sm font-medium text-white">
        <Bot className={`w-4 h-4 ${agentsHealthy ? "text-emerald-400" : "text-red-400"}`} />
        Agents
        <span className={`
          px-2 py-0.5 rounded-full text-[10px] font-semibold border
          ${agentsHealthy
            ? "bg-emerald-500/10 border-emerald-400/20 text-emerald-300"
            : "bg-red-500/10 border-red-400/20 text-red-300"
          }
        `}>
          {status
            ? agentsHealthy
              ? `${status.agents.active} Active`
              : `${status.agents.down} Down`
            : "—"
          }
        </span>
      </span>

      {/* API */}
      <span className="flex items-center gap-2 text-sm font-medium text-white">
        <Server className={`w-4 h-4 ${apiOperational ? "text-cyan-400" : "text-red-400"}`} />
        API
        <span className={`
          px-2 py-0.5 rounded-full text-[10px] font-semibold border
          ${apiOperational
            ? "bg-cyan-500/10 border-cyan-400/20 text-cyan-300"
            : "bg-red-500/10 border-red-400/20 text-red-300"
          }
        `}>
          {apiOperational ? "Operational" : `${status?.api.errors ?? 0} Errors`}
        </span>
      </span>

      {/* Last updated */}
      <span className="ml-auto text-[11px] text-white/25">
        {status?.last_updated ?? "—"}
      </span>
    </div>
  );
}