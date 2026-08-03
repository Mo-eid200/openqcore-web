// app/lib/api/workspace/overview.ts

import { qxtApiClient } from "../core/qxtClient";

export interface WorkspaceOverviewStats {
  active_agents: number;
  api_requests:  number;
  compute_hours: number;
  qx_power:      number;
}

export interface WorkspaceChartPoint {
  day:      string;
  requests: number;
  tokens:   number;
}

export interface WorkspaceEvent {
  id:          string;
  type:        string;
  status:      string;
  title:       string;
  description: string;
  timestamp:   string;
}

export interface WorkspaceOverviewData {
  stats:      WorkspaceOverviewStats;
  chart_data: WorkspaceChartPoint[];
  events:     WorkspaceEvent[];
}

export async function getWorkspaceOverview(workspaceId: string): Promise<WorkspaceOverviewData> {
  const res = await qxtApiClient.get(`/api/v1/workspaces/${workspaceId}/overview`);
  return res.data;
}