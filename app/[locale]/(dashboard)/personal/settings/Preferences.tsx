import React from "react";
import type { PreferencesData } from "./types";

export default function Preferences({
    value,
    onChange
}: {
    value: PreferencesData;
    onChange: (v: PreferencesData) => void;
}) {
    return (
        <div className="rounded-2xl border border-amber-400/15 bg-[#181106]/75 p-5 shadow mb-8">
            <div className="font-bold text-amber-200 mb-4">Preferences</div>
            <div className="flex gap-10 flex-wrap mb-4 items-center">
                <label className="flex items-center gap-2 text-amber-100/90">
                    Language:
                    <select
                        className="rounded bg-[#191106] px-2 py-1 text-sm text-white border border-amber-400/20"
                        value={value.language}
                        onChange={e => onChange({ ...value, language: e.target.value })}
                    >
                        <option value="en">English</option>
                        <option value="ar">العربية</option>
                        <option value="fr">Français</option>
                    </select>
                </label>
            </div>
            <div className="flex flex-wrap gap-8 mb-6">
                <label className="flex items-center gap-2 text-amber-100/90">
                    <input
                        type="checkbox"
                        checked={value.notifications}
                        onChange={e => onChange({ ...value, notifications: e.target.checked })}
                        className="accent-amber-400 w-5 h-5"
                    />
                    Email Notifications
                </label>
                <label className="flex items-center gap-2 text-amber-100/90">
                    <input
                        type="checkbox"
                        checked={value.aiSuggestions}
                        onChange={e => onChange({ ...value, aiSuggestions: e.target.checked })}
                        className="accent-amber-400 w-5 h-5"
                    />
                    AI Suggestions
                </label>
                <label className="flex items-center gap-2 text-amber-100/90">
                    <input
                        type="checkbox"
                        checked={value.compactMode}
                        onChange={e => onChange({ ...value, compactMode: e.target.checked })}
                        className="accent-amber-400 w-5 h-5"
                    />
                    Compact Mode
                </label>
            </div>
        </div>
    );
}