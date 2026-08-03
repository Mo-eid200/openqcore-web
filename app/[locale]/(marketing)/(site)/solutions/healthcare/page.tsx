import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ImageWithLightbox from "../../../components/common/ImageWithLightbox";

export const metadata: Metadata = {
  title:
    "OpenQCore for Healthcare & Life Sciences — Intelligence Infrastructure for Medicine",
  description:
    "OpenQCore develops AI infrastructure, scientific intelligence systems and intelligent automation for healthcare organizations, research institutions and life sciences teams.",
  openGraph: {
    title: "OpenQCore for Healthcare & Life Sciences",
    description:
      "Intelligence infrastructure connecting clinical operations, biomedical research and drug development.",
    type: "website",
    url: "https://openqcore.com/solutions/healthcare",
    images: [{ url: "/og-healthcare.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenQCore for Healthcare & Life Sciences",
    description:
      "Intelligence infrastructure connecting clinical operations, biomedical research and drug development."
  },
  alternates: {
    canonical: "https://openqcore.com/solutions/healthcare"
  }
};

/* ════════════════════════════════════════════════════════════
   Shared primitives (identical to /solutions/government)
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
   Hero background — molecular / biomedical network
   (same node-graph technique as government's HeroNetworkGraphic,
   restyled to read as molecular structure rather than a data grid)
════════════════════════════════════════════════════════════ */

function HeroMolecularGraphic() {
  const points: [number, number][] = [
    [150, 100],
    [330, 70],
    [540, 140],
    [750, 80],
    [970, 130],
    [1190, 90],
    [220, 270],
    [430, 310],
    [650, 260],
    [860, 320],
    [1080, 280],
    [1270, 340],
    [310, 430],
    [570, 410],
    [830, 440],
    [1050, 410]
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
            key={`bond-${i}`}
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
          key={`atom-${i}`}
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
   (identical to government's ArchitectureImage)
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

export default async function HealthcarePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const healthcareCapabilityKeys = [
    "clinical_knowledge",
    "document_intelligence",
    "multimodal",
    "ai_agents",
    "patient_services",
    "workflow_automation",
    "enterprise_search",
    "operational_intelligence"
  ];

  const researchCapabilityKeys = [
    "literature_intelligence",
    "knowledge_graphs",
    "hypothesis_exploration",
    "data_intelligence",
    "research_agents",
    "evidence_traceability"
  ];

  const pipelineStages = [
    "disease_biology",
    "target_id",
    "target_validation",
    "candidate_discovery",
    "virtual_screening",
    "admet_prediction",
    "preclinical",
    "clinical_development",
    "pharmacovigilance"
  ];

  const autonomyLevels = ["assist", "analyze", "recommend", "execute"];

  const interoperabilityStandards = ["fhir", "hl7", "dicom", "api"];

  const governanceKeys = [
    "data_protection",
    "identity_aware",
    "data_residency",
    "model_governance",
    "evidence_provenance",
    "auditability",
    "human_in_the_loop",
    "zero_trust"
  ];

  const deploymentKeys = ["private_cloud", "on_premises", "hybrid"];

  return (
    <main className="min-h-screen bg-[#050911] text-white">
      {/* ═══════════════════════════════════════════════════════
          1. HERO

          IMAGE 1 — Hero background
          A dark, high-quality biomedical/scientific visual: a
          molecular structure, DNA strand, or lab-data render that
          reads as "healthcare + science", not stock hospital
          photography. Sits behind HeroMolecularGraphic as a
          full-bleed background layer (add as a <div> with
          background-image if you want a photographic layer
          beneath the SVG nodes, or replace the SVG entirely).
      ═══════════════════════════════════════════════════════ */}

      <section className="relative isolate overflow-hidden border-b border-white/4">
        <HeroMolecularGraphic />

        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#050911] via-[#050911]/70 to-[#050911]" />

        <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-32 text-center md:pb-32 md:pt-44 lg:px-8">
          <div className="mx-auto flex justify-center">
            <SectionLabel>{t("healthcare_page.eyebrow")}</SectionLabel>
          </div>

          <h1 className="ar-heading mx-auto mt-8 max-w-4xl text-[clamp(2.4rem,5.5vw,4.4rem)] font-bold leading-[1.02] tracking-tighter text-white">
            {t("healthcare_page.title_line_1")}
            <br />
            {t("healthcare_page.title_line_2")}
          </h1>

          <p className="ar-body mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">
            {t("healthcare_page.description")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PrimaryCTA href="#capabilities">
              {t("healthcare_page.primary_cta")}
            </PrimaryCTA>

            <SecondaryCTA href="/contact">
              {t("healthcare_page.secondary_cta")}
            </SecondaryCTA>
          </div>

          <p className="mt-10 text-xs uppercase tracking-[0.2em] text-slate-500">
            {t("healthcare_page.hero_tags")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. THE MISSION

          IMAGE 2 — Mission / lifecycle loop diagram
          A closed-loop diagram, 6 connected nodes in a circle
          or hexagon: Biomedical Science → Research → Drug
          Discovery → Clinical Knowledge → Healthcare Delivery →
          Real-World Evidence → back to Research. Each node gets
          a small line-icon. This is the single visual that
          explains "OpenQCore spans the whole medical lifecycle,
          not just hospitals."
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>{t("healthcare_page.mission_label")}</SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("healthcare_page.mission_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("healthcare_page.mission_p1")}
            </p>

            <p className="ar-body mt-4 text-lg leading-8 text-slate-400">
              {t("healthcare_page.mission_p2")}
            </p>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/healthcare/healthcare-mission-loop.png"
              alt="OpenQCore closed-loop intelligence across the medical and scientific lifecycle"
              priority
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. HEALTHCARE SYSTEMS CAPABILITIES

          IMAGE 3 — Icon set (8 small line-icons), one per
          capability below: Clinical Knowledge, Documents,
          Multimodal, Agents, Patient Services, Workflow,
          Search, Operational Intelligence. Reference each icon
          via a per-key <Image> if you rasterize them
          individually, or inline them as SVG components.
      ═══════════════════════════════════════════════════════ */}

      <section id="capabilities" className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("healthcare_page.systems_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("healthcare_page.systems_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("healthcare_page.systems_p1")}
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {healthcareCapabilityKeys.map((key) => (
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
                  {t(`healthcare_page.systems.${key}.title`)}
                </h3>

                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`healthcare_page.systems.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. BIOMEDICAL RESEARCH
          (absorbs the earlier "Precision & Computational
          Medicine" section as a closing paragraph rather than
          a separate section)

          IMAGE 4 — Icon set (6 small line-icons): Literature,
          Knowledge Graph, Hypothesis Exploration, Data
          Intelligence, Research Agents, Evidence Traceability.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("healthcare_page.research_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("healthcare_page.research_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("healthcare_page.research_p1")}
            </p>
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
                  {t(`healthcare_page.research.${key}.title`)}
                </h3>

                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`healthcare_page.research.${key}.body`)}
                </p>
              </article>
            ))}
          </div>

          <p className="ar-body mx-auto mt-14 max-w-3xl text-center text-lg leading-8 text-slate-300">
            {t("healthcare_page.research_p2_computational_medicine")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. DRUG DISCOVERY & DEVELOPMENT

          IMAGE 5 — Pipeline illustration (the most important
          visual on the page besides the architecture diagram).
          Horizontal flow, 9 stages, each with its own icon:
          Disease Biology → Target ID → Target Validation →
          Candidate Discovery → Virtual Screening → ADMET
          Prediction → Preclinical → Clinical Development →
          Pharmacovigilance. Funnel/timeline styling.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("healthcare_page.drug_discovery_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("healthcare_page.drug_discovery_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("healthcare_page.drug_discovery_p1")}
            </p>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/healthcare/drug-discovery-pipeline.png"
              alt="OpenQCore computational intelligence pipeline across drug discovery and development"
            />
          </div>

          {/* Optional: stage captions under the illustration, kept
              in sync with the image so the pipeline is legible
              even without hovering/zooming */}
          <div className="mt-10 grid grid-cols-2 gap-4 text-center sm:grid-cols-3 lg:grid-cols-9">
            {pipelineStages.map((key) => (
              <p
                key={key}
                className="ar-body text-xs uppercase tracking-[0.14em] text-slate-500"
              >
                {t(`healthcare_page.pipeline.${key}`)}
              </p>
            ))}
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[
              "target_intelligence",
              "molecular_intelligence",
              "virtual_screening",
              "admet_prediction",
              "repurposing_intelligence",
              "development_intelligence"
            ].map((key) => (
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
                  {t(`healthcare_page.drug_discovery.${key}.title`)}
                </h3>

                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`healthcare_page.drug_discovery.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. SCIENTIFIC AI ARCHITECTURE

          IMAGE 6 — The flagship diagram. Layered, top to bottom:
          Researchers/Clinicians → Scientific Interfaces →
          OpenQCore Scientific Intelligence core (Agents,
          Reasoning & Planning, Biomedical Knowledge Graph,
          Scientific Retrieval, Multimodal Intelligence,
          Molecular/Biological Models, Computational Tools,
          Model Orchestration) → Scientific Data Layer
          (Publications, Clinical Data, Genomics, Proteomics,
          Molecular Data, Imaging, Experimental Data, Databases)
          → Compute & Research Infrastructure. Side rail:
          Identity · Security · Governance · Provenance ·
          Evaluation · Human Oversight. Build as a real diagram,
          not text — this is the section that differentiates
          OpenQCore from a wrapper around a chat model.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#080e1a]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("healthcare_page.architecture_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("healthcare_page.architecture_title")}
            </h2>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/healthcare/scientific-ai-architecture.png"
              alt="OpenQCore scientific AI architecture across research, data and compute layers"
              light
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. HUMAN CONTROL & SCIENTIFIC SAFETY

          IMAGE 7 — Autonomy scale graphic. A horizontal
          4-step scale/slider: ASSIST → ANALYZE → RECOMMEND →
          EXECUTE, gradient from "lighter automation, more
          human control" to "more automation, explicit
          authorization required." Each step gets its own icon.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>{t("healthcare_page.safety_label")}</SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("healthcare_page.safety_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("healthcare_page.safety_p1")}
            </p>

            <p className="ar-body mt-4 text-lg leading-8 text-slate-400">
              {t("healthcare_page.safety_p2")}
            </p>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/healthcare/autonomy-levels-scale.png"
              alt="OpenQCore configurable autonomy levels: assist, analyze, recommend, execute"
            />
          </div>

          <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
            {autonomyLevels.map((key) => (
              <div key={key} className="text-center">
                <p className="ar-heading text-sm font-semibold uppercase tracking-[0.14em] text-[#d4af37]">
                  {t(`healthcare_page.autonomy.${key}.title`)}
                </p>
                <p className="ar-body mt-2 text-sm leading-6 text-slate-400">
                  {t(`healthcare_page.autonomy.${key}.body`)}
                </p>
              </div>
            ))}
          </div>

          <p className="ar-body mx-auto mt-10 max-w-3xl text-center text-base leading-7 text-slate-400">
            {t("healthcare_page.safety_p3_qualified_oversight")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          8. INTEROPERABILITY

          IMAGE 8 — Badge/pill row for FHIR, HL7, DICOM, API,
          plus a second muted row of connected system types
          (EHR/EMR, PACS/RIS, LIS, Pharmacy, Research Databases,
          ERP, Data Platforms). Small, logo-style, not a diagram.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-28 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("healthcare_page.interop_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("healthcare_page.interop_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("healthcare_page.interop_p1")}
            </p>
          </div>

          <div className="mt-10">
            <ArchitectureImage
              src="/images/healthcare/interoperability-badges.png"
              alt="FHIR, HL7, DICOM and API interoperability standards"
            />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              "ehr_emr",
              "pacs_ris",
              "lis",
              "pharmacy",
              "research_databases",
              "erp",
              "data_platforms"
            ].map((key) => (
              <span
                key={key}
                className="ar-body rounded-full border border-white/8 bg-white/3 px-4 py-2 text-xs text-slate-400"
              >
                {t(`healthcare_page.systems_connected.${key}`)}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          9. GOVERNANCE
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#080e1a]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("healthcare_page.governance_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("healthcare_page.governance_title")}
            </h2>
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
                  {t(`healthcare_page.governance.${key}.title`)}
                </h3>

                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`healthcare_page.governance.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          10. DEPLOYMENT
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("healthcare_page.deployment_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("healthcare_page.deployment_title")}
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
                  {t(`healthcare_page.deployment.${key}.title`)}
                </h3>

                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`healthcare_page.deployment.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          11. OPENQCORE RESEARCH
          (voice/identity section — kept text-only, no image)
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1000px] px-6 py-24 text-center md:py-32 lg:px-8">
          <SectionLabel>
            {t("healthcare_page.oqc_research_label")}
          </SectionLabel>

          <h2 className="ar-heading mx-auto mt-5 max-w-2xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("healthcare_page.oqc_research_title")}
          </h2>

          <p className="ar-body mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            {t("healthcare_page.oqc_research_p1")}
          </p>

          <p className="ar-body mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-400">
            {t("healthcare_page.oqc_research_p2")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          12. FINAL CTA
      ═══════════════════════════════════════════════════════ */}

      <section className="bg-[#050911]">
        <div className="mx-auto max-w-[900px] px-6 py-24 text-center md:py-32 lg:px-8">
          <h2 className="ar-heading mx-auto max-w-2xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("healthcare_page.final_cta_title_line_1")}
            <br />
            {t("healthcare_page.final_cta_title_line_2")}
          </h2>

          <p className="ar-body mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            {t("healthcare_page.final_cta_p1")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PrimaryCTA href="/contact">
              {t("healthcare_page.final_cta_primary")}
            </PrimaryCTA>

            <SecondaryCTA href="#">
              {t("healthcare_page.final_cta_secondary")}
            </SecondaryCTA>
          </div>
        </div>
      </section>
    </main>
  );
}