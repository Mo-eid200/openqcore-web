// app/lib/api/console/projects.ts

import { qxtApiClient } from "../core/qxtClient";

export interface ConsoleProject {
  id:          string;
  title:       string;
  status:      "active" | "paused" | "archived";
  description: string;
  created_at:  string | null;
  updated_at:  string | null;
}

export interface ProjectSession {
  id:             string;
  title:          string;
  last_message:   string;
  messages_count: number;
  created_at:     string | null;
  updated_at:     string | null;
}

export interface CreateProjectPayload {
  title:        string;
  description?: string;
  status?:      string;
}

// ── Projects ──────────────────────────────────────────────────────────────────

export async function getConsoleProjects(): Promise<ConsoleProject[]> {
  const res = await qxtApiClient.get("/api/v1/console/projects");
  return res.data;
}

export async function createConsoleProject(
  payload: CreateProjectPayload
): Promise<ConsoleProject> {
  const res = await qxtApiClient.post("/api/v1/console/projects", payload);
  return res.data;
}

export async function deleteConsoleProject(projectId: string): Promise<void> {
  await qxtApiClient.delete(`/api/v1/console/projects/${projectId}`);
}

// ── Sessions ──────────────────────────────────────────────────────────────────

export async function getProjectSessions(projectId: string): Promise<ProjectSession[]> {
  const res = await qxtApiClient.get(`/api/v1/console/projects/${projectId}/sessions`);
  return res.data;
}