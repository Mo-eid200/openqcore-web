import { qxtApiClient } from "../core/qxtClient";

const BASE = "/api/v1/console/images";

export interface ImageItem {
  id:          string;
  prompt:      string;
  status:      string;
  provider:    string | null;
  size:        string | null;
  steps:       number | null;
  guidance:    number | null;
  seed:        number | null;
  num_outputs: number;
  output_url:  string | null;
  error:       string | null;
  created_at:  string;
}

export interface ImageListResponse {
  items:  ImageItem[];
  total:  number;
  limit:  number;
  offset: number;
}

export interface ImageStats {
  total:   number;
  ready:   number;
  pending: number;
  failed:  number;
}

export async function getImages(
  limit  = 20,
  offset = 0,
  status?: string,
): Promise<ImageListResponse> {
  const { data } = await qxtApiClient.get(BASE, {
    params: { limit, offset, ...(status ? { status } : {}) },
  });
  return data;
}

export async function getImageStats(): Promise<ImageStats> {
  const { data } = await qxtApiClient.get(`${BASE}/stats`);
  return data;
}

export async function deleteImage(id: string): Promise<void> {
  await qxtApiClient.delete(`${BASE}/${id}`);
}