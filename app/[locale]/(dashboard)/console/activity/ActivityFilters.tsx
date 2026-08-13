"use client";

import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

import type {
    ConsoleActivityType,
    ConsoleActivityStatus,
} from "@/app/lib/api/console/activity";

export type ActivityFilterState = {
    types: ConsoleActivityType[];
    statuses: ConsoleActivityStatus[];
    search: string;
    dateFrom: string | null;
    dateTo: string | null;
};

export const EMPTY_FILTERS: ActivityFilterState = {
    types: [],
    statuses: [],
    search: "",
    dateFrom: null,
    dateTo: null,
};

const TYPE_OPTIONS: { value: ConsoleActivityType; label: string }[] = [
    { value: "chat", label: "Chat" },
    { value: "image_generation", label: "Images" },
    { value: "api_request", label: "API" },
];

const STATUS_OPTIONS: { value: ConsoleActivityStatus; label: string }[] = [
    { value: "success", label: "Success" },
    { value: "error", label: "Error" },
    { value: "running", label: "Running" },
];

type Props = {
    value: ActivityFilterState;
    onChange: (next: ActivityFilterState) => void;
};

export default function ActivityFilters({ value, onChange }: Props) {
    // Local search text is debounced before it reaches onChange, so
    // we don't fire a network request on every keystroke.
    const [searchDraft, setSearchDraft] = useState(value.search);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchDraft !== value.search) {
                onChange({ ...value, search: searchDraft });
            }
        }, 400);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchDraft]);

    const toggleType = (type: ConsoleActivityType) => {
        const has = value.types.includes(type);
        onChange({
            ...value,
            types: has
                ? value.types.filter((t) => t !== type)
                : [...value.types, type],
        });
    };

    const toggleStatus = (status: ConsoleActivityStatus) => {
        const has = value.statuses.includes(status);
        onChange({
            ...value,
            statuses: has
                ? value.statuses.filter((s) => s !== status)
                : [...value.statuses, status],
        });
    };

    const hasActiveFilters =
        value.types.length > 0 ||
        value.statuses.length > 0 ||
        value.search.length > 0 ||
        value.dateFrom !== null ||
        value.dateTo !== null;

    const clearAll = () => {
        setSearchDraft("");
        onChange(EMPTY_FILTERS);
    };

    return (
        <div
            className="
                flex flex-col gap-3
                rounded-2xl border border-white/[0.06]
                bg-[#0f1012]/92 p-4
                backdrop-blur-2xl
            "
        >
            {/* SEARCH */}
            <div className="relative">
                <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                <input
                    type="text"
                    value={searchDraft}
                    onChange={(e) => setSearchDraft(e.target.value)}
                    placeholder="Search activity..."
                    className="
                        w-full rounded-xl border border-white/[0.06]
                        bg-white/[0.02] py-2.5 ps-9 pe-3
                        text-sm text-white
                        placeholder:text-white/35
                        outline-none
                        transition-colors
                        focus:border-amber-300/25
                    "
                />
            </div>

            {/* TYPE + STATUS CHIPS */}
            <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] uppercase tracking-[0.14em] text-white/35">
                    Type
                </span>
                {TYPE_OPTIONS.map((opt) => {
                    const active = value.types.includes(opt.value);
                    return (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => toggleType(opt.value)}
                            className={`
                                rounded-full border px-3 py-1
                                text-xs font-medium
                                transition-all
                                ${active
                                    ? "border-amber-300/30 bg-amber-300/[0.12] text-amber-200"
                                    : "border-white/[0.06] bg-white/[0.02] text-white/55 hover:bg-white/[0.05]"
                                }
                            `}
                        >
                            {opt.label}
                        </button>
                    );
                })}

                <span className="ms-2 text-[11px] uppercase tracking-[0.14em] text-white/35">
                    Status
                </span>
                {STATUS_OPTIONS.map((opt) => {
                    const active = value.statuses.includes(opt.value);
                    return (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => toggleStatus(opt.value)}
                            className={`
                                rounded-full border px-3 py-1
                                text-xs font-medium
                                transition-all
                                ${active
                                    ? "border-amber-300/30 bg-amber-300/[0.12] text-amber-200"
                                    : "border-white/[0.06] bg-white/[0.02] text-white/55 hover:bg-white/[0.05]"
                                }
                            `}
                        >
                            {opt.label}
                        </button>
                    );
                })}

                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={clearAll}
                        className="
                            ms-auto flex items-center gap-1
                            rounded-full border border-white/[0.06]
                            bg-white/[0.02] px-3 py-1
                            text-xs font-medium text-white/50
                            transition-all
                            hover:bg-white/[0.05] hover:text-white/80
                        "
                    >
                        <X className="h-3 w-3" />
                        Clear
                    </button>
                )}
            </div>

            {/* DATE RANGE */}
            <div className="flex items-center gap-2">
                <input
                    type="date"
                    value={value.dateFrom ?? ""}
                    onChange={(e) =>
                        onChange({ ...value, dateFrom: e.target.value || null })
                    }
                    className="
                        rounded-xl border border-white/[0.06]
                        bg-white/[0.02] px-3 py-2
                        text-xs text-white/70
                        outline-none
                        transition-colors
                        focus:border-amber-300/25
                        [color-scheme:dark]
                    "
                />
                <span className="text-xs text-white/35">to</span>
                <input
                    type="date"
                    value={value.dateTo ?? ""}
                    onChange={(e) =>
                        onChange({ ...value, dateTo: e.target.value || null })
                    }
                    className="
                        rounded-xl border border-white/[0.06]
                        bg-white/[0.02] px-3 py-2
                        text-xs text-white/70
                        outline-none
                        transition-colors
                        focus:border-amber-300/25
                        [color-scheme:dark]
                    "
                />
            </div>
        </div>
    );
}