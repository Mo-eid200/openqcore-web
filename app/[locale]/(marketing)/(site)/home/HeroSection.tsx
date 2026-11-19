"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

/* ─── Architecture node ───────────────────────────────────────────────────── */



/* ─── Page ────────────────────────────────────────────────────────────────── */

const pillKeys = ["multimodal", "orchestration", "memory", "voice"] as const;

export default function HeroSection() {
  const t = useTranslations("hero_section");

  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-[#050911]">

      {/* ── Ambient background ── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.10),transparent_45%)]" />
        <div className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-[#d4af37]/[0.07] blur-[180px]" />
        <div className="absolute left-[12%] top-[18%] h-[280px] w-[280px] rounded-full bg-[#d4af37]/[0.04] blur-[120px]" />
        <div className="absolute right-[12%] top-[24%] h-[260px] w-[260px] rounded-full bg-blue-500/[0.04] blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col items-center justify-center py-24">

          {/* ── Heading ── */}
          <h1
            className="
              max-w-5xl
              text-center
              text-4xl
              font-bold
              leading-[1]
              tracking-[-0.05em]
              text-white
              md:text-6xl
              xl:text-7xl
            "
          >
            {t("heading_line1")}
            <br />
            <span className="text-white">{t("heading_systems")}</span>{" "}
            <span className="text-[#d4af37]">{t("heading_scale")}</span>
          </h1>

          <div className="mt-6 mb-6 flex justify-center">
            <Image
              src="/engines/corelogo.webp"
              alt="OpenQCore"
              width={128}
              height={128}
              className="h-24 w-24 object-contain opacity-95 md:h-32 md:w-32"
            />
          </div>

          {/* ── Description ── */}
          <div className="mx-auto mt-6 max-w-3xl text-center">
            {/* 🔧 FIX: removed `whitespace-nowrap` -- on narrow viewports
                this would have forced the full sentence onto one line,
                causing horizontal overflow/clipping instead of wrapping
                naturally. Also tightened the copy to stop repeating
                "production-grade" / "global scale" verbatim right after
                the heading says the same thing. */}
            <p className="mx-auto mt-4 text-center text-xl text-slate-400 md:text-xl">
              <span className="font-semibold text-white">{t("brand_name")}</span>{" "}
              {t("desc")}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {pillKeys.map((key, i) => (
                <span key={key} className="contents">
                  {i > 0 && <span className="text-slate-600">•</span>}
                  <span className="text-[#d4af37]">{t(`pills.${key}`)}</span>
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}