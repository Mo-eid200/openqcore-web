"use client";

import React from "react";
import { SecurityOverview } from "./SecurityOverview";
import { ActiveSessions } from "./ActiveSessions";
import { ApiSecurity } from "./ApiSecurity";
import { AccessLogs } from "./AccessLogs";
import { ThreatAlerts } from "./ThreatAlerts";
import { MFASettings } from "./MFASettings";

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div className="animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function SecurityPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 pb-14 pt-8 sm:px-6">
      <FadeIn delay={0}>
        <div className="mb-2">
          <h1 className="mb-1 text-2xl font-bold text-white">Security</h1>
          <p className="mb-2 text-slate-400">
            Sessions, logs, API security measures, alerts and authentication.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={80}>
        <SecurityOverview />
      </FadeIn>

      <FadeIn delay={140}>
        <ActiveSessions />
      </FadeIn>

      <FadeIn delay={200}>
        <ApiSecurity />
      </FadeIn>

      <FadeIn delay={260}>
        <AccessLogs />
      </FadeIn>

      <FadeIn delay={320}>
        <ThreatAlerts />
      </FadeIn>

      <FadeIn delay={380}>
        <MFASettings />
      </FadeIn>
    </div>
  );
}