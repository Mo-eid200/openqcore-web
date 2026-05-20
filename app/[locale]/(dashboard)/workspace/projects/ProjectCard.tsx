import React from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";

export function ProjectCard({
    name,
    status,
    description,
    createdAt,
    onClick,
}: {
    name: string;
    status: "active" | "paused" | "archived";
    description?: string;
    createdAt?: string;
    onClick?: () => void;
}) {
    const statusColor =
        status === "active"
            ? "emerald"
            : status === "paused"
                ? "slate"
                : "danger";
    return (
        <div className="hover:shadow-lg cursor-pointer transition" onClick={onClick}>
            <Card>
                <CardHeader className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-lg text-white">{name}</span>
                    <Badge color={statusColor} className="ml-2 capitalize">
                        {status}
                    </Badge>
                </CardHeader>
                <CardContent>
                    <div className="text-slate-400 mb-2 text-sm min-h-[48px]">
                        {description || "No description."}
                    </div>
                    <div className="text-xs text-slate-500 mt-3">
                        {createdAt && `Created: ${createdAt}`}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}