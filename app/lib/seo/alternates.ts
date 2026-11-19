// app/lib/seo/alternates.ts
//
// One source of truth for public URLs. With localePrefix "as-needed" the
// default locale has no prefix (/platform) and the others do (/ar/platform).
// Every page declares itself as canonical and lists every language version
// (hreflang), so Google indexes each language instead of folding them into
// the English page.

import type { Metadata } from "next";
import { defaultLocale, locales } from "@/i18n/config";

export const SITE_URL = "https://openqcore.com";

export function localizedPath(locale: string, path: string): string {
  const p = path === "/" ? "" : path;
  if (locale === defaultLocale) return p || "/";
  return `/${locale}${p}`;
}

export function localizedUrl(locale: string, path: string): string {
  return `${SITE_URL}${localizedPath(locale, path)}`;
}

export function languageAlternates(path: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of locales) out[l] = localizedUrl(l, path);
  out["x-default"] = localizedUrl(defaultLocale, path);
  return out;
}

export function pageAlternates(locale: string, path: string): NonNullable<Metadata["alternates"]> {
  return { canonical: localizedUrl(locale, path), languages: languageAlternates(path) };
}

// Next.js replaces (does not merge) a parent's openGraph when a page sets
// its own, so pages that only want a localized og:url start from these
// site defaults (the same values as the root layout).
export const defaultOpenGraph = {
  type: "website",
  siteName: "OpenQCore AI",
  title: "OpenQCore AI | Enterprise AI Platform for Agents, Automation & White-Label AI",
  description:
    "Build production-ready AI systems with intelligent agents, enterprise automation, multimodal AI, developer APIs, knowledge platforms, and white-label AI infrastructure.",
  images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "OpenQCore AI Platform" }],
} satisfies NonNullable<Metadata["openGraph"]>;

export function pageOpenGraph(locale: string, path: string, overrides: Partial<NonNullable<Metadata["openGraph"]>> = {}) {
  return { ...defaultOpenGraph, ...overrides, url: localizedUrl(locale, path) } as NonNullable<Metadata["openGraph"]>;
}
