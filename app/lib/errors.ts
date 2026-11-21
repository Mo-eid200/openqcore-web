// app/lib/errors.ts
//
// A typed view of whatever a catch block receives. Axios errors, fetch
// errors and plain Errors all fit; nothing is assumed to exist.

export type ApiErrorLike = {
  message?: string;
  name?: string;
  status?: number;
  code?: string;
  response?: {
    status?: number;
    data?: {
      detail?: string | { message?: string; code?: string; [key: string]: unknown };
      message?: string;
      error?: { message?: string; code?: string; extra?: Record<string, unknown> };
      [key: string]: unknown;
    };
  };
};

export function asApiError(caught: unknown): ApiErrorLike {
  if (caught && typeof caught === "object") return caught as ApiErrorLike;
  return { message: caught === undefined || caught === null ? undefined : String(caught) };
}

/** The most specific human-readable message the server or runtime gave. */
export function errorMessage(caught: unknown, fallback = "Something went wrong"): string {
  const e = asApiError(caught);
  const d = e.response?.data;
  const detail = typeof d?.detail === "string" ? d.detail : d?.detail?.message;
  return detail || d?.error?.message || d?.message || e.message || fallback;
}

/** The API's machine-readable error code ({"error": {"code"}} or {"detail": {"code"}}). */
export function errorCode(caught: unknown): string | undefined {
  const d = asApiError(caught).response?.data;
  return d?.error?.code || (typeof d?.detail === "object" ? d.detail.code : undefined) || undefined;
}

/** Extra fields the API attached to an error ({"error": {"extra": {...}}}). */
export function errorExtra(caught: unknown): Record<string, unknown> {
  return asApiError(caught).response?.data?.error?.extra ?? {};
}

export function errorStatus(caught: unknown): number | undefined {
  const e = asApiError(caught);
  return e.response?.status ?? e.status;
}

/** The server's `detail` as text (FastAPI sends a string or {message, code}). */
export function detailText(caught: unknown): string | undefined {
  const d = asApiError(caught).response?.data?.detail;
  return typeof d === "string" ? d : d?.message;
}
