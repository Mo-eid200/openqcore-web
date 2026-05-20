import React from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { ShieldAlert } from "lucide-react";

const ALERTS = [
    { id: "t1", level: "high", message: "Suspicious access blocked.", time: "12 min ago" },
    { id: "t2", level: "medium", message: "API rate limit nearly reached.", time: "3h ago" }
];

export function ThreatAlerts() {
    return (
        <Card>
            <CardHeader>
                <span className="inline-flex gap-2 items-center">
                    <ShieldAlert className="w-6 h-6 text-red-400" />
                    <span className="text-lg font-bold text-white">Threat Alerts</span>
                </span>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-5">
                    {ALERTS.map(a => (
                        <div key={a.id} className="flex items-center gap-3">
                            <Badge color={a.level === "high" ? "danger" : "gold"}>
                                {a.level}
                            </Badge>
                            <span className="text-white text-sm flex-1">{a.message}</span>
                            <span className="text-xs text-slate-400">{a.time}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}