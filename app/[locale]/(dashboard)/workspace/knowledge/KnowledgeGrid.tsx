import React from "react";
import { KnowledgeCard } from "./KnowledgeCard";
import { KnowledgeSources } from "./KnowledgeSources";

type KnowledgeSource = Parameters<typeof KnowledgeCard>[0]["source"];

export function KnowledgeGrid({
    sources,
    onCardMenu
}: {
    sources: KnowledgeSource[];
    onCardMenu?: (source: KnowledgeSource) => void;
}) {
    if (!sources.length) return <KnowledgeSources />;

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {sources.map((src) => (
                <KnowledgeCard key={src.id} source={src} onMenu={() => onCardMenu?.(src)} />
            ))}
        </section>
    );
}