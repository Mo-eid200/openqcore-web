import React, { useState } from "react";
import type { FaqItem } from "./types";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQ({ items }: { items: FaqItem[] }) {
    const [open, setOpen] = useState<string | null>(null);
    if (!items?.length)
        return <div className="py-10 text-xs text-amber-100/60 text-center">No FAQs found.</div>;
    return (
        <div className="flex flex-col gap-4 mb-8">
            {items.map(faq => (
                <div
                    key={faq.id}
                    className="rounded-xl border border-amber-300/10 bg-[#191106]/70 px-5 py-3 shadow transition"
                >
                    <button
                        className="w-full flex items-center justify-between text-left font-bold text-amber-100/90 text-base"
                        onClick={() => setOpen(o => o === faq.id ? null : faq.id)}
                    >
                        <span>{faq.question}</span>
                        {open === faq.id ? (
                            <ChevronUp className="w-5 h-5 text-amber-400" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-amber-400" />
                        )}
                    </button>
                    {open === faq.id && (
                        <div className="mt-3 text-amber-100/80 leading-relaxed text-sm">{faq.answer}</div>
                    )}
                </div>
            ))}
        </div>
    );
}