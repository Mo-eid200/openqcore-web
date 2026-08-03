"use client";

import { useState } from "react";
import RuntimeHeroVisual from "../../components/RuntimeHeroVisual";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Cpu, FlaskConical, Code2, Building2, ShieldCheck, BarChart3 } from "lucide-react";

interface Capability {
  id: string;
  href: string;
  icon: React.ElementType;
}

const capabilities: Capability[] = [
  { id: "models", href: "/platform/models", icon: Cpu },
  { id: "studio", href: "/platform/studio", icon: FlaskConical },
  { id: "api", href: "/docs/api", icon: Code2 },
  { id: "enterprise", href: "/platform/enterprise", icon: Building2 },
  { id: "security", href: "/solutions/security", icon: ShieldCheck },
  { id: "analytics", href: "/platform/analytics", icon: BarChart3 },
];

const tagKeys = ["multi_model", "enterprise_ready", "global_scale"] as const;

export default function RuntimeSection() {
  const t = useTranslations("runtime_section");
  const [hoveredCapability, setHoveredCapability] = useState<string | null>(null);

  return (
    <section className="py-24 md:py-32">
      <div className="container-app">
        {/* Header */}
        <div className="mb-12 max-w-3xl md:mb-16">
          <h2 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            {t("heading_line1")}
            <br />
            {t("heading_line2")}
          </h2>

          <p className="mt-6 text-base text-white/60 sm:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {/* Runtime Hero */}
          <Link
            href="/platform"
            className="
              group relative h-full min-h-[420px] overflow-hidden
              rounded-3xl border border-white/10
              bg-white/[0.03]
              lg:col-span-2 lg:min-h-[560px]
            "
          >
            <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-[1.04]">
               <RuntimeHeroVisual hovered={hoveredCapability} onHover={setHoveredCapability} />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/45 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />

            <div className="relative flex h-full flex-col justify-end p-8 md:p-10">
              <span className="mb-4 text-xs uppercase tracking-[0.35em] text-[#d6ad32]">
                {t("hero_kicker")}
              </span>

              <h3 className="max-w-3xl text-3xl font-bold sm:text-4xl md:text-5xl">
                {t("hero_title")}
              </h3>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
                {t("hero_desc")}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {tagKeys.map((key) => (
                  <span
                    key={key}
                    className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white/75 backdrop-blur-md"
                  >
                    {t(`tags.${key}`)}
                  </span>
                ))}
              </div>
            </div>
          </Link>

          {/* Capability Panel */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.015]">
            <div className="flex h-full flex-col">
              <div className="border-b border-white/10 px-6 py-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/40">
                    {t("panel_label")}
                  </span>
                  <span className="text-xs text-[#d6ad32]">{t("panel_explore")}</span>
                </div>
              </div>

              <div className="flex flex-1 flex-col">
                {capabilities.map((card, index) => {
  const Icon = card.icon;
  const isHighlighted = hoveredCapability === card.id;
  return (
    <Link
      key={card.id}
      href={card.href}
      onMouseEnter={() => setHoveredCapability(card.id)}
      onMouseLeave={() => setHoveredCapability(null)}
      className={`
        group relative
        flex flex-1 items-center
        px-6 py-5
        transition-all duration-300
        hover:bg-white/[0.035]
        focus-visible:bg-white/[0.05] focus-visible:outline-none
        ${isHighlighted ? "bg-white/[0.035]" : ""}
        ${index !== capabilities.length - 1 ? "border-b border-white/[0.07]" : ""}
      `}
    >
      <div
        className={`absolute bottom-0 left-0 top-0 w-[2px] bg-[#d6ad32] transition-transform duration-300 ${
          isHighlighted ? "scale-y-100" : "scale-y-0"
        } group-hover:scale-y-100 group-focus-visible:scale-y-100`}
      />

                      <div className="flex w-full items-center gap-4">
                        <div
  className={`
    flex h-11 w-11 shrink-0 items-center justify-center
    rounded-xl border border-white/10 bg-white/[0.025]
    text-white/60
    transition-all duration-300
    group-hover:border-[#d6ad32]/30 group-hover:bg-[#d6ad32]/10 group-hover:text-[#d6ad32]
    ${isHighlighted ? "border-[#d6ad32]/30 bg-[#d6ad32]/10 text-[#d6ad32]" : ""}
  `}
>
  <Icon className="h-5 w-5" strokeWidth={1.75} />
</div>

<div className="min-w-0 flex-1">
  <div className="flex items-center justify-between gap-4">
    <h4
      className={`text-lg font-semibold text-white transition-colors duration-300 group-hover:text-[#e2bc43] ${
        isHighlighted ? "text-[#e2bc43]" : ""
      }`}
    >
      {t(`capabilities.${card.id}.title`)}
    </h4>

                            <span className="translate-x-0 text-lg text-white/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#d6ad32]">
                              ↗
                            </span>
                          </div>

                          <p className="mt-1 text-sm leading-relaxed text-white/45">
                            {t(`capabilities.${card.id}.desc`)}
                          </p>

                          <span className="mt-2 block text-[10px] uppercase tracking-[0.18em] text-white/25">
                            {t(`capabilities.${card.id}.meta`)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}