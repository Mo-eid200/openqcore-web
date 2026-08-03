// app/lib/api/workspace/activity.ts

import { qxtApiClient } from "../core/qxtClient";

export interface WorkspaceAgentStatus {
  status: "healthy" | "degraded";
  active: number;
  down:   number;
}

export interface WorkspaceApiStatus {
  status:         "operational" | "degraded";
  total_requests: number;
  errors:         number;
}

export interface WorkspaceRealtimeStatus {
  agents:       WorkspaceAgentStatus;
  api:          WorkspaceApiStatus;
  last_updated: string;
}

export interface WorkspaceActivityEvent {
  id:          string;
  type:        "api" | "system" | "agent";
  status:      "success" | "info" | "danger";
  title:       string;
  description: string;
  timestamp:   string;
}

export interface WorkspaceActivityData {
  realtime_status: WorkspaceRealtimeStatus;
  events:          WorkspaceActivityEvent[];
}

export async function getWorkspaceActivity(workspaceId: string): Promise<WorkspaceActivityData> {
  const res = await qxtApiClient.get(`/api/v1/workspaces/${workspaceId}/activity`);
  return res.data;
}