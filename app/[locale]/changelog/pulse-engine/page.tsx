import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Header from "../../(marketing)/components/Header";
import Footer from "../../(marketing)/components/Footer";

import ImageWithLightbox from "../../(marketing)/components/common/ImageWithLightbox";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "changelog_pulse_engine.seo" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("og_title"),
      description: t("og_description"),
      type: "website"
    }
  };
}

const wrap = "mx-auto w-full max-w-[1380px] px-6 lg:px-8";
const sectionTitle = "text-[clamp(1.5rem,2.7vw,2.5rem)] font-extrabold tracking-[-0.02em] text-slate-100";
const body = "text-sm md:text-[15px] leading-8 text-slate-300";

export default async function PulseEnginePremiumPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "changelog_pulse_engine" });

  const lifecycle = ["understand", "decide", "execute"] as const;

  const capabilities = [
    { key: "adaptive_routing", tone: "from-cyan-500/10 to-cyan-200/5 border-cyan-300/20" },
    { key: "multimodal_intelligence", tone: "from-fuchsia-500/10 to-fuchsia-200/5 border-fuchsia-300/20" },
    { key: "memory_intelligence", tone: "from-emerald-500/10 to-emerald-200/5 border-emerald-300/20" },
    { key: "personality_behavior", tone: "from-orange-500/10 to-orange-200/5 border-orange-300/20" },
    { key: "tool_orchestration", tone: "from-violet-500/10 to-violet-200/5 border-violet-300/20" },
    { key: "streaming_first", tone: "from-blue-500/10 to-blue-200/5 border-blue-300/20" },
    { key: "reliability_recovery", tone: "from-amber-500/10 to-amber-200/5 border-amber-300/20" },
    { key: "cost_intelligence", tone: "from-rose-500/10 to-rose-200/5 border-rose-300/20" }
  ] as const;

  return (
    <div className="min-h-screen bg-[#040811] text-white">
      <Header />

      <main>
        {/* HERO غير سيمتري */}
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(50%_40%_at_15%_12%,rgba(212,175,55,.16),transparent),radial-gradient(35%_30%_at_85%_8%,rgba(56,189,248,.14),transparent)]" />
          <div className={`${wrap} relative py-14 md:py-20`}>
            <div className="grid items-start gap-10 xl:grid-cols-12">
              <div className="xl:col-span-7">
                <p className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">{t("hero.kicker")}</p>
                <h1 className="mt-4 text-[clamp(2rem,5vw,4.6rem)] leading-[1.03] font-black tracking-[-0.03em] text-white">
                  {t("hero.title")}
                </h1>
                <p className="mt-3 text-xl font-semibold text-[#f7dc8e]">{t("hero.subtitle")}</p>
                <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">{t("hero.desc")}</p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/developers" className="rounded-xl bg-[#d4af37] px-6 py-3.5 text-sm font-bold !text-[#0B1F3B]">
                    {t("hero.cta_primary")}
                  </Link>
                  <Link href="/changelog" className="rounded-xl border border-white/20 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold !text-slate-100">
                    {t("hero.cta_secondary")}
                  </Link>
                  <Link href="/company/contact" className="rounded-xl border border-white/20 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold !text-slate-100">
                    {t("hero.cta_tertiary")}
                  </Link>
                </div>
              </div>

              <div className="xl:col-span-5">
                <div className="relative rounded-3xl border border-white/10 bg-[#0b1222]/85 p-6">
                  <div className="absolute -inset-3 rounded-3xl bg-[#d4af37]/10 blur-2xl" />
                  <div className="relative">
                                 <ImageWithLightbox
  src="/engines/pulse-logo.png"
  alt="Pulse Engine Banner"
  width={780}
  height={520}
  className="group block w-full overflow-hidden rounded-2xl"
  imageClassName="h-auto w-full rounded-2xl object-cover transition duration-500 group-hover:scale-[1.01]"
/>
                    <p className="mt-4 text-center text-sm font-semibold text-slate-200">{t("hero.logo_caption")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why */}
        <section className="border-b border-white/10">
          <div className={`${wrap} py-14 md:py-18`}>
            <h2 className={sectionTitle}>{t("why.title")}</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <p className={body}>{t("why.p1")}</p>
              <p className={body}>{t("why.p2")}</p>
            </div>
          </div>
        </section>

        {/* Lifecycle */}
        <section className="border-b border-white/10 bg-[#070d18]">
          <div className={`${wrap} py-14 md:py-18`}>
            <h2 className={sectionTitle}>{t("lifecycle.title")}</h2>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {lifecycle.map((k, i) => (
                <article key={k} className="rounded-2xl border border-white/10 bg-[#0b1222] p-6">
                  <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#d4af37] text-xs font-black text-[#0B1F3B]">
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-bold text-[#f7dc8e]">{t(`lifecycle.${k}.title`)}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{t(`lifecycle.${k}.desc`)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Banner + Lightbox */}
        <section className="border-b border-white/10">
          <div className={`${wrap} py-14 md:py-18`}>
            <div className="rounded-3xl border border-white/10 bg-[#0b1222] p-5 md:p-6">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#d4af37]">Engine Banner</p>

              
             <ImageWithLightbox
  src="/engines/pulse-banner-main.png"
  alt="Pulse Engine Banner"
  width={1600}
  height={700}
  className="group block w-full overflow-hidden rounded-2xl"
  imageClassName="h-auto w-full rounded-2xl object-cover transition duration-500 group-hover:scale-[1.01]"
/>
            </div>
          </div>
        </section>

        {/* Capabilities بألوان مختلفة */}
        <section className="border-b border-white/10 bg-[#070d18]">
          <div className={`${wrap} py-14 md:py-18`}>
            <h2 className={sectionTitle}>{t("capabilities.title")}</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {capabilities.map((c) => (
                <article
                  key={c.key}
                  className={`rounded-2xl border bg-gradient-to-b ${c.tone} p-5 backdrop-blur-sm`}
                >
                  <h3 className="text-base font-semibold text-slate-100">
                    {t(`capabilities.items.${c.key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    {t(`capabilities.items.${c.key}.desc`)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section className="border-b border-white/10">
          <div className={`${wrap} py-14 md:py-18`}>
            <h2 className={sectionTitle}>{t("architecture.title")}</h2>
            <p className={`mt-4 ${body}`}>{t("architecture.desc")}</p>
            <div className="mt-7 rounded-2xl border border-[#d4af37]/30 bg-[#0b1222] p-6 text-sm leading-8 text-slate-100">
              {t("architecture.flow")}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className={`${wrap} py-14 md:py-20`}>
            <div className="rounded-3xl border border-white/10 bg-[linear-gradient(120deg,rgba(212,175,55,.18),rgba(8,14,26,.94)_44%,rgba(8,14,26,.98))] p-8 md:p-10">
              <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-slate-100 md:text-4xl">
                {t("final_cta.title")}
              </h2>
              <p className="mt-4 max-w-3xl text-slate-200">{t("final_cta.desc")}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/developers" className="rounded-xl bg-[#d4af37] px-6 py-3.5 text-sm font-bold !text-[#0B1F3B]">
                  {t("final_cta.primary")}
                </Link>
                <Link href="/changelog" className="rounded-xl border border-white/20 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold !text-slate-100">
                  {t("final_cta.secondary")}
                </Link>
                <Link href="/company/contact" className="rounded-xl border border-white/20 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold !text-slate-100">
                  {t("final_cta.tertiary")}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}