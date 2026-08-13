"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Sparkles } from "lucide-react";

import DemoChatFooter from "../../../(marketing)/components/home/DemoChatFooter";
import WorkspaceModal from "../../components/AuthModal";
import { useApp } from "../../../../context/AppContext";
import MarkdownText from "./MarkdownText";
import {
  createSession,
  streamChatMessage,
} from "../../../../lib/api/chat/sessions";

/* ─────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────── */

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  variant?: "normal" | "limit" | "error";
};

/* ─────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────── */
const wrap = "mx-auto w-full max-w-[880px] px-5 sm:px-6";
const DEMO_MODEL = "pulse.core.flow";

// 🔧 NEW: suggested prompts -- reduces "blank page" hesitation and
// gives visitors an instant, concrete sense of what the product can
// do, rather than staring at an empty textbox.
const SUGGESTED_PROMPTS = [
  "Draft a go-to-market plan for a SaaS product",
  "Explain a complex topic like I'm new to it",
  "Write production-ready Python code",
  "Summarize a business idea in one paragraph",
  "Give me 5 creative marketing angles",
  "Debug this error message for me",
];

/* ─────────────────────────────────────────────────────────
   Quark mark
───────────────────────────────────────────────────────── */

function QuarkMark() {
  return (
    <div
      className="
        mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center
        rounded-full border border-white/[0.08]
        bg-gradient-to-b from-white/[0.08] to-white/[0.03]
        text-[10px] font-semibold tracking-[-0.02em] text-white/80
        shadow-[0_6px_20px_rgba(0,0,0,0.22)]
      "
    >
      Q
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Typing indicator
───────────────────────────────────────────────────────── */

function TypingIndicator() {
  return (
    <div className="flex h-7 items-center gap-1.5">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/35" />
      <span
        className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/35"
        style={{ animationDelay: "140ms" }}
      />
      <span
        className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/35"
        style={{ animationDelay: "280ms" }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Message — memoized: without this, EVERY prior message in the
   conversation re-renders on every single streaming flush, not just
   the one actually changing. Compounds with conversation length.
───────────────────────────────────────────────────────── */

const MessageBubble = React.memo(function MessageBubble({
  message,
  t,
}: {
  message: ChatMessage;
  t: ReturnType<typeof useTranslations>;
}) {
  const isUser = message.role === "user";
  const isLimit = message.variant === "limit";
  const isError = message.variant === "error";

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-end"
      >
        <div
          className="
            max-w-[82%] rounded-[20px] rounded-br-[7px]
            border border-white/[0.10]
            bg-white/[0.06]
            px-4 py-2.5
            text-[14px] leading-6 text-slate-100
            shadow-[0_8px_28px_rgba(0,0,0,0.14)]
            backdrop-blur-sm
            sm:max-w-[72%]
          "
        >
          {message.content}
        </div>
      </motion.div>
    );
  }

  if (isLimit) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex items-start gap-3"
      >
        <QuarkMark />

        <div
          className="
            max-w-[85%] rounded-2xl
            border border-[#d4af37]/20
            bg-[#d4af37]/[0.055]
            px-4 py-3
          "
        >
          <div className="mb-1 text-[11px] font-semibold tracking-wide text-[#d4af37]/80">
            {t("limit_label")}
          </div>

          <p className="text-[13.5px] leading-6 text-slate-300">
            {message.content}
          </p>

          <Link
            href="https://qxt.openqcore.com"
            className="
              mt-2.5 inline-flex text-[12px] font-medium
              text-[#d4af37] transition-colors
              hover:text-[#e6c75a]
            "
          >
            {t("continue_in_qxt")}
          </Link>
        </div>
      </motion.div>
    );
  }

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex items-start gap-3"
      >
        <QuarkMark />

        <div
          className="
            max-w-[85%] rounded-2xl
            border border-red-400/[0.12]
            bg-red-400/[0.04]
            px-4 py-3
            text-[13.5px] leading-6 text-slate-300
          "
        >
          {message.content}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-start gap-3"
    >
      <QuarkMark />

      <div className="min-w-0 max-w-[86%] pt-0.5">
        <div className="mb-1 text-[11px] font-medium text-white/35">
          {t("assistant_name")}
        </div>

        <div className="text-[14px] leading-7 text-slate-200">
          {message.content ? <MarkdownText content={message.content} /> : <TypingIndicator />}
        </div>
      </div>
    </motion.div>
  );
});

/* ─────────────────────────────────────────────────────────
   Live AI
───────────────────────────────────────────────────────── */

export default function LiveAISection() {
  const t = useTranslations("live_ai_section");

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const { user } = useApp();

  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  };

  const handleInputFocus = () => {
    chatRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const replaceLastAssistant = (
    content: string,
    variant: ChatMessage["variant"] = "normal"
  ) => {
    setMessages((prev) => {
      const copy = [...prev];

      if (copy.length > 0 && copy[copy.length - 1].role === "assistant") {
        copy[copy.length - 1] = { role: "assistant", content, variant };
        return copy;
      }

      return [...copy, { role: "assistant", content, variant }];
    });
  };

  const handleSend = async (rawText?: string): Promise<void> => {
    const text = (rawText ?? input).trim();

    if (!text || loading) return;

    if (!user) {
      setAuthOpen(true);
      return;
    }

    setLoading(true);

    // 🔧 Optimistic UI: the user's own message (and a placeholder
    // for the reply) appear IMMEDIATELY -- session creation (for a
    // first-time visitor) now happens in the background afterward,
    // instead of blocking the user's own message from even
    // appearing on screen.
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text, variant: "normal" },
      { role: "assistant", content: "", variant: "normal" },
    ]);
    setInput("");
    scrollToBottom();

    try {
      let sid = sessionId;

      if (!sid) {
        const session = await createSession({
          title: "OpenQCore Live AI Demo",
          metadata: { experience: "openqcore_marketing_demo" },
          forcePersonalContext: true,
        });
        sid = session.id;
        setSessionId(sid);
      }

      // 🔧 Throttled: at most one UI update + scroll every 60ms,
      // instead of on every single streamed chunk (previously
      // dozens-to-hundreds of re-renders per reply).
      let fullResponse = "";
      let lastFlush = 0;
      const FLUSH_INTERVAL_MS = 60;

      for await (const chunk of streamChatMessage(
        sid,
        text,
        DEMO_MODEL,
        undefined,
        true
      )) {
        fullResponse += chunk;

        const now = performance.now();
        if (now - lastFlush >= FLUSH_INTERVAL_MS) {
          replaceLastAssistant(fullResponse);
          scrollToBottom();
          lastFlush = now;
        }
      }

      if (!fullResponse.trim()) {
        replaceLastAssistant(
          "I searched for that but couldn't generate a clear answer. Could you try rephrasing your question?",
          "error"
        );
      } else {
        replaceLastAssistant(fullResponse);
      }
      scrollToBottom();
    } catch (err: any) {
      const isDailyLimit =
        err?.status === 429 ||
        String(err?.message || "").toLowerCase().includes("daily");

      if (!isDailyLimit) {
        console.error("[LiveAISection] Chat failed:", err);
      }

      const errorMessage = isDailyLimit
        ? t("daily_limit_message")
        : t("generic_error_message");

      const variant: ChatMessage["variant"] = isDailyLimit ? "limit" : "error";

      setMessages((prev) => {
        const copy = [...prev];

        if (
          copy.length > 0 &&
          copy[copy.length - 1].role === "assistant" &&
          !copy[copy.length - 1].content
        ) {
          copy[copy.length - 1] = { role: "assistant", content: errorMessage, variant };
          return copy;
        }

        return [...copy, { role: "assistant", content: errorMessage, variant }];
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="
        relative overflow-hidden
        border-t border-white/[0.05]
        bg-[#050911]
        pb-28 pt-14
      "
    >
      {/* Ambient lighting — neutral, no color tint */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute left-1/2 top-24
          h-[420px] w-[760px] -translate-x-1/2
          rounded-full bg-white/[0.025] blur-[120px]
        "
      />

      <div className={wrap}>
        {/* Heading */}
        <div className="relative z-10 mb-9 text-center">
          <Link
            href="https://qxt.openqcore.com"
            className="group inline-flex items-center"
          >
            <Image
              src="/engines/try-qxt-chat.png"
              alt={t("try_qxt_alt")}
              width={288}
              height={288}
              className="
                h-52 w-auto object-contain
                transition duration-500
                group-hover:scale-[1.025]
                sm:h-64 md:h-72
              "
            />
          </Link>

          <p
            className="
              mx-auto -mt-14 max-w-lg
              text-[15px] leading-7 text-slate-400
              sm:-mt-16
            "
          >
            {t("tagline")}
          </p>
        </div>

        {/* Chat shell — single unified surface */}
        <div ref={chatRef} className="relative z-10">
          <div
            className="
              relative overflow-hidden rounded-[26px]
              border border-white/[0.10]
              bg-[#12141a]/95
              shadow-[0_28px_90px_rgba(0,0,0,0.32)]
              backdrop-blur-xl
            "
          >
            {/* subtle top highlight */}
            <div
              aria-hidden
              className="
                pointer-events-none absolute inset-x-12 top-0
                h-px bg-gradient-to-r
                from-transparent via-white/[0.12] to-transparent
              "
            />

            {/* Messages */}
            {messages.length > 0 && (
              <div
                className="
                  qxt-scroll max-h-[430px] min-h-[190px]
                  space-y-5 overflow-y-auto
                  px-5 py-6 sm:px-6
                "
              >
                <AnimatePresence initial={false}>
                  {messages.map((message, index) => (
                    <MessageBubble key={index} message={message} t={t} />
                  ))}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Suggested prompts — only shown before the first message */}
            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2 px-5 pt-5 sm:px-6">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="
                      flex items-center gap-1.5 rounded-full border border-white/[0.10]
                      bg-white/[0.03] px-3 py-1.5 text-[12px] text-white/55
                      transition-all hover:border-white/[0.18] hover:bg-white/[0.06] hover:text-white/85
                    "
                  >
                    <Sparkles className="h-3 w-3 text-white/30" />
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Composer — same surface as the rest of the card; the
                border only appears on focus (focus-within), so there's
                no permanent "second box" visually separating it from
                the messages above it. */}
            <div
              className={`
                relative mx-3 mb-3 mt-4 rounded-2xl border border-transparent
                px-4 py-3 transition-all duration-200
                focus-within:border-white/[0.16] focus-within:bg-white/[0.02]
              `}
            >
              <DemoChatFooter
                input={input}
                loading={loading}
                placeholder={t("composer_placeholder")}
                onChange={setInput}
                onSend={() => handleSend()}
                onInputFocus={handleInputFocus}
              />
            </div>
          </div>

          {/* Demo note */}
          <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-white/25">
            <span className="h-0.5 w-0.5 rounded-full bg-white/25" />
            <span>{t("powered_by")}</span>
          </div>
        </div>
      </div>

      <WorkspaceModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={() => setAuthOpen(false)}
      />
    </section>
  );
}