import React from "react";
import { Info, CheckCircle2, AlertCircle, AlertTriangle } from "lucide-react";

type Log = {
  id:      string;
  level:   "info" | "success" | "danger" | "warning";
  message: string;
  time:    string;
};

const levelConfig = {
  info:    { icon: <Info          className="w-3.5 h-3.5 text-cyan-400"    />, cls: "bg-cyan-500/10 border-cyan-400/20 text-cyan-300",       label: "Info"    },
  success: { icon: <CheckCircle2  className="w-3.5 h-3.5 text-emerald-400" />, cls: "bg-emerald-500/10 border-emerald-400/20 text-emerald-300", label: "Success" },
  danger:  { icon: <AlertCircle   className="w-3.5 h-3.5 text-red-400"     />, cls: "bg-red-500/10 border-red-400/20 text-red-300",           label: "Error"   },
  warning: { icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-400"   />, cls: "bg-amber-500/10 border-amber-400/20 text-amber-300",     label: "Warning" },
};

export function DeploymentLogs({ logs = [] }: { logs?: Log[] }) {
  return (
    <div className="
      relative flex flex-col
      rounded-2xl border border-white/[0.06]
      bg-[#0d0d10]/95 backdrop-blur-xl
      overflow-hidden
    ">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Header */}
      <div className="px-5 py-3.5 border-b border-white/[0.05]">
        <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/30">
          Deployment Logs
        </span>
      </div>

      {/* Logs */}
      {logs.length === 0 ? (
        <div className="flex items-center justify-center py-12 text-white/20 text-sm">
          No deployment logs yet
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-white/[0.04]">
          {logs.map((log) => {
            const cfg = levelConfig[log.level] ?? levelConfig.info;
            return (
              <div
                key={log.id}
                className="flex items-start gap-3 px-5 py-3 hover:bg-white/[0.02] transition-colors"
              >
                {/* Level badge */}
                <span className={`
                  shrink-0 flex items-center gap-1 px-1.5 py-0.5
                  rounded-full border text-[10px] font-medium mt-0.5
                  ${cfg.cls}
                `}>
                  {cfg.icon}
                  {cfg.label}
                </span>

                {/* Message */}
                <span className="flex-1 text-[12px] text-white/60 leading-relaxed">
                  {log.message}
                </span>

                {/* Time */}
                <span className="shrink-0 text-[11px] text-white/20 mt-0.5">
                  {log.time}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}