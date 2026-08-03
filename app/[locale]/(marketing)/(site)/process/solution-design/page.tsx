import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ArchitectureImage from "../../../components/ArchitectureImage";
import ImageWithLightbox from "../../../components/common/ImageWithLightbox";



export const metadata: Metadata = {
  title: "Solution Design — How OpenQCore Works",
  description:
    "OpenQCore treats design as a testable hypothesis, not a finished answer — prototyping, testing and defining acceptance criteria before a single line of production code is written.",
  openGraph: {
    title: "Solution Design — How OpenQCore Works",
    description:
      "A specification is not a guess: OpenQCore's evidence-based approach to solution design.",
    type: "website",
    url: "https://openqcore.com/process/solution-design",
    images: [{ url: "/og-solution-design.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Solution Design — How OpenQCore Works",
    description:
      "A specification is not a guess: OpenQCore's evidence-based approach to solution design."
  },
  alternates: {
    canonical: "https://openqcore.com/process/solution-design"
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
    <div className="rounded-2xl border border-white/8 bg-white/3 p-8">
      <p className="ar-heading text-4xl font-bold text-[#d4af37]">
        {value}
      </p>
      <p className="ar-body mt-3 text-sm text-slate-300">
        {label}
      </p>
      <p className="ar-body mt-2 text-xs text-slate-500">
        {source}
      </p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   Page
════════════════════════════════════════════════════════════ */

export default async function SolutionDesignPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const specificationTypes = [
    "workflow_specification",
    "interface_specification",
    "data_contract_specification",
    "behavioral_specification"
  ];

  const workflowDesignElements = [
    "human_in_the_loop_points",
    "automation_boundaries",
    "exception_pathways"
  ];

  const prototypeCycleStages = [
    "design",
    "prototype",
    "test_representative_data",
    "measure_baseline",
    "refine_or_reject"
  ];

  const dataInterfaceSpecItems = [
    "schema_definitions",
    "validation_rules",
    "error_exception_handling",
    "versioning_strategy",
    "rate_load_boundaries",
    "auth_contracts",
    "idempotency_requirements"
  ];

  const failureDesignElements = [
    "uncertainty_handling",
    "graceful_degradation",
    "escalation_design",
    "adversarial_edge_case_behavior"
  ];

  const validationCriteriaTypes = [
    "functional_acceptance",
    "non_functional_acceptance",
    "test_plan"
  ];

  const designGateOutcomes = [
    "proceed_to_build",
    "iterate_design",
    "return_to_architecture",
    "escalate_risk"
  ];

  const designArtifacts = [
    "solution_specification_document",
    "interaction_workflow_diagrams",
    "api_data_contracts",
    "prototype_evaluation_report",
    "failure_mode_analysis",
    "acceptance_criteria_test_plan"
  ];

  const referenceKeys = ["boehm_1981", "hevner_2004", "fagan_1976", "iso_25010"];

  return (
    <main className="min-h-screen bg-[#050911] text-white">
      {/* ═══════════════════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════════════════ */}

      <section className="relative isolate overflow-hidden border-b border-white/4">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#050911] via-[#050911]/70 to-[#050911]" />

        <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-32 text-center md:pb-32 md:pt-44 lg:px-8">
          <div className="mx-auto flex justify-center">
            <SectionLabel>{t("solution_design_page.eyebrow")}</SectionLabel>
          </div>

          <h1 className="ar-heading mx-auto mt-8 max-w-4xl text-[clamp(2.4rem,5.5vw,4.4rem)] font-bold leading-[1.02] tracking-tighter text-white">
            {t("solution_design_page.title")}
          </h1>

          <p className="ar-body mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">
            {t("solution_design_page.intro_p1")}
          </p>

          <p className="ar-body mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            {t("solution_design_page.intro_p2")}
          </p>

          <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-white/6 bg-[#0b1222] p-8 text-center">
            <p className="ar-body text-sm uppercase tracking-[0.14em] text-slate-500">
              {t("solution_design_page.intro_not_question_label")}
            </p>
            <p className="ar-heading mt-3 text-lg font-semibold italic text-slate-300">
              {t("solution_design_page.intro_not_question")}
            </p>

            <p className="ar-body mt-6 text-sm uppercase tracking-[0.14em] text-slate-500">
              {t("solution_design_page.intro_should_be_label")}
            </p>
            <p className="ar-heading mt-3 text-lg font-semibold italic text-white">
              {t("solution_design_page.intro_should_be")}
            </p>
          </div>

          <p className="mt-10 text-center text-xs uppercase tracking-[0.2em] text-slate-500">
            {t("solution_design_page.hero_tags")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. WHY DESIGN FOLLOWS ARCHITECTURE
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:py-24 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("solution_design_page.bridge_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("solution_design_page.bridge_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("solution_design_page.bridge_p1")}
            </p>
          </div>

          <p className="ar-body mt-10 max-w-3xl text-lg font-medium leading-8 text-slate-200">
            {t("solution_design_page.bridge_flow")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. WHY DESIGN RIGOR MATTERS (Boehm cost-of-change)
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>{t("solution_design_page.rigor_label")}</SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("solution_design_page.rigor_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("solution_design_page.rigor_p1")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            <StatCard
              value="~1×"
              label={t("solution_design_page.stat_design_label")}
              source={t("solution_design_page.stat_boehm_source")}
            />
            <StatCard
              value="10×–100×"
              label={t("solution_design_page.stat_production_label")}
              source={t("solution_design_page.stat_boehm_source")}
            />
          </div>

          <p className="ar-body mt-10 max-w-3xl text-lg leading-8 text-slate-400">
            {t("solution_design_page.rigor_p2_revisited")}
          </p>

          <p className="ar-body mt-5 max-w-3xl text-lg font-medium leading-8 text-slate-200">
            {t("solution_design_page.rigor_p3_direction_holds")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. FROM ARCHITECTURE TO SPECIFICATION

          IMAGE 1 — Simple flow diagram: the layered reference
          architecture (interfaces / intelligence / data /
          infrastructure) decomposing into four specification
          types: Workflow, Interface, Data Contract and
          Behavioral Specification, converging into a single
          "Solution Specification (Draft)" box. Suggested aspect
          ratio ~16:9.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("solution_design_page.specification_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("solution_design_page.specification_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("solution_design_page.specification_p1")}
            </p>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/process/solution-design/architecture-to-specification.png"
              alt="Reference architecture decomposing into workflow, interface, data contract and behavioral specifications, converging into a draft solution specification"
              width={1792}
              height={1008}
              maxWidth="1000px"
              priority
            />
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {specificationTypes.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`solution_design_page.specification.${key}.title`)}
                </h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`solution_design_page.specification.${key}.body`)}
                </p>
              </article>
            ))}
          </div>

          <p className="ar-body mx-auto mt-10 max-w-2xl text-center text-sm uppercase tracking-[0.12em] text-[#d4af37]">
            {t("solution_design_page.specification_output_label")}
          </p>
          <p className="ar-body mx-auto mt-2 text-center text-lg font-semibold text-white">
            {t("solution_design_page.specification_output")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. WORKFLOW & INTERACTION DESIGN

          IMAGE 2 — A swimlane-style workflow diagram showing a
          process split between an automated lane and a human
          lane, with explicit handoff points marked as
          "human-in-the-loop." Suggested aspect ratio ~16:9.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("solution_design_page.workflow_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("solution_design_page.workflow_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("solution_design_page.workflow_p1")}
            </p>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("solution_design_page.workflow_p2")}
            </p>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/process/solution-design/workflow-human-in-the-loop.png"
              alt="Workflow diagram with an automated lane and a human lane, showing explicit human-in-the-loop handoff points"
              width={1792}
              height={1008}
              maxWidth="1000px"
            />
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {workflowDesignElements.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`solution_design_page.workflow_element.${key}.title`)}
                </h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`solution_design_page.workflow_element.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. PROTOTYPING & EXPERIMENTATION

          IMAGE 3 — The flagship diagram for this page: a closed
          loop — Design → Prototype → Test With Representative
          Data → Measure Against Baseline → Refine or Reject →
          back to Design (if rejected/refined) or forward to
          the Design Review Gate (if validated). Suggested aspect
          ratio ~4:5 or square, since it's a circular loop.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("solution_design_page.prototyping_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("solution_design_page.prototyping_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("solution_design_page.prototyping_p1")}
            </p>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
            <div>
              <div className="space-y-5">
                {prototypeCycleStages.map((key, i) => (
                  <div
                    key={key}
                    className="rounded-2xl border border-white/6 bg-[#0b1222] p-6"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="ar-heading text-sm font-semibold text-[#d4af37]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="ar-heading text-lg font-semibold text-white">
                        {t(`solution_design_page.prototype_stage.${key}.title`)}
                      </h3>
                    </div>
                    <p className="ar-body mt-2 text-sm leading-6 text-slate-400">
                      {t(`solution_design_page.prototype_stage.${key}.body`)}
                    </p>
                  </div>
                ))}
              </div>

              <p className="ar-body mt-10 text-lg font-medium leading-8 text-slate-200">
                {t("solution_design_page.prototyping_p2_objective")}
              </p>
            </div>

            <ArchitectureImage
              src="/images/process/solution-design/prototype-test-refine-loop.png"
              alt="Closed loop: design, prototype, test with representative data, measure against baseline, refine or reject"
              width={1200}
              height={1400}
              maxWidth="420px"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. DATA & INTERFACE SPECIFICATION
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("solution_design_page.data_interface_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("solution_design_page.data_interface_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("solution_design_page.data_interface_p1")}
            </p>
          </div>

          <div className="mt-14 flex flex-wrap gap-3">
            {dataInterfaceSpecItems.map((key) => (
              <span
                key={key}
                className="ar-body rounded-full border border-white/8 bg-white/3 px-4 py-2 text-sm text-slate-300"
              >
                {t(`solution_design_page.data_item.${key}`)}
              </span>
            ))}
          </div>

          <p className="ar-body mt-10 max-w-3xl text-base leading-7 text-slate-400">
            {t("solution_design_page.data_interface_p2_unglamorous")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          8. DESIGNING FOR FAILURE, NOT JUST SUCCESS
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("solution_design_page.failure_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("solution_design_page.failure_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("solution_design_page.failure_p1")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {failureDesignElements.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`solution_design_page.failure_element.${key}.title`)}
                </h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`solution_design_page.failure_element.${key}.body`)}
                </p>
              </article>
            ))}
          </div>

          <p className="ar-body mx-auto mt-10 max-w-2xl text-center text-lg font-medium leading-8 text-slate-200">
            {t("solution_design_page.failure_p2_not_designed")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          9. VALIDATION CRITERIA DEFINED BEFORE BUILD
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("solution_design_page.validation_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("solution_design_page.validation_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("solution_design_page.validation_p1")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {validationCriteriaTypes.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`solution_design_page.validation_type.${key}.title`)}
                </h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`solution_design_page.validation_type.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          10. THE DESIGN REVIEW GATE

          IMAGE 4 — Decision-tree diagram branching from
          "Design Review" into four outcomes: PROCEED TO BUILD ·
          ITERATE DESIGN · RETURN TO ARCHITECTURE · ESCALATE
          RISK. Keep a neutral, non-alarming palette for all
          four (consistent with the Discovery Decision Gate on
          the previous page) — none of these outcomes should
          read as a failure state. Suggested aspect ratio ~16:9.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("solution_design_page.gate_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("solution_design_page.gate_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("solution_design_page.gate_p1")}
            </p>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/process/solution-design/design-review-gate.png"
              alt="Design review gate branching into proceed to build, iterate design, return to architecture, or escalate risk"
              width={1792}
              height={1008}
              maxWidth="1000px"
              light
            />
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {designGateOutcomes.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-6 text-center"
              >
                <h3 className="ar-heading text-base font-semibold text-[#d4af37]">
                  {t(`solution_design_page.gate_outcome.${key}.title`)}
                </h3>
                <p className="ar-body mt-3 text-xs leading-6 text-slate-400">
                  {t(`solution_design_page.gate_outcome.${key}.body`)}
                </p>
              </article>
            ))}
          </div>

          <p className="ar-body mx-auto mt-10 max-w-2xl text-center text-lg font-medium leading-8 text-slate-200">
            {t("solution_design_page.gate_p2_not_automatic")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          11. WHAT SOLUTION DESIGN PRODUCES
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("solution_design_page.artifacts_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("solution_design_page.artifacts_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("solution_design_page.artifacts_p1")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {designArtifacts.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`solution_design_page.artifact.${key}.title`)}
                </h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`solution_design_page.artifact.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          12. FROM DESIGN TO DEVELOPMENT & INTEGRATION + CTA
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1000px] px-6 py-24 text-center md:py-32 lg:px-8">
          <SectionLabel>
            {t("solution_design_page.transition_label")}
          </SectionLabel>

          <h2 className="ar-heading mx-auto mt-5 max-w-2xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("solution_design_page.transition_title")}
          </h2>

          <p className="ar-body mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            {t("solution_design_page.transition_p1")}
          </p>

          <p className="ar-body mx-auto mt-4 max-w-2xl text-base font-medium leading-7 text-slate-300">
            {t("solution_design_page.transition_flow")}
          </p>

          <div className="mx-auto mt-10 max-w-md rounded-3xl border border-[#d4af37]/20 bg-[#0b1222] p-8">
            <p className="ar-body text-xs uppercase tracking-[0.14em] text-slate-500">
              {t("solution_design_page.step_04_eyebrow")}
            </p>
            <h3 className="ar-heading mt-3 text-2xl font-semibold text-white">
              {t("solution_design_page.step_04_title")}
            </h3>
            <p className="ar-body mt-3 text-sm leading-6 text-slate-400">
              {t("solution_design_page.step_04_description")}
            </p>

            <div className="mt-6 flex justify-center">
              <SecondaryCTA href="/process/development-integration">
                {t("solution_design_page.step_04_cta")}
              </SecondaryCTA>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
            <PrimaryCTA href="/contact">
              {t("solution_design_page.final_cta_primary")}
            </PrimaryCTA>

            <SecondaryCTA href="/process/strategy-architecture">
              {t("solution_design_page.final_cta_secondary")}
            </SecondaryCTA>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          13. REFERENCES
      ═══════════════════════════════════════════════════════ */}

      <section className="bg-[#050911]">
        <div className="mx-auto max-w-[900px] px-6 py-20 lg:px-8">
          <SectionLabel>
            {t("solution_design_page.references_label")}
          </SectionLabel>

          <ul className="mt-8 space-y-5">
            {referenceKeys.map((key) => (
              <li key={key} className="border-t border-white/6 pt-5">
                <p className="ar-heading text-sm font-semibold text-white">
                  {t(`solution_design_page.reference.${key}.title`)}
                </p>
                <p className="ar-body mt-2 text-sm leading-6 text-slate-400">
                  {t(`solution_design_page.reference.${key}.body`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}