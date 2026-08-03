import React from "react";
import { Server, Trash2 } from "lucide-react";

type Cluster = {
  id:      string;
  name:    string;
  region:  string;
  status:  "operational" | "maintenance" | "degraded";
  nodes:   number;
  updated: string;
};

const statusConfig = {
  operational: { label: "Operational", cls: "bg-emerald-500/10 border-emerald-400/20 text-emerald-300", dot: "bg-emerald-400",          glow: "via-emerald-500/10" },
  maintenance: { label: "Maintenance", cls: "bg-cyan-500/10 border-cyan-400/20 text-cyan-300",          dot: "bg-cyan-400 animate-pulse", glow: "via-cyan-500/10"    },
  degraded:    { label: "Degraded",    cls: "bg-red-500/10 border-red-400/20 text-red-300",             dot: "bg-red-400",               glow: "via-red-500/10"     },
};

export function ClusterCard({
  cluster,
  onDelete,
}: {
  cluster:   Cluster;
  onDelete?: () => void;
}) {
  const cfg = statusConfig[cluster.status] ?? statusConfig.operational;

  return (
    <div className="
      group relative flex flex-col gap-4 p-5
      rounded-2xl border border-white/[0.06]
      bg-[#0d0d10]/95 backdrop-blur-xl
      transition-all duration-200
      hover:border-white/[0.12] hover:bg-white/[0.02]
      overflow-hidden
    ">
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${cfg.glow} to-transparent`} />

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.06]">
            <Server className="w-4 h-4 text-white/40" />
          </div>
          <div className="min-w-0">
            <div className="text-[14px] font-semibold text-white truncate">{cluster.name}</div>
            <div className="text-[11px] text-white/30 font-mono">{cluster.region}</div>
          </div>
        </div>

        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="opacity-0 group-hover:opacity-100 flex h-7 w-7 items-center justify-center rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center gap-2">
        <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-medium ${cfg.cls}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </span>
        <span className="text-[11px] text-white/30">
          {cluster.nodes} node{cluster.nodes !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-white/[0.04]">
        <span className="text-[11px] text-white/20">Updated {cluster.updated}</span>
      </div>
    </div>
  );
}