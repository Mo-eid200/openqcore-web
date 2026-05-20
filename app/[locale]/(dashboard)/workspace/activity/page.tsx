"use client";
import React, { useState } from "react";
import { RealtimeStatus } from "./RealtimeStatus";
import { ActivityFilters } from "./ActivityFilters";
import { ActivityFeed } from "./ActivityFeed";

export default function ActivityPage() {
    const [filter, setFilter] = useState("all");
    // ادمج مع داتا حقيقية عند الحاجة

    return (
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-8 pb-14">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white mb-1">Activity</h1>
                <p className="text-slate-400 mb-2">Live platform events, deployments, errors and status. All in one place.</p>
            </div>
            <RealtimeStatus />
            <ActivityFilters filter={filter} onFilter={setFilter} />
            <ActivityFeed asTimeline />
        </div>
    );
}