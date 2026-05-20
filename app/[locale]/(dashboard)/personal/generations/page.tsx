"use client";
import React, { useState } from "react";
import GenerationToolbar from "./GenerationToolbar";
import GenerationGrid from "./GenerationGrid";
import type { GenerationItem } from "./types";

const DUMMY_GEN: GenerationItem[] = [
    {
        id: "g1",
        title: "Product Tagline",
        prompt: "Write a catchy tagline for an AI SaaS platform.",
        result: "Empowering Ideas. Accelerating AI Innovation.",
        model: "GPT-4 Turbo",
        status: "success",
        createdAt: new Date(Date.now() - 5400000).toISOString(),
        tags: ["Copywriting", "Marketing"],
    },
    {
        id: "g2",
        title: "Python Function Generation",
        prompt: "Python function for calculating Fibonacci numbers efficiently.",
        result: `def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a`,
        model: "GPT-4o",
        status: "success",
        createdAt: new Date(Date.now() - 8400000).toISOString(),
        tags: ["Python", "Code"],
    },
    {
        id: "g3",
        title: "Outline Summary",
        prompt: "Summarize the main points of last week's report...",
        result: "1. Sales increased by 8%\n2. Customer churn down 1.2%\n3. New blog launched.",
        model: "GPT-3.5",
        status: "pending",
        createdAt: new Date(Date.now() - 12400000).toISOString(),
        tags: ["Summary"],
    },
];

export default function PersonalGenerationPage() {
    const [gen, setGen] = useState<GenerationItem[]>(DUMMY_GEN);
    return (
        <div className="relative w-full max-w-4xl mx-auto min-h-screen px-2 sm:px-6 xl:px-10 py-10 flex flex-col gap-7">
            <GenerationToolbar onCreate={() => {/* Future: Open a modal to create new gen */ }} />
            {gen.length === 0 ? (
                <div className="py-16 text-center text-gray-400 text-xl">No generations found yet.</div>
            ) : (
                <GenerationGrid items={gen} />
            )}
        </div>
    );
}