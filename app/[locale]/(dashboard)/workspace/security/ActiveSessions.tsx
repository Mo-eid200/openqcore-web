import React from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";

const SESSIONS = [
    { id: "1", device: "Windows Chrome", location: "Cairo, EG", ip: "197.34.178.21", activity: "now", status: "active" },
    { id: "2", device: "iPhone Mobile", location: "Doha, QA", ip: "82.49.35.18", activity: "8 min ago", status: "active" },
    { id: "3", device: "MacBook Pro", location: "Berlin, DE", ip: "176.3.224.67", activity: "1h ago", status: "signedout" }
];

export function ActiveSessions() {
    return (
        <Card>
            <CardHeader>
                <span className="text-lg font-bold text-white">Active Sessions</span>
            </CardHeader>
            <CardContent className="px-0 pb-4">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 text-xs text-slate-400 uppercase font-semibold">Device</th>
                            <th className="px-5 py-3 text-xs text-slate-400 uppercase font-semibold">Location</th>
                            <th className="px-5 py-3 text-xs text-slate-400 uppercase font-semibold">IP</th>
                            <th className="px-5 py-3 text-xs text-slate-400 uppercase font-semibold">Activity</th>
                            <th className="px-5 py-3 text-xs text-slate-400 uppercase font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {SESSIONS.map(s => (
                            <tr key={s.id} className="border-t border-white/10 hover:bg-white/[0.015]">
                                <td className="px-5 py-2 text-white">{s.device}</td>
                                <td className="px-5 py-2 text-slate-300">{s.location}</td>
                                <td className="px-5 py-2 font-mono text-xs text-slate-400">{s.ip}</td>
                                <td className="px-5 py-2 text-xs text-slate-400">{s.activity}</td>
                                <td className="px-5 py-2">
                                    <Badge color={s.status === "active" ? "emerald" : "slate"}>
                                        {s.status}
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