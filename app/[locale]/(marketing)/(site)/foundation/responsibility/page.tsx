import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ImageWithLightbox from "../../../components/common/ImageWithLightbox";
import {
  PrimaryCTA,
  SecondaryCTA,
} from "../../../components/common/CTAButtons";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "foundation_responsibility_page.seo",
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
      url: "https://openqcore.com/foundation/responsibility",
      siteName: "OpenQCore",
    },
    alternates: {
      canonical: "https://openqcore.com/foundation/responsibility",
      languages: {
        en: "https://openqcore.com/en/foundation/responsibility",
        ar: "https://openqcore.com/ar/foundation/responsibility",
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

const card =
  "rounded-[28px] border border-white/[0.08] bg-[#0b1222] p-6 text-center transition duration-300 hover:border-[#d4af37]/35 hover:bg-[#0f1730]";

export default async function ResponsibilityPage({
  params,
}: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "foundation_responsibility_page",
  });

  const principles = [
    "safety_reliability",
    "human_centered",
    "transparency",
    "accountability",
    "long_term_stewardship",
  ] as const;

  const focus = [
    "responsible_ai_systems",
    "ai_safety_research",
    "governance_oversight",
    "education_awareness",
  ] as const;

  const lifecycle = [
    "research",
    "design",
    "development",
    "evaluation",
    "deployment",
    "monitoring",
    "continuous_improvement",
  ] as const;

  const commitments = [
    "c1",
    "c2",
    "c3",
    "c4",
    "c5",
    "c6",
    "c7",
    "c8",
  ] as const;

  const stepStyles = [
    "border-cyan-400/30 bg-cyan-500/[0.08] text-cyan-100",
    "border-violet-400/30 bg-violet-500/[0.08] text-violet-100",
    "border-blue-400/30 bg-blue-500/[0.08] text-blue-100",
    "border-emerald-400/30 bg-emerald-500/[0.08] text-emerald-100",
    "border-amber-400/30 bg-amber-500/[0.10] text-amber-100",
    "border-rose-400/30 bg-rose-500/[0.08] text-rose-100",
    "border-fuchsia-400/30 bg-fuchsia-500/[0.08] text-fuchsia-100",
  ] as const;

  return (
    <main className="min-h-screen bg-[#050911] text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.05]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[4%] top-[-18%] h-[620px] w-[760px] rounded-full bg-[radial-gradient(ellipse,rgba(212,175,55,.12),transparent_60%)]" />
          <div className="absolute right-[2%] top-[8%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,.10),transparent_62%)]" />
        </div>

        <div className={`${wrap} relative pb-20 pt-28 md:pb-24 md:pt-40`}>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <SectionLabel>{t("hero.kicker")}</SectionLabel>

              <h1 className="mt-8 max-w-5xl text-[clamp(2.4rem,5.8vw,4.8rem)] font-bold leading-[0.95] tracking-[-0.04em] text-white">
                {t("hero.title")}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-[1.1rem]">
                {t("hero.desc")}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <PrimaryCTA href="/foundation">
                  {t("hero.cta_primary")}
                </PrimaryCTA>

                <SecondaryCTA href="/research/ai-safety">
                  {t("hero.cta_secondary")}
                </SecondaryCTA>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative ms-auto w-full max-w-[560px]">
                <div className="absolute -inset-5 rounded-[30px] bg-[#d4af37]/10 blur-2xl" />
                <div className="relative rounded-[26px] border border-white/[0.08] bg-[#0b1222]/85 p-2.5 shadow-[0_20px_70px_rgba(0,0,0,0.28)]">
                  <ImageWithLightbox
                    src="/engines/openqcore-ai-responsibility-hero.png"
                    alt="OpenQCore AI Responsibility"
                    width={1400}
                    height={1000}
                    className="group block w-full overflow-hidden rounded-[20px] bg-[#060b16]"
                    imageClassName="aspect-[4/3] w-full rounded-[20px] object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="border-b border-white/[0.05]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("hero.kicker")}</SectionLabel>

          <div className="mt-8 max-w-5xl space-y-4">
            <p className="text-sm leading-8 text-slate-300 md:text-base">
              {t("intro.p1")}
            </p>
            <p className="text-sm leading-8 text-slate-300 md:text-base">
              {t("intro.p2")}
            </p>
            <p className="text-sm leading-8 text-slate-300 md:text-base">
              {t("intro.p3")}
            </p>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("principles.title")}</SectionLabel>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {principles.map((k) => (
              <article key={k} className={card}>
                <h3 className="text-lg font-bold text-white">
                  {t(`principles.items.${k}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(`principles.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS OF FOCUS */}
      <section className="border-b border-white/[0.05]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("focus.title")}</SectionLabel>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {focus.map((k) => (
              <article key={k} className={card}>
                <h3 className="text-xl font-bold text-white">
                  {t(`focus.items.${k}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(`focus.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LIFECYCLE */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("lifecycle.title")}</SectionLabel>

          <p className="mt-4 max-w-4xl text-sm leading-8 text-slate-300">
            {t("lifecycle.desc")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3 md:gap-4">
            {lifecycle.map((k, idx) => (
              <div
                key={k}
                className={`inline-flex items-center gap-3 rounded-xl border px-4 py-3 ${stepStyles[idx % stepStyles.length]}`}
              >
                <span
                  dir="ltr"
                  className="inline-flex h-7 min-w-7 items-center justify-center rounded-md bg-white/10 px-2 text-[11px] font-bold tracking-[0.08em] tabular-nums"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold leading-none">
                  {t(`lifecycle.steps.${k}`)}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-6 max-w-4xl text-sm leading-8 text-slate-300">
            {t("lifecycle.note")}
          </p>
        </div>
      </section>

      {/* COMMITMENTS */}
      <section className="border-b border-white/[0.05]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("commitments.title")}</SectionLabel>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {commitments.map((k) => (
              <div
                key={k}
                className="rounded-2xl border border-white/[0.08] bg-[#0b1222] px-5 py-4 text-center text-sm text-slate-200"
              >
                <span className="me-2 text-[#f3d98a]">✓</span>
                {t(`commitments.items.${k}`)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOOKING AHEAD */}
      <section className="bg-[#050911]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="rounded-[32px] border border-white/[0.08] bg-[linear-gradient(125deg,rgba(212,175,55,.17),rgba(10,16,29,.93)_50%,rgba(10,16,29,.96))] p-8 md:p-10">
            <h2 className="max-w-4xl text-3xl font-bold tracking-[-0.03em] text-white md:text-4xl">
              {t("looking_ahead.title")}
            </h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-200">
              {t("looking_ahead.p1")}
            </p>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-200">
              {t("looking_ahead.p2")}
            </p>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-200">
              {t("looking_ahead.p3")}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <PrimaryCTA href="/foundation">
                {t("looking_ahead.cta_primary")}
              </PrimaryCTA>
              <SecondaryCTA href="/research/ai-safety">
                {t("looking_ahead.cta_secondary")}
              </SecondaryCTA>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}