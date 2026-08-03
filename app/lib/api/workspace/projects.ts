// app/lib/api/workspace/projects.ts

import { qxtApiClient } from "../core/qxtClient";

export interface WorkspaceProject {
  id:          string;
  title:       string;
  status:      "active" | "paused" | "archived";
  description: string;
  created_at:  string | null;
  updated_at:  string | null;
}

export interface CreateProjectPayload {
  title:       string;
  description?: string;
  status?:     string;
}

export async function getWorkspaceProjects(workspaceId: string): Promise<WorkspaceProject[]> {
  const res = await qxtApiClient.get(`/api/v1/workspaces/${workspaceId}/projects`);
  return res.data;
}

export async function createWorkspaceProject(
  workspaceId: string,
  payload: CreateProjectPayload
): Promise<WorkspaceProject> {
  const res = await qxtApiClient.post(`/api/v1/workspaces/${workspaceId}/projects`, payload);
  return res.data;
}

export async function deleteWorkspaceProject(
  workspaceId: string,
  projectId: string
): Promise<void> {
  await qxtApiClient.delete(`/api/v1/workspaces/${workspaceId}/projects/${projectId}`);
}