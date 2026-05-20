"use client";
import React from "react";
import { Search, SlidersHorizontal, MessageCircle } from "lucide-react";

export default function ImageToolbar({
    onSearch,
    onFilter,
    onOpenChat,
}: {
    onSearch?: (q: string) => void;
    onFilter?: () => void;
    onOpenChat?: () => void;
}) {
    const [val, setVal] = React.useState("");
    return (
        <div className="flex flex-wrap gap-2 items-center justify-between pb-4">
            {/* Left: Search & Filters */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="relative flex-1 min-w-[180px]">
                    <Search className="absolute left-2 top-2.5 w-4 h-4 text-amber-400/60" />
                    <input
                        type="text"
                        className="w-full bg-[#181106]/80 border border-amber-500/10 rounded-lg px-8 py-2 text-sm text-white placeholder:text-amber-100/50 outline-none"
                        placeholder="Search generated images..."
                        value={val}
                        onChange={e => {
                            setVal(e.target.value);
                            onSearch?.(e.target.value);
                        }}
                    />
                </div>
                <button
                    onClick={onFilter}
                    className="h-8 px-3 rounded-lg border border-amber-400/20 bg-[#130e06]/60 flex items-center gap-1 text-xs text-amber-100 hover:bg-amber-300/10 transition"
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                </button>
            </div>
            {/* Right: Chat */}
            <button
                className="h-8 px-4 rounded-full bg-amber-400 text-black font-bold text-xs flex items-center gap-2 shadow-sm hover:bg-amber-300 transition"
                onClick={onOpenChat}
            >
                <MessageCircle className="w-4 h-4" />
                Open ChatQXT
            </button>
        </div>
    );
}