import React from "react";
import { Zap, Bot, BarChart3, Key } from "lucide-react";
import type { RealtimeEvent } from "@/app/lib/api/workspace/analytics";

const typeConfig = {
  api: {
    icon:  <Key      className="w-3.5 h-3.5 text-cyan-400"     />,
    cls:   "bg-cyan-500/10 border-cyan-400/20 text-cyan-300",
    label: "API",
  },
  agent: {
    icon:  <Bot      className="w-3.5 h-3.5 text-emerald-400"  />,
    cls:   "bg-emerald-500/10 border-emerald-400/20 text-emerald-300",
    label: "Agent",
  },
  error: {
    icon:  <Zap      className="w-3.5 h-3.5 text-red-400"      />,
    cls:   "bg-red-500/10 border-red-400/20 text-red-300",
    label: "Error",
  },
  usage: {
    icon:  <BarChart3 className="w-3.5 h-3.5 text-amber-400"   />,
    cls:   "bg-amber-500/10 border-amber-400/20 text-amber-300",
    label: "Usage",
  },
};

function formatTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const secs = Math.floor(diff / 1000);
  if (secs < 60)  return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60)  return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ago`;
}

export function RealtimeActivity({ events = [] }: { events?: RealtimeEvent[] }) {
  return (
    <div className="
      relative flex flex-col
      rounded-2xl border border-white/[0.06]
      bg-[#0d0d10]/95 backdrop-blur-xl
      overflow-hidden
    ">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.05]">
        <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/30">
          Realtime Activity
        </span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-white/25">Live</span>
        </div>
      </div>

      {/* Events */}
      {events.length === 0 ? (
        <div className="flex items-center justify-center py-12 text-white/20 text-sm">
          No activity yet
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-white/[0.04] max-h-[320px] overflow-y-auto">
          {events.map((e, i) => {
            const cfg = typeConfig[e.type as keyof typeof typeConfig] ?? typeConfig.api;
            return (
              <div
                key={e.id}
                className="flex items-start gap-3 px-5 py-3 hover:bg-white/[0.02] transition-colors animate-fade-in-up"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                {/* Type badge */}
                <span className={`
                  shrink-0 flex items-center gap-1 px-1.5 py-0.5
                  rounded-full border text-[10px] font-medium mt-0.5
                  ${cfg.cls}
                `}>
                  {cfg.icon}
                  {cfg.label}
                </span>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] text-white/60 truncate">{e.title}</div>
                  {e.info && (
                    <div className="text-[11px] text-white/30 truncate mt-0.5">{e.info}</div>
                  )}
                </div>

                {/* Time */}
                <span className="shrink-0 text-[11px] text-white/20 mt-0.5">
                  {formatTime(e.time)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}