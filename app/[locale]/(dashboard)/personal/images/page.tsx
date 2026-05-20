"use client";
import React, { useState } from "react";
import ImageToolbar from "./ImageToolbar";
import ImageStudio from "./ImageStudio";
import ImageHistory from "./ImageHistory";
import type { ImageItem } from "./types";

const MOCK_IMAGES: ImageItem[] = [
    {
        id: "im1",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
        prompt: "A futuristic cityscape at night, glowing neon.",
        status: "ready",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        tags: ["city", "futuristic"],
        source: "agent"
    },
    {
        id: "im2",
        url: "",
        prompt: "Cat riding a bike, digital art",
        status: "pending",
        createdAt: new Date(Date.now() - 7600000).toISOString(),
        tags: ["cat"],
        source: "workflow"
    }
];

export default function PersonalImagePage() {
    const [images, setImages] = useState<ImageItem[]>(MOCK_IMAGES);
    const [search, setSearch] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    // فلترة الصور حسب البحث (تقدر تضيف شرط الفلترة كيف تحب)
    const filteredImages = images.filter(img =>
        img.prompt.toLowerCase().includes(search.toLowerCase())
    );

    // Actions
    function handleSearch(q: string) {
        setSearch(q);
    }
    function handleFilter() {
        setShowFilters(f => !f);
    }
    function handleOpenChat() {
        // اكتب اللوجيك الخاص بك هنا:
        alert("Open ChatQXT… (مثال)");
    }

    // مثال إحصائيات أعلى السجل
    const stats = (
        <div className="flex gap-4 mb-2 text-xs text-amber-100/70">
            <span>Total images: <b>{images.length}</b></span>
            <span>Ready: <b>{images.filter(i => i.status === "ready").length}</b></span>
            <span>Pending: <b>{images.filter(i => i.status === "pending").length}</b></span>
        </div>
    );

    // مثال تعليقات أعلى الجاليري (يمكنك تخصيصه)
    const galleryHead = (
        <div className="flex items-center gap-3 mb-1">
            <span className="text-base font-bold text-white">Generated Assets</span>
            <span className="text-xs bg-amber-400/10 text-amber-300 px-2 py-0.5 rounded">Media Gallery</span>
            <span className="text-xs text-amber-100/50">History Manager</span>
        </div>
    );

    return (
        <div className="relative w-full max-w-5xl mx-auto min-h-screen px-2 sm:px-6 xl:px-10 py-10 flex flex-col gap-7">
            <ImageToolbar
                onSearch={handleSearch}
                onFilter={handleFilter}
                onOpenChat={handleOpenChat}
            />
            <ImageStudio
                stats={stats}
                toolbar={showFilters && (
                    <div className="bg-amber-400/5 border border-amber-400/20 rounded-lg px-4 py-2 mb-2 text-amber-200 text-xs">
                        Example filters: (تخصيص فلاتر هنا)
                    </div>
                )}
                history={
                    <>
                        {galleryHead}
                        <ImageHistory items={filteredImages} />
                    </>
                }
            />
        </div>
    );
}