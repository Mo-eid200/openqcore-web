"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Zap,
  Loader2,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Code2,
  FileText,
  Languages,
  Lightbulb,
  MessageSquare,
  Wand2,
  Check,
  Settings2,
  Star,
} from "lucide-react";

import { createGeneration } from "@/app/lib/api/console/generations";
import { useModels, type PublicModelItem } from "@/app/context/ModelsContext";
import type { GenerationItem } from "./types";

// ─── Templates ────────────────────────────────────────────────────────────────

const TEMPLATES = [
  {
    icon: Wand2,
    label: "Tagline",
    color: "text-amber-300",
    bg: "bg-amber-400/10 border-amber-400/15",
    prompt:
      "Write 3 catchy taglines for a product that helps teams collaborate with AI.",
  },
  {
    icon: Code2,
    label: "Code",
    color: "text-blue-300",
    bg: "bg-blue-400/10 border-blue-400/15",
    prompt:
      "Write a Python function that validates an email address using regex.",
  },
  {
    icon: FileText,
    label: "Summary",
    color: "text-violet-300",
    bg: "bg-violet-400/10 border-violet-400/15",
    prompt:
      "Summarize the key benefits of using vector databases for AI applications.",
  },
  {
    icon: Languages,
    label: "Translate",
    color: "text-emerald-300",
    bg: "bg-emerald-400/10 border-emerald-400/15",
    prompt:
      "Translate the following to Arabic: 'Our platform empowers you to build smarter AI products.'",
  },
  {
    icon: Lightbulb,
    label: "Ideas",
    color: "text-yellow-300",
    bg: "bg-yellow-400/10 border-yellow-400/15",
    prompt:
      "Give me 5 creative SaaS product ideas in the AI productivity space.",
  },
  {
    icon: MessageSquare,
    label: "Email",
    color: "text-cyan-300",
    bg: "bg-cyan-400/10 border-cyan-400/15",
    prompt:
      "Write a professional cold outreach email introducing our AI platform to a potential enterprise client.",
  },
] as const;

// ─── Group metadata ───────────────────────────────────────────────────────────
// 🔧 Same real category metadata as ModelSelector.tsx (used elsewhere
// in the app for this exact catalog — generations uses the same
// productKey="chat" model set, so the same groups apply here).

const GROUP_META: Record<
  string,
  { label: string; color: string; icon: string; description: string }
> = {
  core: {
    label: "Core",
    color: "text-blue-300",
    icon: "⚡",
    description: "Fast • Everyday • Low Cost",
  },
  nexus: {
    label: "Nexus",
    color: "text-emerald-300",
    icon: "⚖️",
    description: "Balanced • Productivity",
  },
  quantum: {
    label: "Quantum",
    color: "text-violet-300",
    icon: "🧠",
    description: "Advanced Reasoning • Complex Tasks",
  },
  nova: {
    label: "Nova",
    color: "text-amber-300",
    icon: "✨",
    description: "Creative • Ideas • Writing",
  },
};

function genLabelFor(model: PublicModelItem): string | null {
  // 🔧 label carries the precise decimal version (e.g. "G1.2"); gen
  // (a plain integer) is only used for grouping/sorting — these are
  // NOT the same value, label is the one to display.
  return model.generation?.label || (model.gen ? `G${model.gen}` : null);
}

// ─── Advanced defaults ────────────────────────────────────────────────────────

const DEFAULT_MAX_TOKENS = 1000;
const MIN_MAX_TOKENS = 100;
const MAX_MAX_TOKENS = 4000;

