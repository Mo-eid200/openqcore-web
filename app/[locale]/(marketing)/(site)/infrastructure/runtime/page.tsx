"use client";

import Lightbox from "../../../components/Lightbox";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  PrimaryCTA,
  SecondaryCTA,
} from "../../../components/common/CTAButtons";

function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="inline-flex whitespace-nowrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
      <span className="h-px w-6 bg-[#d4af37]/40" />
      {children}
    </p>
  );
}

export default function RealtimeRuntimePage() {
  const t = useTranslations("realtime_runtime_page");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const statusStrip = [
    {
      label: t("status.load.label"),
      value: t("status.load.value"),
    },
    {
      label: t("status.mode.label"),
      value: t("status.mode.value"),
    },
    {
      label: t("status.guardrails.label"),
      value: t("status.guardrails.value"),
    },
    {
      label: t("status.persistence.label"),
      value: t("status.persistence.value"),
    },
  ];

  const flow = t.raw("flow.steps") as string[];

  const controlPlane = [
    {
      title: t("control_plane.breaker.title"),
      body: t("control_plane.breaker.body"),
    },
    {
      title: t("control_plane.lock.title"),
      body: t("control_plane.lock.body"),
    },
    {
      title: t("control_plane.backpressure.title"),
      body: t("control_plane.backpressure.body"),
    },
  ];

  const compare = [
    {
      title: t("paths.streaming.title"),
      points: t.raw("paths.streaming.points") as string[],
    },
    {
      title: t("paths.non_streaming.title"),
      points: t.raw("paths.non_streaming.points") as string[],
    },
  ];

  const observability = t.raw("observability.items") as string[];

  return (
    <main className="min-h-screen bg-[#04070f] text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.05]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-28%] h-[920px] w-[1220px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(212,175,55,0.11),transparent_62%)]" />
          <div className="absolute right-[8%] top-[18%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.08),transparent_70%)]" />
          <div className="absolute left-[8%] bottom-[-80px] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.06),transparent_70%)]" />
        </div>

        <div className="mx-auto max-w-[1420px] px-6 pb-20 pt-28 md:pb-24 md:pt-40 lg:px-8">
  <div className="max-w-4xl">
    <div className="w-full">
      <div
        dir="ltr"
        className="flex w-full items-start justify-between gap-6"
      >
        <div className="shrink-0">
          <SectionLabel>{t("eyebrow")}</SectionLabel>
        </div>

        <div className="inline-flex shrink-0 whitespace-nowrap rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f5d97b] md:text-[11px]">
          {t("badge")}
        </div>
      </div>

      <h1 className="mt-8 max-w-4xl text-[clamp(2.6rem,6vw,5.15rem)] font-bold leading-[0.92] tracking-[-0.045em] text-white">
        {t("hero_title_1")}
        <br />
        {t("hero_title_2")}
      </h1>

      <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-[1.15rem]">
        {t("hero_description")}
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <PrimaryCTA href="/docs">
          {t("hero_primary_cta")}
        </PrimaryCTA>

        <SecondaryCTA href="/platform/infrastructure">
          {t("hero_secondary_cta")}
        </SecondaryCTA>
      </div>
    </div>
  </div>
</div>


        <div className="border-t border-white/[0.06] bg-[#0a1120]/72 backdrop-blur-sm">
          <div className="mx-auto grid max-w-[1420px] gap-0 px-6 md:grid-cols-4 lg:px-8">
            {statusStrip.map((s, i) => (
              <div
                key={i}
                className="border-b border-white/[0.06] px-4 py-6 md:border-b-0 md:border-e md:last:border-e-0"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {s.label}
                </p>
                <p
                  dir="ltr"
                  className="mt-2 text-xl font-bold text-white tabular-nums"
                >
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOW */}
      <section className="border-b border-white/[0.05] bg-[#060b16]">
        <div className="mx-auto max-w-[1420px] px-6 py-24 md:py-28 lg:px-8">
          <SectionLabel>{t("flow.label")}</SectionLabel>

          <h2 className="mt-5 max-w-4xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("flow.title")}
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            {t("flow.description")}
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {flow.map((step, i) => (
              <article
                key={i}
                className="rounded-3xl border border-white/[0.08] bg-[#0b1222] p-6 transition duration-300 hover:border-[#d4af37]/16 hover:bg-[#0d1527]"
              >
                <p
                  dir="ltr"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37] tabular-nums"
                >
                  {t("flow.step")} {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {step}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTROL PLANE */}
      <section className="border-b border-white/[0.05] bg-[#050911]">
        <div className="mx-auto max-w-[1420px] px-6 py-24 md:py-28 lg:px-8">
          <SectionLabel>{t("control_plane.label")}</SectionLabel>

          <h2 className="mt-5 max-w-4xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("control_plane.title")}
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {controlPlane.map((item, i) => (
              <article
                key={i}
                className="rounded-[28px] border border-white/[0.08] bg-[#0b1222] p-7 transition duration-300 hover:-translate-y-0.5 hover:border-[#d4af37]/18"
              >
                <h3 className="text-xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STREAMING VS NON-STREAMING */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className="mx-auto max-w-[1420px] px-6 py-24 md:py-28 lg:px-8">
          <SectionLabel>{t("paths.label")}</SectionLabel>

          <h2 className="mt-5 max-w-4xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("paths.title")}
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {compare.map((block, i) => (
              <article
                key={i}
                className="rounded-[30px] border border-white/[0.08] bg-[#0b1222] p-8 transition duration-300 hover:border-white/[0.14]"
              >
                <h3 className="text-2xl font-bold text-white">
                  {block.title}
                </h3>

                <ul className="mt-5 space-y-3 text-sm text-slate-300">
                  {block.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-1 text-[#d4af37]">•</span>
                      <span className="leading-7">{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OBSERVABILITY */}
      <section className="border-b border-white/[0.05] bg-[#050911]">
        <div className="mx-auto grid max-w-[1420px] gap-12 px-6 py-24 md:py-28 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:px-8">
          <div>
            <SectionLabel>{t("observability.label")}</SectionLabel>

            <h2 className="mt-5 max-w-3xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("observability.title")}
            </h2>

            <ul className="mt-8 space-y-4 text-slate-300">
              {observability.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3"
                >
                  <span className="mt-1 text-[#d4af37]">•</span>
                  <span className="leading-7">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_42%)] blur-3xl" />

            <div className="relative flex flex-col items-center">
              <button
                type="button"
                onClick={() => setOpenIndex(0)}
                className="group block w-full cursor-zoom-in"
                aria-label={t("identity.diagram_alt")}
              >
                <Image
                  src="/engines/runtime-graph.png"
                  alt={t("identity.diagram_alt")}
                  width={1200}
                  height={760}
                  className="mx-auto h-auto w-full max-w-[860px] object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.34)] transition duration-500 group-hover:scale-[1.01] group-hover:opacity-95"
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#060b16]">
        <div className="mx-auto max-w-[1420px] px-6 py-24 text-center md:py-28 lg:px-8">
          <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("cta.title")}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            {t("cta.description")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PrimaryCTA href="/docs">
              {t("cta.primary")}
            </PrimaryCTA>

            <SecondaryCTA href="/platform">
              {t("cta.secondary")}
            </SecondaryCTA>
          </div>
        </div>
      </section>

      <Lightbox
        items={[
          {
            src: "/engines/runtime-graph.png",
            alt: t("identity.diagram_alt"),
          },
        ]}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
      />
    </main>
  );
}