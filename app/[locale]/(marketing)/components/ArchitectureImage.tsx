// components/ArchitectureImage.tsx
import ImageWithLightbox from "./common/ImageWithLightbox";

export default function ArchitectureImage({
  src,
  alt,
  width,
  height,
  light = false,
  priority = false,
  maxWidth = "1000px",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  light?: boolean;
  priority?: boolean;
  maxWidth?: string;
}) {
  return (
    <div
      style={{ maxWidth }}
      className={`
        relative mx-auto overflow-hidden rounded-[28px] border
        ${light ? "border-[#d4af37]/20 bg-[#f7f5f0]" : "border-white/7 bg-[#080e1a]"}
        shadow-[0_28px_90px_rgba(0,0,0,0.22)]
      `}
    >
      <ImageWithLightbox
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        imageClassName="h-auto w-full object-contain"
      />
    </div>
  );
}