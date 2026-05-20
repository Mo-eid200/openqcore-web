import React from "react";
import type { HelpSection } from "./types";
import { Info } from "lucide-react";

export default function HelpCenter({ sections }: { sections: HelpSection[] }) {
    if (!sections?.length)
        return <div className="py-10 text-xs text-amber-100/60 text-center">No help articles yet.</div>;
    return (
        <div className="flex flex-col gap-6 mb-8">
            {sections.map(s => (
                <div key={s.id} className="rounded-xl border border-amber-400/20 bg-[#191106]/75 p-5 shadow">
                    <div className="flex items-center gap-2 mb-2 text-amber-300">
                        <Info className="w-4 h-4" />
                        <span className="font-bold text-lg">{s.title}</span>
                    </div>
                    <div className="text-amber-100/80 leading-relaxed text-sm">{s.content}</div>
                </div>
            ))}
        </div>
    );
}