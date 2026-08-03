import React from "react";
import { Cpu, Trash2, Zap } from "lucide-react";

type Node = {
  id:     string;
  name:   string;
  type:   string;
  status: "running" | "pending" | "error" | "offline";
  cpu:    string;
  gpu:    string;
};

const statusConfig = {
  running: { label: "Running", cls: "bg-emerald-500/10 border-emerald-400/20 text-emerald-300", dot: "bg-emerald-400" },
  pending: { label: "Pending", cls: "bg-cyan-500/10 border-cyan-400/20 text-cyan-300",          dot: "bg-cyan-400 animate-pulse" },
  error:   { label: "Error",   cls: "bg-red-500/10 border-red-400/20 text-red-300",             dot: "bg-red-400"   },
  offline: { label: "Offline", cls: "bg-white/[0.05] border-white/[0.08] text-white/40",        dot: "bg-white/20"  },
};

export function NodeStatusGrid({
  nodes,
  onDelete,
}: {
  nodes:     Node[];
  onDelete?: (id: string) => void;
}) {
  if (!nodes.length) {
    return (
      <div className="flex items-center justify-center py-12 rounded-2xl border border-white/[0.06] bg-white/[0.02] text-white/20 text-sm">
        No nodes deployed
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {nodes.map((n, i) => {
        const cfg = statusConfig[n.status] ?? statusConfig.offline;
        return (
          <div
            key={n.id}
            className="
              group relative flex flex-col gap-3 p-4
              rounded-2xl border border-white/[0.06]
              bg-[#0d0d10]/95 backdrop-blur-xl
              hover:border-white/[0.10] transition-all
              overflow-hidden
              animate-fade-in-up
            "
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.05]">
                  <Cpu className="w-3.5 h-3.5 text-white/40" />
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-white truncate">{n.name || n.type}</div>
                  <div className="text-[11px] text-white/30 font-mono truncate">{n.type}</div>
                </div>
              </div>

              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(n.id)}
                  className="opacity-0 group-hover:opacity-100 flex h-6 w-6 items-center justify-center rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Status */}
            <span className={`flex items-center gap-1.5 w-fit px-2 py-0.5 rounded-full border text-[10px] font-medium ${cfg.cls}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
              {cfg.label}
            </span>

            {/* Stats */}
            <div className="flex items-center gap-3 pt-1 border-t border-white/[0.04]">
              <div className="flex items-center gap-1.5">
                <Cpu className="w-3 h-3 text-white/20" />
                <span className="text-[11px] text-white/30">CPU</span>
                <span className="text-[11px] font-medium text-white">{n.cpu}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-white/20" />
                <span className="text-[11px] text-white/30">GPU</span>
                <span className="text-[11px] font-medium text-white">{n.gpu}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}