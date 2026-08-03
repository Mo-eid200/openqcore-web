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
    namespace: "foundation_research_collaboration_page.seo",
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
      url: "https://openqcore.com/foundation/research-collaboration",
      siteName: "OpenQCore",
    },
    alternates: {
      canonical: "https://openqcore.com/foundation/research-collaboration",
      languages: {
        en: "https://openqcore.com/en/foundation/research-collaboration",
        ar: "https://openqcore.com/ar/foundation/research-collaboration",
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

export default async function ResearchCollaborationPage({
  params,
}: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "foundation_research_collaboration_page",
  });

  const why = [
    "shared_knowledge",
    "real_world_systems",
    "long_term_impact",
  ] as const;

  const researchAreas = [
    "ai_systems",
    "voice_intelligence",
    "multimodal_intelligence",
    "ai_safety",
  ] as const;

  const opportunities = [
    "academic_research",
    "industry_partnerships",
    "open_research_projects",
    "technical_publications",
  ] as const;

  const process = [
    "initial_discussion",
    "research_scope",
    "collaboration_agreement",
    "research_execution",
    "publication_results",
  ] as const;

  const who = [
    "researchers",
    "graduate_students",
    "academic_institutions",
    "independent_scientists",
    "industry_engineers",
  ] as const;

  const principles = [
    "scientific_rigor",
    "open_collaboration",
    "responsible_innovation",
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
                <PrimaryCTA href="/company/contact?intent=research-collaboration">
                  {t("hero.cta_primary")}
                </PrimaryCTA>

                <SecondaryCTA href="/research">
                  {t("hero.cta_secondary")}
                </SecondaryCTA>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative ms-auto w-full max-w-[560px]">
                <div className="absolute -inset-5 rounded-[30px] bg-[#d4af37]/10 blur-2xl" />
                <div className="relative rounded-[26px] border border-white/[0.08] bg-[#0b1222]/85 p-2.5 shadow-[0_20px_70px_rgba(0,0,0,0.28)]">
                  <ImageWithLightbox
                    src="/engines/openqcore-research-collaboration-hero.png"
                    alt="OpenQCore Research Collaboration"
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

      {/* WHY COLLABORATE */}
      <section className="border-b border-white/[0.05]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("why.title")}</SectionLabel>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {why.map((k) => (
              <article key={k} className={card}>
                <h3 className="text-lg font-bold text-white">
                  {t(`why.cards.${k}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(`why.cards.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* RESEARCH AREAS */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("research_areas.title")}</SectionLabel>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {researchAreas.map((k) => (
              <article key={k} className={card}>
                <h3 className="text-xl font-bold text-white">
                  {t(`research_areas.cards.${k}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(`research_areas.cards.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OPPORTUNITIES */}
      <section className="border-b border-white/[0.05]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("opportunities.title")}</SectionLabel>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {opportunities.map((k) => (
              <article key={k} className={card}>
                <h3 className="text-lg font-bold text-white">
                  {t(`opportunities.cards.${k}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(`opportunities.cards.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("process.title")}</SectionLabel>

          <div className="mt-12 grid gap-3 md:grid-cols-5">
            {process.map((k, idx) => (
              <div
                key={k}
                className="relative rounded-2xl border border-white/[0.08] bg-[#0b1222] px-4 py-4 text-center"
              >
                <div
                  dir="ltr"
                  className="text-xs font-semibold uppercase tracking-[0.14em] text-[#f3d98a] tabular-nums"
                >
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="mt-2 text-sm font-medium leading-7 text-slate-100">
                  {t(`process.steps.${k}`)}
                </div>
                {idx < process.length - 1 && (
                  <span className="pointer-events-none absolute -right-2 top-1/2 hidden h-px w-4 -translate-y-1/2 bg-white/20 md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section className="border-b border-white/[0.05]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("who.title")}</SectionLabel>

          <div className="mt-8 flex flex-wrap gap-3">
            {who.map((k) => (
              <span
                key={k}
                className="rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-2 text-sm font-semibold text-[#f3d98a]"
              >
                {t(`who.items.${k}`)}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("principles.title")}</SectionLabel>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {principles.map((k) => (
              <article key={k} className={card}>
                <h3 className="text-lg font-bold text-white">
                  {t(`principles.cards.${k}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(`principles.cards.${k}.desc`)}
                </p>
              </article>
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
              <PrimaryCTA href="/company/contact?intent=research-collaboration">
                {t("cta.button")}
              </PrimaryCTA>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}