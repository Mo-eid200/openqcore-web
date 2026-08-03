import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ImageWithLightbox from "../../../components/common/ImageWithLightbox";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "company_about_page.seo" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(",").map((k) => k.trim()),
    openGraph: {
      title: t("og_title"),
      description: t("og_description"),
      type: "website",
      url: "https://openqcore.com/company/about",
      siteName: "OpenQCore"
    },
    alternates: {
      canonical: "https://openqcore.com/company/about",
      languages: {
        en: "https://openqcore.com/en/company/about",
        ar: "https://openqcore.com/ar/company/about"
      }
    }
  };
}

// ─── Layout tokens ───────────────────────────────────────────────────────────
const wrap = "mx-auto w-full max-w-[1440px] px-6 lg:px-8";

// ─── Card styles ─────────────────────────────────────────────────────────────
const card =
  "group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b1222] p-6 " +
  "transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37]/25 hover:shadow-[0_8px_32px_rgba(212,175,55,.07)] " +
  "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl " +
  "before:bg-gradient-to-br before:from-[#d4af37]/[0.04] before:to-transparent";

// ─── Card heading & body ─────────────────────────────────────────────────────
const cardTitle = "text-[#f1f5f9] font-semibold leading-snug";
const cardBody  = "mt-2.5 text-sm leading-[1.85] text-slate-400";

// ─── Section wrapper ─────────────────────────────────────────────────────────
const section = "border-b border-white/[0.05]";

// ─── Buttons ─────────────────────────────────────────────────────────────────
const goldBtn =
  "inline-flex h-11 items-center justify-center rounded-xl " +
  "bg-gradient-to-b from-[#f5d97a] to-[#d4af37] px-5 text-sm font-extrabold !text-[#0B1F3B] " +
  "shadow-[0_10px_30px_rgba(212,175,55,.25)] ring-1 ring-[#f6de92]/40 transition hover:brightness-105";

const ghostBtn =
  "inline-flex h-11 items-center justify-center rounded-xl " +
  "border border-white/20 bg-white/[0.03] px-5 text-sm font-semibold text-white " +
  "transition hover:border-white/35 hover:bg-white/[0.08]";

// ─── Section-heading typography ───────────────────────────────────────────────
const secH2 =
  "mt-3 text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold tracking-[-0.025em] text-[#f1f5f9]";

// ─── Sub-section title (gold rule) ───────────────────────────────────────────
const subTitle =
  "mt-10 mb-5 flex items-center gap-3 text-xl font-bold text-[#f3d98a] " +
  "after:block after:h-px after:flex-1 after:bg-gradient-to-r after:from-[#d4af37]/30 after:to-transparent";

// ─── Label component ─────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d4af37]">
      <span className="block h-px w-5 bg-[#d4af37]/70" />
      {children}
    </p>
  );
}

