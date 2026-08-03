import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ImageWithLightbox from "../../components/common/ImageWithLightbox";
import {
  PrimaryCTA,
  SecondaryCTA,
} from "../../components/common/CTAButtons";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "company_page.seo",
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
      url: "https://openqcore.com/company",
      siteName: "OpenQCore",
    },
    alternates: {
      canonical: "https://openqcore.com/company",
      languages: {
        en: "https://openqcore.com/en/company",
        ar: "https://openqcore.com/ar/company",
      },
    },
  };
}

const wrap = "mx-auto w-full max-w-[1420px] px-6 lg:px-8";

const card =
  "group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0b1222] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37]/20 hover:shadow-[0_8px_32px_rgba(212,175,55,.06)]";

const cardSm =
  "rounded-2xl border border-white/[0.08] bg-white/[0.02] transition-colors duration-200 hover:border-[#d4af37]/18";

const secH2 =
  "mt-5 max-w-2xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl";

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

const focus = [
  "ai_systems",
  "voice_intelligence",
  "agent_architectures",
  "multimodal_intelligence",
  "ai_infrastructure",
  "responsible_ai",
] as const;

const work = [
  "research_first",
  "build_for_scale",
  "responsible_by_design",
  "long_term_thinking",
] as const;

const ecosystem = [
  "platform",
  "research",
  "foundation",
  "developers",
] as const;

const highlights = [
  "research_driven",
  "global_perspective",
  "developer_focused",
  "future_oriented",
] as const;

const values = [
  "excellence",
  "curiosity",
  "responsibility",
  "collaboration",
] as const;

const companyLinks = [
  { key: "about", href: "/company/about" },
  { key: "leadership", href: "/company/leadership" },
  { key: "careers", href: "/company/careers" },
  { key: "brand_assets", href: "/company/brand" },
  { key: "newsroom", href: "/company/newsroom" },
  { key: "contact", href: "/company/contact" },
] as const;

const focusIcons: Record<string, string> = {
  ai_systems:
    "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z",
  voice_intelligence:
    "M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z",
  agent_architectures:
    "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z",
  multimodal_intelligence:
    "M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z",
  ai_infrastructure:
    "M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z",
  responsible_ai:
    "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
};

