import React from "react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export function ProjectsToolbar({
    onCreate,
    searchValue,
    onSearch,
}: {
    onCreate: () => void;
    searchValue: string;
    onSearch: (value: string) => void;
}) {
    return (
        <div className="flex flex-wrap gap-3 items-center justify-between mb-6">
            <Input
                placeholder="Search projects..."
                value={searchValue}
                onChange={(e) => onSearch(e.target.value)}
                className="max-w-xs"
            />
            <Button onClick={onCreate} variant="primary">
                + New Project
            </Button>
        </div>
    );
}