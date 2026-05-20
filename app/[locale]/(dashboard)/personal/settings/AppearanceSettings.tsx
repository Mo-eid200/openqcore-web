import React from "react";
import type { AppearanceSettingsData } from "./types";

const COLORS = [
    "#facc15", "#38bdf8", "#f472b6", "#34d399", "#f87171", "#a78bfa"
];

export default function AppearanceSettings({
    value,
    onChange
}: {
    value: AppearanceSettingsData;
    onChange: (v: AppearanceSettingsData) => void;
}) {
    return (
        <div className="rounded-2xl border border-amber-400/15 bg-[#191106]/75 p-5 shadow mb-8">
            <div className="font-bold text-amber-200 mb-4">Appearance</div>
            <div className="flex gap-4 flex-wrap items-center mb-4">
                <label className="flex items-center gap-2 text-amber-100/90">
                    Theme:
                    <select
                        className="rounded bg-[#191106] px-2 py-1 text-sm text-white border border-amber-400/20"
                        value={value.theme}
                        onChange={e => onChange({ ...value, theme: e.target.value as any })}
                    >
                        <option value="system">System</option>
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                    </select>
                </label>
                <label className="flex items-center gap-2 text-amber-100/90">
                    Font Size:
                    <select
                        className="rounded bg-[#191106] px-2 py-1 text-sm text-white border border-amber-400/20"
                        value={value.fontSize}
                        onChange={e => onChange({ ...value, fontSize: e.target.value as any })}
                    >
                        <option value="small">Small</option>
                        <option value="normal">Normal</option>
                        <option value="large">Large</option>
                    </select>
                </label>
            </div>
            <div className="flex items-center gap-2 mb-1 font-medium text-xs uppercase text-amber-100/70">
                Accent Color:
                {COLORS.map((c, i) => (
                    <button
                        key={c}
                        style={{ background: c }}
                        className={`w-7 h-7 rounded-full border-2 ${value.accentColor === c && "ring-2 ring-amber-400"} border-black/20 mr-1`}
                        onClick={() => onChange({ ...value, accentColor: c })}
                        aria-label={`Switch color to ${c}`}
                    />
                ))}
            </div>
        </div>
    );
}