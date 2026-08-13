import { qxtApiClient } from "../core/qxtClient";

const BASE = (workspaceId: string) => `/api/v1/workspaces/${workspaceId}/voice`;

export type VoiceCapability = "tts" | "stt";
export type VoiceJobType = "tts" | "stt";
export type VoiceJobStatus = "pending" | "processing" | "ready" | "failed";

export interface VoiceItem {
  id: string;
  title: string | null;
  prompt: string | null;
  type: VoiceJobType;
  status: VoiceJobStatus;
  url: string | null;
  transcript: string | null;
  duration: number | null;
  provider: string | null;
  error: string | null;
  created_at: string;
}

export interface VoiceListResponse {
  items: VoiceItem[];
  total: number;
  limit: number;
  offset: number;
}

export interface VoiceStats {
  total: number;
  ready: number;
  pending: number;
  failed: number;
}

export interface VoiceOption {
  id: string;
  public_name: string;
  description: string | null;
  capability: VoiceCapability;
  languages: string[];
  is_active: boolean;
}

export interface DefaultVoice {
  id: string | null;
  public_name: string | null;
  capability: VoiceCapability;
}

export interface CreateTTSRequest {
  text: string;
  voice_option_id?: string;
  title?: string;
}

export async function getVoiceJobs(
  workspaceId: string,
  limit = 20,
  offset = 0,
  status?: VoiceJobStatus,
): Promise<VoiceListResponse> {
  const { data } = await qxtApiClient.get(BASE(workspaceId), {
    params: { limit, offset, ...(status ? { status } : {}) },
  });
  return data;
}

export async function getVoiceStats(workspaceId: string): Promise<VoiceStats> {
  const { data } = await qxtApiClient.get(`${BASE(workspaceId)}/stats`);
  return data;
}

export async function getVoiceJob(
  workspaceId: string,
  id: string,
): Promise<VoiceItem> {
  const { data } = await qxtApiClient.get(`${BASE(workspaceId)}/${id}`);
  return data;
}

export async function deleteVoiceJob(
  workspaceId: string,
  id: string,
): Promise<void> {
  await qxtApiClient.delete(`${BASE(workspaceId)}/${id}`);
}

export async function getVoiceOptions(
  workspaceId: string,
  capability?: VoiceCapability,
): Promise<VoiceOption[]> {
  const { data } = await qxtApiClient.get(`${BASE(workspaceId)}/options`, {
    params: capability ? { capability } : {},
  });
  return data;
}

export async function getDefaultVoice(
  workspaceId: string,
  capability: VoiceCapability,
): Promise<DefaultVoice> {
  const { data } = await qxtApiClient.get(`${BASE(workspaceId)}/default`, {
    params: { capability },
  });
  return data;
}

export async function setDefaultVoice(
  workspaceId: string,
  capability: VoiceCapability,
  voiceOptionId: string,
): Promise<DefaultVoice> {
  const { data } = await qxtApiClient.put(`${BASE(workspaceId)}/default`, {
    capability,
    voice_option_id: voiceOptionId,
  });
  return data;
}

export async function createTTS(
  workspaceId: string,
  payload: CreateTTSRequest,
): Promise<VoiceItem> {
  const { data } = await qxtApiClient.post(`${BASE(workspaceId)}/tts`, payload);
  return data;
}

export async function createSTT(
  workspaceId: string,
  file: File,
  voiceOptionId?: string,
  title?: string,
): Promise<VoiceItem> {
  const form = new FormData();
  form.append("file", file);
  if (voiceOptionId) form.append("voice_option_id", voiceOptionId);
  if (title) form.append("title", title);
  const { data } = await qxtApiClient.post(`${BASE(workspaceId)}/stt`, form, {
    headers: { "Content-Type": undefined },
  });
  return data;
}

export async function attachAudioToMessage(
  workspaceId: string,
  sessionId: string,
  requestId: string,
  textToSpeak: string,
): Promise<{ success: boolean; audio_url: string }> {
  const form = new FormData();
  form.append("text_to_speak", textToSpeak);

  const { data } = await qxtApiClient.post(
    `${BASE(workspaceId)}/attach/${sessionId}/${requestId}`,
    form,
  );
  return data;
}