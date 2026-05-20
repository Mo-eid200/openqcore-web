export type Language = {
    code: string;
    label: string;
    country: string;
    dir: "ltr" | "rtl";
    flag: string;
};

export const languages: Language[] = [
    { code: "en", label: "English", country: "United States", dir: "ltr", flag: "🇺🇸" },
    { code: "ar", label: "العربية", country: "مصر", dir: "rtl", flag: "🇪🇬" },
    { code: "fr", label: "Français", country: "France", dir: "ltr", flag: "🇫🇷" },
    { code: "de", label: "Deutsch", country: "Deutschland", dir: "ltr", flag: "🇩🇪" },
    { code: "es", label: "Español", country: "España", dir: "ltr", flag: "🇪🇸" },
];
export const defaultLocale = "en";