// ─── Card icon wrapper ────────────────────────────────────────────────────────
function CardIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#d4af37]/20 bg-[#d4af37]/10">
      {children}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default async function CompanyAboutPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "company_about_page" });

  const whatWeBuild  = ["ai_platforms", "research_systems", "intelligent_infrastructure", "foundation_initiatives"] as const;
  const products     = ["chatqxt", "researchqxt", "visionqxt", "codeqxt", "libraryqxt"] as const;
  const engines      = ["pulse_engine", "atlas_engine", "iris_engine", "forge_engine", "archive_engine"] as const;
  const infra        = ["voice_technologies", "memory_systems", "agent_architectures", "multimodal_infrastructure"] as const;
  const focus        = ["ai_systems", "voice_intelligence", "agent_architectures", "multimodal_intelligence", "ai_infrastructure", "responsible_ai"] as const;
  const work         = ["research_first", "build_for_scale", "responsible_by_design", "long_term_thinking"] as const;
  const values       = ["excellence", "curiosity", "responsibility", "collaboration", "integrity", "impact"] as const;
  const enterprise   = ["white_label_ai_solutions", "strategic_partnerships", "joint_development_projects"] as const;

  const exploreLinks = [
    { key: "leadership",   href: "/company/leadership" },
    { key: "careers",      href: "/company/careers" },
    { key: "newsroom",     href: "/company/newsroom" },
    { key: "brand_assets", href: "/company/brand" },
    { key: "contact",      href: "/company/contact" }
  ] as const;

  return (
    <main className="min-h-screen bg-[#050911] text-white">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-white/[0.05]">
        {/* ambient gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(58%_42%_at_12%_8%,rgba(212,175,55,.14),transparent),radial-gradient(44%_34%_at_88%_10%,rgba(59,130,246,.12),transparent),radial-gradient(30%_60%_at_50%_100%,rgba(212,175,55,.04),transparent)]" />

        <div className={`${wrap} relative py-16 md:py-20`}>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">

            {/* ── copy col ── */}
            <div className="lg:col-span-7">
              <Label>{t("hero.kicker")}</Label>

              <h1 className="mt-4 max-w-5xl text-[clamp(2.1rem,5.1vw,4.6rem)] font-extrabold leading-[1.03] tracking-[-0.03em]">
                {t("hero.title")}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                {t("hero.desc")}
              </p>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                {t("hero.desc2")}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/company/contact" className={goldBtn}>{t("hero.cta_primary")}</Link>
                <Link href="/research"        className={ghostBtn}>{t("hero.cta_secondary")}</Link>
              </div>
            </div>

            {/* ── logo frame col ── */}
<div className="lg:col-span-5">
  <div className="relative ms-auto w-full max-w-[480px]">
    {/* glow halo */}
    <div className="pointer-events-none absolute -inset-3 rounded-[22px] bg-[#d4af37]/10 blur-xl" />
    {/* frame */}
    <div className="relative rounded-[20px] border border-white/10 bg-[#0b1222] p-3">
      <ImageWithLightbox
        src="/engines/openqcore-logo-full-light.png"
        alt="OpenQCore Logo"
        width={960}
        height={960}
        className="group block w-full overflow-hidden rounded-[14px] bg-[#081021]"
        imageClassName="w-full rounded-[14px] object-contain p-6 transition duration-300 group-hover:scale-[1.02]"
      />
    </div>
  </div>
</div>

          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className={section}>
        <div className={`${wrap} py-14 md:py-16`}>
          <Label>{t("mission.kicker")}</Label>
          <h2 className={secH2}>{t("mission.title")}</h2>
          <p className="mt-5 max-w-5xl text-sm leading-8 text-slate-300 md:text-base">{t("mission.p1")}</p>
          <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-300 md:text-base">{t("mission.p2")}</p>
          <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-300 md:text-base">{t("mission.p3")}</p>
        </div>
      </section>

      {/* ── VISION ── */}
      <section className={`${section} bg-[#070d18]`}>
        <div className={`${wrap} py-14 md:py-16`}>
          <Label>{t("vision.kicker")}</Label>
          <h2 className={secH2}>{t("vision.title")}</h2>
          <p className="mt-5 max-w-5xl text-sm leading-8 text-slate-300 md:text-base">{t("vision.p1")}</p>
          <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-300 md:text-base">{t("vision.p2")}</p>
          <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-300 md:text-base">{t("vision.p3")}</p>
        </div>
      </section>

      {/* ── WHY EXISTS ── */}
      <section className={section}>
        <div className={`${wrap} py-14 md:py-16`}>
          <Label>{t("why.kicker")}</Label>
          <h2 className={secH2}>{t("why.title")}</h2>
          <p className="mt-5 max-w-5xl text-sm leading-8 text-slate-300 md:text-base">{t("why.p1")}</p>
          <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-300 md:text-base">{t("why.p2")}</p>
          <p className="mt-4 max-w-5xl text-sm leading-8 text-slate-300 md:text-base">{t("why.p3")}</p>
        </div>
      </section>

      {/* ── WHAT WE BUILD ── */}
      <section className={`${section} bg-[#070d18]`}>
        <div className={`${wrap} py-14 md:py-16`}>
          <Label>{t("what_build.kicker")}</Label>
          <h2 className={secH2}>{t("what_build.title")}</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {whatWeBuild.map((k) => (
              <article key={k} className={card}>
                <CardIcon>
                  {k === "ai_platforms"             && <svg className="h-[18px] w-[18px] stroke-[#d4af37]" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>}
                  {k === "research_systems"          && <svg className="h-[18px] w-[18px] stroke-[#d4af37]" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>}
                  {k === "intelligent_infrastructure" && <svg className="h-[18px] w-[18px] stroke-[#d4af37]" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>}
                  {k === "foundation_initiatives"    && <svg className="h-[18px] w-[18px] stroke-[#d4af37]" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>}
                </CardIcon>
                <h3 className={`text-xl ${cardTitle}`}>{t(`what_build.items.${k}.title`)}</h3>
                <p className={`mt-3 ${cardBody}`}>{t(`what_build.items.${k}.desc`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM ── */}
      <section className={section}>
        <div className={`${wrap} py-14 md:py-16`}>
          <Label>{t("ecosystem.kicker")}</Label>
          <h2 className={secH2}>{t("ecosystem.title")}</h2>

          {/* products */}
          <h3 className={subTitle}>{t("ecosystem.products_title")}</h3>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {products.map((k) => (
              <article key={k} className={card}>
                <h4 className={`text-lg ${cardTitle}`}>{t(`ecosystem.products.${k}.title`)}</h4>
                <p className={cardBody}>{t(`ecosystem.products.${k}.desc`)}</p>
              </article>
            ))}
          </div>

          {/* engines */}
          <h3 className={subTitle}>{t("ecosystem.engines_title")}</h3>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {engines.map((k) => (
              <article key={k} className={card}>
                <h4 className={`text-lg ${cardTitle}`}>{t(`ecosystem.engines.${k}.title`)}</h4>
                <p className={cardBody}>{t(`ecosystem.engines.${k}.desc`)}</p>
              </article>
            ))}
          </div>

          {/* infrastructure */}
          <h3 className={subTitle}>{t("ecosystem.infrastructure_title")}</h3>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {infra.map((k) => (
              <article key={k} className={card}>
                <h4 className={`text-lg ${cardTitle}`}>{t(`ecosystem.infrastructure.${k}.title`)}</h4>
                <p className={cardBody}>{t(`ecosystem.infrastructure.${k}.desc`)}</p>
              </article>
            ))}
          </div>

          {/* emerging */}
          <h3 className={subTitle}>{t("ecosystem.emerging_title")}</h3>
          <article className={`${card} border-[#d4af37]/18`}>
            <h4 className={`text-lg ${cardTitle}`}>{t("ecosystem.emerging.browser.title")}</h4>
            <p className={`mt-3 ${cardBody}`}>{t("ecosystem.emerging.browser.p1")}</p>
            <p className={`mt-3 ${cardBody}`}>{t("ecosystem.emerging.browser.p2")}</p>
            <p className={`mt-3 ${cardBody}`}>{t("ecosystem.emerging.browser.p3")}</p>
          </article>
        </div>
      </section>

      {/* ── FOCUS AREAS ── */}
      <section className={`${section} bg-[#070d18]`}>
        <div className={`${wrap} py-14 md:py-16`}>
          <Label>{t("focus.kicker")}</Label>
          <h2 className={secH2}>{t("focus.title")}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {focus.map((k) => (
              <article key={k} className={card}>
                <h3 className={`text-lg ${cardTitle}`}>{t(`focus.items.${k}.title`)}</h3>
                <p className={cardBody}>{t(`focus.items.${k}.desc`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className={section}>
        <div className={`${wrap} py-14 md:py-16`}>
          <Label>{t("work.kicker")}</Label>
          <h2 className={secH2}>{t("work.title")}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {work.map((k) => (
              <article key={k} className={card}>
                <h3 className={`text-lg ${cardTitle}`}>{t(`work.items.${k}.title`)}</h3>
                <p className={cardBody}>{t(`work.items.${k}.desc`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className={`${section} bg-[#070d18]`}>
        <div className={`${wrap} py-14 md:py-16`}>
          <Label>{t("values.kicker")}</Label>
          <h2 className={secH2}>{t("values.title")}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {values.map((k) => (
              <article key={k} className={card}>
                <h3 className="text-lg font-semibold text-[#0d214a]">{t(`values.items.${k}.title`)}</h3>
                <p className={cardBody}>{t(`values.items.${k}.desc`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENTERPRISE ── */}
      <section className={section}>
        <div className={`${wrap} py-14 md:py-16`}>
          <Label>{t("enterprise.kicker")}</Label>
          <h2 className={secH2}>{t("enterprise.title")}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {enterprise.map((k) => (
              <article key={k} className={card}>
                <h3 className={`text-lg ${cardTitle}`}>{t(`enterprise.items.${k}.title`)}</h3>
                <p className={cardBody}>{t(`enterprise.items.${k}.desc`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOOKING AHEAD + EXPLORE ── */}
      <section>
        <div className={`${wrap} py-16 md:py-20`}>
          <div className="rounded-3xl border border-white/10 bg-[linear-gradient(125deg,rgba(212,175,55,.16),rgba(10,16,29,.93)_52%,rgba(10,16,29,.96))] p-8 md:p-10 shadow-[0_0_0_1px_rgba(212,175,55,.06)_inset]">

            <Label>{t("ahead.kicker")}</Label>
            <h2 className={secH2}>{t("ahead.title")}</h2>
            <p className="mt-4 max-w-4xl text-slate-200">{t("ahead.p1")}</p>
            <p className="mt-3 max-w-4xl text-slate-200">{t("ahead.p2")}</p>
            <p className="mt-3 max-w-4xl text-slate-200">{t("ahead.p3")}</p>

            <h3 className="mt-10 text-xl font-bold text-[#f1f5f9]">{t("explore.title")}</h3>
            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              {exploreLinks.map((item) => (
                <div
                  key={item.key}
                  className="rounded-xl border border-white/10 bg-[#0b1222]/80 p-4 transition-all duration-200 hover:border-[#d4af37]/22 hover:bg-[#0b1222]"
                >
                  <p className="font-semibold text-[#f1f5f9]">{t(`explore.links.${item.key}.title`)}</p>
                  <Link
                    href={item.href}
                    className="mt-3 inline-flex text-sm font-semibold text-[#f3d98a] hover:underline"
                  >
                    {t("explore.visit")}
                  </Link>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}