"use client";

import React from "react";

import {
    LayoutGrid,
    User,
    BriefcaseBusiness,
} from "lucide-react";

import OverviewStats from "./OverviewStats";
import OverviewChart from "./OverviewChart";
import OverviewEvents from "./OverviewEvents";

import { PageHeader } from "../../components/ui/PageHeader";

import {
    useDashboard,
} from "../../components/shell/context/DashboardContext";

export default function OverviewPage() {
    const { dashboardMode } =
        useDashboard();

    const isPersonal =
        dashboardMode === "personal";

    return (
        <div
            className="
                w-full
                max-w-7xl
                mx-auto

                px-2
                sm:px-6
                xl:px-10

                py-10

                flex
                flex-col
                gap-10
            "
        >
            {/* HEADER */}
            <PageHeader
                title={
                    isPersonal
                        ? "Personal Overview"
                        : "Workspace Overview"
                }
                description={
                    isPersonal
                        ? "Monitor your AI activity, generations, API usage, personal agents, and account insights in one unified workspace."
                        : "Monitor infrastructure activity, agent performance, usage, and real-time system events — all in one place."
                }
                icon={
                    isPersonal ? (
                        <User className="w-6 h-6 text-amber-400" />
                    ) : (
                        <BriefcaseBusiness className="w-6 h-6 text-cyan-400" />
                    )
                }
            />

            {/* STAT CARDS */}
            <section>
                <OverviewStats />
            </section>

            {/* CONTENT */}
            <section
                className="
                    flex
                    flex-col
                    xl:flex-row

                    gap-10
                    items-start
                "
            >
                {/* CHART */}
                <div className="flex-1 min-w-0">
                    <OverviewChart />
                </div>

                {/* EVENTS */}
                <aside
                    className="
                        w-full
                        xl:w-[340px]
                        2xl:w-[390px]

                        flex-shrink-0
                    "
                >
                    <OverviewEvents />
                </aside>
            </section>
        </div>
    );
}