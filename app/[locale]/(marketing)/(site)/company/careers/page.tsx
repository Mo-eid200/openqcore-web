import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ImageWithLightbox from "../../../components/common/ImageWithLightbox";
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
    namespace: "careers_page.seo",
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
      url: "https://openqcore.com/company/careers",
      siteName: "OpenQCore",
    },
    alternates: {
      canonical: "https://openqcore.com/company/careers",
      languages: {
        en: "https://openqcore.com/en/company/careers",
        ar: "https://openqcore.com/ar/company/careers",
      },
    },
  };
}

const wrap = "mx-auto w-full max-w-[1420px] px-6 lg:px-8";

const card =
  "group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0b1222] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37]/22 hover:shadow-[0_8px_32px_rgba(212,175,55,.06)]";

const cardGold =
  "group relative overflow-hidden rounded-[28px] border border-[#d4af37]/15 bg-gradient-to-b from-[#d4af37]/[0.05] to-[#0b1222] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37]/28 hover:shadow-[0_8px_32px_rgba(212,175,55,.09)]";

const cardBlue =
  "group relative overflow-hidden rounded-[24px] border border-blue-500/[0.12] bg-gradient-to-b from-blue-500/[0.04] to-[#0a1020] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/20 hover:shadow-[0_6px_24px_rgba(59,130,246,.07)]";

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

const valueIcons: Record<string, string> = {
  curiosity:
    "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z",
  initiative:
    "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z",
  craftsmanship:
    "M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42",
  collaboration:
    "M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z",
  adaptability:
    "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99",
  long_term_thinking:
    "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
};

const platformIcons: Record<string, string> = {
  profile_analysis:
    "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z",
  dynamic_evals:
    "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z",
  role_matching:
    "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z",
  talent_intelligence:
    "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z",
  career_discovery:
    "M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z",
};

const areaIcons: Record<string, string> = {
  artificial_intelligence:
    "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z",
  research_innovation:
    "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-1.342m-7.482 0c-.369.06-.736.124-1.1.19m7.48-.19c.37.061.74.124 1.1.19m-7.48-.19a49.93 49.93 0 0 0-3.741 1.342m0 0a49.929 49.929 0 0 1 3.741 1.342m0 0 1.341-.552",
  software_engineering:
    "M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5",
  platform_infrastructure:
    "M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z",
  voice_technologies:
    "M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z",
  agent_architectures:
    "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z",
  developer_experience:
    "M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z",
  product_development:
    "M21 7.5l-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9",
  design_ux:
    "M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42",
  emerging_technologies:
    "M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18",
};

const values = [
  "curiosity",
  "initiative",
  "craftsmanship",
  "collaboration",
  "adaptability",
  "long_term_thinking",
] as const;

const platform = [
  "profile_analysis",
  "dynamic_evals",
  "role_matching",
  "talent_intelligence",
  "career_discovery",
] as const;

const areas = [
  "artificial_intelligence",
  "research_innovation",
  "software_engineering",
  "platform_infrastructure",
  "voice_technologies",
  "agent_architectures",
  "developer_experience",
  "product_development",
  "design_ux",
  "emerging_technologies",
] as const;

