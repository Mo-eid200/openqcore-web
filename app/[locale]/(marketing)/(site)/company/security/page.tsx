import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ImageWithLightbox from "../../../components/common/ImageWithLightbox";

/* ─── Types ───────────────────────────────────────────────────────────────── */

type PageProps = { params: Promise<{ locale: string }> };

/* ─── SEO ─────────────────────────────────────────────────────────────────── */

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "company_security_page.seo" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(",").map((k) => k.trim()),
    openGraph: {
      title: t("og_title"),
      description: t("og_description"),
      type: "website",
      url: "https://openqcore.com/company/security",
      siteName: "OpenQCore",
    },
    alternates: {
      canonical: "https://openqcore.com/company/security",
      languages: {
        en: "https://openqcore.com/en/company/security",
        ar: "https://openqcore.com/ar/company/security",
      },
    },
  };
}

/* ─── Layout tokens ───────────────────────────────────────────────────────── */

const wrap = "mx-auto w-full max-w-[1440px] px-6 lg:px-8";

/* ─── Card variants ───────────────────────────────────────────────────────── */

const card =
  "group relative overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#0b1222] " +
  "transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37]/20 " +
  "hover:shadow-[0_8px_32px_rgba(212,175,55,.06)] " +
  "before:pointer-events-none before:absolute before:inset-0 before:rounded-[24px] " +
  "before:bg-gradient-to-br before:from-[#d4af37]/[0.03] before:to-transparent";

const cardGreen =
  "group relative overflow-hidden rounded-[24px] border border-emerald-500/[0.14] " +
  "bg-gradient-to-b from-emerald-500/[0.04] to-[#0b1222] " +
  "transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/22 " +
  "hover:shadow-[0_8px_32px_rgba(16,185,129,.06)]";

const cardBlue =
  "group relative overflow-hidden rounded-[20px] border border-blue-500/[0.12] " +
  "bg-gradient-to-b from-blue-500/[0.04] to-[#0a1020] " +
  "transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/22 " +
  "hover:shadow-[0_6px_24px_rgba(59,130,246,.07)]";

/* ─── Typography ──────────────────────────────────────────────────────────── */

const secH2    = "mt-3 text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold tracking-[-0.025em] text-[#f1f5f9]";
const cardBody = "text-sm leading-7 text-slate-400";

/* ─── Shared components ───────────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d4af37]">
      <span className="block h-px w-5 bg-[#d4af37]/60" />
      {children}
    </p>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 rtl:rotate-180 ${className}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

/* ─── Icon paths ──────────────────────────────────────────────────────────── */

const commitmentIcons: Record<string, string> = {
  security:     "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
  privacy:      "M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z",
  reliability:  "M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z",
  transparency: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  improvement:  "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99",
};

const capabilityIcons: Record<string, string> = {
  identity_access:   "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z",
  infrastructure:    "M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z",
  app_security:      "M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5",
  data_protection:   "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125",
};

const frameworkItems = ["iso_27001", "nist", "owasp", "zero_trust", "secure_dev", "cloud_security"] as const;
const lifecycleSteps = ["research", "architecture", "engineering", "validation", "deployment", "operations", "improvement"] as const;
const commitments    = ["security", "privacy", "reliability", "transparency", "improvement"] as const;
const capabilities   = ["identity_access", "infrastructure", "app_security", "data_protection"] as const;

const identityItems     = ["auth_controls", "rbac", "admin_governance", "permission_mgmt", "access_audit"] as const;
const infraItems        = ["cloud_arch", "hardening", "segmentation", "backup_recovery", "monitoring", "resilience"] as const;
const appSecItems       = ["secure_dev", "api_security", "dependency_mgmt", "change_mgmt", "validation", "ops_review"] as const;
const dataItems         = ["data_access", "info_governance", "lifecycle_mgmt", "secure_handling", "knowledge_protection"] as const;
const monitoringItems   = ["infra_monitoring", "event_visibility", "perf_monitoring", "analytics", "alerting", "availability", "continuity"] as const;
const aiItems           = ["human_oversight", "reliability", "security", "transparency", "accountability", "risk_awareness", "responsible_deploy", "trustworthy_intel"] as const;
const roadmapItems      = ["governance", "resilience", "risk_mgmt", "compliance", "enterprise_controls", "ai_governance", "infra_maturity", "continuous_improvement", "awareness", "long_term_trust"] as const;

