"use client";
import React, { useState } from "react";

export default function CreateApiKeyModal({
    open,
    onClose,
    onCreate
}: {
    open: boolean;
    onClose: () => void;
    onCreate: (label: string) => void;
}) {
    const [label, setLabel] = useState("");
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center">
            <form
                className="bg-gradient-to-br from-[#1d1608] via-[#372b16] to-[#181106] rounded-xl border border-amber-500/20 p-7 min-w-[320px] max-w-xs shadow-2xl"
                onSubmit={e => {
                    e.preventDefault();
                    if (label.trim()) onCreate(label);
                }}
            >
                <h2 className="text-lg font-bold text-white mb-3">Create New API Key</h2>
                <input
                    className="mb-4 w-full rounded border border-amber-500/20 px-3 py-2 bg-black/40 text-white text-sm"
                    placeholder="Label (for easy reference)"
                    value={label}
                    onChange={e => setLabel(e.target.value)}
                    required
                />
                <div className="flex gap-2">
                    <button
                        type="button"
                        className="flex-1 rounded bg-black/20 text-white border border-neutral-700 py-2 text-xs hover:bg-black/40 transition"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex-1 rounded bg-amber-400 text-black py-2 text-xs font-bold hover:bg-amber-300 transition"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}