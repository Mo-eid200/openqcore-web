export type MarketingNavItem = {
  id: string;
  title: string;
  desc?: string;
  href: string;
  comingSoon?: boolean;
};

export type MarketingNavGroup = {
  id: string;
  title: string;
  items: MarketingNavItem[];
};

export type MarketingFeatureCard = {
  id: string;
  title: string;
  desc: string;
  href: string;
  image?: string;
};

export type MarketingReleaseCard = {
  id: string;
  badge: string;
  title: string;
  desc: string;
  href: string;
};

export type MarketingNavSection = {
  id: string;
  label: string;
  href: string;
  groups: MarketingNavGroup[];
  featureCard?: MarketingFeatureCard;
  releaseCard?: MarketingReleaseCard;
};

export type MarketingHeaderData = {
  sections: MarketingNavSection[];
};