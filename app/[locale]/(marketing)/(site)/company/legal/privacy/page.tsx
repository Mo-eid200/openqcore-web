"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

type SectionId =
  | "intro"
  | "commitment"
  | "information_collect"
  | "ai_processing"
  | "engines"
  | "no_training"
  | "memory"
  | "ownership"
  | "security_arch"
  | "zero_trust"
  | "enterprise_controls"
  | "confidentiality"
  | "ai_safety"
  | "data_sharing"
  | "international_processing"
  | "gdpr"
  | "retention"
  | "rights"
  | "cookies"
  | "children"
  | "third_party"
  | "changes"
  | "contact"
  | "principle";

const navItems: { id: SectionId; short: string }[] = [
  { id: "intro", short: "Introduction" },
  { id: "commitment", short: "Our Commitment" },
  { id: "information_collect", short: "Information We Collect" },
  { id: "ai_processing", short: "AI Processing" },
  { id: "engines", short: "Runtime Engines" },
  { id: "no_training", short: "No Training on Customer Data" },
  { id: "memory", short: "Runtime Memory" },
  { id: "ownership", short: "Data Ownership" },
  { id: "security_arch", short: "Security Architecture" },
  { id: "zero_trust", short: "Zero Trust" },
  { id: "enterprise_controls", short: "Enterprise Controls" },
  { id: "confidentiality", short: "Confidentiality" },
  { id: "ai_safety", short: "AI Safety & Governance" },
  { id: "data_sharing", short: "Data Sharing" },
  { id: "international_processing", short: "International Processing" },
  { id: "gdpr", short: "GDPR Compliance" },
  { id: "retention", short: "Data Retention" },
  { id: "rights", short: "Your Rights" },
  { id: "cookies", short: "Cookies" },
  { id: "children", short: "Children's Privacy" },
  { id: "third_party", short: "Third-Party Services" },
  { id: "changes", short: "Policy Changes" },
  { id: "contact", short: "Contact" },
  { id: "principle", short: "Privacy Principle" }
];

const wrap = "mx-auto w-full max-w-[1440px] px-6 lg:px-8";
const prose = "text-[15px] leading-[1.9] text-slate-300";
const proseSm = "text-sm leading-[1.85] text-slate-400";
const h2Style = "text-xl font-bold text-[#f1f5f9] scroll-mt-32";
const divider = "my-10 border-t border-white/[0.05]";
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d4af37]">
      <span className="block h-px w-5 bg-[#d4af37]/60" />
      {children}
    </p>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d4af37]/50" />
          <span className={proseSm}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function HighlightBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-[16px] border border-[#d4af37]/18 bg-[#d4af37]/[0.05] px-5 py-4">
      <p className="text-sm font-medium leading-7 text-[#f3d98a]">{children}</p>
    </div>
  );
}

/* Distinct from HighlightBox: for hard commitments/guarantees that
   need to visually stand apart from the general gold accent used
   throughout the page (e.g. "we never train on customer data"). */
function Callout({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 flex items-start gap-3 rounded-[16px] border border-blue-400/20 bg-blue-500/[0.06] px-5 py-4">
      <svg className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-400">{label}</p>
        <p className="mt-1.5 text-sm font-medium leading-7 text-slate-200">{children}</p>
      </div>
    </div>
  );
}

function CopyLinkButton({ sectionId }: { sectionId: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link to this section"
        className="ms-2 inline-flex h-6 w-6 items-center justify-center rounded-md text-slate-600 opacity-0 transition-all hover:bg-white/[0.06] hover:text-[#d4af37] group-hover:opacity-100"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>
      </button>
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -top-8 start-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#0b1222] px-2 py-1 text-[10px] font-semibold text-[#f3d98a] shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
          >
            Link copied
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

/* Every section heading in the page goes through this — gives every
   section a copy-link button automatically without repeating the
   button markup 23 times. */
function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 className={`${h2Style} group flex items-center`}>
      {children}
      <CopyLinkButton sectionId={id} />
    </h2>
  );
}

