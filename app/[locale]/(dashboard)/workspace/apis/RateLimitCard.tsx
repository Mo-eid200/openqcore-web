import React from "react";
import { BarChart3 } from "lucide-react";

type RateLimit = {
    scope: string;
    limit: string;
    window: string;
    used: string;
};

export function RateLimitCard({ rate }: { rate: RateLimit }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-[#191e2c]/90 px-6 py-6 mb-3 flex flex-col shadow hover:shadow-lg">
            <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="w-5 h-5 text-[#d4af37]" />
                <div className="font-bold text-white">{rate.scope}</div>
            </div>
            <div className="flex items-center gap-4 text-xs mt-4">
                <span className="text-slate-400">
                    Limit: <span className="font-bold text-white">{rate.limit}</span>
                </span>
                <span className="text-slate-400">
                    Window: <span className="font-bold text-white">{rate.window}</span>
                </span>
                <span className="text-slate-400">
                    Used: <span className="font-bold text-white">{rate.used}</span>
                </span>
            </div>
        </div>
    );
}