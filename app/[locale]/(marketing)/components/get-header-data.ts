import type { MarketingHeaderData } from "./types";

export function getHeaderData(
  t: (key: string) => string
): MarketingHeaderData {
  return {
    sections: [
      {
        id: "platform",
        label: t("navbar.platform"),
        href: "/platform",
        groups: [
          {
            id: "platform-core",
            title: t("navbar.platform_core"),
            items: [
              {
                id: "platform-studio",
                title: t("menu.studio.title"),
                desc: t("menu.studio.desc"),
                href: "/platform/studio",
              },
              {
                id: "platform-voice",
                title: t("menu.voice.title"),
                desc: t("menu.voice.desc"),
                href: "/platform/voice",
              },
              {
                id: "platform-agents",
                title: t("menu.agents.title"),
                desc: t("menu.agents.desc"),
                href: "/platform/agents",
              },
            ],
          },
          {
            id: "platform-resources",
            title: t("navbar.platform_resources"),
            items: [
              {
                id: "docs",
                title: t("menu.docs.title"),
                desc: t("menu.docs.desc"),
                href: "/docs",
              },
              {
                id: "api-reference",
                title: t("menu.api_reference.title"),
                desc: t("menu.api_reference.desc"),
                href: "/docs/api",
              },
              {
                id: "system-status",
                title: t("menu.system_status.title"),
                desc: t("menu.system_status.desc"),
                href: "/status",
                comingSoon: true,
              },
            ],
          },
        ],
        releaseCard: {
          id: "platform-release",
          badge: t("navbar.latest_release"),
          title: t("navbar.release_title"),
          desc: t("navbar.release_desc"),
          href: "/changelog",
        },
        featureCard: {
          id: "platform-preview",
          title: t("navbar.platform_card_title"),
          desc: t("navbar.platform_card_desc"),
          href: "/platform",
          image: "/engines/platform-card.png",
        },
      },

      {
        id: "infrastructure",
        label: t("navbar.infrastructure"),
        href: "/platform/infrastructure",
        groups: [
          {
            id: "infrastructure-stack",
            title: t("navbar.infrastructure_stack"),
            items: [
              // 🔧 FIX: these were pointing at /infrastructure/* —
              // the actual pages built this session live under
              // /platform/* (confirmed via each page's own
              // `canonical` metadata: pulse_engine_page.tsx and
              // memory_systems_page.tsx both declare
              // "https://openqcore.com/platform/...").
              {
                id: "pulse-engine",
                title: t("menu.pulse_engine.title"),
                desc: t("menu.pulse_engine.desc"),
                href: "/infrastructure/pulse-engine",
              },
              {
                id: "memory-systems",
                title: t("menu.memory_systems.title"),
                desc: t("menu.memory_systems.desc"),
                href: "/infrastructure/memory-systems",
              },
              {
                id: "runtime",
                title: t("menu.runtime.title"),
                desc: t("menu.runtime.desc"),
                href: "/infrastructure/runtime",
              },
              {
                id: "multimodal-stack",
                title: t("menu.multimodal_stack.title"),
                desc: t("menu.multimodal_stack.desc"),
                href: "/infrastructure/multimodal-stack",
              },
            ],
          },
        ],
        releaseCard: {
          id: "infra-voice",
          badge: t("navbar.featured_badge"),
          title: t("navbar.voice_card_title"),
          desc: t("navbar.voice_card_desc"),
          href: "/platform/voice",
        },
        featureCard: {
          id: "infra-pulse-preview",
          title: t("navbar.pulse_card_title"),
          desc: t("navbar.pulse_card_desc"),
          href: "/infrastructure/pulse-engine",
          image: "/engines/pulse-logo.png",
        },
      },

      {
        id: "developers",
        label: t("navbar.developers"),
        href: "/developers",
        groups: [
          {
            id: "developers-explore",
            title: t("navbar.developers_explore"),
            items: [
              {
                id: "sdks",
                title: t("menu.sdks.title"),
                desc: t("menu.sdks.desc"),
                href: "/developers/sdks",
              },
              {
                id: "playground",
                title: t("menu.playground.title"),
                desc: t("menu.playground.desc"),
                href: "/developers/playground",
              },
              {
                id: "integration-guides",
                title: t("menu.integration_guides.title"),
                desc: t("menu.integration_guides.desc"),
                href: "/developers/guides",
              },
            ],
          },
          {
            id: "developers-support",
            title: t("navbar.developers_support"),
            items: [
              {
                id: "developers-showcase",
                title: t("menu.showcase.title"),
                desc: t("menu.showcase.desc"),
                href: "/developers/showcase",
              },
              {
                id: "developer-blog",
                title: t("menu.developer_blog.title"),
                desc: t("menu.developer_blog.desc"),
                href: "/blog",
              },
              {
                // 🔧 FIX: was "/contact" — the real support page
                // (form + ticketing backend + email + in-app
                // notifications, all built and verified this
                // session) lives at /developers/support.
                id: "support",
                title: t("menu.support.title"),
                desc: t("menu.support.desc"),
                href: "/developers/support",
              },
            ],
          },
        ],
      },

      {
        id: "solutions",
        label: t("navbar.solutions"),
        href: "/solutions",
        groups: [
          {
            id: "solutions-industries",
            title: t("navbar.solutions_industries"),
            items: [
              {
                id: "enterprise",
                title: t("menu.enterprise.title"),
                desc: t("menu.enterprise.desc"),
                href: "/solutions/enterprise",
              },
              {
                id: "startups",
                title: t("menu.startups.title"),
                desc: t("menu.startups.desc"),
                href: "/solutions/startups",
              },
            ],
          },
          {
            id: "solutions-security",
            title: t("navbar.solutions_security"),
            items: [
              {
                id: "security",
                title: t("menu.security.title"),
                desc: t("menu.security.desc"),
                href: "/solutions/security",
              },
              {
                id: "compliance",
                title: t("menu.compliance.title"),
                desc: t("menu.compliance.desc"),
                href: "/solutions/compliance",
              },
            ],
          },
        ],
      },

      {
        id: "research",
        label: t("navbar.research"),
        href: "/research",
        groups: [
          {
            id: "research-topics",
            title: t("navbar.research_topics"),
            items: [
              {
                id: "ai-systems",
                title: t("menu.ai_systems.title"),
                desc: t("menu.ai_systems.desc"),
                href: "/research/ai-systems",
              },
              {
                id: "voice-intelligence",
                title: t("menu.voice_intelligence.title"),
                desc: t("menu.voice_intelligence.desc"),
                href: "/research/voice-intelligence",
              },
              {
                id: "multimodal-intelligence",
                title: t("menu.multimodal_intelligence.title"),
                desc: t("menu.multimodal_intelligence.desc"),
                href: "/research/multimodal-intelligence",
              },
              {
                id: "ai-safety",
                title: t("menu.ai_safety.title"),
                desc: t("menu.ai_safety.desc"),
                href: "/research/ai-safety",
              },
            ],
          },

          {
            id: "research-programs",
            title: t("navbar.research_programs"),
            items: [
              {
                id: "publications",
                title: t("menu.publications.title"),
                desc: t("menu.publications.desc"),
                href: "/research/publications",
              },
              {
                id: "open-research",
                title: t("menu.open_research.title"),
                desc: t("menu.open_research.desc"),
                href: "/research/open-research",
              },
              {
                id: "residency",
                title: t("menu.residency.title"),
                desc: t("menu.residency.desc"),
                href: "/research/residency",
              },
            ],
          },
        ],
        releaseCard: {
          id: "research-lab",
          badge: t("navbar.research_badge"),
          title: t("navbar.research_lab_title"),
          desc: t("navbar.research_lab_desc"),
          href: "/research",
        },
        featureCard: {
          id: "research-preview",
          title: t("navbar.research_card_title"),
          desc: t("navbar.research_card_desc"),
          href: "/research/publications",
          image: "/engines/research-card.png",
        },
      },

      {
        id: "foundation",
        label: t("navbar.foundation"),
        href: "/foundation",
        groups: [
          {
            id: "foundation-initiatives",
            title: t("navbar.foundation_initiatives"),
            items: [
              {
                id: "community",
                title: t("menu.community.title"),
                desc: t("menu.community.desc"),
                href: "/foundation/community",
              },
              {
                id: "research-collaboration",
                title: t("menu.research_collaboration.title"),
                desc: t("menu.research_collaboration.desc"),
                href: "/foundation/research-collaboration",
              },
              {
                id: "education",
                title: t("menu.education.title"),
                desc: t("menu.education.desc"),
                href: "/foundation/education",
              },
              {
                id: "responsibility",
                title: t("menu.responsibility.title"),
                desc: t("menu.responsibility.desc"),
                href: "/foundation/responsibility",
              },
            ],
          },
        ],
      },

      {
        id: "company",
        label: t("navbar.company"),
        href: "/company",
        groups: [
          {
            id: "company-about",
            title: t("navbar.company_about"),
            items: [
              {
                id: "about",
                title: t("menu.about.title"),
                desc: t("menu.about.desc"),
                href: "/company/about",
              },
              {
                id: "leadership",
                title: t("menu.leadership.title"),
                desc: t("menu.leadership.desc"),
                href: "/company/leadership",
              },
              {
                id: "careers",
                title: t("menu.careers.title"),
                desc: t("menu.careers.desc"),
                href: "/company/careers",
              },
              {
                id: "brand-assets",
                title: t("menu.brand_assets.title"),
                desc: t("menu.brand_assets.desc"),
                href: "/company/brand",
                comingSoon: true,
              },
            ],
          },
          {
            id: "media_resources",
            title: t("navbar.media_resources"),
            items: [
              {
                id: "newsroom",
                title: t("menu.newsroom.title"),
                desc: t("menu.newsroom.desc"),
                href: "/company/newsroom",
                comingSoon: true,
              },
              {
                id: "contact",
                title: t("menu.contact.title"),
                desc: t("menu.contact.desc"),
                href: "/company/contact",
              },
            ],
          },
        ],
      },
    ],
  };
}