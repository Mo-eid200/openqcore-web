import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Header from "../(marketing)/components/Header";
import Footer from "../(marketing)/components/Footer";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "changelog_page.seo" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "https://openqcore.com/changelog",
      languages: {
        en: "https://openqcore.com/en/changelog",
        ar: "https://openqcore.com/ar/changelog"
      }
    }
  };
}

const wrap = "mx-auto w-full max-w-[1380px] px-6 lg:px-8";

const primaryBtn =
  "inline-flex items-center justify-center rounded-xl bg-[#d4af37] px-5 py-3 text-sm font-bold !text-[#0B1F3B] shadow-[0_10px_28px_rgba(212,175,55,.24)] transition hover:brightness-105";
const ghostBtn =
  "inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold !text-slate-100 transition hover:border-white/30 hover:bg-white/[0.07]";

const entries = [
  {
    version: "v1.0.0",
    date: "2026-06-14",
    product: "Pulse Engine",
    type: "Improved",
    notes: [
      "Adaptive routing latency optimizations for mixed multimodal requests.",
      "More stable stream usage accounting in long-running responses.",
      "Better recovery handling for provider failover scenarios."
    ],
    href: "/changelog/pulse-engine"
  },
  {
    version: "v1.0.0",
    date: "2026-06-09",
    product: "Platform API",
    type: "Fixed",
    notes: [
      "Resolved intermittent token usage mismatch on retried requests.",
      "Improved webhook delivery retry behavior and observability metadata."
    ],
    href: "/developers"
  },
  {
    version: "v1.0.0",
    date: "2026-06-02",
    product: "Dashboard",
    type: "Added",
    notes: [
      "Introduced workspace-level usage visibility and billing insights.",
      "Added quick filters for product, provider, and time ranges."
    ],
    href: "/company/contact"
  }
];

export default async function ChangelogPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "changelog_page" });

  return (
    <div className="min-h-screen bg-[#050911] text-white">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(52%_45%_at_12%_10%,rgba(212,175,55,.12),transparent),radial-gradient(35%_30%_at_85%_15%,rgba(59,130,246,.1),transparent)]" />
          <div className={`${wrap} relative py-16 md:py-20`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]">{t("hero.kicker")}</p>
            <h1 className="mt-4 text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold tracking-[-0.03em] text-slate-100">
              {t("hero.title")}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">{t("hero.desc")}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/changelog/pulse-engine" className={primaryBtn}>{t("hero.cta_primary")}</Link>
              <Link href="/infrastructure/pulse-engine" className={ghostBtn}>{t("hero.cta_secondary")}</Link>
            </div>
          </div>
        </section>



        {/* Entries */}
        <section>
          <div className={`${wrap} py-12 md:py-16`}>
            <div className="grid gap-4">
              {entries.map((entry) => (
                <article
                  key={`${entry.version}-${entry.product}`}
                  className="rounded-2xl border border-white/10 bg-[#0b1222] p-6 transition hover:border-[#d4af37]/30"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-3 py-1 text-xs font-semibold text-[#f3d98a]">
                      {entry.version}
                    </span>
                    <span className="text-xs text-slate-400">{entry.date}</span>
                    <span className="text-xs font-semibold text-slate-200">{entry.product}</span>
                    <span className="rounded-full border border-blue-400/20 bg-blue-500/[0.08] px-2.5 py-1 text-[11px] font-semibold text-blue-300">
                      {entry.type}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {entry.notes.map((n, i) => (
                      <li key={i} className="text-sm leading-7 text-slate-300">• {n}</li>
                    ))}
                  </ul>

                  <div className="mt-5 flex items-center justify-between">
                    <Link href={entry.href} className="text-sm font-semibold !text-[#f3d98a] hover:!text-[#ffe08c]">
                      {t("entry.read_more")} →
                    </Link>

                    <Link href={entry.href} className="text-xs font-semibold uppercase tracking-[0.12em] !text-slate-300 hover:!text-slate-100">
                      See more
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-10 rounded-2xl border border-white/10 bg-[#0b1222] p-6 md:p-8">
              <h3 className="text-xl font-bold text-slate-100 md:text-2xl">Need deeper release notes?</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Explore Pulse Engine release history with capability-level updates, reliability improvements, and fix logs.
              </p>
              <div className="mt-5">
                <Link href="/changelog/pulse-engine" className={primaryBtn}>
                  Open Pulse Engine Details
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