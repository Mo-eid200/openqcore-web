"use client";
import React from "react";
import { Sparkles, User2 } from "lucide-react";

export default function ChatHeader({ title }: { title?: string }) {
    return (
        <header className="flex items-center justify-between border-b border-amber-500/15 bg-[#191108] px-4 py-2 rounded-t-xl">
            <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-base font-semibold text-white">{title || 'New Chat'}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="bg-amber-400/15 px-2 py-1 text-xs rounded font-semibold text-amber-200">Personal Space</span>
                <User2 className="w-5 h-5 text-white/60" />
            </div>
        </header>
    );
}