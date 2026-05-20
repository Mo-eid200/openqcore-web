"use client";
import React, { useState } from "react";
import { StorageOverview } from "./StorageOverview";
import { BucketCard } from "./BucketCard";
import { StorageGrid } from "./StorageGrid";
import { UploadStorageModal } from "./UploadStorageModal";
import { UsageChart } from "./UsageChart";
import { Bucket, File } from "./types";

const DUMMY_BUCKETS: Bucket[] = [
    { name: "knowledge-data", region: "us-east-1", files: 128, usage: "8.2GB", status: "active" },
    { name: "uploads", region: "eu-west-1", files: 94, usage: "3.6GB", status: "active" },
    { name: "vector-files", region: "us-central", files: 76, usage: "2.4GB", status: "active" }
];

const DUMMY_FILES: File[] = [
    { id: "1", name: "vector-chunks-44.vec", type: "vec", size: "285MB", updated: "3m ago", bucket: "vector-files", status: "available" },
    { id: "2", name: "knowledge-main.pdf", type: "pdf", size: "11.2MB", updated: "14m ago", bucket: "knowledge-data", status: "available" },
    { id: "3", name: "upload-94.txt", type: "txt", size: "75KB", updated: "22m ago", bucket: "uploads", status: "processing" },
    { id: "4", name: "archive-corrupted.vec", type: "vec", size: "5GB", updated: "1d ago", bucket: "vector-files", status: "error" }
];

export default function StoragePage() {
    const [showUpload, setShowUpload] = useState(false);
    const [files, setFiles] = useState(DUMMY_FILES);

    const addFile = (file: any) => {
        setFiles([
            ...files,
            {
                ...file,
                id: (Math.random() * 1e8).toFixed(0),
                updated: "just now",
                status: "processing"
            }
        ]);
    };

    return (
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-8 pb-14">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white mb-1">Storage</h1>
                <p className="text-slate-400 mb-4">
                    Your workspace object storage. Upload, monitor, and manage files, vector data and buckets.
                </p>
                <button
                    className="bg-gradient-to-r from-[#d4af37] to-[#ffe08c] text-[#161d2a] px-5 py-2 rounded-lg font-bold shadow hover:opacity-90 transition"
                    onClick={() => setShowUpload(true)}
                >
                    + Upload File
                </button>
            </div>
            <StorageOverview />
            <div className="mb-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DUMMY_BUCKETS.map(b => <BucketCard key={b.name} bucket={b} />)}
            </div>
            <UsageChart />
            <StorageGrid files={files} />
            <UploadStorageModal open={showUpload} onClose={() => setShowUpload(false)} onUpload={addFile} />
        </div>
    );
}