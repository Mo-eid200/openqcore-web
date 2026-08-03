"use client";

import { useEffect, useMemo, useRef, useState, startTransition } from "react";
import { useLocale } from "next-intl";
import { ChevronDown, Globe, Check } from "lucide-react";
import { languages } from "@/i18n/locales";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const currentLanguage = useMemo(() => {
    return languages.find((lang) => lang.code === locale) ?? languages[0];
  }, [locale]);

  const handleLocaleChange = (newLocale: string) => {
    setOpen(false);

    if (newLocale === locale) return;

    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // 🔧 FIX: keyboard support was Escape-only before (close, but no way
  // to actually navigate the list without a mouse). Added ArrowDown/
  // ArrowUp to move between languages and Enter to select, matching
  // the accessibility pattern used elsewhere on the site (e.g. the
  // search overlay's filteredResults keyboard handling).
  useEffect(() => {
    if (!open) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((prev) => (prev >= languages.length - 1 ? 0 : prev + 1));
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((prev) => (prev <= 0 ? languages.length - 1 : prev - 1));
      }

      if (event.key === "Enter") {
        event.preventDefault();
        handleLocaleChange(languages[activeIndex].code);
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, activeIndex]);

  useEffect(() => {
    if (open) {
      const currentIndex = languages.findIndex((lang) => lang.code === locale);
      setActiveIndex(currentIndex >= 0 ? currentIndex : 0);
    }
  }, [open, locale]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
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
          text-sm text-slate-300
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

        <span className="font-medium">{currentLanguage.label}</span>

        <ChevronDown
          className={`
            h-4 w-4
            text-slate-500
            transition-all duration-300
            ${open ? "rotate-180 text-white" : ""}
          `}
        />
      </button>

      {/* 🔧 FIX: was `right-0` (a physical property) — in RTL layouts
          this pins the menu to the same physical side regardless of
          reading direction, instead of flipping to the direction the
          trigger button actually reads from. `end-0` is the logical
          equivalent: it resolves to `right-0` in LTR and `left-0` in
          RTL automatically, matching the `rtl:rotate-180` convention
          already used elsewhere on the site (e.g. ArrowIcon). */}
      <div
        className={`
          absolute
          end-0
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
          ${
            open
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

        {/* 🔧 FIX: added max-height + overflow-y-auto so the list
            doesn't grow indefinitely as more languages get added
            (currently 7, was designed for a shorter list) — instead
            it scrolls internally past ~5 visible items. */}
        <div className="relative max-h-[340px] overflow-y-auto p-2">
          {languages.map((language, index) => {
            const active = locale === language.code;
            const highlighted = index === activeIndex;

            return (
              <button
                key={language.code}
                type="button"
                onClick={() => handleLocaleChange(language.code)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-2xl
                  px-4
                  py-3.5
                  text-start
                  transition-all
                  duration-200
                  ${
                    active
                      ? "border border-[#d4af37]/20 bg-[#d4af37]/10 text-white"
                      : highlighted
                      ? "bg-white/[0.05] text-white"
                      : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                  }
                `}
              >
                {/* 🔧 FIX: flag emoji removed entirely. Flags represent
                    countries, not languages (Arabic alone spans 20+
                    countries; a single flag here was always an
                    arbitrary, slightly-wrong choice, not just for
                    Egypt). The language's own native name carries
                    the identity better than a flag ever could. */}
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{language.label}</span>
                  {language.country && (
                    <span className="mt-0.5 text-xs text-slate-500">
                      {language.country}
                    </span>
                  )}
                </div>

                {active && (
                  <Check className="h-4 w-4 shrink-0 text-[#d4af37]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}