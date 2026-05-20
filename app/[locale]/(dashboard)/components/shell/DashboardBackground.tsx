"use client";

import React from "react";

import {
    useDashboard,
} from "./context/DashboardContext";

export default function DashboardBackground() {
    const { dashboardMode } =
        useDashboard();

    const isPersonal =
        dashboardMode === "personal";

    return (
        <div
            className="
                fixed
                inset-0

                overflow-hidden

                pointer-events-none
            "
        >
            {/* PERSONAL MODE */}
            {isPersonal ? (
                <>
                    {/* MAIN AMBER ORB */}
                    <div
                        className="
                            absolute
                            top-[-18%]
                            right-[-10%]

                            w-[620px]
                            h-[620px]

                            rounded-full

                            bg-amber-500/[0.10]

                            blur-[140px]
                        "
                    />

                    {/* ORANGE ORB */}
                    <div
                        className="
                            absolute
                            bottom-[-22%]
                            left-[-12%]

                            w-[540px]
                            h-[540px]

                            rounded-full

                            bg-orange-500/[0.08]

                            blur-[130px]
                        "
                    />

                    {/* GOLD CENTER GLOW */}
                    <div
                        className="
                            absolute
                            top-[25%]
                            left-[35%]

                            w-[420px]
                            h-[420px]

                            rounded-full

                            bg-yellow-500/[0.04]

                            blur-[120px]
                        "
                    />
                </>
            ) : (
                <>
                    {/* WORKSPACE MODE */}

                    {/* CYAN ORB */}
                    <div
                        className="
                            absolute
                            top-[-15%]
                            left-[-10%]

                            w-[520px]
                            h-[520px]

                            rounded-full

                            bg-cyan-500/[0.08]

                            blur-[120px]
                        "
                    />

                    {/* BLUE ORB */}
                    <div
                        className="
                            absolute
                            bottom-[-20%]
                            right-[-10%]

                            w-[600px]
                            h-[600px]

                            rounded-full

                            bg-blue-500/[0.08]

                            blur-[140px]
                        "
                    />
                </>
            )}

            {/* GRID */}
            <div
                className="
                    absolute
                    inset-0

                    opacity-[0.025]
                "
                style={{
                    backgroundImage: `
                        linear-gradient(
                            to right,
                            white 1px,
                            transparent 1px
                        ),

                        linear-gradient(
                            to bottom,
                            white 1px,
                            transparent 1px
                        )
                    `,
                    backgroundSize: "72px 72px",
                }}
            />

            {/* RADIAL FADE */}
            <div
                className={`
                    absolute
                    inset-0

                    transition-all
                    duration-700

                    ${isPersonal
                        ? `
                            bg-[radial-gradient(circle_at_center,transparent_0%,#0b0703_75%)]
                        `
                        : `
                            bg-[radial-gradient(circle_at_center,transparent_0%,#060818_75%)]
                        `
                    }
                `}
            />
        </div>
    );
}