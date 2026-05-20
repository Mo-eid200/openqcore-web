import React from "react";
import { Card } from "../../components/ui/Card";

export function SecurityOverview() {
    const stats = [
        { label: "Active Sessions", value: "6" },
        { label: "Blocked Requests", value: "3" },
        { label: "Anomalies Today", value: "2" },
        { label: "Last Threat", value: "17 min ago" }
    ];
    return (
        <Card className="mb-7 px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                    <span className="text-xs text-slate-400">{s.label}</span>
                    <span className="text-xl text-white font-bold">{s.value}</span>
                </div>
            ))}
        </Card>
    );
}