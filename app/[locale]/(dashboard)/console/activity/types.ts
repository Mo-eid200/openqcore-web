// types.ts

import type {
    LucideIcon,
} from "lucide-react";

export type ActivityStatus =
    | "success"
    | "running"
    | "error";

export type ActivityType =
    | "chat"
    | "image_generation"
    | "api_request"
    | "billing"
    | "agent"
    | "project";

export interface ActivityItem {

    // =====================================================
    // CORE
    // =====================================================

    id: string;

    type: ActivityType;

    title: string;

    subtitle?: string;

    // =====================================================
    // UI
    // =====================================================

    icon?: LucideIcon;

    colorClass?: string;

    // =====================================================
    // META
    // =====================================================

    timestamp: string;

    status?: ActivityStatus;

    category?: string;

    provider?: string | null;

    model?: string | null;

    tokens?: number | null;

    path?: string | null;

    extra?: string;
}