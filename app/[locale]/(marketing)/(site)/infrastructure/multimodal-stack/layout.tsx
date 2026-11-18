import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pageAlternates, localizedUrl } from "@/app/lib/seo/alternates";

// The page is a client component, so its metadata lives here.
export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
): Promise<Metadata> {
  const { locale } = await params;
  const meta: Metadata = {
    alternates: pageAlternates(locale, "/infrastructure/multimodal-stack"),
    openGraph: { url: localizedUrl(locale, "/infrastructure/multimodal-stack") },
  };
  const t = await getTranslations({ locale, namespace: 'multimodal_stack_page' });
  if (t.has("seo.title")) meta.title = t("seo.title");
  if (t.has("seo.description")) meta.description = t("seo.description");
  return meta;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
