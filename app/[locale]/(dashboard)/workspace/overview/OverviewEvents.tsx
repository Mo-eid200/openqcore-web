import React from "react";
import { Cpu, CheckCircle2, AlertCircle, Info } from "lucide-react";
import type { WorkspaceEvent } from "../../../../lib/api/workspace/overview";

interface Props {
  events?: WorkspaceEvent[];
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

function formatTime(ts: string) {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60)  return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs  < 24)  return `${hrs} hr ago`;
  return `${Math.floor(hrs / 24)} days ago`;
}

export default function OverviewEvents({ events }: Props) {
  const list = events ?? [];

  return (
    <section className="w-full">
      <div className="
        rounded-2xl border border-white/[0.06]
        bg-[#0d0d10]/95 backdrop-blur-xl
        overflow-hidden
      ">
        <div className="px-5 py-3.5 border-b border-white/[0.05]">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/30">
            Recent Events
          </span>
        </div>

        {list.length === 0 ? (
          <div className="flex items-center justify-center py-16 text-white/20 text-sm">
            No events yet
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-white/[0.04]">
            {list.map((e) => {
              const cfg = statusConfig(e.status);
              return (
                <div key={e.id} className="flex items-start gap-3 px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] mt-0.5">
                    <Cpu className="w-3.5 h-3.5 text-white/40" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[13px] font-medium text-white truncate">{e.title}</span>
                      <span className={`shrink-0 flex items-center gap-1 px-1.5 py-0.5 rounded-full border text-[10px] font-medium ${cfg.badge}`}>
                        {cfg.icon}
                        {cfg.label}
                      </span>
                    </div>
                    <div className="text-[12px] text-white/40 truncate">{e.description}</div>
                    <div className="text-[11px] text-white/25 mt-0.5">{formatTime(e.timestamp)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}