"use client";
import React, { useState } from "react";
import ApiKeysTable from "./ApiKeysTable";
import CreateApiKeyModal from "./CreateApiKeyModal";
import ApiUsageChart from "./ApiUsageChart";
import type { ApiKey, ApiUsageStat } from "./types";

const MOCK_KEYS: ApiKey[] = [
    {
        id: "1", label: "Integration 1", key: "sk-demo1234567", createdAt: new Date(Date.now() - 864e5 * 3).toISOString(), status: "active",
        lastUsedAt: new Date(Date.now() - 31200000).toISOString(), usageCount: 143
    },
    {
        id: "2", label: "CLI Client", key: "sk-anotherkey", createdAt: new Date(Date.now() - 864e5 * 8).toISOString(), status: "disabled"
    }
];

const MOCK_STATS: ApiUsageStat[] = [
    { date: new Date(Date.now() - 864e5 * 6).toISOString(), count: 12 },
    { date: new Date(Date.now() - 864e5 * 5).toISOString(), count: 25 },
    { date: new Date(Date.now() - 864e5 * 4).toISOString(), count: 17 },
    { date: new Date(Date.now() - 864e5 * 3).toISOString(), count: 33 },
    { date: new Date(Date.now() - 864e5 * 2).toISOString(), count: 20 },
    { date: new Date(Date.now() - 864e5 * 1).toISOString(), count: 38 },
    { date: new Date().toISOString(), count: 21 }
];

export default function ApiKeysPage() {
    const [keys, setKeys] = useState<ApiKey[]>(MOCK_KEYS);
    const [showCreate, setShowCreate] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);

    function handleDisable(id: string) {
        setKeys(keys => keys.map(k => k.id === id ? { ...k, status: "disabled" } : k));
    }
    function handleCopy(key: string) {
        navigator.clipboard.writeText(key);
        setCopied(key);
        setTimeout(() => setCopied(null), 1500);
    }
    function handleCreate(label: string) {
        setKeys(keys => [
            ...keys,
            {
                id: Math.random().toString(),
                label,
                key: "sk-new" + Math.floor(Math.random() * 100000),
                status: "active",
                createdAt: new Date().toISOString()
            }
        ]);
        setShowCreate(false);
    }

    return (
        <div className="w-full max-w-4xl mx-auto min-h-screen py-8 px-2 sm:px-8 flex flex-col gap-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">API Keys</h1>
                    <p className="text-xs text-amber-100/70 mt-1">
                        Manage, copy, or disable your personal API tokens for integrations and automation.
                    </p>
                </div>
                <button
                    className="px-5 py-2 bg-amber-400 rounded-lg text-black font-bold text-xs shadow-md hover:bg-amber-300 transition"
                    onClick={() => setShowCreate(true)}
                >+ New Key</button>
            </div>
            <ApiUsageChart data={MOCK_STATS} />
            <ApiKeysTable
                keys={keys}
                onDisable={handleDisable}
                onCopy={handleCopy}
            />
            <CreateApiKeyModal
                open={showCreate}
                onClose={() => setShowCreate(false)}
                onCreate={handleCreate}
            />
            {copied && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-2 bg-emerald-500 text-white rounded-full font-bold text-xs shadow-xl transition">
                    Key copied!
                </div>
            )}
        </div>
    );
}