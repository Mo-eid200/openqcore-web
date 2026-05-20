export interface VoiceItem {
    id: string;
    title: string;
    prompt?: string;
    url: string;
    duration?: string;
    status: "ready" | "pending" | "failed";
    createdAt: string;
    tags?: string[];
    source?: "chatqxt" | "agent" | "workflow";
    transcript?: string;
}