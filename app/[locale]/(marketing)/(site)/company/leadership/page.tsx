import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  PrimaryCTA,
  SecondaryCTA,
} from "../../../components/common/CTAButtons";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "leadership_page.seo",
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
      url: "https://openqcore.com/company/leadership",
      siteName: "OpenQCore",
    },
    alternates: {
      canonical: "https://openqcore.com/company/leadership",
      languages: {
        en: "https://openqcore.com/en/company/leadership",
        ar: "https://openqcore.com/ar/company/leadership",
      },
    },
  };
}

const wrap = "mx-auto w-full max-w-[1420px] px-6 lg:px-8";

const card =
  "group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0b1222] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37]/20 hover:shadow-[0_8px_32px_rgba(212,175,55,.06)]";

const secH2 =
  "mt-5 text-[clamp(2rem,3.4vw,3rem)] font-bold tracking-[-0.03em] text-white";

const cardBody = "text-sm leading-7 text-slate-400";

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

const principleIcons: Record<string, string> = {
  long_term_thinking:
    "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  research_driven:
    "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z",
  responsible_development:
    "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
  global_perspective:
    "M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418",
};

const areaIcons: Record<string, string> = {
  technology_engineering:
    "M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z",
  research_innovation:
    "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z",
  product_ecosystem:
    "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z",
  responsibility_governance:
    "M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97Zm-12.5 0L8.871 15.696c.122.499-.106 1.028-.59 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.75 4.97",
};

const approachIcons: Record<string, string> = {
  build_long_term:
    "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  focus_foundations:
    "M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3",
  invest_research:
    "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z",
  enable_impact:
    "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z",
};

const principles = [
  "long_term_thinking",
  "research_driven",
  "responsible_development",
  "global_perspective",
] as const;

const areas = [
  "technology_engineering",
  "research_innovation",
  "product_ecosystem",
  "responsibility_governance",
] as const;

const approaches = [
  "build_long_term",
  "focus_foundations",
  "invest_research",
  "enable_impact",
] as const;

const companyLinks = [
  { key: "about", href: "/company/about" },
  { key: "careers", href: "/company/careers" },
  { key: "newsroom", href: "/company/newsroom" },
  { key: "contact", href: "/company/contact" },
] as const;

