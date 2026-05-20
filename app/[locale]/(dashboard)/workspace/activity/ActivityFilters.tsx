import React from "react";
import { Button } from "../../components/ui/Button";

const FILTERS = [
    { label: "All", value: "all" },
    { label: "Agents", value: "agent" },
    { label: "API", value: "api" },
    { label: "System", value: "system" },
    { label: "Errors", value: "danger" }
];

export function ActivityFilters({
    filter,
    onFilter,
}: {
    filter: string;
    onFilter: (f: string) => void;
}) {
    return (
        <div className="flex gap-2 mb-6 flex-wrap">
            {FILTERS.map(f => (
                <Button
                    key={f.value}
                    variant={filter === f.value ? "primary" : "secondary"}
                    className="text-xs px-4 py-2"
                    onClick={() => onFilter(f.value)}
                >
                    {f.label}
                </Button>
            ))}
        </div>
    );
}