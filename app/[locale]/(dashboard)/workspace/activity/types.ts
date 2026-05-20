// components/activity/types.ts
export type Activity = {
    id: string;
    type: "agent" | "api" | "system";
    title: string;
    description: string;
    time: string;
    status: "success" | "info" | "danger";
};