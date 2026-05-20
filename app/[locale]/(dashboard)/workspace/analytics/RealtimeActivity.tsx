import React from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
const ACTIVITY = [
    { type: "api", time: "just now", info: "User X called /v1/generate" },
    { type: "agent", time: "10s ago", info: "Agent Summarizer-AI responded" },
    { type: "usage", time: "1 min ago", info: "New usage spike detected" },
    { type: "api", time: "3 min ago", info: "API Key used: sk-live-34..." },
];

export function RealtimeActivity() {
    return (
        <Card>
            <CardHeader>
                <span className="text-lg font-bold text-white">Realtime Activity</span>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    {ACTIVITY.map((a, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <Badge
                                color={
                                    a.type === "api"
                                        ? "cyan"
                                        : a.type === "agent"
                                            ? "emerald"
                                            : "gold"
                                }
                            >
                                {a.type}
                            </Badge>
                            <span className="text-xs text-slate-500">{a.time}</span>
                            <span className="text-white text-sm flex-1">{a.info}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}