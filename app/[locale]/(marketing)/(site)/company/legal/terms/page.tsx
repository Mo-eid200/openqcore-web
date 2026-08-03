"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* ─── Types ───────────────────────────────────────────────────────────────── */

type SectionId =
  | "introduction" | "who_we_are" | "eligibility" | "account_registration"
  | "acceptable_use" | "prohibited_activities" | "customer_content"
  | "confidentiality" | "ai_services" | "customer_responsibility"
  | "intellectual_property" | "privacy" | "security" | "third_party"
  | "payments" | "availability" | "termination" | "disclaimers"
  | "liability" | "no_professional_advice" | "changes" | "governing_law"
  | "contact";

/* ─── Sidebar nav items ───────────────────────────────────────────────────── */

const navItems: { id: SectionId }[] = [
  { id: "introduction" },
  { id: "who_we_are" },
  { id: "eligibility" },
  { id: "account_registration" },
  { id: "acceptable_use" },
  { id: "prohibited_activities" },
  { id: "customer_content" },
  { id: "confidentiality" },
  { id: "ai_services" },
  { id: "customer_responsibility" },
  { id: "intellectual_property" },
  { id: "privacy" },
  { id: "security" },
  { id: "third_party" },
  { id: "payments" },
  { id: "availability" },
  { id: "termination" },
  { id: "disclaimers" },
  { id: "liability" },
  { id: "no_professional_advice" },
  { id: "changes" },
  { id: "governing_law" },
  { id: "contact" }
];

/* ─── Shared styles ───────────────────────────────────────────────────────── */

const wrap     = "mx-auto w-full max-w-[1440px] px-6 lg:px-8";
const prose    = "text-[15px] leading-[1.85] text-slate-300";
const proseSm  = "text-sm leading-[1.85] text-slate-400";
const h2Style  = "text-xl font-bold text-[#f1f5f9] scroll-mt-32";
const divider  = "my-10 border-t border-white/[0.05]";

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

function WarnBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-[16px] border border-[#d4af37]/18 bg-[#d4af37]/[0.05] px-5 py-4">
      <p className="text-sm font-medium leading-7 text-[#f3d98a]">{children}</p>
    </div>
  );
}

/* Distinct from WarnBox: reserved for the single most important
   liability disclaimer on the page (no professional advice), so it
   visually stands apart from the general gold accent used elsewhere. */
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
   button markup ~23 times. */
