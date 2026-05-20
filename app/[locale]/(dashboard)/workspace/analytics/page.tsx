"use client";
import React from "react";
import { RevenueChart } from "./RevenueChart";
import { UsageChart } from "./UsageChart";
import { AgentPerformanceTable } from "./AgentPerformanceTable";
import { TrafficSources } from "./TrafficSources";
import { RealtimeActivity } from "./RealtimeActivity";

export default function AnalyticsPage() {
    return (
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-8 pb-14">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white mb-1">Analytics</h1>
                <p className="text-slate-400 mb-4">
                    Visualize revenue, usage, traffic, agent performance and live activity across your platform.
                </p>
            </div>
            <div className="grid lg:grid-cols-[2fr_1fr] gap-9">
                <div className="flex flex-col gap-8">
                    <div className="grid gap-7 md:grid-cols-2">
                        <RevenueChart />
                        <UsageChart />
                    </div>
                    <AgentPerformanceTable />
                </div>
                <div className="flex flex-col gap-8">
                    <TrafficSources />
                    <RealtimeActivity />
                </div>
            </div>
        </div>
    );
}