export default async function CompanyAboutPage({
  params,
}: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "company_page",
  });

  return (
    <main className="min-h-screen bg-[#050911] text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.05]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[8%] top-[-20%] h-[700px] w-[900px] rounded-full bg-[radial-gradient(ellipse,rgba(212,175,55,0.10),transparent_55%)]" />
          <div className="absolute right-0 top-[30%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.06),transparent_60%)]" />
        </div>

        <div className={`${wrap} relative pb-20 pt-32 md:pb-28 md:pt-44`}>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <SectionLabel>{t("hero.kicker")}</SectionLabel>

              <h1 className="mt-8 text-[clamp(2.8rem,6vw,5.8rem)] font-bold leading-[0.92] tracking-[-0.04em] text-white">
                {t("hero.title")}
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400 md:text-[1.15rem]">
                {t("hero.desc")}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {["Company", "Research", "Foundation", "Platform"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#d4af37]/20 bg-[#d4af37]/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#f3d98a]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <PrimaryCTA href="/company/contact">
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
                  src="/engines/openqcore-logo-full-light.png"
                  alt="OpenQCore Logo"
                  width={960}
                  height={960}
                  className="relative group flex w-full items-center justify-center"
                  imageClassName="h-auto w-[82%] object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.34)] transition duration-500 group-hover:-translate-y-1 group-hover:scale-[1.01]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION · VISION · WHAT WE DO */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="grid gap-5 lg:grid-cols-3">
            <article className={`${card} p-7`}>
              <h2 className="text-xl font-bold text-white">
                {t("mission.title")}
              </h2>
              <p className="mt-2 text-sm font-medium text-[#f3d98a]">
                {t("mission.subtitle")}
              </p>
              <p className={`mt-4 ${cardBody}`}>{t("mission.p1")}</p>
              <p className={`mt-3 ${cardBody}`}>{t("mission.p2")}</p>
            </article>

            <article className={`${card} p-7`}>
              <h2 className="text-xl font-bold text-white">
                {t("vision.title")}
              </h2>
              <p className="mt-2 text-sm font-medium text-[#f3d98a]">
                {t("vision.subtitle")}
              </p>
              <p className={`mt-4 ${cardBody}`}>{t("vision.p1")}</p>
              <p className={`mt-3 ${cardBody}`}>{t("vision.p2")}</p>
            </article>

            <article className={`${card} p-7`}>
              <h2 className="text-xl font-bold text-white">
                {t("what_we_do.title")}
              </h2>
              <div className="mt-5 space-y-3">
                {(["platforms", "research", "foundation"] as const).map((k) => (
                  <div key={k} className={`${cardSm} p-4`}>
                    <p className="text-sm font-semibold text-white">
                      {t(`what_we_do.items.${k}.title`)}
                    </p>
                    <p className="mt-1.5 text-[13px] leading-6 text-slate-400">
                      {t(`what_we_do.items.${k}.desc`)}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FOCUS AREAS */}
      <section className="border-b border-white/[0.05] bg-[#050911]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="relative mx-auto mb-16 w-full max-w-[980px]">
            <div className="pointer-events-none absolute -inset-6 rounded-[32px] bg-[#d4af37]/[0.05] blur-2xl" />

            <ImageWithLightbox
              src="/engines/openqcore-company-banner.png"
              alt="OpenQCore Company Banner"
              width={1800}
              height={1100}
              className="relative group block w-full overflow-hidden rounded-[24px]"
              imageClassName="aspect-[16/7] w-full rounded-[24px] object-cover transition duration-500 group-hover:scale-[1.02]"
            />
          </div>

          <SectionLabel>{t("focus.title")}</SectionLabel>
          <h2 className={secH2}>{t("focus.title")}</h2>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {focus.map((k) => (
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
                      d={focusIcons[k]}
                    />
                  </svg>
                </div>

                <h3 className="mt-5 text-lg font-semibold text-white">
                  {t(`focus.items.${k}.title`)}
                </h3>
                <p className={`mt-2.5 ${cardBody}`}>
                  {t(`focus.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("work.title")}</SectionLabel>
          <h2 className={secH2}>{t("work.title")}</h2>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {work.map((k, i) => (
              <article key={k} className={`${card} p-6`}>
                <span
                  dir="ltr"
                  className="text-xs font-bold tabular-nums text-[#d4af37]/50"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base font-semibold text-white">
                  {t(`work.items.${k}.title`)}
                </h3>
                <p className={`mt-2.5 ${cardBody}`}>
                  {t(`work.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section className="border-b border-white/[0.05] bg-[#050911]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("ecosystem.title")}</SectionLabel>
          <h2 className={secH2}>{t("ecosystem.title")}</h2>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {ecosystem.map((k) => (
              <article
                key={k}
                className="group relative overflow-hidden rounded-[24px] border border-[#d4af37]/10 bg-gradient-to-b from-[#d4af37]/[0.03] to-transparent p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37]/22 hover:shadow-[0_8px_32px_rgba(212,175,55,.06)]"
              >
                <h3 className="text-lg font-bold text-[#f3d98a]">
                  {t(`ecosystem.items.${k}.title`)}
                </h3>
                <p className={`mt-2.5 ${cardBody}`}>
                  {t(`ecosystem.items.${k}.desc`)}
                </p>
                <Link
                  href={`/${k === "platform" ? "platform" : k}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#d4af37] transition-all group-hover:gap-2.5"
                >
                  {t("ecosystem.explore")} <ArrowIcon />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS + VALUES */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className={`${card} p-7`}>
              <h2 className="text-2xl font-bold text-white">
                {t("highlights.title")}
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {highlights.map((k) => (
                  <div
                    key={k}
                    className={`${cardSm} px-4 py-3.5 text-sm font-medium text-white`}
                  >
                    {t(`highlights.items.${k}`)}
                  </div>
                ))}
              </div>
            </div>

            <div className={`${card} p-7`}>
              <h2 className="text-2xl font-bold text-white">
                {t("values.title")}
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {values.map((k) => (
                  <div key={k} className={`${cardSm} p-4`}>
                    <p className="text-sm font-semibold text-[#f3d98a]">
                      {t(`values.items.${k}.title`)}
                    </p>
                    <p className="mt-1.5 text-[13px] leading-6 text-slate-400">
                      {t(`values.items.${k}.desc`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOOKING AHEAD + COMPANY LINKS */}
      <section className="bg-[#050911]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#0b1222] p-8 md:p-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.06),transparent_50%)]" />

            <div className="relative">
              <SectionLabel>{t("ahead.title")}</SectionLabel>
              <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-[-0.03em] text-white md:text-5xl">
                {t("ahead.title")}
              </h2>

              <div className="mt-6 max-w-3xl space-y-3">
                <p className={cardBody}>{t("ahead.p1")}</p>
                <p className={cardBody}>{t("ahead.p2")}</p>
                <p className={cardBody}>{t("ahead.p3")}</p>
              </div>

              <div className="mt-12">
                <h3 className="text-lg font-bold text-white">
                  {t("explore.title")}
                </h3>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {companyLinks.map((item) => (
                    <div
                      key={item.key}
                      className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37]/18 hover:shadow-[0_4px_20px_rgba(212,175,55,.05)]"
                    >
                      <p className="text-sm font-semibold text-white">
                        {t(`explore.links.${item.key}.title`)}
                      </p>
                      <p className="mt-1.5 text-[13px] leading-6 text-slate-400">
                        {t(`explore.links.${item.key}.desc`)}
                      </p>
                      <Link
                        href={item.href}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#d4af37] transition-all hover:gap-2.5"
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