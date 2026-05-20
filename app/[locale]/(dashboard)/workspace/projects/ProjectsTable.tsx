import React from "react";
import { Badge } from "../../components/ui/Badge";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

type Project = {
    id: string;
    name: string;
    status: "active" | "paused" | "archived";
    createdAt?: string;
};

export function ProjectsTable({
    data,
    onOpen,
    onEdit,
    onDelete,
}: {
    data: Project[];
    onOpen?: (id: string) => void;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}) {
    return (
        <Card>
            <CardContent className="p-0">
                <table className="min-w-full divide-y divide-white/10">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Name</th>
                            <th className="px-6 py-3 text-xs text-slate-400 uppercase">Status</th>
                            <th className="px-6 py-3 text-xs text-slate-400 uppercase">Created</th>
                            <th className="px-6 py-3" />
                        </tr>
                    </thead>
                    <tbody className="bg-transparent divide-y divide-white/10">
                        {data.map((p) => (
                            <tr key={p.id} className="hover:bg-white/[0.03] transition">
                                <td className="px-6 py-3 font-semibold text-white">{p.name}</td>
                                <td className="px-6 py-3">
                                    <Badge color={p.status === "active" ? "emerald" : p.status === "paused" ? "slate" : "danger"}>
                                        {p.status}
                                    </Badge>
                                </td>
                                <td className="px-6 py-3 text-sm text-slate-400">{p.createdAt}</td>
                                <td className="px-6 py-3 text-right space-x-2">
                                    <Button variant="secondary" className="px-3 text-xs" onClick={() => onOpen?.(p.id)}>
                                        Open
                                    </Button>
                                    <Button variant="outline" className="px-3 text-xs" onClick={() => onEdit?.(p.id)}>Edit</Button>
                                    <Button variant="outline" className="px-3 text-xs" onClick={() => onDelete?.(p.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
}