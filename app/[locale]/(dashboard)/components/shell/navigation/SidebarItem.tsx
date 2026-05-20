"use client";

import React from "react";

import { Link, usePathname } from "@/i18n/navigation";

import {
    useDashboard,
} from "../context/DashboardContext";

type SidebarItemProps = {
    href: string;
    label: string;
    icon: React.ElementType;
    collapsed?: boolean;
};

export default function SidebarItem({
    href,
    label,
    icon: Icon,
    collapsed = false,
}: SidebarItemProps) {

    const pathname = usePathname();

    const {
        dashboardMode,
    } = useDashboard();

    const isPersonal =
        dashboardMode === "personal";

    const isActive =
        pathname === href ||
        pathname.startsWith(`${href}/`);

    const accent = isPersonal
        ? {
            container: `
                bg-gradient-to-r
                from-amber-400/18
                to-amber-300/8

                border-amber-400/20

                shadow-[0_0_30px_rgba(251,191,36,0.10)]

                text-amber-100
            `,

            glow: `
                bg-[radial-gradient(circle_at_left,rgba(251,191,36,0.14),transparent_60%)]
            `,

            bar: `
                from-amber-200
                to-amber-400

                shadow-[0_0_12px_rgba(251,191,36,0.8)]
            `,

            icon: `
                bg-amber-400/12
                text-amber-200

                shadow-[0_0_20px_rgba(251,191,36,0.15)]
            `,

            label: "text-amber-100",
        }
        : {
            container: `
                bg-gradient-to-r
                from-cyan-400/16
                to-cyan-300/8

                border-cyan-400/20

                shadow-[0_0_30px_rgba(34,211,238,0.10)]

                text-cyan-100
            `,

            glow: `
                bg-[radial-gradient(circle_at_left,rgba(34,211,238,0.14),transparent_60%)]
            `,

            bar: `
                from-cyan-200
                to-cyan-400

                shadow-[0_0_12px_rgba(34,211,238,0.8)]
            `,

            icon: `
                bg-cyan-400/12
                text-cyan-100

                shadow-[0_0_20px_rgba(34,211,238,0.15)]
            `,

            label: "text-cyan-50",
        };

    return (
        <Link
            href={href}
            className={`
                relative

                flex
                items-center

                ${collapsed
                    ? "justify-center px-0"
                    : "gap-3 px-3"
                }

                h-11

                overflow-hidden

                rounded-2xl
                border

                transition-all
                duration-300

                group

                ${isActive
                    ? `
                        backdrop-blur-xl
                        ${accent.container}
                    `
                    : `
                        border-transparent

                        text-white/80

                        hover:bg-white/[0.045]
                        hover:border-white/[0.05]

                        hover:text-white
                    `
                }
            `}
        >
            {/* ACTIVE GLOW */}
            {isActive && (
                <div
                    className={`
                        absolute
                        inset-0

                        pointer-events-none

                        ${accent.glow}
                    `}
                />
            )}

            {/* ACTIVE BAR */}
            {isActive && (
                <div
                    className={`
                        absolute

                        left-0
                        top-2
                        bottom-2

                        w-[3px]

                        rounded-full

                        bg-gradient-to-b

                        ${accent.bar}
                    `}
                />
            )}

            {/* ICON */}
            <div
                className={`
                    relative

                    flex
                    items-center
                    justify-center

                    w-8
                    h-8

                    shrink-0

                    rounded-xl

                    transition-all
                    duration-300

                    ${isActive
                        ? accent.icon
                        : `
                            bg-white/[0.035]

                            text-white/70

                            group-hover:bg-white/[0.06]
                            group-hover:text-white
                        `
                    }
                `}
            >
                <Icon className="w-4 h-4" />
            </div>

            {/* LABEL */}
            {!collapsed && (
                <span
                    className={`
                        relative

                        text-[13.5px]
                        font-medium

                        tracking-[-0.01em]

                        transition-all
                        duration-300

                        ${isActive
                            ? accent.label
                            : `
                                text-white/85

                                group-hover:text-white
                            `
                        }
                    `}
                >
                    {label}
                </span>
            )}
        </Link>
    );
}