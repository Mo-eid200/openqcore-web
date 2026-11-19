import { qxtChatClient } from "../core/qxtClient";

import { asApiError, detailText } from "@/app/lib/errors";

/* ======================================================
   TYPES
====================================================== */

// One part of a multimodal message as the completions API expects it.
type ContentPart =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } };

export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
  images?: string[] | null;
  videos?: string[] | null;
  documents?: Array<{
    type: "document";
    url: string;
    name: string;
    size: number;
    mimeType: string;
  }> | null;
  kind?: "text" | "image" | "video" | "document" | "audio" | "recording" | "upgrade";
  audioUrl?: string;
  tokens?: number;
  limit?: number;
};

export type ChatCompletionRequest = {
  session_id: string;
  model: string;
  messages: Array<{ role: ChatMessage["role"]; content: string | ContentPart[] }>;
  stream?: boolean;
  temperature?: number;
  max_tokens?: number;
};

export type ChatCompletionResponse = {
  content: string;
  session_id: string;
  model: string;
  images?: string[];
  videos?: string[];
  meta?: {
    trace_id: string;
    request_id: string;
    execution_time_ms: number;
    cached: boolean;
  };
  payload?: {
    images?: string[];
    files?: string[];
    videos?: string[];
    documents?: Array<{
      type: string;
      url: string;
      name: string;
      size: number;
      mime_type: string;
    }>;
  };
  usage?: {
    actual_tokens: number;
    actual_units: number;
    variance_pct: number;
  };
};

/* ======================================================
   SESSION MANAGER
====================================================== */

export async function createSession(options?: {
  folder_id?: string | null;
  title?: string | null;
}): Promise<{ id: string }> {
  try {
    const res = await qxtChatClient.post("/api/v1/sessions", {
      title: options?.title || null,
      folder_id: options?.folder_id || null,
    });

    const sessionId: string = res.data?.id;
    if (!sessionId) {
      throw new Error("Invalid session ID in response");
    }

    console.log("✅ Session created:", sessionId);
    return { id: sessionId };
  } catch (err) {
    console.error("❌ Failed to create session:", err);
    throw err;
  }
}

export async function getSessionById(sessionId: string): Promise<{ id: string }> {
  try {
    const res = await qxtChatClient.get(`/api/v1/sessions/${sessionId}`);
    console.log("✅ Session found:", sessionId);
    return { id: res.data?.id || sessionId };
  } catch (err) {
    console.error("❌ Session not found:", sessionId);
    throw err;
  }
}

export async function listSessions(): Promise<
  Array<{
    id: string;
    title: string | null;
    created_at: string;
    updated_at: string;
  }>
> {
  try {
    const res = await qxtChatClient.get("/api/v1/sessions");
    console.log("✅ Sessions listed:", res.data?.length);
    return res.data || [];
  } catch (err) {
    console.error("❌ Failed to list sessions:", err);
    return [];
  }
}

export async function getSessionMessages(sessionId: string): Promise<ChatMessage[]> {
  try {
    const res = await qxtChatClient.get(`/api/v1/sessions/${sessionId}/messages`);
    console.log("✅ Messages loaded for session:", sessionId);
    return res.data || [];
  } catch (err) {
    console.error("❌ Failed to get session messages:", err);
    return [];
  }
}

export async function deleteSession(sessionId: string): Promise<void> {
  try {
    await qxtChatClient.delete(`/api/v1/sessions/${sessionId}`);
    console.log("✅ Session deleted:", sessionId);
  } catch (err) {
    console.error("❌ Failed to delete session:", err);
    throw err;
  }
}

/* ======================================================
   NON-STREAMING CHAT
====================================================== */

export async function createChatCompletion(
  messages: ChatMessage[],
  options?: {
    model?: string;
    sessionId?: string;
    temperature?: number;
    max_tokens?: number;
  }
): Promise<ChatCompletionResponse> {
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error("Messages array is required and cannot be empty");
  }

  try {
    const session_id = options?.sessionId || (await createSession()).id;

    console.log(`📤 Sending message to session ${session_id}`);

    const sanitizedMessages = messages.map((m) => {
      const content: ContentPart[] = [];

      // text
      if (m.content?.trim()) {
        content.push({
          type: "text",
          text: m.content.trim(),
        });
      }

      // images
      (m.images || []).forEach((url) => {
        content.push({
          type: "image_url",
          image_url: {
            url,
          },
        });
      });

      return {
        role: m.role,
        content,
      };
    });

    const payload: ChatCompletionRequest = {
      session_id,
      model: options?.model || "pulse-core",
      messages: sanitizedMessages,
      stream: false,
      temperature: options?.temperature,
      max_tokens: options?.max_tokens,
    };

    const { data } = await qxtChatClient.post(
      "/api/v1/chat/completions",
      payload
    );

    console.log("✅ Chat completion received");

    const images = data?.payload?.images || [];
    const videos = data?.payload?.videos || [];

    return {
      content: images.length > 0 ? "" : data?.content || "",
      session_id: data?.session_id || session_id,
      model: data?.model || options?.model || "pulse-core",
      meta: data?.meta,
      payload: data?.payload,
      usage: data?.usage,

      // 🔥 المهم
      images,
      videos,
    };
  } catch (caught) {
    const err = asApiError(caught);
    const status = err?.response?.status;
    const rawDetail = err.response?.data?.detail;
    const detail = typeof rawDetail === "object" ? rawDetail : undefined;

    console.error("❌ Chat completion failed:", err);

    if (status === 401) {
      throw new Error("Unauthorized - please login again");
    }

    if (status === 429 || detail?.code === "QUOTA_EXCEEDED") {
      const limit = Number(detail?.limit) || 3;
      throw new Error(
        `Daily limit reached (${limit}/${limit}). Please upgrade.`
      );
    }

    if (status === 404) {
      throw new Error("Session not found");
    }

    throw new Error(
      detailText(err) || detail?.code || `Chat failed: ${status}`
    );
  }
}

/* ======================================================
   UTILITIES
====================================================== */

export function extractMetadata(response: ChatCompletionResponse) {
  return {
    requestId: response.meta?.request_id,
    traceId: response.meta?.trace_id,
    executionTime: response.meta?.execution_time_ms,
    cached: response.meta?.cached,
    tokens: response.usage?.actual_tokens,
  };
}