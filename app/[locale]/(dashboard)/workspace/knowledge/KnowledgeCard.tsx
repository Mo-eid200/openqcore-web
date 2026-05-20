import React from "react";
import { EmbeddingStatus } from "./EmbeddingStatus";
import { MoreVertical } from "lucide-react";

type KnowledgeSource = {
    id: string;
    name: string;
    type: string;
    size: string;
    uploadedAt: string;
    status: "pending" | "processing" | "ready" | "error";
    embeddings: number;
    onDropDown?: () => void;
};

export function KnowledgeCard({ source, onMenu }: { source: KnowledgeSource; onMenu?: () => void }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-[#171b26]/90 px-6 py-5 flex flex-col shadow hover:shadow-lg relative group transition">
            <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                    <div className="text-white text-[16px] font-bold truncate mb-1">{source.name}</div>
                    <div className="text-xs text-slate-400 font-mono mb-1">{source.type}{source.size ? ` • ${source.size}` : ""}</div>
                </div>
                <button
                    onClick={onMenu}
                    className="p-2 rounded-lg text-slate-400 hover:text-[#d4af37] transition"
                    tabIndex={-1}
                >
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
                <EmbeddingStatus status={source.status} />
                <span className="text-xs text-slate-500">Embeddings: <span className="font-semibold text-white">{source.embeddings}</span></span>
            </div>
            <div className="text-xs text-slate-500 mt-2">{source.uploadedAt && `Uploaded: ${source.uploadedAt}`}</div>
        </div>
    );
}