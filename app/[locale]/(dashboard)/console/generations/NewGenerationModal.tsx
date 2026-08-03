"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  Zap,
  Loader2,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Code2,
  FileText,
  Languages,
  Lightbulb,
  MessageSquare,
  Wand2,
} from "lucide-react";

import { createGeneration } from "@/app/lib/api/console/generations";
import { useModels } from "@/app/context/ModelsContext";
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
  const { models, selected } = useModels();

  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("");
  const [model, setModel] = useState(selected?.id || "pulse-core");
  const [temperature, setTemperature] = useState(0.7);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ── Sync selected model ─────────────────────────────────────────────────────

  useEffect(() => {
    if (selected?.id) setModel(selected.id);
  }, [selected?.id]);

  // ── Reset ───────────────────────────────────────────────────────────────────

  const reset = () => {
    setPrompt("");
    setTitle("");
    setModel(selected?.id || "pulse-core");
    setTemperature(0.7);
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
    [prompt, title, model, temperature, onCreated]
  ); // eslint-disable-line

  // ── Derived ───────────────────────────────────────────────────────────────

  if (!open) return null;

  const modelLabel =
    models.find((m) => m.id === model)?.public_name || model;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="absolute inset-0" onClick={handleClose} />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="
          relative z-10 flex max-h-[95vh] w-full flex-col overflow-hidden
          rounded-t-3xl border border-white/[0.08]
          bg-[#0f1012]/96 shadow-[0_24px_80px_rgba(0,0,0,0.7)]
          backdrop-blur-2xl
          sm:max-w-[580px] sm:rounded-2xl
        "
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
            <div className="space-y-4 px-5 py-4">
              {/* Templates */}
              <div>
                <p className="mb-2.5 text-[11px] font-medium uppercase tracking-wider text-white/30">
                  Quick Templates
                </p>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {TEMPLATES.map((t) => {
                    const Icon = t.icon;

                    return (
                      <button
                        key={t.label}
                        type="button"
                        onClick={() => applyTemplate(t.prompt)}
                        className={`
                          flex flex-col items-center gap-1.5 rounded-xl border p-2.5
                          text-center transition-all duration-150
                          hover:scale-[1.02] active:scale-[0.98]
                          ${t.bg}
                        `}
                      >
                        <Icon className={`h-4 w-4 ${t.color}`} />
                        <span className={`text-[11px] font-semibold ${t.color}`}>
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
                  rows={4}
                  className="
                    min-h-[100px] w-full resize-none overflow-hidden
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

              {/* Model selector */}
              <div>
                <label className="mb-1.5 block text-xs text-white/50">
                  Model
                </label>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {models.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setModel(m.id)}
                      className={`
                        flex items-center gap-2.5 rounded-xl border px-3 py-2.5
                        text-left transition-all duration-150
                        ${
                          model === m.id
                            ? "border-amber-300/12 bg-amber-300/[0.08] text-white"
                            : "border-white/[0.06] bg-white/[0.02] text-white/50 hover:border-white/[0.10] hover:text-white/70"
                        }
                      `}
                    >
                      <Sparkles
                        className={`h-3.5 w-3.5 shrink-0 ${
                          model === m.id
                            ? "text-amber-300"
                            : "text-white/20"
                        }`}
                      />

                      <div className="min-w-0">
                        <div className="truncate text-xs font-semibold">
                          {m.public_name}
                        </div>
                        <div
                          className={`truncate text-[10px] ${
                            model === m.id
                              ? "text-white/40"
                              : "text-white/20"
                          }`}
                        >
                          {m.provider || "AI Model"}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowAdvanced((p) => !p)}
                  className="flex items-center gap-1.5 text-xs text-white/30 transition-colors hover:text-white/60"
                >
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${
                      showAdvanced ? "rotate-180" : ""
                    }`}
                  />
                  Advanced settings
                </button>

                {showAdvanced && (
                  <div className="mt-3 space-y-3 border-t border-white/[0.05] pt-3">
                    {/* Title */}
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

                    {/* Temperature */}
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
                  </div>
                )}
              </div>

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
            {/* Model pill */}
            <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5">
              <Sparkles className="h-3 w-3 text-amber-300/55" />
              <span className="text-[11px] text-white/35">
                {modelLabel}
              </span>
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
      </motion.div>
    </div>
  );
}