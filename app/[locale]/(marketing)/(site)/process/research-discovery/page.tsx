import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ImageWithLightbox from "../../../components/common/ImageWithLightbox";


export const metadata: Metadata = {
  title:
    "Research & Discovery — How OpenQCore Works",
  description:
    "Every OpenQCore engagement begins with structured investigation — research, systems thinking, engineering analysis and business reasoning, before any technology is proposed.",
  openGraph: {
    title: "Research & Discovery — How OpenQCore Works",
    description:
      "Understand before you build: OpenQCore's evidence-based discovery methodology.",
    type: "website",
    url: "https://openqcore.com/process/research-discovery",
    images: [{ url: "/og-research-discovery.png", width: 600, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Research & Discovery — How OpenQCore Works",
    description:
      "Understand before you build: OpenQCore's evidence-based discovery methodology."
  },
  alternates: {
    canonical: "https://openqcore.com/process/research-discovery"
  }
};

/* ════════════════════════════════════════════════════════════
   Shared primitives (identical to the /solutions pages)
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
   Architecture / diagram image wrapper (identical to solutions)
════════════════════════════════════════════════════════════ */

function ArchitectureImage({
  src,
  alt,
  width,        // ← لازم تضيفها كـ prop مطلوبة
  height,       // ← لازم تضيفها كـ prop مطلوبة
  light = false,
  priority = false,
  maxWidth = "1000px",
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

export default async function ResearchDiscoveryPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const methodologySteps = [
    "stakeholder_objective_mapping",
    "operational_workflow_analysis",
    "systems_data_audit",
    "market_contextual_analysis",
    "constraint_risk_identification",
    "problem_definition_success_criteria"
  ];

  const discoveryCycleStages = [
    "observe",
    "analyze",
    "map",
    "hypothesize",
    "validate",
    "define"
  ];

  const rootCauseChain = [
    "observed_condition",
    "workflow_evidence",
    "system_evidence",
    "data_evidence",
    "root_cause_hypothesis"
  ];

  const successMetrics = [
    "cycle_time",
    "cost_per_operation",
    "error_rate",
    "throughput",
    "human_effort",
    "reliability",
    "decision_quality",
    "automation_rate",
    "risk_exposure",
    "experience_metrics"
  ];

  const aiRiskFactors = [
    "intended_use",
    "failure_modes",
    "human_oversight",
    "data_sensitivity",
    "decision_consequences",
    "security",
    "reliability_factor",
    "evaluation_requirements",
    "operational_controls",
    "governance_requirements"
  ];

  const disciplinePrinciples = [
    "no_predetermined_solution",
    "explicit_assumptions",
    "traceable_evidence",
    "alternative_hypotheses",
    "measurable_outcomes",
    "documented_uncertainty",
    "proportionate_rigor"
  ];

  const discoveryArtifacts = [
    "research_findings_brief",
    "stakeholder_objective_model",
    "current_state_workflow_model",
    "systems_data_landscape",
    "root_cause_analysis",
    "baseline_measurements",
    "requirements_definition",
    "feasibility_assessment",
    "opportunity_map",
    "constraint_risk_register",
    "success_framework"
  ];

  const decisionGateOutcomes = [
    "proceed",
    "investigate_further",
    "reframe",
    "redesign_approach",
    "do_not_build"
  ];

  const referenceKeys = [
    "bcg_2024",
    "mckinsey_2025",
    "iso_15288",
    "iso_29148",
    "nist_ai_rmf"
  ];

  return (
    <main className="min-h-screen bg-[#050911] text-white">
      {/* ═══════════════════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════════════════ */}

      <section className="relative isolate overflow-hidden border-b border-white/4">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#050911] via-[#050911]/70 to-[#050911]" />

        <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-32 md:pb-32 md:pt-44 lg:px-8">
          <div className="flex justify-center">
            <SectionLabel>{t("research_discovery_page.eyebrow")}</SectionLabel>
          </div>

          <h1 className="ar-heading mx-auto mt-8 max-w-4xl text-center text-[clamp(2.4rem,5.5vw,4.4rem)] font-bold leading-[1.02] tracking-tighter text-white">
            {t("research_discovery_page.title")}
          </h1>

          <p className="ar-body mx-auto mt-8 max-w-2xl text-center text-lg leading-8 text-slate-400">
            {t("research_discovery_page.intro_p1")}
          </p>

          <p className="ar-body mx-auto mt-5 max-w-2xl text-center text-lg leading-8 text-slate-400">
            {t("research_discovery_page.intro_p2")}
          </p>

          <p className="ar-body mx-auto mt-5 max-w-2xl text-center text-lg leading-8 text-slate-400">
            {t("research_discovery_page.intro_p3")}
          </p>

          <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-white/6 bg-[#0b1222] p-8 text-center">
            <p className="ar-body text-sm uppercase tracking-[0.14em] text-slate-500">
              {t("research_discovery_page.intro_not_question_label")}
            </p>
            <p className="ar-heading mt-3 text-xl font-semibold italic text-slate-300">
              {t("research_discovery_page.intro_not_question")}
            </p>

            <p className="ar-body mt-6 text-sm uppercase tracking-[0.14em] text-slate-500">
              {t("research_discovery_page.intro_should_be_label")}
            </p>
            <p className="ar-heading mt-3 text-xl font-semibold italic text-white">
              {t("research_discovery_page.intro_should_be")}
            </p>
          </div>

          <p className="mt-10 text-center text-xs uppercase tracking-[0.2em] text-slate-500">
            {t("research_discovery_page.hero_tags")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. WHY DISCOVERY COMES FIRST

          IMAGE 1 — Two stacked horizontal flows for comparison:
          a muted/warning-toned "Technology-first" sequence
          (Technology → Find a Use Case → Deploy → Measure
          Afterwards) above a clearer, gold-accented
          "Evidence-first" sequence (Objective → Observe →
          Investigate → Define → Measure → Design → Engineer),
          designed to read as a contrast at a glance.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("research_discovery_page.why_first_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("research_discovery_page.why_first_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("research_discovery_page.why_first_p1")}
            </p>
          </div>

          <div className="mt-14 max-w-md">
            <StatCard
              value="74%"
              label={t("research_discovery_page.stat_74_label")}
              source={t("research_discovery_page.stat_74_source")}
            />
          </div>

          <p className="ar-body mt-10 max-w-3xl text-lg leading-8 text-slate-400">
            {t("research_discovery_page.why_first_p2")}
          </p>

          <p className="ar-body mt-5 max-w-3xl text-lg font-medium leading-8 text-slate-200">
            {t("research_discovery_page.why_first_p3_insufficient")}
          </p>

          <p className="ar-body mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            {t("research_discovery_page.why_first_p4")}
          </p>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/process/research-discovery/technology-first-vs-evidence-first.png"
              alt="Comparison between a technology-first sequence and OpenQCore's evidence-first discovery sequence"
              width={1200}
              height={600}
              priority
            />
          </div>

          <p className="ar-body mx-auto mt-10 max-w-3xl text-center text-lg font-medium leading-8 text-slate-200">
            {t("research_discovery_page.why_first_p5_consequence")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. A MULTIDISCIPLINARY APPROACH
          (merges the three-lenses section with "The System Is
          Bigger Than the Model" — both make the same point:
          the problem is broader than a single model or discipline)

          IMAGE 2 — Three overlapping circles (Venn diagram):
          Scientific Reasoning, Systems & Engineering, Business &
          Operations, converging at the center on "Evidence-Based
          Engineering."
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("research_discovery_page.lenses_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("research_discovery_page.lenses_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("research_discovery_page.lenses_p1")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <article className="rounded-3xl border border-white/6 bg-[#0b1222] p-7">
              <h3 className="ar-heading text-lg font-semibold text-white">
                {t("research_discovery_page.lens_scientific.title")}
              </h3>
              <p className="ar-body mt-2 text-xs uppercase tracking-[0.12em] text-[#d4af37]">
                {t("research_discovery_page.lens_scientific.tags")}
              </p>
              <p className="ar-body mt-4 text-sm leading-7 text-slate-400">
                {t("research_discovery_page.lens_scientific.body")}
              </p>
            </article>

            <article className="rounded-3xl border border-white/6 bg-[#0b1222] p-7">
              <h3 className="ar-heading text-lg font-semibold text-white">
                {t("research_discovery_page.lens_systems.title")}
              </h3>
              <p className="ar-body mt-2 text-xs uppercase tracking-[0.12em] text-[#d4af37]">
                {t("research_discovery_page.lens_systems.tags")}
              </p>
              <p className="ar-body mt-4 text-sm leading-7 text-slate-400">
                {t("research_discovery_page.lens_systems.body")}
              </p>
              <p className="ar-body mt-4 text-xs leading-6 text-slate-500">
                {t("research_discovery_page.lens_systems.iso_note")}
              </p>
            </article>

            <article className="rounded-3xl border border-white/6 bg-[#0b1222] p-7">
              <h3 className="ar-heading text-lg font-semibold text-white">
                {t("research_discovery_page.lens_business.title")}
              </h3>
              <p className="ar-body mt-2 text-xs uppercase tracking-[0.12em] text-[#d4af37]">
                {t("research_discovery_page.lens_business.tags")}
              </p>
              <p className="ar-body mt-4 text-sm leading-7 text-slate-400">
                {t("research_discovery_page.lens_business.body")}
              </p>
            </article>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/process/research-discovery/three-lenses-venn.png"
              alt="Scientific reasoning, systems and engineering, and business and operations converging on evidence-based engineering"
              width={800}
              height={600}
              light
            />
          </div>

          <div className="mt-16 max-w-3xl">
            <h3 className="ar-heading text-2xl font-semibold text-white">
              {t("research_discovery_page.system_bigger_title")}
            </h3>

            <p className="ar-body mt-4 text-lg leading-8 text-slate-400">
              {t("research_discovery_page.system_bigger_p1")}
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <StatCard
              value="10%"
              label={t("research_discovery_page.stat_algorithms_label")}
              source={t("research_discovery_page.stat_1020_70_source")}
            />
            <StatCard
              value="20%"
              label={t("research_discovery_page.stat_tech_data_label")}
              source={t("research_discovery_page.stat_1020_70_source")}
            />
            <StatCard
              value="70%"
              label={t("research_discovery_page.stat_people_process_label")}
              source={t("research_discovery_page.stat_1020_70_source")}
            />
          </div>

          <p className="ar-body mx-auto mt-10 max-w-3xl text-center text-base leading-7 text-slate-400">
            {t("research_discovery_page.system_bigger_p2_framework_note")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. THE OPENQCORE RESEARCH METHODOLOGY
      ═══════════════════════════════════════════════════════ */}

      <section id="methodology" className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("research_discovery_page.methodology_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("research_discovery_page.methodology_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("research_discovery_page.methodology_p1")}
            </p>
          </div>

          <div className="mt-14 space-y-6">
            {methodologySteps.map((key, i) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-8"
              >
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="ar-heading text-sm font-semibold text-[#d4af37]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="ar-heading text-xl font-semibold text-white">
                    {t(`research_discovery_page.methodology.${key}.title`)}
                  </h3>
                </div>

                <p className="ar-body mt-3 text-sm font-medium italic text-slate-300">
                  {t(`research_discovery_page.methodology.${key}.question`)}
                </p>

                <p className="ar-body mt-4 text-base leading-7 text-slate-400">
                  {t(`research_discovery_page.methodology.${key}.body`)}
                </p>

                <p className="ar-body mt-4 text-xs uppercase tracking-[0.12em] text-slate-500">
                  {t(`research_discovery_page.methodology.${key}.examines_label`)}
                </p>
                <p className="ar-body mt-1 text-sm leading-6 text-slate-400">
                  {t(`research_discovery_page.methodology.${key}.examines`)}
                </p>

                <p className="ar-body mt-5 text-xs uppercase tracking-[0.12em] text-[#d4af37]">
                  {t("research_discovery_page.methodology_output_label")}
                </p>
                <p className="ar-body mt-1 text-sm font-medium text-white">
                  {t(`research_discovery_page.methodology.${key}.output`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. THE DISCOVERY CYCLE

          IMAGE 3 — The flagship visual for this page. A closed
          loop: OBSERVE → ANALYZE → MAP → HYPOTHESIZE → VALIDATE
          → DEFINE → back to OBSERVE, with a branch exiting at
          DEFINE toward "Validated Problem → Strategy &
          Architecture" once sufficient confidence is reached.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>{t("research_discovery_page.cycle_label")}</SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("research_discovery_page.cycle_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("research_discovery_page.cycle_p1")}
            </p>

            <ul className="mt-5 space-y-2 text-base leading-7 text-slate-400">
              <li className="ar-body">{t("research_discovery_page.cycle_p2_evidence")}</li>
              <li className="ar-body">{t("research_discovery_page.cycle_p3_interview")}</li>
              <li className="ar-body">{t("research_discovery_page.cycle_p4_system")}</li>
              <li className="ar-body">{t("research_discovery_page.cycle_p5_measurement")}</li>
            </ul>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/process/research-discovery/discovery-cycle.png"
              alt="OpenQCore discovery cycle: observe, analyze, map, hypothesize, validate, define, feeding into strategy and architecture"
              width={1000}
              height={600}
            />
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 text-center sm:grid-cols-6">
            {discoveryCycleStages.map((key) => (
              <p
                key={key}
                className="ar-body text-xs uppercase tracking-[0.14em] text-slate-500"
              >
                {t(`research_discovery_page.cycle_stage.${key}`)}
              </p>
            ))}
          </div>

          <p className="ar-body mx-auto mt-10 max-w-2xl text-center text-base font-medium leading-7 text-slate-200">
            {t("research_discovery_page.cycle_p6_transition")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. APPLYING THE METHODOLOGY
          (merges "Root Cause Before Solution" and "From
          Assumption to Hypothesis" — both are worked examples
          of the methodology in action)

          IMAGE 4 — A vertical waterfall: Observed Condition →
          Workflow Evidence → System Evidence → Data Evidence →
          Root-Cause Hypothesis, each layer visually revealing
          something deeper than the one above it.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("research_discovery_page.applying_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("research_discovery_page.applying_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("research_discovery_page.applying_p1")}
            </p>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/process/research-discovery/root-cause-chain.png"
              alt="Root cause chain from an observed condition through workflow, system and data evidence to a root-cause hypothesis"
              width={1000}
              height={600}
            />
          </div>

          <div className="mt-10 space-y-3">
            {rootCauseChain.map((key) => (
              <p key={key} className="ar-body text-sm leading-7 text-slate-400">
                <span className="ar-heading font-semibold text-white">
                  {t(`research_discovery_page.root_cause.${key}.label`)}:
                </span>{" "}
                {t(`research_discovery_page.root_cause.${key}.body`)}
              </p>
            ))}
          </div>

          <p className="ar-body mt-10 max-w-3xl text-lg leading-8 text-slate-400">
            {t("research_discovery_page.applying_p2_question_change")}
          </p>

          <div className="mt-14 rounded-3xl border border-white/6 bg-[#0b1222] p-8">
            <h3 className="ar-heading text-xl font-semibold text-white">
              {t("research_discovery_page.hypothesis_title")}
            </h3>

            <div className="mt-6 space-y-5">
              <p className="ar-body text-sm leading-7 text-slate-400">
                <span className="ar-heading font-semibold text-[#d4af37]">
                  {t("research_discovery_page.hypothesis_observation_label")}
                </span>{" "}
                {t("research_discovery_page.hypothesis_observation")}
              </p>
              <p className="ar-body text-sm leading-7 text-slate-400">
                <span className="ar-heading font-semibold text-[#d4af37]">
                  {t("research_discovery_page.hypothesis_hypothesis_label")}
                </span>{" "}
                {t("research_discovery_page.hypothesis_hypothesis")}
              </p>
              <p className="ar-body text-sm leading-7 text-slate-400">
                <span className="ar-heading font-semibold text-[#d4af37]">
                  {t("research_discovery_page.hypothesis_evidence_label")}
                </span>{" "}
                {t("research_discovery_page.hypothesis_evidence")}
              </p>
              <p className="ar-body text-sm leading-7 text-slate-400">
                <span className="ar-heading font-semibold text-[#d4af37]">
                  {t("research_discovery_page.hypothesis_evaluation_label")}
                </span>{" "}
                {t("research_discovery_page.hypothesis_evaluation")}
              </p>
              <p className="ar-body text-sm leading-7 text-slate-400">
                <span className="ar-heading font-semibold text-[#d4af37]">
                  {t("research_discovery_page.hypothesis_decision_label")}
                </span>{" "}
                {t("research_discovery_page.hypothesis_decision")}
              </p>
            </div>

            <p className="ar-body mt-6 text-sm font-medium italic text-slate-300">
              {t("research_discovery_page.hypothesis_objective")}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. DEFINE SUCCESS BEFORE IMPLEMENTATION
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("research_discovery_page.success_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("research_discovery_page.success_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("research_discovery_page.success_p1")}
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {successMetrics.map((key) => (
              <div
                key={key}
                className="rounded-2xl border border-white/6 bg-[#0b1222] p-5"
              >
                <p className="ar-heading text-sm font-semibold text-white">
                  {t(`research_discovery_page.success_metric.${key}.title`)}
                </p>
                <p className="ar-body mt-2 text-xs leading-6 text-slate-400">
                  {t(`research_discovery_page.success_metric.${key}.body`)}
                </p>
              </div>
            ))}
          </div>

          <p className="ar-body mx-auto mt-12 max-w-2xl text-center text-lg font-medium leading-8 text-slate-200">
            {t("research_discovery_page.success_p2_structure")}
          </p>

          <p className="ar-body mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-slate-400">
            {t("research_discovery_page.success_p3_cannot_evaluate")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          8. AI REQUIRES CONTEXTUAL RISK ANALYSIS
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("research_discovery_page.ai_risk_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("research_discovery_page.ai_risk_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("research_discovery_page.ai_risk_p1")}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {["govern", "map", "measure", "manage"].map((key) => (
              <span
                key={key}
                className="ar-body rounded-full border border-[#d4af37]/25 bg-[#d4af37]/5 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-[#d4af37]"
              >
                {t(`research_discovery_page.ai_risk_function.${key}`)}
              </span>
            ))}
          </div>

          <p className="ar-body mx-auto mt-8 max-w-3xl text-center text-base leading-7 text-slate-400">
            {t("research_discovery_page.ai_risk_p2_continuous")}
          </p>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {aiRiskFactors.map((key) => (
              <div
                key={key}
                className="rounded-2xl border border-white/6 bg-[#0b1222] p-5 text-center"
              >
                <p className="ar-heading text-sm font-semibold text-white">
                  {t(`research_discovery_page.ai_risk_factor.${key}`)}
                </p>
              </div>
            ))}
          </div>

          <p className="ar-body mx-auto mt-10 max-w-3xl text-center text-base leading-7 text-slate-400">
            {t("research_discovery_page.ai_risk_p3_proportionate")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          9. EVIDENCE BEFORE RECOMMENDATION
          (merges "Technology-Neutral Discovery" + "Workflow
          Before Tooling" + "Evidence Before Recommendation" —
          all three made the same point in the source material;
          consolidated here into one section with the McKinsey
          stat and the seven discovery principles)
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("research_discovery_page.evidence_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("research_discovery_page.evidence_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("research_discovery_page.evidence_p1")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            <StatCard
              value="~2/3"
              label={t("research_discovery_page.stat_two_thirds_label")}
              source={t("research_discovery_page.stat_mckinsey_source")}
            />
            <StatCard
              value="39%"
              label={t("research_discovery_page.stat_39_label")}
              source={t("research_discovery_page.stat_mckinsey_source")}
            />
          </div>

          <p className="ar-body mt-10 max-w-3xl text-lg leading-8 text-slate-400">
            {t("research_discovery_page.evidence_p2_workflow")}
          </p>

          <p className="ar-body mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            {t("research_discovery_page.evidence_p3_not_predetermined")}
          </p>

          <p className="ar-body mt-5 max-w-3xl text-lg font-medium leading-8 text-slate-200">
            {t("research_discovery_page.evidence_p4_not_looking")}
          </p>

          <div className="mt-14 rounded-3xl border border-white/6 bg-[#0b1222] p-8">
            <p className="ar-body text-center text-base leading-7 text-slate-300">
              {t("research_discovery_page.evidence_chain_flow")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {disciplinePrinciples.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-base font-semibold text-white">
                  {t(`research_discovery_page.principle.${key}.title`)}
                </h3>
                <p className="ar-body mt-3 text-sm leading-6 text-slate-400">
                  {t(`research_discovery_page.principle.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          10. WHAT DISCOVERY PRODUCES
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("research_discovery_page.artifacts_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("research_discovery_page.artifacts_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("research_discovery_page.artifacts_p1")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {discoveryArtifacts.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`research_discovery_page.artifact.${key}.title`)}
                </h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`research_discovery_page.artifact.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          11. THE DISCOVERY DECISION GATE

          IMAGE 5 — A decision-tree diagram branching from
          "Validated Problem" into five outcomes: PROCEED ·
          INVESTIGATE FURTHER · REFRAME · REDESIGN THE APPROACH ·
          DO NOT BUILD. DO NOT BUILD should read as a considered,
          neutral outcome (not a failure state) — avoid red/
          warning coloring for it; keep it in the same neutral
          gold/slate palette as the others.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("research_discovery_page.decision_gate_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("research_discovery_page.decision_gate_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("research_discovery_page.decision_gate_p1")}
            </p>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/process/research-discovery/discovery-decision-gate.png"
              alt="Discovery decision gate branching into proceed, investigate further, reframe, redesign the approach, or do not build"
              width={1200}
              height={600}
              light
            />
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {decisionGateOutcomes.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-6 text-center"
              >
                <h3 className="ar-heading text-base font-semibold text-[#d4af37]">
                  {t(`research_discovery_page.decision_outcome.${key}.title`)}
                </h3>
                <p className="ar-body mt-3 text-xs leading-6 text-slate-400">
                  {t(`research_discovery_page.decision_outcome.${key}.body`)}
                </p>
              </article>
            ))}
          </div>

          <p className="ar-body mx-auto mt-10 max-w-2xl text-center text-lg font-medium leading-8 text-slate-200">
            {t("research_discovery_page.decision_gate_p2_not_building")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          12. FROM RESEARCH TO ARCHITECTURE + NEXT STEP + CTA
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1000px] px-6 py-24 text-center md:py-32 lg:px-8">
          <SectionLabel>
            {t("research_discovery_page.transition_label")}
          </SectionLabel>

          <h2 className="ar-heading mx-auto mt-5 max-w-2xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("research_discovery_page.transition_title")}
          </h2>

          <p className="ar-body mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            {t("research_discovery_page.transition_p1")}
          </p>

          <p className="ar-body mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-400">
            {t("research_discovery_page.transition_p2_should_emerge")}
          </p>

          <div className="mx-auto mt-10 max-w-md rounded-3xl border border-[#d4af37]/20 bg-[#0b1222] p-8">
            <p className="ar-body text-xs uppercase tracking-[0.14em] text-slate-500">
              {t("research_discovery_page.step_02_eyebrow")}
            </p>
            <h3 className="ar-heading mt-3 text-2xl font-semibold text-white">
              {t("research_discovery_page.step_02_title")}
            </h3>
            <p className="ar-body mt-3 text-sm leading-6 text-slate-400">
              {t("research_discovery_page.step_02_description")}
            </p>

            <div className="mt-6 flex justify-center">
              <SecondaryCTA href="/process/strategy-architecture">
                {t("research_discovery_page.step_02_cta")}
              </SecondaryCTA>
            </div>
          </div>

          <div className="mt-16 border-t border-white/6 pt-14">
            <h3 className="ar-heading text-2xl font-semibold text-white">
              {t("research_discovery_page.start_title")}
            </h3>

            <p className="ar-body mx-auto mt-4 max-w-xl text-base leading-7 text-slate-400">
              {t("research_discovery_page.start_p1")}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <PrimaryCTA href="/contact">
                {t("research_discovery_page.start_cta_primary")}
              </PrimaryCTA>

              <SecondaryCTA href="/contact">
                {t("research_discovery_page.start_cta_secondary")}
              </SecondaryCTA>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          13. REFERENCES
      ═══════════════════════════════════════════════════════ */}

      <section className="bg-[#050911]">
        <div className="mx-auto max-w-[900px] px-6 py-20 lg:px-8">
          <SectionLabel>
            {t("research_discovery_page.references_label")}
          </SectionLabel>

          <p className="ar-body mt-5 text-base leading-7 text-slate-400">
            {t("research_discovery_page.references_intro")}
          </p>

          <ul className="mt-8 space-y-5">
            {referenceKeys.map((key) => (
              <li key={key} className="border-t border-white/6 pt-5">
                <p className="ar-heading text-sm font-semibold text-white">
                  {t(`research_discovery_page.reference.${key}.title`)}
                </p>
                <p className="ar-body mt-2 text-sm leading-6 text-slate-400">
                  {t(`research_discovery_page.reference.${key}.body`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}