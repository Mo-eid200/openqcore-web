import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PrimaryCTA, SecondaryCTA } from "../../../components/common/CTAButtons";

export const metadata: Metadata = {
  title: "OpenQCore Agents — Intelligent Agent Platform",
  description:
    "Deploy adaptive agents with memory, tool invocation, orchestration logic, and production-aware execution patterns.",
  openGraph: {
    title: "OpenQCore Agents",
    description:
      "Intelligent agent platform for production operations, orchestration, and reliable execution.",
    type: "website",
    url: "https://openqcore.com/platform/agents",
    images: [{ url: "/og-agents.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenQCore Agents",
    description:
      "Build and operate adaptive agents with memory, orchestration, and tool routing."
  },
  alternates: { canonical: "https://openqcore.com/platform/agents" }
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
      <span className="h-px w-6 bg-[#d4af37]/40" />
      {children}
    </p>
  );
}

export default async function AgentsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const core = [
    { title: t("agents_page.core.memory_reasoning.title"), body: t("agents_page.core.memory_reasoning.body") },
    { title: t("agents_page.core.tool_invocation.title"), body: t("agents_page.core.tool_invocation.body") },
    { title: t("agents_page.core.orchestration.title"), body: t("agents_page.core.orchestration.body") },
    { title: t("agents_page.core.safety_controls.title"), body: t("agents_page.core.safety_controls.body") }
  ];

  const lifecycle = [
    t("agents_page.lifecycle.design"),
    t("agents_page.lifecycle.configure"),
    t("agents_page.lifecycle.deploy"),
    t("agents_page.lifecycle.observe"),
    t("agents_page.lifecycle.improve")
  ];

  const workloads = [
    { title: t("agents_page.workloads.operations.title"), body: t("agents_page.workloads.operations.body") },
    { title: t("agents_page.workloads.support.title"), body: t("agents_page.workloads.support.body") },
    { title: t("agents_page.workloads.internal_tools.title"), body: t("agents_page.workloads.internal_tools.body") }
  ];

  const governance = [
    { title: t("agents_page.governance.policy_layer.title"), body: t("agents_page.governance.policy_layer.body") },
    { title: t("agents_page.governance.auditability.title"), body: t("agents_page.governance.auditability.body") },
    { title: t("agents_page.governance.runtime_guardrails.title"), body: t("agents_page.governance.runtime_guardrails.body") }
  ];

  return (
    <main className="min-h-screen bg-[#050911] text-white">
      {/* ── Hero (split + side rail) ── */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.04]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-[-30%] left-1/2 h-[900px] w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(212,175,55,0.12),transparent_62%)]" />
          <div className="absolute top-[18%] right-[8%] h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.08),transparent_70%)]" />
        </div>

        <div className="mx-auto grid max-w-[1400px] gap-8 px-6 pb-24 pt-32 md:pb-32 md:pt-44 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="max-w-4xl">
            <SectionLabel>{t("agents_page.eyebrow")}</SectionLabel>

            <h1 className="ar-heading mt-8 text-[clamp(2.7rem,6vw,5rem)] font-bold leading-[0.94] tracking-tighter text-white">
              {t("agents_page.title_line_1")}
              <br />
              {t("agents_page.title_line_2")}
            </h1>

            <p className="ar-body mt-8 max-w-3xl text-lg leading-8 text-slate-400 md:text-xl">
              {t("agents_page.description")}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <PrimaryCTA href="/workspace">{t("agents_page.primary_cta")}</PrimaryCTA>
              <SecondaryCTA href="/docs">{t("agents_page.secondary_cta")}</SecondaryCTA>
            </div>
          </div>

          {/* right rail */}
          <aside className="rounded-[28px] border border-white/[0.06] bg-[#0b1222] p-6 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]/80">
              {t("agents_page.hero_rail_label")}
            </p>
            <div className="mt-5 space-y-4">
              {core.map((item, i) => (
                <article key={`hero-core-${i}`} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <h3 className="ar-heading text-base font-semibold text-white">{item.title}</h3>
                  <p className="ar-body mt-2 text-sm leading-7 text-slate-400">{item.body}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* ── Lifecycle ── */}
      <section className="border-b border-white/[0.04] bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>{t("agents_page.lifecycle_label")}</SectionLabel>
            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("agents_page.lifecycle_title")}
            </h2>
            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("agents_page.lifecycle_description")}
            </p>
          </div>

          <div className="mt-14 rounded-[28px] border border-white/[0.06] bg-[#0b1222] p-6 md:p-8">
            <div className="grid gap-3 md:grid-cols-5">
              {lifecycle.map((step, i) => (
                <div key={`lifecycle-${i}`} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-5 text-center">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]/80">
                    {t("agents_page.step")} {i + 1}
                  </div>
                  <div className="ar-heading mt-2 text-base font-semibold text-white">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Workloads ── */}
      <section className="border-b border-white/[0.04] bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>{t("agents_page.workloads_label")}</SectionLabel>
            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("agents_page.workloads_title")}
            </h2>
            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("agents_page.workloads_description")}
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {workloads.map((item, i) => (
              <article key={`workload-${i}`} className="rounded-3xl border border-white/[0.06] bg-[#0b1222] p-7">
                <h3 className="ar-heading text-lg font-semibold text-white">{item.title}</h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Governance ── */}
      <section className="border-b border-white/[0.04] bg-[#080e1a]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="rounded-[30px] border border-white/[0.06] bg-[#0b1222] p-7 md:p-10">
            <SectionLabel>{t("agents_page.governance_label")}</SectionLabel>
            <h2 className="ar-heading mt-5 max-w-3xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("agents_page.governance_title")}
            </h2>
            <p className="ar-body mt-5 max-w-3xl text-lg leading-8 text-slate-400">
              {t("agents_page.governance_description")}
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {governance.map((item, i) => (
                <article key={`governance-${i}`} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <h3 className="ar-heading text-base font-semibold text-white">{item.title}</h3>
                  <p className="ar-body mt-2 text-sm leading-7 text-slate-400">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="border-t border-white/[0.04] bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 text-center md:py-32 lg:px-8">
          <h2 className="ar-heading mx-auto max-w-3xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("agents_page.cta_title_line_1")}
            <br />
            {t("agents_page.cta_title_line_2")}
          </h2>

          <p className="ar-body mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            {t("agents_page.cta_description")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PrimaryCTA href="/workspace">{t("agents_page.cta_primary")}</PrimaryCTA>
            <SecondaryCTA href="/docs">{t("agents_page.cta_secondary")}</SecondaryCTA>
          </div>
        </div>
      </section>
    </main>
  );
}