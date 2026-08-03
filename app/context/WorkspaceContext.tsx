"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { fetchBootstrap } from "../lib/api/auth/auth.api";
import { useAgentRuntime } from "./AgentRuntimeContext";
import { qxtApiClient, getStoredToken } from "../lib/api/core/qxtClient";

// ─── Types ────────────────────────────────────────────────────────────────────

export type WorkspacePlan =
  | "Free Plan"
  | "Starter Plan"
  | "Pro Plan"
  | "Business Plan"
  | "Enterprise Plan";

export type WorkspaceRole =
  | "owner"
  | "admin"
  | "developer"
  | "member"
  | "viewer";

export type WorkspaceType =
  | "Personal"
  | "Team"
  | "Enterprise";

export type Workspace = {
  id: string;
  name: string;
  slug?: string;
  logo_url?: string | null;
  description?: string | null;
  role: WorkspaceRole;
  type: WorkspaceType;
  // Display label, e.g. "Team Plan" — derived from plan_name below.
  plan: WorkspacePlan;
  // Numeric id from pricing_plans (billing_subscriptions.plan_id).
  // This is what billing UIs (WorkspaceUpgradeModal) match against
  // the pricing grid — `plan` alone can't do that (it's free-text).
  plan_id: number | null;
  balance: number;
  seats: number;
  projects_count: number;
  members_count: number;
  api_requests: number;
  created_at?: string;
};

type CreateWorkspacePayload = {
  name: string;
  description?: string;
};

type WorkspaceContextValue = {
  loading: boolean;
  initialized: boolean;
  workspaces: Workspace[];
  activeWorkspace: Workspace | null;
  isWorkspaceMode: boolean;
  refreshWorkspaces: () => Promise<void>;
  switchWorkspace: (workspaceId: string) => Promise<void>;
  switchToPersonal: () => void;
  createWorkspace: (payload: CreateWorkspacePayload) => Promise<Workspace>;
  removeWorkspace: (workspaceId: string) => Promise<void>;
  updateWorkspace: (workspaceId: string, payload: Partial<CreateWorkspacePayload>) => Promise<void>;
};

// ─── Context ──────────────────────────────────────────────────────────────────

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

// ─── Normalize ────────────────────────────────────────────────────────────────

// bootstrap returns `plan_name` (e.g. "workspace_free", "Team",
// null-if-no-subscription) — not a ready-to-display "plan" string.
// This turns that into the WorkspacePlan display label the UI wants,
// same rule as displayPlanName() in WorkspaceUpgradeModal: no
// subscription row (or a raw free-tier slug name) → "Free Plan".
function toDisplayPlan(planName: string | null | undefined): WorkspacePlan {
  if (!planName) return "Free Plan";
  const lower = planName.toLowerCase();
  if (lower.includes("free") || lower === "workspace_free") return "Free Plan";
  if (lower.includes("enterprise")) return "Enterprise Plan";
  if (lower.includes("business")) return "Business Plan";
  if (lower.includes("pro")) return "Pro Plan";
  if (lower.includes("team") || lower.includes("starter")) return "Starter Plan";
  return "Free Plan";
}

