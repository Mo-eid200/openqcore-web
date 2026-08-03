import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PrimaryCTA, SecondaryCTA } from "../../../components/common/CTAButtons";

export const metadata: Metadata = {
  title: "OpenQCore Infrastructure — Pulse & Iris Engines for Advanced AI Systems",
  description:
    "OpenQCore Infrastructure powers orchestration, memory, multimodal runtime, and first-generation AI engines: Pulse for chat intelligence and Iris for image intelligence.",
  keywords: [
    "OpenQCore Infrastructure",
    "Pulse Engine",
    "Iris Engine",
    "AI Stack",
    "Conversational AI engine",
    "Image AI engine",
    "Multimodal runtime",
    "AI orchestration",
    "Production AI infrastructure"
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "OpenQCore Infrastructure — Pulse & Iris Engines",
    description:
      "First-generation core engines for advanced AI systems, built on a production runtime architecture.",
    type: "website",
    url: "https://openqcore.com/platform/infrastructure",
    siteName: "OpenQCore",
    images: [{ url: "/og-infrastructure.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenQCore Infrastructure",
    description: "Pulse for chat, Iris for images, and a full production-grade AI stack."
  },
  alternates: { canonical: "https://openqcore.com/platform/infrastructure" }
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
      <span className="h-px w-6 bg-[#d4af37]/40" />
      {children}
    </p>
  );
}

export default async function InfrastructurePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const aiStack = [
    {
      title: t("infrastructure_page.stack.pulse.title"),
      body: t("infrastructure_page.stack.pulse.body")
    },
    {
      title: t("infrastructure_page.stack.memory.title"),
      body: t("infrastructure_page.stack.memory.body")
    },
    {
      title: t("infrastructure_page.stack.runtime.title"),
      body: t("infrastructure_page.stack.runtime.body")
    },
    {
      title: t("infrastructure_page.stack.multimodal.title"),
      body: t("infrastructure_page.stack.multimodal.body")
    }
  ];

  const firstGenEngines = [
    {
      name: t("infrastructure_page.engines.pulse.title"),
      role: t("infrastructure_page.engines.pulse.role"),
      desc: t("infrastructure_page.engines.pulse.description"),
      accent: "border-[#d4af37]/25",
      logo: "/engines/pulse-logo1.png"
    },
    {
      name: t("infrastructure_page.engines.iris.title"),
      role: t("infrastructure_page.engines.iris.role"),
      desc: t("infrastructure_page.engines.iris.description"),
      accent: "border-[#8b5cf6]/25",
      logo: "/engines/iris-logo.png"
    }
  ];

  const logos = [
    { name: t("infrastructure_page.identity.pulse"), src: "/engines/pulse-logo1.png" },
    { name: t("infrastructure_page.identity.iris"), src: "/engines/iris-logo.png" },
    { name: t("infrastructure_page.identity.memory"), src: "/engines/memory-logo.png" },
    { name: t("infrastructure_page.identity.runtime"), src: "/engines/runtime-logo.png" }
  ];

  return (
    <main className="min-h-screen bg-[#050911] text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.04]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* 🎨 SIMPLIFIED: previously 3 competing ambient colors
              (gold + blue + purple) in one hero, which read as busy
              rather than institutional. Now gold-primary with a
              single, much subtler blue accent underneath it. */}
          <div className="absolute top-[-28%] left-1/2 h-[860px] w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(212,175,55,0.10),transparent_62%)]" />
          <div className="absolute top-[18%] right-[10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.05),transparent_70%)]" />
        </div>

        <div className="mx-auto max-w-[1400px] px-6 pb-20 pt-32 md:pb-24 md:pt-44 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <SectionLabel>{t("infrastructure_page.eyebrow")}</SectionLabel>

              <div className="inline-flex w-fit rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f5d97b] sm:ml-auto">
                {t("infrastructure_page.badge")}
              </div>
            </div>

            <h1 className="ar-heading mt-8 text-[clamp(2.7rem,6vw,5rem)] font-bold leading-[0.94] tracking-tighter text-white">
              {t("infrastructure_page.title_line_1")}
              <br />
              {t("infrastructure_page.title_line_2")}
            </h1>

            <p className="ar-body mt-8 max-w-3xl text-lg leading-8 text-slate-400 md:text-xl">
              {t("infrastructure_page.description")}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <PrimaryCTA href="/docs">{t("infrastructure_page.primary_cta")}</PrimaryCTA>
              <SecondaryCTA href="/status">{t("infrastructure_page.secondary_cta")}</SecondaryCTA>
            </div>
          </div>
        </div>
      </section>

      {/* FIRST-GEN ENGINES */}
      <section className="border-b border-white/[0.04] bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-8">
          <SectionLabel>{t("infrastructure_page.engines_label")}</SectionLabel>
          <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] md:text-5xl">
            {t("infrastructure_page.engines_title")}
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            {t("infrastructure_page.engines_description")}
          </p>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {firstGenEngines.map((engine, i) => (
              <article key={i} className={`rounded-[28px] border ${engine.accent} bg-[#0b1222] p-8`}>
                <Image
                  src={engine.logo}
                  alt={`${engine.name} Logo`}
                  width={140}
                  height={140}
                  className="mb-5"
                  priority={i === 0}
                />
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">{engine.role}</p>
                <h3 className="mt-4 text-2xl font-bold text-white">{engine.name}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{engine.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AI STACK */}
      <section className="border-b border-white/[0.04] bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-28 lg:px-8">
          <SectionLabel>{t("infrastructure_page.stack_label")}</SectionLabel>
          <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("infrastructure_page.stack_title")}
          </h2>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {aiStack.map((item, i) => (
              <article
                key={`stack-${i}`}
                className="group rounded-[28px] border border-white/[0.06] bg-[#0b1222] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37]/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
              >
                <h3 className="ar-heading text-2xl font-bold text-white group-hover:text-[#f5d97b]">{item.title}</h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LOGO SLOTS */}
      <section className="border-b border-white/[0.04] bg-[#080e1a]">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-8">
          <SectionLabel>{t("infrastructure_page.identity_label")}</SectionLabel>
          <p className="mt-4 text-slate-400">{t("infrastructure_page.identity_description")}</p>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {logos.map((logo) => (
              <article key={logo.name} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <Image
                  src={logo.src}
                  alt={`${logo.name} Logo`}
                  width={120}
                  height={120}
                  className="mx-auto"
                />
                <p className="mt-3 text-center text-xs font-medium text-slate-400">{logo.name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.04] bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 text-center md:py-28 lg:px-8">
          <h2 className="ar-heading mx-auto max-w-3xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("infrastructure_page.cta_title")}
          </h2>

          <p className="ar-body mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            {t("infrastructure_page.cta_description")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PrimaryCTA href="/docs">{t("infrastructure_page.cta_primary")}</PrimaryCTA>
            <SecondaryCTA href="/platform">{t("infrastructure_page.cta_secondary")}</SecondaryCTA>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "OpenQCore Infrastructure",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Web",
            description:
              "Advanced AI infrastructure with Pulse (chat) and Iris (image) engines, orchestration, memory, and multimodal runtime.",
            url: "https://openqcore.com/platform/infrastructure",
            provider: {
              "@type": "Organization",
              name: "OpenQCore",
              url: "https://openqcore.com"
            }
          })
        }}
      />
    </main>
  );
}