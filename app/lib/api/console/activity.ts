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
// RESPONSE
// =========================================================

export interface ConsoleActivityResponse {

    summary: ConsoleActivitySummary;

    events: ConsoleActivityEvent[];
}


// =========================================================
// API
// =========================================================

export async function getConsoleActivity():
Promise<ConsoleActivityResponse> {

    try {

        const response =
            await qxtApiClient.get(
                "/api/v1/console/activity"
            );

        const data =
            response.data;

        return {
            summary: {
                total_events: Number(
                    data?.summary?.total_events ?? 0
                ),

                chat_events: Number(
                    data?.summary?.chat_events ?? 0
                ),

                image_events: Number(
                    data?.summary?.image_events ?? 0
                ),

                api_events: Number(
                    data?.summary?.api_events ?? 0
                ),

                errors: Number(
                    data?.summary?.errors ?? 0
                ),

                running: Number(
                    data?.summary?.running ?? 0
                ),
            },

            events: Array.isArray(
                data?.events
            )
                ? data.events.map(
                    (
                        item: any
                    ): ConsoleActivityEvent => ({
                        id: String(
                            item?.id ?? ""
                        ),

                        type:
                            item?.type ??
                            "chat",

                        category: String(
                            item?.category ?? ""
                        ),

                        title: String(
                            item?.title ??
                            "Activity"
                        ),

                        subtitle: String(
                            item?.subtitle ??
                            ""
                        ),

                        status:
                            item?.status ??
                            "success",

                        icon: String(
                            item?.icon ??
                            "activity"
                        ),

                        provider:
                            item?.provider
                            ?? null,

                        model:
                            item?.model
                            ?? null,

                        tokens:
                            typeof item?.tokens
                            === "number"
                                ? item.tokens
                                : null,

                        path:
                            item?.path
                            ?? null,

                        created_at: String(
                            item?.created_at
                            ?? new Date()
                                .toISOString()
                        ),
                    })
                )
                : [],
        };

    } catch (error) {

        console.error(
            "[ConsoleActivity] Failed to load",
            error,
        );

        return {

            summary: {

                total_events: 0,

                chat_events: 0,

                image_events: 0,

                api_events: 0,

                errors: 0,

                running: 0,
            },

            events: [],
        };
    }
}