export default async function CareersPage({
  params,
}: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "careers_page",
  });

  return (
    <main className="min-h-screen bg-[#050911] text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.05]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[5%] top-[-18%] h-[650px] w-[850px] rounded-full bg-[radial-gradient(ellipse,rgba(212,175,55,0.10),transparent_55%)]" />
          <div className="absolute right-[-5%] top-[25%] h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.07),transparent_60%)]" />
          <div className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(212,175,55,0.04),transparent_70%)]" />
        </div>

        <div className={`${wrap} relative pb-20 pt-32 md:pb-28 md:pt-44`}>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <SectionLabel>{t("hero.kicker")}</SectionLabel>

              <h1 className="mt-8 max-w-4xl text-[clamp(2.6rem,5.5vw,4.9rem)] font-bold leading-[0.95] tracking-[-0.04em] text-white">
                {t("hero.title")}
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300 md:text-[1.1rem]">
                {t("hero.desc")}
              </p>
              <p className="mt-4 max-w-xl text-base leading-8 text-slate-400">
                {t("hero.desc2")}
              </p>
              <p className="mt-4 max-w-xl text-base leading-8 text-slate-400">
                {t("hero.desc3")}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {(
                  [
                    "Researchers",
                    "Engineers",
                    "Designers",
                    "Builders",
                    "Innovators",
                  ] as const
                ).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#d4af37]/20 bg-[#d4af37]/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#f3d98a]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <PrimaryCTA href="#platform">
                  {t("hero.cta_primary")}
                </PrimaryCTA>

                <SecondaryCTA href="/company/contact">
                  {t("cta.btn_contact")}
                </SecondaryCTA>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative flex justify-center">
                <div className="pointer-events-none absolute -inset-10 rounded-[40px] bg-[#d4af37]/10 blur-3xl" />

                <ImageWithLightbox
                  src="/engines/careers-hero.png"
                  alt="OpenQCore Careers"
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

      {/* THE PEOPLE BEHIND INNOVATION */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionLabel>{t("people.kicker")}</SectionLabel>
              <h2 className={secH2}>{t("people.title")}</h2>
              <p className="mt-5 text-sm leading-8 text-slate-300">
                {t("people.p1")}
              </p>
              <p className="mt-4 text-sm leading-8 text-slate-400">
                {t("people.p2")}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  "researchers",
                  "engineers",
                  "designers",
                  "developers",
                  "innovators",
                ] as const
              ).map((k) => (
                <div
                  key={k}
                  className="flex items-center gap-3 rounded-[18px] border border-white/[0.08] bg-[#0b1222] px-4 py-4 transition-all hover:border-[#d4af37]/20"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#d4af37]/15 bg-[#d4af37]/[0.07] text-[#d4af37]">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {t(`people.roles.${k}`)}
                  </span>
                </div>
              ))}

              <div className="col-span-2 flex items-center gap-3 rounded-[18px] border border-[#d4af37]/12 bg-gradient-to-r from-[#d4af37]/[0.05] to-transparent px-5 py-4">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#d4af37]/50" />
                <span className="text-sm font-medium text-slate-300">
                  {t("people.tagline")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A DIFFERENT APPROACH */}
      <section className="border-b border-white/[0.05] bg-[#050911]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="lg:sticky lg:top-28">
              <SectionLabel>{t("approach.kicker")}</SectionLabel>
              <h2 className={secH2}>{t("approach.title")}</h2>
              <p className="mt-4 max-w-sm text-sm leading-8 text-slate-400">
                {t("approach.p1")}
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div className={`${card} p-6`}>
                <p className="text-sm leading-8 text-slate-300">
                  {t("approach.p2")}
                </p>
              </div>
              <div className={`${card} p-6`}>
                <p className="text-sm leading-8 text-slate-400">
                  {t("approach.p3")}
                </p>
              </div>
              <div className="relative overflow-hidden rounded-[28px] border border-[#d4af37]/18 bg-gradient-to-br from-[#d4af37]/[0.07] to-transparent p-6">
                <div className="pointer-events-none absolute right-4 top-3 select-none font-serif text-[72px] leading-none text-[#d4af37]/[0.08]">
                  "
                </div>
                <p className="relative text-base font-medium leading-8 text-[#f3d98a]">
                  {t("approach.quote")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TALENT PLATFORM */}
      <section id="platform" className="border-b border-white/[0.05] bg-[#070d18]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("platform.kicker")}</SectionLabel>
          <h2 className={secH2}>{t("platform.title")}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            {t("platform.desc")}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/[0.07] px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
            <span className="text-xs font-semibold tracking-wide text-blue-300">
              {t("platform.status")}
            </span>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {platform.map((k) => (
              <article key={k} className={`${cardGold} p-7`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/[0.08] text-[#d4af37]">
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
                      d={platformIcons[k]}
                    />
                  </svg>
                </div>
                <h3 className="mt-5 text-base font-semibold text-white">
                  {t(`platform.features.${k}.title`)}
                </h3>
                <p className={`mt-2.5 ${cardBody}`}>
                  {t(`platform.features.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE VALUE */}
      <section className="border-b border-white/[0.05] bg-[#050911]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("values.kicker")}</SectionLabel>
          <h2 className={secH2}>{t("values.title")}</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
            {t("values.desc")}
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {values.map((k) => (
              <article key={k} className={`${card} p-7`}>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#d4af37]/15 bg-[#d4af37]/[0.06] text-[#d4af37] transition-colors group-hover:bg-[#d4af37]/10">
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
                        d={valueIcons[k]}
                      />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-[#f3d98a]">
                    {t(`values.items.${k}.title`)}
                  </h3>
                </div>
                <p className={`mt-4 ${cardBody}`}>
                  {t(`values.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS WE ARE EXPLORING */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("areas.kicker")}</SectionLabel>
          <h2 className={secH2}>{t("areas.title")}</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
            {t("areas.desc")}
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {areas.map((k) => (
              <article key={k} className={`${cardBlue} p-5`}>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-400/15 bg-blue-500/[0.08] text-blue-400 transition-colors group-hover:bg-blue-400/15">
                  <svg
                    className="h-4 w-4"
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
                <h3 className="mt-4 text-sm font-semibold text-white">
                  {t(`areas.items.${k}.title`)}
                </h3>
                <p className="mt-1.5 text-xs leading-6 text-slate-500">
                  {t(`areas.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BEYOND RECRUITMENT */}
      <section className="border-b border-white/[0.05] bg-[#050911]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="grid gap-8 lg:grid-cols-3">
            <article className={`${card} p-7`}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/18 bg-[#d4af37]/[0.06] px-3 py-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#d4af37]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#f3d98a]">
                  {t("dev.badge")}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">
                {t("dev.title")}
              </h3>
              <p className={`mt-3 ${cardBody}`}>{t("dev.p1")}</p>
              <p className={`mt-3 ${cardBody}`}>{t("dev.p2")}</p>
            </article>

            <article className={`${card} p-7`}>
              <h3 className="text-lg font-bold text-white">
                {t("beyond.title")}
              </h3>
              <p className={`mt-3 ${cardBody}`}>{t("beyond.p1")}</p>
              <p className={`mt-3 ${cardBody}`}>{t("beyond.p2")}</p>
              <p className="mt-4 text-sm leading-7 text-[#f3d98a]">
                {t("beyond.highlight")}
              </p>
            </article>

            <article className="relative overflow-hidden rounded-[28px] border border-[#d4af37]/18 bg-gradient-to-b from-[#d4af37]/[0.07] to-[#0b1222] p-7">
              <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12),transparent_70%)]" />
              <h3 className="text-lg font-bold text-[#f3d98a]">
                {t("connected.title")}
              </h3>
              <p className={`mt-3 ${cardBody}`}>{t("connected.p1")}</p>
              <p className={`mt-3 ${cardBody}`}>{t("connected.p2")}</p>
            </article>
          </div>
        </div>
      </section>

      {/* STAY CONNECTED CTA */}
      <section className="bg-[#070d18]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#0b1222] p-8 md:p-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_10%_30%,rgba(212,175,55,0.07),transparent_55%),radial-gradient(ellipse_40%_60%_at_90%_70%,rgba(59,130,246,0.05),transparent_60%)]" />

            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <SectionLabel>{t("cta.kicker")}</SectionLabel>
                <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-white md:text-4xl">
                  {t("cta.title")}
                </h2>
                <p className="mt-5 text-sm leading-8 text-slate-300">
                  {t("cta.p1")}
                </p>
                <p className="mt-4 text-sm leading-8 text-slate-400">
                  {t("cta.p2")}
                </p>
                <p className="mt-4 text-sm font-medium leading-7 text-[#f3d98a]">
                  {t("cta.closing")}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <PrimaryCTA href="/company/contact">
                    {t("cta.btn_contact")}
                  </PrimaryCTA>

                  <SecondaryCTA href="/research">
                    {t("cta.btn_research")}
                  </SecondaryCTA>
                </div>
              </div>

              <div className="rounded-[24px] border border-white/[0.08] bg-[#050911]/60 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#d4af37]">
                  {t("cta.welcome_label")}
                </h3>
                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  {(
                    [
                      "researchers",
                      "engineers",
                      "developers",
                      "designers",
                      "students",
                      "entrepreneurs",
                    ] as const
                  ).map((k) => (
                    <div
                      key={k}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3 text-sm font-medium text-white transition-colors hover:border-[#d4af37]/18"
                    >
                      {t(`cta.welcome.${k}`)}
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