function normalizeWorkspace(raw: any): Workspace {
  return {
    id:             String(raw?.id ?? ""),
    name:           raw?.name        || "Untitled Workspace",
    slug:           raw?.slug        || undefined,
    logo_url:       raw?.logo_url    || null,
    description:    raw?.description || null,
    role:           raw?.role        || "member",
    type:           raw?.type        || "Personal",
    plan:           toDisplayPlan(raw?.plan_name ?? raw?.plan),
    plan_id:        raw?.plan_id !== undefined && raw?.plan_id !== null ? Number(raw.plan_id) : null,
    balance:        Number(raw?.balance        || 0),
    seats:          Number(raw?.seat_limit ?? raw?.seats ?? 1),
    projects_count: Number(raw?.projects_count || 0),
    members_count:  Number(raw?.members_count  || 1),
    api_requests:   Number(raw?.api_requests   || 0),
    created_at:     raw?.created_at  || undefined,
  };
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function WorkspaceProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const {
    spaceType,
    activeWorkspaceId,
    switchToWorkspace,
    switchToPersonal: switchRuntimeToPersonal,
  } = useAgentRuntime();

  const [loading,         setLoading]         = useState(true);
  const [initialized,     setInitialized]     = useState(false);
  const [workspaces,      setWorkspaces]      = useState<Workspace[]>([]);
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(null);

  // ── refreshWorkspaces ───────────────────────────────────────────────────

  const refreshWorkspaces = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);

      const token = getStoredToken();
      if (!token) {
        setWorkspaces([]);
        setActiveWorkspace(null);
        return;
      }

      const bootstrap = await fetchBootstrap();
      if (!bootstrap) {
        setWorkspaces([]);
        setActiveWorkspace(null);
        return;
      }

      const raw        = bootstrap.workspaces ?? [];
      const normalized = Array.isArray(raw) ? raw.map(normalizeWorkspace) : [];

      setWorkspaces(normalized);

      if (spaceType !== "workspace") {
        setActiveWorkspace(null);
        return;
      }

      if (activeWorkspaceId) {
        const matched = normalized.find(w => w.id === activeWorkspaceId) || null;

        if (matched) {
          setActiveWorkspace(matched);
        } else if (normalized.length > 0) {
          const fallback = normalized[0];
          setActiveWorkspace(fallback);
          switchToWorkspace(fallback.id);
        } else {
          setActiveWorkspace(null);
          switchRuntimeToPersonal();
        }
        return;
      }

      setActiveWorkspace(null);

    } catch (error) {
      console.error("❌ Failed loading workspaces", error);
      setWorkspaces([]);
      setActiveWorkspace(null);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  }, [spaceType, activeWorkspaceId, switchToWorkspace, switchRuntimeToPersonal]);

  // ── switchWorkspace ─────────────────────────────────────────────────────

  const switchWorkspace = useCallback(async (workspaceId: string): Promise<void> => {
    try {
      await qxtApiClient.post(`/api/v1/workspaces/${workspaceId}/activate`);
      switchToWorkspace(workspaceId);
      await refreshWorkspaces();
    } catch (error) {
      console.warn("[Workspace] Activation failed", error);
    }
  }, [switchToWorkspace, refreshWorkspaces]);

  // ── switchToPersonal ────────────────────────────────────────────────────

  const switchToPersonal = useCallback((): void => {
    setActiveWorkspace(null);
    switchRuntimeToPersonal();
  }, [switchRuntimeToPersonal]);

  // ── createWorkspace ─────────────────────────────────────────────────────

  const createWorkspace = useCallback(async (payload: CreateWorkspacePayload): Promise<Workspace> => {
    const response  = await qxtApiClient.post("/api/v1/workspaces", payload);
    const workspace = normalizeWorkspace(response.data?.workspace || response.data);

    setWorkspaces(prev => [workspace, ...prev]);
    await switchWorkspace(workspace.id);

    return workspace;
  }, [switchWorkspace]);

  // ── updateWorkspace ─────────────────────────────────────────────────────

  const updateWorkspace = useCallback(async (
    workspaceId: string,
    payload: Partial<CreateWorkspacePayload>
  ): Promise<void> => {
    const response = await qxtApiClient.patch(`/api/v1/workspaces/${workspaceId}`, payload);
    const updated  = normalizeWorkspace(response.data?.workspace || response.data);

    setWorkspaces(prev => prev.map(w => w.id === updated.id ? updated : w));
    setActiveWorkspace(prev => prev?.id === updated.id ? updated : prev);
  }, []);

  // ── removeWorkspace ─────────────────────────────────────────────────────

  const removeWorkspace = useCallback(async (workspaceId: string): Promise<void> => {
    await qxtApiClient.delete(`/api/v1/workspaces/${workspaceId}`);

    setWorkspaces(prev => prev.filter(w => w.id !== workspaceId));

    if (activeWorkspace?.id === workspaceId) {
      setActiveWorkspace(null);
      switchRuntimeToPersonal();
    }
  }, [workspaces, activeWorkspace, switchRuntimeToPersonal]);

  // ── Effects ─────────────────────────────────────────────────────────────

  useEffect(() => {
  refreshWorkspaces().catch(error => {
    console.error("❌ Workspace bootstrap failed", error);
  });
}, []);

  useEffect(() => {
    if (spaceType !== "workspace") {
      setActiveWorkspace(null);
      return;
    }

    if (!activeWorkspaceId) {
      setActiveWorkspace(null);
      return;
    }

    const matched = workspaces.find(w => String(w.id) === String(activeWorkspaceId)) || null;
    setActiveWorkspace(matched);
  }, [spaceType, activeWorkspaceId, workspaces]);

  // ── Value ────────────────────────────────────────────────────────────────

  const isWorkspaceMode = spaceType === "workspace" && !!activeWorkspace;

  const value = useMemo<WorkspaceContextValue>(() => ({
    loading,
    initialized,
    workspaces,
    activeWorkspace,
    isWorkspaceMode,
    refreshWorkspaces,
    switchWorkspace,
    switchToPersonal,
    createWorkspace,
    removeWorkspace,
    updateWorkspace,
  }), [
    loading,
    initialized,
    workspaces,
    activeWorkspace,
    isWorkspaceMode,
    refreshWorkspaces,
    switchWorkspace,
    switchToPersonal,
    createWorkspace,
    removeWorkspace,
    updateWorkspace,
  ]);

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useWorkspace(): WorkspaceContextValue {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error("useWorkspace must be used within WorkspaceProvider");
  return context;
}