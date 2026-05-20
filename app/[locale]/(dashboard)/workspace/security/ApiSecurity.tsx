import React from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";

const POLICIES = [
    { feature: "Key Rotation", value: "Enabled", status: "emerald" },
    { feature: "IP Whitelist", value: "2 IPs", status: "cyan" },
    { feature: "API Rate Limit", value: "60 req/min", status: "gold" },
    { feature: "Blocked Tokens", value: "1", status: "danger" }
];

export function ApiSecurity() {
    return (
        <Card>
            <CardHeader>
                <span className="text-lg font-bold text-white">API Security</span>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    {POLICIES.map(p => (
                        <div key={p.feature} className="flex items-center gap-3">
                            <span className="w-36 text-slate-400 text-xs">{p.feature}</span>
                            <Badge color={p.status as any}>{p.value}</Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}