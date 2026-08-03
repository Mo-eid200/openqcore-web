"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import {
  Bot,
  Brain,
  Check,
  ChevronsUpDown,
  Cpu,
  Loader2,
  Sparkles,
  Wand2,
  X,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command";
import { Button } from "../../components/ui/Button";
import type { Agent } from "./types";
import { fetchChatModels, PublicModel } from "@/app/lib/api/chat/models";

// ─── Types ────────────────────────────────────────────────────────────────────

type CreateAgentPayload = {
  name: string;
  role: string;
  description: string;
  icon?: string;
  system_prompt?: string;
  model?: string;
  temperature?: number;
};

type Props = {
  open: boolean;
  loading?: boolean;
  initialData?: Agent;
  onClose: () => void;
  onCreate: (data: CreateAgentPayload) => void | Promise<void>;
};

// ─── Icons ────────────────────────────────────────────────────────────────────

const ICONS = [
  { value: "cpu", icon: Cpu, label: "Core" },
  { value: "bot", icon: Bot, label: "Bot" },
  { value: "brain", icon: Brain, label: "Brain" },
  { value: "sparkles", icon: Sparkles, label: "Creative" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatModelVersion(model?: PublicModel) {
  if (!model?.gen && model?.gen !== 0) {
    return "";
  }

  const normalized =
    String(model.gen).trim();

  if (!normalized) {
    return "";
  }

  if (normalized.includes(".")) {
    return `G.${normalized}`;
  }

  return `G.${normalized}.0`;
}

// ─── Field ────────────────────────────────────────────────────────────────────

function Field({
  label,
  count,
  max,
  children,
}: {
  label: React.ReactNode;
  count?: number;
  max?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-white/60">{label}</label>
        {count !== undefined && max && (
          <span className="tabular-nums text-[10px] text-white/25">
            {count}/{max}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

const inputCls = `
  h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5
  text-sm text-white outline-none transition-all placeholder:text-white/20
  focus:border-amber-300/12 focus:bg-white/[0.05] focus:ring-1 focus:ring-amber-300/10
`;

const textareaCls = `
  w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3
  text-sm leading-relaxed text-white outline-none transition-all placeholder:text-white/20
  focus:border-amber-300/12 focus:bg-white/[0.05] focus:ring-1 focus:ring-amber-300/10
`;

// ─── Component ────────────────────────────────────────────────────────────────

export default function CreateAgentModal({
  open,
  loading = false,
  initialData,
  onClose,
  onCreate,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const isEditing = Boolean(initialData);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [icon, setIcon] = useState("cpu");
  const [model, setModel] = useState("");
  const [temperature, setTemperature] = useState(0.7);
  const [modelOpen, setModelOpen] = useState(false);
  const [models, setModels] = useState<PublicModel[]>([]);
  const [modelsLoading, setModelsLoading] = useState(false);

  const selectedModel = useMemo(
    () => models.find((m) => m.id === model),
    [models, model]
  );

  const ActiveIcon = ICONS.find((i) => i.value === icon)?.icon || Cpu;

  // ── Load models ────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!open) return;
    let mounted = true;

    (async () => {
      setModelsLoading(true);
      try {
        const items = await fetchChatModels("chat");
        if (!mounted) return;
        setModels(items);
        if (!initialData?.model && items.length > 0) {
          setModel(items[0].id);
        }
      } catch {
        if (mounted) setModels([]);
      } finally {
        if (mounted) setModelsLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [open, initialData]);

  // ── Prefill ────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!open) return;
    setName(initialData?.name || "");
    setRole(initialData?.role || "");
    setDescription(initialData?.description || "");
    setSystemPrompt(initialData?.system_prompt || "");
    setIcon(initialData?.icon || "cpu");
    setModel(initialData?.model || "");
    setTemperature(
      typeof initialData?.temperature === "number"
        ? initialData.temperature
        : 0.7
    );
  }, [open, initialData]);

  // ── ESC ────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, loading, onClose]);

  // ── Auto focus ─────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      formRef.current?.querySelector("input")?.focus();
    }, 80);
    return () => clearTimeout(t);
  }, [open]);

  // ── Submit ─────────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanRole = role.trim();

    if (!cleanName || !cleanRole) return;

    await onCreate({
      name: cleanName,
      role: cleanRole,
      description: description.trim(),
      icon,
      system_prompt: systemPrompt.trim(),
      model,
      temperature,
    });
  }

  if (!open) return null;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        onClick={() => {
          if (!loading) onClose();
        }}
      />

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="
          relative z-10 flex w-full max-w-[920px] max-h-[88vh] flex-col
          overflow-hidden rounded-3xl border border-white/[0.08]
          bg-[#0f1012]/96 shadow-[0_30px_90px_rgba(0,0,0,0.58)] backdrop-blur-2xl
        "
      >
        {/* ── Atmosphere ── */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-70px] top-[-80px] h-[220px] w-[220px] rounded-full bg-amber-300/[0.05] blur-[100px]" />
          <div className="absolute left-[-60px] bottom-[-80px] h-[180px] w-[180px] rounded-full bg-orange-200/[0.035] blur-[90px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.025),transparent_34%)]" />
        </div>

        {/* ── Header ── */}
        <div className="relative flex items-center justify-between gap-4 border-b border-white/[0.06] px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.05] bg-amber-300/[0.08] text-amber-200">
              <Cpu className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold tracking-tight text-white">
                  {isEditing ? "Edit Agent" : "New AI Agent"}
                </h2>

                <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-amber-300/10 bg-amber-300/[0.08] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-200/80">
                  <Sparkles className="h-2.5 w-2.5" />
                  AI
                </span>
              </div>

              <p className="mt-0.5 text-xs text-white/35">
                Configure behavior, model, and system prompt
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="
              flex h-8 w-8 shrink-0 items-center justify-center rounded-lg
              border border-white/[0.08] bg-white/[0.02] text-white/40
              transition-all hover:bg-white/[0.06] hover:text-white
            "
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="relative flex-1 overflow-y-auto">
          <div className="grid gap-4 p-5 xl:grid-cols-[260px_1fr]">
            {/* ── Left ── */}
            <div className="space-y-4">
              {/* Preview */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.05] bg-amber-300/[0.08] text-amber-200">
                    <ActiveIcon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-white">
                      {name.trim() || "Agent preview"}
                    </div>
                    <div className="mt-0.5 truncate text-xs text-white/35">
                      {role.trim() || "Role will appear here"}
                    </div>
                  </div>
                </div>

                {/* Icon picker */}
                <p className="mb-2 text-[11px] text-white/40">Icon</p>

                <div className="grid grid-cols-4 gap-1.5">
                  {ICONS.map(({ value, icon: Icon, label }) => (
                    <button
                      key={value}
                      type="button"
                      title={label}
                      onClick={() => setIcon(value)}
                      className={clsx(
                        "flex h-10 items-center justify-center rounded-lg border transition-all",
                        icon === value
                          ? "border-amber-300/16 bg-amber-300/[0.10] text-amber-200"
                          : "border-white/[0.08] bg-white/[0.02] text-white/40 hover:border-white/[0.14] hover:text-white/70"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Model */}
              <div className="space-y-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="text-xs font-medium text-white/60">Model</p>

                <Popover open={modelOpen} onOpenChange={setModelOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      className="
                        h-auto w-full justify-between rounded-xl
                        border border-white/[0.08] bg-white/[0.02] px-3 py-2.5
                        text-left text-white shadow-none transition-all
                        hover:border-white/[0.14] hover:bg-white/[0.04]
                        data-[state=open]:border-amber-300/12
                      "
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.05] bg-amber-300/[0.08] text-amber-200">
                          <Cpu className="h-3.5 w-3.5" />
                        </div>

                        <div className="min-w-0">
                          <div className="truncate text-xs font-semibold text-white">
                            {selectedModel?.public_name ||
                              (modelsLoading ? "Loading..." : "Select model")}
                          </div>

                          {formatModelVersion(selectedModel) && (
                            <div className="mt-0.5 text-[10px] text-amber-200/65">
                              {formatModelVersion(selectedModel)}
                            </div>
                          )}
                        </div>
                      </div>

                      <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 text-white/25" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent
                    align="start"
                    className="w-[280px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#111214] p-0 text-white shadow-2xl"
                  >
                    <Command className="bg-transparent">
                      <div className="border-b border-white/[0.05]">
                        <CommandInput
                          placeholder="Search models..."
                          className="h-10 border-0 bg-transparent text-sm text-white placeholder:text-white/25 focus:ring-0"
                        />
                      </div>

                      <CommandList className="max-h-[260px] overflow-y-auto">
                        <CommandEmpty className="py-8 text-center text-xs text-white/30">
                          No models found.
                        </CommandEmpty>

                        <CommandGroup className="p-1.5">
                          {models.map((item) => (
                            <CommandItem
                              key={item.id}
                              value={item.public_name}
                              onSelect={() => {
                                setModel(item.id);
                                setModelOpen(false);
                              }}
                              className="flex items-center justify-between rounded-lg px-3 py-2.5 transition-all data-[selected=true]:bg-amber-300/[0.08]"
                            >
                              <div className="min-w-0">
                                <div className="truncate text-sm font-medium text-white">
                                  {item.public_name}
                                </div>

                                {formatModelVersion(item) && (
                                  <div className="mt-0.5 text-[11px] text-amber-200/65">
                                    {formatModelVersion(item)}
                                  </div>
                                )}

                                {item.description && (
                                  <div className="mt-1 truncate text-[11px] text-white/35">
                                    {item.description}
                                  </div>
                                )}
                              </div>

                              <Check
                                className={clsx(
                                  "ml-2 h-3.5 w-3.5 shrink-0 text-amber-200 transition-opacity",
                                  model === item.id ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {/* Temperature */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] text-white/40">Creativity</span>
                    <span className="tabular-nums text-[11px] font-semibold text-amber-200">
                      {temperature.toFixed(1)}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={2}
                    step={0.1}
                    value={temperature}
                    onChange={(e) => setTemperature(Number(e.target.value))}
                    className="w-full accent-amber-300"
                  />

                  <div className="mt-1 flex justify-between">
                    <span className="text-[9px] text-white/20">Precise</span>
                    <span className="text-[9px] text-white/20">Creative</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right ── */}
            <div className="space-y-4">
              {/* Name + Role */}
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Agent Name" count={name.length} max={80}>
                  <input
                    type="text"
                    required
                    maxLength={80}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Research Copilot"
                    className={inputCls}
                  />
                </Field>

                <Field label="Role" count={role.length} max={120}>
                  <input
                    type="text"
                    required
                    maxLength={120}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Senior AI Engineer"
                    className={inputCls}
                  />
                </Field>
              </div>

              {/* Description */}
              <Field label="Description" count={description.length} max={500}>
                <textarea
                  rows={3}
                  maxLength={500}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the agent capabilities and specialization..."
                  className={textareaCls}
                />
              </Field>

              {/* System Prompt */}
              <Field
                label={
                  <span className="flex items-center gap-1.5">
                    <Wand2 className="h-3 w-3" />
                    System Prompt
                  </span>
                }
                count={systemPrompt.length}
                max={4000}
              >
                <textarea
                  rows={7}
                  maxLength={4000}
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder="You are an elite AI engineer focused on scalable backend systems..."
                  className={textareaCls}
                />
              </Field>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="relative flex items-center justify-end gap-2.5 border-t border-white/[0.06] px-5 py-3.5">
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="
              h-9 rounded-lg border border-white/[0.08] bg-white/[0.02] px-4
              text-sm font-medium text-white/55 transition-all
              hover:bg-white/[0.05] hover:text-white disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="
              inline-flex h-9 items-center justify-center gap-2 rounded-lg
              bg-amber-300 px-5 text-sm font-semibold text-black
              transition-all hover:bg-amber-200
              disabled:cursor-not-allowed disabled:opacity-60
            "
          >
            {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {loading
              ? isEditing
                ? "Saving..."
                : "Creating..."
              : isEditing
              ? "Save Changes"
              : "Create Agent"}
          </button>
        </div>
      </form>
    </div>
  );
}