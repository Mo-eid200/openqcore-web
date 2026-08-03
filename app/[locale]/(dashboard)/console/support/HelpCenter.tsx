"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, FileText } from "lucide-react";
import type { HelpSection } from "./types";

export default function HelpCenter({
  sections,
}: {
  sections: HelpSection[];
}) {
  if (!sections?.length) {
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
            <FileText className="h-5 w-5 text-white/22" />
          </div>

          <p className="text-sm text-white/35">
            No help articles yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-3">
      {sections.map((s, idx) => (
        <motion.article
          key={s.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, delay: idx * 0.04 }}
          className="
            relative overflow-hidden rounded-2xl
            border border-white/[0.06]
            bg-[#0f1012]/92 p-5
            shadow-[0_12px_30px_rgba(0,0,0,0.14)]
            backdrop-blur-xl
          "
        >
          {/* Atmosphere */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute right-[-35px] top-[-40px] h-[100px] w-[100px] rounded-full bg-amber-300/[0.03] blur-[65px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.02),transparent_36%)]" />
          </div>

          <div className="relative mb-3 flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-300/10 bg-amber-300/[0.08]">
              <BookOpen className="h-4 w-4 text-amber-300" />
            </div>

            <h3 className="text-base font-semibold text-white">
              {s.title}
            </h3>
          </div>

          <div className="relative pl-12 text-sm leading-7 text-white/48">
            {s.content}
          </div>
        </motion.article>
      ))}
    </section>
  );
}