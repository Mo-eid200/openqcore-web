import { qxtApiClient } from "../core/qxtClient";

const BASE = "/api/v1/console/voice";

export interface VoiceItem {
  id:         string;
  title:      string | null;
  prompt:     string | null;
  type:       string;
  status:     string;
  url:        string | null;
  transcript: string | null;
  duration:   number | null;
  provider:   string | null;
  error:      string | null;
  created_at: string;
}

export interface VoiceListResponse {
  items:  VoiceItem[];
  total:  number;
  limit:  number;
  offset: number;
}

export interface VoiceStats {
  total:   number;
  ready:   number;
  pending: number;
  failed:  number;
}

export async function getVoiceJobs(
  limit  = 20,
  offset = 0,
  status?: string,
): Promise<VoiceListResponse> {
  const { data } = await qxtApiClient.get(BASE, {
    params: { limit, offset, ...(status ? { status } : {}) },
  });
  return data;
}

export async function getVoiceStats(): Promise<VoiceStats> {
  const { data } = await qxtApiClient.get(`${BASE}/stats`);
  return data;
}

export async function deleteVoiceJob(id: string): Promise<void> {
  await qxtApiClient.delete(`${BASE}/${id}`);
}