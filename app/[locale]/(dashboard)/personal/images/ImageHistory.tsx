"use client";
import React from "react";
import type { ImageItem } from "./types";
import { Image } from "lucide-react";

function StatusBadge({ status }: { status: ImageItem["status"] }) {
    if (status === "ready") return <span className="px-2 py-0.5 rounded font-semibold text-[11px] bg-emerald-500/90 text-white">Ready</span>;
    if (status === "pending") return <span className="px-2 py-0.5 rounded font-semibold text-[11px] bg-yellow-400/90 text-yellow-900">Pending</span>;
    return <span className="px-2 py-0.5 rounded font-semibold text-[11px] bg-red-600/90 text-white">Failed</span>;
}

export default function ImageHistory({ items }: { items: ImageItem[] }) {
    if (!items?.length) return <div className="py-12 text-center text-amber-100/60">No images yet.</div>;
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {items.map(item => (
                <div key={item.id} className="
          group flex flex-col rounded-xl border border-amber-500/15
          bg-[#181106]/80 backdrop-blur-xl shadow p-3
          hover:border-amber-400/30 hover:shadow-amber-300/10 transition
        ">
                    <div className="w-full flex-1 aspect-[5/4] bg-black/10 rounded-lg flex items-center justify-center overflow-hidden mb-2 border border-amber-500/10">
                        {item.status === "ready" ? (
                            <img src={item.url} loading="lazy" alt={item.prompt} className="object-cover w-full h-full rounded-lg" />
                        ) : (
                            <Image className="w-8 h-8 text-amber-400/60" />
                        )}
                    </div>
                    <div className="font-bold text-white text-xs truncate">{item.prompt}</div>
                    <div className="flex items-center mt-2 gap-2">
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