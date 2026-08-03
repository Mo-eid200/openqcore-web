// app/lib/api/workspace/compute.ts

import { qxtApiClient } from "../core/qxtClient";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WorkspaceCluster {
  id:           string;
  name:         string;
  region:       string;
  status:       "operational" | "maintenance" | "degraded";
  nodes_count:  number;
  workspace_id: string;
  created_at:   string;
  updated_at:   string;
}

export interface WorkspaceNode {
  id:           string;
  name:         string;
  type:         string;
  status:       "running" | "pending" | "error" | "offline";
  cpu_usage:    number | null;
  gpu_usage:    number | null;
  region:       string | null;
  cluster_id:   string | null;
  workspace_id: string;
  created_at:   string;
  updated_at:   string;
}

export interface WorkspaceDeploymentLog {
  id:         string;
  level:      "info" | "success" | "danger" | "warning";
  message:    string;
  cluster_id: string | null;
  created_at: string;
}

export interface ComputeOverview {
  clusters: WorkspaceCluster[];
  nodes:    WorkspaceNode[];
  logs:     WorkspaceDeploymentLog[];
}

export interface CreateClusterPayload {
  name:   string;
  region: string;
  status?: string;
}

export interface CreateNodePayload {
  name:        string;
  type:        string;
  region?:     string;
  cluster_id?: string;
  status?:     string;
}

// ─── API ──────────────────────────────────────────────────────────────────────

export async function getComputeOverview(workspaceId: string): Promise<ComputeOverview> {
  const res = await qxtApiClient.get(`/api/v1/workspaces/${workspaceId}/compute`);
  return res.data;
}

export async function createCluster(
  workspaceId: string,
  payload:     CreateClusterPayload
): Promise<WorkspaceCluster> {
  const res = await qxtApiClient.post(
    `/api/v1/workspaces/${workspaceId}/compute/clusters`,
    payload
  );
  return res.data;
}

export async function deleteCluster(
  workspaceId: string,
  clusterId:   string
): Promise<void> {
  await qxtApiClient.delete(
    `/api/v1/workspaces/${workspaceId}/compute/clusters/${clusterId}`
  );
}

export async function createNode(
  workspaceId: string,
  payload:     CreateNodePayload
): Promise<WorkspaceNode> {
  const res = await qxtApiClient.post(
    `/api/v1/workspaces/${workspaceId}/compute/nodes`,
    payload
  );
  return res.data;
}

export async function deleteNode(
  workspaceId: string,
  nodeId:      string
): Promise<void> {
  await qxtApiClient.delete(
    `/api/v1/workspaces/${workspaceId}/compute/nodes/${nodeId}`
  );
}