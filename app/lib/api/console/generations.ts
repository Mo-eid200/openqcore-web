import { qxtApiClient } from "../core/qxtClient";
import type { GenerationItem } from "../../../[locale]/(dashboard)/console/generations/types";

const BASE = "/api/v1/console/generations";

export interface GenerationListResponse {
  items:  GenerationItem[];
  total:  number;
  limit:  number;
  offset: number;
}

export async function getGenerations(
  limit  = 20,
  offset = 0,
  status?: string,
): Promise<GenerationListResponse> {
  const { data } = await qxtApiClient.get(BASE, {
    params: { limit, offset, ...(status ? { status } : {}) },
  });
  return data;
}

export async function createGeneration(payload: {
  prompt:      string;
  title?:      string;
  model?:      string;
  temperature?: number;
  max_tokens?:  number;
}): Promise<GenerationItem> {
  const { data } = await qxtApiClient.post(BASE, payload);
  return data;
}

export async function deleteGeneration(id: string): Promise<void> {
  await qxtApiClient.delete(`${BASE}/${id}`);
}

export async function rerunGeneration(id: string): Promise<GenerationItem> {
  const { data } = await qxtApiClient.post(`${BASE}/${id}/rerun`);
  return data;
}

export async function updateGeneration(
  id: string,
  payload: { title?: string },
): Promise<GenerationItem> {
  const { data } = await qxtApiClient.patch(`${BASE}/${id}`, payload);
  return data;
}