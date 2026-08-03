"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// ─────────────────────────────────────────────────────────
// Tuning constants — adjust these three if the particles look
// off-center relative to the actual exported image. All values
// are percentages of the (square) image container.
// ─────────────────────────────────────────────────────────
const CENTER_X = 48; // horizontal center of the logo, % of width
const CENTER_Y = 40; // vertical center of the logo, % of height
                      // (slightly above true center — the image
                      // leaves room below for the ground/reflection)

// 🔧 FIX: previously a single ORBIT_RADIUS was used for both axes,
// which produced a visible ellipse instead of a circle -- the card
// container isn't perfectly square, so the same "% of width" and
// "% of height" don't correspond to the same actual pixel distance.
// Two independent values let you nudge each axis until the dots
// visually sit right on the ring, regardless of the container's
// real aspect ratio. Start here and adjust by eye.
const ORBIT_RADIUS_X = 27; // % of container WIDTH
const ORBIT_RADIUS_Y = 24; // % of container HEIGHT

type CapabilityDot = {
  id: string;
  href: string;
  angleDeg: number; // 0 = straight up, clockwise from there
  // 🔧 Optional per-dot overrides — use these when the source image's
  // ring isn't a perfect mathematical circle (common with AI-generated
  // art, where perspective can make one part of the ring curve
  // differently than the rest). Leave undefined to use the shared
  // ORBIT_RADIUS_X/Y for that dot; set only the one(s) that need
  // nudging.
  radiusXOverride?: number;
  radiusYOverride?: number;
};

// Six dots at 60° increments — order chosen so the first one (top)
// roughly lines up with "AI Models", the first item in the list.
// hrefs match the same capabilities array in RuntimeSection.tsx —
// keep the two in sync if a route ever changes.
const dots: CapabilityDot[] = [
  { id: "models", href: "/platform/models", angleDeg: 0 },
  { id: "studio", href: "/platform/studio", angleDeg: 60 },
  { id: "api", href: "/docs/api", angleDeg: 120 },
  // 🔧 TUNE THIS ONE: the bottom particle didn't land on the ring
  // like the other 5 — adjust radiusYOverride (and radiusXOverride
  // if needed) here specifically, independent of the shared values.
  { id: "enterprise", href: "/platform/enterprise", angleDeg: 175, radiusYOverride: 32 },
  { id: "security", href: "/solutions/security", angleDeg: 240 },
  { id: "analytics", href: "/platform/analytics", angleDeg: 300 },
];

function polarToPercent(angleDeg: number, radiusXPercent: number, radiusYPercent: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180); // -90 so 0deg points up
  return {
    x: CENTER_X + radiusXPercent * Math.cos(rad),
    y: CENTER_Y + radiusYPercent * Math.sin(rad),
  };
}

export default function RuntimeHeroVisual({
  hovered,
  onHover,
}: {
  hovered: string | null;
  onHover: (id: string | null) => void;
}) {
  const router = useRouter();

  return (
    <div className="absolute inset-0">
      {/* Static high-quality background */}
      <Image
        src="/images/runtime/runtime-hero-orbital.png"
        alt="OpenQCore Runtime — global AI orchestration network"
        fill
        sizes="(max-width: 1024px) 100vw, 66vw"
        className="object-cover"
        priority
      />

      {/* Interactive particle layer — positioned as a square overlay
          matching the source image's 1:1 aspect ratio, so the
          percentage math lines up regardless of how the outer card
          gets cropped by object-cover at different viewport sizes. */}
      <div className="absolute inset-0" aria-hidden="true">
        {dots.map((dot, i) => {
          const { x, y } = polarToPercent(
            dot.angleDeg,
            dot.radiusXOverride ?? ORBIT_RADIUS_X,
            dot.radiusYOverride ?? ORBIT_RADIUS_Y
          );
          const isActive = hovered === dot.id;

          return (
            <motion.div
              key={dot.id}
              role="link"
              tabIndex={0}
              aria-label={dot.id}
              className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer p-2"
              style={{ left: `${x}%`, top: `${y}%` }}
              onMouseEnter={() => onHover(dot.id)}
              onMouseLeave={() => onHover(null)}
              onClick={(e) => {
                // 🔧 Without this, the click would bubble up to the
                // outer <Link href="/platform"> that wraps the whole
                // hero card, always sending users to the generic
                // /platform page regardless of which particle they
                // clicked. Each particle now navigates to its own
                // capability's page instead, matching what the hover
                // highlight already visually promises.
                e.preventDefault();
                e.stopPropagation();
                router.push(dot.href);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push(dot.href);
                }
              }}
              animate={{ scale: isActive ? 1.9 : 1 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Glow ring: staggered idle pulse when nothing is
                  hovered (one dot brightens, fades, next one starts
                  ~1.5s later); continuous faster pulse while active. */}
              <motion.span
                className="absolute inset-0 rounded-full bg-[#d4af37]"
                style={{ filter: "blur(5px)" }}
                animate={
                  isActive
                    ? { opacity: [0.55, 1, 0.55], scale: [1, 1.5, 1] }
                    : { opacity: [0.25, 0.7, 0.25], scale: [1, 1.35, 1] }
                }
                transition={{
                  duration: isActive ? 1.1 : 1.4,
                  repeat: Infinity,
                  repeatDelay: isActive ? 0 : 7.5,
                  delay: isActive ? 0 : i * 1.5,
                  ease: "easeInOut",
                }}
              />

              <span
                className="relative block h-2.5 w-2.5 rounded-full bg-[#f3d98a]"
                style={{ boxShadow: "0 0 10px 3px rgba(212,175,55,0.55)" }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}