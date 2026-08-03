"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { createSupportTicket, type SupportDepartment } from "@/app/lib/api/support/support.api";
import { useApp } from "../../../../../context/AppContext";
import AuthModal from "../../../components/AuthModal";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function SupportPage() {
  const t = useTranslations("support_page");
  const { user } = useApp();

  const [form, setForm] = useState({
    department: "general" as SupportDepartment,
    subject: "",
    message: "",
  });

  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [ticketNumber, setTicketNumber] = useState("");
  const [authOpen, setAuthOpen] = useState(false);

  const onChange =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitState === "submitting") return;

    // 🔧 FIX: the backend requires an authenticated user
    // (Depends(get_current_user_any)) — previously an unauthenticated
    // visitor would just hit a raw 401 with a confusing generic error.
    // Now they get the same login modal used elsewhere on the site
    // (LiveAISection uses the identical pattern), so the flow is:
    // try to submit -> prompted to log in -> log in -> submit again.
    if (!user) {
      setAuthOpen(true);
      return;
    }

    setSubmitState("submitting");

    try {
      const result = await createSupportTicket(form);
      setTicketNumber(result.ticket_number);
      setSubmitState("success");
      setForm({ department: "general", subject: "", message: "" });
    } catch (err) {
      console.error("[SupportPage] Submit failed:", err);
      setErrorMessage(err instanceof Error ? err.message : t("form.error_desc"));
      setSubmitState("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#04070f] text-white">
      {/* HERO */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d4af37]">
            {t("hero.kicker")}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-[-0.03em] md:text-5xl">{t("hero.title")}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{t("hero.desc")}</p>
        </div>
      </section>

      {/* 3 SUPPORT CARDS */}
      <section className="border-b border-white/10 bg-[#060b16]">
        <div className="mx-auto max-w-[1200px] px-6 py-16 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-white/10 bg-[#0b1222] p-6">
              <h2 className="text-xl font-semibold">{t("cards.technical.title")}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-300">{t("cards.technical.desc")}</p>
            </article>

            <article className="rounded-2xl border border-white/10 bg-[#0b1222] p-6">
              <h2 className="text-xl font-semibold">{t("cards.billing.title")}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-300">{t("cards.billing.desc")}</p>
            </article>

            <article className="rounded-2xl border border-amber-300/25 bg-amber-400/[0.07] p-6">
              <h2 className="text-xl font-semibold">{t("cards.incident.title")}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-200">{t("cards.incident.desc")}</p>
            </article>
          </div>
        </div>
      </section>

      {/* SELF-SERVICE */}
      <section className="border-b border-white/10 bg-[#050911]">
        <div className="mx-auto max-w-[1200px] px-6 py-16 lg:px-8">
          <h3 className="text-2xl font-bold tracking-[-0.02em]">{t("self_service.title")}</h3>
          <p className="mt-3 text-slate-400">{t("self_service.desc")}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/docs" className="rounded-2xl border border-white/10 bg-[#0b1222] p-5 hover:border-white/20">
              <p className="font-semibold">{t("self_service.docs.title")}</p>
              <p className="mt-1 text-sm text-slate-400">{t("self_service.docs.desc")}</p>
            </Link>

            <Link href="/status" className="rounded-2xl border border-white/10 bg-[#0b1222] p-5 hover:border-white/20">
              <p className="font-semibold">{t("self_service.status.title")}</p>
              <p className="mt-1 text-sm text-slate-400">{t("self_service.status.desc")}</p>
            </Link>

            <Link href="/changelog" className="rounded-2xl border border-white/10 bg-[#0b1222] p-5 hover:border-white/20">
              <p className="font-semibold">{t("self_service.changelog.title")}</p>
              <p className="mt-1 text-sm text-slate-400">{t("self_service.changelog.desc")}</p>
            </Link>

            <Link href="/known-issues" className="rounded-2xl border border-white/10 bg-[#0b1222] p-5 hover:border-white/20">
              <p className="font-semibold">{t("self_service.issues.title")}</p>
              <p className="mt-1 text-sm text-slate-400">{t("self_service.issues.desc")}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="bg-[#060b16]">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-16 lg:grid-cols-3 lg:px-8">
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-[#0b1222] p-6 md:p-8">
            <h3 className="text-2xl font-bold tracking-[-0.02em]">{t("form.title")}</h3>
            <p className="mt-2 text-slate-400">{t("form.desc")}</p>

            {submitState === "success" ? (
              <div className="mt-8 rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.06] p-6">
                <p className="text-lg font-semibold text-emerald-300">{t("form.success_title")}</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">{t("form.success_desc")}</p>
                <p className="mt-3 text-sm font-semibold text-[#f3d98a]">
                  {t("form.ticket_number_label")}: {ticketNumber}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitState("idle")}
                  className="mt-4 text-sm font-semibold text-[#d4af37] hover:text-[#f3d98a]"
                >
                  {t("form.submit_another")}
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">{t("form.category")}</label>
                  <select
                    value={form.department}
                    onChange={onChange("department")}
                    className="w-full rounded-xl border border-white/15 bg-[#0b1222] px-4 py-3 text-sm text-white outline-none focus:border-[#d4af37]/50"
                  >
                    <option value="general">{t("form.categories.general")}</option>
                    <option value="technical">{t("form.categories.technical")}</option>
                    <option value="billing">{t("form.categories.billing")}</option>
                    <option value="sales">{t("form.categories.sales")}</option>
                    <option value="security">{t("form.categories.security")}</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">{t("form.subject")}</label>
                  <input
                    type="text"
                    required
                    minLength={3}
                    maxLength={200}
                    value={form.subject}
                    onChange={onChange("subject")}
                    className="w-full rounded-xl border border-white/15 bg-white/[0.02] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#d4af37]/50"
                    placeholder={t("form.subject_placeholder")}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">{t("form.description")}</label>
                  <textarea
                    required
                    minLength={10}
                    maxLength={5000}
                    rows={6}
                    value={form.message}
                    onChange={onChange("message")}
                    className="w-full rounded-xl border border-white/15 bg-white/[0.02] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#d4af37]/50"
                    placeholder={t("form.description_placeholder")}
                  />
                </div>

                {submitState === "error" && (
                  <div className="rounded-xl border border-red-400/25 bg-red-400/[0.06] px-4 py-3 text-sm text-red-200">
                    {errorMessage}{" "}
                    <a href="mailto:support@openqcore.com" className="underline hover:text-white">
                      support@openqcore.com
                    </a>
                  </div>
                )}

                {!user && (
                  <p className="text-xs text-slate-500">{t("form.login_required_hint")}</p>
                )}

                <button
                  type="submit"
                  disabled={submitState === "submitting"}
                  className="inline-flex items-center rounded-xl bg-[#d4af37] px-6 py-3 text-sm font-bold text-[#111827] shadow-[0_8px_24px_rgba(212,175,55,0.28)] transition hover:brightness-105 disabled:opacity-60"
                >
                  {submitState === "submitting"
                    ? t("form.submitting")
                    : !user
                    ? t("form.login_to_submit")
                    : t("form.submit")}
                </button>
              </form>
            )}
          </div>

          <aside className="rounded-3xl border border-amber-300/25 bg-amber-400/[0.06] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">{t("urgent.kicker")}</p>
            <h4 className="mt-3 text-2xl font-bold">{t("urgent.title")}</h4>
            <p className="mt-3 text-sm leading-7 text-slate-200">{t("urgent.desc")}</p>

            <a
              href="mailto:incident@openqcore.com"
              className="mt-5 inline-flex rounded-xl border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-200 hover:bg-amber-300/15"
            >
              incident@openqcore.com
            </a>
          </aside>
        </div>
      </section>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={() => setAuthOpen(false)}
      />
    </main>
  );
}