function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 className={`${h2Style} group flex items-center`}>
      {children}
      <CopyLinkButton sectionId={id} />
    </h2>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function TermsPage() {
  const t = useTranslations("terms_page");
  const [activeId, setActiveId] = useState<SectionId>("introduction");
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

  /* ── IntersectionObserver for active section ── */
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id as SectionId);
          }
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
          <div className="absolute left-[10%] top-[-10%] h-[400px] w-[600px] rounded-full bg-[radial-gradient(ellipse,rgba(212,175,55,0.08),transparent_60%)]" />
          <div className="absolute right-0 top-[20%] h-[300px] w-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(59,130,246,0.05),transparent_60%)]" />
        </div>

        <div className={`${wrap} pb-14 pt-32 md:pt-40`}>
          <SectionLabel>{t("hero.kicker")}</SectionLabel>
          <h1 className="mt-5 text-[clamp(2rem,4.5vw,3.6rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-white">
            {t("hero.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-400">
            {t("hero.desc")}
          </p>

          {/* meta row */}
          <div className="mt-7 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.03] px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
              <span className="text-[11px] font-semibold text-slate-400">
                {t("hero.effective_label")}:&nbsp;
                <span className="text-[#f3d98a]">{t("hero.effective_date")}</span>
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-500">{t("hero.reading_time")}</span>
            <Link
              href="mailto:legal@openqcore.com"
              className="text-sm font-medium text-slate-500 transition-colors hover:text-[#d4af37]"
            >
              legal@openqcore.com
            </Link>
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

      {/* ━━━ MAIN LAYOUT: SIDEBAR + CONTENT ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className={`${wrap} py-16`}>
        <div className="flex gap-14 xl:gap-20">

          {/* ── STICKY SIDEBAR ── */}
          <aside className="hidden lg:block">
            <nav className="sticky top-28 w-[260px] xl:w-[280px]">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                {t("sidebar.label")}
              </p>
              <ul className="space-y-0.5">
                {navItems.map((item, index) => {
                  const isActive = activeId === item.id;
                  return (
                    <li key={item.id} className="relative">
                      {isActive && (
                        <motion.div
                          layoutId="terms-sidebar-active"
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

              {/* sidebar footer */}
              <div className="mt-8 rounded-[14px] border border-white/[0.06] bg-[#0b1222] p-4">
                <p className="text-[11px] font-semibold text-slate-500">{t("sidebar.questions")}</p>
                <a
                  href="mailto:legal@openqcore.com"
                  className="mt-2 block text-[12px] font-medium text-[#d4af37] transition-colors hover:text-[#f3d98a]"
                >
                  legal@openqcore.com
                </a>
              </div>
            </nav>
          </aside>

          {/* ── CONTENT ── */}
          <div className="min-w-0 flex-1">
            <div className="max-w-[780px] space-y-0">

              {/* INTRODUCTION */}
              <section id="introduction" className="scroll-mt-32 pb-10">
                <SectionHeading id="introduction">{t("sections.introduction.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.introduction.p1")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.introduction.p2")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.introduction.p3")}</p>
              </section>
              <div className={divider} />

              {/* WHO WE ARE */}
              <section id="who_we_are" className="scroll-mt-32 pb-10">
                <SectionHeading id="who_we_are">{t("sections.who_we_are.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.who_we_are.p1")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.who_we_are.p2")}</p>
              </section>
              <div className={divider} />

              {/* ELIGIBILITY */}
              <section id="eligibility" className="scroll-mt-32 pb-10">
                <SectionHeading id="eligibility">{t("sections.eligibility.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.eligibility.p1")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.eligibility.p2")}</p>
              </section>
              <div className={divider} />

              {/* ACCOUNT REGISTRATION */}
              <section id="account_registration" className="scroll-mt-32 pb-10">
                <SectionHeading id="account_registration">{t("sections.account_registration.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.account_registration.p1")}</p>
                <BulletList items={[
                  t("sections.account_registration.items.credentials"),
                  t("sections.account_registration.items.access"),
                  t("sections.account_registration.items.activities"),
                  t("sections.account_registration.items.notify"),
                ]} />
                <p className={`mt-5 ${prose}`}>{t("sections.account_registration.p2")}</p>
              </section>
              <div className={divider} />

              {/* ACCEPTABLE USE */}
              <section id="acceptable_use" className="scroll-mt-32 pb-10">
                <SectionHeading id="acceptable_use">{t("sections.acceptable_use.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.acceptable_use.p1")}</p>
                <BulletList items={[
                  t("sections.acceptable_use.items.laws"),
                  t("sections.acceptable_use.items.standards"),
                  t("sections.acceptable_use.items.contractual"),
                  t("sections.acceptable_use.items.terms"),
                ]} />
                <p className={`mt-5 ${prose}`}>{t("sections.acceptable_use.p2")}</p>
              </section>
              <div className={divider} />

              {/* PROHIBITED ACTIVITIES */}
              <section id="prohibited_activities" className="scroll-mt-32 pb-10">
                <SectionHeading id="prohibited_activities">{t("sections.prohibited_activities.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.prohibited_activities.intro")}</p>
                <BulletList items={[
                  t("sections.prohibited_activities.items.illegal"),
                  t("sections.prohibited_activities.items.unauthorized_access"),
                  t("sections.prohibited_activities.items.circumvent"),
                  t("sections.prohibited_activities.items.reverse_engineer"),
                  t("sections.prohibited_activities.items.malware"),
                  t("sections.prohibited_activities.items.interfere"),
                  t("sections.prohibited_activities.items.misrepresent"),
                  t("sections.prohibited_activities.items.ip_violation"),
                  t("sections.prohibited_activities.items.law_violation"),
                ]} />
              </section>
              <div className={divider} />

              {/* CUSTOMER CONTENT */}
              <section id="customer_content" className="scroll-mt-32 pb-10">
                <SectionHeading id="customer_content">{t("sections.customer_content.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.customer_content.p1")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.customer_content.p2")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.customer_content.p3")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.customer_content.p4")}</p>
              </section>
              <div className={divider} />

              {/* CONFIDENTIALITY */}
              <section id="confidentiality" className="scroll-mt-32 pb-10">
                <SectionHeading id="confidentiality">{t("sections.confidentiality.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.confidentiality.p1")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.confidentiality.p2")}</p>
                <BulletList items={[
                  t("sections.confidentiality.items.public"),
                  t("sections.confidentiality.items.lawful_source"),
                  t("sections.confidentiality.items.independent"),
                  t("sections.confidentiality.items.legal_disclosure"),
                ]} />
              </section>
              <div className={divider} />

              {/* AI SERVICES */}
              <section id="ai_services" className="scroll-mt-32 pb-10">
                <SectionHeading id="ai_services">{t("sections.ai_services.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.ai_services.p1")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.ai_services.p2")}</p>
                <BulletList items={[
                  t("sections.ai_services.items.inaccuracies"),
                  t("sections.ai_services.items.not_unique"),
                  t("sections.ai_services.items.may_change"),
                  t("sections.ai_services.items.not_advice"),
                ]} />
                <p className={`mt-5 ${prose}`}>{t("sections.ai_services.p3")}</p>
                <WarnBox>{t("sections.ai_services.warn")}</WarnBox>
              </section>
              <div className={divider} />

              {/* CUSTOMER RESPONSIBILITY */}
              <section id="customer_responsibility" className="scroll-mt-32 pb-10">
                <SectionHeading id="customer_responsibility">{t("sections.customer_responsibility.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.customer_responsibility.p1")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.customer_responsibility.p2")}</p>
                <WarnBox>{t("sections.customer_responsibility.warn")}</WarnBox>
              </section>
              <div className={divider} />

              {/* INTELLECTUAL PROPERTY */}
              <section id="intellectual_property" className="scroll-mt-32 pb-10">
                <SectionHeading id="intellectual_property">{t("sections.intellectual_property.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.intellectual_property.p1")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.intellectual_property.p2")}</p>
                <BulletList items={[
                  t("sections.intellectual_property.items.copy"),
                  t("sections.intellectual_property.items.modify"),
                  t("sections.intellectual_property.items.redistribute"),
                  t("sections.intellectual_property.items.resell"),
                  t("sections.intellectual_property.items.reverse"),
                  t("sections.intellectual_property.items.derivative"),
                ]} />
              </section>
              <div className={divider} />

              {/* PRIVACY */}
              <section id="privacy" className="scroll-mt-32 pb-10">
                <SectionHeading id="privacy">{t("sections.privacy.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.privacy.p1")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.privacy.p2")}</p>
              </section>
              <div className={divider} />

              {/* SECURITY */}
              <section id="security" className="scroll-mt-32 pb-10">
                <SectionHeading id="security">{t("sections.security.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.security.p1")}</p>
                <BulletList items={[
                  t("sections.security.items.access_control"),
                  t("sections.security.items.auth"),
                  t("sections.security.items.infra"),
                  t("sections.security.items.monitoring"),
                  t("sections.security.items.data_protection"),
                  t("sections.security.items.resilience"),
                  t("sections.security.items.incident_response"),
                ]} />
                <p className={`mt-5 ${prose}`}>{t("sections.security.p2")}</p>
              </section>
              <div className={divider} />

              {/* THIRD PARTY */}
              <section id="third_party" className="scroll-mt-32 pb-10">
                <SectionHeading id="third_party">{t("sections.third_party.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.third_party.p1")}</p>
                <BulletList items={[
                  t("sections.third_party.items.availability"),
                  t("sections.third_party.items.performance"),
                  t("sections.third_party.items.security"),
                  t("sections.third_party.items.policies"),
                  t("sections.third_party.items.actions"),
                ]} />
                <p className={`mt-5 ${prose}`}>{t("sections.third_party.p2")}</p>
              </section>
              <div className={divider} />

              {/* PAYMENTS */}
              <section id="payments" className="scroll-mt-32 pb-10">
                <SectionHeading id="payments">{t("sections.payments.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.payments.p1")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.payments.p2")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.payments.p3")}</p>
              </section>
              <div className={divider} />

              {/* AVAILABILITY */}
              <section id="availability" className="scroll-mt-32 pb-10">
                <SectionHeading id="availability">{t("sections.availability.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.availability.p1")}</p>
                <BulletList items={[
                  t("sections.availability.items.maintenance"),
                  t("sections.availability.items.security_events"),
                  t("sections.availability.items.infra_failures"),
                  t("sections.availability.items.network"),
                  t("sections.availability.items.third_party"),
                  t("sections.availability.items.force_majeure"),
                ]} />
                <p className={`mt-5 ${prose}`}>{t("sections.availability.p2")}</p>
              </section>
              <div className={divider} />

              {/* TERMINATION */}
              <section id="termination" className="scroll-mt-32 pb-10">
                <SectionHeading id="termination">{t("sections.termination.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.termination.p1")}</p>
                <BulletList items={[
                  t("sections.termination.items.violations"),
                  t("sections.termination.items.fraud"),
                  t("sections.termination.items.legal"),
                  t("sections.termination.items.security"),
                  t("sections.termination.items.risk"),
                  t("sections.termination.items.payment"),
                ]} />
                <p className={`mt-5 ${prose}`}>{t("sections.termination.p2")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.termination.p3")}</p>
              </section>
              <div className={divider} />

              {/* DISCLAIMERS */}
              <section id="disclaimers" className="scroll-mt-32 pb-10">
                <SectionHeading id="disclaimers">{t("sections.disclaimers.title")}</SectionHeading>
                <div className="mt-4 rounded-[16px] border border-white/[0.07] bg-[#0b1222] px-6 py-5">
                  <p className="text-sm font-semibold uppercase leading-7 tracking-[0.04em] text-slate-300">
                    {t("sections.disclaimers.text")}
                  </p>
                </div>
              </section>
              <div className={divider} />

              {/* LIABILITY */}
              <section id="liability" className="scroll-mt-32 pb-10">
                <SectionHeading id="liability">{t("sections.liability.title")}</SectionHeading>
                <div className="mt-4 rounded-[16px] border border-white/[0.07] bg-[#0b1222] px-6 py-5">
                  <p className="text-sm font-semibold uppercase leading-7 tracking-[0.04em] text-slate-300">
                    {t("sections.liability.text")}
                  </p>
                </div>
              </section>
              <div className={divider} />

              {/* NO PROFESSIONAL ADVICE */}
              <section id="no_professional_advice" className="scroll-mt-32 pb-10">
                <SectionHeading id="no_professional_advice">{t("sections.no_professional_advice.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.no_professional_advice.p1")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.no_professional_advice.p2")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.no_professional_advice.p3")}</p>
                <Callout label={t("sections.no_professional_advice.callout_label")}>
                  {t("sections.no_professional_advice.warn")}
                </Callout>
              </section>
              <div className={divider} />

              {/* CHANGES */}
              <section id="changes" className="scroll-mt-32 pb-10">
                <SectionHeading id="changes">{t("sections.changes.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.changes.p1")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.changes.p2")}</p>
              </section>
              <div className={divider} />

              {/* GOVERNING LAW */}
              <section id="governing_law" className="scroll-mt-32 pb-10">
                <SectionHeading id="governing_law">{t("sections.governing_law.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.governing_law.p1")}</p>
                <p className={`mt-3 ${prose}`}>{t("sections.governing_law.p2")}</p>
              </section>
              <div className={divider} />

              {/* CONTACT */}
              <section id="contact" className="scroll-mt-32 pb-10">
                <SectionHeading id="contact">{t("sections.contact.title")}</SectionHeading>
                <p className={`mt-4 ${prose}`}>{t("sections.contact.p1")}</p>
                <a
                  href="mailto:legal@openqcore.com"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#d4af37] px-5 py-3 text-sm font-semibold !text-[#0B1F3B] shadow-[0_6px_20px_rgba(212,175,55,0.2)] transition-all hover:scale-[1.02] hover:!text-[#0B1F3B] visited:!text-[#0B1F3B]"
                >
                  <span className="!text-[#0B1F3B]">legal@openqcore.com</span>
                  <svg className="h-4 w-4 !text-[#0B1F3B]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </section>

              {/* ── PAGE FOOTER SIGNATURE ── */}
              <div className="mt-16 border-t border-white/[0.05] pt-10">
                <div className="flex flex-col items-center gap-4 text-center">
                  {/* mini logo mark */}
                  <div className="flex items-center gap-2 opacity-60">
                    <Image
                      src="/oqc-logo.png"
                      alt="OpenQCore"
                      width={60}
                      height={60}
                      className="h-12 w-auto object-contain"
                    />

                    <span className="text-[15px] font-extrabold tracking-[-0.02em] text-white/60">
                      OpenQCore <span className="text-[#d4af37]/60">AI</span>
                    </span>
                  </div>

                  <p className="text-[12px] leading-6 text-slate-600">
                    {t("footer_sig.line1")}
                  </p>
                  <p className="text-[11px] text-slate-700">
                    {t("footer_sig.line2")}
                  </p>

                  <div className="mt-2 flex items-center gap-5">

                  </div>
                </div>
              </div>

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