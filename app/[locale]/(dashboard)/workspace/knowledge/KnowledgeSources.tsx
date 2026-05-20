import React from "react";
import { Button } from "../../components/ui/Button";
import { Sparkles } from "lucide-react";

export function KnowledgeSources({ onUpload }: { onUpload?: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
            <Sparkles className="w-10 h-10 text-[#d4af37]/80 mb-5" />
            <h2 className="text-xl font-bold text-white mb-2">No Knowledge Sources Yet</h2>
            <div className="mb-3 text-slate-400">Start by uploading documents or connecting a data source.</div>
            {onUpload && (
                <Button variant="primary" onClick={onUpload}>
                    + Upload Knowledge
                </Button>
            )}
        </div>
    );
}