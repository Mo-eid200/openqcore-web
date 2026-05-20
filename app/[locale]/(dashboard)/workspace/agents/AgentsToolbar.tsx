import React from "react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export function AgentsToolbar({
    search,
    onSearch,
    onCreate,
}: {
    search: string;
    onSearch: (value: string) => void;
    onCreate: () => void;
}) {
    return (
        <div className="flex items-center justify-between gap-2 mb-5 flex-wrap">
            <Input
                placeholder="Search agents..."
                value={search}
                onChange={e => onSearch(e.target.value)}
                className="max-w-xs"
            />
            <Button onClick={onCreate} variant="primary">
                + New Agent
            </Button>
        </div>
    );
}