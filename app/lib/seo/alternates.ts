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
