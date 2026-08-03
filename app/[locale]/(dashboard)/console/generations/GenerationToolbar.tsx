"use client";

import React from "react";
import { Plus, Sparkles, Zap } from "lucide-react";

type Props = {
  onCreate?: () => void;
  total?: number;
};

export default function GenerationToolbar({
  onCreate,
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

      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        {typeof total === "number" && (
          <div
            className="
              flex items-center gap-2 rounded-2xl
              border border-white/[0.06]
              bg-[#0f1012]/92 px-3.5 py-2.5
              shadow-[0_8px_24px_rgba(0,0,0,0.14)]
              backdrop-blur-xl
            "
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-300/10 bg-amber-300/[0.08]">
              <Sparkles className="h-4 w-4 text-amber-300/75" />
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-wide text-white/30">
                Total
              </div>
              <div className="text-sm font-bold text-white">
                {total}
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={onCreate}
          className="
            inline-flex h-11 items-center justify-center gap-2
            rounded-xl bg-amber-300 px-5
            text-sm font-semibold text-black
            shadow-[0_8px_24px_rgba(251,191,36,0.18)]
            transition-all duration-200
            hover:scale-[1.01] hover:bg-amber-200
            active:scale-[0.99]
          "
        >
          <Plus className="h-4 w-4" />
          New Generation
        </button>
      </div>
    </section>
  );
}