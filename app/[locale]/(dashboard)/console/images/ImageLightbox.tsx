"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Download,
  ExternalLink,
  Copy,
  CheckCheck,
} from "lucide-react";
import type { ImageItem } from "./types";

type Props = {
  item: ImageItem | null;
  onClose: () => void;
};

export default function ImageLightbox({ item, onClose }: Props) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Escape to close
  useEffect(() => {
    if (!item) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [item, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (!item) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [item]);

  function handleCopyPrompt() {
    if (!item) return;
    navigator.clipboard.writeText(item.prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="
              absolute right-4 top-4 z-10 flex h-10 w-10
              items-center justify-center rounded-full
              border border-white/10 bg-white/[0.06]
              text-white/70 backdrop-blur-xl
              transition-all hover:bg-white/[0.12] hover:text-white
            "
          >
            <X className="h-4.5 w-4.5" />
          </button>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[90vh] w-full max-w-4xl flex-col items-center gap-4"
          >
            {/* Image */}
            <div className="relative flex max-h-[72vh] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
              {item.output_url && (
                <img
                  src={item.output_url}
                  alt={item.prompt}
                  className="max-h-[72vh] w-auto max-w-full object-contain"
                />
              )}
            </div>

            {/* Info bar */}
            <div
              className="
                flex w-full max-w-2xl flex-col gap-3 rounded-2xl
                border border-white/[0.08] bg-[#0f1012]/92 px-4 py-3
                backdrop-blur-2xl
              "
            >
              <div className="flex items-start gap-2">
                <p className="flex-1 text-sm leading-relaxed text-white/75">
                  {item.prompt}
                </p>

                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white/30 transition-all hover:bg-white/[0.06] hover:text-white/70"
                  title="Copy prompt"
                >
                  {copied ? (
                    <CheckCheck className="h-3.5 w-3.5 text-emerald-300" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2 border-t border-white/[0.06] pt-3">
                {item.output_url && (
                  <>
                    <a
                      href={item.output_url}
                      download
                      className="
                        flex h-9 flex-1 items-center justify-center gap-1.5
                        rounded-xl border border-white/[0.08] bg-white/[0.03]
                        text-xs font-medium text-white/70
                        transition-all hover:bg-white/[0.06] hover:text-white
                      "
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </a>

                    <a
                      href={item.output_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex h-9 flex-1 items-center justify-center gap-1.5
                        rounded-xl border border-white/[0.08] bg-white/[0.03]
                        text-xs font-medium text-white/70
                        transition-all hover:bg-white/[0.06] hover:text-white
                      "
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Open Original
                    </a>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}