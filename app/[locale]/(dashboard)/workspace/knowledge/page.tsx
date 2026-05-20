"use client";
import React, { useState } from "react";
import { KnowledgeToolbar } from "./KnowledgeToolbar";
import { KnowledgeGrid } from "./KnowledgeGrid";
import { UploadKnowledgeModal } from "./UploadKnowledgeModal";


type KnowledgeStatus = "error" | "ready" | "processing" | "pending";
type KnowledgeSource = {
    id: string;
    name: string;
    type: string;
    size: string;
    uploadedAt: string;
    status: KnowledgeStatus;
    embeddings: number;
};

const DUMMY_KNOWLEDGE: KnowledgeSource[] = [
    {
        id: "file1",
        name: "Tech Docs",
        type: "PDF",
        size: "2.8 MB",
        uploadedAt: "2026-05-16",
        status: "ready",
        embeddings: 1182
    },
    {
        id: "file2",
        name: "Company Wiki",
        type: "Notion",
        size: "4.3 MB",
        uploadedAt: "2026-05-16",
        status: "processing",
        embeddings: 543
    },
];


export default function KnowledgePage() {
    const [sources, setSources] = useState<KnowledgeSource[]>(DUMMY_KNOWLEDGE);
    const [search, setSearch] = useState("");
    const [showUpload, setShowUpload] = useState(false);

    const filtered = sources.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.type.toLowerCase().includes(search.toLowerCase())
    );

    const addKnowledge = (file: { name: string; type: string; embeddings: number }) => {
        setSources([
            ...sources,
            {
                id: Math.random().toString(36).slice(2),
                ...file,
                size: "-",
                uploadedAt: new Date().toISOString().slice(0, 10),
                status: "pending" as KnowledgeStatus
            }
        ]);
    };

    return (
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-10">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white mb-1">Knowledge</h1>
                <p className="text-slate-400 mb-4">
                    Upload files, connect data, and manage all your AI knowledge sources in one place.
                </p>
            </div>

            <KnowledgeToolbar
                search={search}
                onSearch={setSearch}
                onUpload={() => setShowUpload(true)}
            />

            <KnowledgeGrid
                sources={filtered}
            // onCardMenu, on action menu event for each card
            />

            <UploadKnowledgeModal
                open={showUpload}
                onClose={() => setShowUpload(false)}
                onUpload={addKnowledge}
            />
        </div>
    );
}