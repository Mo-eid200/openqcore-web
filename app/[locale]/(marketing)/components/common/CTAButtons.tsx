"use client";

import { Link } from "@/i18n/navigation";


const BUTTON_HEIGHT = "h-[52px]";

export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

export function PrimaryCTA({
  href,
  children,
  showIcon = true,
}: {
  href: string;
  children: React.ReactNode;
  showIcon?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        group inline-flex items-center justify-center gap-2.5
        ${BUTTON_HEIGHT} rounded-2xl px-7
        bg-gradient-to-r from-[#d4af37] to-[#e7c766]
        text-sm font-semibold text-[#0B1F3B]
        shadow-[0_8px_32px_rgba(212,175,55,0.22)]
        transition-all duration-300
        hover:scale-[1.02] hover:shadow-[0_12px_48px_rgba(212,175,55,0.32)]
        active:scale-[0.99]
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]
      `}
    >
      {children}
      {showIcon && <ArrowIcon />}
    </Link>
  );
}

export function SecondaryCTA({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`
        inline-flex items-center justify-center gap-2
        ${BUTTON_HEIGHT} rounded-2xl px-7
        border border-white/[0.08] bg-white/[0.03]
        text-sm font-semibold text-slate-200
        transition-all duration-300
        hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60
      `}
    >
      {children}
    </Link>
  );
}