const MAIN_WIDTH = 640;
const SIDE_PANEL_WIDTH = 300;

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated: (item: GenerationItem) => void;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function NewGenerationModal({
  open,
  onClose,
  onCreated,
}: Props) {
  const { models, groupedModels, selected } = useModels();

  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("");
  const [model, setModel] = useState(selected?.id || "pulse-core");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(DEFAULT_MAX_TOKENS);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ── Sync selected model ─────────────────────────────────────────────────────

  useEffect(() => {
    if (selected?.id) setModel(selected.id);
  }, [selected?.id]);

  // ── Default-expand the group containing the current selection ──────────────

  useEffect(() => {
    if (expandedGroup || !groupedModels.length) return;
    const group = groupedModels.find((g) =>
      g.models.some((m) => m.id === model)
    );
    setExpandedGroup(group?.groupKey || groupedModels[0]?.groupKey || null);
  }, [groupedModels, model, expandedGroup]);

  // ── Reset ───────────────────────────────────────────────────────────────────

  const reset = () => {
    setPrompt("");
    setTitle("");
    setModel(selected?.id || "pulse-core");
    setTemperature(0.7);
    setMaxTokens(DEFAULT_MAX_TOKENS);
    setShowAdvanced(false);
    setLoading(false);
    setError(null);
    setDone(false);
  };

  const handleClose = () => {
    if (!loading) {
      reset();
      onClose();
    }
  };

  // ── Auto-resize textarea ──────────────────────────────────────────────────

  const handlePromptChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPrompt(e.target.value);

    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  // ── Apply template ────────────────────────────────────────────────────────

  const applyTemplate = (text: string) => {
    setPrompt(text);

    setTimeout(() => {
      const el = textareaRef.current;
      if (el) {
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
      }
    }, 10);
  };

  // ── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!prompt.trim()) return;

      setError(null);
      setLoading(true);

      try {
        const item = await createGeneration({
          prompt: prompt.trim(),
          title: title.trim() || undefined,
          model,
          temperature,
          max_tokens: maxTokens,
        });

        setDone(true);
        setTimeout(() => {
          onCreated(item);
          handleClose();
        }, 900);
      } catch (err: any) {
        setError(
          err?.response?.data?.detail ||
            err?.message ||
            "Generation failed"
        );
      } finally {
        setLoading(false);
      }
    },
    [prompt, title, model, temperature, maxTokens, onCreated]
  ); // eslint-disable-line

  // ── Derived ───────────────────────────────────────────────────────────────

  if (!open) return null;

  const selectedModel = models.find((m) => m.id === model);
  const modelLabel = selectedModel?.public_name || model;
  const modelGenLabel = selectedModel ? genLabelFor(selectedModel) : null;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="absolute inset-0" onClick={handleClose} />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          width: showAdvanced ? MAIN_WIDTH + SIDE_PANEL_WIDTH : MAIN_WIDTH,
        }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="
          relative z-10 flex max-h-[85vh] w-full max-w-[95vw]
          overflow-hidden rounded-t-3xl border border-white/[0.08]
          bg-[#0f1012]/96 shadow-[0_24px_80px_rgba(0,0,0,0.7)]
          backdrop-blur-2xl
          sm:rounded-2xl
        "
      >
        {/* ── Main column ── */}
        <div
          className="relative flex shrink-0 flex-col"
          style={{ width: MAIN_WIDTH }}
        >
          {/* Atmosphere */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute right-[-50px] top-[-60px] h-[160px] w-[160px] rounded-full bg-amber-300/[0.05] blur-[80px]" />
            <div className="absolute left-[-40px] bottom-[-50px] h-[120px] w-[120px] rounded-full bg-orange-200/[0.035] blur-[70px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.025),transparent_34%)]" />
          </div>

          {/* ── Header ── */}
          <div className="relative flex shrink-0 items-center justify-between border-b border-white/[0.06] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.05] bg-amber-300/[0.08] text-amber-300">
                <Zap className="h-4 w-4" />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-white">
                  New Generation
                </h2>
                <p className="mt-0.5 text-xs text-white/35">
                  Run a prompt against your AI model
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              disabled={loading}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-white/25 transition-all hover:bg-white/[0.06] hover:text-white/60"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* ── Scrollable body ── */}
          <div className="relative flex-1 overflow-y-auto">
            <form id="gen-form" onSubmit={handleSubmit}>
              <div className="space-y-3 px-5 py-3.5">
                {/* Templates — compact icon-only row (was a tall
                    2-row grid with icon+label stacked in each
                    button; label now shows as a tooltip on hover
                    instead, saving significant vertical space). */}
                <div>
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-white/30">
                    Quick Templates
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {TEMPLATES.map((t) => {
                      const Icon = t.icon;

                      return (
                        <button
                          key={t.label}
                          type="button"
                          title={t.label}
                          onClick={() => applyTemplate(t.prompt)}
                          className={`
                            flex h-8 items-center gap-1.5 rounded-lg border px-2.5
                            transition-all duration-150
                            hover:scale-[1.03] active:scale-[0.97]
                            ${t.bg}
                          `}
                        >
                          <Icon className={`h-3.5 w-3.5 ${t.color}`} />
                          <span className={`text-[10px] font-semibold ${t.color}`}>
                            {t.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Prompt */}
                <div>
                  <label className="mb-1.5 block text-xs text-white/50">
                    Prompt <span className="text-red-400">*</span>
                  </label>

                  <textarea
                    ref={textareaRef}
                    value={prompt}
                    onChange={handlePromptChange}
                    placeholder="Write your prompt here..."
                    required
                    rows={3}
                    className="
                      min-h-[72px] w-full resize-none overflow-hidden
                      rounded-xl border border-white/[0.08] bg-white/[0.03]
                      px-3 py-2.5 text-sm text-white
                      leading-relaxed outline-none placeholder:text-white/20
                      transition-all
                      focus:border-amber-300/12 focus:bg-white/[0.05]
                    "
                  />

                  <div className="mt-1 flex justify-end">
                    <span className="text-[10px] text-white/20">
                      {prompt.length} chars
                    </span>
                  </div>
                </div>

                {/* 🔧 Model selector — REBUILT to reflect the real
                    catalog structure: groups (Core/Nexus/Quantum/Nova)
                    containing their own sub-models, each with its own
                    precise generation label (e.g. "G1.2") — not a
                    flat grid. Matches ModelSelector.tsx's proven
                    collapsible-group pattern, using the same
                    groupedModels the context already provides. */}
                <div>
                  <label className="mb-1.5 block text-xs text-white/50">
                    Model
                  </label>

                  <div className="overflow-hidden rounded-xl border border-white/[0.06]">
                    {groupedModels.map((group) => {
                      if (group.groupKey === "__ungrouped__") {
                        return group.models.map((m) => (
                          <ModelRow
                            key={m.id}
                            model={m}
                            isSelected={model === m.id}
                            onSelect={() => setModel(m.id)}
                          />
                        ));
                      }

                      const meta = GROUP_META[group.groupKey] || {
                        label: group.groupKey,
                        color: "text-white/60",
                        icon: "•",
                        description: "",
                      };
                      const isExpanded = expandedGroup === group.groupKey;
                      const hasSelected = group.models.some(
                        (m) => m.id === model
                      );

                      return (
                        <div
                          key={group.groupKey}
                          className="border-b border-white/[0.05] last:border-b-0"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedGroup(
                                isExpanded ? null : group.groupKey
                              )
                            }
                            className="flex w-full items-center justify-between bg-white/[0.015] px-3.5 py-2.5 transition-colors hover:bg-white/[0.03]"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-sm leading-none">
                                {meta.icon}
                              </span>
                              <div className="text-left">
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className={`text-xs font-semibold ${meta.color}`}
                                  >
                                    {meta.label}
                                  </span>
                                  {hasSelected && !isExpanded && (
                                    <Check
                                      className={`h-3 w-3 ${meta.color}`}
                                    />
                                  )}
                                </div>
                                {meta.description && (
                                  <div className="mt-0.5 text-[10px] text-white/30">
                                    {meta.description}
                                  </div>
                                )}
                              </div>
                            </div>
                            <ChevronDown
                              className={`h-3.5 w-3.5 shrink-0 text-white/30 transition-transform duration-200 ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          <div
                            className="grid transition-all duration-300 ease-in-out"
                            style={{
                              gridTemplateRows: isExpanded ? "1fr" : "0fr",
                            }}
                          >
                            <div className="overflow-hidden">
                              {group.models.map((m, idx) => (
                                <ModelRow
                                  key={m.id}
                                  model={m}
                                  isSelected={model === m.id}
                                  onSelect={() => setModel(m.id)}
                                  accentColor={meta.color}
                                  isRecommended={idx === 0}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Advanced toggle */}
                <button
                  type="button"
                  onClick={() => setShowAdvanced((p) => !p)}
                  className={`
                    flex w-full items-center justify-between rounded-xl border px-3 py-2.5
                    text-xs font-medium transition-all
                    ${
                      showAdvanced
                        ? "border-amber-300/20 bg-amber-300/[0.06] text-amber-200"
                        : "border-white/[0.06] bg-white/[0.02] text-white/40 hover:border-white/[0.10] hover:text-white/70"
                    }
                  `}
                >
                  <span className="flex items-center gap-1.5">
                    <Settings2 className="h-3.5 w-3.5" />
                    Advanced settings
                  </span>
                  <ChevronRight
                    className={`h-3.5 w-3.5 transition-transform ${
                      showAdvanced ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Error */}
                {error && (
                  <div className="rounded-xl border border-red-300/15 bg-red-300/[0.06] px-3 py-2.5 text-xs text-red-200">
                    {error}
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* ── Footer ── */}
          <div className="relative shrink-0 border-t border-white/[0.06] px-5 py-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5">
                <Sparkles className="h-3 w-3 text-amber-300/55" />
                <span className="text-[11px] text-white/35">
                  {modelLabel}
                </span>
                {modelGenLabel && (
                  <span className="rounded-md border border-white/[0.08] bg-white/[0.06] px-1.5 py-0.5 text-[9px] font-mono font-semibold text-white/60">
                    {modelGenLabel}
                  </span>
                )}
              </div>

              <div className="flex-1" />

              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="
                  h-9 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4
                  text-xs font-medium text-white/50 transition-all
                  hover:bg-white/[0.05] hover:text-white disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                form="gen-form"
                type="submit"
                disabled={loading || done || !prompt.trim()}
                className="
                  flex h-9 items-center gap-2 rounded-xl
                  bg-amber-400 px-5 text-xs font-semibold text-black
                  shadow-[0_4px_16px_rgba(251,191,36,0.2)]
                  transition-all duration-200
                  hover:scale-[1.01] hover:bg-amber-300
                  active:scale-[0.99]
                  disabled:cursor-not-allowed disabled:scale-100 disabled:opacity-50
                "
              >
                {done ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Done!
                  </>
                ) : loading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="h-3.5 w-3.5" />
                    Generate
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Side panel (Advanced settings) ── */}
        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex shrink-0 flex-col border-l border-white/[0.06] bg-white/[0.015]"
              style={{ width: SIDE_PANEL_WIDTH }}
            >
              <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-4">
                <Settings2 className="h-3.5 w-3.5 text-amber-300/70" />
                <span className="text-xs font-semibold text-white/80">
                  Advanced Settings
                </span>
              </div>

              <div className="flex-1 space-y-5 overflow-y-auto px-4 py-4">
                <div>
                  <label className="mb-1.5 block text-xs text-white/50">
                    Title <span className="text-white/25">(optional)</span>
                  </label>

                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Auto-generated from prompt"
                    maxLength={255}
                    className="
                      h-9 w-full rounded-xl border border-white/[0.08]
                      bg-white/[0.03] px-3 text-sm text-white
                      outline-none placeholder:text-white/20
                      transition-all focus:border-amber-300/12
                    "
                  />
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-xs text-white/50">
                      Temperature
                    </label>

                    <span className="text-xs font-mono text-amber-300/70">
                      {temperature.toFixed(1)}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={2}
                    step={0.1}
                    value={temperature}
                    onChange={(e) =>
                      setTemperature(parseFloat(e.target.value))
                    }
                    className="h-1.5 w-full cursor-pointer rounded-full accent-amber-400"
                  />

                  <div className="mt-1 flex justify-between text-[10px] text-white/20">
                    <span>Precise</span>
                    <span>Creative</span>
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-xs text-white/50">
                      Max Length
                    </label>

                    <span className="text-xs font-mono text-blue-300/70">
                      {maxTokens.toLocaleString()} tokens
                    </span>
                  </div>

                  <input
                    type="range"
                    min={MIN_MAX_TOKENS}
                    max={MAX_MAX_TOKENS}
                    step={100}
                    value={maxTokens}
                    onChange={(e) =>
                      setMaxTokens(parseInt(e.target.value, 10))
                    }
                    className="h-1.5 w-full cursor-pointer rounded-full accent-blue-400"
                  />

                  <div className="mt-1 flex justify-between text-[10px] text-white/20">
                    <span>Short</span>
                    <span>Long</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// ─── Model row (used inside each group) ────────────────────────────────────────

function ModelRow({
  model,
  isSelected,
  onSelect,
  accentColor,
  isRecommended,
}: {
  model: PublicModelItem;
  isSelected: boolean;
  onSelect: () => void;
  accentColor?: string;
  isRecommended?: boolean;
}) {
  const genLabel = genLabelFor(model);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`
        flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left
        transition-colors duration-100
        ${
          isSelected
            ? "bg-white/[0.06] text-white"
            : "text-white/55 hover:bg-white/[0.03] hover:text-white/80"
        }
      `}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="truncate text-xs font-semibold">
            {model.public_name}
          </span>

          {genLabel && (
            <span
              className={`
                rounded-md px-1.5 py-0.5 text-[9px] font-mono font-semibold
                bg-white/[0.06] ${accentColor || "text-white/50"}
              `}
            >
              {genLabel}
            </span>
          )}

          {isRecommended && (
            <span className="flex items-center gap-0.5 text-[9px] font-semibold text-amber-400">
              <Star className="h-2.5 w-2.5 fill-current" />
              Recommended
            </span>
          )}
        </div>

        {model.description && (
          <div className="mt-0.5 truncate text-[10px] text-white/35">
            {model.description}
          </div>
        )}
      </div>

      {isSelected && (
        <Check className="h-3.5 w-3.5 shrink-0 text-amber-300" />
      )}
    </button>
  );
}