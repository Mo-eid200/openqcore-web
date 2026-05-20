"use client";
import React from "react";
import type { KnowledgeItem } from "./types";
import { FileText, File, Globe, FileSearch, FileQuestion } from "lucide-react";
import { KnowledgeStatusBadge } from "./KnowledgeStatusBadge";

// أيقونات حسب النوع
const iconMap: Record<KnowledgeItem["type"], any> = {
    pdf: FileText,
    doc: File,
    url: Globe,
    snippet: FileSearch,
    faq: FileQuestion,
};

export default function KnowledgeCard({ item }: { item: KnowledgeItem }) {
    const Icon = iconMap[item.type] || FileText;

    return (
        <div className="
      group relative flex flex-col rounded-xl border border-amber-500/15
      bg-[#181106]/80 backdrop-blur-xl shadow p-3
      hover:border-amber-400/40 hover:shadow-amber-400/10 transition
    ">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-amber-300 bg-amber-400/10 border border-amber-300/10">
                    <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="font-bold text-white text-[13px] truncate">{item.title}</div>
                    <div className="text-xs text-amber-100/80 leading-tight truncate">{item.type.toUpperCase()}</div>
                </div>
            </div>
            <div className="mt-2 text-xs text-amber-100/70 min-h-[30px]">{item.description}</div>
            <div className="flex items-center mt-2 gap-2">
                <KnowledgeStatusBadge status={item.status} />
                <span className="text-[10px] text-amber-100/50 ml-auto">
                    {item.uploadedAt ? new Date(item.uploadedAt).toLocaleDateString() : ""}
                </span>
            </div>
            {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                    {item.tags.map(tag => (
                        <span
                            key={tag}
                            className="bg-amber-400/10 text-amber-300 text-[10px] rounded px-2 py-0.5 font-semibold"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}