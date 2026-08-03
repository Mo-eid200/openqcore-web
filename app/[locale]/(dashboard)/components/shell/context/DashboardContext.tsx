"use client";

import {
    createContext,
    useContext,
    useMemo,
} from "react";

import { usePathname } from "next/navigation";

export type DashboardMode =
    | "console"
    | "workspace";

type DashboardContextType = {
    dashboardMode: DashboardMode;
};

const DashboardContext =
    createContext<
        DashboardContextType | undefined
    >(undefined);

export function DashboardProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    const pathname =
        usePathname();

    const dashboardMode: DashboardMode =
        pathname.startsWith("/workspace")
            ? "workspace"
            : "console";

    const value = useMemo(
        () => ({
            dashboardMode,
        }),
        [dashboardMode]
    );

    return (
        <DashboardContext.Provider
            value={value}
        >
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboard() {

    const context =
        useContext(DashboardContext);

    if (!context) {
        throw new Error(
            "useDashboard must be used inside DashboardProvider"
        );
    }

    return context;
}