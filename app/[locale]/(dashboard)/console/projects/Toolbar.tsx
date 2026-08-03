import React from "react";
import { Search, Plus } from "lucide-react";

export function ProjectsToolbar({
  onCreate,
  searchValue,
  onSearch,
}: {
  onCreate: () => void;
  searchValue: string;
  onSearch: (v: string) => void;
}) {
  return (
    <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/20" />

        <input
          placeholder="Search projects..."
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
          className="
            h-10 w-full rounded-xl border border-white/[0.08]
            bg-[#0f1012]/92 pl-9 pr-3
            text-[13px] text-white
            outline-none placeholder:text-white/22
            shadow-[0_8px_24px_rgba(0,0,0,0.12)]
            transition-all
            focus:border-amber-300/12
            focus:bg-[#111214]/96
            focus:ring-2 focus:ring-amber-300/[0.08]
          "
        />
      </div>

      <button
        type="button"
        onClick={onCreate}
        className="
          inline-flex h-10 shrink-0 items-center justify-center gap-2
          rounded-xl bg-amber-300 px-4
          text-[13px] font-semibold text-black
          shadow-[0_8px_24px_rgba(251,191,36,0.16)]
          transition-all hover:bg-amber-200
          active:scale-[0.99]
        "
      >
        <Plus className="h-3.5 w-3.5" />
        New Project
      </button>
    </section>
  );
}