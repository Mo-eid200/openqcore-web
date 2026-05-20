// types.ts

import type { LucideIcon } from "lucide-react";

export interface ActivityItem {
    id: string | number;
    title: string;
    subtitle?: string;
    icon?: LucideIcon;
    colorClass?: string;
    timestamp: string; // ISO string
    status?: "done" | "pending" | "error";
    extra?: string;
}