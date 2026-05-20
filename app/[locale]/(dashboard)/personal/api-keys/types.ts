// types.ts
export interface ApiKey {
    id: string;
    label: string;
    key: string;
    createdAt: string;
    status: "active" | "disabled";
    lastUsedAt?: string;
    usageCount?: number;
}

export interface ApiUsageStat {
    date: string; // YYYY-MM-DD
    count: number;
}