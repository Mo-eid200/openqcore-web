"use client";

import React, {
    useMemo,
    useState,
} from "react";

import Image from "next/image";

import {
    PanelLeftClose,
    PanelLeftOpen,
} from "lucide-react";

import {
    useRouter,
} from "@/i18n/navigation";

import SidebarGroup from "./navigation/SidebarGroup";
import SidebarSection from "./navigation/SidebarSection";

import {
    WORKSPACE_SIDEBAR,
} from "./navigation/sidebar.workspace";

import {
    PERSONAL_SIDEBAR,
} from "./navigation/sidebar.personal";

import {
    useDashboard,
} from "./context/DashboardContext";

export default function DashboardSidebar() {
    const [collapsed, setCollapsed] =
        useState(false);

    const router = useRouter();

    const {
        dashboardMode,
        setDashboardMode,
    } = useDashboard();

    const isPersonal =
        dashboardMode === "personal";

    /* -------------------------------------------------------------------------- */
    /*                                   SECTIONS                                 */
    /* -------------------------------------------------------------------------- */

    const sections = useMemo(() => {
        return isPersonal
            ? PERSONAL_SIDEBAR
            : WORKSPACE_SIDEBAR;
    }, [isPersonal]);

    /* -------------------------------------------------------------------------- */
    /*                               MODE SWITCHING                               */
    /* -------------------------------------------------------------------------- */

    const handleModeChange = (
        mode: "personal" | "workspace"
    ) => {
        if (mode === dashboardMode)
            return;

        setDashboardMode(mode);

        if (mode === "personal") {
            router.push(
                "/personal/overview"
            );
        } else {
            router.push(
                "/workspace/overview"
            );
        }
    };

    return (
        <aside
            className={`
                relative
                shrink-0

                border-r
                border-white/[0.05]

                backdrop-blur-2xl

                shadow-[0_0_60px_rgba(0,0,0,0.45)]

                flex
                flex-col

                transition-all
                duration-300

                ${isPersonal
                    ? "bg-[#120d05]/95"
                    : "bg-[#070b14]/95"
                }

                ${collapsed
                    ? "w-[82px]"
                    : "w-[228px]"
                }
            `}
        >
            {/* LOGO */}
            <div
                className="
                    h-[64px]

                    flex
                    items-center
                    justify-center

                    border-b
                    border-white/[0.04]
                "
            >
                <div
                    className="
                        relative

                        w-14
                        h-14

                        shrink-0
                    "
                >
                    <Image
                        src="/oqc-logo.png"
                        alt="OpenQCore"
                        fill
                        sizes="56px"
                        className="object-contain"
                    />
                </div>
            </div>

            {/* MODE SWITCH */}
            {!collapsed && (
                <div
                    className="
                        px-3
                        pt-4
                    "
                >
                    <div
                        className={`
                            relative

                            grid
                            grid-cols-2

                            rounded-xl

                            p-1

                            border

                            transition-all
                            duration-300

                            ${isPersonal
                                ? `
                                    bg-amber-500/[0.06]
                                    border-amber-500/[0.12]
                                `
                                : `
                                    bg-cyan-500/[0.05]
                                    border-cyan-500/[0.10]
                                `
                            }
                        `}
                    >
                        {/* PERSONAL */}
                        <button
                            onClick={() =>
                                handleModeChange(
                                    "personal"
                                )
                            }
                            className={`
                                h-9

                                rounded-lg

                                text-[13px]
                                font-medium

                                transition-all
                                duration-300

                                ${isPersonal
                                    ? `
                                        bg-amber-400

                                        text-black

                                        shadow-lg
                                        shadow-amber-500/20
                                    `
                                    : `
                                        text-slate-400

                                        hover:text-white
                                    `
                                }
                            `}
                        >
                            Personal
                        </button>

                        {/* WORKSPACE */}
                        <button
                            onClick={() =>
                                handleModeChange(
                                    "workspace"
                                )
                            }
                            className={`
                                h-9

                                rounded-lg

                                text-[13px]
                                font-medium

                                transition-all
                                duration-300

                                ${!isPersonal
                                    ? `
                                        bg-cyan-400

                                        text-black

                                        shadow-lg
                                        shadow-cyan-500/20
                                    `
                                    : `
                                        text-slate-400

                                        hover:text-white
                                    `
                                }
                            `}
                        >
                            Workspace
                        </button>
                    </div>
                </div>
            )}

            {/* NAVIGATION */}
            <div
                className="
                    flex-1

                    overflow-y-auto

                    px-3
                    py-5
                "
            >
                <SidebarGroup>
                    {sections.map((section) => (
                        <SidebarSection
                            key={section.title}
                            title={section.title}
                            items={section.items}
                            collapsed={collapsed}
                        />
                    ))}
                </SidebarGroup>
            </div>

            {/* COLLAPSE */}
            <button
                onClick={() =>
                    setCollapsed(!collapsed)
                }
                className="
                    absolute

                    -right-3
                    top-6

                    z-20

                    w-7
                    h-7

                    rounded-full

                    border
                    border-white/[0.05]

                    bg-[#0f172a]

                    backdrop-blur-xl

                    flex
                    items-center
                    justify-center

                    text-slate-400

                    transition-all

                    hover:text-white
                    hover:bg-[#151d2d]
                "
            >
                {collapsed ? (
                    <PanelLeftOpen
                        className="
                            w-3.5
                            h-3.5
                        "
                    />
                ) : (
                    <PanelLeftClose
                        className="
                            w-3.5
                            h-3.5
                        "
                    />
                )}
            </button>
        </aside>
    );
}