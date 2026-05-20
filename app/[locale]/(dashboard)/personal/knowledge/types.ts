// types.ts
export interface KnowledgeItem {
    id: string;
    title: string;
    description: string;
    type: "pdf" | "doc" | "url" | "snippet" | "faq";
    status: "processed" | "pending" | "failed";
    uploadedAt: string;
    url?: string;
    size?: string;
    tags?: string[];
}