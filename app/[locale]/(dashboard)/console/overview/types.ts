// types.ts

import type {
    LucideIcon,
} from "lucide-react";

export interface StatMetric {
    label: string;

    value: string | number;

    icon: LucideIcon;

    glow: string;

    iconClass: string;
}

export interface EventItem {
    id: string | number;

    title: string;

    subtitle?: string;

    date: string;

    type?: string;

    icon?: LucideIcon;
}

