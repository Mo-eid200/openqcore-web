"use client";
import React, { useState } from "react";

export default function ChatInput({ onSend }: { onSend: (m: string) => void }) {
    const [val, setVal] = useState("");

    return (
        <form
            className="flex gap-2 items-center border-t border-amber-700/10 bg-[#1a1207] px-3 py-2 rounded-b-xl"
            onSubmit={e => {
                e.preventDefault();
                if (val.trim()) { onSend(val); setVal(""); }
            }}
        >
            <input
                type="text"
                value={val}
                onChange={e => setVal(e.target.value)}
                placeholder="Send a message…"
                className="flex-1 bg-transparent text-amber-100 placeholder:text-amber-400/45 px-2 py-2 text-sm outline-none"
                autoFocus
            />
            <button
                type="submit"
                className="rounded bg-amber-400 text-black px-4 h-8 font-semibold text-xs hover:bg-amber-300 transition shadow-sm"
            >
                Send
            </button>
        </form>
    );
}