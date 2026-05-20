import React from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";

const TEAM = [
    { name: "Mohamed Eid", email: "mo@oqc.ai", role: "Owner" },
    { name: "Tarek Samy", email: "tarek@oqc.ai", role: "Admin" },
    { name: "Nouran Kamel", email: "nouran@oqc.ai", role: "Member" },
];

export function TeamSettings() {
    return (
        <Card>
            <CardHeader>
                <span className="text-lg font-bold text-white">Team Members</span>
            </CardHeader>
            <CardContent>
                <table className="min-w-full mb-5">
                    <thead>
                        <tr>
                            <th className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase">Name</th>
                            <th className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase">Email</th>
                            <th className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase">Role</th>
                            <th className="px-3 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {TEAM.map((m) => (
                            <tr key={m.email} className="border-t border-white/10 hover:bg-white/[0.015]">
                                <td className="px-3 py-2 font-semibold text-white">{m.name}</td>
                                <td className="px-3 py-2 text-slate-300">{m.email}</td>
                                <td className="px-3 py-2">
                                    <Badge color={
                                        m.role === "Owner" ? "gold" :
                                            m.role === "Admin" ? "emerald" : "slate"
                                    }>{m.role}</Badge>
                                </td>
                                <td className="px-3 py-2 text-right">
                                    <Button variant="outline" className="text-xs px-3">Remove</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Button variant="primary">Invite Member</Button>
            </CardContent>
        </Card>
    );
}