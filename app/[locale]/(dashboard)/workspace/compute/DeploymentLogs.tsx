import React from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";

const DUMMY_LOGS = [
    {
        id: 1,
        level: "info",
        message: "Cluster scaled to 8 nodes.",
        time: "2 min ago",
    },
    {
        id: 2,
        level: "success",
        message: "Deployment 'nlp-inference-prod-13' succeeded.",
        time: "10 min ago",
    },
    {
        id: 3,
        level: "danger",
        message: "Node 'gpu-17' reported error: CUDA out of memory.",
        time: "1 hr ago",
    },
];

export function DeploymentLogs() {
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <span className="text-lg font-bold text-white">Deployment Logs</span>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-5">
                    {DUMMY_LOGS.map((log) => (
                        <div key={log.id} className="flex items-center gap-3">
                            <Badge
                                color={
                                    log.level === "info"
                                        ? "cyan"
                                        : log.level === "success"
                                            ? "emerald"
                                            : "danger"
                                }
                                className="capitalize"
                            >
                                {log.level}
                            </Badge>
                            <span className="text-white text-sm flex-1">{log.message}</span>
                            <span className="text-xs text-slate-500">{log.time}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}