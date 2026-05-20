"use client";

import React from "react";

import PersonalOverviewHero from "./PersonalOverviewHeader";
import OverviewStats from "./OverviewStats";
import OverviewActivity from "./OverviewEvents";
import QuickAccess from "./OverviewChart";

export default function PersonalOverviewPage() {
    return (
        <div
            className="
                relative

                min-h-screen

                w-full
                max-w-7xl

                mx-auto

                px-2
                sm:px-6
                xl:px-10

                py-10

                flex
                flex-col

                gap-8
            "
        >


            {/* HERO */}
            <section>
                <PersonalOverviewHero />
            </section>

            {/* STATS */}
            <section>
                <OverviewStats />
            </section>

            {/* CONTENT */}
            <section
                className="
                    grid
                    grid-cols-1
                    xl:grid-cols-3

                    gap-6

                    items-start
                "
            >
                {/* ACTIVITY */}
                <div
                    className="
                        xl:col-span-2

                        min-w-0
                    "
                >
                    <OverviewActivity />
                </div>

                {/* QUICK ACCESS */}
                <aside
                    className="
                        w-full

                        xl:sticky
                        xl:top-6
                    "
                >
                    <QuickAccess />
                </aside>
            </section>
        </div>
    );
}