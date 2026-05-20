"use client";
import React from "react";
import type { ApiUsageStat } from "./types";

export default function ApiUsageChart({ data }: { data: ApiUsageStat[] }) {
    // dummy: 7 days expected
    const max = Math.max(...data.map(d => d.count), 1);
    return (
        <div className="bg-[#181106]/90 border border-amber-600/20 rounded-xl p-4 shadow flex flex-col">
            <div className="mb-2 font-bold text-amber-100/90 text-sm">Usage (Last 7 Days)</div>
            <div className="flex items-end h-24 gap-2">
                {data.map((d, idx) => (
                    <div key={idx} className="flex flex-col items-center flex-1">
                        <div
                            className="bg-amber-400/80 rounded-t"
                            style={{
                                height: `${Math.round((d.count / max) * 80) || 3}px`,
                                minHeight: 4,
                                width: "85%",
                                transition: "all 0.2s"
                            }}
                            title={d.count + " calls"}
                        />
                        <span className="text-[10px] text-amber-100/50 pt-1">{new Date(d.date).getDate()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}