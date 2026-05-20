"use client";

import React from "react";
import KnowledgeCard from "./KnowledgeCard";
import type { KnowledgeItem } from "./types";

export default function KnowledgeGrid({ items }: { items: KnowledgeItem[] }) {
    if (!items?.length) return null;
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {items.map(item => <KnowledgeCard key={item.id} item={item} />)}
        </div>
    );
}