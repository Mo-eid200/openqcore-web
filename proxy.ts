import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale, localePrefix } from "@/i18n/config";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
  localeDetection: true,
});

export const config = {
  matcher: [
    "/",
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
  ],
};