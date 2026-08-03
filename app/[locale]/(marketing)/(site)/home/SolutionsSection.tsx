"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface Solution {
  id: string;
  image: string;
  href: string;
  tagKeys: string[];
  size: string;
}

const solutions: Solution[] = [
  {
    id: "government",
    image: "/images/solutions/government.jpg",
    href: "/solutions/government",
    tagKeys: ["digital_services", "ai_agents", "automation"],
    size: "md:col-span-2",
  },
  {
    id: "enterprise",
    image: "/images/solutions/enterprise1.jpg",
    href: "/solutions/enterprise",
    tagKeys: ["operations", "knowledge_ai", "workflows"],
    size: "md:col-span-2",
  },
  {
    id: "healthcare",
    image: "/images/solutions/healthcare.jpg",
    href: "/solutions/healthcare",
    tagKeys: ["medical_ai", "analytics", "records"],
    size: "",
  },
  {
    id: "finance",
    image: "/images/solutions/finance.jpg",
    href: "/solutions/finance",
    tagKeys: ["risk", "compliance", "customer_ai"],
    size: "",
  },
  {
    id: "education",
    image: "/images/solutions/education.jpg",
    href: "/solutions/education",
    tagKeys: ["ai_tutors", "knowledge", "learning"],
    size: "",
  },
  {
    id: "ecommerce",
    image: "/images/solutions/ecommerce.jpg",
    href: "/solutions/ecommerce",
    tagKeys: ["support", "automation", "recommendations"],
    size: "",
  },
];

export default function SolutionsSection() {
  const t = useTranslations("solutions_section");

  return (
    <section className="py-24 md:py-32">
      <div className="container-app">
        {/* Header */}
        <div className="mb-14 max-w-4xl md:mb-20">
          <span className="text-sm uppercase tracking-[0.3em] text-[#d4af37]">
            {t("eyebrow")}
          </span>

          <h2 className="mt-4 text-4xl font-bold sm:text-5xl md:text-6xl">
            {t("heading_line1")}
            <br />
            {t("heading_line2")}
          </h2>

          <p className="mt-6 max-w-2xl text-base text-white/60 sm:text-lg">
            {t("subtitle")}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
          {solutions.map((item) => {
            const title = t(`items.${item.id}.title`);

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  group relative
                  h-[240px] sm:h-[280px]
                  overflow-hidden rounded-[32px]
                  focus-visible:outline-2 focus-visible:outline-[#d4af37]/60
                  ${item.size}
                `}
              >
                {/* Background */}
                <Image
                  src={item.image}
                  alt={t("image_alt", { industry: title })}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 z-10 p-6 sm:p-7">
                  <h3 className="text-xl font-bold sm:text-2xl">{title}</h3>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tagKeys.map((tagKey) => (
                      <span
                        key={tagKey}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur-sm"
                      >
                        {t(`items.${item.id}.tags.${tagKey}`)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}