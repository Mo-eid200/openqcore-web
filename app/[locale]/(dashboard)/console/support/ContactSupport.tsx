"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  MessageCircle,
  ChevronDown,
  Check,
  Loader2,
} from "lucide-react";
import {
  createSupportTicket,
  type SupportDepartment,
} from "@/app/lib/api/support/support.api";

const DEPARTMENTS: { value: SupportDepartment; label: string }[] = [
  { value: "general", label: "General Support" },
  { value: "billing", label: "Billing & Finance" },
  { value: "technical", label: "Technical / API Issue" },
  { value: "sales", label: "Sales & Enterprise" },
  { value: "security", label: "Security & Compliance" },
];

const cardCls = `
  relative mx-auto w-full max-w-lg overflow-hidden rounded-2xl
  border border-white/[0.06]
  bg-[#0f1012]/92 p-5
  shadow-[0_16px_40px_rgba(0,0,0,0.18)]
  backdrop-blur-xl
`;

const inputCls = `
  w-full rounded-xl border border-white/[0.08]
  bg-white/[0.03] px-3.5 py-2.5
  text-sm text-white outline-none
  placeholder:text-white/20
  transition-all
  focus:border-amber-300/12
  focus:bg-white/[0.05]
  focus:ring-2 focus:ring-amber-300/[0.08]
`;

const primaryBtnCls = `
  inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl
  bg-amber-300 px-5 text-sm font-semibold text-black
  transition-all hover:bg-amber-200
  disabled:cursor-not-allowed disabled:opacity-40
`;

function Banner({
  tone,
  children,
}: {
  tone: "error" | "success";
  children: React.ReactNode;
}) {
  const styles =
    tone === "error"
      ? "border-red-300/15 bg-red-300/[0.06] text-red-200"
      : "border-emerald-300/15 bg-emerald-300/[0.06] text-emerald-200";

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <div className={`rounded-xl border px-3 py-2 text-xs ${styles}`}>
        {children}
      </div>
    </motion.div>
  );
}

export default function ContactSupport() {
  const [department, setDepartment] =
    useState<SupportDepartment>("general");
  const [deptOpen, setDeptOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setTicketNumber(null);
    setSubmitting(true);

    try {
      const result = await createSupportTicket({
        department,
        subject,
        message,
      });

      setTicketNumber(result.ticket_number);
      setSubject("");
      setMessage("");
      setDepartment("general");
      setDeptOpen(false);
    } catch (err: any) {
      setError(err.message || "Failed to submit your request.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className={cardCls}>
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-40px] top-[-50px] h-[120px] w-[120px] rounded-full bg-amber-300/[0.04] blur-[70px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.02),transparent_35%)]" />
      </div>

      <div className="relative mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-300/10 bg-amber-300/[0.08]">
          <MessageCircle className="h-5 w-5 text-amber-300" />
        </div>

        <div>
          <div className="text-base font-semibold text-white">
            Contact Support
          </div>
          <div className="text-xs text-white/35">
            We typically reply within 24 hours
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative flex flex-col gap-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-white/40">
            Department
          </label>

          <div className="relative">
            <button
              type="button"
              onClick={() => setDeptOpen((v) => !v)}
              className={`${inputCls} flex items-center justify-between text-left`}
            >
              <span>
                {DEPARTMENTS.find((d) => d.value === department)?.label}
              </span>

              <ChevronDown
                className={`h-4 w-4 text-white/35 transition-transform ${
                  deptOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {deptOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setDeptOpen(false)}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="
                      absolute left-0 right-0 top-[calc(100%+6px)] z-20 overflow-hidden rounded-xl
                      border border-white/[0.08]
                      bg-[#111214]/98
                      shadow-[0_20px_50px_rgba(0,0,0,0.35)]
                      backdrop-blur-2xl
                    "
                  >
                    {DEPARTMENTS.map((d) => (
                      <button
                        key={d.value}
                        type="button"
                        onClick={() => {
                          setDepartment(d.value);
                          setDeptOpen(false);
                        }}
                        className="flex w-full items-center justify-between px-3.5 py-2.5 text-left text-sm text-white/78 transition hover:bg-white/[0.05]"
                      >
                        <span>{d.label}</span>

                        {department === d.value && (
                          <Check className="h-3.5 w-3.5 text-amber-300" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-white/40">
            Subject
          </label>

          <input
            className={inputCls}
            value={subject}
            required
            onChange={(e) => setSubject(e.target.value)}
            placeholder="What's this about?"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-white/40">
            Message
          </label>

          <textarea
            className={`${inputCls} min-h-[110px] resize-none`}
            value={message}
            required
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us what's going on…"
          />
        </div>

        <AnimatePresence>
          {error && <Banner tone="error">{error}</Banner>}
        </AnimatePresence>

        <AnimatePresence>
          {ticketNumber && (
            <Banner tone="success">
              Your request has been submitted. Reference:{" "}
              <span className="font-mono">{ticketNumber}</span>
            </Banner>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={submitting}
          className={`${primaryBtnCls} mt-1`}
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send
            </>
          )}
        </button>
      </form>
    </section>
  );
}