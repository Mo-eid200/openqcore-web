"use client";
import React from "react";
import type { VoiceItem } from "./types";
import { AudioLines, Music } from "lucide-react";

function StatusBadge({ status }: { status: VoiceItem["status"] }) {
    if (status === "ready") return <span className="px-2 py-0.5 rounded font-semibold text-[11px] bg-emerald-500/90 text-white">Ready</span>;
    if (status === "pending") return <span className="px-2 py-0.5 rounded font-semibold text-[11px] bg-yellow-400/85 text-yellow-900">Pending</span>;
    return <span className="px-2 py-0.5 rounded font-semibold text-[11px] bg-red-600/90 text-white">Failed</span>;
}

export default function VoiceHistory({ items }: { items: VoiceItem[] }) {
    if (!items?.length) return <div className="py-12 text-center text-amber-100/60">No voice entries yet.</div>;
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {items.map(item => (
                <div key={item.id} className="
          group flex flex-col rounded-xl border border-amber-500/15
          bg-[#181106]/80 backdrop-blur-xl shadow p-3
          hover:border-amber-400/30 hover:shadow-amber-300/10 transition
        ">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-amber-300 bg-amber-400/10 border border-amber-300/10">
                            <AudioLines className="w-5 h-5" />
                        </div>
                        <div className="font-bold text-white text-[15px] truncate flex-1">{item.title}</div>
                        <span className="text-xs text-amber-100/70">{item.duration ?? "--:--"}</span>
                    </div>
                    {item.url ? (
                        <audio
                            controls
                            src={item.url}
                            className="w-full rounded mt-1 mb-2 bg-black/5"
                        />
                    ) : (
                        <div className="w-full rounded mt-1 mb-2 py-4 text-center text-xs text-amber-100/50 border border-dashed border-amber-500/10">
                            Audio unavailable
                        </div>
                    )}
                    {item.transcript && (
                        <div className="text-xs text-amber-100/80 mb-1 italic max-h-10 overflow-y-auto">
                            {item.transcript}
                        </div>
                    )}
                    <div className="flex items-center mt-1 gap-2">
                        <StatusBadge status={item.status} />
                        <span className="text-[10px] text-amber-100/60 ml-auto">{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                    {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                            {item.tags.map(tag => (
                                <span key={tag} className="bg-amber-400/10 text-amber-300 text-[10px] rounded px-2 py-0.5 font-semibold">{tag}</span>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}