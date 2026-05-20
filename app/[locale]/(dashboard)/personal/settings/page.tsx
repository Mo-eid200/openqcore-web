"use client";
import React, { useState } from "react";
import AppearanceSettings from "./AppearanceSettings";
import SecuritySettings from "./SecuritySettings";
import Preferences from "./Preferences";
import type { AppearanceSettingsData, SecuritySettingsData, PreferencesData } from "./types";

const MOCK_APP: AppearanceSettingsData = {
    theme: "system",
    accentColor: "#facc15",
    fontSize: "normal"
};
const MOCK_SEC: SecuritySettingsData = {
    passwordSet: true,
    twoFactorEnabled: false,
    lastPasswordChange: new Date(Date.now() - 864e5 * 91).toISOString(),
    devices: [
        { id: "1", name: "Chrome (Windows)", lastActive: new Date(Date.now() - 864e5 * 2).toISOString() },
        { id: "2", name: "iPhone", lastActive: new Date(Date.now() - 864e5 * 8).toISOString() }
    ]
};
const MOCK_PREF: PreferencesData = {
    language: "en",
    notifications: true,
    aiSuggestions: true,
    compactMode: false
};

export default function SettingsPage() {
    const [app, setApp] = useState(MOCK_APP);
    const [sec, setSec] = useState(MOCK_SEC);
    const [pref, setPref] = useState(MOCK_PREF);

    function handlePasswordChange() {
        alert("Password modal (demo)");
        setSec(s => ({ ...s, lastPasswordChange: new Date().toISOString() }));
    }
    function handleToggle2FA() {
        setSec(s => ({ ...s, twoFactorEnabled: !s.twoFactorEnabled }));
    }
    function handleSignoutDevice(id: string) {
        setSec(s => ({ ...s, devices: s.devices.filter(d => d.id !== id) }));
    }

    return (
        <div className="w-full max-w-4xl mx-auto min-h-screen px-2 sm:px-8 py-10 flex flex-col gap-8">
            <div>
                <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
                <p className="text-xs text-amber-100/70">
                    Customize your workspace, improve privacy, and tailor the AI to your taste.
                </p>
            </div>
            <AppearanceSettings value={app} onChange={setApp} />
            <SecuritySettings
                value={sec}
                onPasswordChange={handlePasswordChange}
                onToggle2FA={handleToggle2FA}
                onSignOutDevice={handleSignoutDevice}
            />
            <Preferences value={pref} onChange={setPref} />
        </div>
    );
}