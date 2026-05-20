import React from "react";

type Status = "pending" | "processing" | "ready" | "error";
const COLORS: Record<Status, string> = {
    pending: "bg-yellow-500/10 text-yellow-400",
    processing: "bg-blue-500/10 text-blue-400",
    ready: "bg-emerald-500/10 text-emerald-400",
    error: "bg-rose-500/10 text-rose-400",
};

export function EmbeddingStatus({ status }: { status: Status }) {
    return (
        <span className={`px-3 py-1 rounded-lg font-semibold text-xs ${COLORS[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}