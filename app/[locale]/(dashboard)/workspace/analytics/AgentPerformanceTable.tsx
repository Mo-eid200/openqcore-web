import React from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";

const DUMMY = [
    { name: "Summarizer-AI", requests: 27329, success: "98%", latency: "326ms", status: "healthy" },
    { name: "RealtimeBot", requests: 11002, success: "96%", latency: "218ms", status: "healthy" },
    { name: "InputCleaner", requests: 3812, success: "90%", latency: "729ms", status: "slowed" },
    { name: "Conversation-Assist", requests: 8232, success: "88%", latency: "1400ms", status: "unstable" },
];

export function AgentPerformanceTable() {
    return (
        <Card>
            <CardHeader>
                <span className="text-lg font-bold text-white">Agent Performance</span>
            </CardHeader>
            <CardContent className="px-0 pb-4">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase">Agent Name</th>
                            <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase">Requests</th>
                            <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase">Success</th>
                            <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase">Latency</th>
                            <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DUMMY.map((a) => (
                            <tr key={a.name} className="border-t border-white/10 hover:bg-white/[0.015]">
                                <td className="px-5 py-3 font-semibold text-white">{a.name}</td>
                                <td className="px-5 py-3 text-slate-300">{a.requests.toLocaleString()}</td>
                                <td className="px-5 py-3 text-emerald-400">{a.success}</td>
                                <td className="px-5 py-3 text-slate-300">{a.latency}</td>
                                <td className="px-5 py-3">
                                    <Badge
                                        color={
                                            a.status === "healthy"
                                                ? "emerald"
                                                : a.status === "slowed"
                                                    ? "cyan"
                                                    : "danger"
                                        }
                                    >
                                        {a.status}
                                    </Badge>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
}