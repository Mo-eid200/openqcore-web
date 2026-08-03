import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ImageWithLightbox from "../../../components/common/ImageWithLightbox";

export const metadata: Metadata = {
  title:
    "OpenQCore for Financial Services — Intelligence Infrastructure for Modern Finance",
  description:
    "OpenQCore develops AI infrastructure, financial intelligence systems and intelligent automation for banks, insurers, payment providers and financial institutions.",
  openGraph: {
    title: "OpenQCore for Financial Services",
    description:
      "Intelligence infrastructure connecting data, models, knowledge and operational systems across finance.",
    type: "website",
    url: "https://openqcore.com/solutions/finance",
    images: [{ url: "/og-finance.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenQCore for Financial Services",
    description:
      "Intelligence infrastructure connecting data, models, knowledge and operational systems across finance."
  },
  alternates: {
    canonical: "https://openqcore.com/solutions/finance"
  }
};

/* ════════════════════════════════════════════════════════════
   Shared primitives (identical to /solutions/government and
   /solutions/healthcare)
════════════════════════════════════════════════════════════ */

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

function PrimaryCTA({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        group inline-flex items-center gap-2.5
        rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#e7c766]
        px-7 py-4 text-sm font-semibold text-[#0B1F3B]
        shadow-[0_8px_32px_rgba(212,175,55,0.22)]
        transition-all duration-300
        hover:scale-[1.02]
        hover:shadow-[0_12px_48px_rgba(212,175,55,0.32)]
        active:scale-[0.99]
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-[#d4af37]
      "
    >
      {children}
      <ArrowIcon />
    </Link>
  );
}

function SecondaryCTA({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        inline-flex items-center gap-2
        rounded-2xl border border-white/8 bg-white/3
        px-7 py-4 text-sm font-semibold text-slate-200
        transition-all duration-300
        hover:border-white/15 hover:bg-white/6 hover:text-white
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-white/60
      "
    >
      {children}
    </Link>
  );
}

/* ════════════════════════════════════════════════════════════
   Hero background — financial network / transaction flows
   (same node-graph technique as government/healthcare heroes,
   kept as inline SVG rather than a photographic asset)
════════════════════════════════════════════════════════════ */

function HeroFinancialGraphic() {
  const points: [number, number][] = [
    [130, 95],
    [320, 65],
    [530, 135],
    [740, 75],
    [960, 125],
    [1180, 85],
    [210, 265],
    [420, 305],
    [640, 255],
    [850, 315],
    [1070, 275],
    [1260, 335],
    [300, 425],
    [560, 405],
    [820, 435],
    [1050, 405]
  ];

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.35]"
      viewBox="0 0 1400 500"
      fill="none"
      aria-hidden="true"
    >
      {points.map(([x, y], i) => {
        const next = points[(i + 3) % points.length];
        return (
          <line
            key={`flow-${i}`}
            x1={x}
            y1={y}
            x2={next[0]}
            y2={next[1]}
            stroke="#d4af37"
            strokeOpacity="0.12"
            strokeWidth="1"
          />
        );
      })}

      {points.map(([x, y], i) => (
        <circle
          key={`node-${i}`}
          cx={x}
          cy={y}
          r={i % 4 === 0 ? 4 : 3}
          fill="#d4af37"
          fillOpacity="0.55"
        />
      ))}
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════
   Architecture / diagram image wrapper
   (identical to government/healthcare ArchitectureImage)
════════════════════════════════════════════════════════════ */

function ArchitectureImage({
  src,
  alt,
  light = false,
  priority = false,
  width = 1792,
  height = 1024,
  maxWidth = "1400px"
}: {
  src: string;
  alt: string;
  light?: boolean;
  priority?: boolean;
  width?: number;
  height?: number;
  maxWidth?: string;
}) {
  return (
    <div
      style={{ maxWidth }}
      className={`
        relative mx-auto overflow-hidden rounded-[28px] border
        ${
          light
            ? "border-[#d4af37]/20 bg-[#f7f5f0]"
            : "border-white/7 bg-[#080e1a]"
        }
        shadow-[0_28px_90px_rgba(0,0,0,0.22)]
      `}
    >
      <ImageWithLightbox
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        imageClassName="h-auto w-full object-contain"
      />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   Page
════════════════════════════════════════════════════════════ */

export default async function FinancePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const operationsCapabilityKeys = [
    "financial_knowledge",
    "document_intelligence",
    "transaction_intelligence",
    "ai_agents",
    "customer_intelligence",
    "workflow_automation",
    "enterprise_search",
    "operational_analytics"
  ];

  const insuranceKeys = [
    "underwriting_support",
    "claims_intelligence",
    "insurance_document_processing",
    "insurance_fraud_detection"
  ];

  const riskCategoryKeys = [
    "credit_risk",
    "market_risk",
    "liquidity_risk",
    "operational_risk",
    "counterparty_risk",
    "portfolio_risk"
  ];

  const fraudCapabilityKeys = [
    "transaction_monitoring",
    "anomaly_detection",
    "behavioral_intelligence",
    "entity_resolution",
    "network_analysis",
    "investigation_support",
    "alert_prioritization",
    "case_intelligence"
  ];

  const complianceCapabilityKeys = [
    "kyc_intelligence",
    "aml_workflows",
    "regulatory_knowledge",
    "policy_intelligence",
    "compliance_monitoring",
    "case_management"
  ];

  const paymentsLifecycleStages = [
    "initiation",
    "authentication",
    "authorization",
    "processing",
    "settlement",
    "reconciliation",
    "monitoring"
  ];

  const researchCapabilityKeys = [
    "market_research_intelligence",
    "financial_document_intelligence",
    "quantitative_research_infrastructure",
    "economic_intelligence",
    "portfolio_research"
  ];

  const governanceFrameworkSteps = [
    "observe",
    "analyze",
    "recommend",
    "authorize",
    "execute",
    "monitor"
  ];

  const governanceKeys = [
    "model_governance",
    "data_lineage",
    "explainability",
    "evidence_provenance",
    "human_approval",
    "authorization_boundaries",
    "audit_trails",
    "continuous_monitoring"
  ];

  const deploymentKeys = ["private_cloud", "on_premises", "hybrid"];

  const securityTags = [
    "encryption",
    "identity",
    "access_control",
    "isolation",
    "auditability",
    "data_residency"
  ];

  return (
    <main className="min-h-screen bg-[#050911] text-white">
      {/* ═══════════════════════════════════════════════════════
          1. HERO
          No dedicated hero image — inline HeroFinancialGraphic
          (same technique as healthcare/government) keeps this
          section consistent with the rest of the site.
      ═══════════════════════════════════════════════════════ */}

      <section className="relative isolate overflow-hidden border-b border-white/4">
        <HeroFinancialGraphic />

        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#050911] via-[#050911]/70 to-[#050911]" />

        <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-32 text-center md:pb-32 md:pt-44 lg:px-8">
          <div className="mx-auto flex justify-center">
            <SectionLabel>{t("finance_page.eyebrow")}</SectionLabel>
          </div>

          <h1 className="ar-heading mx-auto mt-8 max-w-4xl text-[clamp(2.4rem,5.5vw,4.4rem)] font-bold leading-[1.02] tracking-tighter text-white">
            {t("finance_page.title_line_1")}
            <br />
            {t("finance_page.title_line_2")}
          </h1>

          <p className="ar-body mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">
            {t("finance_page.description")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PrimaryCTA href="#capabilities">
              {t("finance_page.primary_cta")}
            </PrimaryCTA>

            <SecondaryCTA href="/contact">
              {t("finance_page.secondary_cta")}
            </SecondaryCTA>
          </div>

          <p className="mt-10 text-xs uppercase tracking-[0.2em] text-slate-500">
            {t("finance_page.hero_tags")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. THE FINANCIAL INTELLIGENCE LOOP

          IMAGE 1 — Closed-loop diagram, 6 connected nodes:
          Financial Data → Intelligence → Decision → Execution
          → Monitoring → Feedback → back to Financial Data.
          Same circular/hexagon treatment as the Healthcare
          Mission Loop image.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>{t("finance_page.loop_label")}</SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("finance_page.loop_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("finance_page.loop_p1")}
            </p>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/finance/financial-intelligence-loop.png"
              alt="OpenQCore closed-loop financial intelligence architecture"
              priority
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. FINANCIAL OPERATIONS
          (absorbs Enterprise Search + Operational Analytics as
          two of the eight capability cards, and closes with a
          compact Insurance Intelligence row rather than a full
          separate section)
      ═══════════════════════════════════════════════════════ */}

      <section id="capabilities" className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("finance_page.operations_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("finance_page.operations_title")}
            </h2>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {operationsCapabilityKeys.map((key) => (
              <article
                key={key}
                className="
                  rounded-3xl border border-white/6
                  bg-[#0b1222] p-7
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-[#d4af37]/20
                "
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`finance_page.operations.${key}.title`)}
                </h3>

                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`finance_page.operations.${key}.body`)}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-16 border-t border-white/6 pt-14">
            <h3 className="ar-heading text-xl font-semibold text-white">
              {t("finance_page.insurance_title")}
            </h3>

            <p className="ar-body mt-3 max-w-2xl text-base leading-7 text-slate-400">
              {t("finance_page.insurance_p1")}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {insuranceKeys.map((key) => (
                <div
                  key={key}
                  className="rounded-2xl border border-white/6 bg-[#0b1222] p-5"
                >
                  <p className="ar-heading text-sm font-semibold text-white">
                    {t(`finance_page.insurance.${key}.title`)}
                  </p>
                  <p className="ar-body mt-2 text-xs leading-6 text-slate-400">
                    {t(`finance_page.insurance.${key}.body`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. RISK INTELLIGENCE
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>{t("finance_page.risk_label")}</SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("finance_page.risk_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("finance_page.risk_p1")}
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {riskCategoryKeys.map((key) => (
              <article
                key={key}
                className="
                  rounded-3xl border border-white/6
                  bg-[#0b1222] p-7
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-[#d4af37]/20
                "
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`finance_page.risk.${key}.title`)}
                </h3>
              </article>
            ))}
          </div>

          <p className="ar-body mx-auto mt-10 max-w-3xl text-center text-base leading-7 text-slate-400">
            {t("finance_page.risk_p2_disclaimer")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. FRAUD & FINANCIAL CRIME

          IMAGE 2 — Entity graph illustration (the strongest
          visual on the page). Accounts / Transactions / Devices
          feed into an Entity Graph → Risk Intelligence → splits
          into Patterns + Anomalies → converges into
          Investigation. Hub-and-spoke network styling, built as
          a real diagram rather than boxes-and-arrows.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>{t("finance_page.fraud_label")}</SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("finance_page.fraud_title")}
            </h2>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/finance/fraud-entity-graph.png"
              alt="OpenQCore fraud and financial crime entity graph connecting accounts, transactions and devices to investigation workflows"
            />
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {fraudCapabilityKeys.map((key) => (
              <article
                key={key}
                className="
                  rounded-3xl border border-white/6
                  bg-[#0b1222] p-7
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-[#d4af37]/20
                "
              >
                <h3 className="ar-heading text-base font-semibold text-white">
                  {t(`finance_page.fraud.${key}.title`)}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. COMPLIANCE & REGULATORY INTELLIGENCE
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("finance_page.compliance_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("finance_page.compliance_title")}
            </h2>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {complianceCapabilityKeys.map((key) => (
              <article
                key={key}
                className="
                  rounded-3xl border border-white/6
                  bg-[#0b1222] p-7
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-[#d4af37]/20
                "
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`finance_page.compliance.${key}.title`)}
                </h3>

                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`finance_page.compliance.${key}.body`)}
                </p>
              </article>
            ))}
          </div>

          <p className="ar-body mx-auto mt-10 max-w-3xl text-center text-base leading-7 text-slate-400">
            {t("finance_page.compliance_p2_disclaimer")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. PAYMENTS INTELLIGENCE

          IMAGE 3 — Horizontal lifecycle illustration, 7 stages:
          Initiation → Authentication → Authorization →
          Processing → Settlement → Reconciliation → Monitoring.
          A thin supporting layer below the flow (not part of
          the sequence itself) lists Fraud Intelligence · Risk ·
          Identity · Analytics · Automation as small tags.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("finance_page.payments_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("finance_page.payments_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("finance_page.payments_p1")}
            </p>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/finance/payments-lifecycle.png"
              alt="OpenQCore intelligence across the payment lifecycle from initiation to monitoring"
            />
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 text-center sm:grid-cols-4 lg:grid-cols-7">
            {paymentsLifecycleStages.map((key) => (
              <p
                key={key}
                className="ar-body text-xs uppercase tracking-[0.14em] text-slate-500"
              >
                {t(`finance_page.payments_stage.${key}`)}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              "fraud_intelligence",
              "risk",
              "identity",
              "analytics",
              "automation"
            ].map((key) => (
              <span
                key={key}
                className="ar-body rounded-full border border-white/8 bg-white/3 px-4 py-2 text-xs text-slate-400"
              >
                {t(`finance_page.payments_layer.${key}`)}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          8. CAPITAL MARKETS & FINANCIAL RESEARCH
          (the finance counterpart to Healthcare's Biomedical
          Research section — text only, no dedicated image)
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("finance_page.research_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("finance_page.research_title")}
            </h2>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {researchCapabilityKeys.map((key) => (
              <article
                key={key}
                className="
                  rounded-3xl border border-white/6
                  bg-[#0b1222] p-7
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-[#d4af37]/20
                "
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`finance_page.research.${key}.title`)}
                </h3>

                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`finance_page.research.${key}.body`)}
                </p>
              </article>
            ))}
          </div>

          <p className="ar-body mx-auto mt-14 max-w-3xl text-center text-lg leading-8 text-slate-300">
            {t("finance_page.research_p2_evidence_linked")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          9. FINANCIAL AI ARCHITECTURE

          IMAGE 4 — The flagship diagram (finance's counterpart
          to the Scientific AI Architecture). Layered top to
          bottom: Customers/Analysts/Operators/Risk Teams →
          Financial Interfaces → OpenQCore Intelligence Core
          (Agents, Reasoning, Retrieval, Financial Knowledge,
          Document AI, Predictive Models, Analytics, Model
          Orchestration) → Financial Data (Transactions,
          Accounts, Market Data, Documents, Customers, Risk
          Data) → Core Systems (Core Banking, Payments, CRM,
          ERP, Risk, Trading, Insurance, Data Platforms). Side
          rail: Identity · Security · Governance · Audit · Model
          Risk · Human Oversight. Build as a real SVG diagram.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#080e1a]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("finance_page.architecture_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("finance_page.architecture_title")}
            </h2>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/finance/financial-ai-architecture.png"
              alt="OpenQCore financial AI architecture across interfaces, intelligence core, data and core systems"
              light
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          10. MODEL RISK & AI GOVERNANCE

          IMAGE 5 — Framework illustration, 6 steps:
          OBSERVE → ANALYZE → RECOMMEND → AUTHORIZE → EXECUTE →
          MONITOR. AUTHORIZE gets a visually distinct treatment
          (different accent) as the explicit human decision
          point before execution.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("finance_page.model_risk_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("finance_page.model_risk_title")}
            </h2>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/finance/model-risk-governance-framework.png"
              alt="OpenQCore model risk and governance framework: observe, analyze, recommend, authorize, execute, monitor"
            />
          </div>

          <div className="mt-10 grid grid-cols-3 gap-5 md:grid-cols-6">
            {governanceFrameworkSteps.map((key) => (
              <div key={key} className="text-center">
                <p
                  className={`ar-heading text-xs font-semibold uppercase tracking-[0.14em] ${
                    key === "authorize" ? "text-[#e7c766]" : "text-[#d4af37]"
                  }`}
                >
                  {t(`finance_page.model_risk_step.${key}`)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {governanceKeys.map((key) => (
              <article
                key={key}
                className="
                  rounded-3xl border border-white/6
                  bg-[#0b1222] p-7
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-[#d4af37]/20
                "
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`finance_page.governance.${key}.title`)}
                </h3>

                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`finance_page.governance.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          11. SECURITY & DEPLOYMENT
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("finance_page.deployment_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("finance_page.deployment_title")}
            </h2>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {deploymentKeys.map((key) => (
              <article
                key={key}
                className="
                  rounded-3xl border border-white/6
                  bg-[#0b1222] p-7
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-[#d4af37]/20
                "
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`finance_page.deployment.${key}.title`)}
                </h3>

                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`finance_page.deployment.${key}.body`)}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {securityTags.map((key) => (
              <span
                key={key}
                className="ar-body rounded-full border border-white/8 bg-white/3 px-4 py-2 text-xs text-slate-400"
              >
                {t(`finance_page.security_tag.${key}`)}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          12. OPENQCORE FINANCIAL RESEARCH
          (voice/identity section — text-only, no image)
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1000px] px-6 py-24 text-center md:py-32 lg:px-8">
          <SectionLabel>
            {t("finance_page.oqc_research_label")}
          </SectionLabel>

          <h2 className="ar-heading mx-auto mt-5 max-w-2xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("finance_page.oqc_research_title")}
          </h2>

          <p className="ar-body mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            {t("finance_page.oqc_research_p1")}
          </p>

          <p className="ar-body mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-400">
            {t("finance_page.oqc_research_p2")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          13. FINAL CTA
      ═══════════════════════════════════════════════════════ */}

      <section className="bg-[#070d18]">
        <div className="mx-auto max-w-[900px] px-6 py-24 text-center md:py-32 lg:px-8">
          <h2 className="ar-heading mx-auto max-w-2xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("finance_page.final_cta_title_line_1")}
            <br />
            {t("finance_page.final_cta_title_line_2")}
          </h2>

          <p className="ar-body mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            {t("finance_page.final_cta_p1")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PrimaryCTA href="/contact">
              {t("finance_page.final_cta_primary")}
            </PrimaryCTA>

            <SecondaryCTA href="#">
              {t("finance_page.final_cta_secondary")}
            </SecondaryCTA>
          </div>
        </div>
      </section>
    </main>
  );
}