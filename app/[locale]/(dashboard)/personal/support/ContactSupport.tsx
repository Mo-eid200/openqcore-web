import React, { useState } from "react";
import { Send } from "lucide-react";

export default function ContactSupport({
    onSubmit
}: {
    onSubmit: (subject: string, message: string) => Promise<void>;
}) {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        await onSubmit(subject, message);
        setSubmitting(false);
        setSuccess(true);
        setSubject("");
        setMessage("");
        setTimeout(() => setSuccess(false), 3000);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-amber-400/20 bg-[#191106]/75 p-5 shadow flex flex-col gap-5 max-w-lg mx-auto"
        >
            <div className="font-bold text-amber-200 mb-2">Contact Support</div>
            <label className="flex flex-col gap-2 text-amber-100/90 text-sm">
                Subject
                <input
                    className="rounded bg-[#191106] px-3 py-2 text-white border border-amber-400/20 outline-none"
                    value={subject}
                    required
                    onChange={e => setSubject(e.target.value)}
                />
            </label>
            <label className="flex flex-col gap-2 text-amber-100/90 text-sm">
                Message
                <textarea
                    className="rounded bg-[#191106] px-3 py-2 text-white border border-amber-400/20 outline-none min-h-[90px]"
                    value={message}
                    required
                    onChange={e => setMessage(e.target.value)}
                />
            </label>
            <button
                type="submit"
                disabled={submitting}
                className={`flex items-center gap-2 rounded-lg px-5 py-2 bg-amber-400 text-black font-bold hover:bg-amber-300 shadow transition ${submitting ? "opacity-50" : ""}`}
            >
                <Send className="w-4 h-4" />
                Send
            </button>
            {success && (
                <div className="bg-emerald-500/70 text-white rounded px-3 py-2 mt-1 text-xs font-semibold text-center">
                    Your request has been submitted. We'll get back to you soon!
                </div>
            )}
        </form>
    );
}