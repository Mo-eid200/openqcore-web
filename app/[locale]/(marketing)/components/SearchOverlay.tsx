"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useTranslations } from "next-intl";

type SearchOverlayProps = {
    open: boolean;
    onClose: () => void;
};

export default function SearchOverlay({
    open,
    onClose,
}: SearchOverlayProps) {

    const t = useTranslations("search");

    const suggestions = [
        t("suggestions.infrastructure"),
        t("suggestions.pulse_engine"),
        t("suggestions.apis"),
        t("suggestions.voice_sdks"),
        t("suggestions.research_qxt"),
        t("suggestions.realtime_systems"),
    ];

    const quickSuggestions = [
        t("quick.voice"),
        t("quick.agents"),
        t("quick.realtime"),
        t("quick.sdks"),
        t("quick.research"),
    ];

    const inputRef = useRef<HTMLInputElement>(null);

    const [displayText, setDisplayText] = useState("");
    const [suggestionIndex, setSuggestionIndex] = useState(0);

    if (!open) return null;

    const currentSuggestion = useMemo(
        () => suggestions[suggestionIndex],
        [suggestionIndex, suggestions]
    );

    // focus
    useEffect(() => {
        if (!open) return;

        const timeout = setTimeout(() => {
            inputRef.current?.focus();
        }, 180);

        return () => clearTimeout(timeout);
    }, [open]);

    // esc
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKey);

        return () => {
            window.removeEventListener("keydown", handleKey);
        };
    }, [onClose]);

    // typewriter
    useEffect(() => {
        if (!open) return;

        let current = "";
        let charIndex = 0;

        setDisplayText("");

        const interval = setInterval(() => {
            current += currentSuggestion[charIndex];
            setDisplayText(current);

            charIndex++;

            if (charIndex >= currentSuggestion.length) {
                clearInterval(interval);

                setTimeout(() => {
                    setSuggestionIndex((prev) =>
                        prev === suggestions.length - 1 ? 0 : prev + 1
                    );
                }, 1600);
            }
        }, 34);

        return () => clearInterval(interval);
    }, [currentSuggestion, open, suggestions.length]);

    return (
        <>
            {/* backdrop */}
            <div
                onMouseDown={onClose}
                className={`
                    fixed
                    left-0
                    right-0
                    bottom-0
                    top-[72px]
                    z-[40]

                    bg-black/20
                    backdrop-blur-[6px]

                    transition-all duration-500

                    ${open
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }
                `}
            />

            {/* search layer */}
            <div
                className={`
                    fixed
                    left-0
                    top-[72px]
                    z-[45]

                    w-full

                    transition-all
                    duration-500
                    ease-[cubic-bezier(0.16,1,0.3,1)]

                    ${open
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-6 pointer-events-none"
                    }
                `}
            >

                <div
                    className="
                        border-b border-white/[0.06]

                        bg-[#070b14]/75
                        backdrop-blur-2xl

                        shadow-[0_30px_80px_rgba(0,0,0,0.35)]
                    "
                >
                    <div className="container-app py-10">

                        {/* search container */}
                        <div className="mx-auto max-w-3xl">

                            {/* input wrapper */}
                            <div
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={() => inputRef.current?.focus()}
                                className="
                                    flex items-center gap-5

                                    rounded-full

                                    border border-white/[0.08]
                                    bg-white/[0.03]

                                    px-6 py-5

                                    transition-all duration-300

                                    hover:border-white/[0.12]

                                    focus-within:border-[#d4af37]/10
                                    focus-within:bg-white/[0.045]

                                    focus-within:shadow-[0_0_0_1px_rgba(212,175,55,0.18),0_0_40px_rgba(212,175,55,0.08)]
                                "
                            >
                                {/* icon */}
                                <div className="text-slate-500 shrink-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.8}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                                        />
                                    </svg>
                                </div>

                                {/* input */}
                                <div className="flex-1">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        placeholder={open ? displayText : ""}
                                        autoComplete="off"
                                        spellCheck={false}
                                        className="
                                            w-full
                                            bg-transparent

                                            text-[22px]
                                            md:text-[28px]

                                            font-medium
                                            tracking-[-0.04em]

                                            text-white
                                            placeholder:text-slate-600

                                            border-none
                                            outline-none
                                            ring-0

                                            focus:outline-none
                                            focus:ring-0
                                            focus:border-none

                                            shadow-none
                                            appearance-none

                                            caret-[#d4af37]
                                        "
                                    />
                                </div>

                                {/* esc */}
                                <button
                                    onClick={onClose}
                                    className="
                                        hidden md:flex

                                        rounded-xl

                                        border border-white/[0.06]
                                        bg-white/[0.03]

                                        px-3 py-1.5

                                        text-xs
                                        text-slate-500

                                        hover:text-white

                                        transition-all duration-200
                                    "
                                >
                                    ESC
                                </button>
                            </div>

                            {/* quick suggestions */}
                            <div
                                className="
                                    mt-5

                                    flex flex-wrap
                                    items-center
                                    gap-2
                                "
                            >
                                {quickSuggestions.map((item) => (
                                    <button
                                        key={item}
                                        className="
                                            rounded-full

                                            border border-white/[0.05]
                                            bg-white/[0.03]

                                            px-3 py-1.5

                                            text-xs
                                            text-slate-400

                                            hover:text-white
                                            hover:bg-white/[0.05]

                                            transition-all duration-200
                                        "
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}