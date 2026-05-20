"use client";
import React from "react";
import { SecurityOverview } from "./SecurityOverview";
import { ActiveSessions } from "./ActiveSessions";
import { ApiSecurity } from "./ApiSecurity";
import { AccessLogs } from "./AccessLogs";
import { ThreatAlerts } from "./ThreatAlerts";
import { MFASettings } from "./MFASettings";

export default function SecurityPage() {
    return (
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-8 pb-14 flex flex-col gap-10">
            <div className="mb-2">
                <h1 className="text-2xl font-bold text-white mb-1">Security</h1>
                <p className="text-slate-400 mb-2">
                    Sessions, logs, API security measures, alerts and authentication.
                </p>
            </div>
            <SecurityOverview />
            <ActiveSessions />
            <ApiSecurity />
            <AccessLogs />
            <ThreatAlerts />
            <MFASettings />
        </div>
    );
}