export default async function LeadershipPage({
  params,
}: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "leadership_page",
  });

  return (
    <main className="min-h-screen bg-[#050911] text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.05]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[6%] top-[-15%] h-[600px] w-[800px] rounded-full bg-[radial-gradient(ellipse,rgba(212,175,55,0.10),transparent_55%)]" />
          <div className="absolute right-0 top-[20%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.06),transparent_60%)]" />
        </div>

        <div className={`${wrap} relative pb-20 pt-32 md:pb-28 md:pt-44`}>
          <SectionLabel>{t("hero.kicker")}</SectionLabel>

          <h1 className="mt-8 max-w-4xl text-[clamp(2.6rem,5.5vw,4.8rem)] font-bold leading-[0.95] tracking-[-0.04em] text-white">
            {t("hero.title")}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400 md:text-[1.1rem]">
            {t("hero.desc")}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-400">
            {t("hero.desc2")}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
            {t("hero.foundation_note")}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <PrimaryCTA href="/company/careers">
              {t("hero.cta_primary")}
            </PrimaryCTA>

            <SecondaryCTA href="/company/about">
              {t("hero.cta_secondary")}
            </SecondaryCTA>
          </div>
        </div>
      </section>

      {/* LEADERSHIP PRINCIPLES */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("principles.kicker")}</SectionLabel>
          <h2 className={secH2}>{t("principles.title")}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            {t("principles.desc")}
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {principles.map((k) => (
              <article key={k} className={`${card} p-7`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d4af37]/15 bg-[#d4af37]/[0.06] text-[#d4af37] transition-colors group-hover:bg-[#d4af37]/10">
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
                      d={principleIcons[k]}
                    />
                  </svg>
                </div>
                <h3 className="mt-5 text-base font-semibold text-white">
                  {t(`principles.items.${k}.title`)}
                </h3>
                <p className={`mt-2.5 ${cardBody}`}>
                  {t(`principles.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS OF LEADERSHIP */}
      <section className="border-b border-white/[0.05] bg-[#050911]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("areas.kicker")}</SectionLabel>
          <h2 className={secH2}>{t("areas.title")}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            {t("areas.desc")}
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {areas.map((k) => (
              <article key={k} className={`${card} p-7`}>
                <div className="flex items-start gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d4af37]/15 bg-[#d4af37]/[0.06] text-[#d4af37] transition-colors group-hover:bg-[#d4af37]/10">
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
                        d={areaIcons[k]}
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {t(`areas.items.${k}.title`)}
                    </h3>
                    <p className={`mt-2.5 ${cardBody}`}>
                      {t(`areas.items.${k}.desc`)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP FOUNDATION */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("foundation.kicker")}</SectionLabel>
          <h2 className={secH2}>{t("foundation.title")}</h2>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <p className="text-sm leading-8 text-slate-300">
                {t("foundation.p1")}
              </p>
              <p className="text-sm leading-8 text-slate-400">
                {t("foundation.p2")}
              </p>
              <p className="text-sm leading-8 text-slate-400">
                {t("foundation.p3")}
              </p>
            </div>

            <div className={`${card} p-7`}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#d4af37]">
                {t("foundation.disciplines_label")}
              </h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {(
                  [
                    "engineering",
                    "information_technology",
                    "information_systems",
                    "business_strategy",
                  ] as const
                ).map((k) => (
                  <span
                    key={k}
                    className="rounded-full border border-[#d4af37]/18 bg-[#d4af37]/[0.05] px-4 py-2 text-sm font-medium text-[#f3d98a]"
                  >
                    {t(`foundation.disciplines.${k}`)}
                  </span>
                ))}
              </div>
              <p className={`mt-6 ${cardBody}`}>
                {t("foundation.disciplines_desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="border-b border-white/[0.05] bg-[#050911]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("approach.kicker")}</SectionLabel>
          <h2 className={secH2}>{t("approach.title")}</h2>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {approaches.map((k, i) => (
              <article key={k} className={`${card} p-7`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d4af37]/15 bg-[#d4af37]/[0.06] text-[#d4af37] transition-colors group-hover:bg-[#d4af37]/10">
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
                      d={approachIcons[k]}
                    />
                  </svg>
                </div>
                <span
                  dir="ltr"
                  className="mt-5 block text-[11px] font-bold tracking-[0.14em] tabular-nums text-[#d4af37]/50"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 text-base font-semibold text-white">
                  {t(`approach.items.${k}.title`)}
                </h3>
                <p className={`mt-2.5 ${cardBody}`}>
                  {t(`approach.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BUILDING THE FUTURE */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionLabel>{t("future.kicker")}</SectionLabel>
              <h2 className={secH2}>{t("future.title")}</h2>
              <p className="mt-5 text-sm leading-8 text-slate-300">
                {t("future.p1")}
              </p>
              <p className="mt-4 text-sm leading-8 text-slate-400">
                {t("future.p2")}
              </p>
              <p className="mt-4 text-sm leading-8 text-slate-400">
                {t("future.p3")}
              </p>
            </div>

            <div className={`${card} p-8`}>
              <SectionLabel>{t("ahead.kicker")}</SectionLabel>
              <h3 className="mt-4 text-xl font-bold text-white">
                {t("ahead.title")}
              </h3>
              <p className={`mt-4 ${cardBody}`}>{t("ahead.p1")}</p>
              <p className={`mt-3 ${cardBody}`}>{t("ahead.p2")}</p>
              <p className={`mt-3 ${cardBody}`}>{t("ahead.p3")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* JOIN THE JOURNEY */}
      <section className="bg-[#050911]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#0b1222] p-8 md:p-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.07),transparent_50%)]" />

            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <SectionLabel>{t("join.kicker")}</SectionLabel>
                <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-white md:text-4xl">
                  {t("join.title")}
                </h2>
                <p className="mt-5 text-sm leading-8 text-slate-300">
                  {t("join.p1")}
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-400">
                  {t("join.p2")}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <PrimaryCTA href="/company/careers">
                    {t("join.cta_careers")}
                  </PrimaryCTA>
                  <SecondaryCTA href="/company/contact">
                    {t("join.cta_contact")}
                  </SecondaryCTA>
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white">
                  {t("explore.title")}
                </h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {companyLinks.map((item) => (
                    <div
                      key={item.key}
                      className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d4af37]/18"
                    >
                      <p className="text-sm font-semibold text-white">
                        {t(`explore.links.${item.key}.title`)}
                      </p>
                      <p className="mt-1 text-[13px] leading-6 text-slate-400">
                        {t(`explore.links.${item.key}.desc`)}
                      </p>
                      <Link
                        href={item.href}
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#d4af37] transition-all hover:gap-2.5"
                      >
                        {t("explore.visit")} <ArrowIcon />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}