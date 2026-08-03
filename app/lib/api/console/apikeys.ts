import { qxtApiClient } from "../core/qxtClient";

const BASE = "/api/v1/api-keys";

export interface ApiKeyItem {
  id:         number;
  key:        string;
  name:       string | null;
  active:     boolean;
  created_at: string;
  raw_key?:   string;
}

export async function getApiKeys(): Promise<ApiKeyItem[]> {
  const { data } = await qxtApiClient.get(BASE);
  return data;
}

export async function createApiKey(name: string): Promise<ApiKeyItem & { raw_key: string }> {
  const { data } = await qxtApiClient.post(BASE, { name });
  return { ...data, id: data.id || 0, raw_key: data.key };
}

export async function disableApiKey(id: number): Promise<void> {
  await qxtApiClient.post(`${BASE}/${id}/disable`);
}