"use client";

import React from "react";
import {
  Rocket,
  ImageIcon,
  AudioLines,
  Bot,
  Zap,
  Clock,
} from "lucide-react";

type CardData = {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
  tint: string;
};

type Props = {
  totalRequests: number;
  totalTokensIn: number;
  totalTokensOut: number;
  totalImages: number;
  totalVoice: number;
  totalAgents: number;
  avgLatency: number;
};

export default function UsageCards({
  totalRequests,
  totalTokensIn,
  totalTokensOut,
  totalImages,
  totalVoice,
  totalAgents,
  avgLatency,
}: Props) {
  const cards: CardData[] = [
    {
      label: "Total Requests",
      value: totalRequests.toLocaleString(),
      icon: Rocket,
      color: "text-emerald-200",
      tint: "bg-emerald-300/[0.08] border-emerald-300/10",
    },
    {
      label: "Tokens Used",
      value: (totalTokensIn + totalTokensOut).toLocaleString(),
      icon: Zap,
      color: "text-amber-200",
      tint: "bg-amber-300/[0.08] border-amber-300/10",
    },
    {
      label: "Images Generated",
      value: totalImages.toLocaleString(),
      icon: ImageIcon,
      color: "text-orange-200",
      tint: "bg-orange-300/[0.08] border-orange-300/10",
    },
    {
      label: "Voice Clips",
      value: totalVoice.toLocaleString(),
      icon: AudioLines,
      color: "text-violet-200",
      tint: "bg-violet-300/[0.08] border-violet-300/10",
    },
    {
      label: "Active Agents",
      value: totalAgents.toLocaleString(),
      icon: Bot,
      color: "text-cyan-200",
      tint: "bg-cyan-300/[0.08] border-cyan-300/10",
    },
    {
      label: "Avg Latency",
      value: `${avgLatency}ms`,
      icon: Clock,
      color: "text-rose-200",
      tint: "bg-rose-300/[0.08] border-rose-300/10",
    },
  ];

  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 2xl:grid-cols-6">
      {cards.map((c) => {
        const Icon = c.icon;

        return (
          <article
            key={c.label}
            className="
              group relative overflow-hidden rounded-2xl
              border border-white/[0.06]
              bg-[#0f1012]/92 p-4
              shadow-[0_14px_34px_rgba(0,0,0,0.16)]
              backdrop-blur-xl
              transition-all duration-300
              hover:-translate-y-0.5
              hover:shadow-[0_18px_44px_rgba(0,0,0,0.22)]
              hover:border-white/[0.08]
            "
          >
            {/* Atmosphere */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute right-[-32px] top-[-36px] h-[90px] w-[90px] rounded-full bg-white/[0.02] blur-[50px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.02),transparent_34%)]" />
            </div>

            {/* Top accent */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.10] to-transparent" />

            <div className="relative flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/35">
                  {c.label}
                </p>

                <div className="mt-3 text-xl font-bold tracking-tight text-white">
                  {c.value}
                </div>
              </div>

              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${c.tint}`}
              >
                <Icon className={`h-4 w-4 ${c.color}`} />
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}