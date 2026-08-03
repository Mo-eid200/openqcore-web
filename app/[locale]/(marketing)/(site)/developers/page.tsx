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
    namespace: "developers_page.seo",
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
      url: "https://openqcore.com/developers",
      siteName: "OpenQCore",
    },
    alternates: {
      canonical: "https://openqcore.com/developers",
      languages: {
        en: "https://openqcore.com/en/developers",
        ar: "https://openqcore.com/ar/developers",
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

const sectionTitle =
  "text-[clamp(1.9rem,3.4vw,3.2rem)] font-bold tracking-[-0.03em] text-white";

const body = "text-sm md:text-base leading-8 text-slate-300";

const disabledBtn =
  "inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-5 text-sm font-semibold text-slate-300 opacity-80 cursor-not-allowed";

const card =
  "rounded-[28px] border border-white/[0.08] bg-[#0b1222] p-6 text-center transition duration-300 hover:border-[#d4af37]/30 hover:bg-[#0f1730]";

const softCard =
  "rounded-[28px] border border-white/[0.08] bg-[#0b1222] transition duration-300 hover:border-white/[0.14]";

export default async function DevelopersPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "developers_page",
  });

  const resourceCards = [
    {
      key: "sdks",
      tone: "from-cyan-500/10 to-cyan-200/5 border-cyan-300/20",
    },
    {
      key: "playground",
      tone: "from-fuchsia-500/10 to-fuchsia-200/5 border-fuchsia-300/20",
    },
    {
      key: "guides",
      tone: "from-emerald-500/10 to-emerald-200/5 border-emerald-300/20",
    },
    {
      key: "showcase",
      tone: "from-amber-500/10 to-amber-200/5 border-amber-300/20",
    },
    {
      key: "blog",
      tone: "from-violet-500/10 to-violet-200/5 border-violet-300/20",
    },
  ] as const;

  const tools = [
    "token_calculator",
    "request_inspector",
    "architecture_explorer",
  ] as const;

  const whyBuild = [
    "unified_runtime",
    "multimodal",
    "reliability",
    "developer_first",
    "future_proof",
  ] as const;

  return (
    <main className="min-h-screen bg-[#050911] text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.05]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[4%] top-[-18%] h-[620px] w-[760px] rounded-full bg-[radial-gradient(ellipse,rgba(212,175,55,.12),transparent_60%)]" />
          <div className="absolute right-[2%] top-[8%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,.10),transparent_62%)]" />
        </div>

        <div className={`${wrap} relative py-20 md:py-28`}>
          <div className="mx-auto max-w-5xl text-center">
            <SectionLabel>{t("hero.kicker")}</SectionLabel>

            <h1 className="mx-auto mt-8 max-w-5xl text-[clamp(2.4rem,5.8vw,5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-white">
              {t("hero.title")}
            </h1>

            <p className="mx-auto mt-6 max-w-4xl text-base leading-8 text-slate-300 md:text-lg">
              {t("hero.desc")}
            </p>
            <p className="mx-auto mt-3 max-w-4xl text-base leading-8 text-slate-300 md:text-lg">
              {t("hero.desc_2")}
            </p>

<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
  <PrimaryCTA href="/company/contact?intent=developers">
    {t("hero.cta_primary")}
  </PrimaryCTA>

  <SecondaryCTA href="/infrastructure/pulse-engine">
    {t("hero.cta_secondary")}
  </SecondaryCTA>
</div>
          </div>
        </div>
      </section>

      {/* Everything developers need */}
      <section className="border-b border-white/[0.05]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="text-center">
            <SectionLabel>{t("value.title")}</SectionLabel>
            <h2 className={`mt-5 ${sectionTitle}`}>{t("value.title")}</h2>
            <p className={`mx-auto mt-5 max-w-4xl ${body}`}>
              {t("value.desc")}
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-3 md:grid-cols-3">
            {["pill_1", "pill_2", "pill_3"].map((k) => (
              <div
                key={k}
                className="rounded-2xl border border-white/[0.08] bg-[#0b1222] px-4 py-4 text-center text-sm font-semibold text-slate-200"
              >
                {t(`value.${k}`)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Resources */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="text-center">
            <SectionLabel>{t("resources.title")}</SectionLabel>
            <h2 className={`mt-5 ${sectionTitle}`}>{t("resources.title")}</h2>
            <p className="mt-3 text-slate-300">{t("resources.subtitle")}</p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {resourceCards.map((r) => (
              <article
                key={r.key}
                className={`rounded-[28px] border bg-gradient-to-b ${r.tone} p-6 text-center`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-slate-100">
                    {t(`resources.items.${r.key}.title`)}
                  </h3>
                  <span className="rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#f3d98a]">
                    {t("common.coming_soon")}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(`resources.items.${r.key}.desc`)}
                </p>

                <p className="mt-4 text-xs uppercase tracking-[0.12em] text-slate-400">
                  {t("common.includes")}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {[1, 2, 3, 4].map((n) => (
                    <li key={n} className="text-sm text-slate-200">
                      • {t(`resources.items.${r.key}.includes.${n}`)}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex justify-center">
                  <span aria-disabled className={disabledBtn}>
                    {t(`resources.items.${r.key}.cta`)}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Tools */}
      <section className="border-b border-white/[0.05]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="text-center">
            <SectionLabel>{t("tools.title")}</SectionLabel>
            <h2 className={`mt-5 ${sectionTitle}`}>{t("tools.title")}</h2>
            <p className={`mt-3 ${body}`}>{t("tools.subtitle")}</p>
            <p className={`mt-2 ${body}`}>{t("tools.desc")}</p>

            <div className="mt-5 flex justify-center">
              <span className="inline-flex rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#f3d98a]">
                {t("common.coming_soon")}
              </span>
            </div>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {tools.map((tool) => (
              <article key={tool} className={card}>
                <h3 className="text-lg font-bold text-slate-100">
                  {t(`tools.items.${tool}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(`tools.items.${tool}.desc`)}
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.12em] text-slate-400">
                  {t("tools.planned")}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {[1, 2, 3, 4].map((n) => (
                    <li key={n} className="text-sm text-slate-200">
                      • {t(`tools.items.${tool}.features.${n}`)}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured release */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <SectionLabel>{t("release.kicker")}</SectionLabel>

              <h2 className="mt-5 text-3xl font-bold tracking-[-0.03em] text-white md:text-4xl">
                {t("release.title")}
              </h2>
              <p className="mt-4 max-w-4xl leading-8 text-slate-200">
                {t("release.desc")}
              </p>
              <p className="mt-3 max-w-4xl leading-8 text-slate-300">
                {t("release.desc_2")}
              </p>

              <div className="mt-8">
                <PrimaryCTA href="/infrastructure/pulse-engine">
                  {t("release.cta")}
                </PrimaryCTA>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className={softCard + " p-2"}>
                <ImageWithLightbox
                  src="/engines/pulse-logo.png"
                  alt="Pulse Engine v1.0"
                  width={1400}
                  height={1000}
                  className="group block w-full overflow-hidden rounded-[22px]"
                  imageClassName="aspect-[4/3] w-full rounded-[22px] object-cover transition duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why build */}
      <section className="border-b border-white/[0.05]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="text-center">
            <SectionLabel>{t("why.title")}</SectionLabel>
            <h2 className={`mt-5 ${sectionTitle}`}>{t("why.title")}</h2>
            <p className={`mx-auto mt-4 max-w-4xl ${body}`}>{t("why.desc")}</p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {whyBuild.map((k) => (
              <article key={k} className={card}>
                <h3 className="text-base font-bold text-slate-100">
                  {t(`why.items.${k}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  {t(`why.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="text-center">
            <SectionLabel>{t("community.title")}</SectionLabel>
            <h2 className={`mt-5 ${sectionTitle}`}>{t("community.title")}</h2>
            <p className={`mx-auto mt-4 max-w-4xl ${body}`}>
              {t("community.desc")}
            </p>
          </div>

          <ul className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {["1", "2", "3", "4", "5"].map((n) => (
              <li
                key={n}
                className="rounded-2xl border border-white/[0.08] bg-[#0b1222] px-4 py-4 text-center text-sm font-semibold text-slate-200"
              >
                {t(`community.items.${n}`)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#050911]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="rounded-[32px] border border-white/[0.08] bg-[linear-gradient(125deg,rgba(212,175,55,.18),rgba(10,16,29,.94)_48%,rgba(10,16,29,.98))] p-8 text-center md:p-10">
            <h2 className="text-3xl font-bold tracking-[-0.03em] text-white md:text-4xl">
              {t("final.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-4xl leading-8 text-slate-200">
              {t("final.desc")}
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <button disabled className={disabledBtn}>
                {t("final.cta_1")}
              </button>
              <button disabled className={disabledBtn}>
                {t("final.cta_2")}
              </button>
              <button disabled className={disabledBtn}>
                {t("final.cta_3")}
              </button>
            </div>
            <p className="mt-8 text-sm font-semibold text-[#f3d98a]">
              {t("final.tagline")}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}