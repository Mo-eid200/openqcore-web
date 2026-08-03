"use client";

import React, { useState } from "react";
import { AudioLines, Search, Sparkles } from "lucide-react";

type Props = {
  onSearch?: (q: string) => void;
  total?: number;
  ready?: number;
  pending?: number;
};

export default function VoiceToolbar({
  onSearch,
  total,
  ready,
  pending,
}: Props) {
  const [query, setQuery] = useState("");

  return (
    <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      {/* Left */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-amber-300/80">
          <Sparkles className="h-3.5 w-3.5" />
          Audio Engine
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white lg:text-3xl">
            Voice Studio
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/45">
            Browse and manage all voice recordings, text-to-speech outputs,
            and audio transcriptions.
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        {typeof total === "number" && (
          <div
            className="
              flex flex-wrap items-center gap-4 rounded-2xl
              border border-white/[0.06]
              bg-[#0f1012]/92 px-4 py-2.5
              shadow-[0_8px_24px_rgba(0,0,0,0.14)]
              backdrop-blur-xl
            "
          >
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-300/10 bg-amber-300/[0.08]">
                <AudioLines className="h-4 w-4 text-amber-300/70" />
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

            {typeof ready === "number" && (
              <div>
                <div className="text-[10px] uppercase tracking-wide text-emerald-200/45">
                  Ready
                </div>
                <div className="text-sm font-bold text-emerald-200">
                  {ready}
                </div>
              </div>
            )}

            {typeof pending === "number" && pending > 0 && (
              <div>
                <div className="text-[10px] uppercase tracking-wide text-amber-300/45">
                  Pending
                </div>
                <div className="text-sm font-bold text-amber-300">
                  {pending}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/20" />

          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch?.(e.target.value);
            }}
            placeholder="Search voice clips..."
            className="
              h-10 w-full rounded-xl border border-white/[0.08]
              bg-[#0f1012]/92 pl-9 pr-3 text-xs text-white
              outline-none placeholder:text-white/20
              shadow-[0_8px_24px_rgba(0,0,0,0.12)]
              transition-all
              focus:border-amber-300/12 focus:bg-[#111214]/96
              sm:w-56
            "
          />
        </div>
      </div>
    </section>
  );
}