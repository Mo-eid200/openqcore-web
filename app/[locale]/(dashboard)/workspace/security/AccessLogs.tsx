import React from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";

const LOGS = [
    { id: "l1", actor: "Mohamed Eid", action: "Logged in", ip: "197.34.178.21", time: "now" },
    { id: "l2", actor: "Tarek Samy", action: "API Key created", ip: "176.3.224.67", time: "19m ago" },
    { id: "l3", actor: "Nouran Kamel", action: "2FA Enabled", ip: "82.49.35.18", time: "2h ago" }
];

export function AccessLogs() {
    return (
        <Card>
            <CardHeader>
                <span className="text-lg font-bold text-white">Access Logs</span>
            </CardHeader>
            <CardContent className="px-0 pb-4">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase">User</th>
                            <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase">Action</th>
                            <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase">IP</th>
                            <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {LOGS.map(log => (
                            <tr key={log.id} className="border-t border-white/10 hover:bg-white/[0.01]">
                                <td className="px-5 py-2 text-white">{log.actor}</td>
                                <td className="px-5 py-2 text-slate-300">{log.action}</td>
                                <td className="px-5 py-2 font-mono text-xs text-slate-400">{log.ip}</td>
                                <td className="px-5 py-2 text-xs text-slate-400">{log.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
}