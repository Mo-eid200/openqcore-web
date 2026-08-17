import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import "../globals.css";

import { Suspense } from "react";
import SessionExpiredNotice from "../../app/[locale]/(marketing)/components/SessionExpiredNotice";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import Providers from "../providers";

const cairo = Cairo({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"]
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openqcore.com"),

  title: {
    default: "OpenQCore AI",
    template: "%s | OpenQCore AI",
  },

  description:
    "OpenQCore is an enterprise AI platform for intelligent agents, multimodal AI, AI automation, white-label AI platforms, knowledge systems, production infrastructure, developer APIs, and enterprise digital transformation.",

  applicationName: "OpenQCore AI",

  keywords: [
    "OpenQCore",
    "Artificial Intelligence",
    "Enterprise AI",
    "AI Platform",
    "AI Infrastructure",
    "AI Agents",
    "AI Automation",
    "Business Automation",
    "Workflow Automation",
    "Enterprise Automation",
    "White Label AI",
    "White Label AI Platform",
    "AI SaaS",
    "Generative AI",
    "LLM",
    "Large Language Models",
    "AI API",
    "Developer API",
    "AI SDK",
    "AI Workspace",
    "AI Studio",
    "Knowledge Base",
    "Knowledge Management",
    "Vector Search",
    "Retrieval Augmented Generation",
    "RAG",
    "Multimodal AI",
    "Vision AI",
    "Voice AI",
    "AI Infrastructure",
    "Machine Learning",
    "Deep Learning",
    "Enterprise Software",
    "Research Platform",
    "AI Research",
    "Digital Transformation",
    "Autonomous Enterprise",
  ],

  authors: [
    {
      name: "OpenQCore",
      url: "https://openqcore.com",
    },
  ],

  creator: "OpenQCore",
  publisher: "OpenQCore",

  category: "Technology",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://openqcore.com",
  },

  openGraph: {
    type: "website",
    url: "https://openqcore.com",
    siteName: "OpenQCore AI",

    title:
      "OpenQCore AI | Enterprise AI Platform for Agents, Automation & White-Label AI",

    description:
      "Build production-ready AI systems with intelligent agents, enterprise automation, multimodal AI, developer APIs, knowledge platforms, and white-label AI infrastructure.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OpenQCore AI Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "OpenQCore AI | Enterprise AI Platform",

    description:
      "Enterprise AI platform for intelligent agents, automation, multimodal AI, APIs, and white-label AI solutions.",

    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default async function LocaleRootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      dir="ltr"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${cairo.variable}
        dark
        h-full
        scroll-smooth
      `}
    >
      <body
        className="
          min-h-screen
          bg-[#070b14]
          text-white
          antialiased
          overflow-x-hidden
          font-sans
          relative
          selection:bg-[#d4af37]/20
          selection:text-white
        "
        style={{
          fontFamily:
            locale === "ar"
              ? "var(--font-arabic), sans-serif"
              : "var(--font-geist-sans), Inter, sans-serif"
        }}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Suspense fallback={null}>
              <SessionExpiredNotice />
            </Suspense>
            <div className="relative min-h-screen">{children}</div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}