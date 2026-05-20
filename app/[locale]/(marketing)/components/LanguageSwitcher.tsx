"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useLocale } from "next-intl";

import { ChevronDown, Globe } from "lucide-react";

import { languages } from "@/i18n/locales";

import {
    usePathname,
    useRouter,
} from "@/i18n/navigation";

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();

    const locale = useLocale();

    const wrapperRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState(false);

    const currentLanguage = useMemo(() => {
        return (
            languages.find(
                (lang) => lang.code === locale
            ) || languages[0]
        );
    }, [locale]);

    const handleLocaleChange = (newLocale: string) => {
        router.replace(pathname, {
            locale: newLocale
        });

        router.refresh();

        setOpen(false);
    };

    useEffect(() => {
        const handleOutsideClick = (
            event: MouseEvent
        ) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(
                    event.target as Node
                )
            ) {
                setOpen(false);
            }
        };

        const handleEscape = (
            event: KeyboardEvent
        ) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );

        document.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );

            document.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, []);

    return (
        <div
            ref={wrapperRef}
            className="relative"
        >
            {/* BUTTON */}
            <button
                type="button"
                onClick={() =>
                    setOpen((prev) => !prev)
                }
                aria-expanded={open}
                aria-label="Select language"
                className="
                    group

                    flex items-center gap-2.5

                    h-11

                    rounded-full

                    border border-white/[0.07]
                    bg-white/[0.03]

                    px-4

                    text-sm
                    text-slate-300

                    transition-all duration-300

                    hover:border-[#d4af37]/20
                    hover:bg-white/[0.05]
                    hover:text-white

                    active:scale-[0.98]

                    select-none
                "
            >
                <Globe
                    className="
                        h-4 w-4
                        text-slate-400
                        transition-colors duration-300
                        group-hover:text-[#d4af37]
                    "
                />

                <span className="font-medium">
                    {currentLanguage.label}
                </span>

                <ChevronDown
                    className={`
                        h-4 w-4

                        text-slate-500

                        transition-all duration-300

                        ${open
                            ? "rotate-180 text-white"
                            : ""
                        }
                    `}
                />
            </button>

            {/* DROPDOWN */}
            <div
                className={`
                    absolute
                    right-0
                    bottom-[calc(100%+12px)]
                    z-[120]

                    w-72

                    overflow-hidden

                    rounded-3xl

                    border border-white/[0.08]

                    bg-[#0b1120]/95

                    backdrop-blur-2xl

                    shadow-[0_20px_80px_rgba(0,0,0,0.45)]

                    transition-all duration-300 ease-out

                    ${open
                        ? "translate-y-0 opacity-100 visible"
                        : "translate-y-2 opacity-0 invisible pointer-events-none"
                    }
                `}
            >
                <div
                    className="
                        absolute
                        inset-x-0
                        top-0
                        h-px

                        bg-gradient-to-r
                        from-transparent
                        via-[#d4af37]/30
                        to-transparent
                    "
                />

                <div className="relative p-2">
                    {languages.map((language) => {
                        const active =
                            locale === language.code;

                        return (
                            <button
                                key={language.code}
                                type="button"
                                onClick={() =>
                                    handleLocaleChange(
                                        language.code
                                    )
                                }
                                className={`
                                    flex
                                    w-full
                                    items-center
                                    justify-between

                                    rounded-2xl

                                    px-4
                                    py-3.5

                                    text-left

                                    transition-all
                                    duration-200

                                    ${active
                                        ? `
                                                border border-[#d4af37]/20
                                                bg-[#d4af37]/10
                                                text-white
                                            `
                                        : `
                                                text-slate-300
                                                hover:bg-white/[0.05]
                                                hover:text-white
                                            `
                                    }
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-lg leading-none">
                                        {language.flag}
                                    </span>

                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">
                                            {language.label}
                                        </span>

                                        <span className="mt-0.5 text-xs text-slate-500">
                                            {language.country}
                                        </span>
                                    </div>
                                </div>

                                <div
                                    className={`
                                        flex items-center justify-center

                                        h-5 w-5

                                        rounded-full

                                        border

                                        transition-all duration-200

                                        ${active
                                            ? `
                                                    border-[#d4af37]/40
                                                    bg-[#d4af37]/15
                                                `
                                            : `
                                                    border-white/[0.08]
                                                    bg-white/[0.02]
                                                    opacity-0
                                                `
                                        }
                                    `}
                                >
                                    <div
                                        className={`
                                            h-2 w-2
                                            rounded-full

                                            ${active
                                                ? "bg-[#d4af37]"
                                                : "bg-white/30"
                                            }
                                        `}
                                    />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}