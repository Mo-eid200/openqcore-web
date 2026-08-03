// app/lib/api/workspace/storage.ts

import { qxtApiClient } from "../core/qxtClient";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WorkspaceFile {
  id:           string;
  filename:     string | null;
  url:          string;
  bytes:        number;
  content_type: string;
  kind:         "image" | "video" | "audio" | "document" | "other";
  folder:       string;
  sha256:       string;
  workspace_id: string;
  created_at:   string;
}

export interface StorageListResponse {
  items:       WorkspaceFile[];
  total:       number;
  total_bytes: number;
  limit:       number;
  offset:      number;
}

export interface StorageStats {
  total_files: number;
  total_bytes: number;
  by_kind:     Record<string, number>;
}

// ─── API ──────────────────────────────────────────────────────────────────────

export async function getWorkspaceStorage(
  workspaceId: string,
  params?: { search?: string; kind?: string; limit?: number; offset?: number }
): Promise<StorageListResponse> {
  const res = await qxtApiClient.get(
    `/api/v1/workspaces/${workspaceId}/storage`,
    { params }
  );
  return res.data;
}

export async function getStorageStats(
  workspaceId: string
): Promise<StorageStats> {
  const res = await qxtApiClient.get(
    `/api/v1/workspaces/${workspaceId}/storage/stats`
  );
  return res.data;
}

export async function deleteStorageFile(
  workspaceId: string,
  fileId:      string
): Promise<void> {
  await qxtApiClient.delete(
    `/api/v1/workspaces/${workspaceId}/storage/${fileId}`
  );
}

export async function uploadWorkspaceFile(
  workspaceId: string,
  file:        File,
  onProgress?: (pct: number) => void
): Promise<WorkspaceFile> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await qxtApiClient.post("/api/v1/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (onProgress && e.total) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    },
  });

  // Link uploaded file to workspace
  await qxtApiClient.patch(`/api/v1/upload/${res.data.sha256}/workspace`, {
    workspace_id: workspaceId,
  }).catch(() => {}); // best effort

  return res.data;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatBytes(bytes: number): string {
  if (bytes === 0)          return "0 B";
  if (bytes < 1024)         return `${bytes} B`;
  if (bytes < 1024 * 1024)  return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 ** 3)    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 ** 3)).toFixed(2)} GB`;
}