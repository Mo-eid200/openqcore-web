"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

type Item = { src: string; alt: string };

export default function Lightbox({
  items,
  index,
  onClose,
}: {
  items: Item[];
  index: number | null;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (index !== null) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose]);

  if (!mounted) return null;
  const active = index !== null ? items[index] : null;

  return createPortal(
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/88 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="relative w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -top-12 end-0 rounded-lg border border-white/25 bg-black/40 px-3 py-1.5 text-sm text-white"
            >
              Close
            </button>

            <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#0b1222]">
              <Image
                src={active.src}
                alt={active.alt}
                width={1800}
                height={1100}
                className="h-auto w-full object-contain"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}