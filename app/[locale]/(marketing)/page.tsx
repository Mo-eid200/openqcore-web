import type { Metadata } from "next";
import HeroSection from "./(site)/home/HeroSection";
import LiveAISection from "./(site)/home/LiveAISection";
import RuntimeSection from "./(site)/home/RuntimeSection";
import EcosystemSection from "./(site)/home/EcosystemSection";
import SolutionsSection from "./(site)/home/SolutionsSection";
import HowWeWorkSection from "./(site)/home/HowWeWorkSection";
import CTASection from "./(site)/home/CTASection";

import { localizedUrl, pageAlternates } from "@/app/lib/seo/alternates";
export default function HomePage() {
  return (
    <main className="site-background">
      <HeroSection />
      <LiveAISection />
      <RuntimeSection />
      <EcosystemSection />
      <SolutionsSection />
      <HowWeWorkSection />
      <CTASection />
    </main>
  );
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: pageAlternates(locale, "/"), openGraph: { url: localizedUrl(locale, "/") } };
}
