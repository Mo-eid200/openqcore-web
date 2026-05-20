"use client";
import React, { useState } from "react";
import { ApiKeysTable } from "./ApiKeysTable";
import { CreateApiKeyModal } from "./CreateApiKeyModal";
import { ApiUsageChart } from "./ApiUsageChart";
import { ApiEndpointCard } from "./ApiEndpointCard";
import { RateLimitCard } from "./RateLimitCard";
import { ApiKey, Endpoint } from "./types";

const DUMMY_KEYS: ApiKey[] = [
    { id: "k1", key: "sk-live-34ba...xyz", label: "Main App", createdAt: "2026-05-16", status: "active" },
    { id: "k2", key: "sk-test-d712...uv9", label: "Test Key", createdAt: "2026-05-16", status: "revoked" },
];

const DUMMY_ENDPOINTS: Endpoint[] = [
    { method: "POST", path: "/v1/generate", description: "Generate completions using your models", status: "stable" },
    { method: "GET", path: "/v1/usage", description: "Get API usage and statistics.", status: "stable" },
    { method: "POST", path: "/v1/embeddings", description: "Create and manage vector embeddings.", status: "beta" },
];
const DUMMY_RATES = [
    { scope: "Standard", limit: "60 req/min", window: "1 min", used: "18" },
    { scope: "Premium", limit: "300 req/min", window: "1 min", used: "89" },
];

export default function ApiPage() {
    const [showCreate, setShowCreate] = useState(false);
    const [keys, setKeys] = useState(DUMMY_KEYS);

    const handleCreate = (label: string) => {
        setKeys([
            ...keys,
            { id: Math.random().toString(36).slice(2), key: "sk-new-123...", label, createdAt: new Date().toISOString().slice(0, 10), status: "active" }
        ]);
    };

    const handleRevoke = (id: string) => {
        setKeys(keys.map(k => k.id === id ? { ...k, status: "revoked" } : k));
    };

    return (
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-8 pb-14">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white mb-1">APIs & SDK</h1>
                <p className="text-slate-400 mb-4">
                    Manage API keys, track usage, and access developer endpoints and limits.
                </p>
                <button
                    className="bg-gradient-to-r from-[#d4af37] to-[#ffe08c] text-[#161d2a] px-5 py-2 rounded-lg font-bold shadow hover:opacity-90 transition"
                    onClick={() => setShowCreate(true)}
                >
                    + Create API Key
                </button>
            </div>

            <div className="grid gap-7 xl:grid-cols-[2fr_1fr]">
                <div className="flex flex-col gap-7">
                    <ApiKeysTable keys={keys} onRevoke={handleRevoke} />
                    <ApiUsageChart />
                </div>
                <div className="flex flex-col gap-8">
                    <section>
                        <h2 className="text-white font-bold text-lg mb-2">Endpoints</h2>
                        {DUMMY_ENDPOINTS.map(e => <ApiEndpointCard key={e.path} endpoint={e} />)}
                    </section>
                    <section>
                        <h2 className="text-white font-bold text-lg mb-2">Rate Limits</h2>
                        {DUMMY_RATES.map(r => <RateLimitCard key={r.scope} rate={r} />)}
                    </section>
                </div>
            </div>

            <CreateApiKeyModal
                open={showCreate}
                onClose={() => setShowCreate(false)}
                onCreate={handleCreate}
            />
        </div>
    );
}