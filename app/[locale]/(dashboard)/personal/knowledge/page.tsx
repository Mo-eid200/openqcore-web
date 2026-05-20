"use client";

import React, { useState } from "react";
import KnowledgeToolbar from "./KnowledgeToolbar";
import KnowledgeGrid from "./KnowledgeGrid";
import UploadKnowledgeModal from "./UploadKnowledgeModal";
import type { KnowledgeItem } from "./types";

const MOCK_KNOWLEDGE: KnowledgeItem[] = [
    {
        id: "k1",
        title: "AI Fundamentals.pdf",
        description: "An in-depth guide on AI algorithms and concepts.",
        type: "pdf",
        status: "processed",
        uploadedAt: new Date(Date.now() - 2300000).toISOString(),
        tags: ["AI", "Guide"],
        size: "4.3MB",
    },
    {
        id: "k2",
        title: "User Manual.docx",
        description: "Full walkthrough of the system and its API access points.",
        type: "doc",
        status: "pending",
        uploadedAt: new Date(Date.now() - 8900000).toISOString(),
        tags: ["Manual"],
        size: "2.2MB",
    },
    {
        id: "k3",
        title: "Chatbot Prompts",
        description: "Table of best prompts for agent performance.",
        type: "snippet",
        status: "processed",
        uploadedAt: new Date(Date.now() - 16800000).toISOString(),
        tags: ["Prompts"],
        size: "---",
    },
];

export default function KnowledgePage() {
    const [docs, setDocs] = useState<KnowledgeItem[]>(MOCK_KNOWLEDGE);
    const [showUpload, setShowUpload] = useState(false);

    return (
        <div className="relative w-full max-w-4xl mx-auto min-h-screen px-2 sm:px-6 xl:px-10 py-10 flex flex-col gap-7">
            <KnowledgeToolbar onUpload={() => setShowUpload(true)} />
            {docs.length === 0 ? (
                <div className="py-16 text-center text-gray-400 text-xl">No knowledge files yet.</div>
            ) : (
                <KnowledgeGrid items={docs} />
            )}
            <UploadKnowledgeModal
                open={showUpload}
                onClose={() => setShowUpload(false)}
                onUpload={(item) => { setDocs([...docs, { ...item, id: Math.random().toString() }]); setShowUpload(false); }}
            />
        </div>
    );
}