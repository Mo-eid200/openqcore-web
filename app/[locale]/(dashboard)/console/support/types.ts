export interface FaqItem {
    id: string;
    question: string;
    answer: string;
    tags?: string[];
}

export interface HelpSection {
    id: string;
    title: string;
    content: string;
}

export interface SupportTicket {
    id: string;
    subject: string;
    message: string;
    submittedAt: string;
    status: "open" | "pending" | "closed";
}