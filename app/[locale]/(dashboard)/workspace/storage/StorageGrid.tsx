import React from "react";
import { StorageFileCard } from "./StorageFileCard";

export function StorageGrid({ files, onMenu }: {
    files: Parameters<typeof StorageFileCard>[0]["file"][],
    onMenu?: (f: any) => void
}) {
    if (!files.length)
        return <div className="py-24 text-center text-slate-400 text-lg">No files found.</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {files.map((file) =>
                <StorageFileCard key={file.id} file={file} onMenu={() => onMenu?.(file)} />
            )}
        </div>
    );
}