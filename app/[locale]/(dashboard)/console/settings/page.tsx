"use client";

import React from "react";
import { Shield, Sparkles } from "lucide-react";
import SecuritySettings from "./SecuritySettings";

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div
      className="animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-3 py-8 sm:px-6 xl:px-10">
      <FadeIn delay={0}>
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-amber-300/80">
              <Sparkles className="h-3.5 w-3.5" />
              Account Preferences
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white lg:text-3xl">
                Settings
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/45">
                Manage your account security, password settings, active
                sessions, and authentication preferences in one place.
              </p>
            </div>
          </div>

          <div
            className="
              flex items-center gap-2 rounded-2xl
              border border-white/[0.06]
              bg-[#0f1012]/92 px-3.5 py-2.5
              shadow-[0_8px_24px_rgba(0,0,0,0.14)]
              backdrop-blur-xl
            "
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-300/10 bg-amber-300/[0.08]">
              <Shield className="h-4 w-4 text-amber-300/70" />
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-wide text-white/30">
                Focus
              </div>
              <div className="text-sm font-bold text-white">
                Security
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={80}>
        <section className="flex flex-col gap-3">
          <div>
            <h2 className="text-sm font-semibold text-white">
              Security Controls
            </h2>
            <p className="mt-1 text-xs leading-5 text-white/38">
              Update your password, configure multi-factor authentication, and
              review active sessions across your account.
            </p>
          </div>

          <SecuritySettings />
        </section>
      </FadeIn>
    </div>
  );
}