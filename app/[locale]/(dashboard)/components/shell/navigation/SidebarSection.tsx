"use client";

import React from "react";

import SidebarItem from "./SidebarItem";

import {
    useDashboard,
} from "../context/DashboardContext";

type SidebarSectionProps = {
    title: string;

    items: {
        href: string;
        label: string;
        icon: React.ElementType;
    }[];

    collapsed?: boolean;
};

export default function SidebarSection({
    title,
    items,
    collapsed,
}: SidebarSectionProps) {
    const { dashboardMode } =
        useDashboard();

    const isConsole =
        dashboardMode === "console";

    return (
        <div className="mb-7">
            {!collapsed && (
                <div
                    className={`
                        px-3
                        mb-3

                        text-[10px]

                        font-semibold

                        tracking-[0.18em]

                        uppercase

                        transition-colors
                        duration-300

                        ${isConsole
                            ? "text-amber-500/65"
                            : "text-cyan-500/60"
                        }
                    `}
                >
                    {title}
                </div>
            )}

            <div className="space-y-1.5">
                {items.map((item) => (
                    <SidebarItem
                        key={item.href}
                        href={item.href}
                        label={item.label}
                        icon={item.icon}
                        collapsed={collapsed}
                    />
                ))}
            </div>
        </div>
    );
}