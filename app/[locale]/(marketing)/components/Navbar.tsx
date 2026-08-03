"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Link } from "@/i18n/navigation";
import type {
    MarketingNavSection,
    MarketingNavGroup,
    MarketingFeatureCard,
    MarketingReleaseCard,
} from "./types";

type MenuItem = {
    id: string;
    title: string;
    desc: string;
    href: string;
    comingSoon?: boolean;
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

type NavbarProps = {
    items?: MarketingNavSection[];
};

const navOrder = [
    { key: "Platform", label: "platform", id: "platform" },
    { key: "Infrastructure", label: "infrastructure", id: "infrastructure" },
    { key: "Developers", label: "developers", id: "developers" },
    { key: "Solutions", label: "solutions", id: "solutions" },
    { key: "Research", label: "research", id: "research" },
    { key: "Foundation", label: "foundation", id: "foundation" },
    { key: "Company", label: "company", id: "company" },
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

function toMenuKey(sectionId: string): MenuKey | null {
    switch (sectionId) {
        case "platform":
            return "Platform";
        case "infrastructure":
            return "Infrastructure";
        case "developers":
            return "Developers";
        case "solutions":
            return "Solutions";
        case "research":
            return "Research";
        case "foundation":
            return "Foundation";
        case "company":
            return "Company";
        default:
            return null;
    }
}

function mapGroupsToMenuSections(
    groups?: MarketingNavGroup[]
): MenuSection[] {
    if (!groups?.length) return [];

    return groups.map((group) => ({
        section: group.title,
        items: group.items.map((item) => ({
            id: item.id,
            title: item.title,
            desc: item.desc || "",
            href: item.href,
            comingSoon: item.comingSoon,
        })),
    }));
}

function getFeatureCardFallback(
    activeMenu: MenuKey,
    t: ReturnType<typeof useTranslations<"navbar">>,
): MarketingFeatureCard {
    if (activeMenu === "Infrastructure") {
        return {
            id: "infra-voice-fallback",
            title: t("voice_card_title"),
            desc: t("voice_card_desc"),
            href: "/voice",
        };
    }

    return {
        id: "explore-fallback",
        title: t("explore_card_title"),
        desc: t("explore_card_desc"),
        href: "/platform",
    };
}

function getReleaseCardFallback(
    activeMenu: MenuKey,
    t: ReturnType<typeof useTranslations<"navbar">>,
): MarketingReleaseCard {
    return {
        id: `${activeMenu}-release`,
        badge: t("latest_release"),
        title: t("release_title"),
        desc: t("release_desc"),
        href: "/changelog",
    };
}

export default function Navbar({ items = [] }: NavbarProps) {
    const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const t = useTranslations("navbar");
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [badgeTick, setBadgeTick] = useState(false);
    const devPendingIds = useMemo(
        () => new Set(["sdks", "playground", "integration-guides", "showcase", "developer-blog"]),
        []
    );

    const sectionMap = useMemo(() => {
        const mapped: Partial<Record<MenuKey, MarketingNavSection>> = {};

        for (const section of items) {
            const key = toMenuKey(section.id);
            if (key) {
                mapped[key] = section;
            }
        }

        return mapped;
    }, [items]);

    const menus = useMemo(() => {
        const mappedMenus: Record<MenuKey, MenuSection[]> = {
            Platform: mapGroupsToMenuSections(sectionMap.Platform?.groups),
            Infrastructure: mapGroupsToMenuSections(sectionMap.Infrastructure?.groups),
            Developers: mapGroupsToMenuSections(sectionMap.Developers?.groups),
            Solutions: mapGroupsToMenuSections(sectionMap.Solutions?.groups),
            Research: mapGroupsToMenuSections(sectionMap.Research?.groups),
            Foundation: mapGroupsToMenuSections(sectionMap.Foundation?.groups),
            Company: mapGroupsToMenuSections(sectionMap.Company?.groups),
        };

        return mappedMenus;
    }, [sectionMap]);

    const activeFeatureCard = useMemo(() => {
        if (!activeMenu) return null;

        return (
            sectionMap[activeMenu]?.featureCard ??
            getFeatureCardFallback(activeMenu, t)
        );
    }, [activeMenu, sectionMap, t]);

    const activeReleaseCard = useMemo(() => {
        if (!activeMenu) return null;

        return (
            sectionMap[activeMenu]?.releaseCard ??
            getReleaseCardFallback(activeMenu, t)
        );
    }, [activeMenu, sectionMap, t]);

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

    useEffect(() => {
        const id = setInterval(() => setBadgeTick((v) => !v), 3200);
        return () => clearInterval(id);
    }, []);

    return (
        <div
            className="relative hidden lg:flex items-center z-50"
            onMouseLeave={handleLeave}
        >
            {/* NAV ITEMS */}
            <div className="flex items-center gap-8 xl:gap-10">
                {navOrder.map(({ key, label, id }) => {
                    const section = items.find((item) => item.id === id);
                    const href = section?.href || "#";

                    return (
                        <Link
                            key={key}
                            href={href}
                            onMouseEnter={() => handleEnter(key)}
                            className={`
                                relative
                                text-sm
                                font-medium
                                cursor-pointer
                                transition-colors
                                duration-200
                                whitespace-nowrap
                                ${
                                    activeMenu === key
                                        ? "text-white"
                                        : "text-slate-300 hover:text-white"
                                }
                            `}
                            aria-expanded={activeMenu === key}
                            aria-haspopup="true"
                        >
                            {section?.label || t(label)}
                        </Link>
                    );
                })}
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
                    ${
                        isOpen
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
                            ${
                                activeMenu
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
                                                {section.items.map((item) => {
                                                    const resolvedHref =
                                                        activeMenu === "Developers" && item.id === "support"
                                                            ? "/developers/support"
                                                            : item.href;

                                                    const isDevPending = !!item.comingSoon;

                                                    const cardClasses = `
                                                        group
                                                        flex flex-col
                                                        rounded-2xl
                                                        px-4
                                                        py-4
                                                        transition-all
                                                        duration-200
                                                        ${isDevPending ? "cursor-not-allowed opacity-80" : "hover:bg-white/[0.05]"}
                                                    `;

                                                    const content = (
                                                        <>
                                                            <div className="flex items-center gap-2">
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

                                                                {isDevPending && (
                                                                    <span
                                                                        className="
                                                                            rounded-full
                                                                            border
                                                                            border-amber-300/35
                                                                            bg-gradient-to-r
                                                                            from-amber-400/20
                                                                            to-yellow-300/10
                                                                            px-2.5
                                                                            py-0.5
                                                                            text-[10px]
                                                                            font-semibold
                                                                            uppercase
                                                                            tracking-[0.12em]
                                                                            text-amber-200
                                                                            shadow-[0_0_14px_rgba(251,191,36,0.16)]
                                                                            transition-opacity
                                                                            duration-1000
                                                                            ease-in-out
                                                                        "
                                                                        style={{ opacity: badgeTick ? 1 : 0.82 }}
                                                                    >
                                                                        {badgeTick ? "Under Development" : "Coming Soon"}
                                                                    </span>
                                                                )}
                                                            </div>

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
                                                        </>
                                                    );

                                                    if (isDevPending) {
                                                        return (
                                                            <div
                                                                key={item.id}
                                                                className={cardClasses}
                                                                aria-disabled="true"
                                                            >
                                                                {content}
                                                            </div>
                                                        );
                                                    }

                                                    return (
                                                        <Link
                                                            key={item.id}
                                                            href={resolvedHref}
                                                            className={cardClasses}
                                                        >
                                                            {content}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}

                            {/* RIGHT SIDE */}
                            <div className="pl-2 flex flex-col gap-8">
                                {/* FEATURE CARD */}
                                <Link
                                    href={activeFeatureCard?.href || "/changelog"}
                                    className="
                                        rounded-3xl
                                        overflow-hidden
                                        bg-[#0f172a]/90
                                        border border-white/10
                                        p-4
                                        block
                                    "
                                >
                                    <Image
                                        src={activeFeatureCard?.image ?? "/engines/pulse-logo.png"}
                                        alt={activeFeatureCard?.title ?? "OpenQCore"}
                                        width={640}
                                        height={480}
                                        quality={95}
                                        sizes="320px"
                                        className="
                                            aspect-[4/3]
                                            w-full
                                            rounded-2xl
                                            object-cover
                                        "
                                    />

                                    <div className="mt-5">
                                        <div className="text-white font-semibold text-lg">
                                            {activeFeatureCard?.title || t("voice_card_title")}
                                        </div>

                                        <div className="text-sm text-slate-400 mt-2 leading-6">
                                            {activeFeatureCard?.desc || t("voice_card_desc")}
                                        </div>
                                    </div>
                                </Link>

                                {/* RELEASE / BADGE CARD */}
                                <Link
                                    href={activeReleaseCard?.href || "/changelog"}
                                    className="
                                        rounded-2xl
                                        border border-[#d4af37]/20
                                        bg-gradient-to-br
                                        from-[#d4af37]/15
                                        to-transparent
                                        p-4
                                        block
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
                                        {activeReleaseCard?.badge || t("latest_release")}
                                    </span>

                                    <div className="mt-2 text-white font-bold text-lg">
                                        {activeReleaseCard?.title || t("release_title")}
                                    </div>

                                    <div className="mt-1 text-sm text-slate-400 leading-6">
                                        {activeReleaseCard?.desc || t("release_desc")}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}