"use client";

import Link from "next/link";

const row1 = [
  {
    title: "AI Agents",
    image: "/images/capabilities/agents.jpg",
    href: "/platform/agents",
  },
  {
    title: "Vision Intelligence",
    image: "/images/capabilities/vision.jpg",
    href: "/platform/vision",
  },
  {
    title: "Voice & Speech",
    image: "/images/capabilities/voice.jpg",
    href: "/platform/voice",
  },
  {
    title: "AI Search",
    image: "/images/capabilities/search.jpg",
    href: "/platform/search",
  },
];

const row2 = [
  {
    title: "Enterprise Automation",
    image: "/images/capabilities/automation.jpg",
    href: "/platform/automation",
  },
  {
    title: "Developer APIs",
    image: "/images/capabilities/apis.jpg",
    href: "/platform/api",
  },
  {
    title: "Analytics",
    image: "/images/capabilities/analytics6.jpg",
    href: "/platform/analytics",
  },
  {
    title: "Security",
    image: "/images/capabilities/security6.jpg",
    href: "/platform/security",
  },
];


function Card({
  title,
  image,
  href,
}: {
  title: string;
  image: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="
        group
        relative
        block
        h-[260px]
        w-[460px]
        shrink-0
        overflow-hidden
        rounded-[32px]
      "
    >
      <div
        className="
          absolute inset-0
          bg-cover bg-center
          transition-transform duration-1000
          group-hover:scale-110
        "
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 p-8">
        <h3 className="text-3xl font-bold">
          {title}
        </h3>
      </div>
    </Link>
  );
}

export default function CapabilitiesSection() {
  return (
    <section className="overflow-hidden py-32">
      <div className="container-app">
        <div className="mb-20 max-w-3xl">
          <h2 className="text-5xl font-bold md:text-6xl">
            Built For Every AI Workflow
          </h2>

          <p className="mt-4 text-sm text-white/60">
            Explore the capabilities powering modern AI products,
            enterprise automation, multimodal experiences and intelligent systems.
          </p>
        </div>
      </div>

      {/* Row 1 */}
      <div className="group overflow-hidden">
        <div className="marquee-left flex w-max gap-6">
          {[...row1, ...row1].map((item, i) => (
            <Card key={i} {...item} />
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="group mt-6 overflow-hidden">
        <div className="marquee-right flex w-max gap-6">
          {[...row2, ...row2].map((item, i) => (
            <Card key={i} {...item} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-left {
          animation: marqueeLeft 45s linear infinite;
        }

        .marquee-right {
          animation: marqueeRight 45s linear infinite;
        }

        .group:hover .marquee-left,
        .group:hover .marquee-right {
          animation-play-state: paused;
        }

        @keyframes marqueeLeft {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @keyframes marqueeRight {
          from {
            transform: translateX(-50%);
          }

          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}