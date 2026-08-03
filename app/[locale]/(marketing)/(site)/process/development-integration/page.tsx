import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ImageWithLightbox from "../../../components/common/ImageWithLightbox";

export const metadata: Metadata = {
  title: "Development & Integration — How OpenQCore Works",
  description:
    "OpenQCore turns a tested specification into verified software — implementation traced to acceptance criteria, tested at every layer, and integrated against executable contracts before a deployment decision is made.",
  openGraph: {
    title: "Development & Integration — How OpenQCore Works",
    description:
      "A specification becomes software: OpenQCore's evidence-based approach to development and integration.",
    type: "website",
    url: "https://openqcore.com/process/development-integration",
    images: [
      { url: "/og-development-integration.png", width: 600, height: 630 }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Development & Integration — How OpenQCore Works",
    description:
      "A specification becomes software: OpenQCore's evidence-based approach to development and integration."
  },
  alternates: {
    canonical: "https://openqcore.com/process/development-integration"
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
   Architecture / diagram image wrapper (identical to solutions
   and other process pages)
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
   (kept inline per page, not shared — matches research-discovery)
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

export default async function DevelopmentIntegrationPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const implementationElements = [
    "traceable_work_breakdown",
    "definition_of_done",
    "specification_drift_control"
  ];

  const testingLayers = ["unit_tests", "integration_tests", "end_to_end_tests"];

  const secureDevelopmentElements = [
    "dependency_vulnerability_scanning",
    "threat_modeling",
    "least_privilege_implementation"
  ];

  const verificationGateOutcomes = [
    "ready_for_deployment",
    "return_for_fixes",
    "return_to_design",
    "escalate_risk"
  ];

  const stageArtifacts = [
    "verified_codebase",
    "test_coverage_report",
    "contract_test_suite",
    "code_review_records",
    "security_scan_results",
    "ci_pipeline_documentation"
  ];

  const referenceKeys = [
    "accelerate_dora",
    "cohn_testing_pyramid",
    "cohen_peer_review",
    "pact_contracts",
    "nist_ssdf"
  ];

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
              {t("development_integration_page.eyebrow")}
            </SectionLabel>
          </div>

          <h1 className="ar-heading mx-auto mt-8 max-w-4xl text-[clamp(2.4rem,5.5vw,4.4rem)] font-bold leading-[1.02] tracking-tighter text-white">
            {t("development_integration_page.title")}
          </h1>

          <p className="ar-body mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">
            {t("development_integration_page.intro_p1")}
          </p>

          <p className="ar-body mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            {t("development_integration_page.intro_p2")}
          </p>

          <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-white/6 bg-[#0b1222] p-8 text-center">
            <p className="ar-body text-sm uppercase tracking-[0.14em] text-slate-500">
              {t("development_integration_page.intro_not_question_label")}
            </p>
            <p className="ar-heading mt-3 text-lg font-semibold italic text-slate-300">
              {t("development_integration_page.intro_not_question")}
            </p>

            <p className="ar-body mt-6 text-sm uppercase tracking-[0.14em] text-slate-500">
              {t("development_integration_page.intro_should_be_label")}
            </p>
            <p className="ar-heading mt-3 text-lg font-semibold italic text-white">
              {t("development_integration_page.intro_should_be")}
            </p>
          </div>

          <p className="mt-10 text-center text-xs uppercase tracking-[0.2em] text-slate-500">
            {t("development_integration_page.hero_tags")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. WHY DEVELOPMENT FOLLOWS DESIGN
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:py-24 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("development_integration_page.bridge_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("development_integration_page.bridge_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("development_integration_page.bridge_p1")}
            </p>
          </div>

          <p className="ar-body mt-10 max-w-3xl text-lg font-medium leading-8 text-slate-200">
            {t("development_integration_page.bridge_flow")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. WHY DELIVERY DISCIPLINE MATTERS (DORA / Accelerate)
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("development_integration_page.discipline_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("development_integration_page.discipline_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("development_integration_page.discipline_p1")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            <StatCard
              value={t("development_integration_page.stat_lead_time_value")}
              label={t("development_integration_page.stat_lead_time_label")}
              source={t("development_integration_page.stat_dora_source")}
            />
            <StatCard
              value={t("development_integration_page.stat_change_failure_value")}
              label={t(
                "development_integration_page.stat_change_failure_label"
              )}
              source={t("development_integration_page.stat_dora_source")}
            />
          </div>

          <p className="ar-body mt-10 max-w-3xl text-lg leading-8 text-slate-400">
            {t("development_integration_page.discipline_p2_balanced")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. FROM SPECIFICATION TO IMPLEMENTATION
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("development_integration_page.implementation_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("development_integration_page.implementation_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("development_integration_page.implementation_p1")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {implementationElements.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(
                    `development_integration_page.implementation_element.${key}.title`
                  )}
                </h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(
                    `development_integration_page.implementation_element.${key}.body`
                  )}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. TEST-DRIVEN VERIFICATION

          IMAGE 1 — Testing pyramid diagram: a wide base of Unit
          Tests, a narrower middle layer of Integration Tests,
          and a small top layer of End-to-End Tests, each
          annotated with relative speed/cost. Suggested aspect
          ratio ~4:3 (a pyramid reads better slightly taller
          than wide).
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("development_integration_page.testing_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("development_integration_page.testing_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("development_integration_page.testing_p1")}
            </p>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/process/development-integration/testing-pyramid.png"
              alt="Testing pyramid: a wide base of unit tests, a narrower layer of integration tests, and a small top layer of end-to-end tests"
              width={900}
              height={700}
              maxWidth="620px"
              priority
            />
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {testingLayers.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`development_integration_page.testing_layer.${key}.title`)}
                </h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`development_integration_page.testing_layer.${key}.body`)}
                </p>
              </article>
            ))}
          </div>

          <p className="ar-body mx-auto mt-10 max-w-3xl text-center text-lg font-medium leading-8 text-slate-200">
            {t("development_integration_page.testing_p2_objective")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. INTEGRATION & CONTRACT TESTING
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("development_integration_page.contracts_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("development_integration_page.contracts_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("development_integration_page.contracts_p1")}
            </p>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("development_integration_page.contracts_p2")}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. CODE REVIEW & STATIC VERIFICATION
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("development_integration_page.review_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("development_integration_page.review_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("development_integration_page.review_p1")}
            </p>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("development_integration_page.review_p2")}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          8. CONTINUOUS INTEGRATION PIPELINE

          IMAGE 2 — The flagship diagram for this page. A
          horizontal pipeline: Commit → Automated Build → Unit &
          Integration Tests → Static & Security Analysis →
          Contract Verification → Ready for Deployment. Suggested
          aspect ratio ~16:9 or wider (a flowing pipeline reads
          best as a horizontal strip).
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("development_integration_page.pipeline_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("development_integration_page.pipeline_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("development_integration_page.pipeline_p1")}
            </p>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/process/development-integration/ci-pipeline.png"
              alt="Continuous integration pipeline: commit, automated build, unit and integration tests, static and security analysis, contract verification, ready for deployment"
              width={1400}
              height={650}
              maxWidth="1100px"
              light
            />
          </div>

          <p className="ar-body mx-auto mt-10 max-w-3xl text-center text-base leading-7 text-slate-400">
            {t("development_integration_page.pipeline_p2_note")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          9. SECURE DEVELOPMENT PRACTICES
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("development_integration_page.security_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("development_integration_page.security_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("development_integration_page.security_p1")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {secureDevelopmentElements.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(
                    `development_integration_page.security_element.${key}.title`
                  )}
                </h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(
                    `development_integration_page.security_element.${key}.body`
                  )}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          10. THE INTEGRATION VERIFICATION GATE

          IMAGE 3 — Decision-tree diagram branching from
          "Verification Gate" into four outcomes: READY FOR
          DEPLOYMENT · RETURN FOR FIXES · RETURN TO DESIGN ·
          ESCALATE RISK. Keep the same neutral, non-alarming
          palette used in the Discovery and Design gates — none
          of these should read as a failure state. Suggested
          aspect ratio ~16:9.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("development_integration_page.gate_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("development_integration_page.gate_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("development_integration_page.gate_p1")}
            </p>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/process/development-integration/verification-gate.png"
              alt="Integration verification gate branching into ready for deployment, return for fixes, return to design, or escalate risk"
              width={1200}
              height={650}
              maxWidth="1000px"
            />
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {verificationGateOutcomes.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-6 text-center"
              >
                <h3 className="ar-heading text-base font-semibold text-[#d4af37]">
                  {t(`development_integration_page.gate_outcome.${key}.title`)}
                </h3>
                <p className="ar-body mt-3 text-xs leading-6 text-slate-400">
                  {t(`development_integration_page.gate_outcome.${key}.body`)}
                </p>
              </article>
            ))}
          </div>

          <p className="ar-body mx-auto mt-10 max-w-2xl text-center text-lg font-medium leading-8 text-slate-200">
            {t("development_integration_page.gate_p2_not_verifying")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          11. WHAT THIS STAGE PRODUCES
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("development_integration_page.artifacts_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("development_integration_page.artifacts_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("development_integration_page.artifacts_p1")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {stageArtifacts.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`development_integration_page.artifact.${key}.title`)}
                </h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`development_integration_page.artifact.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          12. FROM DEVELOPMENT TO DEPLOYMENT & ENABLEMENT + CTA
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1000px] px-6 py-24 text-center md:py-32 lg:px-8">
          <SectionLabel>
            {t("development_integration_page.transition_label")}
          </SectionLabel>

          <h2 className="ar-heading mx-auto mt-5 max-w-2xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("development_integration_page.transition_title")}
          </h2>

          <p className="ar-body mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            {t("development_integration_page.transition_p1")}
          </p>

          <p className="ar-body mx-auto mt-4 max-w-2xl text-base font-medium leading-7 text-slate-300">
            {t("development_integration_page.transition_flow")}
          </p>

          <div className="mx-auto mt-10 max-w-md rounded-3xl border border-[#d4af37]/20 bg-[#0b1222] p-8">
            <p className="ar-body text-xs uppercase tracking-[0.14em] text-slate-500">
              {t("development_integration_page.step_05_eyebrow")}
            </p>
            <h3 className="ar-heading mt-3 text-2xl font-semibold text-white">
              {t("development_integration_page.step_05_title")}
            </h3>
            <p className="ar-body mt-3 text-sm leading-6 text-slate-400">
              {t("development_integration_page.step_05_description")}
            </p>

            <div className="mt-6 flex justify-center">
              <SecondaryCTA href="/process/deployment-enablement">
                {t("development_integration_page.step_05_cta")}
              </SecondaryCTA>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
            <PrimaryCTA href="/contact">
              {t("development_integration_page.final_cta_primary")}
            </PrimaryCTA>

            <SecondaryCTA href="/process/solution-design">
              {t("development_integration_page.final_cta_secondary")}
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
            {t("development_integration_page.references_label")}
          </SectionLabel>

          <ul className="mt-8 space-y-5">
            {referenceKeys.map((key) => (
              <li key={key} className="border-t border-white/6 pt-5">
                <p className="ar-heading text-sm font-semibold text-white">
                  {t(`development_integration_page.reference.${key}.title`)}
                </p>
                <p className="ar-body mt-2 text-sm leading-6 text-slate-400">
                  {t(`development_integration_page.reference.${key}.body`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}