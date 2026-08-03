"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const pillarKeys = ["ai_platforms", "enterprise_systems", "white_label"] as const;

export default function CTASection() {
  const t = useTranslations("cta_section");

  return (
    <section className="cta-section relative overflow-hidden pt-10 pb-8 md:pt-12 md:pb-10">
      <div className="container-app relative z-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
          {/* Eyebrow */}
          <span className="text-sm uppercase tracking-[0.35em] text-white/60">{t("eyebrow")}</span>

          {/* Hero statement */}
          <h2 className="mt-7 text-6xl font-bold leading-[1.02] tracking-tight md:text-[7rem] lg:text-[8rem]">
            {t("title_line1")}
            <br />
            {t("title_line2")}
          </h2>

          {/* Description */}
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/55 md:text-xl">
            {t("desc")}
          </p>

          {/* Divider */}
          <div className="mt-14 h-px w-24 bg-white/15" />

          {/* Pillars */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-10">
            {pillarKeys.map((key) => (
              <span key={key} className="text-base uppercase tracking-[0.22em] text-white/85 md:text-lg">
                {t(`pillars.${key}`)}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="mt-10 h-px w-24 bg-white/15" />

          {/* Power statement */}
          <p className="mt-14 text-3xl font-light leading-tight text-white/90 md:text-4xl">
            {t("power_line1")}
            <br />
            {t("power_line2")}
          </p>

          {/* CTAs */}
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/start"
              className="
                cta-primary inline-flex items-center justify-center
                rounded-full bg-gradient-to-r from-[#d4af37] to-[#e7c766]
                px-9 py-4 text-base font-semibold text-[#0B1F3B]
                transition-transform duration-200 hover:scale-[1.02]
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]
              "
            >
              {t("cta_primary")}
            </Link>

            <Link
              href="/contact"
              className="
                inline-flex items-center justify-center
                rounded-full border border-white/20
                px-9 py-4 text-base font-semibold text-white/85
                transition-colors duration-200 hover:border-white/40 hover:text-white
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60
              "
            >
              {t("cta_secondary")}
            </Link>
          </div>

          <div className="mt-14 flex justify-center">
            <Image
              src="/oqc-logo.png"
              alt="OpenQCore"
              width={112}
              height={112}
              className="h-20 w-20 object-contain opacity-40 md:h-24 md:w-24"
            />
          </div>
        </div>
      </div>
    </section>
  );
}