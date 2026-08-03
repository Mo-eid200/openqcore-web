import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales } from "@/i18n/config";

export default getRequestConfig(async ({ locale }) => {
  const currentLocale =
    locale && locales.includes(locale as (typeof locales)[number])
      ? locale
      : defaultLocale;

  return {
    locale: currentLocale,
    messages: (await import(`../messages/${currentLocale}.json`)).default
  };
});