export default function PrivacyPolicyPage() {
  const t = useTranslations("privacy_policy_page");
  const [activeId, setActiveId] = useState<SectionId>("intro");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(scrollHeight > 0 ? Math.min(100, (scrollTop / scrollHeight) * 100) : 0);
      setShowBackToTop(scrollTop > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id as SectionId);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((s) => observerRef.current?.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id: SectionId) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const handlePrint = () => window.print();

  return (
    <main className="min-h-screen bg-[#050911] text-white">

      {/* Reading progress bar */}
      <div className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-white/[0.04]">
        <div
          className="h-full bg-gradient-to-r from-[#d4af37] to-[#f3d98a] transition-[width] duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header className="relative overflow-hidden border-b border-white/[0.04]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[8%] top-[-15%] h-[420px] w-[620px] rounded-full bg-[radial-gradient(ellipse,rgba(212,175,55,0.08),transparent_60%)]" />
          <div className="absolute right-0 top-[20%] h-[300px] w-[420px] rounded-full bg-[radial-gradient(ellipse,rgba(59,130,246,0.05),transparent_60%)]" />
        </div>

        <div className={`${wrap} pb-14 pt-32 md:pt-40`}>
          <SectionLabel>{t("hero.kicker")}</SectionLabel>
          <h1 className="mt-5 text-[clamp(2rem,4.5vw,3.6rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-white">
            {t("hero.title")}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-400">{t("hero.desc")}</p>

          <div className="mt-7 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.03] px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
              <span className="text-[11px] font-semibold text-slate-400">
                {t("hero.updated_label")}: <span className="text-[#f3d98a]">{t("hero.updated_date")}</span>
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-500">{t("hero.reading_time")}</span>
            <a href="mailto:privacy@openqcore.com" className="text-sm font-medium text-slate-500 transition-colors hover:text-[#d4af37]">
              privacy@openqcore.com
            </a>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-semibold text-slate-400 transition-colors hover:border-white/[0.15] hover:text-[#f3d98a]"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
              </svg>
              {t("hero.print_cta")}
            </button>
          </div>
        </div>
      </header>

      <div className={`${wrap} py-16`}>
        <div className="flex gap-14 xl:gap-20">
          <aside className="hidden lg:block">
            <nav className="sticky top-28 w-[260px] xl:w-[280px]">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{t("sidebar.label")}</p>
              <ul className="space-y-0.5">
                {navItems.map((item, index) => {
                  const isActive = activeId === item.id;
                  return (
                    <li key={item.id} className="relative">
                      {isActive && (
                        <motion.div
                          layoutId="privacy-sidebar-active"
                          className="absolute inset-0 rounded-lg bg-[#d4af37]/[0.09]"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <button
                        onClick={() => scrollTo(item.id)}
                        className={`relative z-10 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-start text-[13px] font-medium transition-colors duration-150 ${
                          isActive ? "text-[#f3d98a]" : "text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        <span className={`text-[10px] font-bold tabular-nums ${isActive ? "text-[#d4af37]" : "text-slate-600"}`}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {t(`sidebar.items.${item.id}`)}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="max-w-[820px] space-y-0">
              <section id="intro" className="scroll-mt-32 pb-10">
                <SectionHeading id="intro">{t("sections.intro.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.intro.p1")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.intro.p2")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.intro.p3")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.intro.p4")}</p>
                <BulletList
                  items={[
                    t("sections.intro.products.pulse"),
                    t("sections.intro.products.iris"),
                    t("sections.intro.products.supernova"),
                    t("sections.intro.products.runtime"),
                    t("sections.intro.products.studio"),
                    t("sections.intro.products.apis"),
                    t("sections.intro.products.agents"),
                    t("sections.intro.products.voice"),
                    t("sections.intro.products.developer"),
                    t("sections.intro.products.future")
                  ]}
                />
                <p className={`mt-5 ${prose}`}>{t("sections.intro.p5")}</p>
              </section>
              <div className={divider} />

              <section id="commitment" className="scroll-mt-32 pb-10">
                <SectionHeading id="commitment">{t("sections.commitment.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.commitment.p1")}</p>
                <h3 className="mt-5 text-lg font-bold text-[#f3d98a]">{t("sections.commitment.principle")}</h3>
                <BulletList
                  items={[
                    t("sections.commitment.items.i1"),
                    t("sections.commitment.items.i2"),
                    t("sections.commitment.items.i3"),
                    t("sections.commitment.items.i4"),
                    t("sections.commitment.items.i5"),
                    t("sections.commitment.items.i6")
                  ]}
                />
                <p className={`mt-5 ${prose}`}>{t("sections.commitment.p2")}</p>
              </section>
              <div className={divider} />

              <section id="information_collect" className="scroll-mt-32 pb-10">
                <SectionHeading id="information_collect">{t("sections.information_collect.title")}</SectionHeading>

                <h3 className="mt-6 text-base font-semibold text-[#f1f5f9]">{t("sections.information_collect.account.title")}</h3>
                <p className={`mt-2 ${prose}`}>{t("sections.information_collect.account.p1")}</p>
                <BulletList
                  items={[
                    t("sections.information_collect.account.items.i1"),
                    t("sections.information_collect.account.items.i2"),
                    t("sections.information_collect.account.items.i3"),
                    t("sections.information_collect.account.items.i4"),
                    t("sections.information_collect.account.items.i5"),
                    t("sections.information_collect.account.items.i6"),
                    t("sections.information_collect.account.items.i7"),
                    t("sections.information_collect.account.items.i8")
                  ]}
                />

                <h3 className="mt-8 text-base font-semibold text-[#f1f5f9]">{t("sections.information_collect.service_usage.title")}</h3>
                <p className={`mt-2 ${prose}`}>{t("sections.information_collect.service_usage.p1")}</p>
                <BulletList
                  items={[
                    t("sections.information_collect.service_usage.items.i1"),
                    t("sections.information_collect.service_usage.items.i2"),
                    t("sections.information_collect.service_usage.items.i3"),
                    t("sections.information_collect.service_usage.items.i4"),
                    t("sections.information_collect.service_usage.items.i5"),
                    t("sections.information_collect.service_usage.items.i6"),
                    t("sections.information_collect.service_usage.items.i7"),
                    t("sections.information_collect.service_usage.items.i8"),
                    t("sections.information_collect.service_usage.items.i9")
                  ]}
                />
                <p className={`mt-4 ${prose}`}>{t("sections.information_collect.service_usage.p2")}</p>

                <h3 className="mt-8 text-base font-semibold text-[#f1f5f9]">{t("sections.information_collect.technical.title")}</h3>
                <p className={`mt-2 ${prose}`}>{t("sections.information_collect.technical.p1")}</p>
                <BulletList
                  items={[
                    t("sections.information_collect.technical.items.i1"),
                    t("sections.information_collect.technical.items.i2"),
                    t("sections.information_collect.technical.items.i3"),
                    t("sections.information_collect.technical.items.i4"),
                    t("sections.information_collect.technical.items.i5"),
                    t("sections.information_collect.technical.items.i6"),
                    t("sections.information_collect.technical.items.i7"),
                    t("sections.information_collect.technical.items.i8")
                  ]}
                />
                <p className={`mt-4 ${prose}`}>{t("sections.information_collect.technical.p2")}</p>
              </section>
              <div className={divider} />

              <section id="ai_processing" className="scroll-mt-32 pb-10">
                <SectionHeading id="ai_processing">{t("sections.ai_processing.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.ai_processing.p1")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.ai_processing.p2")}</p>
                <BulletList
                  items={[
                    t("sections.ai_processing.items.i1"),
                    t("sections.ai_processing.items.i2"),
                    t("sections.ai_processing.items.i3"),
                    t("sections.ai_processing.items.i4"),
                    t("sections.ai_processing.items.i5"),
                    t("sections.ai_processing.items.i6"),
                    t("sections.ai_processing.items.i7"),
                    t("sections.ai_processing.items.i8")
                  ]}
                />
                <p className={`mt-5 ${prose}`}>{t("sections.ai_processing.p3")}</p>
              </section>
              <div className={divider} />

              <section id="engines" className="scroll-mt-32 pb-10">
                <SectionHeading id="engines">{t("sections.engines.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.engines.p1")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.engines.p2")}</p>
                <BulletList
                  items={[
                    t("sections.engines.items.i1"),
                    t("sections.engines.items.i2"),
                    t("sections.engines.items.i3"),
                    t("sections.engines.items.i4"),
                    t("sections.engines.items.i5"),
                    t("sections.engines.items.i6")
                  ]}
                />
                <p className={`mt-5 ${prose}`}>{t("sections.engines.p3")}</p>
                <h3 className="mt-5 text-lg font-bold text-[#f3d98a]">{t("sections.engines.statement")}</h3>
                <p className={`mt-3 ${prose}`}>{t("sections.engines.p4")}</p>
              </section>
              <div className={divider} />

              <section id="no_training" className="scroll-mt-32 pb-10">
                <SectionHeading id="no_training">{t("sections.no_training.title")}</SectionHeading>
                <Callout label={t("sections.no_training.callout_label")}>
                  {t("sections.no_training.p1")}
                </Callout>
                <BulletList
                  items={[
                    t("sections.no_training.used_for.i1"),
                    t("sections.no_training.used_for.i2"),
                    t("sections.no_training.used_for.i3"),
                    t("sections.no_training.used_for.i4"),
                    t("sections.no_training.used_for.i5"),
                    t("sections.no_training.used_for.i6"),
                    t("sections.no_training.used_for.i7")
                  ]}
                />
                <p className={`mt-5 ${prose}`}>{t("sections.no_training.p2")}</p>
              </section>
              <div className={divider} />

              <section id="memory" className="scroll-mt-32 pb-10">
                <SectionHeading id="memory">{t("sections.memory.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.memory.p1")}</p>
                <BulletList
                  items={[
                    t("sections.memory.items.i1"),
                    t("sections.memory.items.i2"),
                    t("sections.memory.items.i3"),
                    t("sections.memory.items.i4"),
                    t("sections.memory.items.i5"),
                    t("sections.memory.items.i6")
                  ]}
                />
                <p className={`mt-5 ${prose}`}>{t("sections.memory.p2")}</p>
              </section>
              <div className={divider} />

              <section id="ownership" className="scroll-mt-32 pb-10">
                <SectionHeading id="ownership">{t("sections.ownership.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.ownership.p1")}</p>
                <BulletList
                  items={[
                    t("sections.ownership.items.i1"),
                    t("sections.ownership.items.i2"),
                    t("sections.ownership.items.i3"),
                    t("sections.ownership.items.i4"),
                    t("sections.ownership.items.i5"),
                    t("sections.ownership.items.i6"),
                    t("sections.ownership.items.i7"),
                    t("sections.ownership.items.i8"),
                    t("sections.ownership.items.i9")
                  ]}
                />
                <p className={`mt-5 ${prose}`}>{t("sections.ownership.p2")}</p>
                <HighlightBox>{t("sections.ownership.p3")}</HighlightBox>
              </section>
              <div className={divider} />

              <section id="security_arch" className="scroll-mt-32 pb-10">
                <SectionHeading id="security_arch">{t("sections.security_arch.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.security_arch.p1")}</p>
                <BulletList
                  items={[
                    t("sections.security_arch.items.i1"),
                    t("sections.security_arch.items.i2"),
                    t("sections.security_arch.items.i3"),
                    t("sections.security_arch.items.i4"),
                    t("sections.security_arch.items.i5"),
                    t("sections.security_arch.items.i6"),
                    t("sections.security_arch.items.i7"),
                    t("sections.security_arch.items.i8"),
                    t("sections.security_arch.items.i9"),
                    t("sections.security_arch.items.i10")
                  ]}
                />
                <p className={`mt-5 ${prose}`}>{t("sections.security_arch.p2")}</p>
              </section>
              <div className={divider} />

              <section id="zero_trust" className="scroll-mt-32 pb-10">
                <SectionHeading id="zero_trust">{t("sections.zero_trust.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.zero_trust.p1")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.zero_trust.p2")}</p>
                <BulletList
                  items={[
                    t("sections.zero_trust.items.i1"),
                    t("sections.zero_trust.items.i2"),
                    t("sections.zero_trust.items.i3"),
                    t("sections.zero_trust.items.i4"),
                    t("sections.zero_trust.items.i5")
                  ]}
                />
                <HighlightBox>{t("sections.zero_trust.p3")}</HighlightBox>
              </section>
              <div className={divider} />

              <section id="enterprise_controls" className="scroll-mt-32 pb-10">
                <SectionHeading id="enterprise_controls">{t("sections.enterprise_controls.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.enterprise_controls.p1")}</p>
                <BulletList
                  items={[
                    t("sections.enterprise_controls.items.i1"),
                    t("sections.enterprise_controls.items.i2"),
                    t("sections.enterprise_controls.items.i3"),
                    t("sections.enterprise_controls.items.i4"),
                    t("sections.enterprise_controls.items.i5"),
                    t("sections.enterprise_controls.items.i6"),
                    t("sections.enterprise_controls.items.i7"),
                    t("sections.enterprise_controls.items.i8"),
                    t("sections.enterprise_controls.items.i9"),
                    t("sections.enterprise_controls.items.i10")
                  ]}
                />
                <p className={`mt-5 ${prose}`}>{t("sections.enterprise_controls.p2")}</p>
              </section>
              <div className={divider} />

              <section id="confidentiality" className="scroll-mt-32 pb-10">
                <SectionHeading id="confidentiality">{t("sections.confidentiality.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.confidentiality.p1")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.confidentiality.p2")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.confidentiality.p3")}</p>
                <BulletList
                  items={[
                    t("sections.confidentiality.items.i1"),
                    t("sections.confidentiality.items.i2"),
                    t("sections.confidentiality.items.i3"),
                    t("sections.confidentiality.items.i4"),
                    t("sections.confidentiality.items.i5")
                  ]}
                />
                <p className={`mt-5 ${prose}`}>{t("sections.confidentiality.p4")}</p>
              </section>
              <div className={divider} />

              <section id="ai_safety" className="scroll-mt-32 pb-10">
                <SectionHeading id="ai_safety">{t("sections.ai_safety.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.ai_safety.p1")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.ai_safety.p2")}</p>
                <BulletList
                  items={[
                    t("sections.ai_safety.items.i1"),
                    t("sections.ai_safety.items.i2"),
                    t("sections.ai_safety.items.i3"),
                    t("sections.ai_safety.items.i4"),
                    t("sections.ai_safety.items.i5"),
                    t("sections.ai_safety.items.i6")
                  ]}
                />
                <p className={`mt-5 ${prose}`}>{t("sections.ai_safety.p3")}</p>
              </section>
              <div className={divider} />

              <section id="data_sharing" className="scroll-mt-32 pb-10">
                <SectionHeading id="data_sharing">{t("sections.data_sharing.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.data_sharing.p1")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.data_sharing.p2")}</p>

                <h3 className="mt-6 text-base font-semibold text-[#f1f5f9]">{t("sections.data_sharing.providers.title")}</h3>
                <p className={`mt-2 ${prose}`}>{t("sections.data_sharing.providers.p1")}</p>
                <BulletList
                  items={[
                    t("sections.data_sharing.providers.items.i1"),
                    t("sections.data_sharing.providers.items.i2"),
                    t("sections.data_sharing.providers.items.i3"),
                    t("sections.data_sharing.providers.items.i4"),
                    t("sections.data_sharing.providers.items.i5")
                  ]}
                />
                <p className={`mt-4 ${prose}`}>{t("sections.data_sharing.providers.p2")}</p>

                <h3 className="mt-6 text-base font-semibold text-[#f1f5f9]">{t("sections.data_sharing.legal.title")}</h3>
                <p className={`mt-2 ${prose}`}>{t("sections.data_sharing.legal.p1")}</p>
                <BulletList
                  items={[
                    t("sections.data_sharing.legal.items.i1"),
                    t("sections.data_sharing.legal.items.i2"),
                    t("sections.data_sharing.legal.items.i3"),
                    t("sections.data_sharing.legal.items.i4"),
                    t("sections.data_sharing.legal.items.i5")
                  ]}
                />

                <h3 className="mt-6 text-base font-semibold text-[#f1f5f9]">{t("sections.data_sharing.corporate.title")}</h3>
                <p className={`mt-2 ${prose}`}>{t("sections.data_sharing.corporate.p1")}</p>
                <BulletList
                  items={[
                    t("sections.data_sharing.corporate.items.i1"),
                    t("sections.data_sharing.corporate.items.i2"),
                    t("sections.data_sharing.corporate.items.i3"),
                    t("sections.data_sharing.corporate.items.i4")
                  ]}
                />
                <p className={`mt-4 ${prose}`}>{t("sections.data_sharing.corporate.p2")}</p>
              </section>
              <div className={divider} />

              <section id="international_processing" className="scroll-mt-32 pb-10">
                <SectionHeading id="international_processing">{t("sections.international_processing.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.international_processing.p1")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.international_processing.p2")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.international_processing.p3")}</p>
              </section>
              <div className={divider} />

                            <section id="gdpr" className="scroll-mt-32 pb-10">
                <SectionHeading id="gdpr">{t("sections.gdpr.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.gdpr.p1")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.gdpr.p2")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.gdpr.p3")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.gdpr.p4")}</p>
              </section>
              <div className={divider} />

              <section id="retention" className="scroll-mt-32 pb-10">
                <SectionHeading id="retention">{t("sections.retention.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.retention.p1")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.retention.p2")}</p>
                <BulletList
                  items={[
                    t("sections.retention.items.i1"),
                    t("sections.retention.items.i2"),
                    t("sections.retention.items.i3"),
                    t("sections.retention.items.i4")
                  ]}
                />
                <p className={`mt-5 ${prose}`}>{t("sections.retention.p3")}</p>
              </section>
              <div className={divider} />

              <section id="rights" className="scroll-mt-32 pb-10">
                <SectionHeading id="rights">{t("sections.rights.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.rights.p1")}</p>
                <BulletList
                  items={[
                    t("sections.rights.items.i1"),
                    t("sections.rights.items.i2"),
                    t("sections.rights.items.i3"),
                    t("sections.rights.items.i4"),
                    t("sections.rights.items.i5"),
                    t("sections.rights.items.i6"),
                    t("sections.rights.items.i7")
                  ]}
                />
                <HighlightBox>{t("sections.rights.p2")}</HighlightBox>
              </section>
              <div className={divider} />

              <section id="cookies" className="scroll-mt-32 pb-10">
                <SectionHeading id="cookies">{t("sections.cookies.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.cookies.p1")}</p>
                <BulletList
                  items={[
                    t("sections.cookies.items.i1"),
                    t("sections.cookies.items.i2"),
                    t("sections.cookies.items.i3"),
                    t("sections.cookies.items.i4"),
                    t("sections.cookies.items.i5")
                  ]}
                />
                <p className={`mt-5 ${prose}`}>{t("sections.cookies.p2")}</p>
              </section>
              <div className={divider} />

              <section id="children" className="scroll-mt-32 pb-10">
                <SectionHeading id="children">{t("sections.children.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.children.p1")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.children.p2")}</p>
              </section>
              <div className={divider} />

              <section id="third_party" className="scroll-mt-32 pb-10">
                <SectionHeading id="third_party">{t("sections.third_party.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.third_party.p1")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.third_party.p2")}</p>
              </section>
              <div className={divider} />

              <section id="changes" className="scroll-mt-32 pb-10">
                <SectionHeading id="changes">{t("sections.changes.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.changes.p1")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.changes.p2")}</p>
              </section>
              <div className={divider} />

              <section id="contact" className="scroll-mt-32 pb-10">
                <SectionHeading id="contact">{t("sections.contact.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.contact.company")}</p>
                <p className={`mt-1 ${prose}`}>{t("sections.contact.subtitle")}</p>
                <p className={`mt-4 ${prose}`}>{t("sections.contact.p1")}</p>
                <a
                  href="mailto:privacy@openqcore.com"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#d4af37] px-5 py-3 text-sm font-semibold !text-[#0B1F3B] shadow-[0_6px_20px_rgba(212,175,55,0.2)] transition-all hover:scale-[1.02] hover:!text-[#0B1F3B]"
                >
                  <span className="!text-[#0B1F3B]">privacy@openqcore.com</span>
                </a>
              </section>
              <div className={divider} />

              <section id="principle" className="scroll-mt-32 pb-10">
                <SectionHeading id="principle">{t("sections.principle.title")}</SectionHeading>
                <HighlightBox>{t("sections.principle.statement1")}</HighlightBox>
                <p className={`mt-5 ${prose}`}>{t("sections.principle.p1")}</p>
                <p className="mt-5 text-base font-bold text-[#f3d98a]">{t("sections.principle.statement2")}</p>
              </section>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            aria-label="Back to top"
            className="fixed bottom-8 end-8 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.1] bg-[#0b1222] text-[#d4af37] shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-colors hover:border-[#d4af37]/30 hover:bg-[#0d1526]"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}