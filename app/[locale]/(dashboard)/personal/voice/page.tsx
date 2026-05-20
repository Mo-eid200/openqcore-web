"use client";
import React, { useState } from "react";
import VoiceToolbar from "./VoiceToolbar";
import VoiceStudio from "./VoiceStudio";
import VoiceHistory from "./VoiceHistory";
import type { VoiceItem } from "./types";

const MOCK_VOICES: VoiceItem[] = [
    {
        id: "v1",
        title: "AI Greeting",
        prompt: "Say hello in a friendly, warm tone.",
        url: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars3.wav",
        status: "ready",
        duration: "00:04",
        createdAt: new Date(Date.now() - 8900000).toISOString(),
        tags: ["AI", "greeting"],
        transcript: "Hello! How can I help you today?",
        source: "agent"
    },
    {
        id: "v2",
        title: "Error Sound",
        prompt: "Generate a vocal error alert sound.",
        url: "",
        status: "pending",
        createdAt: new Date(Date.now() - 3400000).toISOString(),
        tags: ["alert"]
    }
];

export default function PersonalVoicePage() {
    const [voiceList, setVoiceList] = useState<VoiceItem[]>(MOCK_VOICES);
    const [search, setSearch] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    const filtered = voiceList.filter(x =>
        x.title.toLowerCase().includes(search.toLowerCase()) ||
        (x.prompt?.toLowerCase().includes(search.toLowerCase()) ?? false)
    );

    // Stats example
    const stats = (
        <div className="flex gap-4 mb-2 text-xs text-amber-100/70">
            <span>Total records: <b>{voiceList.length}</b></span>
            <span>Ready: <b>{voiceList.filter(v => v.status === "ready").length}</b></span>
            <span>Pending: <b>{voiceList.filter(v => v.status === "pending").length}</b></span>
        </div>
    );
    // Gallery head
    const galleryHead = (
        <div className="flex items-center gap-3 mb-1">
            <span className="text-base font-bold text-white">Voice Snippets</span>
            <span className="text-xs bg-amber-400/10 text-amber-300 px-2 py-0.5 rounded">Audio Gallery</span>
            <span className="text-xs text-amber-100/50">History Manager</span>
        </div>
    );

    function handleSearch(q: string) {
        setSearch(q);
    }
    function handleFilter() {
        setShowFilters(f => !f);
    }
    function handleOpenChat() {
        alert("Open ChatQXT… (مثال)");
    }
    function handleRecord() {
        alert("Record voice (هنا تضيف كود التسجيل/الرفع)");
    }

    return (
        <div className="relative w-full max-w-5xl mx-auto min-h-screen px-2 sm:px-6 xl:px-10 py-10 flex flex-col gap-7">
            <VoiceToolbar
                onSearch={handleSearch}
                onFilter={handleFilter}
                onOpenChat={handleOpenChat}
                onRecord={handleRecord}
            />
            <VoiceStudio
                stats={stats}
                toolbar={showFilters && (
                    <div className="bg-amber-400/5 border border-amber-400/20 rounded-lg px-4 py-2 mb-2 text-amber-200 text-xs">
                        Example filters for voice records (customize as needed)
                    </div>
                )}
                history={
                    <>
                        {galleryHead}
                        <VoiceHistory items={filtered} />
                    </>
                }
            />
        </div>
    );
}