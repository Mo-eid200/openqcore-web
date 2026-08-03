import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PrimaryCTA, SecondaryCTA } from "../../../components/common/CTAButtons";

export const metadata: Metadata = {
  title: "OpenQCore Voice — Realtime Voice AI Infrastructure",
  description:
    "OpenQCore Voice is low-latency voice AI infrastructure for natural conversations, streaming speech pipelines, and production-grade realtime orchestration.",
  openGraph: {
    title: "OpenQCore Voice",
    description:
      "Build low-latency conversational experiences with production-ready realtime voice infrastructure.",
    type: "website",
    url: "https://openqcore.com/platform/voice",
    images: [{ url: "/og-voice.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenQCore Voice",
    description:
      "Realtime voice AI infrastructure for streaming, orchestration, and natural interaction."
  },
  alternates: { canonical: "https://openqcore.com/platform/voice" }
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
      <span className="h-px w-6 bg-[#d4af37]/40" />
      {children}
    </p>
  );
}

export default async function VoicePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const pillars = [
    { title: t("voice_page.pillars.streaming.title"), body: t("voice_page.pillars.streaming.body") },
    { title: t("voice_page.pillars.interruption.title"), body: t("voice_page.pillars.interruption.body") },
    { title: t("voice_page.pillars.orchestration.title"), body: t("voice_page.pillars.orchestration.body") },
    { title: t("voice_page.pillars.observability.title"), body: t("voice_page.pillars.observability.body") }
  ];

  const capabilities = [
    { title: t("voice_page.capabilities.stt_tts.title"), body: t("voice_page.capabilities.stt_tts.body") },
    { title: t("voice_page.capabilities.turn_management.title"), body: t("voice_page.capabilities.turn_management.body") },
    { title: t("voice_page.capabilities.agent_integration.title"), body: t("voice_page.capabilities.agent_integration.body") },
    { title: t("voice_page.capabilities.tool_routing.title"), body: t("voice_page.capabilities.tool_routing.body") },
    { title: t("voice_page.capabilities.memory_context.title"), body: t("voice_page.capabilities.memory_context.body") },
    { title: t("voice_page.capabilities.production_controls.title"), body: t("voice_page.capabilities.production_controls.body") }
  ];

  const useCases = [
    { title: t("voice_page.use_cases.contact_centers.title"), body: t("voice_page.use_cases.contact_centers.body") },
    { title: t("voice_page.use_cases.voice_assistants.title"), body: t("voice_page.use_cases.voice_assistants.body") },
    { title: t("voice_page.use_cases.healthcare_operations.title"), body: t("voice_page.use_cases.healthcare_operations.body") }
  ];

  const flow = [
    t("voice_page.flow.capture"),
    t("voice_page.flow.understand"),
    t("voice_page.flow.orchestrate"),
    t("voice_page.flow.respond"),
    t("voice_page.flow.optimize")
  ];

  return (
    <main className="min-h-screen bg-[#050911] text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.04]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-[-28%] left-1/2 h-[820px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(212,175,55,0.12),transparent_62%)]" />
          <div className="absolute top-[34%] right-0 h-[540px] w-[540px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.06),transparent_65%)]" />
        </div>

        <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-32 md:pb-32 md:pt-44 lg:px-8">
          <div className="max-w-4xl">
            <SectionLabel>{t("voice_page.eyebrow")}</SectionLabel>

            <h1 className="ar-heading mt-8 text-[clamp(2.6rem,6vw,4.8rem)] font-bold leading-[0.94] tracking-tighter text-white">
              {t("voice_page.title_line_1")}
              <br />
              {t("voice_page.title_line_2")}
            </h1>

            <p className="ar-body mt-8 max-w-3xl text-lg leading-8 text-slate-400 md:text-xl">
              {t("voice_page.description")}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <PrimaryCTA href="/workspace">{t("voice_page.primary_cta")}</PrimaryCTA>
              <SecondaryCTA href="/docs">{t("voice_page.secondary_cta")}</SecondaryCTA>
            </div>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {pillars.map((item, i) => (
              <article key={`pillar-${i}`} className="rounded-3xl border border-white/[0.06] bg-[#0b1222] p-6">
                <h3 className="ar-heading text-base font-semibold text-white">{item.title}</h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="border-b border-white/[0.04] bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>{t("voice_page.capabilities_label")}</SectionLabel>
            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("voice_page.capabilities_title")}
            </h2>
            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("voice_page.capabilities_description")}
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {capabilities.map((item, i) => (
              <article key={`capability-${i}`} className="rounded-3xl border border-white/[0.06] bg-[#0b1222] p-7">
                <h3 className="ar-heading text-lg font-semibold text-white">{item.title}</h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* VOICE FLOW */}
      <section className="border-b border-white/[0.04] bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>{t("voice_page.flow_label")}</SectionLabel>
            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("voice_page.flow_title")}
            </h2>
            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("voice_page.flow_description")}
            </p>
          </div>

          <div className="mt-14 rounded-[28px] border border-white/[0.06] bg-[#0b1222] p-6 md:p-8">
            <div className="grid gap-3 md:grid-cols-5">
              {flow.map((step, i) => (
                <div key={`flow-step-${i}`} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-5 text-center">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]/80">
                    {t("voice_page.step")} {i + 1}
                  </div>
                  <div className="ar-heading mt-2 text-base font-semibold text-white">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="border-b border-white/[0.04] bg-[#080e1a]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>{t("voice_page.use_cases_label")}</SectionLabel>
            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("voice_page.use_cases_title")}
            </h2>
            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("voice_page.use_cases_description")}
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {useCases.map((item, i) => (
              <article key={`use-case-${i}`} className="rounded-3xl border border-white/[0.06] bg-[#0b1222] p-7">
                <h3 className="ar-heading text-lg font-semibold text-white">{item.title}</h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.04] bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 text-center md:py-32 lg:px-8">
          <h2 className="ar-heading mx-auto max-w-3xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("voice_page.cta_title_line_1")}
            <br />
            {t("voice_page.cta_title_line_2")}
          </h2>

          <p className="ar-body mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            {t("voice_page.cta_description")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PrimaryCTA href="/workspace">{t("voice_page.cta_primary")}</PrimaryCTA>
            <SecondaryCTA href="/docs">{t("voice_page.cta_secondary")}</SecondaryCTA>
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
            name: "OpenQCore Voice",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Web",
            description:
              "Realtime voice AI infrastructure for low-latency streaming conversations, orchestration, and production operations.",
            url: "https://openqcore.com/platform/voice",
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