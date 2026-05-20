"use client";
import React from "react";

export function KnowledgeStatusBadge({ status }: { status: string }) {
    const map: Record<string, { text: string; color: string }> = {
        processed: { text: "Processed", color: "bg-emerald-500/70 text-white" },
        pending: { text: "Processing", color: "bg-yellow-400/60 text-white-900" },
        failed: { text: "Failed", color: "bg-red-500/70 text-white" },
    };
    const props = map[status] || map["pending"];
    return (
        <span className={`px-2 py-0.5 rounded font-semibold text-[11px] ${props.color}`}>
            {props.text}
        </span>
    );
}