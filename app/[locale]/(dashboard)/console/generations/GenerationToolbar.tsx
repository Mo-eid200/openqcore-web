"use client";

import React from "react";
import { Sparkles, Zap } from "lucide-react";

type Props = {
  total?: number;
};

export default function GenerationToolbar({
  total,
}: Props) {
  return (
    <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-amber-300/80">
          <Zap className="h-3.5 w-3.5" />
          AI Playground
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white lg:text-3xl">
            Generations
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/45">
            Run AI prompts, save results, and build your personal library of
            generated content — code, copy, summaries, and more.
          </p>
        </div>
      </div>

      {/* 🔧 "New Generation" button removed — one trigger elsewhere
          (e.g. the empty-state CTA) is enough; having it duplicated
          here too was redundant. Total stat card now stands alone,
          so it's given a touch more presence to avoid feeling like
          a leftover fragment on its own. */}
      {typeof total === "number" && (
        <div
          className="
            flex items-center gap-3 self-start rounded-2xl
            border border-white/[0.06]
            bg-[#0f1012]/92 px-4 py-3
            shadow-[0_8px_24px_rgba(0,0,0,0.14)]
            backdrop-blur-xl
            lg:self-auto
          "
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-300/10 bg-amber-300/[0.08]">
            <Sparkles className="h-4 w-4 text-amber-300/75" />
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-wide text-white/30">
              Total Generations
            </div>
            <div className="text-base font-bold text-white">
              {total.toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}