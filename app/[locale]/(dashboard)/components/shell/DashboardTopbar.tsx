"use client";

import React from "react";

import {
    Bell,
    Search,
    PanelLeft,
    BriefcaseBusiness,
    User,
} from "lucide-react";

import UserMenu from "./UserMenu";

import {
    useDashboard,
} from "./context/DashboardContext";

export default function DashboardHeader() {
    const { dashboardMode } =
        useDashboard();

    const isPersonal =
        dashboardMode === "personal";

    return (
        <header
            className={`
                sticky
                top-0
                z-50

                h-[68px]

                backdrop-blur-3xl

                transition-all
                duration-300

                after:absolute
                after:bottom-0
                after:left-0
                after:right-0
                after:h-px

                after:bg-gradient-to-r
                after:from-transparent
                after:to-transparent

                ${isPersonal
                    ? `
                        bg-[#120d05]/78

                        after:via-amber-400/[0.12]
                    `
                    : `
                        bg-[#070b14]/72

                        after:via-cyan-400/[0.10]
                    `
                }
            `}
        >
            <div
                className="
                    h-full

                    px-5
                    lg:px-7

                    flex
                    items-center
                    justify-between

                    gap-6
                "
            >
                {/* LEFT */}
                <div
                    className="
                        flex
                        items-center
                        gap-4

                        shrink-0
                        min-w-0
                    "
                >
                    {/* MOBILE SIDEBAR */}
                    <button
                        className={`
                            lg:hidden

                            w-10
                            h-10

                            rounded-xl

                            border

                            flex
                            items-center
                            justify-center

                            transition-all

                            ${isPersonal
                                ? `
                                    border-amber-500/[0.14]
                                    bg-[#1a1207]

                                    text-amber-300

                                    hover:bg-amber-500/[0.08]
                                    hover:text-white
                                `
                                : `
                                    border-white/[0.08]
                                    bg-[#101522]

                                    text-slate-400

                                    hover:bg-white/[0.06]
                                    hover:text-white
                                `
                            }
                        `}
                    >
                        <PanelLeft className="w-4 h-4" />
                    </button>

                    {/* BRAND */}
                    <div
                        className="
                            hidden
                            md:flex

                            flex-col

                            shrink-0
                        "
                    >
                        <div
                            className="
                                flex
                                items-center
                                gap-2
                            "
                        >
                            {isPersonal ? (
                                <User className="w-4 h-4 text-amber-400" />
                            ) : (
                                <BriefcaseBusiness className="w-4 h-4 text-cyan-400" />
                            )}

                            <span
                                className={`
                                    text-[18px]
                                    font-semibold

                                    tracking-[-0.03em]

                                    transition-colors

                                    ${isPersonal
                                        ? "text-amber-100"
                                        : "text-white"
                                    }
                                `}
                            >
                                {isPersonal
                                    ? "OQC AI Tools · Personal Space"
                                    : "OQC AI Tools · Team Space"
                                }
                            </span>
                        </div>

                        <span
                            className={`
                                mt-1

                                pl-6

                                text-[10px]
                                font-medium

                                tracking-[0.18em]

                                uppercase

                                transition-colors

                                ${isPersonal
                                    ? "text-amber-500/70"
                                    : "text-slate-500"
                                }
                            `}
                        >
                            {isPersonal
                                ? "Personal AI Environment"
                                : "Enterprise AI Infrastructure"
                            }
                        </span>
                    </div>
                </div>

                {/* CENTER */}
                <div
                    className="
                        flex-1

                        flex
                        justify-center

                        min-w-0
                    "
                >
                    <div
                        className="
                            relative

                            w-full
                            max-w-[620px]
                        "
                    >
                        <Search
                            className={`
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2

                                w-4
                                h-4

                                transition-colors

                                ${isPersonal
                                    ? "text-amber-500/70"
                                    : "text-slate-500"
                                }
                            `}
                        />

                        <input
                            placeholder={
                                isPersonal
                                    ? "Search agents, chats, generations..."
                                    : "Search projects, APIs, agents..."
                            }
                            className={`
                                w-full
                                h-10

                                rounded-xl

                                border

                                pl-11
                                pr-4

                                text-[14px]

                                outline-none

                                transition-all

                                ${isPersonal
                                    ? `
                                        border-amber-500/[0.10]
                                        bg-[#1a1207]

                                        text-amber-50

                                        placeholder:text-amber-500/50

                                        focus:border-amber-400/60
                                        focus:ring-2
                                        focus:ring-amber-400/10
                                    `
                                    : `
                                        border-white/[0.08]
                                        bg-[#101522]

                                        text-white

                                        placeholder:text-slate-500

                                        focus:border-cyan-400/60
                                        focus:ring-2
                                        focus:ring-cyan-400/10
                                    `
                                }
                            `}
                        />
                    </div>
                </div>

                {/* RIGHT */}
                <div
                    className="
                        flex
                        items-center
                        gap-3

                        shrink-0
                    "
                >
                    {/* NOTIFICATIONS */}
                    <button
                        className={`
                            w-10
                            h-10

                            rounded-xl

                            border

                            flex
                            items-center
                            justify-center

                            transition-all

                            ${isPersonal
                                ? `
                                    border-amber-500/[0.10]
                                    bg-[#1a1207]

                                    text-amber-300

                                    hover:bg-amber-500/[0.08]
                                `
                                : `
                                    border-white/[0.08]
                                    bg-[#101522]

                                    text-slate-400

                                    hover:bg-white/[0.06]
                                    hover:text-white
                                `
                            }
                        `}
                    >
                        <Bell className="w-4 h-4" />
                    </button>

                    {/* USER */}
                    <UserMenu />
                </div>
            </div>
        </header>
    );
}