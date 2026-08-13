import {
    qxtApiClient,
} from "../core/qxtClient";

export interface ConsoleOverviewStats {
    tokens_total: number;
    qxt_remaining: number;
    requests_total: number;
    models_used: number;
    chat_sessions: number;
    image_generations: number;
    most_used_model: string | null;
}

export interface ConsoleOverviewUsagePoint {
    requests: number;
    tokens: number;
}

export interface ConsoleOverviewEvent {
    id: string;
    type: string;
    title: string;
    subtitle: string;
    date: string;
}

export interface ConsoleOverviewProject {
    id: string;
    title: string;
    updated_at: string | null;
}

export interface ConsoleOverviewUser {
    id: string;
    email: string;
    full_name: string | null;
}

export interface ConsoleOverviewData {
    user: ConsoleOverviewUser;

    stats: ConsoleOverviewStats;

    usage_points:
        ConsoleOverviewUsagePoint[];

    events:
        ConsoleOverviewEvent[];

    projects:
        ConsoleOverviewProject[];
}

export async function getConsoleOverview():
Promise<ConsoleOverviewData> {

    const response =
        await qxtApiClient.get(
            "/api/v1/console/overview"
        );

    return response.data;
}