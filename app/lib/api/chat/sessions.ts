import { qxtChatClient } from "../core/qxtClient";
import { API_BASE } from "../config";

/* ======================================================
   TYPES
====================================================== */

export type ChatMessage = {
  id?: string;
  role: "user" | "assistant" | "system";
  content: string;
  images?: string[] | null;
  videos?: string[] | null;
  documents?: Array<{
    type: "document";
    url: string;
    name?: string;
    size?: number;
    mimeType?: string;
  }> | null;
  payload?: Record<string, any> | null;
  kind?: "text" | "image" | "video" | "document" | "audio" | "recording" | "upgrade";
  audioUrl?: string;
  created_at?: string | null;
  updated_at?: string | null;
  edited?: boolean | null;
};

export type ChatSession = {
  id: string;
  title?: string | null;
  created_at?: string | null;
  last_message?: string | null;
  folder_id?: string | null;
};

export type ChatRequest = {
  model: string;
  messages: ChatMessage[];
  session_id: string;
  request_id?: string;
  stream?: boolean;
  tools?: any[];
  tool_choice?: any;
};

export type ChatResponse = {
  content?: string;
  session_id?: string;
  model?: string;
  payload?: {
    images?: string[];
    files?: string[];
    videos?: string[];
  };
  usage?: Record<string, any>;
  meta?: {
    trace_id?: string;
    request_id?: string;
    execution_time_ms?: number;
    cached?: boolean;
  };
};

export type StreamChunk = {
  event?: string;
  choices?: Array<{ delta?: { content?: string } }>;
  images?: string[];
  error?: string;
};

/* ======================================================
   HELPERS - Safe Array Picking
====================================================== */
function getWorkspaceId(): string {
  return (
    localStorage.getItem("qxt_workspace_id") ||
    localStorage.getItem("qxt_context_id") ||
    ""
  );
}

function pickArray<T = any>(v: any): T[] {
  return Array.isArray(v) ? v : [];
}

/* ======================================================
   NORMALIZERS
====================================================== */

/**
 * ✅ PRODUCTION: Normalize messages from any API response format
 * Handles:
 * - Direct array: [msg1, msg2]
 * - Object with messages: { messages: [...] }
 * - Object with data: { data: [...] }
 * - Nested payload structure
 */
function normalizeMessages(raw: any): ChatMessage[] {
  try {
    // ✅ Step 1: Extract array from various formats
    let messagesArray: any[] = [];

    if (Array.isArray(raw)) {
      // Direct array format
      messagesArray = raw;
    } else if (raw && typeof raw === "object") {
      // Object format - try multiple keys
      messagesArray =
        Array.isArray(raw.messages) ? raw.messages :
          Array.isArray(raw.data) ? raw.data :
            Array.isArray(raw.items) ? raw.items : [];
    }

    console.log(`[normalizeMessages] Processing ${messagesArray.length} messages`);

    // ✅ Step 2: Filter and normalize each message
    return messagesArray
      .filter((m: any) => m && typeof m === "object" && (m.role || m.content))
      .map((m: any) => {
        // Extract media from various payload structures
        const images = m.payload?.images || m.images || [];
        const videos = m.payload?.videos || m.videos || [];
        const audioUrl = m.payload?.audio_url || m.audioUrl || null;

        // Handle documents
        const documents = Array.isArray(m.payload?.documents)
          ? m.payload.documents.map((d: any) => ({
            type: "document" as const,
            url: d.url || d.file_url || "",
            name: d.name || d.filename || "Document",
            size: d.size || 0,
            mimeType: d.mime_type || "application/octet-stream",
          }))
          : [];

        // ✅ Determine message kind based on content
        let kind: ChatMessage["kind"] = "text";
        if (documents.length > 0) {
          kind = "document";
        } else if (videos.length > 0) {
          kind = "video";
        } else if (images.length > 0) {
          kind = "image";
        } else if (audioUrl) {
          kind = "audio";
        }

        return {
          id: m.id ? String(m.id) : undefined,
          role: (m.role || "user") as "user" | "assistant" | "system",
          content: typeof m.content === "string" ? m.content : "",
          images: images.length > 0 ? images : null,
          videos: videos.length > 0 ? videos : null,
          documents: documents.length > 0 ? documents : null,
          audioUrl: audioUrl || undefined,
          payload: m.payload || null,
          kind,
          created_at: m.created_at ?? null,
          updated_at: m.updated_at ?? null,
          edited: typeof m.edited === "boolean" ? m.edited : null,
        };
      });
  } catch (err) {
    console.error("[normalizeMessages] Error:", err);
    return [];
  }
}

/**
 * ✅ PRODUCTION: Normalize sessions from API response
 */
