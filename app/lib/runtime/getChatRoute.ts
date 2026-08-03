type GetChatRouteParams = {
  sessionId?: string | null;
  agentId?: string | null;
};

function normalize(
  value?: string | null
): string | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  return trimmed || null;
}

export function getChatRoute({
  sessionId,
  agentId,
}: GetChatRouteParams = {}): string {
  const normalizedSessionId =
    normalize(sessionId);

  const normalizedAgentId =
    normalize(agentId);

  if (normalizedAgentId) {
    const base =
      `/qxt-chat/agent/${encodeURIComponent(normalizedAgentId)}`;

    if (!normalizedSessionId) {
      return base;
    }

    return `${base}?sid=${encodeURIComponent(normalizedSessionId)}`;
  }

  const base = "/qxt-chat";

  if (!normalizedSessionId) {
    return base;
  }

  return `${base}?sid=${encodeURIComponent(normalizedSessionId)}`;
}