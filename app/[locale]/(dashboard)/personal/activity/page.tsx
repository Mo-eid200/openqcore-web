"use client";

import React from "react";

import ActivityFeed from "./ActivityFeed";
import ActivityTimeline from "./ActivityTimeline";
import RealtimeStatus from "./RealtimeStatus";

export default function PersonalActivityPage() {
    return (
        <div
            className="
                w-full
                max-w-7xl

                mx-auto

                px-2
                sm:px-6
                xl:px-10

                py-8

                flex
                flex-col

                gap-8
            "
        >
            {/* HEADER STATUS */}
            <section>
                <RealtimeStatus />
            </section>

            {/* CONTENT */}
            <section
                className="
                    grid
                    grid-cols-1
                    2xl:grid-cols-[1.4fr_0.75fr]

                    gap-6
                    items-start
                "
            >
                {/* FEED */}
                <div
                    className="
                        min-w-0

                        flex
                        flex-col

                        gap-6
                    "
                >
                    <ActivityFeed />
                </div>

                {/* TIMELINE */}
                <aside
                    className="
                        w-full

                        2xl:sticky
                        2xl:top-6
                    "
                >
                    <ActivityTimeline />
                </aside>
            </section>
        </div>
    );
}