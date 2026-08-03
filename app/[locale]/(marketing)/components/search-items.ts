export type SearchItem = {
  title: string;
  description: string;
  href: string;
  keywords: string[];
};

type TFn = (key: string) => string;

export function getSearchItems(
  t: TFn
): SearchItem[] {
  return [
    {
      title: t("routes.home.title"),
      description: t("routes.home.description"),
      href: "/",
      keywords: [
        t("routes.home.keywords.0"),
        t("routes.home.keywords.1"),
        t("routes.home.keywords.2"),
      ],
    },
    {
      title: t("routes.platform.title"),
      description: t("routes.platform.description"),
      href: "/platform",
      keywords: [
        t("routes.platform.keywords.0"),
        t("routes.platform.keywords.1"),
        t("routes.platform.keywords.2"),
      ],
    },
    {
      title: t("routes.infrastructure.title"),
      description: t("routes.infrastructure.description"),
      href: "/infrastructure",
      keywords: [
        t("routes.infrastructure.keywords.0"),
        t("routes.infrastructure.keywords.1"),
        t("routes.infrastructure.keywords.2"),
      ],
    },
    {
      title: t("routes.developers.title"),
      description: t("routes.developers.description"),
      href: "/developers",
      keywords: [
        t("routes.developers.keywords.0"),
        t("routes.developers.keywords.1"),
        t("routes.developers.keywords.2"),
      ],
    },
    {
      title: t("routes.solutions.title"),
      description: t("routes.solutions.description"),
      href: "/solutions",
      keywords: [
        t("routes.solutions.keywords.0"),
        t("routes.solutions.keywords.1"),
        t("routes.solutions.keywords.2"),
      ],
    },
    {
      title: t("routes.research.title"),
      description: t("routes.research.description"),
      href: "/research",
      keywords: [
        t("routes.research.keywords.0"),
        t("routes.research.keywords.1"),
        t("routes.research.keywords.2"),
      ],
    },
    {
      title: t("routes.foundation.title"),
      description: t("routes.foundation.description"),
      href: "/foundation",
      keywords: [
        t("routes.foundation.keywords.0"),
        t("routes.foundation.keywords.1"),
        t("routes.foundation.keywords.2"),
      ],
    },
    {
      title: t("routes.company.title"),
      description: t("routes.company.description"),
      href: "/company",
      keywords: [
        t("routes.company.keywords.0"),
        t("routes.company.keywords.1"),
        t("routes.company.keywords.2"),
      ],
    },
  ];
}