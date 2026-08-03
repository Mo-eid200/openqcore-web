import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ImageWithLightbox from "../../../components/common/ImageWithLightbox";

export const metadata: Metadata = {
  title: "OpenQCore for Government — Intelligence Infrastructure for Modern Government",
  description:
    "OpenQCore provides AI infrastructure, intelligent systems and automation technologies for public-sector organizations operating complex, security-sensitive and mission-critical environments.",
  openGraph: {
    title: "OpenQCore for Government",
    description:
      "Intelligence infrastructure engineered for modern government operations.",
    type: "website",
    url: "https://openqcore.com/solutions/government",
    images: [{ url: "/og-government.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenQCore for Government",
    description:
      "Intelligence infrastructure engineered for modern government operations."
  },
  alternates: {
    canonical: "https://openqcore.com/solutions/government"
  }
};

/* ════════════════════════════════════════════════════════════
   Shared primitives
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
   Hero background
════════════════════════════════════════════════════════════ */

function HeroNetworkGraphic() {
  const points: [number, number][] = [
    [140, 90],
    [340, 60],
    [560, 130],
    [760, 70],
    [980, 120],
    [1200, 80],
    [200, 260],
    [420, 300],
    [640, 250],
    [860, 310],
    [1080, 270],
    [1280, 330],
    [300, 420],
    [560, 400],
    [820, 430],
    [1060, 400]
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
            key={`line-${i}`}
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
          r="3"
          fill="#d4af37"
          fillOpacity="0.55"
        />
      ))}
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════
   Architecture image
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

export default async function GovernmentPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const challenges = [
    {
      title: t(
        "government_page.challenges.fragmented_infrastructure.title"
      ),
      body: t(
        "government_page.challenges.fragmented_infrastructure.body"
      )
    },
    {
      title: t(
        "government_page.challenges.operational_complexity.title"
      ),
      body: t(
        "government_page.challenges.operational_complexity.body"
      )
    },
    {
      title: t(
        "government_page.challenges.sensitive_information.title"
      ),
      body: t(
        "government_page.challenges.sensitive_information.body"
      )
    },
    {
      title: t("government_page.challenges.ai_governance.title"),
      body: t("government_page.challenges.ai_governance.body")
    }
  ];

  const capabilityKeys = [
    "digital_services",
    "knowledge_systems",
    "document_intelligence",
    "ai_agents",
    "voice_multilingual",
    "process_automation",
    "enterprise_search",
    "operational_intelligence"
  ];

  const governanceKeys = [
    "data_residency",
    "model_governance",
    "human_in_the_loop",
    "identity_aware",
    "auditability",
    "zero_trust"
  ];

  return (
    <main className="min-h-screen bg-[#050911] text-white">

      {/* ═══════════════════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════════════════ */}

      <section className="relative isolate overflow-hidden border-b border-white/4">
        <HeroNetworkGraphic />

        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#050911] via-[#050911]/70 to-[#050911]" />

        <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-32 text-center md:pb-32 md:pt-44 lg:px-8">
          <div className="mx-auto flex justify-center">
            <SectionLabel>
              {t("government_page.eyebrow")}
            </SectionLabel>
          </div>

          <h1 className="ar-heading mx-auto mt-8 max-w-4xl text-[clamp(2.4rem,5.5vw,4.4rem)] font-bold leading-[1.02] tracking-tighter text-white">
            {t("government_page.title_line_1")}
            <br />
            {t("government_page.title_line_2")}
          </h1>

          <p className="ar-body mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">
            {t("government_page.description")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PrimaryCTA href="#capabilities">
              {t("government_page.primary_cta")}
            </PrimaryCTA>

            <SecondaryCTA href="/contact">
              {t("government_page.secondary_cta")}
            </SecondaryCTA>
          </div>

          <p className="mt-10 text-xs uppercase tracking-[0.2em] text-slate-500">
            {t("government_page.hero_tags")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. THE CHALLENGE
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">

          <div className="max-w-3xl">
            <SectionLabel>
              {t("government_page.challenge_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("government_page.challenge_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("government_page.challenge_p1")}
            </p>

            <p className="ar-body mt-4 text-lg leading-8 text-slate-400">
              {t("government_page.challenge_p2")}
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {challenges.map((item, i) => (
              <article
                key={`challenge-${i}`}
                className="
                  rounded-3xl border border-white/6
                  bg-[#0b1222] p-7
                  transition-colors duration-300
                  hover:border-[#d4af37]/20
                "
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {item.title}
                </h3>

                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {item.body}
                </p>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. OUR APPROACH

          IMAGE 1 + IMAGE 2
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">

          <div className="max-w-3xl">
            <SectionLabel>
              {t("government_page.approach_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("government_page.approach_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("government_page.approach_p1")}
            </p>
          </div>

          {/* ── Architecture Part I ── */}

          <div className="mt-16">
            <ArchitectureImage
              src="/images/government/government-intelligence-architecture.png"
              alt="OpenQCore government intelligence architecture"
              priority
            />
          </div>

          {/* visual connection between the two architecture figures */}

          <div
            className="mx-auto flex h-20 w-10 items-center justify-center"
            aria-hidden="true"
          >
            <div className="relative h-full w-px bg-gradient-to-b from-[#d4af37]/15 via-[#d4af37]/55 to-[#d4af37]/15">
              <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-[#d4af37]/60" />
            </div>
          </div>

          {/* ── Architecture Part II ── */}

          <ArchitectureImage
            src="/images/government/government-systems-architecture.png"
            alt="OpenQCore government systems and sovereign infrastructure architecture"
          />

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. CAPABILITIES
      ═══════════════════════════════════════════════════════ */}

      <section
        id="capabilities"
        className="border-b border-white/4 bg-[#070d18]"
      >
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">

          <div className="max-w-3xl">
            <SectionLabel>
              {t("government_page.capabilities_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("government_page.capabilities_title")}
            </h2>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {capabilityKeys.map((key) => (
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
                  {t(
                    `government_page.capabilities.${key}.title`
                  )}
                </h3>

                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(
                    `government_page.capabilities.${key}.body`
                  )}
                </p>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. SYSTEM ARCHITECTURE

          IMAGE 3
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">

          <div className="max-w-3xl">
            <SectionLabel>
              {t("government_page.system_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("government_page.system_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("government_page.system_p1")}
            </p>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/government/openqcore-system-architecture.png"
              alt="OpenQCore system reference architecture"
              light
            />
          </div>

          <p className="ar-body mx-auto mt-10 max-w-3xl text-center text-lg leading-8 text-slate-300">
            {t("government_page.system_p2")}
          </p>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. GOVERNANCE & CONTROL
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#080e1a]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">

          <div className="max-w-3xl">
            <SectionLabel>
              {t("government_page.governance_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("government_page.governance_title")}
            </h2>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
                  {t(
                    `government_page.governance.${key}.title`
                  )}
                </h3>

                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(
                    `government_page.governance.${key}.body`
                  )}
                </p>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* Existing following sections continue here:
          Model Orchestration
          Deployment
          TAHEEL
          Scaling
          Methodology
          Research
          Final CTA
      */}

    </main>
  );
}