"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  Loader2,
  CheckCircle2,
  Volume2,
  Mic,
  Upload,
  FileAudio,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import {
  getVoiceOptions,
  createTTS,
  createSTT,
  type VoiceItem,
} from "@/app/lib/api/console/voice";
import VoiceSelect from "./VoiceSelect";

type Mode = "tts" | "stt";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated: (item: VoiceItem) => void;
};

export default function NewVoiceModal({ open, onClose, onCreated }: Props) {
  const [mode, setMode] = useState<Mode>("tts");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [voiceOptionId, setVoiceOptionId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const { data: voices } = useQuery({
    queryKey: ["voice-options", mode],
    queryFn: () => getVoiceOptions(mode),
    staleTime: 60_000,
    enabled: open,
  });

  const reset = () => {
    setText("");
    setFile(null);
    setVoiceOptionId(null);
    setTitle("");
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

  const handleModeChange = (next: Mode) => {
    setMode(next);
    setVoiceOptionId(null);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (mode === "tts" && !text.trim()) return;
    if (mode === "stt" && !file) return;

    setLoading(true);

    try {
      const item =
        mode === "tts"
          ? await createTTS({
              text: text.trim(),
              voice_option_id: voiceOptionId || undefined,
              title: title.trim() || undefined,
            })
          : await createSTT(file!, voiceOptionId || undefined, title.trim() || undefined);

      setDone(true);
      setTimeout(() => {
        onCreated(item);
        handleClose();
      }, 900);
    } catch (err: any) {
      setError(err?.response?.data?.detail || err?.message || "Generation failed");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  const canSubmit = mode === "tts" ? text.trim().length > 0 : !!file;

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
          relative z-10 flex max-h-[85vh] w-full flex-col overflow-hidden
          rounded-t-3xl border border-white/[0.08]
          bg-[#0f1012]/96 shadow-[0_24px_80px_rgba(0,0,0,0.7)]
          backdrop-blur-2xl
          sm:max-w-[520px] sm:rounded-2xl
        "
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-50px] top-[-60px] h-[160px] w-[160px] rounded-full bg-amber-300/[0.05] blur-[80px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.025),transparent_34%)]" />
        </div>

        {/* Header */}
        <div className="relative flex shrink-0 items-center justify-between border-b border-white/[0.06] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.05] bg-amber-300/[0.08] text-amber-300">
              {mode === "tts" ? <Volume2 className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">New Voice Clip</h2>
              <p className="mt-0.5 text-xs text-white/35">
                Generate speech or transcribe audio
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

        {/* Body */}
        <div className="relative flex-1 overflow-y-auto">
          <form id="voice-form" onSubmit={handleSubmit}>
            <div className="space-y-4 px-5 py-4">
              {/* Mode switch */}
              <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-1">
                <button
                  type="button"
                  onClick={() => handleModeChange("tts")}
                  className={`
                    flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold
                    transition-all
                    ${mode === "tts"
                      ? "bg-amber-300/[0.12] text-amber-200 border border-amber-300/20"
                      : "text-white/40 hover:text-white/70"
                    }
                  `}
                >
                  <Volume2 className="h-3.5 w-3.5" />
                  Text-to-Speech
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange("stt")}
                  className={`
                    flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold
                    transition-all
                    ${mode === "stt"
                      ? "bg-amber-300/[0.12] text-amber-200 border border-amber-300/20"
                      : "text-white/40 hover:text-white/70"
                    }
                  `}
                >
                  <Mic className="h-3.5 w-3.5" />
                  Transcribe
                </button>
              </div>

              {/* TTS input */}
              {mode === "tts" && (
                <div>
                  <label className="mb-1.5 block text-xs text-white/50">
                    Text <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type what you want spoken..."
                    required
                    rows={4}
                    maxLength={5000}
                    className="
                      min-h-[100px] w-full resize-none rounded-xl border border-white/[0.08]
                      bg-white/[0.03] px-3 py-2.5 text-sm text-white
                      leading-relaxed outline-none placeholder:text-white/20
                      transition-all focus:border-amber-300/12 focus:bg-white/[0.05]
                    "
                  />
                  <div className="mt-1 flex justify-end">
                    <span className="text-[10px] text-white/20">{text.length} / 5000</span>
                  </div>
                </div>
              )}

              {/* STT input */}
              {mode === "stt" && (
                <div>
                  <label className="mb-1.5 block text-xs text-white/50">
                    Audio File <span className="text-red-400">*</span>
                  </label>

                  <label
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragActive(false);
                      const f = e.dataTransfer.files?.[0];
                      if (f) setFile(f);
                    }}
                    className={`
                      flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed
                      px-4 py-8 text-center cursor-pointer transition-all
                      ${dragActive
                        ? "border-amber-300/40 bg-amber-300/[0.06]"
                        : "border-white/[0.10] bg-white/[0.02] hover:border-white/[0.18]"
                      }
                    `}
                  >
                    <input
                      type="file"
                      accept="audio/*"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />

                    {file ? (
                      <>
                        <FileAudio className="h-6 w-6 text-amber-300/70" />
                        <span className="text-xs font-medium text-white/80">{file.name}</span>
                        <span className="text-[10px] text-white/35">
                          {(file.size / 1024 / 1024).toFixed(1)} MB — click to change
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-6 w-6 text-white/25" />
                        <span className="text-xs text-white/50">
                          Drag & drop an audio file, or click to browse
                        </span>
                      </>
                    )}
                  </label>
                </div>
              )}

              {/* Voice picker — now VoiceSelect (search + grouped by
                  language), matching the workspace version -- the
                  flat pill-button grid was unusable once 150+ Azure
                  voices were seeded. */}
              <div>
                <label className="mb-1.5 block text-xs text-white/50">
                  {mode === "tts" ? "Voice" : "Model"}{" "}
                  <span className="text-white/25">(optional — uses your default)</span>
                </label>

                <VoiceSelect
                  value={voiceOptionId || ""}
                  placeholder="Use your default"
                  options={(voices ?? []).map((v) => ({ id: v.id, label: v.public_name }))}
                  onChange={(id) => setVoiceOptionId(id || null)}
                  disabled={(voices ?? []).length === 0}
                />
              </div>

              {/* Title */}
              <div>
                <label className="mb-1.5 block text-xs text-white/50">
                  Title <span className="text-white/25">(optional)</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Auto-generated"
                  maxLength={255}
                  className="
                    h-9 w-full rounded-xl border border-white/[0.08]
                    bg-white/[0.03] px-3 text-sm text-white
                    outline-none placeholder:text-white/20
                    transition-all focus:border-amber-300/12
                  "
                />
              </div>

              {error && (
                <div className="rounded-xl border border-red-300/15 bg-red-300/[0.06] px-3 py-2.5 text-xs text-red-200">
                  {error}
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="relative shrink-0 border-t border-white/[0.06] px-5 py-4">
          <div className="flex items-center gap-2">
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
              form="voice-form"
              type="submit"
              disabled={loading || done || !canSubmit}
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
                  Processing...
                </>
              ) : (
                <>
                  {mode === "tts" ? <Volume2 className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
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