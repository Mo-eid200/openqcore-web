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
    namespace: "research_open_research_program.seo",
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
      url: "https://openqcore.com/research/programs/open-research",
      siteName: "OpenQCore",
    },
    alternates: {
      canonical: "https://openqcore.com/research/programs/open-research",
      languages: {
        en: "https://openqcore.com/en/research/programs/open-research",
        ar: "https://openqcore.com/ar/research/programs/open-research",
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

export default async function OpenResearchProgramPage({
  params,
}: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "research_open_research_program",
  });

  const tracks = [
    "technical_reports",
    "research_papers",
    "benchmarks",
    "whitepapers",
  ] as const;

  const hasPublications = false;

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
              <SectionLabel>{t("page.hero_kicker")}</SectionLabel>

              <h1 className="mt-8 max-w-5xl text-[clamp(2.4rem,5.8vw,4.8rem)] font-bold leading-[0.95] tracking-[-0.04em] text-white">
                {t("page.hero_title")}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-[1.1rem]">
                {t("page.hero_desc")}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <PrimaryCTA href="/company/contact?intent=research">
                  {t("page.cta_primary")}
                </PrimaryCTA>

                <SecondaryCTA href="/research/publications">
                  {t("page.cta_secondary")}
                </SecondaryCTA>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative ms-auto w-full max-w-[560px]">
                <div className="absolute -inset-5 rounded-[30px] bg-[#d4af37]/10 blur-2xl" />
                <div className="relative rounded-[26px] border border-white/[0.08] bg-[#0b1222]/85 p-2.5 shadow-[0_20px_70px_rgba(0,0,0,0.28)]">
                  <ImageWithLightbox
                    src="/engines/openqcore-open-research-program.png"
                    alt="OpenQCore Open Research Program"
                    width={1400}
                    height={1000}
                    className="group block w-full overflow-hidden rounded-[20px]"
                    imageClassName="aspect-[4/3] w-full rounded-[20px] object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PUBLICATION TRACKS */}
      <section className="border-b border-white/[0.05]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("page.tracks_title")}</SectionLabel>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {tracks.map((k) => (
              <article key={k} className={card}>
                <h3 className="text-xl font-bold text-white">
                  {t(`page.tracks.${k}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(`page.tracks.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EMPTY STATE */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className={`${wrap} py-24 md:py-28`}>
          <SectionLabel>{t("page.publications_title")}</SectionLabel>

          {!hasPublications && (
            <div className="mt-8 rounded-[30px] border border-dashed border-white/[0.12] bg-[#0b1222]/70 p-8 text-center md:p-10">
              <p className="mx-auto max-w-4xl text-sm leading-8 text-slate-300">
                {t("page.empty_primary")}
              </p>
              <p className="mx-auto mt-4 max-w-4xl text-sm leading-8 text-slate-400">
                {t("page.empty_secondary")}
              </p>

              <div className="mt-8 flex justify-center">
                <PrimaryCTA href="/company/contact?intent=research">
                  {t("page.empty_cta")}
                </PrimaryCTA>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}