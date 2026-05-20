// types.ts
export interface ImageItem {
    id: string;
    url: string;
    prompt: string;
    status: "ready" | "pending" | "failed";
    createdAt: string;
    size?: string;
    tags?: string[];
    source?: "chatqxt" | "agent" | "workflow";
}