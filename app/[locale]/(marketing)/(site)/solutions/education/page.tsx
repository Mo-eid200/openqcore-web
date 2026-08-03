import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ImageWithLightbox from "../../../components/common/ImageWithLightbox";

export const metadata: Metadata = {
  title:
    "OpenQCore for Education — Intelligence Infrastructure for Learning & Discovery",
  description:
    "OpenQCore develops AI infrastructure for the education and research ecosystem — connecting learners, educators, institutions, knowledge and scientific research.",
  openGraph: {
    title: "OpenQCore for Education",
    description:
      "Intelligence infrastructure designed to support learning, strengthen academic operations and expand human capability.",
    type: "website",
    url: "https://openqcore.com/solutions/education",
    images: [{ url: "/og-education.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenQCore for Education",
    description:
      "Intelligence infrastructure designed to support learning, strengthen academic operations and expand human capability."
  },
  alternates: {
    canonical: "https://openqcore.com/solutions/education"
  }
};

/* ════════════════════════════════════════════════════════════
   Shared primitives (identical to government/healthcare/finance)
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
   Hero background — knowledge / research network
   (same node-graph technique as the other solutions heroes)
════════════════════════════════════════════════════════════ */

function HeroKnowledgeGraphic() {
  const points: [number, number][] = [
    [145, 100],
    [335, 65],
    [545, 135],
    [755, 75],
    [975, 125],
    [1195, 85],
    [215, 265],
    [425, 305],
    [645, 255],
    [855, 315],
    [1075, 275],
    [1265, 335],
    [305, 425],
    [565, 405],
    [825, 435],
    [1055, 405]
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
            key={`link-${i}`}
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
   (identical to government/healthcare/finance)
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

export default async function EducationPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const learnerCapabilityKeys = [
    "learner_modeling",
    "adaptive_paths",
    "ai_tutoring",
    "concept_mastery",
    "adaptive_practice",
    "learning_feedback",
    "multilingual_learning"
  ];

  const assessmentAnalyticsKeys = [
    "assessment_analytics",
    "cohort_patterns",
    "curriculum_effectiveness"
  ];

  const teachingCapabilityKeys = [
    "teaching_copilots",
    "curriculum_intelligence",
    "lesson_preparation",
    "assessment_support",
    "learning_analytics",
    "content_intelligence"
  ];

  const institutionalSystemKeys = [
    "lms",
    "sis",
    "library",
    "admissions",
    "student_services",
    "research_systems",
    "crm",
    "erp"
  ];

  const institutionalCapabilityKeys = [
    "institutional_search",
    "academic_ai_agents",
    "document_intelligence",
    "student_services",
    "workflow_automation",
    "knowledge_systems",
    "operational_analytics",
    "research_intelligence"
  ];

  const studentJourneyStages = [
    "discovery",
    "application",
    "admission",
    "enrollment",
    "learning",
    "support",
    "assessment",
    "graduation",
    "alumni"
  ];

  const researchCapabilityKeys = [
    "scientific_search",
    "literature_intelligence",
    "research_knowledge_management",
    "evidence_organization",
    "document_intelligence",
    "research_workspaces",
    "ai_assisted_analysis",
    "research_workflow_integration"
  ];

  const responsibleAiLevels = ["assist", "guide", "teach", "assess", "act"];

  const governanceKeys = [
    "student_data_protection",
    "identity_access",
    "academic_integrity",
    "age_appropriate_controls",
    "model_governance",
    "evidence_provenance",
    "fairness_evaluation",
    "human_oversight"
  ];

  const deploymentKeys = ["cloud", "private_cloud", "on_premises", "hybrid"];

  return (
    <main className="min-h-screen bg-[#050911] text-white">
      {/* ═══════════════════════════════════════════════════════
          1. HERO
          No dedicated hero image — inline HeroKnowledgeGraphic
          keeps this section consistent with the rest of the site.
      ═══════════════════════════════════════════════════════ */}

      <section className="relative isolate overflow-hidden border-b border-white/4">
        <HeroKnowledgeGraphic />

        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#050911] via-[#050911]/70 to-[#050911]" />

        <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-32 text-center md:pb-32 md:pt-44 lg:px-8">
          <div className="mx-auto flex justify-center">
            <SectionLabel>{t("education_page.eyebrow")}</SectionLabel>
          </div>

          <h1 className="ar-heading mx-auto mt-8 max-w-4xl text-[clamp(2.4rem,5.5vw,4.4rem)] font-bold leading-[1.02] tracking-tighter text-white">
            {t("education_page.title_line_1")}
            <br />
            {t("education_page.title_line_2")}
          </h1>

          <p className="ar-body mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">
            {t("education_page.description")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PrimaryCTA href="#capabilities">
              {t("education_page.primary_cta")}
            </PrimaryCTA>

            <SecondaryCTA href="/contact">
              {t("education_page.secondary_cta")}
            </SecondaryCTA>
          </div>

          <p className="mt-10 text-xs uppercase tracking-[0.2em] text-slate-500">
            {t("education_page.hero_tags")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. THE VISION
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>{t("education_page.vision_label")}</SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("education_page.vision_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("education_page.vision_p1")}
            </p>

            <p className="ar-body mt-4 text-lg leading-8 text-slate-400">
              {t("education_page.vision_p2")}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. LEARNER INTELLIGENCE
          (absorbs Assessment & Learning Analytics as a closing
          block within the same section rather than a separate
          one, with the human-review guardrail sentence)
      ═══════════════════════════════════════════════════════ */}

      <section id="capabilities" className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>{t("education_page.learner_label")}</SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("education_page.learner_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("education_page.learner_p1")}
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {learnerCapabilityKeys.map((key) => (
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
                  {t(`education_page.learner.${key}.title`)}
                </h3>

                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`education_page.learner.${key}.body`)}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-16 border-t border-white/6 pt-14">
            <h3 className="ar-heading text-xl font-semibold text-white">
              {t("education_page.assessment_title")}
            </h3>

            <p className="ar-body mt-3 max-w-2xl text-base leading-7 text-slate-400">
              {t("education_page.assessment_p1")}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {assessmentAnalyticsKeys.map((key) => (
                <div
                  key={key}
                  className="rounded-2xl border border-white/6 bg-[#0b1222] p-5"
                >
                  <p className="ar-heading text-sm font-semibold text-white">
                    {t(`education_page.assessment.${key}.title`)}
                  </p>
                  <p className="ar-body mt-2 text-xs leading-6 text-slate-400">
                    {t(`education_page.assessment.${key}.body`)}
                  </p>
                </div>
              ))}
            </div>

            <p className="ar-body mt-8 max-w-2xl text-sm leading-7 text-slate-500">
              {t("education_page.assessment_p2_guardrail")}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. LEARNING INTELLIGENCE LOOP

          IMAGE 1 — Closed-loop diagram: LEARNER → Learning
          Interaction → Evidence & Assessment → Learner Model →
          Knowledge State → Adaptive Engine → splits into
          Content / Practice / Guidance → converges back to
          LEARNER. Circular treatment, same technique as the
          Healthcare Mission Loop and Finance Intelligence Loop.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>{t("education_page.loop_label")}</SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("education_page.loop_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("education_page.loop_p1")}
            </p>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/education/learning-intelligence-loop.png"
              alt="OpenQCore continuous learning intelligence loop connecting learner evidence, the learner model and adaptive content"
              priority
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. TEACHING INTELLIGENCE
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>{t("education_page.teaching_label")}</SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("education_page.teaching_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("education_page.teaching_p1")}
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {teachingCapabilityKeys.map((key) => (
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
                  {t(`education_page.teaching.${key}.title`)}
                </h3>

                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`education_page.teaching.${key}.body`)}
                </p>
              </article>
            ))}
          </div>

          <p className="ar-body mx-auto mt-10 max-w-2xl text-center text-lg font-medium leading-8 text-slate-200">
            {t("education_page.teaching_p2_center")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. CURRICULUM & ACADEMIC KNOWLEDGE GRAPH

          IMAGE 2 — The most important conceptual visual on the
          page. A real interconnected graph (not a simple
          hierarchy): a worked example (e.g. Calculus → Limits /
          Derivatives → Prerequisites / Applications → Resources
          / Assessments → Learner Mastery), with cross-links
          between Concepts, Prerequisites, Learning Outcomes,
          Resources, Assessments and Learner Evidence.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#080e1a]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("education_page.knowledge_graph_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("education_page.knowledge_graph_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("education_page.knowledge_graph_p1")}
            </p>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/education/curriculum-knowledge-graph.png"
              alt="OpenQCore curriculum and academic knowledge graph connecting concepts, prerequisites, resources, assessments and learner evidence"
              light
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. INSTITUTIONAL INTELLIGENCE + STUDENT EXPERIENCE
          (merged: connected systems and capabilities, followed
          by the student journey as one continuous thread under
          the same section rather than a separate one)
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("education_page.institutional_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("education_page.institutional_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("education_page.institutional_p1")}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {institutionalSystemKeys.map((key) => (
              <span
                key={key}
                className="ar-body rounded-full border border-white/8 bg-white/3 px-4 py-2 text-xs text-slate-400"
              >
                {t(`education_page.institutional_system.${key}`)}
              </span>
            ))}
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {institutionalCapabilityKeys.map((key) => (
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
                  {t(`education_page.institutional.${key}.title`)}
                </h3>

                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`education_page.institutional.${key}.body`)}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-16 border-t border-white/6 pt-14">
            <h3 className="ar-heading text-xl font-semibold text-white">
              {t("education_page.student_journey_title")}
            </h3>

            <p className="ar-body mt-3 max-w-2xl text-base leading-7 text-slate-400">
              {t("education_page.student_journey_p1")}
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3 text-center sm:grid-cols-5 lg:grid-cols-9">
              {studentJourneyStages.map((key) => (
                <p
                  key={key}
                  className="ar-body text-xs uppercase tracking-[0.14em] text-slate-500"
                >
                  {t(`education_page.student_journey_stage.${key}`)}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          8. ACADEMIC RESEARCH
          (general-purpose research capabilities available today,
          bridging to the standalone Research/Atlas page rather
          than describing Atlas here)
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("education_page.research_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("education_page.research_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("education_page.research_p1")}
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
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
                  {t(`education_page.research.${key}.title`)}
                </h3>
              </article>
            ))}
          </div>

          <p className="ar-body mx-auto mt-14 max-w-3xl text-center text-lg leading-8 text-slate-300">
            {t("education_page.research_p2_atlas_bridge")}
          </p>

          <div className="mt-8 flex justify-center">
            <SecondaryCTA href="/research">
              {t("education_page.research_cta_explore")}
            </SecondaryCTA>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          9. EDUCATION AI ARCHITECTURE

          IMAGE 3 — The flagship diagram. Layered top to bottom:
          Students / Educators / Researchers / Administrators →
          Education Interfaces (Learning, Research, Copilots,
          APIs) → OpenQCore Intelligence Core (Learning Agents,
          Reasoning, Learner Modeling, Knowledge Graphs,
          Retrieval, Multimodal Intelligence, Research
          Intelligence, Document Intelligence, Analytics, Model
          Orchestration) → Knowledge & Data Layer (Curriculum,
          Learning Data, Assessments, Research, Publications,
          Institutional Data, Scientific Knowledge) →
          Institutional Systems (LMS, SIS, Library, Research
          Systems, CRM, ERP). Side rail: Identity · Privacy ·
          Governance · Academic Integrity · Provenance ·
          Evaluation · Human Oversight. Build as a real SVG
          diagram.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#080e1a]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("education_page.architecture_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("education_page.architecture_title")}
            </h2>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/education/education-ai-architecture.png"
              alt="OpenQCore education AI architecture across interfaces, intelligence core, knowledge data and institutional systems"
              light
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          10. RESPONSIBLE AI IN EDUCATION

          IMAGE 4 — Horizontal 5-step framework: ASSIST → GUIDE
          → TEACH → ASSESS → ACT, gradient from lighter support
          to explicitly authorized action, each step with its
          own icon.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("education_page.responsible_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("education_page.responsible_title")}
            </h2>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/education/responsible-ai-framework.png"
              alt="OpenQCore responsible AI framework in education: assist, guide, teach, assess, act"
            />
          </div>

          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-5">
            {responsibleAiLevels.map((key) => (
              <div key={key} className="text-center">
                <p className="ar-heading text-sm font-semibold uppercase tracking-[0.14em] text-[#d4af37]">
                  {t(`education_page.responsible.${key}.title`)}
                </p>
                <p className="ar-body mt-2 text-xs leading-6 text-slate-400">
                  {t(`education_page.responsible.${key}.body`)}
                </p>
              </div>
            ))}
          </div>

          <p className="ar-body mx-auto mt-10 max-w-3xl text-center text-base leading-7 text-slate-400">
            {t("education_page.responsible_p1_context")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          11. ACADEMIC INTEGRITY & GOVERNANCE
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("education_page.governance_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("education_page.governance_title")}
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
                  {t(`education_page.governance.${key}.title`)}
                </h3>

                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`education_page.governance.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          12. DEPLOYMENT
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("education_page.deployment_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("education_page.deployment_title")}
            </h2>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
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
                  {t(`education_page.deployment.${key}.title`)}
                </h3>

                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`education_page.deployment.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          13. FINAL CTA
      ═══════════════════════════════════════════════════════ */}

      <section className="bg-[#070d18]">
        <div className="mx-auto max-w-[900px] px-6 py-24 text-center md:py-32 lg:px-8">
          <h2 className="ar-heading mx-auto max-w-2xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("education_page.final_cta_title")}
          </h2>

          <p className="ar-body mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            {t("education_page.final_cta_p1")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PrimaryCTA href="/contact">
              {t("education_page.final_cta_primary")}
            </PrimaryCTA>

            <SecondaryCTA href="/research">
              {t("education_page.final_cta_secondary")}
            </SecondaryCTA>
          </div>
        </div>
      </section>
    </main>
  );
}