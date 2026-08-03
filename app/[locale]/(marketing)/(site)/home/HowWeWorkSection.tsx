"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface Step {
  id: string;
  roman: string;
  image: string;
  href: string;
}

const steps: Step[] = [
  { id: "research_discovery", roman: "Ⅰ", image: "/images/process/research.jpg", href: "/process/research-discovery" },
  { id: "strategy_architecture", roman: "Ⅱ", image: "/images/process/architecture.jpg", href: "/process/strategy-architecture" },
  { id: "solution_design", roman: "Ⅲ", image: "/images/process/design.jpg", href: "/process/solution-design" },
  { id: "development_integration", roman: "Ⅳ", image: "/images/process/development.jpg", href: "/process/development-integration" },
  { id: "deployment_enablement", roman: "Ⅴ", image: "/images/process/deployment.jpg", href: "/process/deployment-enablement" },
  { id: "monitoring_optimization", roman: "Ⅵ", image: "/images/process/optimization.jpg", href: "/process/monitoring-optimization" },
];

export default function HowWeWorkSection() {
  const t = useTranslations("how_we_work_section");

  // ──────────────────────────────────────────────────────────
  // Auto-scrolling timeline, steerable by mouse position.
  // wrapperRef = the fixed-width viewport (overflow hidden)
  // timelineRef = the actual row of cards, translated via
  // transform: translateX() — never via scrollLeft, so it works
  // identically whether or not native overflow-x is enabled.
  // ──────────────────────────────────────────────────────────
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const timeline = timelineRef.current;
    // 🔧 FIX: previously, when reduceMotion was true, this effect
    // returned early (correctly disabling the auto-scroll/mouse-steer
    // animation) but the wrapper stayed `overflow-hidden` with no
    // fallback -- since transform-based positioning was the ONLY way
    // to move the timeline, steps 3-6 became completely unreachable
    // for anyone with prefers-reduced-motion on. The wrapper's
    // className now switches to `overflow-x-auto` in that case (see
    // JSX below) so native scroll takes over instead of just leaving
    // users stuck. This effect still exits early for reduceMotion --
    // it only needs to run the JS-driven animation when motion is
    // allowed.
    if (!wrapper || !timeline || reduceMotion) return;

    let auto = 0;
    let direction = 1;
    let raf: number;
    let hovering = false;

    const getMax = () =>
      Math.max(0, timeline.scrollWidth - wrapper.clientWidth);

    const animate = () => {
      if (!hovering) {
        const max = getMax();
        auto += direction * 0.3;

        if (auto >= max) direction = -1;
        if (auto <= 0) direction = 1;

        timeline.style.transform = `translateX(${-auto}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    const handleEnter = () => {
      hovering = true;
    };

    const handleLeave = () => {
      hovering = false;
    };

    const handleMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const percent = Math.min(
        1,
        Math.max(0, (e.clientX - rect.left) / rect.width)
      );
      const max = getMax();

      auto = max * percent;
      timeline.style.transform = `translateX(${-auto}px)`;
    };

    wrapper.addEventListener("mouseenter", handleEnter);
    wrapper.addEventListener("mouseleave", handleLeave);
    wrapper.addEventListener("mousemove", handleMove);

    return () => {
      cancelAnimationFrame(raf);
      wrapper.removeEventListener("mouseenter", handleEnter);
      wrapper.removeEventListener("mouseleave", handleLeave);
      wrapper.removeEventListener("mousemove", handleMove);
    };
  }, [reduceMotion]);

  return (
    <section className="pt-24 pb-8 overflow-hidden">
      <div className="container-app">
        {/* Header */}
        <div className="max-w-4xl mb-20">
          <span className="text-sm uppercase tracking-[0.35em] text-[#d4af37]">
            {t("eyebrow")}
          </span>

          <h2 className="mt-5 text-5xl md:text-6xl font-bold leading-tight">
            {t("heading_line1")}
            <br />
            {t("heading_line2")}
          </h2>

          <p className="mt-6 max-w-3xl text-lg text-white/60">
            {t("subtitle")}
          </p>
        </div>

        {/* Timeline */}
        <div
          ref={wrapperRef}
          className={`relative ${reduceMotion ? "overflow-x-auto" : "overflow-hidden"}`}
        >
          <div
            ref={timelineRef}
            className="flex gap-6 min-w-max pb-4 will-change-transform"
          >
            {steps.map((step, i) => (
              <StepCard key={step.id} step={step} index={i} t={t} />
            ))}
          </div>
        </div>

        {/* Bottom Statement */}
        <div className="mt-10 max-w-4xl">
          <p className="text-2xl md:text-3xl font-light text-white/80 leading-relaxed">
            {t("bottom_statement_prefix")}
            <span className="text-white font-medium">
              {" "}
              {t("bottom_statement_highlight")}{" "}
            </span>
            {t("bottom_statement_suffix")}
          </p>
        </div>
      </div>

      <style jsx global>{`
        /* ──────────────────────────────────────────────────
           Scroll reveal — fade + rise, fires once when the
           card enters the viewport. Staggered by index so the
           row reveals left → right instead of all at once.
           ────────────────────────────────────────────────── */
        .process-card {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 800ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 800ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .process-card[data-visible="true"] {
          opacity: 1;
          transform: translateY(0);
        }

        /* ──────────────────────────────────────────────────
           Image hover — gentle scale + brightness lift.
           ────────────────────────────────────────────────── */
        .process-image {
          transition: transform 1200ms cubic-bezier(0.16, 1, 0.3, 1),
            filter 1200ms ease;
        }
        .process-card:hover .process-image {
          transform: scale(1.06);
          filter: brightness(1.05);
        }

        /* Roman numeral — small independent lift on hover. */
        .process-roman {
          transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1),
            color 700ms ease;
        }
        .process-card:hover .process-roman {
          transform: translateY(-4px);
          color: rgba(212, 175, 55, 0.35);
        }

        @media (prefers-reduced-motion: reduce) {
          .process-card {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .process-image,
          .process-roman {
            transition: none !important;
          }
          .process-card:hover .process-image,
          .process-card:hover .process-roman {
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// StepCard
// The whole card is a Next.js <Link> — clicking anywhere on the
// image, title, or description navigates to step.href. Sizing
// and classNames are unchanged from the original card; only the
// scroll-reveal + hover animation hooks are added.
// ============================================================

function StepCard({
  step,
  index,
  t,
}: {
  step: Step;
  index: number;
  t: ReturnType<typeof useTranslations>;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      href={step.href}
      data-visible={visible}
      className="process-card relative block w-[380px] h-[520px] overflow-hidden rounded-[32px] group shrink-0"
      style={{ transitionDelay: visible ? `${index * 90}ms` : "0ms" }}
    >
      {/* Image */}
      <div
        className="process-image absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${step.image})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

      {/* Roman */}
      <div className="process-roman absolute top-8 left-8 text-7xl font-light text-white/15">
        {step.roman}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 p-8">
        <h3 className="text-3xl font-semibold">{t(`steps.${step.id}.title`)}</h3>

        <p className="mt-4 text-white/65 leading-relaxed">
          {t(`steps.${step.id}.description`)}
        </p>
      </div>
    </Link>
  );
}