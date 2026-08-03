export type Language = {
  code: string;
  label: string;
  country: string;
  dir: "ltr" | "rtl";
  flag: string;
};

export const languages: Language[] = [
  {
    code: "en",
    label: "English (Default)",
    country: "United States",
    dir: "ltr",
    flag: "🇺🇸"
  },
  {
    code: "sq",
    label: "Shqip",
    country: "Shqipëria",
    dir: "ltr",
    flag: "🇦🇱"
  },
    {
    code: "ar",
    label: "العربية",
    country: "الشرق الاوسط",
    dir: "rtl",
    flag: "🇸🇦"
  },
  {
    code: "fr",
    label: "Français",
    country: "France",
    dir: "ltr",
    flag: "🇫🇷"
  },
  {
    code: "de",
    label: "Deutsch",
    country: "Deutschland",
    dir: "ltr",
    flag: "🇩🇪"
  },
  {
    code: "es",
    label: "Español",
    country: "España",
    dir: "ltr",
    flag: "🇪🇸"
  },
  {
    code: "it",
    label: "Italiano",
    country: "Italia",
    dir: "ltr",
    flag: "🇮🇹"
  },
  {
    code: "tr",
    label: "Türkçe",
    country: "Türkiye",
    dir: "ltr",
    flag: "🇹🇷"
  },
  {
    code: "pt",
    label: "Português",
    country: "Portugal",
    dir: "ltr",
    flag: "🇵🇹"
  }
];