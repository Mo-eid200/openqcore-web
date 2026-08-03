import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ImageWithLightbox from "../../components/common/ImageWithLightbox";
import {
  PrimaryCTA,
  SecondaryCTA,
} from "../../components/common/CTAButtons";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "research_page.seo",
  });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords")
      .split(",")
      .map((k) => k.trim()),
    openGraph: {
      title: t("og_title"),
      description: t("og_description"),
      type: "website",
      url: "https://openqcore.com/research",
      siteName: "OpenQCore",
    },
    twitter: {
      card: "summary_large_image",
      title: t("og_title"),
      description: t("og_description"),
    },
    alternates: {
      canonical: "https://openqcore.com/research",
      languages: {
        en: "https://openqcore.com/en/research",
        ar: "https://openqcore.com/ar/research",
      },
    },
  };
}

const wrap = "mx-auto w-full max-w-[1420px] px-6 lg:px-8";

function SectionLabel({
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

function ArrowIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      className={`h-4 w-4 rtl:rotate-180 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </svg>
  );
}

const focusAreas = [
  "ai_systems",
  "voice_intelligence",
  "multimodal_intelligence",
  "ai_safety",
] as const;

const infra = [
  "pulse_engine",
  "memory_systems",
  "realtime_runtime",
  "voice_stack",
  "multimodal_stack",
] as const;

const openResearch = [
  "datasets",
  "benchmarks",
  "evaluation",
  "tooling",
] as const;

const principles = [
  "rigor",
  "reproducibility",
  "responsible",
  "impact",
] as const;

const timeline = [
  "y2026_launch",
  "y2026_reports",
  "y2027_peer_reviewed",
  "y2027_plus_collab",
] as const;

const collaborations = [
  "universities",
  "labs",
  "independent",
  "industry",
] as const;

const flowSteps = [
  "applications",
  "runtime",
  "infra_core",
  "safety_governance",
  "observability",
] as const;

const focusIcons: Record<string, string> = {
  ai_systems:
    "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z",
  voice_intelligence:
    "M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z",
  multimodal_intelligence:
    "M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z",
  ai_safety:
    "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
};

const softCard =
  "rounded-[30px] border border-white/[0.08] bg-[#0b1222] transition duration-300 hover:border-white/[0.14]";

export default async function ResearchPage({
  params,
}: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "research_page",
  });

  const stats = [
    { value: "4", label: t("stats.areas"), kind: "number" },
    { value: "0", label: t("stats.publications"), kind: "number" },
    { value: "1", label: t("stats.programs"), kind: "number" },
    { value: "Open", label: t("stats.initiative"), kind: "text" },
  ] as const;

  return (
    <main className="min-h-screen bg-[#050911] text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.05]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[8%] top-[-22%] h-[680px] w-[860px] rounded-full bg-[radial-gradient(ellipse,rgba(212,175,55,0.12),transparent_58%)]" />
          <div className="absolute right-[2%] top-[28%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.08),transparent_62%)]" />
        </div>

        <div className={`${wrap} relative pb-20 pt-28 md:pb-24 md:pt-40`}>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <SectionLabel>{t("hero.kicker")}</SectionLabel>

              <h1 className="mt-8 max-w-4xl text-[clamp(2.7rem,6vw,5.5rem)] font-bold leading-[0.92] tracking-[-0.04em] text-white">
                {t("hero.title")}
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400 md:text-[1.15rem]">
                {t("hero.desc")}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <PrimaryCTA href="/research/publications">
                  {t("hero.cta_primary")}
                </PrimaryCTA>

                <SecondaryCTA href="#focus-areas">
                  {t("hero.cta_secondary")}
                </SecondaryCTA>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative ms-auto w-full max-w-[560px]">
                <div className="pointer-events-none absolute -inset-5 rounded-[30px] bg-[#d4af37]/8 blur-2xl" />
                <div className="relative rounded-[26px] border border-white/[0.08] bg-[#0b1222]/85 p-2.5 shadow-[0_20px_70px_rgba(0,0,0,0.28)]">
                  <ImageWithLightbox
                    src="/engines/openqcore-research-hero.png"
                    alt="OpenQCore Research"
                    width={1200}
                    height={900}
                    className="group block w-full overflow-hidden rounded-[20px]"
                    imageClassName="aspect-[4/3] w-full rounded-[20px] object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className={`${wrap} py-10`}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="rounded-[24px] border border-white/[0.08] bg-[#0a1020]/80 px-5 py-6 text-center backdrop-blur-sm"
              >
                <span
                  dir="ltr"
                  className={`block font-bold tracking-tight text-[#f3d98a] ${
                    s.kind === "number"
                      ? "text-2xl tabular-nums md:text-3xl"
                      : "text-lg md:text-xl"
                  }`}
                >
                  {s.value}
                </span>
                <span className="mt-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOCUS AREAS */}
      <section
        id="focus-areas"
        className="border-b border-white/[0.05] bg-[#050911]"
      >
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("focus.title")}</SectionLabel>

          <h2 className="mt-5 max-w-2xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("focus.title")}
          </h2>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {focusAreas.map((k) => (
              <article
                key={k}
                className="group rounded-[28px] border border-white/[0.08] bg-[#0b1222] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37]/15 hover:shadow-[0_16px_48px_rgba(0,0,0,0.25)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d4af37]/15 bg-[#d4af37]/6 text-[#d4af37] transition-colors group-hover:bg-[#d4af37]/10">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={focusIcons[k]}
                    />
                  </svg>
                </div>

                <h3 className="mt-5 text-lg font-bold text-white">
                  {t(`focus.items.${k}.title`)}
                </h3>
                <p className="mt-2.5 text-sm leading-7 text-slate-400">
                  {t(`focus.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST PUBLICATIONS */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionLabel>{t("latest.title")}</SectionLabel>
              <h2 className="mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
                {t("latest.title")}
              </h2>
            </div>

            <Link
              href="/research/publications"
              className="flex items-center gap-1.5 text-sm font-semibold text-[#d4af37] transition-all hover:gap-2.5"
            >
              {t("latest.view_all")} <ArrowIcon />
            </Link>
          </div>

          <div className="mt-10 rounded-[28px] border border-dashed border-white/[0.08] bg-[#0b1222]/60 px-8 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
              <svg
                className="h-6 w-6 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>
            </div>

            <h3 className="mt-5 text-lg font-bold text-white">
              {t("latest.empty_title")}
            </h3>
            <p className="mx-auto mt-2.5 max-w-lg text-sm leading-7 text-slate-400">
              {t("latest.empty_desc")}
            </p>
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section className="border-b border-white/[0.05] bg-[#050911]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("infrastructure.title")}</SectionLabel>

          <h2 className="mt-5 max-w-3xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("infrastructure.title")}
          </h2>

          <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div className="rounded-[28px] border border-white/[0.08] bg-[#0b1222] p-6">
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                {t("infrastructure.map_title")}
              </h3>

              <div className="space-y-0">
                {flowSteps.map((step, idx) => (
                  <div
                    key={step}
                    className="flex flex-col items-center"
                  >
                    <div className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-center text-sm font-medium text-white transition-colors hover:border-[#d4af37]/15 hover:bg-white/[0.04]">
                      {t(`infrastructure.flow.${step}`)}
                    </div>

                    {idx < flowSteps.length - 1 && (
                      <div className="my-1.5 h-4 w-px bg-gradient-to-b from-[#d4af37]/40 to-[#d4af37]/10" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-[#d4af37]/12 bg-gradient-to-b from-[#d4af37]/[0.04] to-transparent p-6">
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                {t("infrastructure.stack_title")}
              </h3>

              <div className="space-y-2.5">
                {infra.map((k) => (
                  <div
                    key={k}
                    className="rounded-xl border border-white/[0.08] bg-[#0b1222]/70 px-4 py-3.5 text-sm font-medium text-slate-200 transition-colors hover:border-white/[0.14] hover:text-white"
                  >
                    {t(`infrastructure.stack.${k}`)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OPEN RESEARCH + PRINCIPLES */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <SectionLabel>{t("open_research.title")}</SectionLabel>
              <h2 className="mt-5 text-3xl font-bold tracking-[-0.03em] text-white md:text-4xl">
                {t("open_research.title")}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                {t("open_research.desc")}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {openResearch.map((k) => (
                  <div
                    key={k}
                    className="rounded-xl border border-white/[0.08] bg-[#0b1222] px-4 py-4 text-center text-sm font-semibold text-white transition-colors hover:border-[#d4af37]/15"
                  >
                    {t(`open_research.items.${k}`)}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionLabel>{t("principles.title")}</SectionLabel>
              <h2 className="mt-5 text-3xl font-bold tracking-[-0.03em] text-white md:text-4xl">
                {t("principles.title")}
              </h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {principles.map((k) => (
                  <article
                    key={k}
                    className="rounded-2xl border border-white/[0.08] bg-[#0b1222] p-5 text-center transition-all duration-300 hover:border-white/[0.14]"
                  >
                    <h3 className="text-sm font-bold text-white">
                      {t(`principles.items.${k}.title`)}
                    </h3>
                    <p className="mt-2 text-[13px] leading-6 text-slate-400">
                      {t(`principles.items.${k}.desc`)}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="border-b border-white/[0.05] bg-[#050911]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("timeline.title")}</SectionLabel>

          <h2 className="mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("timeline.title")}
          </h2>

          <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {timeline.map((k) => (
              <div
                key={k}
                className="relative rounded-2xl border border-white/[0.08] bg-[#0b1222] px-5 py-5 text-center transition-all duration-300 hover:border-[#d4af37]/15"
              >
                <div className="mb-3 inline-flex rounded-full border border-[#d4af37]/20 bg-[#d4af37]/6 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#f3d98a]">
                  {t(`timeline.items.${k}.year`)}
                </div>
                <div className="text-sm font-semibold text-white">
                  {t(`timeline.items.${k}.title`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COLLABORATIONS */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel>{t("collab.title")}</SectionLabel>

              <h2 className="mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
                {t("collab.title")}
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400">
                {t("collab.desc")}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {collaborations.map((k) => (
                  <div
                    key={k}
                    className="rounded-xl border border-white/[0.08] bg-[#0b1222] px-4 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:border-[#d4af37]/15"
                  >
                    {t(`collab.items.${k}`)}
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <PrimaryCTA href="/company/contact?intent=research">
                  {t("collab.cta")}
                </PrimaryCTA>
              </div>
            </div>

            <div className="w-full lg:justify-self-end">
              <div className="relative w-full max-w-[560px]">
                <div className="pointer-events-none absolute -inset-6 rounded-[32px] bg-[#3b82f6]/4 blur-2xl" />
                <div className="relative rounded-[28px] border border-white/[0.08] bg-[#0b1222]/80 p-2.5 shadow-[0_20px_70px_rgba(0,0,0,0.28)]">
                  <ImageWithLightbox
                    src="/engines/openqcore-research-collaboration.png"
                    alt="OpenQCore Research Collaboration"
                    width={1200}
                    height={900}
                    className="group block w-full overflow-hidden rounded-[22px]"
                    imageClassName="aspect-[4/3] w-full rounded-[22px] object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#050911]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#0b1222] px-8 py-16 text-center md:px-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.06),transparent_50%)]" />

            <div className="relative">
              <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-[-0.03em] text-white md:text-5xl">
                {t("final_cta.title")}
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400">
                {t("final_cta.desc")}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <PrimaryCTA href="#focus-areas">
                  {t("final_cta.cta_primary")}
                </PrimaryCTA>

                <SecondaryCTA href="/research/publications">
                  {t("final_cta.cta_secondary")}
                </SecondaryCTA>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}