import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ImageWithLightbox from "../../../components/common/ImageWithLightbox";

export const metadata: Metadata = {
  title:
    "OpenQCore for Commerce — Intelligence for Every Commerce Decision",
  description:
    "OpenQCore connects customers, products, operations, payments and business intelligence into one adaptive commerce system.",
  openGraph: {
    title: "OpenQCore for Commerce",
    description:
      "AI across the commerce lifecycle — connecting customers, products, transactions and operations.",
    type: "website",
    url: "https://openqcore.com/solutions/ecommerce",
    images: [{ url: "/og-ecommerce.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenQCore for Commerce",
    description:
      "AI across the commerce lifecycle — connecting customers, products, transactions and operations."
  },
  alternates: {
    canonical: "https://openqcore.com/solutions/ecommerce"
  }
};

/* ════════════════════════════════════════════════════════════
   Shared primitives (identical to government/healthcare/finance/
   education)
════════════════════════════════════════════════════════════ */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
      <span className="h-px w-6 bg-[#d4af37]/40" />
      {children}
    </p>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </svg>
  );
}

function PrimaryCTA({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        group inline-flex items-center gap-2.5
        rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#e7c766]
        px-7 py-4 text-sm font-semibold text-[#0B1F3B]
        shadow-[0_8px_32px_rgba(212,175,55,0.22)]
        transition-all duration-300
        hover:scale-[1.02]
        hover:shadow-[0_12px_48px_rgba(212,175,55,0.32)]
        active:scale-[0.99]
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-[#d4af37]
      "
    >
      {children}
      <ArrowIcon />
    </Link>
  );
}

function SecondaryCTA({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        inline-flex items-center gap-2
        rounded-2xl border border-white/8 bg-white/3
        px-7 py-4 text-sm font-semibold text-slate-200
        transition-all duration-300
        hover:border-white/15 hover:bg-white/6 hover:text-white
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-white/60
      "
    >
      {children}
    </Link>
  );
}

/* ════════════════════════════════════════════════════════════
   Hero background — commerce / transaction network
   (same node-graph technique as the other solutions heroes)
════════════════════════════════════════════════════════════ */

function HeroCommerceGraphic() {
  const points: [number, number][] = [
    [140, 100],
    [330, 65],
    [540, 135],
    [750, 75],
    [970, 125],
    [1190, 85],
    [210, 265],
    [420, 305],
    [640, 255],
    [850, 315],
    [1070, 275],
    [1260, 335],
    [300, 425],
    [560, 405],
    [820, 435],
    [1050, 405]
  ];

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.35]"
      viewBox="0 0 1400 500"
      fill="none"
      aria-hidden="true"
    >
      {points.map(([x, y], i) => {
        const next = points[(i + 3) % points.length];
        return (
          <line
            key={`edge-${i}`}
            x1={x}
            y1={y}
            x2={next[0]}
            y2={next[1]}
            stroke="#d4af37"
            strokeOpacity="0.12"
            strokeWidth="1"
          />
        );
      })}

      {points.map(([x, y], i) => (
        <circle
          key={`node-${i}`}
          cx={x}
          cy={y}
          r={i % 4 === 0 ? 4 : 3}
          fill="#d4af37"
          fillOpacity="0.55"
        />
      ))}
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════
   Architecture / diagram image wrapper
   (identical to government/healthcare/finance/education)
════════════════════════════════════════════════════════════ */

function ArchitectureImage({
  src,
  alt,
  light = false,
  priority = false,
  width = 1792,
  height = 1024,
  maxWidth = "1400px"
}: {
  src: string;
  alt: string;
  light?: boolean;
  priority?: boolean;
  width?: number;
  height?: number;
  maxWidth?: string;
}) {
  return (
    <div
      style={{ maxWidth }}
      className={`
        relative mx-auto overflow-hidden rounded-[28px] border
        ${
          light
            ? "border-[#d4af37]/20 bg-[#f7f5f0]"
            : "border-white/7 bg-[#080e1a]"
        }
        shadow-[0_28px_90px_rgba(0,0,0,0.22)]
      `}
    >
      <ImageWithLightbox
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        imageClassName="h-auto w-full object-contain"
      />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   Page
════════════════════════════════════════════════════════════ */

export default async function EcommercePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const customerCapabilityKeys = [
    "customer_understanding",
    "conversational_commerce",
    "customer_journey_segments",
    "dynamic_personalization",
    "service_agents",
    "escalation_handling"
  ];

  const productDiscoveryKeys = [
    "product_knowledge",
    "semantic_search",
    "multimodal_search",
    "natural_language_search",
    "recommendations",
    "ranking_relevance"
  ];

  const merchandisingPricingKeys = [
    "assortment_intelligence",
    "catalog_quality",
    "campaign_insights",
    "demand_analysis",
    "pricing_intelligence",
    "promotion_performance"
  ];

  const fulfilmentStages = [
    "order",
    "inventory",
    "warehouse",
    "carrier",
    "delivery",
    "returns"
  ];

  const operationsTrustKeys = [
    "catalog_operations",
    "inventory_operations",
    "customer_operations",
    "order_exceptions",
    "transaction_risk",
    "account_abuse",
    "promotion_abuse",
    "returns_fraud"
  ];

  const analyticsCapabilityKeys = [
    "funnel_analysis",
    "product_performance",
    "channel_analysis",
    "evidence_linked_answers"
  ];

  const autonomyLevels = [
    "assist",
    "recommend",
    "optimize",
    "orchestrate",
    "execute"
  ];

  const deploymentKeys = ["cloud", "private_cloud", "on_premises", "hybrid"];

  return (
    <main className="min-h-screen bg-[#050911] text-white">
      {/* ═══════════════════════════════════════════════════════
          1. HERO
          No dedicated hero image — inline HeroCommerceGraphic
          keeps this section consistent with the rest of the site.
      ═══════════════════════════════════════════════════════ */}

      <section className="relative isolate overflow-hidden border-b border-white/4">
        <HeroCommerceGraphic />

        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#050911] via-[#050911]/70 to-[#050911]" />

        <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-32 text-center md:pb-32 md:pt-44 lg:px-8">
          <div className="mx-auto flex justify-center">
            <SectionLabel>{t("ecommerce_page.eyebrow")}</SectionLabel>
          </div>

          <h1 className="ar-heading mx-auto mt-8 max-w-4xl text-[clamp(2.4rem,5.5vw,4.4rem)] font-bold leading-[1.02] tracking-tighter text-white">
            {t("ecommerce_page.title_line_1")}
            <br />
            {t("ecommerce_page.title_line_2")}
          </h1>

          <p className="ar-body mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">
            {t("ecommerce_page.description")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PrimaryCTA href="#capabilities">
              {t("ecommerce_page.primary_cta")}
            </PrimaryCTA>

            <SecondaryCTA href="/contact">
              {t("ecommerce_page.secondary_cta")}
            </SecondaryCTA>
          </div>

          <p className="mt-10 text-xs uppercase tracking-[0.2em] text-slate-500">
            {t("ecommerce_page.hero_tags")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. THE AUTONOMOUS COMMERCE LOOP

          IMAGE 1 — The most important visual on the page. A
          large closed loop: CUSTOMER → Discover/Search → Intent
          → Personalization → Purchase → Order & Payment →
          Fulfilment → Service & Retention → Behavior Signals →
          Commerce Intelligence → splits into Customer / Product
          / Operations Intelligence → Decision Layer → back to
          CUSTOMER. Same circular technique as the other
          solutions loops, scaled up with a clear mid-loop
          branch.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>{t("ecommerce_page.loop_label")}</SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("ecommerce_page.loop_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("ecommerce_page.loop_p1")}
            </p>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/ecommerce/autonomous-commerce-loop.png"
              alt="OpenQCore autonomous commerce loop connecting customer intent, personalization, purchase, fulfilment and commerce intelligence"
              priority
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. CUSTOMER INTELLIGENCE
          (merges Customer Intelligence + Conversational Commerce
          + Customer Service Agents — all customer-facing)
      ═══════════════════════════════════════════════════════ */}

      <section id="capabilities" className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("ecommerce_page.customer_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("ecommerce_page.customer_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("ecommerce_page.customer_p1")}
            </p>
          </div>

          <p className="ar-body mt-8 max-w-2xl rounded-2xl border border-white/6 bg-[#0b1222] px-6 py-5 text-base italic leading-7 text-slate-300">
            {t("ecommerce_page.customer_example")}
          </p>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {customerCapabilityKeys.map((key) => (
              <article
                key={key}
                className="
                  rounded-3xl border border-white/6
                  bg-[#0b1222] p-7
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-[#d4af37]/20
                "
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`ecommerce_page.customer.${key}.title`)}
                </h3>

                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`ecommerce_page.customer.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. PRODUCT & DISCOVERY INTELLIGENCE
          (merges Product Intelligence + Search & Discovery +
          Personalization/Recommendation — all about connecting
          the right product to the right customer)
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("ecommerce_page.discovery_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("ecommerce_page.discovery_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("ecommerce_page.discovery_p1")}
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {productDiscoveryKeys.map((key) => (
              <article
                key={key}
                className="
                  rounded-3xl border border-white/6
                  bg-[#0b1222] p-7
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-[#d4af37]/20
                "
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`ecommerce_page.discovery.${key}.title`)}
                </h3>

                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`ecommerce_page.discovery.${key}.body`)}
                </p>
              </article>
            ))}
          </div>

          <p className="ar-body mx-auto mt-10 max-w-3xl text-center text-base leading-7 text-slate-400">
            {t("ecommerce_page.discovery_p2_decision_layer")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. COMMERCE KNOWLEDGE GRAPH

          IMAGE 2 — Customer/Intent at the center, connected to a
          real network: Products ↔ Categories ↔ Attributes ↔
          Inventory ↔ Orders ↔ Reviews ↔ Content ↔ Promotions.
          Same treatment as the Curriculum Knowledge Graph in
          Education — a real interconnected graph, not database
          tables.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#080e1a]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("ecommerce_page.knowledge_graph_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("ecommerce_page.knowledge_graph_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("ecommerce_page.knowledge_graph_p1")}
            </p>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/ecommerce/commerce-knowledge-graph.png"
              alt="OpenQCore commerce knowledge graph connecting customer intent to products, categories, attributes, inventory, orders, reviews, content and promotions"
              light
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. MERCHANDISING & PRICING INTELLIGENCE
          (merges Merchandising Intelligence + Pricing &
          Promotion Intelligence, with an explicit human-control
          sentence)
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("ecommerce_page.merchandising_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("ecommerce_page.merchandising_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("ecommerce_page.merchandising_p1")}
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {merchandisingPricingKeys.map((key) => (
              <article
                key={key}
                className="
                  rounded-3xl border border-white/6
                  bg-[#0b1222] p-7
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-[#d4af37]/20
                "
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`ecommerce_page.merchandising.${key}.title`)}
                </h3>

                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`ecommerce_page.merchandising.${key}.body`)}
                </p>
              </article>
            ))}
          </div>

          <p className="ar-body mx-auto mt-10 max-w-3xl text-center text-base leading-7 text-slate-400">
            {t("ecommerce_page.merchandising_p2_human_control")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. ORDER & FULFILMENT INTELLIGENCE

          IMAGE 3 — Horizontal lifecycle, 6 stages: Order →
          Inventory → Warehouse → Carrier → Delivery → Returns.
          A thin supporting layer below the flow (not part of
          the sequence itself) lists Exception Detection · Risk
          Prediction · Orchestration as small tags.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("ecommerce_page.fulfilment_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("ecommerce_page.fulfilment_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("ecommerce_page.fulfilment_p1")}
            </p>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/ecommerce/order-fulfilment-lifecycle.png"
              alt="OpenQCore intelligence across the order and fulfilment lifecycle from order to returns"
            />
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 text-center sm:grid-cols-6">
            {fulfilmentStages.map((key) => (
              <p
                key={key}
                className="ar-body text-xs uppercase tracking-[0.14em] text-slate-500"
              >
                {t(`ecommerce_page.fulfilment_stage.${key}`)}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["exception_detection", "risk_prediction", "orchestration"].map(
              (key) => (
                <span
                  key={key}
                  className="ar-body rounded-full border border-white/8 bg-white/3 px-4 py-2 text-xs text-slate-400"
                >
                  {t(`ecommerce_page.fulfilment_layer.${key}`)}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          8. COMMERCE OPERATIONS & TRUST
          (merges Commerce Operations back-office capabilities
          with Fraud & Trust — both operational/protective)
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("ecommerce_page.operations_trust_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("ecommerce_page.operations_trust_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("ecommerce_page.operations_trust_p1")}
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {operationsTrustKeys.map((key) => (
              <article
                key={key}
                className="
                  rounded-3xl border border-white/6
                  bg-[#0b1222] p-7
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-[#d4af37]/20
                "
              >
                <h3 className="ar-heading text-base font-semibold text-white">
                  {t(`ecommerce_page.operations_trust.${key}.title`)}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          9. COMMERCE ANALYTICS & DECISION INTELLIGENCE
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("ecommerce_page.analytics_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("ecommerce_page.analytics_title")}
            </h2>

            <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
              {t("ecommerce_page.analytics_p1")}
            </p>
          </div>

          <p className="ar-body mt-8 max-w-2xl rounded-2xl border border-white/6 bg-[#0b1222] px-6 py-5 text-base italic leading-7 text-slate-300">
            {t("ecommerce_page.analytics_example")}
          </p>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {analyticsCapabilityKeys.map((key) => (
              <article
                key={key}
                className="
                  rounded-3xl border border-white/6
                  bg-[#0b1222] p-7
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-[#d4af37]/20
                "
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`ecommerce_page.analytics.${key}.title`)}
                </h3>

                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`ecommerce_page.analytics.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          10. COMMERCE AI ARCHITECTURE

          IMAGE 4 — The flagship diagram. Layered top to bottom:
          Customers/Commerce Teams/Support/Operations →
          Storefronts/Apps/Conversational Interfaces/APIs →
          OpenQCore Commerce Intelligence Core (Commerce Agents,
          Reasoning, Customer Intelligence, Product Knowledge
          Graph, Search & Retrieval, Recommendations,
          Multimodal Intelligence, Decision Intelligence,
          Analytics, Orchestration) → Commerce Data Layer
          (Products, Customers, Orders, Inventory, Payments,
          Behavior, Content, Logistics) → Commerce Systems
          (Commerce Platform, CRM, ERP, PIM, OMS, WMS, Payments,
          Logistics). Side rail: Identity · Privacy · Security ·
          Governance · Policy · Evaluation · Human Oversight.
          Build as a real SVG diagram.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#080e1a]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("ecommerce_page.architecture_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("ecommerce_page.architecture_title")}
            </h2>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/ecommerce/commerce-ai-architecture.png"
              alt="OpenQCore commerce AI architecture across interfaces, intelligence core, data layer and commerce systems"
              light
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          11. AUTONOMY IN COMMERCE

          IMAGE 5 — Horizontal 5-step scale: ASSIST → RECOMMEND
          → OPTIMIZE → ORCHESTRATE → EXECUTE. EXECUTE gets a
          visually distinct treatment (different accent) with an
          explicit "authorized actions only" note, same technique
          as the AUTHORIZE step in the Finance governance
          framework.
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#050911]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("ecommerce_page.autonomy_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("ecommerce_page.autonomy_title")}
            </h2>
          </div>

          <div className="mt-16">
            <ArchitectureImage
              src="/images/ecommerce/autonomy-scale.png"
              alt="OpenQCore commerce autonomy scale: assist, recommend, optimize, orchestrate, execute"
            />
          </div>

          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-5">
            {autonomyLevels.map((key) => (
              <div key={key} className="text-center">
                <p
                  className={`ar-heading text-xs font-semibold uppercase tracking-[0.14em] ${
                    key === "execute" ? "text-[#e7c766]" : "text-[#d4af37]"
                  }`}
                >
                  {t(`ecommerce_page.autonomy.${key}.title`)}
                </p>
                <p className="ar-body mt-2 text-xs leading-6 text-slate-400">
                  {t(`ecommerce_page.autonomy.${key}.body`)}
                </p>
              </div>
            ))}
          </div>

          <p className="ar-body mx-auto mt-10 max-w-3xl text-center text-base leading-7 text-slate-400">
            {t("ecommerce_page.autonomy_p1_authorized_only")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          12. DEPLOYMENT
      ═══════════════════════════════════════════════════════ */}

      <section className="border-b border-white/4 bg-[#070d18]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>
              {t("ecommerce_page.deployment_label")}
            </SectionLabel>

            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
              {t("ecommerce_page.deployment_title")}
            </h2>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {deploymentKeys.map((key) => (
              <article
                key={key}
                className="
                  rounded-3xl border border-white/6
                  bg-[#0b1222] p-7
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-[#d4af37]/20
                "
              >
                <h3 className="ar-heading text-lg font-semibold text-white">
                  {t(`ecommerce_page.deployment.${key}.title`)}
                </h3>

                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">
                  {t(`ecommerce_page.deployment.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          13. FINAL CTA
      ═══════════════════════════════════════════════════════ */}

      <section className="bg-[#050911]">
        <div className="mx-auto max-w-[900px] px-6 py-24 text-center md:py-32 lg:px-8">
          <h2 className="ar-heading mx-auto max-w-2xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
            {t("ecommerce_page.final_cta_title")}
          </h2>

          <p className="ar-body mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            {t("ecommerce_page.final_cta_p1")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PrimaryCTA href="/contact">
              {t("ecommerce_page.final_cta_primary")}
            </PrimaryCTA>

            <SecondaryCTA href="#">
              {t("ecommerce_page.final_cta_secondary")}
            </SecondaryCTA>
          </div>
        </div>
      </section>
    </main>
  );
}