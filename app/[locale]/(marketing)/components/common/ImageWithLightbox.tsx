"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "../../components/Lightbox";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
};

export default function ImageWithLightbox({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  imageClassName,
}: Props) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => setIndex(0)}
        className={className ?? "group block w-full text-start"}
        aria-label={`Open ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className={
            imageClassName ??
            "h-auto w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          }
        />
      </button>

      <Lightbox
        items={[{ src, alt }]}
        index={index}
        onClose={() => setIndex(null)}
      />
    </>
  );
}