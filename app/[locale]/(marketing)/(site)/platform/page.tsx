import { Link } from "@/i18n/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PrimaryCTA, SecondaryCTA, ArrowIcon } from "../../components/common/CTAButtons";

/* ─── SEO ─────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
    title: "OpenQCore Platform — Unified Infrastructure for AI Systems",
    description:
        "OpenQCore Platform unifies orchestration, voice, agents, and infrastructure into a single operational layer for building intelligent software.",
    openGraph: {
        title: "OpenQCore Platform",
        description:
            "Unified infrastructure for orchestration, voice, agents, and multimodal AI systems.",
        type: "website",
        url: "https://openqcore.com/platform",
        images: [{ url: "/og-platform.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "OpenQCore Platform",
        description:
            "Unified infrastructure for orchestration, voice, agents, and multimodal AI systems.",
    },
    alternates: { canonical: "https://openqcore.com/platform" },
};

/* ─── Components ──────────────────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
            <span className="h-px w-6 bg-[#d4af37]/40" />
            {children}
        </p>
    );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default async function PlatformPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale });

    const platformLayers = [
        {
            title: t("platform_page_cards.layers.interfaces.title"),
            body: t("platform_page_cards.layers.interfaces.body"),
        },
        {
            title: t("platform_page_cards.layers.agents.title"),
            body: t("platform_page_cards.layers.agents.body"),
        },
        {
            title: t("platform_page_cards.layers.orchestration.title"),
            body: t("platform_page_cards.layers.orchestration.body"),
        },
        {
            title: t("platform_page_cards.layers.runtime.title"),
            body: t("platform_page_cards.layers.runtime.body"),
        },
    ];

    const products = [
        {
            eyebrow: t("platform_page_products.studio.eyebrow"),
            title: t("platform_page_products.studio.title"),
            body: t("platform_page_products.studio.body"),
            href: "/platform/studio",
        },
        {
            eyebrow: t("platform_page_products.voice.eyebrow"),
            title: t("platform_page_products.voice.title"),
            body: t("platform_page_products.voice.body"),
            href: "/platform/voice",
        },
        {
            eyebrow: t("platform_page_products.agents.eyebrow"),
            title: t("platform_page_products.agents.title"),
            body: t("platform_page_products.agents.body"),
            href: "/platform/agents",
        },
        {
            eyebrow: t("platform_page_products.infrastructure.eyebrow"),
            title: t("platform_page_products.infrastructure.title"),
            body: t("platform_page_products.infrastructure.body"),
            href: "/infrastructure",
        },
    ];

    const principles = [
        {
            title: t("platform_page_principles.unified_by_design.title"),
            body: t("platform_page_principles.unified_by_design.body"),
        },
        {
            title: t("platform_page_principles.operationally_coherent.title"),
            body: t("platform_page_principles.operationally_coherent.body"),
        },
        {
            title: t("platform_page_principles.built_for_multimodal_systems.title"),
            body: t("platform_page_principles.built_for_multimodal_systems.body"),
        },
        {
            title: t("platform_page_principles.ready_for_production_evolution.title"),
            body: t("platform_page_principles.ready_for_production_evolution.body"),
        },
    ];

    const resources = [
        {
            title: t("platform_page_resources.documentation.title"),
            body: t("platform_page_resources.documentation.body"),
            cta: t("platform_page_resources.documentation.cta"),
            href: "/docs",
        },
        {
            title: t("platform_page_resources.api_reference.title"),
            body: t("platform_page_resources.api_reference.body"),
            cta: t("platform_page_resources.api_reference.cta"),
            href: "/docs/api",
        },
        {
            title: t("platform_page_resources.system_status.title"),
            body: t("platform_page_resources.system_status.body"),
            cta: t("platform_page_resources.system_status.cta"),
            href: "/status",
        },
    ];

    const archLayers = [
        {
            label: t("platform_page.product_surfaces"),
            items: t("platform_page.product_surfaces_items"),
            icon: "/icons/1.png",
            border: "border-[#d4af37]/10 hover:border-[#d4af37]/20",
            labelColor: "text-[#d4af37]/70",
        },
        {
            label: t("platform_page.control_layer"),
            items: t("platform_page.control_layer_items"),
            icon: "/icons/2.png",
            border: "border-[#3b82f6]/10 hover:border-[#3b82f6]/20",
            labelColor: "text-[#60a5fa]/70",
        },
        {
            label: t("platform_page.runtime_layer"),
            items: t("platform_page.runtime_layer_items"),
            icon: "/icons/3.png",
            border: "border-[#8b5cf6]/10 hover:border-[#8b5cf6]/20",
            labelColor: "text-[#a78bfa]/70",
        },
    ];

    return (
        <main className="min-h-screen bg-[#050911] text-white">
            {/* ━━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section className="relative isolate overflow-hidden border-b border-white/[0.04]">
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute top-[-28%] left-1/2 h-[780px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(212,175,55,0.10),transparent_60%)]" />
                    <div className="absolute top-[36%] right-0 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.05),transparent_65%)]" />
                </div>

                <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-32 md:pb-32 md:pt-44 lg:px-8">
                    <div className="max-w-4xl">
                        <SectionLabel>{t("platform_page.eyebrow")}</SectionLabel>

                        <h1 className="ar-heading mt-8 text-[clamp(2.6rem,6vw,4.8rem)] font-bold leading-[0.94] tracking-tighter text-white">
                            {t("platform_page.title_line_1")}
                            <br />
                            {t("platform_page.title_line_2")}
                        </h1>

                        <p className="ar-body mt-8 max-w-2xl text-lg leading-8 text-slate-400 md:text-xl">
                            {t("platform_page.description")}
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <PrimaryCTA href="/platform/studio">{t("platform_page.primary_cta")}</PrimaryCTA>
                            <SecondaryCTA href="/docs">{t("platform_page.secondary_cta")}</SecondaryCTA>
                        </div>
                    </div>

                    <div className="mt-20 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {platformLayers.map((layer, i) => (
                            <div key={`layer-${i}`} className="rounded-3xl border border-white/[0.06] bg-[#0b1222] p-6">
                                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d4af37]/80">
                                    {layer.title}
                                </div>
                                <p className="ar-body mt-4 text-sm leading-7 text-slate-400">{layer.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ━━━ HOW IT WORKS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section className="border-b border-white/[0.04] bg-[#070d18]">
                <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                        <div>
                            <SectionLabel>{t("platform_page.how_it_works_label")}</SectionLabel>

                            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
                                {t("platform_page.how_it_works_title")}
                            </h2>

                            <p className="ar-body mt-6 text-lg leading-8 text-slate-400">
                                {t("platform_page.how_it_works_description")}
                            </p>
                        </div>

                        <div className="rounded-[28px] border border-white/[0.06] bg-[#0b1222] p-4 md:p-5">
                            <div className="grid gap-2">
                                {archLayers.map((layer, i) => (
                                    <div key={`arch-${i}`}>
                                        {i > 0 && (
                                            <div className="mb-2 flex justify-center py-0.5">
                                                <Image
                                                    src={archLayers[i - 1].icon}
                                                    alt=""
                                                    width={20}
                                                    height={20}
                                                    className="h-5 w-5 object-contain opacity-50"
                                                />
                                            </div>
                                        )}

                                        <div className={`rounded-2xl border bg-white/[0.02] px-4 py-3 transition-all duration-300 ${layer.border}`}>
                                            <div className="flex items-center gap-4">
                                                {/* 🔧 FIX: was h-28 w-28 (112x112px) -- a stray typo that
                                                    would have made this icon massively dominate the card
                                                    next to a couple lines of text. Corrected to a normal
                                                    icon size matching the rest of the site's icon patterns. */}
                                                <Image
                                                    src={layer.icon}
                                                    alt=""
                                                    width={40}
                                                    height={40}
                                                    className="h-10 w-10 shrink-0 object-contain"
                                                />

                                                <div className="min-w-0">
                                                    <div className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${layer.labelColor}`}>
                                                        {layer.label}
                                                    </div>
                                                    <div className="ar-heading mt-2 text-xl font-semibold text-white">
                                                        {layer.items}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ━━━ PRODUCTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section className="border-b border-white/[0.04] bg-[#050911]">
                <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
                    <div className="max-w-3xl">
                        <SectionLabel>{t("platform_page.products_label")}</SectionLabel>

                        <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
                            {t("platform_page.products_title")}
                        </h2>

                        <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
                            {t("platform_page.products_description")}
                        </p>
                    </div>

                    <div className="mt-16 grid gap-5 md:grid-cols-2">
                        {products.map((product) => (
                            <Link
                                key={product.href}
                                href={product.href}
                                className="group rounded-[28px] border border-white/[0.06] bg-[#0b1222] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37]/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
                            >
                                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                    {product.eyebrow}
                                </div>

                                <h3 className="ar-heading mt-6 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-[#f5d97b]">
                                    {product.title}
                                </h3>

                                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">{product.body}</p>

                                <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#d4af37] transition-all duration-300 group-hover:gap-3">
                                    {t("platform_page.explore")} {product.title}
                                    <ArrowIcon />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ━━━ PRINCIPLES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section className="border-b border-white/[0.04] bg-[#080e1a]">
                <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
                    <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                        <div>
                            <SectionLabel>{t("platform_page.principles_label")}</SectionLabel>

                            <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
                                {t("platform_page.principles_title")}
                            </h2>

                            <p className="ar-body mt-6 text-lg leading-8 text-slate-400">
                                {t("platform_page.principles_description")}
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {principles.map((item, i) => (
                                <article key={`principle-${i}`} className="rounded-3xl border border-white/[0.06] bg-[#0b1222] p-6">
                                    <h3 className="ar-heading text-base font-semibold text-white">{item.title}</h3>
                                    <p className="ar-body mt-3 text-sm leading-7 text-slate-400">{item.body}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ━━━ RESOURCES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section className="bg-[#050911]">
                <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-8">
                    <div className="max-w-3xl">
                        <SectionLabel>{t("platform_page.resources_label")}</SectionLabel>

                        <h2 className="ar-heading mt-5 text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
                            {t("platform_page.resources_title")}
                        </h2>

                        <p className="ar-body mt-5 text-lg leading-8 text-slate-400">
                            {t("platform_page.resources_description")}
                        </p>
                    </div>

                    <div className="mt-16 grid gap-5 md:grid-cols-3">
                        {resources.map((resource) => (
                            <Link
                                key={resource.href}
                                href={resource.href}
                                className="group rounded-3xl border border-white/[0.06] bg-[#0b1222] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37]/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
                            >
                                <h3 className="ar-heading text-lg font-semibold text-white transition-colors group-hover:text-[#f5d97b]">
                                    {resource.title}
                                </h3>

                                <p className="ar-body mt-3 text-sm leading-7 text-slate-400">{resource.body}</p>

                                <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#d4af37] transition-all duration-300 group-hover:gap-3">
                                    {resource.cta}
                                    <ArrowIcon />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ━━━ CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <section className="border-t border-white/[0.04] bg-[#070d18]">
                <div className="mx-auto max-w-[1400px] px-6 py-24 text-center md:py-32 lg:px-8">
                    <h2 className="ar-heading mx-auto max-w-3xl text-4xl font-bold tracking-[-0.03em] text-white md:text-5xl">
                        {t("platform_page.cta_title_line_1")}
                        <br />
                        {t("platform_page.cta_title_line_2")}
                    </h2>

                    <p className="ar-body mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
                        {t("platform_page.cta_description")}
                    </p>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <PrimaryCTA href="/platform/studio">{t("platform_page.cta_primary")}</PrimaryCTA>
                        <SecondaryCTA href="/docs">{t("platform_page.cta_secondary")}</SecondaryCTA>
                    </div>
                </div>
            </section>

            {/* ━━━ JSON-LD ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        name: "OpenQCore Platform",
                        applicationCategory: "DeveloperApplication",
                        operatingSystem: "Web",
                        description:
                            "Unified AI infrastructure for orchestration, voice, agents, memory, and multimodal processing.",
                        url: "https://openqcore.com/platform",
                        provider: {
                            "@type": "Organization",
                            name: "OpenQCore",
                            url: "https://openqcore.com",
                        },
                    }),
                }}
            />
        </main>
    );
}