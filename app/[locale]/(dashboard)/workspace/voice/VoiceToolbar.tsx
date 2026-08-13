"use client";

import { useMemo, useState } from "react";
import type { VoiceToolbarProps } from "./types";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "../../components/ui/command";

const STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "ready", label: "Ready" },
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "failed", label: "Failed" },
] as const;

export default function VoiceToolbar({
  search,
  status,
  stats,
  onSearchChange,
  onStatusChange,
  onCreate,
}: VoiceToolbarProps) {
  const [open, setOpen] = useState(false);

  const selectedLabel = useMemo(() => {
    return STATUS_OPTIONS.find((item) => item.value === status)?.label ?? "All statuses";
  }, [status]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">Voice</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Generate speech, transcribe audio, and manage workspace voice jobs.
          </p>
        </div>

        <button
          onClick={onCreate}
          className="inline-flex items-center justify-center rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-400"
        >
          + New Voice Job
        </button>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search titles, prompts, transcripts..."
            className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-white/20"
          />

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex h-11 min-w-[170px] items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white transition hover:bg-white/10"
              >
                <span>{selectedLabel}</span>
                <span className="text-zinc-500">▾</span>
              </button>
            </PopoverTrigger>

            <PopoverContent
              align="start"
              className="w-[170px] rounded-xl border border-white/10 bg-[#17171c] p-1 text-white shadow-2xl"
            >
              <Command className="bg-transparent">
                <CommandList>
                  <CommandGroup>
                    {STATUS_OPTIONS.map((option) => (
                      <CommandItem
                        key={option.value}
                        onSelect={() => {
                          onStatusChange(option.value);
                          setOpen(false);
                        }}
                        className={`cursor-pointer rounded-lg px-3 py-2 text-sm text-zinc-200 aria-selected:bg-white/10 aria-selected:text-white ${
                          status === option.value ? "bg-white/10 text-white" : ""
                        }`}
                      >
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-300">
            Total: <span className="text-white">{stats?.total ?? 0}</span>
          </div>
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
            Ready: <span>{stats?.ready ?? 0}</span>
          </div>
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-xs text-amber-300">
            Pending: <span>{stats?.pending ?? 0}</span>
          </div>
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300">
            Failed: <span>{stats?.failed ?? 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}