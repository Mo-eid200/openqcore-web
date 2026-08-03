"use client";

import { useTranslations } from "next-intl";
import { Globe, Cpu, Terminal, MessageSquare } from "lucide-react";

interface EcosystemLayer {
  id: string;
  icon: React.ElementType;
  status: "live" | "in_development";
}

const layers: EcosystemLayer[] = [
  { id: "software", icon: MessageSquare, status: "live" },
  { id: "browser", icon: Globe, status: "in_development" },
  { id: "hardware", icon: Cpu, status: "in_development" },
  { id: "os", icon: Terminal, status: "in_development" },
];

export default function EcosystemSection() {
  const t = useTranslations("ecosystem_section");

  return (
    <section className="py-24 md:py-32">
      <div className="container-app">
        <div className="mb-14 max-w-3xl md:mb-16">
          <span className="text-sm uppercase tracking-[0.3em] text-[#d4af37]">
            {t("eyebrow")}
          </span>

          <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            {t("heading_line1")}
            <br />
            {t("heading_line2")}
          </h2>

          <p className="mt-6 max-w-2xl text-base text-white/60 sm:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {layers.map((layer) => {
            const Icon = layer.icon;
            const isLive = layer.status === "live";

            return (
              <div
                key={layer.id}
                className="
                  group relative overflow-hidden rounded-3xl
                  border border-white/10 bg-white/[0.02]
                  p-7 transition-colors duration-300
                  hover:border-[#d6ad32]/25
                "
              >
                {/* subtle top highlight — matches the premium card
                    treatment used on the security page, for a more
                    polished/global feel than a flat border alone */}
                <div
                  aria-hidden
                  className="
                    pointer-events-none absolute inset-x-6 top-0
                    h-px bg-gradient-to-r
                    from-transparent via-white/[0.14] to-transparent
                  "
                />

                <div className="flex items-center justify-between">
                  <div
                    className="
                      flex h-12 w-12 items-center justify-center
                      rounded-2xl border border-white/10 bg-white/[0.03]
                      text-white/70 transition-all duration-300
                      group-hover:border-[#d6ad32]/30 group-hover:bg-[#d6ad32]/10 group-hover:text-[#d6ad32]
                    "
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>

                  {/* 🎨 POLISH: added a status dot (pulsing for Live,
                      static for In Development) — matches the
                      dot-accent convention used elsewhere on the site
                      (SectionLabel, hero trust badges) instead of a
                      flat text-only pill. */}
                  <span
                    className={`
                      inline-flex items-center gap-1.5 rounded-full px-2.5 py-1
                      text-[10px] font-medium uppercase tracking-[0.12em]
                      ${
                        isLive
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-white/[0.06] text-white/40"
                      }
                    `}
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      {isLive && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                      )}
                      <span
                        className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                          isLive ? "bg-emerald-400" : "bg-white/40"
                        }`}
                      />
                    </span>
                    {t(`status.${layer.status}`)}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-semibold text-white">
                  {t(`layers.${layer.id}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {t(`layers.${layer.id}.desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}