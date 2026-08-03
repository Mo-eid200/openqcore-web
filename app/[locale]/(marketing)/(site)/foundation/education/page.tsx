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
    namespace: "foundation_education_page.seo",
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
      url: "https://openqcore.com/foundation/education",
      siteName: "OpenQCore",
    },
    alternates: {
      canonical: "https://openqcore.com/foundation/education",
      languages: {
        en: "https://openqcore.com/en/foundation/education",
        ar: "https://openqcore.com/ar/foundation/education",
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

export default async function EducationPage({
  params,
}: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "foundation_education_page",
  });

  const focus = [
    "learning_resources",
    "ai_powered_education",
    "academic_innovation",
    "future_learning_infrastructure",
  ] as const;

  const interests = [
    "artificial_intelligence",
    "intelligent_agents",
    "voice_technologies",
    "research_methodology",
  ] as const;

  const lookingAhead = [
    "ai_assisted_learning_platforms",
    "intelligent_tutoring_systems",
    "adaptive_educational_pathways",
    "academic_research_programs",
    "educational_partnerships",
    "advanced_learning_infrastructure",
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

                <SecondaryCTA href="/research">
                  {t("hero.cta_secondary")}
                </SecondaryCTA>
              </div>
            </div>

<div className="lg:col-span-5">
  <div className="relative flex justify-center">
    <div className="pointer-events-none absolute -inset-10 rounded-[40px] bg-[#d4af37]/10 blur-3xl" />

    <ImageWithLightbox
      src="/engines/openqcore-education-hero.png"
      alt="OpenQCore Education"
      width={1400}
      height={1000}
      className="relative group flex w-full items-center justify-center"
      imageClassName="h-auto w-[88%] object-contain drop-shadow-[0_22px_45px_rgba(0,0,0,0.35)] transition duration-500 group-hover:-translate-y-1 group-hover:scale-[1.01]"
    />
  </div>
</div>
</div>
            </div>
      </section>

      {/* OUR FOCUS */}
      <section className="border-b border-white/[0.05]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("focus.title")}</SectionLabel>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {focus.map((k) => (
              <article key={k} className={card}>
                <h3 className="text-xl font-bold text-white">
                  {t(`focus.cards.${k}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(`focus.cards.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS OF INTEREST */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("areas.title")}</SectionLabel>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {interests.map((k) => (
              <article key={k} className={card}>
                <h3 className="text-lg font-bold text-white">
                  {t(`areas.cards.${k}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(`areas.cards.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LONG-TERM VISION */}
      <section className="border-b border-white/[0.05]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("vision.title")}</SectionLabel>

          <div className="mt-8 max-w-5xl space-y-4">
            <p className="text-sm leading-8 text-slate-300 md:text-base">
              {t("vision.p1")}
            </p>
            <p className="text-sm leading-8 text-slate-300 md:text-base">
              {t("vision.p2")}
            </p>
          </div>
        </div>
      </section>

      {/* LOOKING AHEAD */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("ahead.title")}</SectionLabel>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {lookingAhead.map((k) => (
              <div
                key={k}
                className="rounded-2xl border border-white/[0.08] bg-[#0b1222] px-4 py-4 text-center text-sm text-slate-200"
              >
                {t(`ahead.points.${k}`)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#050911]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="rounded-[32px] border border-white/[0.08] bg-[linear-gradient(125deg,rgba(212,175,55,.17),rgba(10,16,29,.93)_50%,rgba(10,16,29,.96))] p-8 text-center md:p-10">
            <h2 className="mx-auto max-w-4xl text-3xl font-bold tracking-[-0.03em] text-white md:text-4xl">
              {t("cta.title")}
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-200">
              {t("cta.desc")}
            </p>

            <div className="mt-8 flex justify-center">
              <PrimaryCTA href="/company/contact?intent=education">
                {t("cta.button")}
              </PrimaryCTA>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}