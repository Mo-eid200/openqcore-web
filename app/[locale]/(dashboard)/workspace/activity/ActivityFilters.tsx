import React from "react";

const FILTERS = [
  { label: "All",    value: "all"    },
  { label: "API",    value: "api"    },
  { label: "System", value: "system" },
  { label: "Errors", value: "danger" },
];

export function ActivityFilters({
  filter,
  onFilter,
}: {
  filter:   string;
  onFilter: (f: string) => void;
}) {
  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          type="button"
          onClick={() => onFilter(f.value)}
          className={`
            h-8 px-4 rounded-xl text-xs font-medium
            transition-all duration-200
            ${filter === f.value
              ? "bg-white/[0.08] border border-white/[0.12] text-white"
              : "border border-white/[0.06] bg-transparent text-white/40 hover:text-white/70 hover:border-white/[0.10]"
            }
          `}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}