function normalizeSessions(raw: any): ChatSession[] {
  try {
    // Extract sessions array
    let sessionsArray: any[] = [];

    if (Array.isArray(raw)) {
      sessionsArray = raw;
    } else if (raw && typeof raw === "object") {
      sessionsArray =
        Array.isArray(raw.sessions) ? raw.sessions :
          Array.isArray(raw.data) ? raw.data :
            Array.isArray(raw.items) ? raw.items : [];
    }

    console.log(`[normalizeSessions] Processing ${sessionsArray.length} sessions`);

    return sessionsArray
      .filter((s: any) => s && typeof s === "object" && s.id)
      .map((s: any) => ({
        id: String(s.id),
        title: typeof s.title === "string" ? s.title : null,
        created_at: s.created_at ?? null,
        last_message: s.last_message ?? null,
        folder_id: s.folder_id ?? null,
      }));
  } catch (err) {
    console.error("[normalizeSessions] Error:", err);
    return [];
  }
}

/* ======================================================
   SESSIONS API
====================================================== */

/**
 * ✅ List all sessions for current user
 */
export async function listSessions(): Promise<ChatSession[]> {
  try {
    console.log("[listSessions] Fetching sessions...");
    const res = await qxtChatClient.get("/api/v1/sessions");

    console.log("[listSessions] Response:", res.data);

    return normalizeSessions(res.data);
  } catch (err) {
    console.error("[listSessions] Failed:", err);
    return [];
  }
}

/**
 * ✅ Create new session
 */
export async function createSession(payload?: {
  title?: string;
  folder_id?: string | null;
  kind?: "chat";
  metadata?: Record<string, unknown>;
  forcePersonalContext?: boolean;
}): Promise<{ id: string }> {
  try {
    console.log("[createSession] Creating session...", payload);

    const res = await qxtChatClient.post(
      "/api/v1/sessions",
      {
        title: payload?.title?.trim() || null,
        folder_id: payload?.folder_id ?? null,
        kind: payload?.kind ?? "chat",
        metadata: payload?.metadata ?? {},
      },
      {
        __forcePersonalContext: payload?.forcePersonalContext === true,
      } as any
    );

    const id = res.data?.id;

    if (!id || typeof id !== "string") {
      throw new Error("Invalid session ID in response");
    }

    console.log("[createSession] ✅ Created:", id);

    return { id };
  } catch (err) {
    console.error("[createSession] ❌ Failed:", err);
    throw err;
  }
}
/**
 * ✅ Get session messages - PRODUCTION READY
 * Handles voice messages properly with payload structure
 */
export async function getSessionMessages(
  sessionId: string
): Promise<ChatMessage[]> {
  if (!sessionId) {
    throw new Error("Missing sessionId");
  }

  try {
    console.log(`[getSessionMessages] Fetching for session: ${sessionId}`);

    const res = await qxtChatClient.get(
      `/api/v1/sessions/${sessionId}/messages`
    );

    console.log("[getSessionMessages] Response:", res.data);

    // ✅ PRODUCTION: Use normalizeMessages which handles all formats
    const messages = normalizeMessages(res.data);

    console.log(`[getSessionMessages] ✅ Normalized ${messages.length} messages`);

    return messages;
  } catch (err: any) {
    if (err?.response?.status === 404) {
      console.warn("[getSessionMessages] ⚠️ Session not found:", sessionId);
      return [];
    }
    console.error("[getSessionMessages] ❌ Failed:", err);
    throw err;
  }
}

/**
 * ✅ Delete session
 */
export async function deleteSession(sessionId: string): Promise<void> {
  if (!sessionId) throw new Error("Missing sessionId");

  try {
    console.log("[deleteSession] Deleting session:", sessionId);

    await qxtChatClient.delete(`/api/v1/sessions/${sessionId}`);

    console.log("[deleteSession] ✅ Deleted:", sessionId);
  } catch (err) {
    console.error("[deleteSession] ❌ Failed:", err);
    throw err;
  }
}

/**
 * ✅ Rename session
 */
export async function renameSession(
  sessionId: string,
  newTitle: string
): Promise<void> {
  if (!sessionId) throw new Error("Missing sessionId");
  if (!newTitle?.trim()) throw new Error("Title cannot be empty");

  try {
    console.log("[renameSession] Renaming to:", newTitle);

    await qxtChatClient.patch(`/api/v1/sessions/${sessionId}/rename`, {
      title: newTitle.trim(),
    });

    console.log("[renameSession] ✅ Renamed");
  } catch (err) {
    console.error("[renameSession] ❌ Failed:", err);
    throw err;
  }
}

/**
 * ✅ Move session to folder
 */
export async function moveSession(
  sessionId: string,
  folderId: string | null
): Promise<ChatSession> {
  if (!sessionId) throw new Error("Missing sessionId");

  try {
    console.log("[moveSession] Moving to folder:", folderId);

    const res = await qxtChatClient.patch(
      `/api/v1/sessions/${sessionId}/move`,
      { folder_id: folderId ?? null }
    );

    console.log("[moveSession] ✅ Moved");

    return normalizeSessions([res.data])[0];
  } catch (err) {
    console.error("[moveSession] ❌ Failed:", err);
    throw err;
  }
}

/**
 * ✅ Reorder sessions in folder
 */
