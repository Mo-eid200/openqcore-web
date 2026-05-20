"use client";
import React from "react";
import GenerationCard from "./GenerationCard";
import type { GenerationItem } from "./types";

export default function GenerationGrid({ items }: { items: GenerationItem[] }) {
    if (!items?.length) return null;
    return (
        <div
            className="
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    gap-3
    auto-rows-fr
  "
        >
            {items.map(item => <GenerationCard key={item.id} item={item} />)}
        </div>
    );
}