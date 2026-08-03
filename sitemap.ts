import type { MetadataRoute } from "next";
import { marketingRoutes } from "@/app/lib/seo/routes";

const BASE_URL = "https://openqcore.com";

const locales = [
  "en",
  "ar",
  "de",
  "fr",
  "es",
  "it",
  "pt",
  "tr",
  "sq",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return marketingRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url:
        route.path === "/"
          ? `${BASE_URL}/${locale}`
          : `${BASE_URL}/${locale}${route.path}`,

      lastModified: now,

      changeFrequency: route.changeFrequency,

      priority: route.priority,
    }))
  );
}