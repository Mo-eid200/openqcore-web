"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Send, Loader2, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

type Props = {
  input: string;
  loading: boolean;
  placeholder: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onInputFocus?: () => void;
};

// 🔧 NEW: expanded set of cycling suggestions for the typewriter
// placeholder effect (was in the old ChatFooter.tsx, restored here
// with more variety per request).
const TYPED_SUGGESTIONS = [
  "Ask Quarc about anything...",
  "Draft a business plan in seconds...",
  "Get feedback on your ideas...",
  "Write and debug real code...",
  "Improve your productivity...",
  "Brainstorm your next project...",
  "Summarize something complex...",
  "Explore a new topic...",
];

export default function DemoChatFooter({
  input,
  loading,
  placeholder,
  onChange,
  onSend,
  onInputFocus,
}: Props) {
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [emojiPos, setEmojiPos] = useState<{ top: number; left: number } | null>(null);
  const [mounted, setMounted] = useState(false);
  const [typedPlaceholder, setTypedPlaceholder] = useState("");
  const [suggestionIdx, setSuggestionIdx] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiBtnRef = useRef<HTMLButtonElement>(null);
  const emojiPanelRef = useRef<HTMLDivElement>(null);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setMounted(true), []);

  // Auto-grow textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [input]);

  // 🔧 Typewriter effect — only runs while the field is empty and
  // unfocused, matching the old ChatFooter's exact behavior. Stops
  // immediately the moment the user types or focuses the field.
  useEffect(() => {
    if (input.trim() || isFocused) {
      setTypedPlaceholder("");
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
      return;
    }

    const phrase = TYPED_SUGGESTIONS[suggestionIdx];
    let i = 0;
    setTypedPlaceholder("");

    const typing = setInterval(() => {
      if (i < phrase.length) {
        setTypedPlaceholder(phrase.slice(0, ++i));
      } else {
        clearInterval(typing);
        pauseTimer.current = setTimeout(() => {
          setSuggestionIdx((p) => (p + 1) % TYPED_SUGGESTIONS.length);
        }, 2200);
      }
    }, 38);

    return () => clearInterval(typing);
  }, [suggestionIdx, input, isFocused]);

  // Close on outside click (checks both the button and the portaled panel)
  useEffect(() => {
    if (!emojiOpen) return;
    function handler(e: MouseEvent) {
      const target = e.target as Node;
      if (
        emojiBtnRef.current?.contains(target) ||
        emojiPanelRef.current?.contains(target)
      ) {
        return;
      }
      setEmojiOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [emojiOpen]);

  const canSend = input.trim().length > 0 && !loading;

  const toggleEmoji = useCallback(() => {
    if (!emojiOpen && emojiBtnRef.current) {
      const rect = emojiBtnRef.current.getBoundingClientRect();
      setEmojiPos({
        top: rect.top - 350,
        left: Math.max(8, rect.right - 290),
      });
    }
    setEmojiOpen((v) => !v);
  }, [emojiOpen]);

  const handleEmojiClick = (obj: any) => {
    const ta = textareaRef.current;
    if (!ta) {
      onChange(input + obj.emoji);
      return;
    }
    const pos = ta.selectionStart;
    onChange(input.slice(0, pos) + obj.emoji + input.slice(ta.selectionEnd));
    setTimeout(() => {
      ta.selectionStart = ta.selectionEnd = pos + obj.emoji.length;
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSend) onSend();
    }
  };

  return (
    <div className="flex items-end gap-2">
      <textarea
        ref={textareaRef}
        rows={1}
        value={input}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          setIsFocused(true);
          onInputFocus?.();
        }}
        onBlur={() => setIsFocused(false)}
        placeholder={typedPlaceholder || placeholder}
        disabled={loading}
        className="
          min-h-[24px] w-full resize-none bg-transparent text-sm leading-relaxed
          text-white outline-none placeholder:text-white/25
          disabled:opacity-50
        "
      />

      <div className="flex shrink-0 items-center gap-1">
        <button
          ref={emojiBtnRef}
          type="button"
          onClick={toggleEmoji}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-white/35 transition-all hover:bg-white/[0.06] hover:text-white/70"
          title="Emoji"
        >
          <Smile className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={onSend}
          disabled={!canSend}
          aria-label="Send message"
          className={`
            flex h-9 w-9 items-center justify-center rounded-xl
            transition-all duration-200
            ${
              canSend
                ? "bg-white text-black shadow-[0_4px_16px_rgba(255,255,255,0.12)] hover:scale-[1.04] active:scale-95"
                : "cursor-not-allowed bg-white/[0.06] text-white/20"
            }
          `}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </div>

      {mounted &&
        emojiOpen &&
        emojiPos &&
        createPortal(
          <div
            ref={emojiPanelRef}
            style={{ position: "fixed", top: emojiPos.top, left: emojiPos.left, zIndex: 300 }}
            className="animate-in fade-in slide-in-from-bottom-2 duration-150"
          >
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              height={340}
              width={290}
              searchDisabled
              skinTonesDisabled
              previewConfig={{ showPreview: false }}
            />
          </div>,
          document.body
        )}
    </div>
  );
}