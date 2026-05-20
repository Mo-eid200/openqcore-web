"use client";
import React, { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { ChatMessage, ChatThread } from "./types";

const DEMO_MSGS: ChatMessage[] = [
    {
        id: "2", author: "ai", text: "Hello! How can I help you in your workspace today?",
        timestamp: new Date(Date.now() - 35000).toISOString()
    },
];

export default function PersonalChatPage() {
    const [messages, setMessages] = useState<ChatMessage[]>(DEMO_MSGS);
    const [threads] = useState<ChatThread[]>([]);
    const [active, setActive] = useState<string | null>(null);

    function sendHandler(msg: string) {
        setMessages([...messages, {
            id: Math.random().toString(),
            author: "me",
            text: msg,
            timestamp: new Date().toISOString()
        }]);
        // يمكنك إضافة منطق AI هنا!
    }

    return (
        <div className="flex gap-0 rounded-xl border border-amber-500/10 bg-[#170f06] shadow-lg min-h-[80vh] max-w-5xl mx-auto mt-8">
            <ChatSidebar
                threads={threads}
                onSelect={id => setActive(id)}
                onNew={() => { }} // منطق إضافة محادثة جديدة لو أردت
            />
            <div className="flex-1 flex flex-col">
                <ChatHeader title={active ? threads.find(t => t.id === active)?.title : undefined} />
                <ChatMessages messages={messages} />
                <ChatInput onSend={sendHandler} />
            </div>
        </div>
    );
}