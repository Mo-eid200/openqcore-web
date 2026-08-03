"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import ConsoleOverviewHero from "./ConsoleOverviewHeader";
import OverviewStats from "./OverviewStats";
import OverviewChart from "./OverviewChart";
import OverviewEvents from "./OverviewEvents";
import OpenQCoreLoader from "../../components/ui/OpenQCoreLoader";

import { getConsoleOverview } from "@/app/lib/api/console/overview";

function FadeIn({
    children,
    delay = 0,
}: {
    children: React.ReactNode;
    delay?: number;
}) {
    return (
        <div
            className="animate-fade-in-up"
            style={{ animationDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

function StateCard({
    text,
    tone = "neutral",
}: {
    text: string;
    tone?: "neutral" | "error" | "loading";
}) {
    const toneClass =
        tone === "error"
            ? "text-red-300"
            : tone === "loading"
            ? "text-white/60"
            : "text-white/50";

    return (
        <div className="mx-auto flex min-h-[70vh] w-full items-center justify-center">
            <div
                className="
                    rounded-2xl border border-white/[0.06]
                    bg-[#0f1012]/92 px-6 py-5 text-center
                    shadow-[0_8px_24px_rgba(0,0,0,0.16)]
                    backdrop-blur-xl
                "
            >
                <p className={`text-sm ${toneClass}`}>
                    {text}
                </p>
            </div>
        </div>
    );
}

export default function ConsoleOverviewPage() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["console-overview"],
        queryFn: getConsoleOverview,
        staleTime: 30_000,
        retry: 1,
    });

    if (isLoading) {
    return (
        <div className="relative min-h-[70vh] w-full">
            <OpenQCoreLoader />
        </div>
    );
}
    if (error) {
        return (
            <StateCard
                text="Failed to load console overview"
                tone="error"
            />
        );
    }

    if (!data) {
        return (
            <StateCard
                text="No console data available."
                tone="neutral"
            />
        );
    }

    return (
        <div
            className="
                relative
                mx-auto
                flex
                w-full
                max-w-7xl
                flex-col
                gap-6
                px-3
                py-8
                sm:px-6
                xl:px-10
                xl:py-10
            "
        >
            <FadeIn delay={0}>
                <ConsoleOverviewHero
                    user={data.user}
                    stats={data.stats}
                />
            </FadeIn>

            <FadeIn delay={100}>
                <OverviewStats stats={data.stats} />
            </FadeIn>

            <FadeIn delay={200}>
                <section className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">
                    <div className="min-w-0 xl:col-span-2">
                        <OverviewChart usagePoints={data.usage_points} />
                    </div>

                    <aside className="w-full xl:sticky xl:top-6">
                        <OverviewEvents events={data.events} />
                    </aside>
                </section>
            </FadeIn>
        </div>
    );
}