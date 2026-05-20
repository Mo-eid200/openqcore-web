"use client";
import React from "react";
import type { ChatThread } from "./types";
import { Sparkles } from "lucide-react";

const DEMO_THREADS: ChatThread[] = [
    {
        id: "1",
        title: "Code review with GPT-4 Turbo",
        lastMessage: "See the suggestions above...",
        updatedAt: new Date(Date.now() - 60 * 45000).toISOString(),
        unread: true,
    },
    {
        id: "2",
        title: "Draft product pitch",
        lastMessage: "Sure! Here is a list of...",
        updatedAt: new Date(Date.now() - 60 * 190000).toISOString(),
    },
];

export default function ChatSidebar({
    threads = DEMO_THREADS,
    onSelect,
    onNew,
}: {
    threads?: ChatThread[];
    onSelect?: (id: string) => void;
    onNew?: () => void;
}) {
    return (
        <aside className="w-full max-w-[270px] bg-[#151009]/85 border-r border-amber-700/10 rounded-l-xl flex flex-col shadow">
            <div className="flex items-center justify-between px-4 py-3 border-b border-amber-600/10">
                <span className="text-white font-bold tracking-tight text-lg flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Chats
                </span>
                <button
                    title="New chat"
                    className="h-7 px-3 bg-amber-400 text-black rounded font-semibold text-xs hover:bg-amber-300 transition"
                    onClick={onNew}
                >+ New</button>
            </div>
            <nav className="flex-1 overflow-y-auto min-h-[200px]">
                {threads.map(th => (
                    <button
                        key={th.id}
                        onClick={() => onSelect?.(th.id)}
                        className={`group w-full text-left px-4 py-3 flex flex-col border-b border-amber-300/5 focus:outline-none
              ${th.unread ? 'bg-amber-400/10' : 'hover:bg-amber-500/5'}
              transition`}
                    >
                        <span className="font-medium text-amber-100 truncate">{th.title}</span>
                        {th.lastMessage && <span className="text-xs text-amber-100/60 truncate mt-1">{th.lastMessage}</span>}
                        <span className="text-[10px] text-amber-100/35 mt-1">{new Date(th.updatedAt).toLocaleString()}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
}