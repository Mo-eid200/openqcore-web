"use client";
import React, { useState } from "react";
import { Cpu } from "lucide-react";

export default function CreateAgentModal({ open, onClose, onCreate }: {
    open: boolean, onClose: () => void, onCreate: (data: any) => void
}) {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [desc, setDesc] = useState("");
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center">
            <form
                className="bg-gradient-to-br from-[#17120a] via-[#322e29] to-[#221b0c] rounded-lg p-6 min-w-[320px] max-w-sm border border-amber-500/10 shadow-xl"
                onSubmit={e => { e.preventDefault(); onCreate({ name, role, desc, icon: Cpu, status: "pending", createdAt: new Date().toISOString() }); }}
            >
                <div className="flex items-center gap-3 mb-5">
                    <Cpu className="w-7 h-7 text-amber-400" />
                    <h2 className="font-bold text-lg text-white">Create New Agent</h2>
                </div>
                <input
                    type="text" placeholder="Agent Name" value={name}
                    onChange={e => setName(e.target.value)}
                    className="mb-3 w-full rounded border border-amber-500/15 px-3 py-2 bg-black/50 text-white text-sm"
                    required
                />
                <input
                    type="text" placeholder="Agent Role" value={role}
                    onChange={e => setRole(e.target.value)}
                    className="mb-3 w-full rounded border border-amber-500/15 px-3 py-2 bg-black/50 text-white text-sm"
                    required
                />
                <textarea
                    placeholder="Short Description" value={desc}
                    onChange={e => setDesc(e.target.value)}
                    className="mb-3 w-full rounded border border-amber-500/15 px-3 py-2 bg-black/50 text-white text-sm"
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
                        className="flex-1 rounded bg-amber-400 text-black py-2 text-xs font-bold hover:bg-amber-300 transition"
                    >Create</button>
                </div>
            </form>
        </div>
    );
}