"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CircleHelp } from "lucide-react";
import type { FaqItem } from "./types";

export default function FAQ({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<string | null>(null);

  if (!items?.length) {
    return (
      <section
        className="
          relative overflow-hidden rounded-2xl
          border border-white/[0.06]
          bg-[#0f1012]/92
          shadow-[0_16px_40px_rgba(0,0,0,0.18)]
          backdrop-blur-xl
        "
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-40px] top-[-50px] h-[120px] w-[120px] rounded-full bg-amber-300/[0.04] blur-[70px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.02),transparent_35%)]" />
        </div>

        <div className="relative flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03]">
            <CircleHelp className="h-5 w-5 text-white/22" />
          </div>

          <p className="text-sm text-white/35">No FAQs found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-2.5">
      {items.map((faq, idx) => {
        const isOpen = open === faq.id;

        return (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.15,
              delay: Math.min(idx, 8) * 0.03,
            }}
            className="
              relative overflow-hidden rounded-2xl
              border border-white/[0.06]
              bg-[#0f1012]/92
              shadow-[0_12px_30px_rgba(0,0,0,0.14)]
              backdrop-blur-xl
            "
          >
            {/* Atmosphere */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute right-[-35px] top-[-40px] h-[100px] w-[100px] rounded-full bg-amber-300/[0.03] blur-[65px]" />
            </div>

            <button
              className="relative flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.02]"
              onClick={() => setOpen((o) => (o === faq.id ? null : faq.id))}
            >
              <span className="text-sm font-semibold text-white">
                {faq.question}
              </span>

              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0"
              >
                <ChevronDown className="h-4 w-4 text-amber-300/80" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-white/[0.06] px-5 py-4 text-sm leading-7 text-white/50">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </section>
  );
}