import React from "react";
import { ActivityTimeline } from "./ActivityTimeline";
import { ActivityCard } from "./ActivityCard";
import { Activity } from "./types"; // 💡 استيراد الـ type الموحد

const DUMMY_ACTIVITIES: Activity[] = [
    {
        id: "1",
        type: "agent",
        title: "Agent Deployed",
        description: "Agent QCore deployed to EU-West.",
        time: "5m ago",
        status: "success",
    },
    {
        id: "2",
        type: "api",
        title: "API Key Used",
        description: "Key sk-123... called /generate",
        time: "12m ago",
        status: "info",
    },
    {
        id: "3",
        type: "system",
        title: "Outage",
        description: "Realtime inference server down.",
        time: "1h ago",
        status: "danger",
    },
];

export function ActivityFeed({ asTimeline = false }: { asTimeline?: boolean }) {
    return asTimeline ? (
        <ActivityTimeline activities={DUMMY_ACTIVITIES} />
    ) : (
        <div className="flex flex-col gap-6">
            {DUMMY_ACTIVITIES.map((act) => (
                <ActivityCard key={act.id} activity={act} />
            ))}
        </div>
    );
}