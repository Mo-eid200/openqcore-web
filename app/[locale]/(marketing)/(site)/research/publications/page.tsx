import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PrimaryCTA, SecondaryCTA } from "../../../components/common/CTAButtons";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "research_publications_page.seo" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(",").map((k) => k.trim()),
    openGraph: {
      title: t("og_title"),
      description: t("og_description"),
      type: "website",
      url: "https://openqcore.com/research/publications",
      siteName: "OpenQCore"
    },
    alternates: {
      canonical: "https://openqcore.com/research/publications",
      languages: {
        en: "https://openqcore.com/en/research/publications",
        ar: "https://openqcore.com/ar/research/publications"
      }
    }
  };
}

const wrap = "mx-auto w-full max-w-[1400px] px-6 lg:px-8";

export default async function ResearchPublicationsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "research_publications_page" });

  return (
    <main className="min-h-screen bg-[#050911] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/[0.05]">
        <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_12%_8%,rgba(212,175,55,.12),transparent),radial-gradient(45%_35%_at_90%_8%,rgba(59,130,246,.12),transparent)]" />
        <div className={`${wrap} relative py-16 md:py-20`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]">{t("hero.kicker")}</p>
          <h1 className="mt-4 text-[clamp(2.1rem,5vw,4rem)] font-extrabold tracking-[-0.03em]">{t("hero.title")}</h1>
          <p className="mt-4 max-w-3xl text-slate-400">{t("hero.desc")}</p>
        </div>
      </section>

      {/* IN PROGRESS STATE */}
      <section>
        <div className={`${wrap} py-20 md:py-28`}>
          <div className="mx-auto max-w-2xl rounded-[28px] border border-white/10 bg-[#0b1222] p-10 text-center md:p-14">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d4af37]/20 bg-[#d4af37]/[0.08]">
              <svg className="h-6 w-6 text-[#d4af37]" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>

            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
              {t("in_progress.kicker")}
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-[-0.02em] md:text-3xl">
              {t("in_progress.title")}
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-400">
              {t("in_progress.desc")}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <PrimaryCTA href="/research">{t("in_progress.primary_cta")}</PrimaryCTA>
              <SecondaryCTA href="/company/contact">{t("in_progress.secondary_cta")}</SecondaryCTA>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}