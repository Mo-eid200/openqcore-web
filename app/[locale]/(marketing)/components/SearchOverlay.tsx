"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Search, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import {
  getSearchItems,
  type SearchItem,
} from "./search-items";

type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export default function SearchOverlay({
  open,
  onClose,
}: SearchOverlayProps) {
  const t = useTranslations("search");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = useMemo(
    () => [
      t("suggestions.infrastructure"),
      t("suggestions.pulse_engine"),
      t("suggestions.apis"),
      t("suggestions.voice_sdks"),
      t("suggestions.research_qxt"),
      t("suggestions.realtime_systems"),
    ],
    [t]
  );

  const quickSuggestions = useMemo(
    () => [
      t("quick.voice"),
      t("quick.agents"),
      t("quick.realtime"),
      t("quick.sdks"),
      t("quick.research"),
    ],
    [t]
  );

  const searchItems = useMemo(
    () => getSearchItems(t),
    [t]
  );

  const [query, setQuery] = useState("");
  const [displayText, setDisplayText] =
    useState("");
  const [suggestionIndex, setSuggestionIndex] =
    useState(0);
  const [activeIndex, setActiveIndex] =
    useState(0);

  const currentSuggestion =
    suggestions[suggestionIndex] ?? "";

  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return [];

    return searchItems.filter((item) => {
      const haystack = [
        item.title,
        item.description,
        item.href,
        ...item.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [query, searchItems]);

  const openResult = (item: SearchItem) => {
    onClose();
    setTimeout(() => {
      router.push(item.href);
    }, 120);
  };

  useEffect(() => {
    if (!open) return;

    const timeout = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 180);

    return () => window.clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (!query.trim() || filteredResults.length === 0)
        return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev >= filteredResults.length - 1
            ? 0
            : prev + 1
        );
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev <= 0
            ? filteredResults.length - 1
            : prev - 1
        );
      }

      if (e.key === "Enter") {
        e.preventDefault();
        const selected =
          filteredResults[activeIndex];
        if (selected) {
          openResult(selected);
        }
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKey
      );
    };
  }, [
    open,
    onClose,
    query,
    filteredResults,
    activeIndex,
  ]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open || query) return;

    let timeout: number | null = null;
    let charIndex = 0;
    let current = "";

    setDisplayText("");

    const type = () => {
      current += currentSuggestion[charIndex] ?? "";
      setDisplayText(current);
      charIndex++;

      if (charIndex < currentSuggestion.length) {
        timeout = window.setTimeout(type, 28);
      } else {
        timeout = window.setTimeout(() => {
          setSuggestionIndex((prev) =>
            prev === suggestions.length - 1
              ? 0
              : prev + 1
          );
        }, 1400);
      }
    };

    timeout = window.setTimeout(type, 120);

    return () => {
      if (timeout) window.clearTimeout(timeout);
    };
  }, [
    currentSuggestion,
    open,
    query,
    suggestions.length,
  ]);

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          className="fixed inset-0 z-[45]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.32,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.div
            onMouseDown={onClose}
            className="fixed inset-x-0 bottom-0 top-[72px] z-[40] bg-black/45 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          <motion.div
            className="fixed inset-x-0 top-[72px] z-[45]"
            initial={{
              opacity: 0,
              y: -18,
              scale: 0.985,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -18,
              scale: 0.985,
            }}
            transition={{
              duration: 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="bg-[linear-gradient(180deg,rgba(7,11,20,0.92)_0%,rgba(7,11,20,0.82)_100%)] backdrop-blur-3xl">
              <div className="container-app">
                <motion.div
                  className="mx-auto max-w-5xl px-6 pb-10 pt-14 md:px-8 md:pb-14 md:pt-20"
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.06,
                      },
                    },
                    exit: {
                      transition: {
                        staggerChildren: 0.03,
                        staggerDirection: -1,
                      },
                    },
                  }}
                >
                  <div
                    onMouseDown={(e) =>
                      e.stopPropagation()
                    }
                    className="space-y-8"
                  >
                    <motion.div
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 10,
                        },
                        show: {
                          opacity: 1,
                          y: 0,
                        },
                        exit: {
                          opacity: 0,
                          y: 8,
                        },
                      }}
                      transition={{ duration: 0.26 }}
                      className="flex items-start justify-between gap-6"
                    >
                      <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/45">
                          <Search className="h-3.5 w-3.5 text-[#d4af37]" />
                          {t("title")}
                        </div>

                        <p className="max-w-2xl text-sm leading-6 text-white/42 md:text-[15px]">
                          {t("subtitle")}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white"
                        aria-label={t("close")}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </motion.div>

                    <motion.div
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 14,
                        },
                        show: {
                          opacity: 1,
                          y: 0,
                        },
                        exit: {
                          opacity: 0,
                          y: 10,
                        },
                      }}
                      transition={{ duration: 0.3 }}
                      onClick={() =>
                        inputRef.current?.focus()
                      }
                      className="group"
                    >
                      <div className="flex items-start gap-4 md:gap-5">
                        <div className="pt-2 text-[#d4af37]">
                          <Search className="h-6 w-6 md:h-7 md:w-7" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) =>
                              setQuery(
                                e.target.value
                              )
                            }
                            placeholder={
                              query ? "" : displayText
                            }
                            autoComplete="off"
                            spellCheck={false}
                            className="
                              w-full
                              bg-transparent
                              border-0
                              outline-none
                              ring-0
                              appearance-none
                              shadow-none
                              focus:border-0
                              focus:outline-none
                              focus:ring-0
                              text-[22px]
                              md:text-[30px]
                              lg:text-[38px]
                              font-[300]
                              leading-[1.1]
                              tracking-[-0.04em]
                              text-white
                              placeholder:text-white/26
                              caret-[#d4af37]
                            "
                          />

                          <motion.div
                            className="mt-5 h-px w-full bg-gradient-to-r from-[#d4af37]/40 via-white/14 to-transparent"
                            initial={{
                              opacity: 0,
                              scaleX: 0.96,
                            }}
                            animate={{
                              opacity: 0.9,
                              scaleX: 1,
                            }}
                            exit={{
                              opacity: 0,
                              scaleX: 0.96,
                            }}
                            transition={{
                              duration: 0.3,
                            }}
                          />
                        </div>

                        <div className="hidden pt-2 md:block">
                          <span className="text-[11px] uppercase tracking-[0.28em] text-white/28">
                            ESC
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    {query.trim().length > 0 ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.24 }}
                        className="space-y-2"
                      >
                        {filteredResults.length > 0 ? (
                          filteredResults.map(
                            (item, index) => (
                              <button
                                key={item.href}
                                type="button"
                                onClick={() =>
                                  openResult(item)
                                }
                                className={`w-full rounded-2xl border px-4 py-3 text-left transition-all ${
                                  index === activeIndex
                                    ? "border-[#d4af37]/30 bg-white/[0.06]"
                                    : "border-white/8 bg-white/[0.03] hover:bg-white/[0.05]"
                                }`}
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div className="min-w-0">
                                    <div className="truncate text-sm font-medium text-white">
                                      {item.title}
                                    </div>
                                    <div className="mt-1 truncate text-xs text-white/45">
                                      {item.description}
                                    </div>
                                  </div>

                                  <div className="flex shrink-0 items-center gap-2 text-xs text-[#d4af37]">
                                    <span>{item.href}</span>
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                  </div>
                                </div>
                              </button>
                            )
                          )
                        ) : (
                          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm text-white/40">
                            {t("noResults")}
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        variants={{
                          hidden: {
                            opacity: 0,
                            y: 12,
                          },
                          show: {
                            opacity: 1,
                            y: 0,
                          },
                          exit: {
                            opacity: 0,
                            y: 8,
                          },
                        }}
                        transition={{ duration: 0.28 }}
                        className="flex flex-wrap gap-2.5 pt-1"
                      >
                        {quickSuggestions.map(
                          (item) => (
                            <motion.button
                              key={item}
                              type="button"
                              whileHover={{
                                y: -2,
                                scale: 1.02,
                              }}
                              whileTap={{
                                scale: 0.98,
                              }}
                              onClick={() => {
                                setQuery(item);
                                inputRef.current?.focus();
                              }}
                              className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white/55 transition-colors hover:border-white/15 hover:bg-white/[0.06] hover:text-white"
                            >
                              {item}
                            </motion.button>
                          )
                        )}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}