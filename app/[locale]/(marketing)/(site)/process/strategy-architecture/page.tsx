import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ImageWithLightbox from "../../../components/common/ImageWithLightbox";

export const metadata: Metadata = {
  title: "Strategy & Architecture — How OpenQCore Works",
  description:
    "OpenQCore turns a validated problem into an engineered system direction — architecture emerges from requirements, constraints and measurable outcomes, not a list of preferred technologies.",
  openGraph: {
    title: "Strategy & Architecture — How OpenQCore Works",
    description:
      "From validated problem to engineered direction: OpenQCore's strategy and architecture methodology.",
    type: "website",
    url: "https://openqcore.com/process/strategy-architecture",
    images: [
      { url: "/og-strategy-architecture.png", width: 1200, height: 630 }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Strategy & Architecture — How OpenQCore Works",
    description:
      "From validated problem to engineered direction: OpenQCore's strategy and architecture methodology."
  },
  alternates: {
    canonical: "https://openqcore.com/process/strategy-architecture"
  }
};

/* ════════════════════════════════════════════════════════════
   Shared primitives (identical to the other process/solutions
   pages)
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
   Page
════════════════════════════════════════════════════════════ */

export default async function StrategyArchitecturePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const discoveryInputs = [
    "requirements",
    "constraints_risks",
    "success_criteria"
  ];

  const designPrinciples = [
    "scalability",
    "security_by_design",
    "modularity",
    "interoperability",
    "observability",
    "cost_efficiency",
    "future_readiness"
  ];

  const techSelectionCriteria = [
    "fit_for_purpose",
    "total_cost_of_ownership",
    "vendor_lock_in_risk",
    "team_capability",
    "long_term_maintainability"
  ];

  const stageArtifacts = [
    "reference_architecture_document",
    "technology_stack_decision",
    "data_architecture_blueprint",
    "security_compliance_model",
    "scalability_capacity_plan",
    "architecture_decision_records"
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
              {t("strategy_architecture_page.eyebrow")}
            </SectionLabel>
          </div>

          <h1 className="ar-heading mx-auto mt-8 max-w-4xl text-[clamp(2.4rem,5.5vw,4.4rem)] font-bold leading-[1.02] tracking-tighter text-white">
            {t("strategy_architecture_page.title")}
          </h1>

          <p className="ar-body mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">
            {t("strategy_architecture_page.intro_p1")}
          </p>

          <p className="ar-body mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            {t("strategy_architecture_page.intro_p2")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PrimaryCTA href="#framework">
              {t("strategy_architecture_page.primary_cta")}
            </PrimaryCTA>

            <SecondaryCTA href="/contact">
              {t("strategy_architecture_page.secondary_cta")}
            </SecondaryCTA>
          </div>

          <p className="mt-10 text-xs uppercase tracking-[0.2em] text-slate-500">
            {t("strategy_architecture_page.hero_tags")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. WHY ARCHITECTURE FOLLOWS DISCOVERY
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("strategy_architecture_page.bridge_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("strategy_architecture_page.bridge_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("strategy_architecture_page.bridge_p1")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            {discoveryInputs.map((key) => (
              <div
                key={key}
                className="rounded-2xl border border-white/6 bg-[#0b1222] p-6 text-center"
              >
                <p className="ar-heading text-sm font-semibold text-[#d4af37]">
                  {t(`strategy_architecture_page.discovery_input.${key}.title`)}
                </p>
                <p className="ar-body mt-2 text-xs leading-6 text-slate-400">
                  {t(`strategy_architecture_page.discovery_input.${key}.body`)}
                </p>
              </div>
            ))}
          </div>

          <p className="ar-body mx-auto mt-10 max-w-3xl text-center text-base leading-7 text-slate-400">
            {t("strategy_architecture_page.bridge_p2_not_from_scratch")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. STRATEGY BEFORE ARCHITECTURE

          IMAGE 1 — Strategy vs Architecture comparison. A
          Strategy hexagon (Business Objectives · Transformation
          Roadmap) stacked above an Architecture hexagon
          (Intelligent · Scalable · Secure · Future-Ready), with
          small supporting icons around them (Data Strategy,
          Cybersecurity, AI Agents). Suggested source aspect
          ratio ~4:5 (portrait, since it stacks two hexagons
          vertically) — update width/height below to match the
          actual produced asset.
      ═══════════════════════════════════════════════════════ */}

      <section id="framework" className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("strategy_architecture_page.strategy_vs_arch_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("strategy_architecture_page.strategy_vs_arch_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("strategy_architecture_page.strategy_vs_arch_p1")}
            </p>
          </div>

          <div className="mt-16">
            <ImageWithLightbox
              src="/images/process/strategy-architecture/strategy-vs-architecture.png"
              alt="Strategy layer (business objectives, transformation roadmap) above the architecture layer (intelligent, scalable, secure, future-ready)"
              width={1400}
              height={1750}
              priority
            />
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            <article className="rounded-3xl border border-white/6 bg-[#0b1222] p-7">
              <h3 className="ar-heading text-lg font-semibold text-[#d4af37]">
                {t("strategy_architecture_page.strategy_card.title")}
              </h3>
              <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                {t("strategy_architecture_page.strategy_card.body")}
              </p>
            </article>

            <article className="rounded-3xl border border-white/6 bg-[#0b1222] p-7">
              <h3 className="ar-heading text-lg font-semibold text-[#d4af37]">
                {t("strategy_architecture_page.architecture_card.title")}
              </h3>
              <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                {t("strategy_architecture_page.architecture_card.body")}
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. ARCHITECTURE DESIGN PRINCIPLES
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("strategy_architecture_page.principles_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("strategy_architecture_page.principles_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("strategy_architecture_page.principles_p1")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {designPrinciples.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`strategy_architecture_page.principle.${key}.title`)}
                </h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`strategy_architecture_page.principle.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. FROM DISCOVERY INPUTS TO ARCHITECTURE DECISIONS

          IMAGE 2 — Simple flow: Requirements + Constraints &
          Risks + Success Criteria (from Discovery) converging
          into "Architecture Decision" → "Reference
          Architecture." Suggested aspect ratio ~16:9
          (horizontal flow).
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("strategy_architecture_page.inputs_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("strategy_architecture_page.inputs_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("strategy_architecture_page.inputs_p1")}
            </p>
          </div>

          <div className="mt-16">
            <ImageWithLightbox
              src="/images/process/strategy-architecture/discovery-inputs-to-decisions.png"
              alt="Requirements, constraints and risks, and success criteria from discovery converging into architecture decisions and a reference architecture"
              width={1792}
              height={1008}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. REFERENCE ARCHITECTURE

          IMAGE 3 — The flagship diagram for this page. A
          generic (not industry-specific) layered architecture:
          Interfaces → Intelligence/Application Layer → Data
          Layer → Infrastructure Layer, with a side rail:
          Security · Governance · Observability · Scalability.
          Suggested aspect ratio ~7:4 (matches the other
          solutions pages' architecture diagrams).
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#080e1a]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("strategy_architecture_page.reference_arch_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("strategy_architecture_page.reference_arch_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("strategy_architecture_page.reference_arch_p1")}
            </p>
          </div>

          <div className="mt-16">
            <ImageWithLightbox
              src="/images/process/strategy-architecture/reference-architecture.png"
              alt="OpenQCore reference architecture: interfaces, intelligence layer, data layer and infrastructure layer, with security, governance, observability and scalability as cross-cutting concerns"
              width={1792}
              height={1024}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. DATA STRATEGY & GOVERNANCE-BY-DESIGN
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("strategy_architecture_page.governance_by_design_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("strategy_architecture_page.governance_by_design_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("strategy_architecture_page.governance_by_design_p1")}
            </p>
          </div>

          <p className="ar-body mx-auto mt-10 max-w-3xl text-center text-lg font-medium leading-8 text-slate-200">
            {t("strategy_architecture_page.governance_by_design_p2_not_afterthought")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          8. TECHNOLOGY SELECTION FRAMEWORK
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("strategy_architecture_page.tech_selection_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("strategy_architecture_page.tech_selection_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("strategy_architecture_page.tech_selection_p1")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {techSelectionCriteria.map((key) => (
              <div
                key={key}
                className="rounded-2xl border border-white/6 bg-[#0b1222] p-6"
              >
                <p className="ar-heading text-sm font-semibold text-white">
                  {t(`strategy_architecture_page.tech_criterion.${key}.title`)}
                </p>
                <p className="ar-body mt-2 text-xs leading-6 text-slate-400">
                  {t(`strategy_architecture_page.tech_criterion.${key}.body`)}
                </p>
              </div>
            ))}
          </div>

          <p className="ar-body mx-auto mt-10 max-w-3xl text-center text-base leading-7 text-slate-400">
            {t("strategy_architecture_page.tech_selection_p2_evidence_echo")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          9. RISK-AWARE ARCHITECTURE DECISIONS

          IMAGE 4 — Architecture Decision Record (ADR) example
          visual: Context → Options Considered → Decision →
          Trade-offs → Consequences. Suggested aspect ratio ~5:4
          (a document-style card, taller than wide flows).
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("strategy_architecture_page.adr_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("strategy_architecture_page.adr_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("strategy_architecture_page.adr_p1")}
            </p>
          </div>

          <div className="mt-16">
            <ImageWithLightbox
              src="/images/process/strategy-architecture/architecture-decision-record.png"
              alt="Architecture decision record example: context, options considered, decision, trade-offs and consequences"
              width={1400}
              height={1120}
            />
          </div>

          <p className="ar-body mx-auto mt-10 max-w-3xl text-center text-base leading-7 text-slate-400">
            {t("strategy_architecture_page.adr_p2_documented")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          10. WHAT THIS STAGE PRODUCES
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("strategy_architecture_page.artifacts_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("strategy_architecture_page.artifacts_title")}
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {stageArtifacts.map((key) => (
              <article
                key={key}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`strategy_architecture_page.artifact.${key}.title`)}
                </h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`strategy_architecture_page.artifact.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          11. FROM ARCHITECTURE TO SOLUTION DESIGN + CTA
      ═══════════════════════════════════════════════════════ */}

      <section className="bg-[#050911]">
        <div className="mx-auto max-w-[1000px] px-6 py-24 text-center md:py-32 lg:px-8">
          <SectionLabel>
            {t("strategy_architecture_page.transition_label")}
          </SectionLabel>

          <h2 className="ar-heading mx-auto mt-5 max-w-2xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("strategy_architecture_page.transition_title")}
          </h2>

          <p className="ar-body mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            {t("strategy_architecture_page.transition_p1")}
          </p>

          <div className="mx-auto mt-10 max-w-md rounded-3xl border border-[#d4af37]/20 bg-[#0b1222] p-8">
            <p className="ar-body text-xs uppercase tracking-[0.14em] text-slate-500">
              {t("strategy_architecture_page.step_03_eyebrow")}
            </p>
            <h3 className="ar-heading mt-3 text-2xl font-semibold text-white">
              {t("strategy_architecture_page.step_03_title")}
            </h3>
            <p className="ar-body mt-3 text-sm leading-6 text-slate-400">
              {t("strategy_architecture_page.step_03_description")}
            </p>

            <div className="mt-6 flex justify-center">
              <SecondaryCTA href="/process/solution-design">
                {t("strategy_architecture_page.step_03_cta")}
              </SecondaryCTA>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
            <PrimaryCTA href="/contact">
              {t("strategy_architecture_page.final_cta_primary")}
            </PrimaryCTA>

            <SecondaryCTA href="/process/research-discovery">
              {t("strategy_architecture_page.final_cta_secondary")}
            </SecondaryCTA>
          </div>
        </div>
      </section>
    </main>
  );
}