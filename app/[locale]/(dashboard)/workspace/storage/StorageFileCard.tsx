import React from "react";
import { Badge } from "../../components/ui/Badge";
import { MoreVertical, Download } from "lucide-react";

type File = {
    id: string;
    name: string;
    type: string;
    size: string;
    updated: string;
    bucket: string;
    status: "available" | "processing" | "error";
};

export function StorageFileCard({ file, onMenu }: { file: File; onMenu?: () => void }) {
    const color = file.status === "available"
        ? "emerald" : file.status === "processing"
            ? "cyan" : "danger";
    return (
        <div className="rounded-2xl border border-white/10 bg-[#181e29]/95 p-5 flex flex-col gap-2 shadow hover:shadow-lg group relative transition">
            <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                    <div className="text-white text-[16px] font-bold truncate">{file.name}</div>
                    <div className="text-xs text-slate-400 font-mono mb-1">{file.type} • {file.size}</div>
                    <span className="text-xs text-slate-500">Bucket: {file.bucket}</span>
                </div>
                <button
                    onClick={onMenu}
                    className="p-2 rounded-lg text-slate-400 hover:text-[#d4af37] transition"
                    tabIndex={-1}
                >
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>
            <div className="flex items-center gap-2">
                <Badge color={color}>{file.status}</Badge>
                <button title="Download" className="ml-auto p-1 rounded hover:bg-[#ffe68c1a]">
                    <Download className="w-4 h-4 text-[#d4af37]" />
                </button>
            </div>
            <div className="text-xs text-slate-500 mt-1">{file.updated && `Updated: ${file.updated}`}</div>
        </div>
    );
}