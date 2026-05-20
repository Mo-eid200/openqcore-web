"use client";
import React, { useState } from "react";
import { FileUp } from "lucide-react";

export default function UploadKnowledgeModal({
    open, onClose, onUpload,
}: { open: boolean, onClose: () => void, onUpload: (item: any) => void }) {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [desc, setDesc] = useState("");
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center">
            <form
                className="bg-gradient-to-br from-[#111d22] via-[#1a2740] to-[#153447] rounded-lg p-5 min-w-[320px] max-w-sm border border-cyan-500/10 shadow-xl"
                onSubmit={e => { e.preventDefault(); onUpload({ title, description: desc, type: "pdf", status: "pending", uploadedAt: new Date().toISOString() }); }}
            >
                <div className="flex items-center gap-3 mb-5">
                    <FileUp className="w-7 h-7 text-cyan-400" />
                    <h2 className="font-bold text-lg text-white">Upload New File</h2>
                </div>
                <input
                    type="text" placeholder="Title" value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="mb-3 w-full rounded border border-cyan-500/15 px-3 py-2 bg-black/40 text-white text-sm"
                    required
                />
                <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={e => setFile(e.target.files?.[0] ?? null)}
                    className="mb-3 w-full text-xs text-gray-200"
                />
                <textarea
                    placeholder="Description" value={desc}
                    onChange={e => setDesc(e.target.value)}
                    className="mb-3 w-full rounded border border-cyan-500/15 px-3 py-2 bg-black/40 text-white text-sm"
                    rows={2}
                />
                <div className="flex gap-2 pt-2">
                    <button
                        type="button"
                        className="flex-1 rounded bg-black/20 text-white border border-neutral-700 py-2 text-xs hover:bg-black/40 transition"
                        onClick={onClose}
                    >Cancel</button>
                    <button
                        type="submit"
                        className="flex-1 rounded bg-cyan-400 text-black py-2 text-xs font-bold hover:bg-cyan-300 transition"
                    >Upload</button>
                </div>
            </form>
        </div>
    );
}