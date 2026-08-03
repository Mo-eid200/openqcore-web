"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getStoredContext,
  setStoredContext,
} from "../lib/api/core/qxtClient";

export type SpaceType =
  | "personal"
  | "workspace";

export type RuntimeContextValue = {
  spaceType: SpaceType;
  activeWorkspaceId: string | null;
  activeAgentId: string | null;
  initialized: boolean;

  setSpaceType: (
    value: SpaceType
  ) => void;

  setActiveWorkspaceId: (
    workspaceId: string | null
  ) => void;

  setActiveAgentId: (
    agentId: string | null
  ) => void;

  switchToPersonal: () => void;

  switchToWorkspace: (
    workspaceId: string
  ) => void;

  clearActiveAgent: () => void;

  hydrateFromStorage: () => void;
};

type StoredRuntimeContext = {
  spaceType?: SpaceType;
  workspaceId?: string | null;
  activeAgentId?: string | null;

  // backward compatibility with old storage
  scopeType?: "personal" | "workspace" | "agent";
  agentId?: string | null;
};

const AgentRuntimeContext =
  createContext<RuntimeContextValue | null>(
    null
  );

function normalizeStoredRuntime(
  raw: StoredRuntimeContext | null | undefined
): {
  spaceType: SpaceType;
  activeWorkspaceId: string | null;
  activeAgentId: string | null;
} {
  if (!raw) {
    return {
      spaceType: "personal",
      activeWorkspaceId: null,
      activeAgentId: null,
    };
  }

  const derivedSpaceType: SpaceType =
    raw.spaceType ||
    (raw.scopeType === "workspace"
      ? "workspace"
      : "personal");

  const derivedAgentId =
    raw.activeAgentId ??
    raw.agentId ??
    null;

  return {
    spaceType: derivedSpaceType,
    activeWorkspaceId:
      raw.workspaceId ?? null,
    activeAgentId:
      derivedAgentId,
  };
}

function persistRuntime(params: {
  spaceType: SpaceType;
  activeWorkspaceId: string | null;
  activeAgentId: string | null;
}) {
  setStoredContext({
    spaceType: params.spaceType,
    workspaceId:
      params.activeWorkspaceId,
    activeAgentId:
      params.activeAgentId,
  });
}

export function AgentRuntimeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    spaceType,
    setSpaceTypeState,
  ] = useState<SpaceType>("personal");

  const [
    activeWorkspaceId,
    setActiveWorkspaceIdState,
  ] = useState<string | null>(null);

  const [
    activeAgentId,
    setActiveAgentIdState,
  ] = useState<string | null>(null);

  const [
    initialized,
    setInitialized,
  ] = useState(false);

  const hydrateFromStorage =
    useCallback(() => {
      const stored =
        getStoredContext();

      const normalized =
        normalizeStoredRuntime(
          stored
        );

      setSpaceTypeState(
        normalized.spaceType
      );
      setActiveWorkspaceIdState(
        normalized.activeWorkspaceId
      );
      setActiveAgentIdState(
        normalized.activeAgentId
      );
      setInitialized(true);

      persistRuntime(normalized);
    }, []);

  useEffect(() => {
    hydrateFromStorage();
  }, [hydrateFromStorage]);

  const setSpaceType =
    useCallback(
      (value: SpaceType) => {
        setSpaceTypeState(value);

        const nextWorkspaceId =
          value === "workspace"
            ? activeWorkspaceId
            : null;

        if (value !== "workspace") {
          setActiveWorkspaceIdState(
            null
          );
        }

        persistRuntime({
          spaceType: value,
          activeWorkspaceId:
            nextWorkspaceId,
          activeAgentId,
        });
      },
      [
        activeWorkspaceId,
        activeAgentId,
      ]
    );

  const setActiveWorkspaceId =
    useCallback(
      (
        workspaceId: string | null
      ) => {
        const nextSpaceType =
          workspaceId
            ? "workspace"
            : "personal";

        setSpaceTypeState(
          nextSpaceType
        );
        setActiveWorkspaceIdState(
          workspaceId
        );

        persistRuntime({
          spaceType:
            nextSpaceType,
          activeWorkspaceId:
            workspaceId,
          activeAgentId,
        });
      },
      [activeAgentId]
    );

  const setActiveAgentId =
    useCallback(
      (agentId: string | null) => {
        setActiveAgentIdState(
          agentId
        );

        persistRuntime({
          spaceType,
          activeWorkspaceId,
          activeAgentId: agentId,
        });
      },
      [
        spaceType,
        activeWorkspaceId,
      ]
    );

  const switchToPersonal =
    useCallback(() => {
      setSpaceTypeState("personal");
      setActiveWorkspaceIdState(null);
      setActiveAgentIdState(null);

      persistRuntime({
        spaceType: "personal",
        activeWorkspaceId: null,
        activeAgentId: null,
      });
    }, []);

  const switchToWorkspace =
    useCallback(
      (workspaceId: string) => {
        setSpaceTypeState(
          "workspace"
        );
        setActiveWorkspaceIdState(
          workspaceId
        );
        setActiveAgentIdState(null);

        persistRuntime({
          spaceType:
            "workspace",
          activeWorkspaceId:
            workspaceId,
          activeAgentId: null,
        });
      },
      []
    );

  const clearActiveAgent =
    useCallback(() => {
      setActiveAgentIdState(
        null
      );

      persistRuntime({
        spaceType,
        activeWorkspaceId,
        activeAgentId: null,
      });
    }, [
      spaceType,
      activeWorkspaceId,
    ]);

  const value =
    useMemo<RuntimeContextValue>(
      () => ({
        spaceType,
        activeWorkspaceId,
        activeAgentId,
        initialized,
        setSpaceType,
        setActiveWorkspaceId,
        setActiveAgentId,
        switchToPersonal,
        switchToWorkspace,
        clearActiveAgent,
        hydrateFromStorage,
      }),
      [
        spaceType,
        activeWorkspaceId,
        activeAgentId,
        initialized,
        setSpaceType,
        setActiveWorkspaceId,
        setActiveAgentId,
        switchToPersonal,
        switchToWorkspace,
        clearActiveAgent,
        hydrateFromStorage,
      ]
    );

  return (
    <AgentRuntimeContext.Provider
      value={value}
    >
      {children}
    </AgentRuntimeContext.Provider>
  );
}

export function useAgentRuntime() {
  const context = useContext(
    AgentRuntimeContext
  );

  if (!context) {
    throw new Error(
      "useAgentRuntime must be used within AgentRuntimeProvider"
    );
  }

  return context;
}