import React from "react";
import type { GenerationItem } from "./types";
import { Sparkles } from "lucide-react";

export default function GenerationCard({ item }: { item: GenerationItem }) {
    return (
        <div className="
            group relative flex flex-col rounded-xl border border-amber-500/20
            bg-[#191106]/95 backdrop-blur-xl shadow p-4 min-w-[260px] max-w-[340px]
            transition
            hover:border-amber-400 hover:shadow-[0_4px_30px_0_rgba(251,191,36,0.10)]
        ">
            <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-amber-300 bg-amber-400/10 border border-amber-300/20">
                    <Sparkles className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="font-bold text-white text-[15px] truncate">{item.title}</div>
                    {item.model && <div className="text-[11px] text-amber-100/70">{item.model}</div>}
                </div>
            </div>
            <div className="text-xs italic text-amber-100/70 mt-0.5 mb-1">{item.prompt}</div>
            <div className="
                mt-1 bg-black/15 rounded p-2 text-[13px] text-white font-mono
                max-h-[72px] overflow-auto
            ">
                {item.result}
            </div>
            <div className="flex items-center mt-2 gap-2">
                {item.status === "success" && (
                    <span className="px-2 py-0.5 rounded font-semibold text-[11px] bg-emerald-500/80 text-black">Success</span>
                )}
                {item.status === "pending" && (
                    <span className="px-2 py-0.5 rounded font-semibold text-[11px] bg-yellow-400/80 text-yellow-950">Pending</span>
                )}
                {item.status === "failed" && (
                    <span className="px-2 py-0.5 rounded font-semibold text-[11px] bg-red-600/70 text-white">Failed</span>
                )}
                <span className="text-[10px] text-amber-100/60 ml-auto">{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
            {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                    {item.tags.map(tag => (
                        <span
                            key={tag}
                            className="bg-amber-400/10 text-amber-400 text-[10px] rounded px-2 py-0.5 font-semibold"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}