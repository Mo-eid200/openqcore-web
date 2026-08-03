import { qxtApiClient } from "../core/qxtClient";

const BASE = "/api/v1/console/knowledge";

export interface KnowledgeItem {
  id:          string;
  title:       string;
  type:        "pdf" | "doc" | "snippet" | "faq" | "url";
  status:      "pending" | "processing" | "processed" | "failed";
  description: string | null;
  file_url:    string | null;
  file_size:   number | null;
  mime_type:   string | null;
  tags:        string[];
  doc_id:      string | null;
  error_msg:   string | null;
  created_at:  string;
  updated_at:  string;
}

export interface KnowledgeListResponse {
  items:  KnowledgeItem[];
  total:  number;
  limit:  number;
  offset: number;
}

export async function getKnowledgeItems(
  limit  = 20,
  offset = 0,
  status?: string,
): Promise<KnowledgeListResponse> {
  const { data } = await qxtApiClient.get(BASE, {
    params: { limit, offset, ...(status ? { status } : {}) },
  });
  return data;
}

export async function uploadKnowledgeFile(
  file:  File,
  onProgress?: (pct: number) => void,
  description?: string,
): Promise<KnowledgeItem> {
  const form = new FormData();
  form.append("file", file);
  if (description?.trim()) {
    form.append("description", description.trim());
  }

  const { data } = await qxtApiClient.post(`${BASE}/upload`, form, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (onProgress && e.total) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    },
  });
  return data;
}

export async function createSnippet(payload: {
  title:       string;
  content:     string;
  type?:       string;
  description?: string;
  tags?:       string[];
}): Promise<KnowledgeItem> {
  const { data } = await qxtApiClient.post(BASE, payload);
  return data;
}

export async function updateKnowledgeItem(
  id:      string,
  payload: { title?: string; description?: string; tags?: string[] },
): Promise<KnowledgeItem> {
  const { data } = await qxtApiClient.patch(`${BASE}/${id}`, payload);
  return data;
}

export async function deleteKnowledgeItem(id: string): Promise<void> {
  await qxtApiClient.delete(`${BASE}/${id}`);
}

export interface KnowledgeAgent {
  id:     string;
  name:   string;
  role:   string;
  status: string;
  model:  string | null;
}

export async function getKnowledgeAgents(itemId: string): Promise<KnowledgeAgent[]> {
  const { data } = await qxtApiClient.get(`${BASE}/${itemId}/agents`);
  return data?.agents ?? [];
}

export async function linkKnowledgeToAgent(itemId: string, agentId: string): Promise<void> {
  await qxtApiClient.post(`${BASE}/${itemId}/agents/${agentId}`);
}

export async function unlinkKnowledgeFromAgent(itemId: string, agentId: string): Promise<void> {
  await qxtApiClient.delete(`${BASE}/${itemId}/agents/${agentId}`);
}

export async function askKnowledge(payload: {
  question: string;
  top_k?:   number;
  model?:   string;
}): Promise<{ answer: string; sources: any[] }> {
  const { data } = await qxtApiClient.post(`${BASE}/ask`, payload);
  return data;
}