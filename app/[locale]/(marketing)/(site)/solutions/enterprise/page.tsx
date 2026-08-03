import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
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
    namespace: "enterprise_page.seo",
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
      url: "https://openqcore.com/solutions/enterprise",
      siteName: "OpenQCore",
    },
    twitter: {
      card: "summary_large_image",
      title: t("og_title"),
      description: t("og_description"),
    },
    alternates: {
      canonical: "https://openqcore.com/solutions/enterprise",
      languages: {
        en: "https://openqcore.com/en/solutions/enterprise",
        ar: "https://openqcore.com/ar/solutions/enterprise",
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

export default async function EnterprisePage({
  params,
}: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "enterprise_page",
  });

  const deliverables = [
    "white_label",
    "custom_solutions",
    "integrations",
    "managed_deployments",
  ] as const;

  const models = [
    "advisory",
    "build_delivery",
    "dedicated_engineering",
  ] as const;

  const projects = [
    "support_platform",
    "knowledge_assistant",
    "voice_ops",
    "multimodal_platform",
  ] as const;

  const why = [
    "unified_runtime",
    "multi_provider",
    "production_reliability",
    "white_label_ready",
  ] as const;

  const process = [
    "discovery",
    "architecture",
    "implementation",
    "deployment",
    "support",
  ] as const;

  const deploymentModels = [
    "cloud",
    "private",
    "white_label",
  ] as const;

  const metrics = [
    {
      key: "providers",
      value: "8+",
      label: t("metrics.providers"),
    },
    {
      key: "modalities",
      value: "4",
      label: t("metrics.modalities"),
    },
    {
      key: "controls",
      value: t("metrics.controls_value"),
      label: t("metrics.controls"),
    },
    {
      key: "branding",
      value: t("metrics.branding_value"),
      label: t("metrics.branding"),
    },
  ];

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
          <div className="grid items-center gap-14 lg:grid-cols-[0.94fr_1.06fr]">
            <div className="max-w-3xl">
              <SectionLabel>{t("hero.kicker")}</SectionLabel>

              <h1 className="mt-8 max-w-4xl text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.92] tracking-[-0.04em] text-white">
                {t("hero.title")}
              </h1>

              <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300 md:text-[1.15rem]">
                {t("hero.desc")}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <PrimaryCTA href="/company/contact?intent=sales">
                  {t("hero.cta_primary")}
                </PrimaryCTA>

                <SecondaryCTA href="/company/contact?intent=consultation">
                  {t("hero.cta_secondary")}
                </SecondaryCTA>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[40px] bg-[#d4af37]/10 blur-3xl" />

              <div className="relative rounded-[30px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(212,175,55,0.08),rgba(11,18,34,0.96))] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.28)]">
                <div className="rounded-[24px] border border-white/[0.08] bg-[#0b1222] p-5">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/oqc-logo.png"
                      alt="OpenQCore"
                      width={200}
                      height={200}
                      className="h-16 w-16 object-contain"
                    />
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f3d98a]">
                        {t("metrics.title")}
                      </p>
                      <p className="mt-1 text-sm text-slate-300">
                        {t("infra.badge")}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
                      {t("infra.nodes.pulse")}
                    </div>
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
                      {t("infra.nodes.voice")}
                    </div>
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
                      {t("infra.nodes.iris")}
                    </div>
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
                      {t("infra.nodes.knowledge")}
                    </div>
                  </div>

                  <div className="my-4 h-px bg-white/[0.08]" />

                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 text-sm text-slate-200">
                    {t("infra.runtime")}
                  </div>

                  <div className="my-4 h-px bg-white/[0.08]" />

                  <div className="rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/10 p-3 text-sm text-[#f3d98a]">
                    {t("infra.contract")}
                  </div>
                </div>
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
                  className="text-l md:text-xl font-bold text-[#f3d98a] tabular-nums"
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

      {/* INFRA VISUAL */}
      <section className="border-b border-white/[0.05] py-24 md:py-28">
        <div className={wrap}>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionLabel>{t("infra.title")}</SectionLabel>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
                {t("infra.desc")}
              </p>
            </div>

            <div className="rounded-[30px] border border-[#d4af37]/20 bg-gradient-to-br from-[#d4af37]/10 via-[#0b1222] to-[#060b16] p-6">
              <div className="rounded-[24px] border border-white/[0.08] bg-[#0b1222] p-5">
                <p className="text-xs uppercase tracking-[0.14em] text-[#f3d98a]">
                  {t("infra.badge")}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
                    {t("infra.nodes.pulse")}
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
                    {t("infra.nodes.voice")}
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
                    {t("infra.nodes.iris")}
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
                    {t("infra.nodes.knowledge")}
                  </div>
                </div>

                <div className="my-4 h-px bg-white/[0.08]" />

                <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 text-sm text-slate-200">
                  {t("infra.runtime")}
                </div>

                <div className="my-4 h-px bg-white/[0.08]" />

                <div className="rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/10 p-3 text-sm text-[#f3d98a]">
                  {t("infra.contract")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DELIVER */}
      <section className="border-b border-white/[0.05] py-24 md:py-28">
        <div className={wrap}>
          <SectionLabel>{t("deliver.title")}</SectionLabel>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            {t("deliver.desc")}
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {deliverables.map((k) => (
              <article
                key={k}
                className={`${softCard} p-7 hover:border-[#d4af37]/20`}
              >
                <h3 className="text-xl font-bold leading-7 text-white">
                  {t(`deliver.items.${k}.title`)}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-slate-300">
                  {t(`deliver.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ENGAGEMENT + PROCESS */}
      <section className="border-b border-white/[0.05] bg-[#060b16] py-24 md:py-28">
        <div className={`${wrap} grid gap-12 xl:grid-cols-[1.15fr_.85fr]`}>
          <div>
            <SectionLabel>{t("engagement.title")}</SectionLabel>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              {models.map((k) => (
                <article
                  key={k}
                  className="rounded-[24px] border border-white/[0.08] bg-[#0b1222] p-5"
                >
                  <h3 className="text-lg font-bold text-white">
                    {t(`engagement.items.${k}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {t(`engagement.items.${k}.desc`)}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-[#d4af37]/20 bg-gradient-to-b from-[#d4af37]/10 to-transparent p-6">
            <h3 className="text-2xl font-bold tracking-[-0.02em] text-white">
              {t("process.title")}
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              {t("process.desc")}
            </p>

            <div className="mt-7 space-y-3">
              {process.map((step, idx) => (
                <div
                  key={step}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#0b1222]/70 px-4 py-3"
                >
                  <span
                    dir="ltr"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#d4af37]/20 text-xs font-bold text-[#f3d98a] tabular-nums"
                  >
                    {String(idx + 1)}
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {t(`process.steps.${step}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="border-b border-white/[0.05] py-24 md:py-28">
        <div className={wrap}>
          <SectionLabel>{t("projects.title")}</SectionLabel>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {projects.map((k) => (
              <article
                key={k}
                className="rounded-[28px] border border-white/[0.08] bg-[#0a101d] p-6 transition duration-300 hover:border-white/[0.14]"
              >
                <h3 className="text-xl font-bold text-white">
                  {t(`projects.items.${k}.title`)}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-slate-300">
                  {t(`projects.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="border-b border-white/[0.05] py-24 md:py-28">
        <div className={wrap}>
          <SectionLabel>{t("why.title")}</SectionLabel>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {why.map((k) => (
              <article
                key={k}
                className="rounded-[28px] border border-[#d4af37]/25 bg-gradient-to-br from-[#d4af37]/12 to-[#0b1222] p-6 transition duration-300 hover:border-[#d4af37]/35"
              >
                <h3 className="text-xl font-bold text-white">
                  {t(`why.items.${k}.title`)}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-slate-200">
                  {t(`why.items.${k}.desc`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TRUSTED DEPLOYMENT MODELS */}
      <section className="border-b border-white/[0.05] bg-[#060b16] py-24 md:py-28">
        <div className={wrap}>
          <SectionLabel>{t("deployments.title")}</SectionLabel>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            {t("deployments.desc")}
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {deploymentModels.map((k) => (
              <article
                key={k}
                className="rounded-[28px] border border-white/[0.08] bg-[#0b1222] p-6"
              >
                <h3 className="text-xl font-bold text-white">
                  {t(`deployments.items.${k}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(`deployments.items.${k}.desc`)}
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
              <PrimaryCTA href="/company/contact?intent=sales">
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