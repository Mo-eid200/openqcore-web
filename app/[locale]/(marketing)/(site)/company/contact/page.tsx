"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ImageWithLightbox from "../../../components/common/ImageWithLightbox";

const wrap = "mx-auto w-full max-w-[1440px] px-6 lg:px-8";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d4af37]">
      <span className="block h-px w-5 bg-[#d4af37]/60" />
      {children}
    </p>
  );
}

function ArrowIcon() {
  return (
    <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

export default function ContactPage() {
  const t = useTranslations("contact_page");

  const cards = [
    { key: "enterprise", email: "enterprise@openqcore.com" },
    { key: "partnerships", email: "partnerships@openqcore.com" },
    { key: "research", email: "research@openqcore.com" },
    { key: "developers", email: "developers@openqcore.com" },
    { key: "security", email: "security@openqcore.com" }
  ] as const;

  const ecosystem = [{ key: "pulse" }, { key: "iris" }, { key: "supernova" }] as const;
  const commitments = ["enterprise", "partnerships", "research", "developers", "security"] as const;

  return (
    <main className="min-h-screen bg-[#050911] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/[0.05]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[8%] top-[-12%] h-[520px] w-[700px] rounded-full bg-[radial-gradient(ellipse,rgba(212,175,55,0.08),transparent_60%)]" />
          <div className="absolute right-[0%] top-[10%] h-[420px] w-[520px] rounded-full bg-[radial-gradient(ellipse,rgba(59,130,246,0.05),transparent_60%)]" />
        </div>

        <div className={`${wrap} pb-16 pt-28 md:pb-20 md:pt-36`}>
          <SectionLabel>{t("hero.kicker")}</SectionLabel>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.1rem,4.8vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white">
            {t("hero.title")}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">{t("hero.p1")}</p>
          <p className="mt-3 max-w-3xl text-base leading-8 text-slate-400">{t("hero.p2")}</p>

          {/* banner image */}
          <div className="relative w-full">
            <div className="pointer-events-none absolute -inset-2 rounded-[20px] bg-[#d4af37]/[0.04] blur-xl" />
            <ImageWithLightbox
              src="/engines/contact-banner.png"
              alt="OpenQCore Contact"
              width={1800}
              height={900}
              priority
              className="group block w-full overflow-hidden rounded-[16px]"
              imageClassName="aspect-[16/9] w-full rounded-[16px] object-contain p-0 transition duration-500 group-hover:scale-[1.01]"
            />
          </div>
        </div>
      </section>

      {/* HOW CAN WE HELP */}
      <section className="border-b border-white/[0.05] bg-[#070d18]">
        <div className={`${wrap} py-16 md:py-24`}>
          <SectionLabel>{t("help.kicker")}</SectionLabel>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-[#f1f5f9] md:text-4xl">{t("help.title")}</h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => (
              <article
                key={card.key}
                className="group rounded-[20px] border border-white/[0.08] bg-[#0b1222] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37]/25 hover:shadow-[0_12px_36px_rgba(212,175,55,.08)]"
              >
                <h3 className="text-base font-semibold text-[#f1f5f9]">{t(`help.cards.${card.key}.title`)}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{t(`help.cards.${card.key}.desc`)}</p>

                <a
                  href={`mailto:${card.email}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#d4af37] px-4 py-2.5 text-sm font-semibold !text-[#0B1F3B] shadow-[0_6px_20px_rgba(212,175,55,.2)] transition-all hover:scale-[1.02] hover:!text-[#0B1F3B]"
                >
                  <span className="!text-[#0B1F3B]">{t(`help.cards.${card.key}.cta`)}</span>
                  <ArrowIcon />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ECOSYSTEM + VISION */}
      <section className="border-b border-white/[0.05] bg-[#050911]">
        <div className={`${wrap} py-16 md:py-24`}>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[24px] border border-white/[0.08] bg-[#0b1222] p-7 shadow-[0_8px_30px_rgba(2,6,23,.25)]">
              <SectionLabel>{t("ecosystem.kicker")}</SectionLabel>
              <h3 className="mt-4 text-2xl font-bold text-[#f1f5f9]">{t("ecosystem.title")}</h3>

              <div className="mt-6 space-y-3">
                {ecosystem.map((item) => (
                  <div key={item.key} className="rounded-xl border border-white/[0.08] bg-[#050911] px-4 py-3">
                    <p className="text-sm font-semibold text-[#f3d98a]">{t(`ecosystem.items.${item.key}.name`)}</p>
                    <p className="mt-1 text-xs text-slate-400">{t(`ecosystem.items.${item.key}.desc`)}</p>
                    {item.key === "supernova" && <p className="mt-1 text-[11px] text-slate-500">{t("ecosystem.items.supernova.note")}</p>}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-white/[0.08] bg-[#0b1222] p-7 shadow-[0_8px_30px_rgba(2,6,23,.25)]">
              <SectionLabel>{t("vision.kicker")}</SectionLabel>
              <h3 className="mt-4 text-2xl font-bold text-[#f1f5f9]">{t("vision.title")}</h3>
              <p className="mt-4 text-sm leading-8 text-slate-300">{t("vision.p1")}</p>
              <p className="mt-3 text-sm leading-8 text-slate-400">{t("vision.p2")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* RESPONSE COMMITMENT */}
<section className="border-b border-white/[0.05] bg-[#070d18]">
  <div className={`${wrap} py-16 md:py-24`}>
    <SectionLabel>{t("commitment.kicker")}</SectionLabel>
    <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-[#f1f5f9] md:text-4xl">
      {t("commitment.title")}
    </h2>
    <p className="mt-4 text-sm leading-7 text-slate-400">{t("commitment.desc")}</p>

    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {commitments.map((c, i) => {
        const colors = [
          "border-[#d4af37]/20 bg-[#d4af37]/[0.07] text-[#f3d98a]",
          "border-blue-500/20 bg-blue-500/[0.07] text-blue-300",
          "border-emerald-500/20 bg-emerald-500/[0.07] text-emerald-300",
          "border-violet-500/20 bg-violet-500/[0.07] text-violet-300",
          "border-rose-500/20 bg-rose-500/[0.07] text-rose-300",
        ];
        return (
          <div
            key={c}
            className={`
              flex items-center justify-center rounded-xl border px-4 py-5
              text-sm font-medium text-center leading-6
              transition-all duration-200 hover:-translate-y-0.5
              hover:shadow-[0_4px_16px_rgba(0,0,0,.2)]
              ${colors[i % colors.length]}
            `}
          >
            {t(`commitment.items.${c}`)}
          </div>
        );
      })}
    </div>

    <p className="mt-5 text-sm text-slate-500">{t("commitment.note")}</p>
  </div>
</section>

      {/* FINAL CTA */}
      <section className="bg-[#050911]">
        <div className={`${wrap} py-16 md:py-24`}>
          <div className="rounded-[28px] border border-white/[0.08] bg-[#0b1222] p-8 shadow-[0_10px_40px_rgba(2,6,23,.3)] md:p-12">
            <SectionLabel>{t("final.kicker")}</SectionLabel>
            <h2 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-[-0.02em] text-[#f1f5f9] md:text-4xl">{t("final.title")}</h2>
            <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-300">{t("final.p1")}</p>
            <p className="mt-3 max-w-3xl text-sm leading-8 text-slate-400">{t("final.p2")}</p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="mailto:Info@openqcore.com"
                className="inline-flex items-center gap-2 rounded-xl bg-[#d4af37] px-5 py-3 text-sm font-semibold !text-[#0B1F3B] shadow-[0_6px_20px_rgba(212,175,55,.2)] transition-all hover:scale-[1.02]"
              >
                Info@openqcore.com
                <ArrowIcon />
              </a>

              <Link
                href="/company"
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-5 py-3 text-sm font-semibold text-slate-200 transition-all hover:bg-white/[0.06]"
              >
                {t("final.secondary_cta")}
              </Link>
            </div>

            <div className="mt-8 border-t border-white/[0.08] pt-6 text-sm text-slate-500">
              <p>{t("final.signature_company")}</p>
              <p>{t("final.signature_subtitle")}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}