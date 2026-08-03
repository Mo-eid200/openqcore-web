import React from "react";
import { Bot, Cpu } from "lucide-react";
import type { AgentPerformance } from "@/app/lib/api/workspace/analytics";

const statusConfig = {
  active:   "bg-emerald-500/10 border-emerald-400/20 text-emerald-300",
  idle:     "bg-white/[0.05] border-white/[0.08] text-white/40",
  inactive: "bg-white/[0.05] border-white/[0.08] text-white/30",
  error:    "bg-red-500/10 border-red-400/20 text-red-300",
};

export function AgentPerformanceTable({ agents = [] }: { agents?: AgentPerformance[] }) {
  if (!agents.length) {
    return (
      <div className="
        flex flex-col items-center justify-center py-16 gap-3
        rounded-2xl border border-white/[0.06] bg-[#0d0d10]/95
      ">
        <Bot className="w-8 h-8 text-white/20" />
        <p className="text-sm text-white/30">No agent data yet</p>
      </div>
    );
  }

  return (
    <div className="
      rounded-2xl border border-white/[0.06]
      bg-[#0d0d10]/95 backdrop-blur-xl
      overflow-hidden
    ">
      <div className="px-5 py-3.5 border-b border-white/[0.05]">
        <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/30">
          Agent Performance
        </span>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/[0.04]">
            {["Agent", "Requests", "Tokens", "Errors", "Status"].map(h => (
              <th key={h} className="px-5 py-2.5 text-[10px] font-medium uppercase tracking-wider text-white/25">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {agents.map((a, i) => {
            const scls = statusConfig[a.status as keyof typeof statusConfig] ?? statusConfig.idle;
            return (
              <tr
                key={a.id}
                className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors animate-fade-in-up"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {/* Agent */}
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/10 shrink-0">
                      <Bot className="w-3.5 h-3.5 text-red-400" />
                    </div>
                    <div>
                      <div className="text-[13px] font-medium text-white">{a.name}</div>
                      <div className="text-[10px] text-white/30 flex items-center gap-1">
                        <Cpu className="w-2.5 h-2.5" />
                        {a.model}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Requests */}
                <td className="px-5 py-3 text-[13px] text-white/60">
                  {a.requests.toLocaleString()}
                </td>

                {/* Tokens */}
                <td className="px-5 py-3 text-[13px] text-white/60">
                  {a.tokens.toLocaleString()}
                </td>

                {/* Errors */}
                <td className="px-5 py-3 text-[13px] text-red-400/70">
                  {a.errors > 0 ? a.errors.toLocaleString() : "—"}
                </td>

                {/* Status */}
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 rounded-full border text-[10px] font-medium ${scls}`}>
                    {a.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}