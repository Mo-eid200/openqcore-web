import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  PrimaryCTA,
  SecondaryCTA,
} from "../../../components/common/CTAButtons";
import ImageWithLightbox from "../../../components/common/ImageWithLightbox";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "security_page.seo",
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
      url: "https://openqcore.com/security",
      siteName: "OpenQCore",
    },
    twitter: {
      card: "summary_large_image",
      title: t("og_title"),
      description: t("og_description"),
    },
    alternates: {
      canonical: "https://openqcore.com/security",
      languages: {
        en: "https://openqcore.com/en/security",
        ar: "https://openqcore.com/ar/security",
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

export default async function SecurityPage({
  params,
}: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "security_page",
  });

  const pillars = [
    "authentication",
    "access_control",
    "workspace_isolation",
    "data_protection",
    "runtime_protection",
    "auditability",
    "provider_security",
    "operational_resilience",
  ] as const;

  const runtime = [
    "rate_limiting",
    "request_validation",
    "distributed_locking",
    "deduplication",
    "load_shedding",
    "circuit_breakers",
  ] as const;

  const governance = [
    "scoped_contexts",
    "retention_controls",
    "traceability",
    "access_boundaries",
  ] as const;

  const operations = [
    "monitoring",
    "incident_response",
    "service_status",
  ] as const;

  const faqs = [
    "keys",
    "isolation",
    "audit",
    "routing",
    "outages",
  ] as const;

  const principles = [
    "zero_trust",
    "encryption",
    "least_privilege",
    "monitoring",
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
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_auto]">
            <div className="max-w-4xl">
              <SectionLabel>{t("hero.kicker")}</SectionLabel>

              <h1 className="mt-8 max-w-4xl text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.92] tracking-[-0.04em] text-white">
                {t("hero.title")}
              </h1>

              <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300 md:text-[1.15rem]">
                {t("hero.desc")}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <PrimaryCTA href="/company/contact?intent=security">
                  {t("hero.cta_primary")}
                </PrimaryCTA>

                <SecondaryCTA href="/company/compliance">
                  {t("hero.cta_secondary")}
                </SecondaryCTA>
              </div>
            </div>

            <div className="shrink-0">
              <ImageWithLightbox
                  src="/engines/security-hero.png"
                  alt="OpenQCore Security"
                  width={600}
                  height={600}
                  className="group block overflow-hidden rounded-[18px]"
                  imageClassName="h-[600px] w-[600px] rounded-[18px] object-contain transition duration-300 group-hover:scale-[1.03] md:h-[400px] md:w-[400px]"
                />
              </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="border-b border-white/[0.05] py-24 md:py-28">
        <div className={wrap}>
          <SectionLabel>{t("pillars.title")}</SectionLabel>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {pillars.map((k) => (
              <article
                key={k}
                className={`${softCard} p-6 text-center hover:border-[#d4af37]/20`}
              >
                <h3 className="text-lg font-bold text-white">
                  {t(`pillars.items.${k}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(`pillars.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="border-b border-white/[0.05] bg-[#060b16] py-24 md:py-28">
        <div className={wrap}>
          <div className="mx-auto max-w-4xl text-center">
            <SectionLabel>{t("architecture.title")}</SectionLabel>
            <div className="mt-5 flex justify-center">
              <p className="max-w-3xl text-lg leading-8 text-slate-400">
                {t("architecture.desc")}
              </p>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-xl rounded-[30px] border border-white/[0.08] bg-[#0b1222] p-6 md:p-8">
            <div className="space-y-2">
              {(
                [
                  "clients",
                  "auth",
                  "access",
                  "policy",
                  "runtime",
                  "provider",
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

          <div className="mx-auto mt-8 max-w-3xl">
            <div className="rounded-[28px] border border-[#d4af37]/25 bg-gradient-to-br from-[#d4af37]/12 to-[#0b1222] p-6">
              <h3 className="text-center text-xl font-bold text-white">
                {t("architecture.side.title")}
              </h3>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <div className="rounded-xl border border-white/[0.08] bg-[#0b1222]/70 px-4 py-3 text-center text-sm text-white">
                  {t("architecture.side.audit")}
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-[#0b1222]/70 px-4 py-3 text-center text-sm text-white">
                  {t("architecture.side.tracing")}
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-[#0b1222]/70 px-4 py-3 text-center text-sm text-white">
                  {t("architecture.side.monitoring")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RUNTIME + GOVERNANCE */}
      <section className="border-b border-white/[0.05] py-24 md:py-28">
        <div className={wrap}>
          <div className="grid gap-12 xl:grid-cols-2">
            <div>
              <SectionLabel>{t("runtime.title")}</SectionLabel>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {runtime.map((k) => (
                  <article
                    key={k}
                    className="rounded-[24px] border border-white/[0.08] bg-[#0a101d] p-5 text-center transition duration-300 hover:border-white/[0.14]"
                  >
                    <h3 className="text-base font-bold text-white">
                      {t(`runtime.items.${k}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      {t(`runtime.items.${k}.desc`)}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <SectionLabel>{t("governance.title")}</SectionLabel>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {governance.map((k) => (
                  <article
                    key={k}
                    className="rounded-[24px] border border-white/[0.08] bg-[#0b1222] p-5 text-center transition duration-300 hover:border-white/[0.14]"
                  >
                    <h3 className="text-base font-bold text-white">
                      {t(`governance.items.${k}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      {t(`governance.items.${k}.desc`)}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OPERATIONS */}
      <section className="border-b border-white/[0.05] bg-[#060b16] py-24 md:py-28">
        <div className={wrap}>
          <SectionLabel>{t("operations.title")}</SectionLabel>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {operations.map((k) => (
              <article
                key={k}
                className="rounded-[28px] border border-[#d4af37]/25 bg-gradient-to-br from-[#d4af37]/12 to-[#0b1222] p-6 text-center transition duration-300 hover:border-[#d4af37]/35"
              >
                <h3 className="text-lg font-bold text-white">
                  {t(`operations.items.${k}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-200">
                  {t(`operations.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
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

      {/* SECURITY PRINCIPLES */}
      <section className="border-b border-white/[0.05] bg-[#060b16] py-16 md:py-20">
        <div className={wrap}>
          <SectionLabel>{t("principles.title")}</SectionLabel>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {principles.map((k) => (
              <article
                key={k}
                className="rounded-2xl border border-white/[0.08] bg-[#0b1222] p-5 text-center"
              >
                <h3 className="text-sm font-bold text-white">
                  {t(`principles.items.${k}.title`)}
                </h3>
                <p className="mt-2 text-xs leading-6 text-slate-300">
                  {t(`principles.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#050912]">
        <div className={`${wrap} py-24 md:py-28`}>
          <div className="rounded-[32px] border border-white/[0.08] bg-[linear-gradient(120deg,rgba(212,175,55,.16),rgba(10,16,29,.9)_45%,rgba(10,16,29,.95))] p-8 md:p-10 text-center md:text-start">
            <h2 className="mx-auto max-w-4xl text-3xl font-bold tracking-[-0.03em] text-white md:mx-0 md:text-4xl">
              {t("final_cta.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-200 md:mx-0">
              {t("final_cta.desc")}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
              <PrimaryCTA href="/company/contact?intent=security">
                {t("final_cta.cta_primary")}
              </PrimaryCTA>

              <SecondaryCTA href="/company/compliance">
                {t("hero.cta_secondary")}
              </SecondaryCTA>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}