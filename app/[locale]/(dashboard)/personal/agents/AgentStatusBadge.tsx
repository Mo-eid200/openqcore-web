"use client";
import React from "react";

type Status = "online" | "offline" | "pending" | "error";
const STATUS: Record<Status, { text: string; color: string }> = {
    online: { text: "Online", color: "bg-emerald-500/80 text-white" },
    offline: { text: "Offline", color: "bg-gray-400/30 text-gray-400" },
    pending: { text: "Pending", color: "bg-yellow-400/40 text-white" },
    error: { text: "Error", color: "bg-red-500/80 text-white" },
};

export default function AgentStatusBadge({ status }: { status: Status }) {
    const label = STATUS[status];
    return (
        <span className={`px-2 py-0.5 rounded font-semibold text-xs ${label.color}`}>
            {label.text}
        </span>
    );
}