"use client";
import React from "react";
import { GeneralSettings } from "./GeneralSettings";
import { ChangePasswordSettings } from "./ChangePasswordSettings";
import { SettingsQuickLinks } from "./SettingsQuickLinks";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div className="animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-8 pb-14 flex flex-col gap-6">
      <FadeIn delay={0}>
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
          <p className="text-white/40">
            Manage your workspace profile, password, and quick access to team and security.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={80}>
        <GeneralSettings />
      </FadeIn>

      <FadeIn delay={160}>
        <ChangePasswordSettings />
      </FadeIn>

      <FadeIn delay={240}>
        <SettingsQuickLinks />
      </FadeIn>
    </div>
  );
}