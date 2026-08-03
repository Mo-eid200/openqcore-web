import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PrimaryCTA, SecondaryCTA } from "../../../components/common/CTAButtons";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pulse_engine_page" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: [
      "Pulse Engine",
      "OpenQCore",
      "AI orchestration",
      "AI Orchestration Platform",
      "Agent Runtime",
      "Realtime AI Infrastructure",
      "Cognitive Engine",
      "Agent Operating System",
      "Tool Routing Engine",
      "cognitive routing",
      "adaptive engine",
      "multimodal AI runtime",
      "tool routing",
      "intent classification",
      "AI memory systems",
      "production AI infrastructure"
    ],
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      type: "website",
      url: "https://openqcore.com/infrastructure/pulse-engine",
      images: [{ url: "/og-pulse-engine.png", width: 1200, height: 630 }]
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description")
    },
    alternates: {
      canonical: "https://openqcore.com/infrastructure/pulse-engine"
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
      <span className="h-px w-6 bg-[#d4af37]/40" />
      {children}
    </p>
  );
}

export default async function PulseEnginePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pulse_engine_page" });

  const metrics = [
    { label: t("metrics.execution_pattern.label"), value: t("metrics.execution_pattern.value") },
    { label: t("metrics.multimodal_support.label"), value: t("metrics.multimodal_support.value") },
    { label: t("metrics.reliability_model.label"), value: t("metrics.reliability_model.value") },
    { label: t("metrics.memory_strategy.label"), value: t("metrics.memory_strategy.value") }
  ];

  const architecture = t.raw("architecture.steps") as string[];

  const modules = [
    { name: t("modules.items.intent_classifier.name"), desc: t("modules.items.intent_classifier.desc") },
    { name: t("modules.items.decision_router.name"), desc: t("modules.items.decision_router.desc") },
    { name: t("modules.items.adaptive_engine.name"), desc: t("modules.items.adaptive_engine.desc") },
    { name: t("modules.items.redis_memory.name"), desc: t("modules.items.redis_memory.desc") },
    { name: t("modules.items.personality.name"), desc: t("modules.items.personality.desc") },
    { name: t("modules.items.circuit_breaker.name"), desc: t("modules.items.circuit_breaker.desc") },
    { name: t("modules.items.background_tasks.name"), desc: t("modules.items.background_tasks.desc") },
    { name: t("modules.items.billing.name"), desc: t("modules.items.billing.desc") }
  ];

  const pillars = [
    { title: t("pillars.items.routing.title"), body: t("pillars.items.routing.body") },
    { title: t("pillars.items.adaptive.title"), body: t("pillars.items.adaptive.body") },
    { title: t("pillars.items.memory.title"), body: t("pillars.items.memory.body") },
    { title: t("pillars.items.reliability.title"), body: t("pillars.items.reliability.body") }
  ];

  return (
    <main className="min-h-screen bg-[#050911] text-white">
      <section className="relative isolate overflow-hidden border-b border-white/[0.05]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-28%] h-[900px] w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(212,175,55,0.11),transparent_62%)]" />
        </div>

        <div className="mx-auto max-w-[1400px] px-6 pb-20 pt-32 md:pt-44 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <SectionLabel>{t("eyebrow")}</SectionLabel>

            <div className="inline-flex w-fit rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f5d97b] sm:ml-auto">
              {t("gen_badge")}
            </div>
          </div>

          <h1 className="mt-8 max-w-5xl text-[clamp(2.6rem,6vw,5.2rem)] font-bold leading-[0.92] tracking-[-0.03em]">
            {t("hero_title_1")}
            <br />
            {t("hero_title_2")}
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300">{t("hero_description")}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <PrimaryCTA href="/docs">{t("hero_primary_cta")}</PrimaryCTA>
            <SecondaryCTA href="/platform/infrastructure">{t("hero_secondary_cta")}</SecondaryCTA>
          </div>
        </div>

        <div className="border-t border-white/[0.06] bg-[#0a1120]/70 backdrop-blur-sm">
          <div className="mx-auto grid max-w-[1400px] gap-0 px-6 md:grid-cols-4 lg:px-8">
            {metrics.map((m, i) => (
              <div key={i} className="border-b border-white/[0.06] px-4 py-6 md:border-b-0 md:border-r md:last:border-r-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{m.label}</p>
                <p className="mt-2 text-xl font-bold text-white">{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scientific Pillars */}
      <section className="border-b border-white/[0.05] bg-[#060b16]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-8">
          <SectionLabel>{t("pillars.label")}</SectionLabel>
          <h2 className="mt-5 text-4xl font-bold tracking-[-0.03em] md:text-5xl">{t("pillars.title")}</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {pillars.map((item, i) => (
              <article key={i} className="rounded-3xl border border-white/[0.10] bg-[#0b1222] p-7">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="border-b border-white/[0.05] bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-8">
          <SectionLabel>{t("architecture.label")}</SectionLabel>
          <h2 className="mt-5 text-4xl font-bold tracking-[-0.03em] md:text-5xl">{t("architecture.title")}</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">{t("architecture.description")}</p>

          <div className="mt-12 grid gap-4 md:grid-cols-4 lg:grid-cols-7">
            {architecture.map((step, i) => (
              <div key={i} className="rounded-2xl border border-white/[0.10] bg-[#0b1222] p-5">
                <div className="text-2xl font-semibold tracking-[-0.02em] text-[#d4af37]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interop */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-8">
          <SectionLabel>{t("interop.label")}</SectionLabel>
          <h2 className="mt-5 text-4xl font-bold tracking-[-0.03em] md:text-5xl">{t("interop.title")}</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">{t("interop.description")}</p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="rounded-3xl border border-[#d4af37]/25 bg-[#0b1222] p-8">
              <Image className="mb-5" src="/engines/pulse-logo.png" alt={t("interop.pulse.logo_slot")} width={180} height={180} />
              <h3 className="text-2xl font-bold">{t("interop.pulse.title")}</h3>
              <p className="mt-3 text-slate-400">{t("interop.pulse.body")}</p>
            </article>

            <article className="rounded-3xl border border-[#8b5cf6]/25 bg-[#0b1222] p-8">
              <Image className="mb-5" src="/engines/iris-logo.png" alt={t("interop.iris.logo_slot")} width={160} height={160} />
              <h3 className="text-2xl font-bold">{t("interop.iris.title")}</h3>
              <p className="mt-3 text-slate-400">{t("interop.iris.body")}</p>
            </article>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="border-b border-white/[0.05] bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-8">
          <SectionLabel>{t("modules.label")}</SectionLabel>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((m, i) => (
              <article key={i} className="rounded-2xl border border-white/[0.08] bg-[#0b1222] p-5">
                <h4 className="text-sm font-semibold text-white">{m.name}</h4>
                <p className="mt-2 text-xs leading-6 text-slate-400">{m.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#060b16]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 text-center lg:px-8">
          <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-[-0.03em] md:text-5xl">{t("cta.title")}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">{t("cta.description")}</p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PrimaryCTA href="/docs">{t("cta.primary")}</PrimaryCTA>
            <SecondaryCTA href="/platform">{t("cta.secondary")}</SecondaryCTA>
          </div>
        </div>
      </section>
    </main>
  );
}