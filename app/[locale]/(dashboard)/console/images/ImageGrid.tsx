"use client";

import React from "react";
import ImageCard from "./ImageCard";
import type { ImageItem } from "./types";

type Props = {
  items: ImageItem[];
  deletingId?: string | null;
  onDelete?: (id: string) => void;
};

export default function ImageGrid({
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
        <ImageCard
          key={item.id}
          item={item}
          deleting={deletingId === item.id}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}