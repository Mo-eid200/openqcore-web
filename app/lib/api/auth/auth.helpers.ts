import {
  qxtAuthClient,
  qxtApiClient,
  qxtChatClient,
  clearStoredContext,
  setStoredLastSession,
} from "../../api/core/qxtClient";

const TOKEN_KEY = "qxt_access_token";

// ─── Storage ──────────────────────────────────────────────────────────────────

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeStoredToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

// ─── Axios auth headers ───────────────────────────────────────────────────────

function applyTokenHeaders(token: string): void {
  qxtAuthClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  qxtApiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  qxtChatClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

function clearTokenHeaders(): void {
  delete qxtAuthClient.defaults.headers.common["Authorization"];
  delete qxtApiClient.defaults.headers.common["Authorization"];
  delete qxtChatClient.defaults.headers.common["Authorization"];
}

// ─── Auth side effects ────────────────────────────────────────────────────────

/**
 * Restore an already-existing authenticated browser session.
 *
 * IMPORTANT:
 * This MUST NOT clear runtime context.
 *
 * Used during normal application boot / refresh so an authenticated
 * user can remain inside the workspace they explicitly selected.
 */
export function restoreLoginSideEffects(token: string): void {
  setStoredToken(token);
  applyTokenHeaders(token);
}

/**
 * Start a NEW authenticated identity session.
 *
 * Security boundary:
 * Runtime state belonging to the previously authenticated identity
 * must never leak into the newly authenticated identity.
 *
 * New login always starts in Personal context. Workspaces returned by
 * bootstrap can then be selected explicitly by the authenticated user.
 */
export function loginSideEffects(token: string): void {
  // Clear identity-scoped runtime BEFORE any authenticated API request.
  clearStoredContext();
  setStoredLastSession(null);

  setStoredToken(token);
  applyTokenHeaders(token);
}

/**
 * Fully terminate the authenticated browser session.
 */
export function logoutSideEffects(): void {
  removeStoredToken();
  clearTokenHeaders();

  clearStoredContext();
  setStoredLastSession(null);
}

// ─── Token picker ─────────────────────────────────────────────────────────────

export function pickTokenFromResponse(data: any): string {
  return (
    data?.access_token ||
    data?.token ||
    data?.jwt ||
    data?.data?.access_token ||
    ""
  );
}
