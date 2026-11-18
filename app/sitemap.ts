import type { MetadataRoute } from "next";
import { marketingRoutes } from "@/app/lib/seo/routes";
import { defaultLocale, locales } from "@/i18n/config";
import { languageAlternates, localizedUrl } from "@/app/lib/seo/alternates";

// One entry per page and language, each listing all its language versions.
// The default language has no prefix (localePrefix "as-needed"), so English
// URLs are /platform, not /en/platform (which would redirect).
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return marketingRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: localizedUrl(locale, route.path),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: locale === defaultLocale ? route.priority : Math.max(0.1, +(route.priority - 0.05).toFixed(2)),
      alternates: { languages: languageAlternates(route.path) },
    })),
  );
}
