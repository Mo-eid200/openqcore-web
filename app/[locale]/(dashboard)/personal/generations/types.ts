// types.ts
export interface GenerationItem {
    id: string;
    title: string;
    prompt: string;
    result: string;
    model?: string;
    status: "success" | "pending" | "failed";
    createdAt: string;
    tags?: string[];
}