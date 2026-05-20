import React from "react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export function KnowledgeToolbar({
    search,
    onSearch,
    onUpload
}: {
    search: string;
    onSearch: (v: string) => void;
    onUpload: () => void;
}) {
    return (
        <div className="flex items-center justify-between gap-2 mb-5 flex-wrap">
            <Input
                placeholder="Search knowledge..."
                value={search}
                onChange={e => onSearch(e.target.value)}
                className="max-w-xs"
            />
            <Button onClick={onUpload} variant="primary">
                + Upload Knowledge
            </Button>
        </div>
    );
}