import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ImageWithLightbox from "../../../components/common/ImageWithLightbox";

export const metadata: Metadata = {
  title: "Monitoring & Optimization — How OpenQCore Works",
  description:
    "OpenQCore treats a live system as understood only once it is observed, measured, and continuously improved against evidence — closing the loop back into Research & Discovery.",
  openGraph: {
    title: "Monitoring & Optimization — How OpenQCore Works",
    description:
      "Live software is not finished software: OpenQCore's evidence-based approach to monitoring and continuous improvement.",
    type: "website",
    url: "https://openqcore.com/process/monitoring-optimization",
    images: [
      { url: "/og-monitoring-optimization.png", width: 600, height: 630 }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Monitoring & Optimization — How OpenQCore Works",
    description:
      "Live software is not finished software: OpenQCore's evidence-based approach to monitoring and continuous improvement."
  },
  alternates: {
    canonical: "https://openqcore.com/process/monitoring-optimization"
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
   (kept inline per page, matching the other process pages)
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

export default async function MonitoringOptimizationPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const goldenSignals = ["latency", "traffic", "errors", "saturation"];

  const observabilityPillars = ["logs", "metrics", "traces"];

  const alertingElements = [
    "symptom_based_alerting",
    "actionable_thresholds",
    "alert_review_cadence"
  ];

  const performanceElements = [
    "baseline_comparison",
    "regression_detection",
    "capacity_trend_analysis"
  ];

  const aiMonitoringElements = [
    "model_drift_detection",
    "human_override_rate",
    "evaluation_recalibration"
  ];

  const optimizationGateOutcomes = [
    "continue_monitoring",
    "optimize",
    "re_enter_discovery",
    "deprecate"
  ];

  const stageArtifacts = [
    "observability_dashboard",
    "incident_response_runbook",
    "postmortem_records",
    "performance_trend_report",
    "model_drift_report",
    "optimization_backlog"
  ];

  const referenceKeys = ["sre_book", "sridharan_observability", "nist_ai_rmf"];

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
              {t("monitoring_optimization_page.eyebrow")}
            </SectionLabel>
          </div>

          <h1 className="ar-heading mx-auto mt-8 max-w-4xl text-[clamp(2.4rem,5.5vw,4.4rem)] font-bold leading-[1.02] tracking-tighter text-white">
            {t("monitoring_optimization_page.title")}
          </h1>

          <p className="ar-body mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">
            {t("monitoring_optimization_page.intro_p1")}
          </p>

          <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-white/6 bg-[#0b1222] p-8 text-center">
            <p className="ar-body text-sm uppercase tracking-[0.14em] text-slate-500">
              {t("monitoring_optimization_page.intro_not_question_label")}
            </p>
            <p className="ar-heading mt-3 text-lg font-semibold italic text-slate-300">
              {t("monitoring_optimization_page.intro_not_question")}
            </p>

            <p className="ar-body mt-6 text-sm uppercase tracking-[0.14em] text-slate-500">
              {t("monitoring_optimization_page.intro_should_be_label")}
            </p>
            <p className="ar-heading mt-3 text-lg font-semibold italic text-white">
              {t("monitoring_optimization_page.intro_should_be")}
            </p>
          </div>

          <p className="mt-10 text-center text-xs uppercase tracking-[0.2em] text-slate-500">
            {t("monitoring_optimization_page.hero_tags")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. WHY MONITORING FOLLOWS DEPLOYMENT
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:py-24 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("monitoring_optimization_page.bridge_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("monitoring_optimization_page.bridge_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("monitoring_optimization_page.bridge_p1")}
            </p>
          </div>

          <p className="ar-body mt-10 max-w-3xl text-lg font-medium leading-8 text-slate-200">
            {t("monitoring_optimization_page.bridge_flow")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. WHY OBSERVABILITY DISCIPLINE MATTERS (Golden Signals)
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("monitoring_optimization_page.discipline_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("monitoring_optimization_page.discipline_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("monitoring_optimization_page.discipline_p1")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {goldenSignals.map((key) => (
              <div
                key={key}
                className="rounded-2xl border border-white/6 bg-[#0b1222] p-6 text-center"
              >
                <p className="ar-heading text-lg font-semibold text-[#d4af37]">
                  {t(`monitoring_optimization_page.golden_signal.${key}.title`)}
                </p>
                <p className="ar-body mt-2 text-xs leading-6 text-slate-400">
                  {t(`monitoring_optimization_page.golden_signal.${key}.body`)}
                </p>
              </div>
            ))}
          </div>

          <p className="ar-body mx-auto mt-10 max-w-3xl text-center text-sm text-slate-500">
            {t("monitoring_optimization_page.discipline_source")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. THE THREE PILLARS OF OBSERVABILITY
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("monitoring_optimization_page.pillars_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("monitoring_optimization_page.pillars_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("monitoring_optimization_page.pillars_p1")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {observabilityPillars.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`monitoring_optimization_page.pillar.${key}.title`)}
                </h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`monitoring_optimization_page.pillar.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. FROM SIGNALS TO UNDERSTANDING

          IMAGE 1 — Flow diagram: Logs / Metrics / Traces feeding
          into Dashboards, which feed into Alerts, which feed
          into Insight. Suggested aspect ratio ~16:9.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("monitoring_optimization_page.signals_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("monitoring_optimization_page.signals_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("monitoring_optimization_page.signals_p1")}
            </p>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/process/monitoring-optimization/signals-to-understanding.png"
              alt="Logs, metrics and traces feeding into dashboards, which feed into alerts, which feed into insight"
              width={1400}
              height={650}
              maxWidth="1100px"
              priority
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. ALERTING WITHOUT FATIGUE
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("monitoring_optimization_page.alerting_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("monitoring_optimization_page.alerting_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("monitoring_optimization_page.alerting_p1")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {alertingElements.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(
                    `monitoring_optimization_page.alerting_element.${key}.title`
                  )}
                </h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(
                    `monitoring_optimization_page.alerting_element.${key}.body`
                  )}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. INCIDENT RESPONSE & BLAMELESS POSTMORTEMS
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("monitoring_optimization_page.incident_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("monitoring_optimization_page.incident_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("monitoring_optimization_page.incident_p1")}
            </p>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("monitoring_optimization_page.incident_p2")}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          8. CONTINUOUS FEEDBACK LOOP

          IMAGE 2 — The flagship diagram, not just of this page
          but of the entire six-stage methodology. A large closed
          loop showing all six stages around its circumference
          (Research & Discovery → Strategy & Architecture →
          Solution Design → Development & Integration →
          Deployment & Enablement → Monitoring & Optimization),
          with the arrow returning from Monitoring & Optimization
          back to Research & Discovery visually emphasized —
          this is the arrow that closes the entire methodology
          into a cycle rather than a straight line. Suggested
          aspect ratio ~1:1 (a full circle needs equal width and
          height).
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("monitoring_optimization_page.feedback_loop_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("monitoring_optimization_page.feedback_loop_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("monitoring_optimization_page.feedback_loop_p1")}
            </p>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/process/monitoring-optimization/continuous-feedback-loop.png"
              alt="The six-stage OpenQCore methodology as a closed loop, with monitoring and optimization feeding evidence back into research and discovery"
              width={1300}
              height={1300}
              maxWidth="560px"
              light
            />
          </div>

          <p className="ar-body mx-auto mt-10 max-w-3xl text-center text-lg font-medium leading-8 text-slate-200">
            {t("monitoring_optimization_page.feedback_loop_p2_closes")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          9. PERFORMANCE OPTIMIZATION AGAINST BASELINE
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("monitoring_optimization_page.performance_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("monitoring_optimization_page.performance_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("monitoring_optimization_page.performance_p1")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {performanceElements.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(
                    `monitoring_optimization_page.performance_element.${key}.title`
                  )}
                </h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(
                    `monitoring_optimization_page.performance_element.${key}.body`
                  )}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          10. MODEL & AI-SPECIFIC MONITORING
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("monitoring_optimization_page.ai_monitoring_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("monitoring_optimization_page.ai_monitoring_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("monitoring_optimization_page.ai_monitoring_p1")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {aiMonitoringElements.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(
                    `monitoring_optimization_page.ai_monitoring_element.${key}.title`
                  )}
                </h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(
                    `monitoring_optimization_page.ai_monitoring_element.${key}.body`
                  )}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          11. THE OPTIMIZATION REVIEW GATE

          IMAGE 3 — Decision-tree diagram branching from
          "Optimization Review" into four outcomes: CONTINUE
          MONITORING · OPTIMIZE · RE-ENTER DISCOVERY · DEPRECATE.
          Keep the same neutral, non-alarming palette used in
          the earlier process pages' gates — RE-ENTER DISCOVERY
          and DEPRECATE should read as considered decisions, not
          failure states. Suggested aspect ratio ~16:9.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("monitoring_optimization_page.gate_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("monitoring_optimization_page.gate_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("monitoring_optimization_page.gate_p1")}
            </p>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/process/monitoring-optimization/optimization-review-gate.png"
              alt="Optimization review gate branching into continue monitoring, optimize, re-enter discovery, or deprecate"
              width={1200}
              height={650}
              maxWidth="1000px"
            />
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {optimizationGateOutcomes.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-6 text-center"
              >
                <h3 className="ar-heading text-base font-semibold text-[#d4af37]">
                  {t(`monitoring_optimization_page.gate_outcome.${key}.title`)}
                </h3>
                <p className="ar-body mt-3 text-xs leading-6 text-slate-400">
                  {t(`monitoring_optimization_page.gate_outcome.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          12. WHAT THIS STAGE PRODUCES
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("monitoring_optimization_page.artifacts_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("monitoring_optimization_page.artifacts_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("monitoring_optimization_page.artifacts_p1")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {stageArtifacts.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`monitoring_optimization_page.artifact.${key}.title`)}
                </h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`monitoring_optimization_page.artifact.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          13. THE METHODOLOGY CLOSES THE LOOP + CTA
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1000px] px-6 py-24 text-center md:py-32 lg:px-8">
          <SectionLabel>
            {t("monitoring_optimization_page.closes_loop_label")}
          </SectionLabel>

          <h2 className="ar-heading mx-auto mt-5 max-w-2xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("monitoring_optimization_page.closes_loop_title")}
          </h2>

          <p className="ar-body mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            {t("monitoring_optimization_page.closes_loop_p1")}
          </p>

          <p className="ar-body mx-auto mt-4 max-w-2xl text-base font-medium leading-7 text-slate-300">
            {t("monitoring_optimization_page.closes_loop_flow")}
          </p>

          <div className="mx-auto mt-10 max-w-md rounded-3xl border border-[#d4af37]/20 bg-[#0b1222] p-8">
            <p className="ar-body text-xs uppercase tracking-[0.14em] text-slate-500">
              {t("monitoring_optimization_page.step_01_eyebrow")}
            </p>
            <h3 className="ar-heading mt-3 text-2xl font-semibold text-white">
              {t("monitoring_optimization_page.step_01_title")}
            </h3>
            <p className="ar-body mt-3 text-sm leading-6 text-slate-400">
              {t("monitoring_optimization_page.step_01_description")}
            </p>

            <div className="mt-6 flex justify-center">
              <SecondaryCTA href="/process/research-discovery">
                {t("monitoring_optimization_page.step_01_cta")}
              </SecondaryCTA>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
            <PrimaryCTA href="/contact">
              {t("monitoring_optimization_page.final_cta_primary")}
            </PrimaryCTA>

            <SecondaryCTA href="/process/deployment-enablement">
              {t("monitoring_optimization_page.final_cta_secondary")}
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
            {t("monitoring_optimization_page.references_label")}
          </SectionLabel>

          <ul className="mt-8 space-y-5">
            {referenceKeys.map((key) => (
              <li key={key} className="border-t border-white/6 pt-5">
                <p className="ar-heading text-sm font-semibold text-white">
                  {t(`monitoring_optimization_page.reference.${key}.title`)}
                </p>
                <p className="ar-body mt-2 text-sm leading-6 text-slate-400">
                  {t(`monitoring_optimization_page.reference.${key}.body`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}