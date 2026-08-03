"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import Lightbox from "../../../components/Lightbox";
import {
  PrimaryCTA,
  SecondaryCTA,
} from "../../../components/common/CTAButtons";

function SectionKicker({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="inline-flex shrink-0 whitespace-nowrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
      <span className="h-px w-6 bg-[#d4af37]/40" />
      {children}
    </p>
  );
}

type GalleryItem = { src: string; alt: string };

export default function MultimodalStackPage() {
  const t = useTranslations("multimodal_stack_page");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeLane, setActiveLane] = useState(0);

  const chips = t.raw("hero.chips") as string[];
  const lanes = t.raw("routing.lanes") as Array<{
    modality: string;
    trigger: string;
    route: string;
    engine: string;
  }>;
  const timeouts = t.raw("provider.timeouts") as Array<{
    type: string;
    timeout: string;
    note: string;
  }>;
  const chains = t.raw("provider.fallbacks") as Array<{
    primary: string;
    chain: string;
  }>;
  const outputCards = t.raw("outputs.cards") as Array<{
    title: string;
    desc: string;
  }>;
  const streamSteps = t.raw("paths.streaming") as string[];
  const nonStreamSteps = t.raw("paths.non_streaming") as string[];

  const gallery = useMemo<GalleryItem[]>(
    () => [
      {
        src: "/engines/multimodal-hero.png",
        alt: t("gallery.images.hero_alt"),
      },
      {
        src: "/engines/multimodal-routing-matrix.png",
        alt: t("gallery.images.routing_alt"),
      },
      {
        src: "/engines/multimodal-provider-layer.png",
        alt: t("gallery.images.provider_alt"),
      },
      {
        src: "/engines/multimodal-output-contract.png",
        alt: t("gallery.images.output_alt"),
      },
    ],
    [t]
  );

  const active = lanes[activeLane] ?? lanes[0];

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };

    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <main className="min-h-screen bg-[#03060f] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/[0.05]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-12%] top-[-30%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.18),transparent_65%)]" />
          <div className="absolute right-[-12%] top-[0%] h-[680px] w-[680px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.14),transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_30%)]" />
        </div>

        <div className="relative mx-auto grid max-w-[1420px] items-center gap-10 px-6 pb-20 pt-28 md:pb-24 md:pt-40 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7">
            <SectionKicker>{t("hero.kicker")}</SectionKicker>

            <h1 className="mt-8 max-w-4xl text-[clamp(2.4rem,5.5vw,5rem)] font-bold leading-[0.9] tracking-[-0.04em] text-white">
              {t("hero.title_1")}
              <br />
              {t("hero.title_2")}
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              {t("hero.desc")}
            </p>

            <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 md:grid-cols-3">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-center text-[11px] font-semibold text-slate-200"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <PrimaryCTA href="/docs">
                {t("hero.primary_cta")}
              </PrimaryCTA>

              <SecondaryCTA href="/infrastructure/runtime">
                {t("hero.secondary_cta")}
              </SecondaryCTA>
            </div>
          </div>

          <div className="lg:col-span-5">
            <button
              type="button"
              onClick={() => setOpenIndex(0)}
              className="group w-full overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#0b1222] p-3 shadow-[0_20px_70px_rgba(0,0,0,0.28)]"
              aria-label={t("gallery.images.hero_alt")}
            >
              <Image
                src="/engines/multimodal-hero.png"
                alt={t("gallery.images.hero_alt")}
                width={900}
                height={620}
                className="h-auto w-full rounded-[22px] object-contain transition duration-300 group-hover:scale-[1.015]"
                priority
              />
            </button>
          </div>
        </div>
      </section>

      {/* ROUTING MATRIX */}
      <section className="relative overflow-hidden border-b border-white/[0.05] bg-[#050916]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(1000px_450px_at_5%_-10%,rgba(56,189,248,0.16),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_450px_at_100%_120%,rgba(212,175,55,0.12),transparent_55%)]" />
        </div>

        <div className="relative mx-auto max-w-[1420px] px-6 py-24 md:py-28 lg:px-8">
          <SectionKicker>{t("routing.kicker")}</SectionKicker>

          <h2 className="mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("routing.title")}
          </h2>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
            {t("routing.desc")}
          </p>

          <div className="mt-12 grid gap-6 xl:grid-cols-12">
            <aside className="xl:col-span-4 rounded-[30px] border border-white/[0.08] bg-[#0a1222]/90 p-3">
              <p className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Lanes
              </p>

              <div className="space-y-2">
                {lanes.map((row, i) => {
                  const isActive = i === activeLane;

                  return (
                    <button
                      key={`${row.modality}-${i}`}
                      type="button"
                      onClick={() => setActiveLane(i)}
                      className={`w-full rounded-2xl border px-4 py-3 text-start transition ${
                        isActive
                          ? "border-[#d4af37]/35 bg-[#d4af37]/10"
                          : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.16]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p
                          className={`text-sm font-semibold ${
                            isActive ? "text-[#f8df94]" : "text-white"
                          }`}
                        >
                          {row.modality}
                        </p>

                        <span
                          dir="ltr"
                          className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 font-mono tabular-nums"
                        >
                          #{String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <p className="mt-1 line-clamp-1 text-xs text-slate-400">
                        {row.route}
                      </p>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className="xl:col-span-8 rounded-[30px] border border-white/[0.08] bg-[linear-gradient(180deg,#0b1326_0%,#091121_100%)] p-6 md:p-7">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    {t("routing.cols.modality")}
                  </p>
                  <h3 className="mt-1 text-2xl font-bold text-white">
                    {active?.modality}
                  </h3>
                </div>

                <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-200">
                  Live Route Preview
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-500">
                    {t("routing.cols.trigger")}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    {active?.trigger}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-500">
                    {t("routing.cols.route")}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    {active?.route}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#d4af37]/30 bg-[#d4af37]/10 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#f5d97b]/90">
                    {t("routing.cols.engine")}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[#ffe9a6]">
                    {active?.engine}
                  </p>
                </div>
              </div>

              <div className="mt-6 hidden items-center gap-3 md:flex">
                <span className="h-2 w-2 rounded-full bg-cyan-300" />
                <span className="h-px flex-1 bg-white/20" />
                <span className="rounded-full border border-white/[0.08] bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-300">
                  dispatch pipeline
                </span>
                <span className="h-px flex-1 bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-[#d4af37]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROVIDER INTELLIGENCE */}
      <section className="relative overflow-hidden border-b border-white/[0.05] bg-[#040913]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(900px_400px_at_0%_100%,rgba(16,185,129,0.10),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_400px_at_100%_0%,rgba(168,85,247,0.10),transparent_55%)]" />
        </div>

        <div className="relative mx-auto max-w-[1420px] px-6 py-24 md:py-28 lg:px-8">
          <div className="grid gap-6 xl:grid-cols-12">
            <div className="xl:col-span-5 rounded-[30px] border border-white/[0.08] bg-[linear-gradient(180deg,#0b1222_0%,#09101f_100%)] p-6 md:p-7">
              <SectionKicker>{t("provider.kicker_timeouts")}</SectionKicker>
              <h3 className="mt-4 text-2xl font-bold text-white">
                {t("provider.title_timeouts")}
              </h3>

              <div className="mt-7 space-y-4">
                {timeouts.map((x, i) => {
                  const secs =
                    Number(String(x.timeout).replace("s", "")) || 0;
                  const max = 300;
                  const width = Math.max(
                    8,
                    Math.min(100, (secs / max) * 100)
                  );

                  const color =
                    i % 5 === 0
                      ? "from-cyan-400 to-sky-500"
                      : i % 5 === 1
                      ? "from-violet-400 to-fuchsia-500"
                      : i % 5 === 2
                      ? "from-emerald-400 to-teal-500"
                      : i % 5 === 3
                      ? "from-amber-400 to-orange-500"
                      : "from-rose-400 to-pink-500";

                  return (
                    <div
                      key={x.type}
                      className="rounded-2xl border border-white/[0.08] bg-black/20 p-4"
                    >
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-white">
                          {x.type}
                        </p>

                        <span
                          dir="ltr"
                          className="rounded-full border border-white/[0.08] bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-300 font-mono tabular-nums"
                        >
                          {x.timeout}
                        </span>
                      </div>

                      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${color} shadow-[0_0_20px_rgba(255,255,255,0.15)]`}
                          style={{ width: `${width}%` }}
                        />
                      </div>

                      <p className="mt-2 text-xs text-slate-400">
                        {x.note}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="xl:col-span-7 rounded-[30px] border border-white/[0.08] bg-[linear-gradient(180deg,#0d1326_0%,#0a1020_100%)] p-6 md:p-7">
              <SectionKicker>{t("provider.kicker_fallbacks")}</SectionKicker>
              <h3 className="mt-4 text-2xl font-bold text-white">
                {t("provider.title_fallbacks")}
              </h3>

              <div className="mt-7 space-y-3">
                {chains.map((x, i) => {
                  const parts = x.chain
                    .split("→")
                    .map((s) => s.trim());

                  return (
                    <div
                      key={`${x.primary}-${i}`}
                      className="rounded-2xl border border-white/[0.08] bg-black/20 p-4"
                    >
                      <p className="mb-3 text-sm font-semibold text-white">
                        {x.primary}
                      </p>

                      <div
                        dir="ltr"
                        className="flex flex-wrap items-center gap-2"
                      >
                        {parts.map((p, idx) => (
                          <div
                            key={`${p}-${idx}`}
                            className="flex items-center gap-2"
                          >
                            <span className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-200">
                              {p}
                            </span>

                            {idx < parts.length - 1 && (
                              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[11px] text-[#f4d781]">
                                →
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-cyan-200">
                  Primary
                </span>
                <span className="rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-amber-200">
                  Fallback Hop
                </span>
                <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-emerald-200">
                  Execution Target
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DUAL PATH */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className="mx-auto max-w-[1420px] px-6 py-24 md:py-28 lg:px-8">
          <SectionKicker>{t("paths.kicker")}</SectionKicker>

          <h2 className="mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("paths.title")}
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-[30px] border border-emerald-300/20 bg-emerald-400/[0.06] p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
                {t("paths.streaming_label")}
              </p>

              <ul className="mt-4 space-y-2 text-sm text-slate-200">
                {streamSteps.map((s) => (
                  <li key={s}>• {s}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-[30px] border border-sky-300/20 bg-sky-400/[0.06] p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">
                {t("paths.non_streaming_label")}
              </p>

              <ul className="mt-4 space-y-2 text-sm text-slate-200">
                {nonStreamSteps.map((s) => (
                  <li key={s}>• {s}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* OUTPUT CONTRACT + GALLERY */}
      <section className="border-b border-white/[0.05] bg-[#050911]">
        <div className="mx-auto max-w-[1420px] px-6 py-24 md:py-28 lg:px-8">
          <SectionKicker>{t("outputs.kicker")}</SectionKicker>

          <h2 className="mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("outputs.title")}
          </h2>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
            {t("outputs.desc")}
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {outputCards.map((c) => (
              <article
                key={c.title}
                className="rounded-[28px] border border-white/[0.08] bg-[#0b1222] p-6"
              >
                <h3 className="text-xl font-bold text-white">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {c.desc}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {gallery.map((g, i) => (
              <button
                key={g.src}
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0b1222] p-2"
                aria-label={g.alt}
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  width={680}
                  height={420}
                  className="h-auto w-full rounded-[20px] object-contain transition duration-300 group-hover:scale-[1.02]"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#060b16]">
        <div className="mx-auto max-w-[1420px] px-6 py-24 text-center md:py-28 lg:px-8">
          <h2 className="mx-auto max-w-4xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("cta.title")}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            {t("cta.desc")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PrimaryCTA href="/docs">
              {t("cta.primary")}
            </PrimaryCTA>

            <SecondaryCTA href="/infrastructure">
              {t("cta.secondary")}
            </SecondaryCTA>
          </div>
        </div>
      </section>

      <Lightbox
        items={gallery}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
      />
    </main>
  );
}