"use client";

import React from "react";
import AgentStatusBadge from "./AgentStatusBadge";
import type { Agent } from "./types";

export default function AgentCard({ agent }: { agent: Agent }) {
    const Icon = agent.icon;
    return (
        <div className="
      group relative flex flex-col rounded-xl border border-amber-500/10
      bg-[#110d05]/85 backdrop-blur-xl shadow p-4
      hover:border-amber-400/20 hover:shadow-lg transition
    ">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-amber-300 bg-amber-400/10 border border-amber-300/10">
                    <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="font-bold text-white text-base truncate">{agent.name}</div>
                    <div className="text-xs text-amber-100/60 leading-tight truncate">{agent.role}</div>
                </div>
            </div>
            <div className="mt-2 text-xs text-gray-300 min-h-[36px]">{agent.description}</div>
            <div className="flex items-center mt-2 gap-2">
                <AgentStatusBadge status={agent.status} />
                <span className="text-[10px] text-gray-500 ml-auto">{new Date(agent.createdAt).toLocaleDateString()}</span>
            </div>
            {agent.tags && agent.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                    {agent.tags.map(tag => (
                        <span key={tag} className="bg-white/5 text-amber-400 text-[10px] rounded px-2 py-0.5 font-semibold">
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}