"use client";

import { useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { ChatFooter } from "../../components/home/ChatFooter";
import WorkspaceModal from "../../components/AuthModal";
import { useApp } from "../../../../context/AppContext";
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

type SendData = {
  text: string;
  model: string;
  isVoiceActive?: boolean;
};

/* ─────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────── */

const wrap = "mx-auto w-full max-w-[880px] px-5 sm:px-6";

const DEMO_MODEL = "pulse.core.flow";

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
   Message
───────────────────────────────────────────────────────── */

function MessageBubble({
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
      <div className="flex justify-end">
        <div
          className="
            max-w-[82%] rounded-[20px] rounded-br-[7px]
            border border-[#4d7cff]/[0.16]
            bg-[#16233a]/80
            px-4 py-2.5
            text-[14px] leading-6 text-slate-100
            shadow-[0_8px_28px_rgba(0,0,0,0.14)]
            backdrop-blur-sm
            sm:max-w-[72%]
          "
        >
          {message.content}
        </div>
      </div>
    );
  }

  if (isLimit) {
    return (
      <div className="flex items-start gap-3">
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
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-start gap-3">
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
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <QuarkMark />

      <div className="min-w-0 max-w-[86%] pt-0.5">
        <div className="mb-1 text-[11px] font-medium text-white/35">
          {t("assistant_name")}
        </div>

        <div className="text-[14px] leading-7 text-slate-200">
          {message.content ? message.content : <TypingIndicator />}
        </div>
      </div>
    </div>
  );
}

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

  /*
   * ChatFooter still expects these props.
   * The marketing demo does not expose attachment controls,
   * so they intentionally remain empty.
   */
  const [pendingImages, setPendingImages] = useState<any[]>([]);
  const [pendingDocuments, setPendingDocuments] = useState<any[]>([]);

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

      if (
        copy.length > 0 &&
        copy[copy.length - 1].role === "assistant"
      ) {
        copy[copy.length - 1] = {
          role: "assistant",
          content,
          variant,
        };

        return copy;
      }

      return [
        ...copy,
        {
          role: "assistant",
          content,
          variant,
        },
      ];
    });
  };

  const handleSend = async (data: SendData): Promise<void> => {
    const text = data.text?.trim();

    if (!text || loading) return;

    if (!user) {
      setAuthOpen(true);
      return;
    }

    setLoading(true);

    try {
      let sid = sessionId;

      if (!sid) {
        const session = await createSession({
          title: "OpenQCore Live AI Demo",
          metadata: {
            experience: "openqcore_marketing_demo",
          },
          forcePersonalContext: true,
        });

        sid = session.id;
        setSessionId(sid);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: text,
          variant: "normal",
        },
        {
          role: "assistant",
          content: "",
          variant: "normal",
        },
      ]);

      setInput("");
      scrollToBottom();

      let fullResponse = "";

      for await (const chunk of streamChatMessage(
        sid,
        text,
        DEMO_MODEL,
        undefined,
        true
      )) {
        fullResponse += chunk;

        replaceLastAssistant(fullResponse);
        scrollToBottom();
      }
    } catch (err: any) {
      const isDailyLimit =
        err?.status === 429 ||
        String(err?.message || "")
          .toLowerCase()
          .includes("daily");

      // 429 is expected when the marketing demo quota is exhausted.
      if (!isDailyLimit) {
        console.error("[LiveAISection] Chat failed:", err);
      }

      const errorMessage = isDailyLimit
        ? t("daily_limit_message")
        : t("generic_error_message");

      // 🔧 FIX: this branch previously built the assistant message with
      // NO `variant` field at all, even when isDailyLimit was true. That
      // meant MessageBubble's `isLimit` check (`variant === "limit"`)
      // could never be true from this code path -- the gold-bordered
      // "DAILY DEMO LIMIT" UI with the "Continue in QXT Chat" link was
      // fully built but structurally unreachable. Now the variant is
      // set correctly based on which error actually occurred.
      const variant: ChatMessage["variant"] = isDailyLimit ? "limit" : "error";

      setMessages((prev) => {
        const copy = [...prev];

        if (
          copy.length > 0 &&
          copy[copy.length - 1].role === "assistant" &&
          !copy[copy.length - 1].content
        ) {
          copy[copy.length - 1] = {
            role: "assistant",
            content: errorMessage,
            variant,
          };

          return copy;
        }

        return [
          ...copy,
          {
            role: "assistant",
            content: errorMessage,
            variant,
          },
        ];
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
      {/* Ambient lighting */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute left-1/2 top-24
          h-[420px] w-[760px] -translate-x-1/2
          rounded-full bg-blue-500/[0.035] blur-[120px]
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

        {/* Chat shell */}
        <div ref={chatRef} className="relative z-10">
          <div
            className="
              relative overflow-hidden rounded-[26px]
              border border-white/[0.07]
              bg-[#0b1018]/95
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
                {messages.map((message, index) => (
                  <MessageBubble
                    key={index}
                    message={message}
                    t={t}
                  />
                ))}

                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Composer */}
            <div
              className={`
                relative px-3 pb-3 pt-3
                ${
                  messages.length > 0
                    ? "border-t border-white/[0.055]"
                    : ""
                }
              `}
            >
              <ChatFooter
                input={input}
                loading={loading}
                lang="en"
                darkMode={true}
                placeholder={t("composer_placeholder")}
                onChange={setInput}
                onSend={handleSend}
                onInputFocus={handleInputFocus}
                pendingImages={pendingImages}
                setPendingImages={setPendingImages}
                pendingDocuments={pendingDocuments}
                setPendingDocuments={setPendingDocuments}
                demoMode={true}
                forceVoiceMode={false}
                defaultModelId="quark"
              />
            </div>
          </div>

          {/* Demo note */}
          <div
            className="
              mt-3 flex items-center justify-center gap-2
              text-[10px] text-white/25
            "
          >
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