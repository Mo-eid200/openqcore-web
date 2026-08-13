"use client";

import React, { useState } from "react";
import { AudioLines, Settings2, Sparkles } from "lucide-react";

import VoiceSettingsTab from "./VoiceSettingsTab";
import VoiceStudioTab from "./VoiceStudioTab";

type TabKey = "studio" | "settings";

const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: "studio",   label: "Studio",   icon: Sparkles },
  { key: "settings", label: "Settings", icon: Settings2 },
];

export default function PersonalVoicePage() {
  const [tab, setTab] = useState<TabKey>("studio");

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-3 py-8 sm:px-6 xl:px-10">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/[0.05] bg-amber-300/[0.08] text-amber-200">
          <AudioLines className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold tracking-tight text-white">
            Voice
          </h1>
          <p className="mt-0.5 truncate text-sm text-white/45">
            Text-to-speech, transcription, and your workspace's default voice
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-white/[0.06]">
        {TABS.map(({ key, label, icon: TabIcon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`
              flex items-center gap-1.5 border-b-2 px-4 py-2.5 text-sm font-medium transition-all
              ${tab === key
                ? "border-amber-300 text-white"
                : "border-transparent text-white/40 hover:text-white/70"
              }
            `}
          >
            <TabIcon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="pb-10">
        {tab === "studio" && <VoiceStudioTab />}
        {tab === "settings" && <VoiceSettingsTab scopeType="user" />}
      </div>
    </div>
  );
}