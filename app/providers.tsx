"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider }         from "./context/AuthContext";
import { AppProvider }          from "./context/AppContext";
import { AgentRuntimeProvider } from "./context/AgentRuntimeContext";
import { WorkspaceProvider }    from "./context/WorkspaceContext";
import { DashboardProvider }    from "./[locale]/(dashboard)/components/shell/context/DashboardContext";
import SessionExpiredBanner     from "./[locale]/(dashboard)/components/shell/SessionExpiredBanner";

// ✅ ModelsProvider اتشال من هنا

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry:              1,
      staleTime:          30_000,
      refetchOnWindowFocus: false, // ✅ مهم - بيوقف re-fetch عند focus
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AgentRuntimeProvider>
          <WorkspaceProvider>
            <AppProvider>
              <DashboardProvider>
                {children}
                <SessionExpiredBanner />
              </DashboardProvider>
            </AppProvider>
          </WorkspaceProvider>
        </AgentRuntimeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}