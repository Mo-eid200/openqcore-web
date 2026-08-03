"use client";

import React from "react";
import VoiceCard from "./VoiceCard";
import type { VoiceItem } from "./types";

type Props = {
  items: VoiceItem[];
  deletingId?: string | null;
  onDelete?: (id: string) => void;
};

export default function VoiceGrid({
  items,
  deletingId,
  onDelete,
}: Props) {
  if (!items?.length) return null;

  return (
    <section
      className="
        grid
        grid-cols-1
        gap-5

        sm:grid-cols-2
        2xl:grid-cols-3
      "
    >
      {items.map((item) => (
        <VoiceCard
          key={item.id}
          item={item}
          deleting={deletingId === item.id}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}