import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import "../globals.css";

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
  title: "OpenQCore",
  description: "Next-generation AI infrastructure platform",
  icons: {
    icon: "/favicon.ico"
  }
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
            <div className="relative min-h-screen">{children}</div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}