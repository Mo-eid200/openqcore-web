"use client";

import React from "react";

import DashboardBackground from "./components/shell/DashboardBackground";
import DashboardHeader from "./components/shell/DashboardTopbar";
import DashboardSidebar from "./components/shell/DashboardSidebar";
import DashboardFooter from "./components/shell/DashboardFooter";
import {
    AnimatePresence,
    motion,
} from "framer-motion";

import {
    DashboardProvider,
} from "./components/shell/context/DashboardContext";

import {
    useDashboard,
} from "./components/shell/context/DashboardContext";

/* -------------------------------------------------------------------------- */
/*                                  SHELL                                     */
/* -------------------------------------------------------------------------- */

function DashboardShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const { dashboardMode } =
        useDashboard();

    const isPersonal =
        dashboardMode === "personal";

    return (
        <div
            className={`
                relative

                h-screen
                overflow-hidden

                text-white

                transition-colors
                duration-500

                ${isPersonal
                    ? "bg-[#0b0703]"
                    : "bg-[#060818]"
                }
            `}
        >
            {/* GLOBAL BACKGROUND */}
            <DashboardBackground />

            {/* PERSONAL MODE GLOW */}
            {isPersonal && (
                <>
                    <div
                        className="
                            pointer-events-none

                            absolute
                            top-[-240px]
                            right-[-140px]

                            w-[640px]
                            h-[640px]

                            rounded-full

                            bg-amber-500/[0.08]

                            blur-[140px]
                        "
                    />

                    <div
                        className="
                            pointer-events-none

                            absolute
                            bottom-[-260px]
                            left-[-180px]

                            w-[520px]
                            h-[520px]

                            rounded-full

                            bg-orange-500/[0.07]

                            blur-[140px]
                        "
                    />
                </>
            )}

            {/* WORKSPACE MODE GLOW */}
            {!isPersonal && (
                <>
                    <div
                        className="
                            pointer-events-none

                            absolute
                            top-[-260px]
                            right-[-180px]

                            w-[620px]
                            h-[620px]

                            rounded-full

                            bg-cyan-500/[0.07]

                            blur-[140px]
                        "
                    />

                    <div
                        className="
                            pointer-events-none

                            absolute
                            bottom-[-240px]
                            left-[-160px]

                            w-[520px]
                            h-[520px]

                            rounded-full

                            bg-blue-500/[0.06]

                            blur-[140px]
                        "
                    />
                </>
            )}

            {/* CONTENT */}
            <div
                className="
                    relative

                    flex
                    flex-col

                    h-full
                "
            >
                {/* HEADER */}
                <DashboardHeader />

                {/* BODY */}
                <div
                    className="
                        flex
                        flex-1

                        min-h-0
                        overflow-hidden
                    "
                >
                    {/* SIDEBAR */}
                    <DashboardSidebar />

                    {/* PAGE */}
                    <main
                        className="
                            flex-1

                            min-w-0
                            min-h-0

                            overflow-y-auto
                            overflow-x-hidden
                        "
                    >
                        <div
                            className="
                                mx-auto

                                w-full
                                max-w-[1700px]

                                px-6
                                lg:px-8

                                py-6
                            "
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={
                                        typeof window !== "undefined"
                                            ? window.location.pathname
                                            : "page"
                                    }
                                    initial={{
                                        opacity: 0,
                                        y: 10,
                                        scale: 0.992,
                                        filter: "blur(6px)",
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        filter: "blur(0px)",
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: -8,
                                        scale: 0.992,
                                        filter: "blur(4px)",
                                    }}
                                    transition={{
                                        duration: 0.18,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="min-h-full"
                                >
                                    {children}

                                    {/* FOOTER */}
                                    <DashboardFooter />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                                  LAYOUT                                    */
/* -------------------------------------------------------------------------- */

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DashboardProvider>
            <DashboardShell>
                {children}
            </DashboardShell>
        </DashboardProvider>
    );
}