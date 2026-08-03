import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
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
    namespace: "startup_page.seo",
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
      url: "https://openqcore.com/solutions/startups",
      siteName: "OpenQCore",
    },
    twitter: {
      card: "summary_large_image",
      title: t("og_title"),
      description: t("og_description"),
    },
    alternates: {
      canonical: "https://openqcore.com/solutions/startups",
      languages: {
        en: "https://openqcore.com/en/solutions/startups",
        ar: "https://openqcore.com/ar/solutions/startups",
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

const baseCard =
  "rounded-[28px] border border-white/[0.08] bg-[#0b1222] transition duration-300";

const softCard =
  "rounded-[30px] border border-white/[0.08] bg-[#0b1222] transition duration-300 hover:border-white/[0.14]";

export default async function StartupsPage({
  params,
}: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "startup_page",
  });

  const why = [
    "time_to_market",
    "multi_provider",
    "lower_complexity",
    "scale_without_rewrites",
  ] as const;

  const builds = [
    "copilots",
    "voice_apps",
    "knowledge_platforms",
    "multimodal_products",
  ] as const;

  const advantages = [
    "unified_api",
    "routing",
    "knowledge_layer",
    "white_label",
  ] as const;

  const stages = [
    "prototype",
    "beta",
    "production",
    "growth",
    "enterprise",
  ] as const;

  const scenarios = [
    "saas_assistant",
    "voice_first",
    "ops_tool",
  ] as const;

  return (
    <main className="min-h-screen bg-[#04070f] text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.05]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-10%] top-[-22%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.18),transparent_65%)]" />
          <div className="absolute right-[-8%] top-[0%] h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.14),transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_30%)]" />
        </div>

        <div className={`${wrap} relative pb-20 pt-28 md:pb-24 md:pt-40`}>
          <div className="max-w-3xl">
            <SectionLabel>{t("hero.kicker")}</SectionLabel>

            <h1 className="mt-8 max-w-4xl text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.92] tracking-[-0.04em] text-white">
              {t("hero.title")}
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300 md:text-[1.15rem]">
              {t("hero.desc")}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <PrimaryCTA href="/developers">
                {t("hero.cta_primary")}
              </PrimaryCTA>

              <SecondaryCTA href="/company/contact?intent=startup">
                {t("hero.cta_secondary")}
              </SecondaryCTA>
            </div>
          </div>
        </div>
      </section>

      {/* WHY STARTUPS CHOOSE */}
      <section className="border-b border-white/[0.05] py-24 md:py-28">
        <div className={wrap}>
          <SectionLabel>{t("why.title")}</SectionLabel>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {why.map((k) => (
              <article
                key={k}
                className={`${softCard} p-7 hover:border-[#d4af37]/20`}
              >
                <h3 className="text-xl font-bold leading-7 text-white">
                  {t(`why.items.${k}.title`)}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-slate-300">
                  {t(`why.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU CAN BUILD */}
      <section className="border-b border-white/[0.05] bg-[#060b16] py-24 md:py-28">
        <div className={wrap}>
          <SectionLabel>{t("build.title")}</SectionLabel>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {builds.map((k) => (
              <article
                key={k}
                className="rounded-[28px] border border-white/[0.08] bg-[#0b1222] p-6"
              >
                <h3 className="text-xl font-bold text-white">
                  {t(`build.items.${k}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(`build.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STARTUP ADVANTAGES */}
      <section className="border-b border-white/[0.05] py-24 md:py-28">
        <div className={wrap}>
          <SectionLabel>{t("advantages.title")}</SectionLabel>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {advantages.map((k) => (
              <article
                key={k}
                className="rounded-[28px] border border-[#d4af37]/25 bg-gradient-to-br from-[#d4af37]/12 to-[#0b1222] p-6 transition duration-300 hover:border-[#d4af37]/35"
              >
                <h3 className="text-xl font-bold text-white">
                  {t(`advantages.items.${k}.title`)}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-slate-200">
                  {t(`advantages.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MVP TO SCALE */}
      <section className="border-b border-white/[0.05] bg-[#060b16] py-24 md:py-28">
        <div className={wrap}>
          <SectionLabel>{t("journey.title")}</SectionLabel>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            {t("journey.desc")}
          </p>

          <div className="mt-10 hidden grid-cols-5 gap-3 md:grid">
            {stages.map((s, idx) => (
              <div
                key={s}
                className="rounded-2xl border border-white/[0.08] bg-[#0b1222] p-4"
              >
                <div
                  dir="ltr"
                  className="text-xs uppercase tracking-[0.14em] text-[#d4af37] tabular-nums"
                >
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="mt-2 text-sm font-bold text-white">
                  {t(`journey.stages.${s}.title`)}
                </div>
                <div className="mt-2 text-xs leading-6 text-slate-400">
                  {t(`journey.stages.${s}.desc`)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 md:hidden">
            {stages.map((s, idx) => (
              <div
                key={s}
                className="rounded-2xl border border-white/[0.08] bg-[#0b1222] p-4"
              >
                <div
                  dir="ltr"
                  className="text-xs uppercase tracking-[0.14em] text-[#d4af37] tabular-nums"
                >
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="mt-2 text-sm font-bold text-white">
                  {t(`journey.stages.${s}.title`)}
                </div>
                <div className="mt-2 text-xs leading-6 text-slate-400">
                  {t(`journey.stages.${s}.desc`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXAMPLE SCENARIOS */}
      <section className="border-b border-white/[0.05] py-24 md:py-28">
        <div className={wrap}>
          <SectionLabel>{t("scenarios.title")}</SectionLabel>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {scenarios.map((k) => (
              <article
                key={k}
                className="rounded-[28px] border border-white/[0.08] bg-[#0a101d] p-6 transition duration-300 hover:border-white/[0.14]"
              >
                <h3 className="text-lg font-bold text-white">
                  {t(`scenarios.items.${k}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(`scenarios.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#050912]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="rounded-[32px] border border-white/[0.08] bg-[linear-gradient(120deg,rgba(212,175,55,.16),rgba(10,16,29,.9)_45%,rgba(10,16,29,.95))] p-8 md:p-10">
            <h2 className="max-w-4xl text-3xl font-bold tracking-[-0.03em] text-white md:text-4xl">
              {t("final_cta.title")}
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
              {t("final_cta.desc")}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <PrimaryCTA href="/developers">
                {t("final_cta.cta_primary")}
              </PrimaryCTA>

              <SecondaryCTA href="/company/contact?intent=startup">
                {t("final_cta.cta_secondary")}
              </SecondaryCTA>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}