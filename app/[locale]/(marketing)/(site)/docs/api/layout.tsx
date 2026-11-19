import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pageAlternates, pageOpenGraph } from "@/app/lib/seo/alternates";

// The page is a client component, so its metadata lives here.
export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
): Promise<Metadata> {
  const { locale } = await params;
  const meta: Metadata = {
    alternates: pageAlternates(locale, "/docs/api"),
    openGraph: pageOpenGraph(locale, "/docs/api"),
  };
  const t = await getTranslations({ locale, namespace: "docs_api_page" });
  if (t.has("seo.title")) meta.title = t("seo.title");
  if (t.has("seo.description")) meta.description = t("seo.description");
  if (meta.title || meta.description) {
    meta.openGraph = pageOpenGraph(locale, "/docs/api", {
      ...(meta.title ? { title: String(meta.title) } : {}),
      ...(meta.description ? { description: String(meta.description) } : {}),
    });
  }
  return meta;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
