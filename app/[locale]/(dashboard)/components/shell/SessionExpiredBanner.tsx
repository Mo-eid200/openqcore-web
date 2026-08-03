"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence }             from "framer-motion";
import { LogIn, ShieldAlert, X }               from "lucide-react";
import { useAuth }                             from "../../../../context/AuthContext";
import AuthModal                               from "../../../(marketing)/components/AuthModal";

export default function SessionExpiredBanner() {
  const { user, loadingUser } = useAuth();

  const [visible,   setVisible]   = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // ✅ نتذكر إن المستخدم كان logged in عشان نميز بين
  // "مش سجل دخول أصلاً" و "عمل logout unexpectedly"
  const wasLoggedInRef = useRef(false);

  useEffect(() => {
    if (loadingUser) return;

    if (user) {
      wasLoggedInRef.current = true;
      setVisible(false);
      setDismissed(false);
      return;
    }

    // مش logged in - بس نظهر البانر لو كان logged in قبل كده
    if (!user && wasLoggedInRef.current && !dismissed) {
      const t = setTimeout(() => setVisible(true), 400);
      return () => clearTimeout(t);
    }
  }, [user, loadingUser, dismissed]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
  };

  const handleLoginSuccess = () => {
    setLoginOpen(false);
    setVisible(false);
    setDismissed(false);
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="
              fixed bottom-6 left-1/2 z-[9999]
              -translate-x-1/2
              w-[calc(100vw-32px)] max-w-[440px]
            "
          >
            <div className="
              relative overflow-hidden
              rounded-2xl border border-amber-400/15
              bg-[#13100a]/95 backdrop-blur-2xl
              shadow-[0_20px_60px_rgba(0,0,0,0.55),0_0_0_1px_rgba(251,191,36,0.08)]
              px-5 py-4
            ">
              {/* Glow */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.08),transparent_60%)]" />

              {/* Top line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

              <div className="relative flex items-start gap-3.5">
                {/* Icon */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-400/15 bg-amber-400/10 text-amber-300">
                  <ShieldAlert className="h-4 w-4" />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-sm font-semibold text-white">Session Expired</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-white/45">
                    You've been signed out. Sign in again to continue where you left off.
                  </p>

                  <button
                    onClick={() => setLoginOpen(true)}
                    className="
                      mt-3 inline-flex items-center gap-2
                      h-8 rounded-lg bg-amber-400 px-3.5
                      text-xs font-semibold text-black
                      transition-all hover:bg-amber-300 active:scale-[0.98]
                    "
                  >
                    <LogIn className="h-3.5 w-3.5" />
                    Sign in again
                  </button>
                </div>

                {/* Dismiss */}
                <button
                  onClick={handleDismiss}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white/30 transition-all hover:bg-white/[0.06] hover:text-white/60"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ AuthModal مع onSuccess عشان يفضل على نفس الصفحة */}
      <AuthModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
}