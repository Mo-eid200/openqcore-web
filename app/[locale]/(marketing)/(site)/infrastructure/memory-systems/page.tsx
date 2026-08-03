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
  const t = await getTranslations({ locale, namespace: "memory_systems_page" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: [
      "Memory Systems",
      "OpenQCore",
      "AI memory engine",
      "Hot memory",
      "Cold memory",
      "Vector retrieval",
      "Context building",
      "Behavior engine",
      "Relationship context",
      "Memory orchestration"
    ],
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      type: "website",
      url: "https://openqcore.com/platform/memory-systems",
      images: [{ url: "/og-memory-systems.png", width: 1200, height: 630 }]
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description")
    },
    alternates: {
      canonical: "https://openqcore.com/platform/memory-systems"
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

export default async function MemorySystemsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "memory_systems_page" });

  const metrics = [
    { label: t("metrics.layers.label"), value: t("metrics.layers.value") },
    { label: t("metrics.retrieval.label"), value: t("metrics.retrieval.value") },
    { label: t("metrics.resilience.label"), value: t("metrics.resilience.value") },
    { label: t("metrics.context.label"), value: t("metrics.context.value") }
  ];

  const layers = [
    { title: t("layers.hot.title"), body: t("layers.hot.body"), accent: "border-[#f59e0b]/20" },
    { title: t("layers.cold.title"), body: t("layers.cold.body"), accent: "border-[#38bdf8]/20" },
    { title: t("layers.vector.title"), body: t("layers.vector.body"), accent: "border-[#a78bfa]/20" },
    { title: t("layers.behavior.title"), body: t("layers.behavior.body"), accent: "border-[#34d399]/20" }
  ];

  const pipeline = t.raw("pipeline.steps") as string[];

  const modules = [
    { name: "smart_extract + cached fallback", desc: t("modules.extract") },
    { name: "MemoryRanker + threshold persistence", desc: t("modules.ranker") },
    { name: "retrieve_similar + relevance selector", desc: t("modules.retrieve") },
    { name: "TimelineEngine + MemoryRecaller", desc: t("modules.timeline") },
    { name: "BehaviorEngine + style hinting", desc: t("modules.behavior") },
    { name: "RelationshipEngine context layer", desc: t("modules.relationship") },
    { name: "Optional AI compression", desc: t("modules.compression") },
    { name: "Prompt block assembler", desc: t("modules.prompt") }
  ];

  return (
    <main className="min-h-screen bg-[#050911] text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.05]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-28%] h-[900px] w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(212,175,55,0.11),transparent_62%)]" />
          <div className="absolute right-[8%] top-[18%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.08),transparent_70%)]" />
        </div>

        <div className="mx-auto max-w-[1400px] px-6 pb-20 pt-32 md:pt-44 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <SectionLabel>{t("eyebrow")}</SectionLabel>

            <div className="inline-flex w-fit rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f5d97b] sm:ms-auto">
              {t("badge")}
            </div>
          </div>

          <h1 className="mt-8 max-w-5xl text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.94] tracking-[-0.03em]">
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
              <div key={i} className="border-b border-white/[0.06] px-4 py-6 md:border-b-0 md:border-e md:last:border-e-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{m.label}</p>
                <p className="mt-2 text-xl font-bold text-white">{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOGO AREA */}
      <section className="border-b border-white/[0.05] bg-[#060b16]">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionLabel>{t("identity.label")}</SectionLabel>
            <h2 className="mt-5 text-4xl font-bold tracking-[-0.03em] md:text-5xl">{t("identity.title")}</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">{t("identity.description")}</p>
          </div>

          <div className="rounded-3xl border border-white/[0.10] bg-[#0b1222] p-8">
            <Image
              src="/engines/memory-logo.png"
              alt={t("identity.logo_alt")}
              width={220}
              height={220}
              className="mx-auto"
            />
            <p className="mt-6 text-center text-sm text-slate-400">{t("identity.logo_hint")}</p>
          </div>
        </div>
      </section>

      {/* LAYERS */}
      <section className="border-b border-white/[0.05] bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-8">
          <SectionLabel>{t("layers_label")}</SectionLabel>
          <h2 className="mt-5 text-4xl font-bold tracking-[-0.03em] md:text-5xl">{t("layers_title")}</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">{t("layers_description")}</p>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {layers.map((item, i) => (
              <article key={i} className={`rounded-3xl border ${item.accent} bg-[#0b1222] p-7`}>
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PIPELINE */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-8">
          <SectionLabel>{t("pipeline.label")}</SectionLabel>
          <h2 className="mt-5 text-4xl font-bold tracking-[-0.03em] md:text-5xl">{t("pipeline.title")}</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">{t("pipeline.description")}</p>

          <div className="mt-12 grid gap-4 md:grid-cols-3 lg:grid-cols-7">
            {pipeline.map((step, i) => (
              <div key={i} className="rounded-2xl border border-white/[0.10] bg-[#0b1222] p-5">
                <div className="text-2xl font-semibold text-[#d4af37]">{String(i + 1).padStart(2, "0")}</div>
                <p className="mt-3 text-sm leading-7 text-slate-300">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="border-b border-white/[0.05] bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-8">
          <SectionLabel>{t("modules_label")}</SectionLabel>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((m, i) => (
              <article key={i} className="rounded-2xl border border-white/[0.10] bg-[#0b1222] p-5">
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