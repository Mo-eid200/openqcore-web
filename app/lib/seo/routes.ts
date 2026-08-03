import type { MetadataRoute } from "next";

export type SeoRoute = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

export const marketingRoutes: SeoRoute[] = [
  // Home
  { path: "/", priority: 1.0, changeFrequency: "daily" },

  // Platform
  { path: "/platform", priority: 0.95, changeFrequency: "weekly" },
  { path: "/platform/agents", priority: 0.90, changeFrequency: "weekly" },
  { path: "/platform/models", priority: 0.90, changeFrequency: "weekly" },
  { path: "/platform/studio", priority: 0.90, changeFrequency: "weekly" },
  { path: "/platform/analytics", priority: 0.90, changeFrequency: "weekly" },
  { path: "/platform/voice", priority: 0.90, changeFrequency: "weekly" },
  { path: "/platform/infrastructure", priority: 0.90, changeFrequency: "weekly" },
  { path: "/platform/enterprise", priority: 0.90, changeFrequency: "weekly" },

  // Infrastructure
  { path: "/infrastructure", priority: 0.90, changeFrequency: "weekly" },
  { path: "/infrastructure/runtime", priority: 0.85, changeFrequency: "weekly" },
  { path: "/infrastructure/pulse-engine", priority: 0.85, changeFrequency: "weekly" },
  { path: "/infrastructure/memory-systems", priority: 0.85, changeFrequency: "weekly" },
  { path: "/infrastructure/multimodal-stack", priority: 0.85, changeFrequency: "weekly" },

  // Research
  { path: "/research", priority: 0.90, changeFrequency: "weekly" },
  { path: "/research/ai-systems", priority: 0.85, changeFrequency: "weekly" },
  { path: "/research/ai-safety", priority: 0.85, changeFrequency: "weekly" },
  { path: "/research/multimodal-intelligence", priority: 0.85, changeFrequency: "weekly" },
  { path: "/research/voice-intelligence", priority: 0.85, changeFrequency: "weekly" },
  { path: "/research/open-research", priority: 0.85, changeFrequency: "weekly" },
  { path: "/research/publications", priority: 0.85, changeFrequency: "weekly" },
  { path: "/research/residency", priority: 0.85, changeFrequency: "weekly" },

  // Solutions
  { path: "/solutions", priority: 0.90, changeFrequency: "weekly" },
  { path: "/solutions/enterprise", priority: 0.80, changeFrequency: "monthly" },
  { path: "/solutions/government", priority: 0.80, changeFrequency: "monthly" },
  { path: "/solutions/finance", priority: 0.80, changeFrequency: "monthly" },
  { path: "/solutions/healthcare", priority: 0.80, changeFrequency: "monthly" },
  { path: "/solutions/education", priority: 0.80, changeFrequency: "monthly" },
  { path: "/solutions/ecommerce", priority: 0.80, changeFrequency: "monthly" },
  { path: "/solutions/security", priority: 0.80, changeFrequency: "monthly" },
  { path: "/solutions/compliance", priority: 0.80, changeFrequency: "monthly" },
  { path: "/solutions/startups", priority: 0.80, changeFrequency: "monthly" },

  // Foundation
  { path: "/foundation", priority: 0.75, changeFrequency: "monthly" },
  { path: "/foundation/community", priority: 0.70, changeFrequency: "monthly" },
  { path: "/foundation/education", priority: 0.70, changeFrequency: "monthly" },
  { path: "/foundation/research-collaboration", priority: 0.70, changeFrequency: "monthly" },
  { path: "/foundation/responsibility", priority: 0.70, changeFrequency: "monthly" },

  // Process
  { path: "/process/research-discovery", priority: 0.70, changeFrequency: "monthly" },
  { path: "/process/strategy-architecture", priority: 0.70, changeFrequency: "monthly" },
  { path: "/process/solution-design", priority: 0.70, changeFrequency: "monthly" },
  { path: "/process/development-integration", priority: 0.70, changeFrequency: "monthly" },
  { path: "/process/deployment-enablement", priority: 0.70, changeFrequency: "monthly" },
  { path: "/process/monitoring-optimization", priority: 0.70, changeFrequency: "monthly" },

  // Company
  { path: "/company", priority: 0.75, changeFrequency: "monthly" },
  { path: "/company/about", priority: 0.70, changeFrequency: "monthly" },
  { path: "/company/leadership", priority: 0.70, changeFrequency: "monthly" },
  { path: "/company/careers", priority: 0.60, changeFrequency: "weekly" },
  { path: "/company/contact", priority: 0.60, changeFrequency: "monthly" },
  { path: "/company/security", priority: 0.70, changeFrequency: "monthly" },
  { path: "/company/legal/privacy", priority: 0.30, changeFrequency: "yearly" },
  { path: "/company/legal/terms", priority: 0.30, changeFrequency: "yearly" },

  // Developers
  { path: "/developers", priority: 0.80, changeFrequency: "weekly" },
  { path: "/developers/support", priority: 0.60, changeFrequency: "monthly" },

  // Docs
  { path: "/docs", priority: 0.85, changeFrequency: "weekly" },
  { path: "/docs/api", priority: 0.85, changeFrequency: "weekly" },
  { path: "/docs/authentication", priority: 0.80, changeFrequency: "weekly" },
  { path: "/docs/architecture", priority: 0.80, changeFrequency: "weekly" },
  { path: "/docs/chat", priority: 0.80, changeFrequency: "weekly" },
  { path: "/docs/knowledge", priority: 0.80, changeFrequency: "weekly" },
  { path: "/docs/voice", priority: 0.80, changeFrequency: "weekly" },
  { path: "/docs/providers", priority: 0.80, changeFrequency: "weekly" },
  { path: "/docs/sessions", priority: 0.80, changeFrequency: "weekly" },
  { path: "/docs/iris", priority: 0.80, changeFrequency: "weekly" },
  { path: "/docs/output-contracts", priority: 0.80, changeFrequency: "weekly" },

  // Changelog
  { path: "/changelog", priority: 0.60, changeFrequency: "weekly" },
  { path: "/changelog/pulse-engine", priority: 0.60, changeFrequency: "weekly" },
];