"use client";
import React from "react";

export default function AgentsToolbar({ onNew }: { onNew?: () => void }) {
    return (
        <div className="flex flex-wrap items-end justify-between gap-2 pb-4">
            <div>
                <h1 className="text-xl font-bold text-white">
                    Your AI Agents
                </h1>

                <p className="text-xs text-gray-400 mt-1">
                    Manage, create, or edit your personal AI agents
                </p>
            </div>

            <button
                className="h-8 px-4 rounded-lg bg-amber-400 text-black font-semibold text-xs shadow-sm hover:bg-amber-300 transition"
                onClick={onNew}
            >
                + Create Agent
            </button>
        </div>
    );
}