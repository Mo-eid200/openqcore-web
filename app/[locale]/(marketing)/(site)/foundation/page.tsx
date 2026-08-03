import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
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
    namespace: "foundation_page.seo",
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
      url: "https://openqcore.com/foundation",
      siteName: "OpenQCore",
    },
    alternates: {
      canonical: "https://openqcore.com/foundation",
      languages: {
        en: "https://openqcore.com/en/foundation",
        ar: "https://openqcore.com/ar/foundation",
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

export default async function FoundationPage({
  params,
}: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "foundation_page",
  });

  const initiatives = [
    "community",
    "education",
    "research_collaboration",
    "ai_responsibility",
    "open_source",
    "partnerships",
  ] as const;

  const longTerm = [
    "research_initiatives",
    "education_programs",
    "community_innovation",
    "open_source_projects",
    "industry_partnerships",
    "ai_safety_efforts",
    "knowledge_networks",
    "future_collaboration_programs",
  ] as const;

  const impact = [
    "empowering_developers",
    "supporting_research",
    "strengthening_communities",
    "promoting_responsible_ai",
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

              <h1 className="mt-8 max-w-5xl text-[clamp(2.4rem,5.8vw,4.9rem)] font-bold leading-[0.95] tracking-[-0.04em] text-white">
                {t("hero.title")}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-[1.1rem]">
                {t("hero.desc")}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <PrimaryCTA href="/foundation/community">
                  {t("hero.cta_primary")}
                </PrimaryCTA>

                <SecondaryCTA href="/foundation/community">
                  {t("hero.cta_secondary")}
                </SecondaryCTA>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative ms-auto inline-block w-full max-w-[700px]">
                <div className="absolute -inset-5 rounded-[30px] bg-[#d4af37]/10 blur-2xl" />
                <div className="relative overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#0b1222]/85 shadow-[0_20px_70px_rgba(0,0,0,0.28)]">
                  <ImageWithLightbox
                    src="/engines/openqcore-foundation-hero.png"
                    alt="OpenQCore Foundation"
                    width={1400}
                    height={1000}
                    className="group block w-full"
                    imageClassName="h-auto w-full object-contain transition duration-500 group-hover:scale-[1.01]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="border-b border-white/[0.05]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("mission.title")}</SectionLabel>

          <div className="mt-8 max-w-5xl space-y-4">
            <p className="text-sm leading-8 text-slate-300 md:text-base">
              {t("mission.p1")}
            </p>
            <p className="text-sm leading-8 text-slate-300 md:text-base">
              {t("mission.p2")}
            </p>
            <p className="text-sm leading-8 text-slate-300 md:text-base">
              {t("mission.p3")}
            </p>
          </div>
        </div>
      </section>

      {/* CORE INITIATIVES */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("initiatives.title")}</SectionLabel>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {initiatives.map((k) => (
              <article key={k} className={card}>
                <h3 className="text-lg font-bold text-white">
                  {t(`initiatives.items.${k}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(`initiatives.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LONG TERM VISION */}
      <section className="border-b border-white/[0.05]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("vision.title")}</SectionLabel>

          <p className="mt-8 max-w-5xl text-sm leading-8 text-slate-300 md:text-base">
            {t("vision.desc")}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {longTerm.map((k) => (
              <div
                key={k}
                className="rounded-2xl border border-white/[0.08] bg-[#0b1222] px-4 py-4 text-center text-sm text-slate-200"
              >
                {t(`vision.points.${k}`)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS OF IMPACT */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("impact.title")}</SectionLabel>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {impact.map((k, idx) => (
              <article
                key={k}
                className="rounded-[28px] border border-white/[0.08] bg-[#0b1222] p-6 text-center transition duration-300 hover:border-white/[0.14]"
              >
                <p
                  dir="ltr"
                  className="text-xs font-semibold uppercase tracking-[0.14em] text-[#f3d98a] tabular-nums"
                >
                  {String(idx + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-xl font-bold text-white">
                  {t(`impact.items.${k}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(`impact.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LOOKING AHEAD */}
      <section className="border-b border-white/[0.05]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("looking_ahead.title")}</SectionLabel>

          <div className="mt-8 max-w-5xl space-y-4">
            <p className="text-sm leading-8 text-slate-300 md:text-base">
              {t("looking_ahead.desc_1")}
            </p>
            <p className="text-sm leading-8 text-slate-300 md:text-base">
              {t("looking_ahead.desc_2")}
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#050911]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="rounded-[32px] border border-white/[0.08] bg-[linear-gradient(125deg,rgba(212,175,55,.17),rgba(10,16,29,.93)_50%,rgba(10,16,29,.96))] p-8 text-center md:p-10">
            <h2 className="mx-auto max-w-4xl text-3xl font-bold tracking-[-0.03em] text-white md:text-4xl">
              {t("cta.title")}
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-200">
              {t("cta.desc")}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <PrimaryCTA href="/foundation/community">
                {t("cta.primary")}
              </PrimaryCTA>

              <SecondaryCTA href="/foundation/open-source">
                {t("cta.secondary")}
              </SecondaryCTA>

              <SecondaryCTA href="/research/residency">
                {t("cta.tertiary")}
              </SecondaryCTA>

              <SecondaryCTA href="/foundation/community">
                {t("cta.quaternary")}
              </SecondaryCTA>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}