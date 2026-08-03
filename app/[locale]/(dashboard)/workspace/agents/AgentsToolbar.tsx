import React from "react";
import { Search, Plus } from "lucide-react";

export function AgentsToolbar({
  search, onSearch, onCreate,
}: {
  search:   string;
  onSearch: (v: string) => void;
  onCreate: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-1 max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
        <input
          placeholder="Search agents..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full h-9 pl-9 pr-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-[13px] text-white placeholder:text-white/25 outline-none transition focus:border-white/[0.15]"
        />
      </div>
      <button
        type="button"
        onClick={onCreate}
        className="flex items-center gap-2 h-9 px-4 rounded-xl bg-red-500 text-white text-[13px] font-semibold hover:bg-red-400 transition-all shrink-0"
      >
        <Plus className="w-3.5 h-3.5" />
        New Agent
      </button>
    </div>
  );
}