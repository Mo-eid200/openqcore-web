import React from "react";
import { TrendingUp, Zap, DollarSign, AlertCircle } from "lucide-react";
import type { AnalyticsSummary as AnalyticsSummaryType } from "@/app/lib/api/workspace/analytics";

interface Props {
  summary?: AnalyticsSummaryType;
}

const cards = [
  {
    key:   "total_requests",
    label: "Total Requests",
    icon:  TrendingUp,
    color: "text-cyan-400",
    bg:    "bg-cyan-500/10 border-cyan-400/20",
    fmt:   (v: number) => v.toLocaleString(),
  },
  {
    key:   "total_tokens",
    label: "Total Tokens",
    icon:  Zap,
    color: "text-purple-400",
    bg:    "bg-purple-500/10 border-purple-400/20",
    fmt:   (v: number) => v.toLocaleString(),
  },
  {
    key:   "total_cost_usd",
    label: "Total Cost",
    icon:  DollarSign,
    color: "text-emerald-400",
    bg:    "bg-emerald-500/10 border-emerald-400/20",
    fmt:   (v: number) => `${v.toFixed(4)} USD`,
  },
  {
    key:   "total_errors",
    label: "Errors",
    icon:  AlertCircle,
    color: "text-red-400",
    bg:    "bg-red-500/10 border-red-400/20",
    fmt:   (v: number) => v.toLocaleString(),
  },
  {
    key:   "error_rate",
    label: "Error Rate",
    icon:  AlertCircle,
    color: "text-orange-400",
    bg:    "bg-orange-500/10 border-orange-400/20",
    fmt:   (v: number) => `${v.toFixed(2)}%`,
  },
];

export function AnalyticsSummary({ summary }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
      {cards.map(({ key, label, icon: Icon, color, bg, fmt }, i) => {
        const val = summary?.[key as keyof AnalyticsSummaryType] ?? 0;
        return (
          <div
            key={key}
            className="
              relative flex flex-col gap-3 p-5
              rounded-2xl border border-white/[0.06]
              bg-[#0d0d10]/95 backdrop-blur-xl
              overflow-hidden animate-fade-in-up
            "
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-wider text-white/30">
                {label}
              </span>
              <div className={`flex h-7 w-7 items-center justify-center rounded-lg border ${bg}`}>
                <Icon className={`w-3.5 h-3.5 ${color}`} />
              </div>
            </div>

            <div className="text-xl font-bold text-white tracking-tight">
              {fmt(Number(val))}
            </div>
          </div>
        );
      })}
    </div>
  );
}