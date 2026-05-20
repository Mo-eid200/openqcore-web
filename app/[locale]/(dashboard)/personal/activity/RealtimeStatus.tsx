"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export default function RealtimeStatus() {
    const status = "Active";

    return (
        <div
            className="
        flex items-center gap-2
        px-3 py-2
        mt-5 lg:mt-7
        rounded-lg
        bg-[#120d05]/80
        border border-amber-500/10
        backdrop-blur-xl
        shadow-[0_2px_10px_rgba(0,0,0,0.12)]
        text-white
        text-sm
      "
        >
            <span className="rounded bg-amber-400/20 p-1.5 flex items-center">
                <Sparkles className="w-4 h-4 text-amber-400" />
            </span>
            <span className="font-medium">Realtime Status:</span>
            <span className="text-amber-400 font-bold">{status}</span>
            <span className="ml-auto text-[11px] text-amber-100/60">All AI Systems Operational</span>
        </div>
    );
}