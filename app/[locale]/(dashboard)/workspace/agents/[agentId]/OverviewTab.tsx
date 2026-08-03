"use client";

import React from "react";
import { Cpu, Thermometer, Zap } from "lucide-react";
import type { WorkspaceAgent } from "@/app/lib/api/workspace/agents";

export function OverviewTab({ agent }: { agent: WorkspaceAgent }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d10]/95 p-5">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/35">
            Description
          </h3>
          <p className="text-sm leading-7 text-white/65">
            {agent.description || "No description provided."}
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d10]/95 p-5">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/35">
            System Prompt
          </h3>
          <pre className="whitespace-pre-wrap text-sm leading-7 text-white/60 font-mono">
            {agent.system_prompt || "No system prompt set."}
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d10]/95 p-4">
          <div className="flex items-center gap-2 text-xs text-white/40">
            <Cpu className="h-3.5 w-3.5" /> Model
          </div>
          <div className="mt-1 text-sm font-semibold text-white">
            {agent.model || "Not set"}
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d10]/95 p-4">
          <div className="flex items-center gap-2 text-xs text-white/40">
            <Thermometer className="h-3.5 w-3.5" /> Temperature
          </div>
          <div className="mt-1 text-sm font-semibold text-white">
            {agent.temperature ?? "—"}
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d10]/95 p-4">
          <div className="flex items-center gap-2 text-xs text-white/40">
            <Zap className="h-3.5 w-3.5" /> Runs / Tokens
          </div>
          <div className="mt-1 text-sm font-semibold text-white">
            {(agent.runs ?? 0).toLocaleString()} / {(agent.tokens ?? 0).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
