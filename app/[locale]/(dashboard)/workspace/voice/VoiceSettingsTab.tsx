"use client";

import { useMemo, useState } from "react";
import type { VoiceSettingsTabProps } from "./types";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "../../components/ui/command";

interface OptionItem {
  id: string;
  label: string;
}

function SettingsSelect({
  value,
  placeholder,
  options,
  onChange,
}: {
  value: string;
  placeholder: string;
  options: OptionItem[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const selectedLabel = useMemo(() => {
    return options.find((item) => item.id === value)?.label ?? placeholder;
  }, [options, value, placeholder]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex h-11 w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white transition hover:bg-white/10"
        >
          <span className={value ? "text-white" : "text-zinc-400"}>
            {selectedLabel}
          </span>
          <span className="text-zinc-500">▾</span>
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] rounded-xl border border-white/10 bg-[#17171c] p-1 text-white shadow-2xl"
      >
        <Command className="bg-transparent">
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  onSelect={() => {
                    onChange(option.id);
                    setOpen(false);
                  }}
                  className={`cursor-pointer rounded-lg px-3 py-2 text-sm text-zinc-200 aria-selected:bg-white/10 aria-selected:text-white ${
                    value === option.id ? "bg-white/10 text-white" : ""
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
  );
}

export default function VoiceSettingsTab({
  options,
  defaultTTS,
  defaultSTT,
  onSetDefault,
}: VoiceSettingsTabProps) {
  const ttsOptions = options
    .filter((o) => o.capability === "tts" && o.is_active)
    .map((o) => ({
      id: o.id,
      label: o.public_name,
    }));

  const sttOptions = options
    .filter((o) => o.capability === "stt" && o.is_active)
    .map((o) => ({
      id: o.id,
      label: o.public_name,
    }));

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">Default TTS voice</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Choose the default voice used for speech generation.
          </p>
        </div>

        <SettingsSelect
          value={defaultTTS?.id || ""}
          placeholder="Select a TTS voice"
          options={ttsOptions}
          onChange={(value) => onSetDefault("tts", value)}
        />

        {defaultTTS?.public_name ? (
          <p className="mt-3 text-xs text-zinc-400">
            Current default: <span className="text-white">{defaultTTS.public_name}</span>
          </p>
        ) : null}
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">Default STT engine</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Choose the default transcription option for uploaded audio.
          </p>
        </div>

        <SettingsSelect
          value={defaultSTT?.id || ""}
          placeholder="Select an STT option"
          options={sttOptions}
          onChange={(value) => onSetDefault("stt", value)}
        />

        {defaultSTT?.public_name ? (
          <p className="mt-3 text-xs text-zinc-400">
            Current default: <span className="text-white">{defaultSTT.public_name}</span>
          </p>
        ) : null}
      </section>
    </div>
  );
}