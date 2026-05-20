export type ApiKey = {
    id: string;
    key: string;
    label: string;
    createdAt: string;
    status: "active" | "revoked";
}

export type Endpoint = {
    method: "POST" | "GET" | "PUT" | "DELETE";
    path: string;
    description: string;
    status?: "stable" | "beta" | "deprecated";
}