"use client";
import React from "react";
import type { ApiKey } from "./types";

export default function ApiKeysTable({
    keys,
    onDisable,
    onCopy
}: {
    keys: ApiKey[];
    onDisable?: (id: string) => void;
    onCopy?: (key: string) => void;
}) {
    if (!keys?.length)
        return <div className="py-14 text-center text-amber-100/60">No API keys yet.</div>;
    return (
        <div className="overflow-x-auto rounded-xl border border-amber-500/20 bg-[#181106]/80 backdrop-blur-xl shadow">
            <table className="min-w-full text-left text-sm">
                <thead>
                    <tr className="text-amber-100/90 border-b border-amber-700/20">
                        <th className="py-3 px-4 font-bold">Label</th>
                        <th className="py-3 px-4">Key</th>
                        <th className="py-3 px-4">Created</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Last Used</th>
                        <th className="py-3 px-4"></th>
                    </tr>
                </thead>
                <tbody>
                    {keys.map(key => (
                        <tr key={key.id} className="border-b border-amber-300/10 hover:bg-amber-400/5 transition">
                            <td className="font-bold px-4 py-2 text-amber-100">{key.label}</td>
                            <td className="px-4 py-2 font-mono text-amber-400">
                                <span className="select-all">{key.key.slice(0, 8) + "•••"}</span>
                                <button
                                    onClick={() => onCopy?.(key.key)}
                                    className="ml-2 px-2 py-0.5 rounded text-xs bg-amber-400/10 text-amber-300 hover:bg-amber-400/30"
                                    title="Copy key"
                                >Copy</button>
                            </td>
                            <td className="px-4 py-2 text-xs text-amber-100/60">{new Date(key.createdAt).toLocaleDateString()}</td>
                            <td className="px-4 py-2">
                                {key.status === "active" ?
                                    <span className="bg-emerald-500/80 text-white px-2 py-0.5 rounded text-xs font-semibold">Active</span> :
                                    <span className="bg-gray-500/40 text-gray-300 px-2 py-0.5 rounded text-xs font-semibold">Disabled</span>
                                }
                            </td>
                            <td className="px-4 py-2 text-xs text-amber-100/35">
                                {key.lastUsedAt ? new Date(key.lastUsedAt).toLocaleDateString() : "--"}
                            </td>
                            <td className="px-4 py-2">
                                {key.status === "active" && (
                                    <button
                                        onClick={() => onDisable?.(key.id)}
                                        className="bg-red-500/80 hover:bg-red-500 text-white text-xs rounded px-3 py-0.5"
                                    >Disable</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}