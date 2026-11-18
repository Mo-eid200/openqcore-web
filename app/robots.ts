import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/lib/seo/alternates";

// Signed-in areas and the OAuth return page are not for search engines,
// in any language (/console and /ar/console alike).
const PRIVATE = ["/console", "/workspace", "/auth/", "/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/og"],
        disallow: [...PRIVATE, ...PRIVATE.filter((p) => !p.startsWith("/api")).map((p) => `/*${p}`)],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
