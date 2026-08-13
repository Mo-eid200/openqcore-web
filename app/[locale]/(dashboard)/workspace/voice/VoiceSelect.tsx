"use client";

import { useMemo, useState } from "react";
import { Search, Check, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";

interface SelectOption {
  id: string;
  label: string;
}

// 🔧 Groups options by language, parsed from the public_name's
// trailing "(Locale Name)" pattern (e.g. "Jenny (English (United
// States))" -> group "English"). Falls back to "Other" if no locale
// pattern is found (covers the older manually-seeded OpenAI rows,
// which don't follow this naming convention).
function groupByLanguage(options: SelectOption[]) {
  const groups = new Map<string, SelectOption[]>();

  for (const option of options) {
    const match = option.label.match(/\(([^()]+(?:\([^()]*\))?)\)\s*$/);
    const localeName = match?.[1] ?? "Other";
    // First word of the locale name as the group key, e.g.
    // "English (United States)" -> "English"
    const groupKey = localeName.split(" ")[0];

    if (!groups.has(groupKey)) groups.set(groupKey, []);
    groups.get(groupKey)!.push(option);
  }

  return Array.from(groups.entries()).sort((a, b) => a[0].localeCompare(b[0]));
}

export default function VoiceSelect({
  value,
  placeholder,
  options,
  onChange,
  disabled = false,
}: {
  value: string;
  placeholder: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selectedLabel =
    options.find((item) => item.id === value)?.label ?? placeholder;

  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const grouped = useMemo(() => groupByLanguage(filtered), [filtered]);

  return (
    <Popover
      open={disabled ? false : open}
      onOpenChange={(next) => {
        if (!disabled) setOpen(next);
        if (!next) setQuery("");
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className="flex h-11 w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className={`truncate ${value ? "text-white" : "text-zinc-400"}`}>
            {selectedLabel}
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 text-zinc-500" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] overflow-hidden rounded-xl border border-white/10 bg-[#17171c] p-0 text-white shadow-2xl"
      >
        {/* Search box */}
        <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5">
          <Search className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search voices or languages..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
          />
        </div>

        {/* Grouped, scrollable list */}
        <div className="max-h-[320px] overflow-y-auto p-1">
          {grouped.length === 0 && (
            <p className="px-3 py-6 text-center text-xs text-zinc-500">
              No voices match "{query}"
            </p>
          )}

          {grouped.map(([groupName, groupOptions]) => (
            <div key={groupName} className="mb-1">
              <div className="sticky top-0 bg-[#17171c] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                {groupName}
              </div>

              {groupOptions.map((option) => {
                const isSelected = value === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      onChange(option.id);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      isSelected
                        ? "bg-white/10 text-white"
                        : "text-zinc-300 hover:bg-white/5"
                    }`}
                  >
                    <span className="truncate">{option.label}</span>
                    {isSelected && (
                      <Check className="h-3.5 w-3.5 shrink-0 text-red-400" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}