import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const isDev = process.env.NODE_ENV === "development";

function origin(url: string | undefined, fallback: string): string {
  try {
    return new URL(url || fallback).origin;
  } catch {
    return new URL(fallback).origin;
  }
}

// The browser talks to the API (REST, uploads). Links to the chat app are plain navigations.
const API_ORIGIN = origin(process.env.NEXT_PUBLIC_QXT_API_BASE_URL, isDev ? "http://localhost:8000" : "https://api.openqcore.com");
const API_WS = API_ORIGIN.replace(/^http/, "ws");

// Content-Security-Policy. Next.js inlines its bootstrap scripts, so a
// nonce-free policy needs 'unsafe-inline' for scripts; everything else is
// locked down: no plugins, no foreign frames around our pages, no form posts
// or <base> to other origins, and network access only to our own services.
// (A nonce policy would force every page to render dynamically.)
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "media-src 'self' blob: https:",
  `connect-src 'self' ${API_ORIGIN} ${API_WS}${isDev ? " ws: http://localhost:*" : ""}`,
  "frame-src 'self'",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  `form-action 'self' ${API_ORIGIN}`,
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // the voice features need the microphone on our own pages only
  { key: "Permissions-Policy", value: "camera=(), microphone=(self), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
];

const noIndex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // signed-in areas, in every language
      { source: "/:area(console|workspace|auth)/:path*", headers: noIndex },
      { source: "/:locale/:area(console|workspace|auth)/:path*", headers: noIndex },
    ];
  },
};

export default withNextIntl(nextConfig);
