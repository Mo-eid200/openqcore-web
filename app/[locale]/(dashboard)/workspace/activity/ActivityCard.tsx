import React from "react";
import { Cpu, CheckCircle2, AlertCircle, Info } from "lucide-react";
import type { WorkspaceActivityEvent } from "../../../../lib/api/workspace/activity";

function formatTime(ts: string) {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)   return "just now";
  if (mins < 60)  return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs  < 24)  return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function statusConfig(status: string) {
  switch (status) {
    case "success": return {
      icon:  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />,
      badge: "bg-emerald-500/10 border-emerald-400/20 text-emerald-300",
      label: "Success",
    };
    case "danger": return {
      icon:  <AlertCircle className="w-3.5 h-3.5 text-red-400" />,
      badge: "bg-red-500/10 border-red-400/20 text-red-300",
      label: "Error",
    };
    default: return {
      icon:  <Info className="w-3.5 h-3.5 text-cyan-400" />,
      badge: "bg-cyan-500/10 border-cyan-400/20 text-cyan-300",
      label: "Info",
    };
  }
}

export function ActivityCard({ activity }: { activity: WorkspaceActivityEvent }) {
  const cfg = statusConfig(activity.status);

  return (
    <div className="
      rounded-2xl border border-white/[0.06]
      bg-[#0d0d10]/95 backdrop-blur-xl
      px-4 py-3.5 flex items-start gap-3
      hover:bg-white/[0.02] transition-colors
    ">
      {/* Icon */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] mt-0.5">
        <Cpu className="w-3.5 h-3.5 text-white/30" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[13px] font-medium text-white truncate">{activity.title}</span>
          <span className={`shrink-0 flex items-center gap-1 px-1.5 py-0.5 rounded-full border text-[10px] font-medium ${cfg.badge}`}>
            {cfg.icon}
            {cfg.label}
          </span>
        </div>
        {activity.description && (
          <div className="text-[12px] text-white/40 truncate">{activity.description}</div>
        )}
      </div>

      {/* Time */}
      <span className="shrink-0 text-[11px] text-white/25 mt-0.5">
        {formatTime(activity.timestamp)}
      </span>
    </div>
  );
}