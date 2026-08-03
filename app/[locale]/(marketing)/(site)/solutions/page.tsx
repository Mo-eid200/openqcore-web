import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
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
    namespace: "solutions_page.seo",
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
      url: "https://openqcore.com/solutions",
      siteName: "OpenQCore",
    },
    twitter: {
      card: "summary_large_image",
      title: t("og_title"),
      description: t("og_description"),
    },
    alternates: {
      canonical: "https://openqcore.com/solutions",
      languages: {
        en: "https://openqcore.com/en/solutions",
        ar: "https://openqcore.com/ar/solutions",
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

export default async function SolutionsPage({
  params,
}: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "solutions_page",
  });

  const portfolio = [
    { key: "enterprise", href: "/solutions/enterprise" },
    { key: "startups", href: "/solutions/startups" },
    { key: "security", href: "/solutions/security" },
    { key: "compliance", href: "/solutions/compliance" },
  ] as const;

  const directIntents = [
    "white_label_ai",
    "custom_ai_dev",
    "ai_consulting",
  ] as const;

  const useCases = [
    "support",
    "knowledge",
    "automation",
    "products",
  ] as const;

  const delivery = [
    "advisory",
    "build_delivery",
    "dedicated_engineering",
    "white_label",
  ] as const;

  const why = [
    "multi_provider",
    "production_reliability",
    "voice_multimodal",
    "enterprise_governance",
    "white_label_ready",
    "custom_development",
  ] as const;

  const industries = [
    "enterprise",
    "startups",
    "saas",
    "healthcare",
    "financial",
    "government",
  ] as const;

  const featured = [
    "enterprise_ai",
    "ai_infra",
    "voice_ai",
    "knowledge_systems",
    "white_label_platforms",
    "custom_dev",
  ] as const;

  const metrics = [
    {
      key: "providers",
      value: "8+",
      label: t("metrics.providers"),
      kind: "number",
    },
    {
      key: "modalities",
      value: "4",
      label: t("metrics.modalities"),
      kind: "number",
    },
    {
      key: "governance",
      value: t("metrics.governance_value"),
      label: t("metrics.governance"),
      kind: "text",
    },
    {
      key: "branding",
      value: t("metrics.branding_value"),
      label: t("metrics.branding"),
      kind: "text",
    },
  ] as const;

  return (
    <main className="min-h-screen bg-[#04070f] text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.05]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-10%] top-[-24%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.18),transparent_65%)]" />
          <div className="absolute right-[-10%] top-[0%] h-[760px] w-[760px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.14),transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_30%)]" />
        </div>

        <div className={`${wrap} relative pb-20 pt-28 md:pb-24 md:pt-40`}>
          <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="max-w-3xl">
              <SectionLabel>{t("hero.kicker")}</SectionLabel>

              <h1 className="mt-8 max-w-4xl text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.92] tracking-[-0.04em] text-white">
                {t("hero.title")}
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-[1.15rem]">
                {t("hero.desc")}
              </p>

              <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 md:grid-cols-3">
                {[
                  t("metrics.providers"),
                  t("metrics.modalities"),
                  t("metrics.governance"),
                  t("metrics.branding"),
                ].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-center text-[11px] font-semibold text-slate-200"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <PrimaryCTA href="/solutions/enterprise">
                  {t("hero.cta_primary")}
                </PrimaryCTA>

                <SecondaryCTA href="/company/contact?intent=solutions">
                  {t("hero.cta_secondary")}
                </SecondaryCTA>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[40px] bg-[#d4af37]/10 blur-3xl" />

              <div className="relative rounded-[30px] border border-white/[0.08] bg-[#0b1222]/80 p-3 shadow-[0_20px_70px_rgba(0,0,0,0.28)]">
                <ImageWithLightbox
                  src="/engines/solutions-hero.png"
                  alt="OpenQCore Solutions"
                  width={960}
                  height={720}
                  className="group block w-full overflow-hidden rounded-[22px]"
                  imageClassName="h-auto w-full rounded-[22px] object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="border-b border-white/[0.05] bg-[#060b16]">
        <div className={`${wrap} py-16 md:py-20`}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m) => (
              <div
                key={m.key}
                className="rounded-[24px] border border-white/[0.08] bg-[#0b1222] p-5"
              >
                <div
                  dir="ltr"
                  className={`font-bold text-[#f3d98a] ${
                    m.kind === "number"
                      ? "text-3xl tabular-nums"
                      : "text-lg leading-tight md:text-xl"
                  }`}
                >
                  {m.value}
                </div>
                <div className="mt-2 text-sm text-slate-300">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS PORTFOLIO */}
      <section className="border-b border-white/[0.05] py-24 md:py-28">
        <div className={wrap}>
          <SectionLabel>{t("portfolio.title")}</SectionLabel>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            {t("portfolio.desc")}
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {portfolio.map((item) => (
              <article
                key={item.key}
                className={`${softCard} p-7 hover:border-[#d4af37]/20`}
              >
                <h3 className="text-xl font-bold text-white">
                  {t(`portfolio.items.${item.key}.title`)}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-slate-300">
                  {t(`portfolio.items.${item.key}.desc`)}
                </p>
                <div className="mt-5">
                  <LinkLike href={item.href}>
                    {t("portfolio.learn_more")}
                  </LinkLike>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {directIntents.map((k) => (
              <article
                key={k}
                className="rounded-[28px] border border-white/[0.08] bg-[#0b1222] p-6 text-center"
              >
                <h3 className="text-lg font-bold text-white">
                  {t(`portfolio.direct_intents.${k}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(`portfolio.direct_intents.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="border-b border-white/[0.05] bg-[#060b16] py-24 md:py-28">
        <div className={wrap}>
          <SectionLabel>{t("use_cases.title")}</SectionLabel>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {useCases.map((k) => (
              <article
                key={k}
                className="rounded-[28px] border border-white/[0.08] bg-[#0b1222] p-6 text-center"
              >
                <h3 className="text-xl font-bold text-white">
                  {t(`use_cases.items.${k}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(`use_cases.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE SNAPSHOT */}
      <section className="border-b border-white/[0.05] py-24 md:py-28">
        <div className={wrap}>
          <div className="mx-auto max-w-4xl text-center">
            <SectionLabel>{t("architecture.title")}</SectionLabel>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-400">
              {t("architecture.desc")}
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl rounded-[30px] border border-white/[0.08] bg-[#0b1222] p-6 md:p-8">
            <div className="space-y-2">
              {(
                [
                  "applications_agents",
                  "runtime",
                  "product_layer",
                  "multi_provider_layer",
                  "security_governance",
                  "audit_observability",
                ] as const
              ).map((step, idx) => (
                <div
                  key={step}
                  className="flex flex-col items-center"
                >
                  <div className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-center text-sm font-semibold text-white">
                    {t(`architecture.flow.${step}`)}
                  </div>
                  {idx < 5 && (
                    <div className="my-2 h-5 w-px bg-[#d4af37]/60" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY MODELS */}
      <section className="border-b border-white/[0.05] bg-[#060b16] py-24 md:py-28">
        <div className={wrap}>
          <SectionLabel>{t("delivery.title")}</SectionLabel>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {delivery.map((k) => (
              <article
                key={k}
                className={`${baseCard} p-6 text-center hover:border-white/[0.14]`}
              >
                <h3 className="text-lg font-bold text-white">
                  {t(`delivery.items.${k}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(`delivery.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY OPENQCORE */}
      <section className="border-b border-white/[0.05] py-24 md:py-28">
        <div className={wrap}>
          <SectionLabel>{t("why.title")}</SectionLabel>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {why.map((k) => (
              <article
                key={k}
                className="rounded-[28px] border border-[#d4af37]/20 bg-gradient-to-br from-[#d4af37]/10 to-[#0b1222] p-6 text-center transition duration-300 hover:border-[#d4af37]/35"
              >
                <h3 className="text-lg font-bold text-white">
                  {t(`why.items.${k}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-200">
                  {t(`why.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="border-b border-white/[0.05] bg-[#060b16] py-24 md:py-28">
        <div className={wrap}>
          <SectionLabel>{t("industries.title")}</SectionLabel>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {industries.map((k) => (
              <div
                key={k}
                className="rounded-2xl border border-white/[0.08] bg-[#0b1222] px-4 py-4 text-center text-sm font-semibold text-slate-200"
              >
                {t(`industries.items.${k}`)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED SOLUTION AREAS */}
      <section className="border-b border-white/[0.05] py-24 md:py-28">
        <div className={wrap}>
          <SectionLabel>{t("featured.title")}</SectionLabel>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((k) => (
              <article
                key={k}
                className="rounded-[28px] border border-white/[0.08] bg-[#0a101d] p-6 text-center transition duration-300 hover:border-white/[0.14]"
              >
                <h3 className="text-lg font-bold text-white">
                  {t(`featured.items.${k}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(`featured.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#050912]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="rounded-[32px] border border-white/[0.08] bg-[linear-gradient(120deg,rgba(212,175,55,.16),rgba(10,16,29,.9)_45%,rgba(10,16,29,.95))] p-8 text-center md:p-10 md:text-start">
            <h2 className="mx-auto max-w-4xl text-3xl font-bold tracking-[-0.03em] text-white md:mx-0 md:text-4xl">
              {t("final_cta.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-200 md:mx-0">
              {t("final_cta.desc")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
              <PrimaryCTA href="/company/contact?intent=solutions">
                {t("final_cta.cta_primary")}
              </PrimaryCTA>
              <SecondaryCTA href="/company/contact?intent=consultation">
                {t("final_cta.cta_secondary")}
              </SecondaryCTA>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function LinkLike({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm font-semibold text-[#f3d98a] transition hover:text-[#f7e6ab]"
    >
      {children}
    </Link>
  );
}