const capabilityChecks: Record<string, readonly string[]> = {
  identity_access: identityItems as unknown as string[],
  infrastructure:  infraItems as unknown as string[],
  app_security:    appSecItems as unknown as string[],
  data_protection: dataItems as unknown as string[],
};

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default async function SecurityPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "company_security_page" });

  return (
    <main className="min-h-screen bg-[#050911] text-white">

      {/* ━━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.04]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[4%] top-[-20%] h-[700px] w-[800px] rounded-full bg-[radial-gradient(ellipse,rgba(16,185,129,0.07),transparent_55%)]" />
          <div className="absolute right-[0%] top-[10%] h-[500px] w-[600px] rounded-full bg-[radial-gradient(ellipse,rgba(212,175,55,0.07),transparent_55%)]" />
          <div className="absolute bottom-0 left-1/2 h-[250px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(59,130,246,0.04),transparent_70%)]" />
        </div>

        <div className={`${wrap} relative pb-20 pt-32 md:pb-28 md:pt-44`}>
          <div className="grid items-center gap-14 lg:grid-cols-12">

            {/* copy */}
            <div className="lg:col-span-7">
              <SectionLabel>{t("hero.kicker")}</SectionLabel>

              <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-white">
                {t("hero.title")}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300 md:text-xl">
                {t("hero.desc")}
              </p>
              <p className="mt-4 max-w-xl text-base leading-8 text-slate-400">
                {t("hero.desc2")}
              </p>
              <p className="mt-4 max-w-xl text-base leading-8 text-slate-400">
                {t("hero.desc3")}
              </p>

              {/* alignment badges — these frameworks are followed as
                  internal practice; formal certification is actively
                  being pursued, not yet granted, so the badge text
                  itself (via i18n) must say "aligned with" / "pursuing"
                  and this note reinforces that distinction explicitly */}
              <div className="mt-8 flex flex-wrap gap-2">
                {(["iso_27001", "nist", "owasp", "zero_trust"] as const).map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-400"
                  >
                    <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" /></svg>
                    {t(`hero.badges.${badge}`)}
                  </span>
                ))}
              </div>
              <p className="mt-3 max-w-xl text-xs leading-6 text-slate-500">
                {t("hero.badges_note")}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="mailto:security@openqcore.com"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#d4af37] px-6 py-3.5 text-sm font-semibold !text-[#0B1F3B] shadow-[0_8px_28px_rgba(212,175,55,0.22)] transition-all duration-300 hover:scale-[1.02]"
                >
                  <span className="!text-[#0B1F3B]">{t("hero.cta_primary")}</span>
                  <ArrowIcon className="!text-[#0B1F3B]" />
                </a>
                <Link
                  href="/company/about"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-slate-200 transition-all hover:border-white/[0.15] hover:bg-white/[0.06]"
                >
                  {t("hero.cta_secondary")}
                </Link>
              </div>
            </div>

            {/* shield visual */}
            <div className="lg:col-span-5">
              <div className="relative ms-auto w-full max-w-[420px]">
                <div className="pointer-events-none absolute -inset-4 rounded-[28px] bg-emerald-500/[0.06] blur-2xl" />
                <div className="relative rounded-[24px] border border-white/[0.07] bg-[#0b1222] p-3 shadow-[0_0_0_1px_rgba(16,185,129,.05)_inset]">
                  <ImageWithLightbox
                    src="/engines/security-hero.png"
                    alt="OpenQCore Security"
                    width={960}
                    height={960}
                    className="group block w-full overflow-hidden rounded-[18px] bg-[#0a1221]"
                    imageClassName="w-full rounded-[18px] object-contain p-6 transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ━━━ OUR COMMITMENT — 5 CARDS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-b border-white/[0.04] bg-[#070d18]">
        <div className={`${wrap} py-20 md:py-28`}>
          <SectionLabel>{t("commitment.kicker")}</SectionLabel>
          <h2 className={secH2}>{t("commitment.title")}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">{t("commitment.desc")}</p>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {commitments.map((k) => (
              <article key={k} className={`${card} p-6`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d4af37]/15 bg-[#d4af37]/[0.06] text-[#d4af37] transition-colors group-hover:bg-[#d4af37]/10">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={commitmentIcons[k]} />
                  </svg>
                </div>
                <h3 className="mt-4 text-sm font-semibold text-[#f3d98a]">{t(`commitment.items.${k}.title`)}</h3>
                <p className={`mt-2 text-xs leading-6 text-slate-400`}>{t(`commitment.items.${k}.desc`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ TRUST BY DESIGN — LIFECYCLE + BANNER ━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-b border-white/[0.04] bg-[#050911]">
        <div className={`${wrap} py-20 md:py-28`}>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">

            {/* lifecycle */}
            <div>
              <SectionLabel>{t("lifecycle.kicker")}</SectionLabel>
              <h2 className={secH2}>{t("lifecycle.title")}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">{t("lifecycle.desc")}</p>

              <div className="mt-10 flex flex-col gap-0">
                {lifecycleSteps.map((k, i) => (
                  <div key={k} className="flex items-start gap-4">
                    {/* connector */}
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/25 bg-[#d4af37]/[0.08] text-[10px] font-bold text-[#d4af37]">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      {i < lifecycleSteps.length - 1 && (
                        <div className="mt-1 h-8 w-px bg-gradient-to-b from-[#d4af37]/20 to-transparent" />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className="text-sm font-semibold text-[#f1f5f9]">{t(`lifecycle.steps.${k}.title`)}</p>
                      <p className="mt-0.5 text-xs leading-6 text-slate-500">{t(`lifecycle.steps.${k}.desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* banner image */}
            <div className="lg:sticky lg:top-28">
              <div className="relative w-full">
                <div className="pointer-events-none absolute -inset-3 rounded-[26px] bg-emerald-500/[0.05] blur-xl" />
                <div className="relative rounded-[22px] border border-white/[0.07] bg-[#0b1222] p-2.5 shadow-[0_0_0_1px_rgba(16,185,129,.04)_inset]">
                  <ImageWithLightbox
                    src="/engines/security-banner.png"
                    alt="OpenQCore Security Banner"
                    width={2000}
                    height={900}
                    className="group block w-full overflow-hidden rounded-[16px]"
                    imageClassName="aspect-[16/9] w-full rounded-[16px] object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>

              {/* outcome stat cards */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                {(["risk_reduction", "reliability", "governance"] as const).map((k) => (
                  <div key={k} className="rounded-[16px] border border-white/[0.06] bg-[#0b1222] p-4 text-center">
                    <p className="text-xl font-extrabold text-[#f3d98a]">{t(`lifecycle.stats.${k}.value`)}</p>
                    <p className="mt-1 text-[10px] leading-5 text-slate-500">{t(`lifecycle.stats.${k}.label`)}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ━━━ SECURITY CAPABILITIES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-b border-white/[0.04] bg-[#070d18]">
        <div className={`${wrap} py-20 md:py-28`}>
          <SectionLabel>{t("capabilities.kicker")}</SectionLabel>
          <h2 className={secH2}>{t("capabilities.title")}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">{t("capabilities.desc")}</p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {capabilities.map((k) => (
              <article key={k} className={`${cardGreen} p-7`}>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-500/[0.07] text-emerald-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d={capabilityIcons[k]} />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-[#f1f5f9]">{t(`capabilities.items.${k}.title`)}</h3>
                    <p className={`mt-2 ${cardBody}`}>{t(`capabilities.items.${k}.desc`)}</p>
                    <ul className="mt-4 grid grid-cols-1 gap-y-2 sm:grid-cols-2">
                      {(capabilityChecks[k] as string[]).map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckIcon />
                          <span className="text-xs leading-6 text-slate-400">{t(`capabilities.items.${k}.checks.${item}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ MONITORING + RESPONSIBLE AI ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-b border-white/[0.04] bg-[#050911]">
        <div className={`${wrap} py-20 md:py-28`}>
          <div className="grid gap-8 lg:grid-cols-2">

            {/* monitoring */}
            <article className={`${cardBlue} p-7`}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/[0.08] text-blue-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-[#f1f5f9]">{t("monitoring.title")}</h3>
              <p className={`mt-3 ${cardBody}`}>{t("monitoring.p1")}</p>
              <p className={`mt-2 ${cardBody}`}>{t("monitoring.p2")}</p>
              <ul className="mt-5 grid grid-cols-1 gap-y-2 sm:grid-cols-2">
                {monitoringItems.map((k) => (
                  <li key={k} className="flex items-start gap-2">
                    <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-xs leading-6 text-slate-400">{t(`monitoring.items.${k}`)}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* responsible AI */}
            <article className={`${card} p-7`}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d4af37]/15 bg-[#d4af37]/[0.06] text-[#d4af37]">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-[#f1f5f9]">{t("responsible_ai.title")}</h3>
              <p className={`mt-3 ${cardBody}`}>{t("responsible_ai.p1")}</p>
              <p className={`mt-2 ${cardBody}`}>{t("responsible_ai.p2")}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {aiItems.map((k) => (
                  <span
                    key={k}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af37]/15 bg-[#d4af37]/[0.05] px-3 py-1.5 text-[11px] font-medium text-[#f3d98a]"
                  >
                    {t(`responsible_ai.items.${k}`)}
                  </span>
                ))}
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* ━━━ FRAMEWORK ALIGNMENT (practices followed internally; formal
          certification actively in progress — framework.note below
          must state this plainly, not just imply it) ━━━━━━━━━━━━━━━ */}
      <section className="border-b border-white/[0.04] bg-[#070d18]">
        <div className={`${wrap} py-20 md:py-28`}>
          <SectionLabel>{t("framework.kicker")}</SectionLabel>
          <h2 className={secH2}>{t("framework.title")}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">{t("framework.desc")}</p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {frameworkItems.map((k) => (
              <div
                key={k}
                className="flex items-center gap-4 rounded-[18px] border border-white/[0.07] bg-[#0b1222] px-5 py-4 transition-all hover:border-emerald-500/18"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-400/12 bg-emerald-500/[0.06] text-emerald-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#f1f5f9]">{t(`framework.items.${k}.title`)}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{t(`framework.items.${k}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-7 text-slate-500">{t("framework.note")}</p>
        </div>
      </section>

      {/* ━━━ ROADMAP ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-b border-white/[0.04] bg-[#050911]">
        <div className={`${wrap} py-20 md:py-28`}>
          <SectionLabel>{t("roadmap.kicker")}</SectionLabel>
          <h2 className={secH2}>{t("roadmap.title")}</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">{t("roadmap.desc")}</p>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {roadmapItems.map((k) => (
              <div
                key={k}
                className="rounded-[18px] border border-white/[0.06] bg-[#0b1222] px-4 py-4 transition-all hover:border-[#d4af37]/15"
              >
                <div className="flex items-center gap-2">
                  <CheckIcon />
                  <span className="text-[13px] font-medium text-[#f1f5f9]">{t(`roadmap.items.${k}`)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ RESPONSIBLE DISCLOSURE + CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#070d18]">
        <div className={`${wrap} py-20 md:py-28`}>
          <div className="relative overflow-hidden rounded-[32px] border border-white/[0.07] bg-[#0b1222] p-8 shadow-[0_0_0_1px_rgba(16,185,129,.04)_inset] md:p-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_8%_30%,rgba(16,185,129,0.06),transparent_55%),radial-gradient(ellipse_40%_55%_at_92%_70%,rgba(212,175,55,0.05),transparent_60%)]" />

            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-start">

              {/* disclosure */}
              <div>
                <SectionLabel>{t("disclosure.kicker")}</SectionLabel>
                <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.025em] text-[#f1f5f9] md:text-4xl">
                  {t("disclosure.title")}
                </h2>
                <p className="mt-5 text-sm leading-8 text-slate-300">{t("disclosure.p1")}</p>
                <p className="mt-4 text-sm leading-7 text-slate-400">{t("disclosure.p2")}</p>

                <a
                  href="mailto:security@openqcore.com"
                  className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#d4af37] px-6 py-3.5 text-sm font-semibold !text-[#0B1F3B] shadow-[0_8px_28px_rgba(212,175,55,0.22)] transition-all duration-300 hover:scale-[1.02]"
                >
                  <span className="!text-[#0B1F3B]">{t("disclosure.cta")}</span>
                  <ArrowIcon className="!text-[#0B1F3B]" />
                </a>
              </div>

              {/* trust engineering */}
              <div className="rounded-[24px] border border-white/[0.07] bg-[#050911]/60 p-6">
                <SectionLabel>{t("trust_engineering.kicker")}</SectionLabel>
                <h3 className="mt-4 text-xl font-bold text-[#f1f5f9]">{t("trust_engineering.title")}</h3>

                <div className="mt-6 flex flex-col gap-2">
                  {(["research", "engineering", "security", "intelligence", "transformation"] as const).map((k, i) => (
                    <div key={k} className="flex items-center gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/20 bg-[#d4af37]/[0.07] text-[10px] font-bold text-[#d4af37]">
                        {i + 1}
                      </div>
                      <span className="text-sm font-medium text-[#f1f5f9]">{t(`trust_engineering.steps.${k}`)}</span>
                      {i < 4 && <div className="ml-auto h-px flex-1 bg-gradient-to-r from-[#d4af37]/10 to-transparent" />}
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-sm font-medium leading-7 text-[#f3d98a]">{t("trust_engineering.tagline")}</p>
              </div>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
}