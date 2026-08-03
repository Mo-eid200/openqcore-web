import React from "react";
import { BarChart3 } from "lucide-react";

type RateLimit = {
  scope:  string;
  limit:  string;
  window: string;
  used:   string;
};

export function RateLimitCard({ rate }: { rate: RateLimit }) {
  return (
    <div className="
      relative flex flex-col gap-3 p-5
      rounded-2xl border border-white/[0.06]
      bg-[#0d0d10]/95 backdrop-blur-xl
      overflow-hidden
    ">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.05]">
          <BarChart3 className="w-3.5 h-3.5 text-white/40" />
        </div>
        <span className="text-[13px] font-semibold text-white">{rate.scope}</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] text-white/25 uppercase tracking-wider">Limit</span>
          <span className="text-[12px] font-medium text-white">{rate.limit}</span>
        </div>
        <div className="w-px h-6 bg-white/[0.06]" />
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] text-white/25 uppercase tracking-wider">Window</span>
          <span className="text-[12px] font-medium text-white">{rate.window}</span>
        </div>
        <div className="w-px h-6 bg-white/[0.06]" />
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] text-white/25 uppercase tracking-wider">Used</span>
          <span className="text-[12px] font-medium text-white">{rate.used}</span>
        </div>
      </div>
    </div>
  );
}