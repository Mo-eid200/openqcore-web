"use client";
import React from "react";
import HelpCenter from "./HelpCenter";
import FAQ from "./FAQ";
import ContactSupport from "./ContactSupport";
import type { HelpSection, FaqItem } from "./types";

// help articles وهمية
const ARTICLES: HelpSection[] = [
    { id: "getting-started", title: "Getting Started", content: "Start by creating your account, then explore all tools in the main sidebar..." },
    { id: "ai-tools", title: "How to use AI Agents", content: "Click Agents in the sidebar and follow the setup flow for your workspace." }
];

// faqs وهمية
const FAQS: FaqItem[] = [
    { id: "f1", question: "How do I reset my password?", answer: "Go to Settings > Security, then click Change Password and follow the instructions." },
    { id: "f2", question: "Where can I find invoices?", answer: "All your invoices are available in the Billing section." }
];

export default function SupportPage() {
    async function handleSupport(subject: string, message: string) {
        // هنا اللوجيك للباك اند (API)
        await new Promise(r => setTimeout(r, 600)); // demo
    }
    return (
        <div className="w-full max-w-3xl mx-auto min-h-screen px-2 sm:px-8 py-10 flex flex-col gap-8">
            <div>
                <h1 className="text-2xl font-bold text-white mb-2">Help & Support</h1>
                <p className="text-xs text-amber-100/70">
                    Find answers, explore articles, or ask for our help at any time.<br />
                    Your knowledge vault & support center.
                </p>
            </div>
            <HelpCenter sections={ARTICLES} />
            <FAQ items={FAQS} />
            <ContactSupport onSubmit={handleSupport} />
        </div>
    );
}