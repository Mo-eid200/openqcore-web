"use client";
import React from "react";
import { GeneralSettings } from "./GeneralSettings";
import { TeamSettings } from "./TeamSettings";
import { SecuritySettings } from "./SecuritySettings";
import { NotificationSettings } from "./NotificationSettings";
import { ApiAccessSettings } from "./ApiAccessSettings";

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-8 pb-14 flex flex-col gap-10">
            <div className="mb-2">
                <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
                <p className="text-slate-400 mb-2">
                    Manage workspace profile, users, security and integrations.
                </p>
            </div>
            <GeneralSettings />
            <TeamSettings />
            <SecuritySettings />
            <NotificationSettings />
            <ApiAccessSettings />
        </div>
    );
}