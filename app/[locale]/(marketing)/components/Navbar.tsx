"use client";

import { useEffect, useRef, useState } from "react";

import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

type MenuItem = {
    title: string;
    desc: string;
    href: string;
};

type MenuSection = {
    section: string;
    items: MenuItem[];
};

type MenuKey =
    | "Platform"
    | "Infrastructure"
    | "Developers"
    | "Solutions"
    | "Research"
    | "Foundation"
    | "Company";

const navOrder = [
    { key: "Platform", label: "platform" },
    { key: "Infrastructure", label: "infrastructure" },
    { key: "Developers", label: "developers" },
    { key: "Solutions", label: "solutions" },
    { key: "Research", label: "research" },
    { key: "Foundation", label: "foundation" },
    { key: "Company", label: "company" },
] as const;

const menuWidths: Record<MenuKey, string> = {
    Platform: "max-w-[1400px]",
    Infrastructure: "max-w-[1400px]",
    Developers: "max-w-[1280px]",
    Solutions: "max-w-[1180px]",
    Research: "max-w-[1100px]",
    Foundation: "max-w-[1180px]",
    Company: "max-w-[1100px]",
};

export default function Navbar() {
    const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);

    const [isOpen, setIsOpen] = useState(false);

    const t = useTranslations("navbar");

    const m = useTranslations("menu");

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const menus: Record<MenuKey, MenuSection[]> = {
        Platform: [
            {
                section: t("platform_core"),

                items: [
                    {
                        title: m("openqcore_platform.title"),
                        desc: m("openqcore_platform.desc"),
                        href: "/platform",
                    },

                    {
                        title: m("studio.title"),
                        desc: m("studio.desc"),
                        href: "/studio",
                    },

                    {
                        title: m("voice.title"),
                        desc: m("voice.desc"),
                        href: "/voice",
                    },

                    {
                        title: m("agents.title"),
                        desc: m("agents.desc"),
                        href: "/agents",
                    },
                ],
            },

            {
                section: t("platform_resources"),

                items: [
                    {
                        title: m("docs.title"),
                        desc: m("docs.desc"),
                        href: "/docs",
                    },

                    {
                        title: m("api_reference.title"),
                        desc: m("api_reference.desc"),
                        href: "/api",
                    },

                    {
                        title: m("system_status.title"),
                        desc: m("system_status.desc"),
                        href: "/status",
                    },
                ],
            },
        ],

        Infrastructure: [
            {
                section: t("infrastructure_stack"),

                items: [
                    {
                        title: m("pulse_engine.title"),
                        desc: m("pulse_engine.desc"),
                        href: "/pulse",
                    },

                    {
                        title: m("memory_systems.title"),
                        desc: m("memory_systems.desc"),
                        href: "/memory",
                    },

                    {
                        title: m("realtime_runtime.title"),
                        desc: m("realtime_runtime.desc"),
                        href: "/realtime",
                    },

                    {
                        title: m("multimodal_stack.title"),
                        desc: m("multimodal_stack.desc"),
                        href: "/multimodal",
                    },
                ],
            },
        ],

        Developers: [
            {
                section: t("developers_explore"),

                items: [
                    {
                        title: m("sdks.title"),
                        desc: m("sdks.desc"),
                        href: "/sdks",
                    },

                    {
                        title: m("playground.title"),
                        desc: m("playground.desc"),
                        href: "/playground",
                    },

                    {
                        title: m("integration_guides.title"),
                        desc: m("integration_guides.desc"),
                        href: "/integration",
                    },
                ],
            },

            {
                section: t("developers_support"),

                items: [
                    {
                        title: m("developer_blog.title"),
                        desc: m("developer_blog.desc"),
                        href: "/blog",
                    },

                    {
                        title: m("showcase.title"),
                        desc: m("showcase.desc"),
                        href: "/showcase",
                    },

                    {
                        title: m("support.title"),
                        desc: m("support.desc"),
                        href: "/support",
                    },
                ],
            },
        ],

        Solutions: [
            {
                section: t("solutions_industries"),

                items: [
                    {
                        title: m("enterprise.title"),
                        desc: m("enterprise.desc"),
                        href: "/enterprise",
                    },

                    {
                        title: m("startups.title"),
                        desc: m("startups.desc"),
                        href: "/startups",
                    },
                ],
            },

            {
                section: t("solutions_security"),

                items: [
                    {
                        title: m("security.title"),
                        desc: m("security.desc"),
                        href: "/security",
                    },

                    {
                        title: m("compliance.title"),
                        desc: m("compliance.desc"),
                        href: "/compliance",
                    },
                ],
            },
        ],

        Research: [
            {
                section: t("research_topics"),

                items: [
                    {
                        title: m("research_index.title"),
                        desc: m("research_index.desc"),
                        href: "/research",
                    },

                    {
                        title: m("ai_safety.title"),
                        desc: m("ai_safety.desc"),
                        href: "/ai-safety",
                    },

                    {
                        title: m("voice_intelligence.title"),
                        desc: m("voice_intelligence.desc"),
                        href: "/voice-intel",
                    },
                ],
            },

            {
                section: t("research_programs"),

                items: [
                    {
                        title: m("residency.title"),
                        desc: m("residency.desc"),
                        href: "/residency",
                    },
                ],
            },
        ],

        Foundation: [
            {
                section: t("foundation_initiatives"),

                items: [
                    {
                        title: m("open_research.title"),
                        desc: m("open_research.desc"),
                        href: "/open-research",
                    },

                    {
                        title: m("community.title"),
                        desc: m("community.desc"),
                        href: "/community",
                    },

                    {
                        title: m("education.title"),
                        desc: m("education.desc"),
                        href: "/education",
                    },

                    {
                        title: m("responsibility.title"),
                        desc: m("responsibility.desc"),
                        href: "/responsibility",
                    },
                ],
            },
        ],

        Company: [
            {
                section: t("company_about"),

                items: [
                    {
                        title: m("about.title"),
                        desc: m("about.desc"),
                        href: "/about",
                    },

                    {
                        title: m("careers.title"),
                        desc: m("careers.desc"),
                        href: "/careers",
                    },

                    {
                        title: m("brand_assets.title"),
                        desc: m("brand_assets.desc"),
                        href: "/brand",
                    },
                ],
            },

            {
                section: t("company_connect"),

                items: [
                    {
                        title: m("blog.title"),
                        desc: m("blog.desc"),
                        href: "/blog",
                    },

                    {
                        title: m("contact.title"),
                        desc: m("contact.desc"),
                        href: "/contact",
                    },
                ],
            },
        ],
    };

    const handleEnter = (menu: MenuKey) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setActiveMenu(menu);

        setIsOpen(true);
    };

    const handleLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);

            setActiveMenu(null);
        }, 120);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div
            className="relative hidden lg:flex items-center z-50"
            onMouseLeave={handleLeave}
        >
            {/* NAV ITEMS */}
            <div className="flex items-center gap-8 xl:gap-10">
                {navOrder.map(({ key, label }) => (
                    <button
                        key={key}
                        onMouseEnter={() => handleEnter(key)}
                        className={`
                            relative
                            text-sm
                            font-medium
                            cursor-pointer
                            transition-colors
                            duration-200
                            whitespace-nowrap

                            ${activeMenu === key
                                ? "text-white"
                                : "text-slate-300 hover:text-white"
                            }
                        `}
                        tabIndex={0}
                    >
                        {t(label)}
                    </button>
                ))}
            </div>

            {/* MEGA MENU */}
            <div
                onMouseEnter={() => {
                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                    }
                }}
                className={`
                    fixed
                    left-0
                    top-[72px]
                    w-full
                    z-40

                    origin-top

                    transition-all
                    duration-500
                    ease-[cubic-bezier(0.16,1,0.3,1)]

                    ${isOpen
                        ? "opacity-100 translate-y-0 visible"
                        : "opacity-0 -translate-y-2 invisible pointer-events-none"
                    }
                `}
            >
                <div
                    className="
                        border-b border-white/5
                        bg-[#04070f]/95
                        backdrop-blur-2xl
                        shadow-[0_20px_80px_rgba(0,0,0,0.65)]
                    "
                >
                    <div
                        className={`
                            container-app
                            mx-auto
                            px-6
                            py-14

                            ${activeMenu
                                ? menuWidths[activeMenu]
                                : "max-w-[1280px]"
                            }
                        `}
                    >
                        <div
                            className="grid items-start"
                            style={{
                                gridTemplateColumns:
                                    "minmax(0,1fr) minmax(0,1fr) 320px",

                                gap: "0 5rem",
                            }}
                        >
                            {/* LEFT COLUMNS */}
                            {activeMenu &&
                                menus[activeMenu]
                                    ?.slice(0, 2)
                                    .map((section) => (
                                        <div
                                            key={section.section}
                                            className="transition-opacity duration-200"
                                        >
                                            <div
                                                className="
                                                    mb-5
                                                    text-xs
                                                    uppercase
                                                    tracking-[0.18em]
                                                    text-slate-500
                                                    font-semibold
                                                "
                                            >
                                                {section.section}
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                {section.items.map((item) => (
                                                    <Link
                                                        key={item.title}
                                                        href={item.href}
                                                        className="
                                                            group
                                                            flex flex-col
                                                            rounded-2xl
                                                            px-4
                                                            py-4
                                                            transition-all
                                                            duration-200
                                                            hover:bg-white/[0.05]
                                                        "
                                                    >
                                                        <span
                                                            className="
                                                                text-white
                                                                text-base
                                                                font-medium
                                                                transition-colors
                                                                group-hover:text-[#d4af37]
                                                            "
                                                        >
                                                            {item.title}
                                                        </span>

                                                        <span
                                                            className="
                                                                mt-1.5
                                                                text-sm
                                                                leading-6
                                                                text-slate-400
                                                                transition-colors
                                                                group-hover:text-slate-300
                                                            "
                                                        >
                                                            {item.desc}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                            {/* RIGHT SIDE */}
                            <div className="pl-2 flex flex-col gap-8">
                                {/* FEATURE CARD */}
                                <div
                                    className="
                                        rounded-3xl
                                        overflow-hidden
                                        bg-[#0f172a]/90
                                        border border-white/10
                                        p-4
                                    "
                                >
                                    <div
                                        className="
                                            aspect-[4/3]
                                            rounded-2xl
                                            bg-gradient-to-br
                                            from-[#d4af37]/30
                                            via-[#d4af37]/5
                                            to-transparent
                                        "
                                    />

                                    <div className="mt-5">
                                        <div className="text-white font-semibold text-lg">
                                            {t("voice_card_title")}
                                        </div>

                                        <div className="text-sm text-slate-400 mt-2 leading-6">
                                            {t("voice_card_desc")}
                                        </div>
                                    </div>
                                </div>

                                {/* RELEASE CARD */}
                                <div
                                    className="
                                        rounded-2xl
                                        border border-[#d4af37]/20
                                        bg-gradient-to-br
                                        from-[#d4af37]/15
                                        to-transparent
                                        p-4
                                    "
                                >
                                    <span
                                        className="
                                            text-xs
                                            uppercase
                                            tracking-[0.16em]
                                            font-semibold
                                            text-[#d4af37]
                                        "
                                    >
                                        {t("latest_release")}
                                    </span>

                                    <div className="mt-2 text-white font-bold text-lg">
                                        {t("release_title")}
                                    </div>

                                    <div className="mt-1 text-sm text-slate-400 leading-6">
                                        {t("release_desc")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}