// types.ts
import type { LucideIcon } from "lucide-react";

export interface Agent {
    id: string;
    name: string;
    role: string;
    description: string;
    icon: LucideIcon;
    status: "online" | "offline" | "error" | "pending";
    tags?: string[];
    createdAt: string;
}