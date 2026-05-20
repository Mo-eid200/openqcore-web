"use client";

import {
    createContext,
    useContext,
    useMemo,
    useState,
} from "react";

export type DashboardMode =
    | "personal"
    | "workspace";

type DashboardContextType = {
    dashboardMode: DashboardMode;

    setDashboardMode: (
        mode: DashboardMode
    ) => void;
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
    const [
        dashboardMode,
        setDashboardMode,
    ] = useState<DashboardMode>(
        "workspace"
    );

    const value = useMemo(
        () => ({
            dashboardMode,
            setDashboardMode,
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