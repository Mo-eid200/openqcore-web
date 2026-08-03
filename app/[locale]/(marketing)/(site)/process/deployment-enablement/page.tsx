import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ImageWithLightbox from "../../../components/common/ImageWithLightbox";

export const metadata: Metadata = {
  title: "Deployment & Enablement — How OpenQCore Works",
  description:
    "OpenQCore treats deployment as a controlled exposure of risk — progressive rollout, defined rollback paths, and team readiness before a release is considered complete.",
  openGraph: {
    title: "Deployment & Enablement — How OpenQCore Works",
    description:
      "Release is a decision, not an event: OpenQCore's evidence-based approach to deployment.",
    type: "website",
    url: "https://openqcore.com/process/deployment-enablement",
    images: [
      { url: "/og-deployment-enablement.png", width: 600, height: 630 }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Deployment & Enablement — How OpenQCore Works",
    description:
      "Release is a decision, not an event: OpenQCore's evidence-based approach to deployment."
  },
  alternates: {
    canonical: "https://openqcore.com/process/deployment-enablement"
  }
};

/* ════════════════════════════════════════════════════════════
   Shared primitives (identical to the other process pages)
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
   Architecture / diagram image wrapper (identical to the other
   process pages)
════════════════════════════════════════════════════════════ */

function ArchitectureImage({
  src,
  alt,
  width,
  height,
  light = false,
  priority = false,
  maxWidth = "1000px"
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  light?: boolean;
  priority?: boolean;
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
   New primitive for this page: large evidence statistics
   (kept inline per page, matching research-discovery /
   development-integration)
════════════════════════════════════════════════════════════ */

function StatCard({
  value,
  label,
  source
}: {
  value: string;
  label: string;
  source: string;
}) {
  return (
    <div className="rounded-3xl border border-white/6 bg-[#0b1222] p-8 text-center">
      <p className="ar-heading text-5xl font-bold tracking-tight text-[#d4af37] md:text-6xl">
        {value}
      </p>
      <p className="ar-body mt-4 text-sm leading-6 text-slate-300">{label}</p>
      <p className="ar-body mt-4 text-xs text-slate-500">{source}</p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   Page
════════════════════════════════════════════════════════════ */

export default async function DeploymentEnablementPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const deliveryStrategies = ["blue_green", "canary_releases", "feature_flags"];

  const promotionEnvironments = ["development", "staging", "production"];

  const rollbackElements = [
    "rollback_trigger_conditions",
    "data_state_compatibility",
    "recovery_time_objective"
  ];

  const riskAssessmentElements = [
    "blast_radius",
    "reversibility",
    "dependency_exposure"
  ];

  const enablementElements = [
    "operational_runbooks",
    "on_call_readiness",
    "knowledge_transfer"
  ];

  const deploymentGateOutcomes = [
    "deploy",
    "delay",
    "rollback",
    "escalate_incident"
  ];

  const stageArtifacts = [
    "deployment_runbook",
    "rollback_plan",
    "environment_promotion_record",
    "risk_assessment_document",
    "team_enablement_materials",
    "progressive_rollout_report"
  ];

  const referenceKeys = ["accelerate_dora", "continuous_delivery", "sre_book"];

  return (
    <main className="min-h-screen bg-[#050911] text-white">
      {/* ═══════════════════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════════════════ */}

      <section className="relative isolate overflow-hidden border-b border-white/4">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#050911] via-[#050911]/70 to-[#050911]" />

        <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-32 text-center md:pb-32 md:pt-44 lg:px-8">
          <div className="mx-auto flex justify-center">
            <SectionLabel>
              {t("deployment_enablement_page.eyebrow")}
            </SectionLabel>
          </div>

          <h1 className="ar-heading mx-auto mt-8 max-w-4xl text-[clamp(2.4rem,5.5vw,4.4rem)] font-bold leading-[1.02] tracking-tighter text-white">
            {t("deployment_enablement_page.title")}
          </h1>

          <p className="ar-body mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">
            {t("deployment_enablement_page.intro_p1")}
          </p>

          <p className="ar-body mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            {t("deployment_enablement_page.intro_p2")}
          </p>

          <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-white/6 bg-[#0b1222] p-8 text-center">
            <p className="ar-body text-sm uppercase tracking-[0.14em] text-slate-500">
              {t("deployment_enablement_page.intro_not_question_label")}
            </p>
            <p className="ar-heading mt-3 text-lg font-semibold italic text-slate-300">
              {t("deployment_enablement_page.intro_not_question")}
            </p>

            <p className="ar-body mt-6 text-sm uppercase tracking-[0.14em] text-slate-500">
              {t("deployment_enablement_page.intro_should_be_label")}
            </p>
            <p className="ar-heading mt-3 text-lg font-semibold italic text-white">
              {t("deployment_enablement_page.intro_should_be")}
            </p>
          </div>

          <p className="mt-10 text-center text-xs uppercase tracking-[0.2em] text-slate-500">
            {t("deployment_enablement_page.hero_tags")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. WHY DEPLOYMENT FOLLOWS VERIFICATION
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:py-24 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("deployment_enablement_page.bridge_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("deployment_enablement_page.bridge_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("deployment_enablement_page.bridge_p1")}
            </p>
          </div>

          <p className="ar-body mt-10 max-w-3xl text-lg font-medium leading-8 text-slate-200">
            {t("deployment_enablement_page.bridge_flow")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. WHY DEPLOYMENT DISCIPLINE MATTERS (DORA)
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("deployment_enablement_page.discipline_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("deployment_enablement_page.discipline_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("deployment_enablement_page.discipline_p1")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            <StatCard
              value={t("deployment_enablement_page.stat_frequency_value")}
              label={t("deployment_enablement_page.stat_frequency_label")}
              source={t("deployment_enablement_page.stat_dora_source")}
            />
            <StatCard
              value={t("deployment_enablement_page.stat_restore_value")}
              label={t("deployment_enablement_page.stat_restore_label")}
              source={t("deployment_enablement_page.stat_dora_source")}
            />
          </div>

          <p className="ar-body mt-10 max-w-3xl text-lg leading-8 text-slate-400">
            {t("deployment_enablement_page.discipline_p2_single_objective")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. PROGRESSIVE DELIVERY STRATEGIES
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("deployment_enablement_page.strategies_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("deployment_enablement_page.strategies_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("deployment_enablement_page.strategies_p1")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {deliveryStrategies.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`deployment_enablement_page.strategy.${key}.title`)}
                </h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`deployment_enablement_page.strategy.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. DEPLOYMENT ENVIRONMENTS & PROMOTION

          IMAGE 1 — Horizontal environment promotion flow:
          Development → Staging → Production, with an explicit
          verification gate icon between each stage (not a
          direct arrow). Suggested aspect ratio ~16:9.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("deployment_enablement_page.environments_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("deployment_enablement_page.environments_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("deployment_enablement_page.environments_p1")}
            </p>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/process/deployment-enablement/environment-promotion.png"
              alt="Environment promotion flow: development, staging, production, with explicit verification gates between each stage"
              width={1400}
              height={650}
              maxWidth="1100px"
              priority
            />
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {promotionEnvironments.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`deployment_enablement_page.environment.${key}.title`)}
                </h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`deployment_enablement_page.environment.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. ROLLBACK & RECOVERY DESIGN
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("deployment_enablement_page.rollback_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("deployment_enablement_page.rollback_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("deployment_enablement_page.rollback_p1")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {rollbackElements.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`deployment_enablement_page.rollback_element.${key}.title`)}
                </h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`deployment_enablement_page.rollback_element.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. INFRASTRUCTURE AS CODE & REPRODUCIBILITY
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("deployment_enablement_page.iac_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("deployment_enablement_page.iac_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("deployment_enablement_page.iac_p1")}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          8. DEPLOYMENT RISK ASSESSMENT
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("deployment_enablement_page.risk_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("deployment_enablement_page.risk_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("deployment_enablement_page.risk_p1")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {riskAssessmentElements.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`deployment_enablement_page.risk_element.${key}.title`)}
                </h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`deployment_enablement_page.risk_element.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          9. THE PROGRESSIVE ROLLOUT PIPELINE

          IMAGE 2 — The flagship diagram for this page: Canary
          (small percentage) → Monitor Defined Signals → Expand
          Exposure → Monitor Defined Signals → Full Rollout, with
          a rollback path branching off at every stage back to
          the previous stable state. Suggested aspect ratio
          ~16:9 or wider (a flowing pipeline with a visible
          rollback branch beneath it).
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("deployment_enablement_page.rollout_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("deployment_enablement_page.rollout_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("deployment_enablement_page.rollout_p1")}
            </p>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/process/deployment-enablement/progressive-rollout-pipeline.png"
              alt="Progressive rollout pipeline: canary, monitor signals, expand exposure, monitor signals, full rollout, with a rollback path at every stage"
              width={1500}
              height={700}
              maxWidth="1150px"
              light
            />
          </div>

          <p className="ar-body mt-10 max-w-3xl text-lg leading-8 text-slate-400">
            {t("deployment_enablement_page.rollout_p2_error_budget")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          10. ENABLEMENT: DOCUMENTATION & TEAM READINESS
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("deployment_enablement_page.enablement_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("deployment_enablement_page.enablement_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("deployment_enablement_page.enablement_p1")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {enablementElements.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(
                    `deployment_enablement_page.enablement_element.${key}.title`
                  )}
                </h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(
                    `deployment_enablement_page.enablement_element.${key}.body`
                  )}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          11. THE DEPLOYMENT DECISION GATE

          IMAGE 3 — Decision-tree diagram branching from
          "Deployment Gate" into four outcomes: DEPLOY · DELAY ·
          ROLLBACK · ESCALATE INCIDENT. Keep the same neutral,
          non-alarming palette used in the earlier process
          pages' gates. Suggested aspect ratio ~16:9.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("deployment_enablement_page.gate_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("deployment_enablement_page.gate_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("deployment_enablement_page.gate_p1")}
            </p>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/process/deployment-enablement/deployment-decision-gate.png"
              alt="Deployment decision gate branching into deploy, delay, rollback, or escalate incident"
              width={1200}
              height={650}
              maxWidth="1000px"
            />
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {deploymentGateOutcomes.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-6 text-center"
              >
                <h3 className="ar-heading text-base font-semibold text-[#d4af37]">
                  {t(`deployment_enablement_page.gate_outcome.${key}.title`)}
                </h3>
                <p className="ar-body mt-3 text-xs leading-6 text-slate-400">
                  {t(`deployment_enablement_page.gate_outcome.${key}.body`)}
                </p>
              </article>
            ))}
          </div>

          <p className="ar-body mx-auto mt-10 max-w-2xl text-center text-lg font-medium leading-8 text-slate-200">
            {t("deployment_enablement_page.gate_p2_not_a_schedule")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          12. WHAT THIS STAGE PRODUCES
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("deployment_enablement_page.artifacts_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("deployment_enablement_page.artifacts_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("deployment_enablement_page.artifacts_p1")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {stageArtifacts.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`deployment_enablement_page.artifact.${key}.title`)}
                </h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`deployment_enablement_page.artifact.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          13. FROM DEPLOYMENT TO MONITORING & OPTIMIZATION + CTA
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1000px] px-6 py-24 text-center md:py-32 lg:px-8">
          <SectionLabel>
            {t("deployment_enablement_page.transition_label")}
          </SectionLabel>

          <h2 className="ar-heading mx-auto mt-5 max-w-2xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("deployment_enablement_page.transition_title")}
          </h2>

          <p className="ar-body mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            {t("deployment_enablement_page.transition_p1")}
          </p>

          <p className="ar-body mx-auto mt-4 max-w-2xl text-base font-medium leading-7 text-slate-300">
            {t("deployment_enablement_page.transition_flow")}
          </p>

          <div className="mx-auto mt-10 max-w-md rounded-3xl border border-[#d4af37]/20 bg-[#0b1222] p-8">
            <p className="ar-body text-xs uppercase tracking-[0.14em] text-slate-500">
              {t("deployment_enablement_page.step_06_eyebrow")}
            </p>
            <h3 className="ar-heading mt-3 text-2xl font-semibold text-white">
              {t("deployment_enablement_page.step_06_title")}
            </h3>
            <p className="ar-body mt-3 text-sm leading-6 text-slate-400">
              {t("deployment_enablement_page.step_06_description")}
            </p>

            <div className="mt-6 flex justify-center">
              <SecondaryCTA href="/process/monitoring-optimization">
                {t("deployment_enablement_page.step_06_cta")}
              </SecondaryCTA>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
            <PrimaryCTA href="/contact">
              {t("deployment_enablement_page.final_cta_primary")}
            </PrimaryCTA>

            <SecondaryCTA href="/process/development-integration">
              {t("deployment_enablement_page.final_cta_secondary")}
            </SecondaryCTA>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          14. REFERENCES
      ═══════════════════════════════════════════════════════ */}

      <section className="bg-[#070d18]">
        <div className="mx-auto max-w-[900px] px-6 py-20 lg:px-8">
          <SectionLabel>
            {t("deployment_enablement_page.references_label")}
          </SectionLabel>

          <ul className="mt-8 space-y-5">
            {referenceKeys.map((key) => (
              <li key={key} className="border-t border-white/6 pt-5">
                <p className="ar-heading text-sm font-semibold text-white">
                  {t(`deployment_enablement_page.reference.${key}.title`)}
                </p>
                <p className="ar-body mt-2 text-sm leading-6 text-slate-400">
                  {t(`deployment_enablement_page.reference.${key}.body`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}