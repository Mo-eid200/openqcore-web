"use client";

import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

import { AuthProvider } from "./context/AuthContext";
import { WorkspaceProvider } from "./context/WorkspaceContext";
import { AppProvider } from "./context/AppContext";

const queryClient =
    new QueryClient();

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <WorkspaceProvider>
                    <AppProvider>
                        {children}
                    </AppProvider>
                </WorkspaceProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}