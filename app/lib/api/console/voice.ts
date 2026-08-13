import { qxtApiClient } from "../core/qxtClient";

const BASE = "/api/v1/console/voice";

// ─── Types ────────────────────────────────────────────────────────────────────

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

// 🔧 NEW: matches VoiceOptionOut from console_voice.py
export interface VoiceOption {
  id:          string;
  public_name: string;
  description: string | null;
  capability:  "tts" | "stt";
  languages:   string[];
  is_active:   boolean;
}

// 🔧 NEW: matches DefaultVoiceOut
export interface DefaultVoice {
  id:          string | null;
  public_name: string | null;
  capability:  "tts" | "stt";
}

// ─── Existing: List / Stats / Get / Delete ─────────────────────────────────────

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

// 🔧 NEW: single-item fetch — GET /{job_id} exists on the backend but
// had no matching client function.
export async function getVoiceJob(id: string): Promise<VoiceItem> {
  const { data } = await qxtApiClient.get(`${BASE}/${id}`);
  return data;
}

export async function deleteVoiceJob(id: string): Promise<void> {
  await qxtApiClient.delete(`${BASE}/${id}`);
}

// ─── NEW: voice_options (Settings + Playground both read this) ────────────────

export async function getVoiceOptions(
  capability?: "tts" | "stt",
): Promise<VoiceOption[]> {
  const { data } = await qxtApiClient.get(`${BASE}/options`, {
    params: capability ? { capability } : {},
  });
  return data;
}

// ─── NEW: default voice (Settings tab) ─────────────────────────────────────────

export async function getDefaultVoice(
  capability: "tts" | "stt",
): Promise<DefaultVoice> {
  const { data } = await qxtApiClient.get(`${BASE}/default`, {
    params: { capability },
  });
  return data;
}

export async function setDefaultVoice(
  capability: "tts" | "stt",
  voiceOptionId: string,
): Promise<DefaultVoice> {
  const { data } = await qxtApiClient.put(`${BASE}/default`, {
    capability,
    voice_option_id: voiceOptionId,
  });
  return data;
}

// ─── NEW: Playground — TTS / STT ───────────────────────────────────────────────

export async function createTTS(payload: {
  text: string;
  voice_option_id?: string;
  title?: string;
}): Promise<VoiceItem> {
  const { data } = await qxtApiClient.post(`${BASE}/tts`, payload);
  return data;
}

export async function createSTT(
  file: File,
  voiceOptionId?: string,
  title?: string,
): Promise<VoiceItem> {
  const form = new FormData();
  form.append("file", file);
  if (voiceOptionId) form.append("voice_option_id", voiceOptionId);
  if (title) form.append("title", title);

  const { data } = await qxtApiClient.post(`${BASE}/stt`, form, {
    headers: { "Content-Type": undefined },
  });
  return data;
}

// ─── NEW: "Listen to this message" — used from qxt-chat ───────────────────────

export async function attachAudioToMessage(
  sessionId: string,
  requestId: string,
  textToSpeak: string,
): Promise<{ success: boolean; audio_url: string }> {
  const form = new FormData();
  form.append("text_to_speak", textToSpeak);

  const { data } = await qxtApiClient.post(
    `${BASE}/attach/${sessionId}/${requestId}`,
    form,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return data;
}