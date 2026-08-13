import {
    qxtApiClient,
} from "../core/qxtClient";

// =========================================================
// SUMMARY
// =========================================================

export interface ConsoleActivitySummary {
    total_events: number;
    chat_events: number;
    image_events: number;
    api_events: number;
    errors: number;
    running: number;
}

// =========================================================
// EVENT
// =========================================================

export type ConsoleActivityStatus =
    | "success"
    | "error"
    | "running";

export type ConsoleActivityType =
    | "chat"
    | "image_generation"
    | "api_request";

export interface ConsoleActivityEvent {
    id: string;
    type: ConsoleActivityType;
    category: string;
    title: string;
    subtitle: string;
    status: ConsoleActivityStatus;
    icon: string;
    provider: string | null;
    model: string | null;
    tokens: number | null;
    path: string | null;
    created_at: string;
}

// =========================================================
// REQUEST PARAMS
// =========================================================

// 🔧 NEW: filters/search/pagination — all optional, so existing
// callers (getConsoleActivity() with no args) keep working exactly
// as before while new UI can opt into any combination of these.
export interface ConsoleActivityParams {
    /** Filter by one or more event types. Omit for all types. */
    types?: ConsoleActivityType[];
    /** Filter by one or more statuses. Omit for all statuses. */
    statuses?: ConsoleActivityStatus[];
    /** ISO date string (inclusive) — events on/after this date. */
    date_from?: string;
    /** ISO date string (inclusive) — events on/before this date. */
    date_to?: string;
    /** Free-text search across title/subtitle/model. */
    search?: string;
    /** Cursor for pagination — pass back the `next_cursor` from the
     * previous response to load the next page. Omit for the first page. */
    cursor?: string | null;
    /** Page size. Defaults to 25 server-side if omitted. */
    limit?: number;
}

// =========================================================
// RESPONSE
// =========================================================

export interface ConsoleActivityResponse {
    summary: ConsoleActivitySummary;
    events: ConsoleActivityEvent[];
    /** Pass this back as `cursor` to fetch the next page. `null` means
     * there are no more results. */
    next_cursor: string | null;
    has_more: boolean;
}

// =========================================================
// API
// =========================================================

export async function getConsoleActivity(
    params: ConsoleActivityParams = {},
): Promise<ConsoleActivityResponse> {
    // 🔧 FIX: no more try/catch-and-swallow here. If the request
    // fails, this throws — React Query's `error` state on the
    // calling page now actually fires (it never could before, since
    // this function always resolved successfully with an empty-but-
    // valid-looking payload, even on a real server outage).
    const response = await qxtApiClient.get(
        "/api/v1/console/activity",
        {
            params: {
                types: params.types?.join(",") || undefined,
                statuses: params.statuses?.join(",") || undefined,
                date_from: params.date_from || undefined,
                date_to: params.date_to || undefined,
                search: params.search || undefined,
                cursor: params.cursor || undefined,
                limit: params.limit || undefined,
            },
        },
    );

    const data = response.data;

    return {
        summary: {
            total_events: Number(data?.summary?.total_events ?? 0),
            chat_events: Number(data?.summary?.chat_events ?? 0),
            image_events: Number(data?.summary?.image_events ?? 0),
            api_events: Number(data?.summary?.api_events ?? 0),
            errors: Number(data?.summary?.errors ?? 0),
            running: Number(data?.summary?.running ?? 0),
        },
        events: Array.isArray(data?.events)
            ? data.events.map(
                (item: any): ConsoleActivityEvent => ({
                    id: String(item?.id ?? ""),
                    type: item?.type ?? "chat",
                    category: String(item?.category ?? ""),
                    title: String(item?.title ?? "Activity"),
                    subtitle: String(item?.subtitle ?? ""),
                    status: item?.status ?? "success",
                    icon: String(item?.icon ?? "activity"),
                    provider: item?.provider ?? null,
                    model: item?.model ?? null,
                    tokens: typeof item?.tokens === "number" ? item.tokens : null,
                    path: item?.path ?? null,
                    created_at: String(item?.created_at ?? new Date().toISOString()),
                }),
            )
            : [],
        next_cursor: data?.next_cursor ?? null,
        has_more: Boolean(data?.has_more),
    };
}