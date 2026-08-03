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
    namespace: "compliance_page.seo",
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
      url: "https://openqcore.com/compliance",
      siteName: "OpenQCore",
    },
    twitter: {
      card: "summary_large_image",
      title: t("og_title"),
      description: t("og_description"),
    },
    alternates: {
      canonical: "https://openqcore.com/compliance",
      languages: {
        en: "https://openqcore.com/en/compliance",
        ar: "https://openqcore.com/ar/compliance",
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

const softCard =
  "rounded-[30px] border border-white/[0.08] bg-[#0b1222] transition duration-300 hover:border-white/[0.14]";

export default async function CompliancePage({
  params,
}: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "compliance_page",
  });

  const governanceControls = [
    "access_governance",
    "audit_trails",
    "retention_controls",
    "policy_enforcement",
  ] as const;

  const lifecycle = [
    "ingestion",
    "processing",
    "storage",
    "retention",
    "deletion",
  ] as const;

  const dataHandlingBullets = [
    "ownership",
    "separation",
    "workspace_isolation",
    "context_boundaries",
  ] as const;

  const enterpriseControls = [
    "rbac",
    "workspace_isolation",
    "approval_flows",
    "audit_logs",
    "usage_visibility",
    "retention_policies",
  ] as const;

  const readiness = [
    "auditability",
    "access_controls",
    "data_governance",
    "traceability",
    "operational_oversight",
  ] as const;

  const faqs = [
    "train_data",
    "isolation",
    "audit_logs",
    "retention",
    "permissions",
  ] as const;

  const trustBannerItems = [
    "workspace_isolation",
    "auditability",
    "data_governance",
    "operational_oversight",
    "retention_controls",
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
          <div className="max-w-4xl">
            <SectionLabel>{t("hero.kicker")}</SectionLabel>

            <h1 className="mt-8 max-w-4xl text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.92] tracking-[-0.04em] text-white">
              {t("hero.title")}
            </h1>

            <p className="mt-8 max-w-4xl text-lg leading-8 text-slate-300 md:text-[1.15rem]">
              {t("hero.desc")}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <PrimaryCTA href="/company/contact?intent=compliance">
                {t("hero.cta_primary")}
              </PrimaryCTA>

              <SecondaryCTA href="/security">
                {t("hero.cta_secondary")}
              </SecondaryCTA>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BANNER */}
      <section className="border-b border-white/[0.05] bg-[#060b16] py-8">
        <div className={wrap}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {trustBannerItems.map((k) => (
              <div
                key={k}
                className="rounded-2xl border border-white/[0.08] bg-[#0b1222] px-4 py-3 text-center text-sm font-semibold text-slate-200"
              >
                {t(`trust_banner.${k}`)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GOVERNANCE CONTROLS */}
      <section className="border-b border-white/[0.05] py-24 md:py-28">
        <div className={wrap}>
          <SectionLabel>{t("governance_controls.title")}</SectionLabel>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {governanceControls.map((k) => (
              <article
                key={k}
                className={`${softCard} p-6 text-center hover:border-[#d4af37]/20`}
              >
                <h3 className="text-lg font-bold text-white">
                  {t(`governance_controls.items.${k}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(`governance_controls.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DATA HANDLING */}
      <section className="border-b border-white/[0.05] bg-[#060b16] py-24 md:py-28">
        <div className={wrap}>
          <SectionLabel>{t("data_handling.title")}</SectionLabel>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <div className="rounded-[30px] border border-white/[0.08] bg-[#0b1222] p-6 md:p-8">
              <h3 className="mb-5 text-center text-xl font-bold text-white">
                {t("data_handling.lifecycle_title")}
              </h3>

              <div className="mx-auto max-w-md space-y-2">
                {lifecycle.map((step, idx) => (
                  <div
                    key={step}
                    className="flex flex-col items-center"
                  >
                    <div className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-center text-sm font-semibold text-white">
                      {t(`data_handling.lifecycle.${step}`)}
                    </div>
                    {idx < lifecycle.length - 1 && (
                      <div className="my-2 h-5 w-px bg-[#d4af37]/60" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-[#d4af37]/25 bg-gradient-to-br from-[#d4af37]/12 to-[#0b1222] p-6 text-center">
              <h3 className="text-xl font-bold text-white">
                {t("data_handling.boundaries_title")}
              </h3>

              <ul className="mt-5 space-y-3">
                {dataHandlingBullets.map((k) => (
                  <li
                    key={k}
                    className="rounded-xl border border-white/[0.08] bg-[#0b1222]/70 px-4 py-3 text-sm text-slate-200"
                  >
                    {t(`data_handling.boundaries.${k}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ENTERPRISE CONTROLS */}
      <section className="border-b border-white/[0.05] py-24 md:py-28">
        <div className={wrap}>
          <SectionLabel>{t("enterprise_controls.title")}</SectionLabel>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {enterpriseControls.map((k) => (
              <article
                key={k}
                className="rounded-[28px] border border-white/[0.08] bg-[#0a101d] p-6 text-center transition duration-300 hover:border-white/[0.14]"
              >
                <h3 className="text-lg font-bold text-white">
                  {t(`enterprise_controls.items.${k}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(`enterprise_controls.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLIANCE READINESS */}
      <section className="border-b border-white/[0.05] bg-[#060b16] py-24 md:py-28">
        <div className={wrap}>
          <div className="text-center">
            <SectionLabel>{t("readiness.title")}</SectionLabel>
            <div className="mt-5 flex justify-center">
              <p className="max-w-3xl text-lg leading-8 text-slate-400">
                {t("readiness.desc")}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {readiness.map((k) => (
              <div
                key={k}
                className="rounded-2xl border border-white/[0.08] bg-[#0b1222] px-4 py-4 text-center text-sm font-semibold text-white"
              >
                {t(`readiness.items.${k}`)}
              </div>
            ))}
          </div>

          <p className="mx-auto mt-5 max-w-4xl text-center text-xs leading-6 text-slate-400">
            {t("readiness.disclaimer")}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-white/[0.05] py-24 md:py-28">
        <div className={wrap}>
          <SectionLabel>{t("faq.title")}</SectionLabel>

          <div className="mt-8 grid gap-3">
            {faqs.map((k) => (
              <details
                key={k}
                className="group rounded-2xl border border-white/[0.08] bg-[#0b1222] p-5 transition duration-300 hover:border-white/[0.14]"
              >
                <summary className="cursor-pointer list-none text-center text-sm font-bold text-white">
                  {t(`faq.items.${k}.q`)}
                </summary>
                <p className="mt-3 text-center text-sm leading-7 text-slate-300">
                  {t(`faq.items.${k}.a`)}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#050912]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="rounded-[32px] border border-white/[0.08] bg-[linear-gradient(120deg,rgba(212,175,55,.16),rgba(10,16,29,.9)_45%,rgba(10,16,29,.95))] p-8 text-center md:p-10">
            <h2 className="mx-auto max-w-4xl text-3xl font-bold tracking-[-0.03em] text-white md:text-4xl">
              {t("final_cta.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-200">
              {t("final_cta.desc")}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <PrimaryCTA href="/company/contact?intent=compliance">
                {t("final_cta.cta_primary")}
              </PrimaryCTA>

              <SecondaryCTA href="/security">
                {t("hero.cta_secondary")}
              </SecondaryCTA>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}