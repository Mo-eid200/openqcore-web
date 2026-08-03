import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "OpenQCore Models — Unified Multi-Model AI Runtime",
  description:
    "Access GPT, Claude, Gemini and other leading models through one unified runtime with intelligent routing, fallback, and cost optimization.",
  openGraph: {
    title: "OpenQCore Models",
    description:
      "One runtime. Every model. Intelligent routing across the world's leading AI systems.",
    type: "website",
    url: "https://openqcore.com/platform/models",
    images: [{ url: "/og-models.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenQCore Models",
    description:
      "Unified access to GPT, Claude, Gemini and more — with intelligent routing built in."
  },
  alternates: { canonical: "https://openqcore.com/platform/models" }
};

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

function PrimaryCTA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="
        group inline-flex items-center gap-2.5
        rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#e7c766]
        px-7 py-4 text-sm font-semibold text-[#0B1F3B]
        shadow-[0_8px_32px_rgba(212,175,55,0.22)]
        transition-all duration-300
        hover:scale-[1.02] hover:shadow-[0_12px_48px_rgba(212,175,55,0.32)]
        active:scale-[0.99]
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]
      "
    >
      {children}
      <ArrowIcon />
    </Link>
  );
}

function SecondaryCTA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="
        inline-flex items-center gap-2
        rounded-2xl border border-white/8 bg-white/3
        px-7 py-4 text-sm font-semibold text-slate-200
        transition-all duration-300
        hover:border-white/15 hover:bg-white/6 hover:text-white
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60
      "
    >
      {children}
    </Link>
  );
}

export default async function ModelsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const providers = [
    {
      title: t("models_page.providers.gpt.title"),
      body: t("models_page.providers.gpt.body")
    },
    {
      title: t("models_page.providers.claude.title"),
      body: t("models_page.providers.claude.body")
    },
    {
      title: t("models_page.providers.gemini.title"),
      body: t("models_page.providers.gemini.body")
    },
    {
      title: t("models_page.providers.proprietary.title"),
      body: t("models_page.providers.proprietary.body")
    }
  ];

  const routing = [
    t("models_page.routing.cost_aware"),
    t("models_page.routing.latency_aware"),
    t("models_page.routing.fallback"),
    t("models_page.routing.load_balancing"),
    t("models_page.routing.quality_scoring")
  ];

  const useCases = [
    {
      title: t("models_page.use_cases.chat.title"),
      body: t("models_page.use_cases.chat.body")
    },
    {
      title: t("models_page.use_cases.reasoning.title"),
      body: t("models_page.use_cases.reasoning.body")
    },
    {
      title: t("models_page.use_cases.multimodal.title"),
      body: t("models_page.use_cases.multimodal.body")
    }
  ];

  const governance = [
    {
      title: t("models_page.governance.model_pinning.title"),
      body: t("models_page.governance.model_pinning.body")
    },
    {
      title: t("models_page.governance.usage_controls.title"),
      body: t("models_page.governance.usage_controls.body")
    },
    {
      title: t("models_page.governance.cost_visibility.title"),
      body: t("models_page.governance.cost_visibility.body")
    }
  ];

  return (
    <main className="min-h-screen bg-[#050911] text-white">
      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden border-b border-white/4">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-[-28%] left-1/2 h-[780px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(212,175,55,0.10),transparent_60%)]" />
          <div className="absolute top-[34%] right-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.05),transparent_65%)]" />
        </div>

        <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-32 md:pb-32 md:pt-44 lg:px-8">
          <div className="max-w-4xl">
            <SectionLabel>{t("models_page.eyebrow")}</SectionLabel>

            <h1 className="ar-heading mt-8 text-[clamp(2.6rem,6vw,4.8rem)] font-bold leading-[0.94] tracking-tighter text-white">
              {t("models_page.title_line_1")}
              <br />
              {t("models_page.title_line_2")}
            </h1>

            <p className="ar-body mt-8 max-w-3xl text-lg leading-8 text-slate-400 md:text-xl">
              {t("models_page.description")}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <PrimaryCTA href="/workspace">{t("models_page.primary_cta")}</PrimaryCTA>
              <SecondaryCTA href="/docs">{t("models_page.secondary_cta")}</SecondaryCTA>
            </div>
          </div>
        </div>
      </section>

      {/* ── Providers ── */}
      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>{t("models_page.providers_label")}</SectionLabel>
            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("models_page.providers_title")}
            </h2>
            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("models_page.providers_description")}
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {providers.map((item, i) => (
              <article
                key={`provider-${i}`}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-lg font-semibold text-white">{item.title}</h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Routing ── */}
      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>{t("models_page.routing_label")}</SectionLabel>
            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("models_page.routing_title")}
            </h2>
            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("models_page.routing_description")}
            </p>
          </div>

          <div className="mt-14 rounded-[28px] border border-white/6 bg-[#0b1222] p-6 md:p-8">
            <div className="grid gap-3 md:grid-cols-5">
              {routing.map((item, i) => (
                <div
                  key={`routing-${i}`}
                  className="rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-5 text-center"
                >
                  <div className="ar-heading text-sm font-semibold text-white">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="border-b border-white/4 bg-[#080e1a]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>{t("models_page.use_cases_label")}</SectionLabel>
            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("models_page.use_cases_title")}
            </h2>
            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("models_page.use_cases_description")}
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {useCases.map((item, i) => (
              <article
                key={`usecase-${i}`}
                className="rounded-3xl border border-white/6 bg-[#0b1222] p-7"
              >
                <h3 className="ar-heading text-lg font-semibold text-white">{item.title}</h3>
                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Governance ── */}
      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="rounded-[30px] border border-white/6 bg-[#0b1222] p-7 md:p-10">
            <SectionLabel>{t("models_page.governance_label")}</SectionLabel>
            <h2 className="ar-heading mt-5 max-w-3xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("models_page.governance_title")}
            </h2>
            <p className="ar-body mt-5 max-w-3xl text-lg leading-8 text-slate-400">
              {t("models_page.governance_description")}
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {governance.map((item, i) => (
                <article
                  key={`governance-${i}`}
                  className="rounded-2xl border border-white/6 bg-white/[0.02] p-5"
                >
                  <h3 className="ar-heading text-base font-semibold text-white">{item.title}</h3>
                  <p className="ar-body mt-2 text-sm leading-7 text-slate-400">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="border-t border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 text-center md:py-32 lg:px-8">
          <h2 className="ar-heading mx-auto max-w-3xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("models_page.cta_title_line_1")}
            <br />
            {t("models_page.cta_title_line_2")}
          </h2>

          <p className="ar-body mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            {t("models_page.cta_description")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PrimaryCTA href="/workspace">{t("models_page.cta_primary")}</PrimaryCTA>
            <SecondaryCTA href="/docs">{t("models_page.cta_secondary")}</SecondaryCTA>
          </div>
        </div>
      </section>
    </main>
  );
}