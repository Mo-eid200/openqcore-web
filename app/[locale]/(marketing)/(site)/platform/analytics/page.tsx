import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "OpenQCore Analytics — Usage, Cost & Performance Intelligence",
  description:
    "Observe usage, cost, performance and operational intelligence across every model, agent, and workspace — in real time.",
  openGraph: {
    title: "OpenQCore Analytics",
    description:
      "Real-time observability into usage, cost, and performance across your entire AI stack.",
    type: "website",
    url: "https://openqcore.com/platform/analytics",
    images: [{ url: "/og-analytics.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenQCore Analytics",
    description:
      "Real-time observability into usage, cost, and performance across your entire AI stack."
  },
  alternates: { canonical: "https://openqcore.com/platform/analytics" }
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
      <span className="h-px w-6 bg-[#d4af37]/40" />
      {children}
    </p>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4"
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

function PrimaryCTA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="
        group inline-flex items-center gap-2.5
        rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#e7c766]
        px-7 py-4 text-sm font-semibold text-[#0B1F3B]
        shadow-[0_8px_32px_rgba(212,175,55,0.22)]
        transition-all duration-300
        hover:scale-[1.02] hover:shadow-[0_12px_48px_rgba(212,175,55,0.32)]
        active:scale-[0.99]
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]
      "
    >
      {children}
      <ArrowIcon />
    </Link>
  );
}

function SecondaryCTA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="
        inline-flex items-center gap-2
        rounded-2xl border border-white/8 bg-white/3
        px-7 py-4 text-sm font-semibold text-slate-200
        transition-all duration-300
        hover:border-white/15 hover:bg-white/6 hover:text-white
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60
      "
    >
      {children}
    </Link>
  );
}

export default async function AnalyticsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const capabilities = [
    {
      title: t("analytics_page.capabilities.usage_tracking.title"),
      body: t("analytics_page.capabilities.usage_tracking.body")
    },
    {
      title: t("analytics_page.capabilities.cost_breakdown.title"),
      body: t("analytics_page.capabilities.cost_breakdown.body")
    },
    {
      title: t("analytics_page.capabilities.performance_metrics.title"),
      body: t("analytics_page.capabilities.performance_metrics.body")
    },
    {
      title: t("analytics_page.capabilities.alerts.title"),
      body: t("analytics_page.capabilities.alerts.body")
    }
  ];

  const lifecycle = [
    t("analytics_page.lifecycle.collect"),
    t("analytics_page.lifecycle.aggregate"),
    t("analytics_page.lifecycle.visualize"),
    t("analytics_page.lifecycle.alert"),
    t("analytics_page.lifecycle.optimize")
  ];

  const useCases = [
    {
      title: t("analytics_page.use_cases.finops.title"),
      body: t("analytics_page.use_cases.finops.body")
    },
    {
      title: t("analytics_page.use_cases.reliability.title"),
      body: t("analytics_page.use_cases.reliability.body")
    },
    {
      title: t("analytics_page.use_cases.capacity_planning.title"),
      body: t("analytics_page.use_cases.capacity_planning.body")
    }
  ];

  const governance = [
    {
      title: t("analytics_page.governance.per_workspace_visibility.title"),
      body: t("analytics_page.governance.per_workspace_visibility.body")
    },
    {
      title: t("analytics_page.governance.exportable_reports.title"),
      body: t("analytics_page.governance.exportable_reports.body")
    },
    {
      title: t("analytics_page.governance.retention_controls.title"),
      body: t("analytics_page.governance.retention_controls.body")
    }
  ];

  return (
    <main className="min-h-screen bg-[#050911] text-white">
      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden border-b border-white/4">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-[-28%] left-1/2 h-[780px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(212,175,55,0.10),transparent_60%)]" />
          <div className="absolute top-[34%] right-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.05),transparent_65%)]" />
        </div>

        <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-32 md:pb-32 md:pt-44 lg:px-8">
          <div className="max-w-4xl">
            <SectionLabel>{t("analytics_page.eyebrow")}</SectionLabel>

            <h1 className="ar-heading mt-8 text-[clamp(2.6rem,6vw,4.8rem)] font-bold leading-[0.94] tracking-tighter text-white">
              {t("analytics_page.title_line_1")}
              <br />
              {t("analytics_page.title_line_2")}
            </h1>

            <p className="ar-body mt-8 max-w-3xl text-lg leading-8 text-slate-400 md:text-xl">
              {t("analytics_page.description")}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <PrimaryCTA href="/workspace">{t("analytics_page.primary_cta")}</PrimaryCTA>
              <SecondaryCTA href="/docs">{t("analytics_page.secondary_cta")}</SecondaryCTA>
            </div>
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>{t("analytics_page.capabilities_label")}</SectionLabel>
            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("analytics_page.capabilities_title")}
            </h2>
            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("analytics_page.capabilities_description")}
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {capabilities.map((item, i) => (
              <article
                key={`cap-${i}`}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-lg font-semibold text-white">{item.title}</h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lifecycle ── */}
      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>{t("analytics_page.lifecycle_label")}</SectionLabel>
            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("analytics_page.lifecycle_title")}
            </h2>
            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("analytics_page.lifecycle_description")}
            </p>
          </div>

          <div className="mt-14 rounded-[28px] border border-white/6 bg-[#0b1222] p-6 md:p-8">
            <div className="grid gap-3 md:grid-cols-5">
              {lifecycle.map((step, i) => (
                <div
                  key={`step-${i}`}
                  className="rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-5 text-center"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]/80">
                    {t("analytics_page.step")} {i + 1}
                  </div>
                  <div className="ar-heading mt-2 text-base font-semibold text-white">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="border-b border-white/4 bg-[#080e1a]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>{t("analytics_page.use_cases_label")}</SectionLabel>
            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("analytics_page.use_cases_title")}
            </h2>
            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("analytics_page.use_cases_description")}
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {useCases.map((item, i) => (
              <article
                key={`usecase-${i}`}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-lg font-semibold text-white">{item.title}</h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Governance ── */}
      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="rounded-[30px] border border-white/6 bg-[#0b1222] p-7 md:p-10">
            <SectionLabel>{t("analytics_page.governance_label")}</SectionLabel>
            <h2 className="ar-heading mt-5 max-w-3xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("analytics_page.governance_title")}
            </h2>
            <p className="ar-body mt-5 max-w-3xl text-lg leading-8 text-slate-400">
              {t("analytics_page.governance_description")}
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {governance.map((item, i) => (
                <article
                  key={`governance-${i}`}
                  className="rounded-2xl border border-white/6 bg-white/[0.02] p-5"
                >
                  <h3 className="ar-heading text-base font-semibold text-white">{item.title}</h3>
                  <p className="ar-body mt-2 text-sm leading-7 text-slate-400">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="border-t border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 text-center md:py-32 lg:px-8">
          <h2 className="ar-heading mx-auto max-w-3xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("analytics_page.cta_title_line_1")}
            <br />
            {t("analytics_page.cta_title_line_2")}
          </h2>

          <p className="ar-body mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            {t("analytics_page.cta_description")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PrimaryCTA href="/workspace">{t("analytics_page.cta_primary")}</PrimaryCTA>
            <SecondaryCTA href="/docs">{t("analytics_page.cta_secondary")}</SecondaryCTA>
          </div>
        </div>
      </section>
    </main>
  );
}