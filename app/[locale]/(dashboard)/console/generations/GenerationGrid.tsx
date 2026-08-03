"use client";

import React from "react";
import GenerationCard from "./GenerationCard";
import type { GenerationItem } from "./types";

type Props = {
  items: GenerationItem[];
  deletingId?: string | null;
  rerunningId?: string | null;
  onDelete?: (id: string) => void;
  onRerun?: (id: string) => void;
};

export default function GenerationGrid({
  items,
  deletingId,
  rerunningId,
  onDelete,
  onRerun,
}: Props) {
  if (!items?.length) return null;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <GenerationCard
          key={item.id}
          item={item}
          deleting={deletingId === item.id || rerunningId === item.id}
          onDelete={onDelete}
          onRerun={onRerun}
        />
      ))}
    </div>
  );
}