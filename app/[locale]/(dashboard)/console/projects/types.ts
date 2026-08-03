// types.ts

export interface ChatMessage {
    id: string;
    author: "me" | "ai" | "system";
    text: string;
    timestamp: string;
    error?: boolean;
}

export interface ChatThread {
    id: string;
    title: string;
    lastMessage?: string;
    updatedAt: string;
    unread?: boolean;
}