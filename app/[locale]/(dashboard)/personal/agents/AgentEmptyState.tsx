"use client";
import React from "react";
import { Cpu } from "lucide-react";

export default function AgentEmptyState({ onNew }: { onNew?: () => void }) {
    return (
        <div className="flex flex-col items-center text-center py-16">
            <Cpu className="w-12 h-12 text-amber-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No agents found</h3>
            <p className="text-sm text-gray-400 mb-5">Get started by creating your first AI agent.</p>
            <button
                onClick={onNew}
                className="px-4 py-2 rounded-lg bg-amber-400 text-black font-semibold text-xs shadow hover:bg-amber-300 transition"
            >
                + Create Agent
            </button>
        </div>
    );
}