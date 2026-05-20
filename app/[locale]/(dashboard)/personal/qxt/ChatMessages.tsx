"use client";
import React, { useRef, useEffect } from "react";
import type { ChatMessage } from "./types";
import { User2, Sparkles } from "lucide-react";

// إمثلية: ألوان مميزة منسجمة مع ستايل amber
function messageBackground(author: ChatMessage["author"]) {
    switch (author) {
        case "ai": return "bg-amber-400/5 border-amber-500/10";
        case "me": return "bg-white/5 border-amber-300/10";
        case "system": return "bg-black/40 border-amber-300/5";
        default: return "bg-neutral-800/80";
    }
}
function messageIcon(author: ChatMessage["author"]) {
    if (author === "ai") return <Sparkles className="w-4 h-4 text-amber-400" />;
    if (author === "me") return <User2 className="w-4 h-4 text-white/80" />;
    return null;
}

export default function ChatMessages({ messages }: { messages: ChatMessage[] }) {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
    }, [messages]);

    return (
        <div ref={ref} className="flex-1 overflow-y-auto px-6 py-5 space-y-2">
            {messages.length === 0 && (
                <div className="text-center text-amber-100/70 text-xs italic py-8">
                    No messages yet. Start the conversation!
                </div>
            )}
            {messages.map(msg => (
                <div
                    key={msg.id}
                    className={`
            flex items-start gap-3 rounded-lg border ${messageBackground(msg.author)}
            px-4 py-2 max-w-2xl
            ${msg.author === "me" ? "ml-auto" : ""}
            shadow-sm
          `}
                >
                    <span className="mt-1">{messageIcon(msg.author)}</span>
                    <div className="flex-1 min-w-0">
                        <div className={`text-[13px] ${msg.author === "me" ? "text-amber-100" : "text-white"}`}>
                            {msg.text}
                        </div>
                        <div className="mt-0.5 text-[10px] text-amber-100/40">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                            {msg.error && <span className="ml-2 text-red-500 font-bold">• error</span>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}