"use client";

import React, {
  createContext,
  useContext,
  useMemo,
} from "react";

import { useAuth } from "./AuthContext";
import { DEFAULT_BILLING_STATE } from "../lib/api/auth/auth.mapper";
import type { AppState } from "../lib/api/auth/auth.types";

// ─── Context ──────────────────────────────────────────────────────────────────

const AppContext = createContext<AppState | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  // كل صفحة billing بتحمل data بتاعتها بـ useQuery مستقل
  // AppContext مش محتاج يعمل أي billing call
  const refresh = async () => {};

  const value = useMemo<AppState>(
    () => ({
      user,
      role: user?.role ?? null,
      ...DEFAULT_BILLING_STATE,
      refresh,
    }),
    [user]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within <AppProvider>");
  return ctx;
}