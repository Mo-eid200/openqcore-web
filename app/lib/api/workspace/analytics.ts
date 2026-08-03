// app/lib/api/workspace/analytics.ts

import { qxtApiClient } from "../core/qxtClient";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AnalyticsSummary {
  total_requests: number;
  total_tokens:   number;
  total_cost_usd: number;
  total_errors:   number;
  error_rate:     number;
}

export interface DailyUsagePoint {
  day:      string;
  requests: number;
  tokens:   number;
  cost_usd: number;
  errors:   number;
}

export interface DailyRevenuePoint {
  day:     string;
  revenue: number;
}

export interface AgentPerformance {
  id:       string;
  name:     string;
  model:    string;
  status:   string;
  requests: number;
  tokens:   number;
  errors:   number;
  success:  string;
  latency:  string;
}

export interface TrafficSource {
  label:    string;
  requests: number;
  percent:  number;
}

export interface RealtimeEvent {
  id:    string;
  type:  "api" | "agent" | "error";
  title: string;
  info:  string;
  time:  string;
}

export interface WorkspaceAnalytics {
  summary:            AnalyticsSummary;
  daily_usage:        DailyUsagePoint[];
  daily_revenue:      DailyRevenuePoint[];
  agent_performance:  AgentPerformance[];
  traffic_sources:    TrafficSource[];
  realtime:           RealtimeEvent[];
}

// ─── API ──────────────────────────────────────────────────────────────────────

export async function getWorkspaceAnalytics(
  workspaceId: string,
  days:        number = 30
): Promise<WorkspaceAnalytics> {
  const res = await qxtApiClient.get(
    `/api/v1/workspaces/${workspaceId}/analytics`,
    { params: { days } }
  );
  return res.data;
}