export async function reorderSessions(
  folderId: string | null,
  orderedIds: string[]
): Promise<void> {
  if (!Array.isArray(orderedIds) || orderedIds.length === 0) return;

  try {
    console.log("[reorderSessions] Reordering...");

    await qxtChatClient.post("/api/v1/sessions/reorder", {
      folder_id: folderId ?? null,
      ordered_ids: orderedIds,
    });

    console.log("[reorderSessions] ✅ Reordered");
  } catch (err) {
    console.error("[reorderSessions] ❌ Failed:", err);
    throw err;
  }
}

/* ======================================================
   CHAT API
====================================================== */

/**
 * ✅ Send non-streaming message
 */
export async function sendChatMessage(
  sessionId: string,
  userMessage: string,
  model: string = "pulse",
  requestId?: string
): Promise<ChatResponse> {
  if (!sessionId) throw new Error("Session ID is required");
  if (!userMessage?.trim()) throw new Error("Message cannot be empty");

  const finalRequestId = requestId || crypto.randomUUID();

  try {
    console.log("[sendChatMessage] Sending message...");

    const res = await qxtChatClient.post("/api/v1/chat/completions", {
      model,
      session_id: sessionId,
      request_id: finalRequestId,
      messages: [
        {
          role: "user",
          content: userMessage.trim(),
        },
      ],
      stream: false,
    });

    console.log("[sendChatMessage] ✅ Response received");

    return {
      content: res.data?.content || "",
      session_id: res.data?.session_id,
      model: res.data?.model || model,
      payload: res.data?.payload,
      usage: res.data?.usage,
      meta: res.data?.meta,
    };
  } catch (err: any) {
    console.error("[sendChatMessage] ❌ Failed:", err);
    throw err;
  }
}

/* ======================================================
   STREAMING API
====================================================== */

/**
 * ✅ Stream chat message (for text input)
 */
export async function* streamChatMessage(
  sessionId: string,
  userMessage: string,
  model: string = "pulse",
  requestId?: string,
  forcePersonalContext: boolean = false
): AsyncGenerator<string, void, unknown> {
  if (!sessionId) throw new Error("Session ID is required");
  if (!userMessage?.trim()) throw new Error("Message cannot be empty");

  const finalRequestId = requestId || crypto.randomUUID();
  const token = localStorage.getItem("qxt_access_token") || "";
  const workspaceId = forcePersonalContext ? "" : getWorkspaceId();

  try {
    console.log("[streamChatMessage] Starting stream...");
    
    console.log("API_BASE =", API_BASE);
    console.log("URL =", `${API_BASE}/api/v1/chat/completions`);
    const response = await fetch(`${API_BASE}/api/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        ...(token
          ? { Authorization: `Bearer ${token}` }
          : {}),

          ...(forcePersonalContext
  ? {
      "X-Space-Type": "personal",
      "X-Scope-Type": "personal",
    }
  : {}),

        ...(workspaceId
          ? { "X-Company-ID": workspaceId }
          : {}),
      },
      body: JSON.stringify({
        model,
        session_id: sessionId,
        request_id: finalRequestId,
        stream: true,
        messages: [
          {
            role: "user",
            content: userMessage.trim(),
          },
        ],
      }),
    });

    if (!response.ok) {
  let message = `Stream failed: ${response.status}`;

  try {
    const errorData = await response.json();

    if (typeof errorData?.detail === "string") {
      message = errorData.detail;
    } else if (errorData?.detail?.message) {
      message = errorData.detail.message;
    }
  } catch {
    // Keep fallback message.
  }

  const error = new Error(message) as Error & { status?: number };
  error.status = response.status;

  throw error;
}

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) throw new Error("No stream reader");

    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;

        const data = line.slice(6);
        if (data === "[DONE]") {
          console.log("[streamChatMessage] ✅ Stream completed");
          return;
        }

        try {
          const chunk = JSON.parse(data);

          if (chunk.choices?.[0]?.delta?.content) {
            yield chunk.choices[0].delta.content;
          }

          if (chunk.images) {
            yield `[IMAGES:${chunk.images.join(",")}]`;
          }
        } catch (e) {
          console.warn("[streamChatMessage] ⚠️ Parse error:", data);
        }
      }
    }
  } catch (err: any) {
    if (err?.status !== 429) {
      console.error("[streamChatMessage] ❌ Failed:", err);
    }

    throw err;
  }
}

/* ======================================================
   CONVENIENCE FUNCTIONS
====================================================== */

/**
 * ✅ Send message and refresh session state
 */
export async function sendMessageAndRefresh(
  sessionId: string,
  userMessage: string,
  model: string = "pulse"
) {
  console.log("[sendMessageAndRefresh] Starting...");

  const response = await sendChatMessage(sessionId, userMessage, model);
  await listSessions();
  const messages = await getSessionMessages(sessionId);

  console.log("[sendMessageAndRefresh] ✅ Complete");

  return {
    response: response.content || "",
    messages,
  };
}