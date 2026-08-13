"use client";

import { useEffect, useMemo, useState } from "react";
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
import { createSTT, createTTS } from "../../../../lib/api/workspace/voice";
import type { NewVoiceModalProps } from "./types";
import VoiceSelect from "./VoiceSelect";

export default function NewVoiceModal({
  open,
  mode,
  workspaceId,
  options,
  defaultTTS,
  defaultSTT,
  onClose,
  onCreated,
}: NewVoiceModalProps) {
  const [activeMode, setActiveMode] = useState(mode);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [voiceOptionId, setVoiceOptionId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (!open) return;

    setActiveMode(mode);
    setVoiceOptionId("");
    setFile(null);
    setError(null);
    setDone(false);
  }, [mode, open]);

  const ttsOptions = useMemo(
    () =>
      options
        .filter((o) => o.capability === "tts" && o.is_active)
        .map((o) => ({ id: o.id, label: o.public_name })),
    [options]
  );

  const sttOptions = useMemo(
    () =>
      options
        .filter((o) => o.capability === "stt" && o.is_active)
        .map((o) => ({ id: o.id, label: o.public_name })),
    [options]
  );

  const hasTTSSelection = Boolean(voiceOptionId || defaultTTS?.id);
  const hasSTTSelection = Boolean(voiceOptionId || defaultSTT?.id);

  const canSubmitTTS =
    !!workspaceId &&
    !!text.trim() &&
    (ttsOptions.length > 0 || !!defaultTTS?.id);

  const canSubmitSTT =
    !!workspaceId &&
    !!file &&
    (sttOptions.length > 0 || !!defaultSTT?.id);

  const handleClose = () => {
    if (!submitting) onClose();
  };

  const handleModeChange = (next: "tts" | "stt") => {
    setActiveMode(next);
    setVoiceOptionId("");
    setError(null);
  };

  if (!open) return null;

  async function handleSubmit() {
    try {
      setSubmitting(true);
      setError(null);

      if (!workspaceId) {
        setError("No workspace selected.");
        return;
      }

      if (activeMode === "tts") {
        if (!text.trim()) {
          setError("Please enter text to generate speech.");
          return;
        }

        if (!hasTTSSelection && ttsOptions.length === 0) {
          setError("No active TTS voice is available for this workspace.");
          return;
        }

        await createTTS(workspaceId, {
          text: text.trim(),
          title: title.trim() || undefined,
          voice_option_id: voiceOptionId || defaultTTS?.id || undefined,
        });
      } else {
        if (!file) {
          setError("Please upload an audio file.");
          return;
        }

        if (!hasSTTSelection && sttOptions.length === 0) {
          setError("No active STT option is available for this workspace.");
          return;
        }

        await createSTT(
          workspaceId,
          file,
          voiceOptionId || defaultSTT?.id || undefined,
          title.trim() || undefined
        );
      }

      setDone(true);

      setTimeout(async () => {
        setText("");
        setTitle("");
        setVoiceOptionId("");
        setFile(null);
        await onCreated();
        onClose();
      }, 700);
    } catch (err: any) {
      console.error("Voice create failed:", err);

      setError(
        err?.response?.data?.detail ||
          err?.response?.data?.message ||
          err?.message ||
          "Failed to create voice job."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const canSubmit = activeMode === "tts" ? canSubmitTTS : canSubmitSTT;

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
          relative z-10 flex max-h-[88vh] w-full flex-col overflow-hidden
          rounded-t-3xl border border-white/[0.08]
          bg-[#0f1012]/96 shadow-[0_24px_80px_rgba(0,0,0,0.7)]
          backdrop-blur-2xl
          sm:max-w-[560px] sm:rounded-2xl
        "
      >
        {/* Atmosphere -- red, workspace scope */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-50px] top-[-60px] h-[160px] w-[160px] rounded-full bg-red-500/[0.06] blur-[80px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.025),transparent_34%)]" />
        </div>

        {/* Header */}
        <div className="relative flex shrink-0 items-center justify-between border-b border-white/[0.06] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/[0.10] text-red-400">
              {activeMode === "tts" ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">
                New Voice Job
              </h2>
              <p className="mt-0.5 text-xs text-white/35">
                Generate speech or transcribe audio for this workspace
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            disabled={submitting}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white/25 transition-all hover:bg-white/[0.06] hover:text-white/60 disabled:opacity-40"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Body */}
        <div className="relative flex-1 overflow-y-auto">
          <div className="space-y-4 px-5 py-4">
            {/* Mode switch */}
            <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-1">
              <button
                type="button"
                onClick={() => handleModeChange("tts")}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all ${
                  activeMode === "tts"
                    ? "border border-red-500/25 bg-red-500/[0.12] text-red-300"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                <Volume2 className="h-3.5 w-3.5" />
                Text to Speech
              </button>
              <button
                type="button"
                onClick={() => handleModeChange("stt")}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all ${
                  activeMode === "stt"
                    ? "border border-red-500/25 bg-red-500/[0.12] text-red-300"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                <Mic className="h-3.5 w-3.5" />
                Speech to Text
              </button>
            </div>

            {/* Title */}
            <div>
              <label className="mb-1.5 block text-xs text-white/50">
                Title <span className="text-white/25">(optional)</span>
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Auto-generated"
                maxLength={255}
                className="h-11 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-white outline-none placeholder:text-white/20 transition-all focus:border-red-500/25 focus:bg-white/[0.05]"
              />
            </div>

            {activeMode === "tts" ? (
              <>
                <div>
                  <label className="mb-1.5 block text-xs text-white/50">
                    Text <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter the text to convert to speech..."
                    rows={6}
                    maxLength={5000}
                    className="w-full resize-none rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm leading-relaxed text-white outline-none placeholder:text-white/20 transition-all focus:border-red-500/25 focus:bg-white/[0.05]"
                  />
                  <div className="mt-1 flex justify-end">
                    <span className="text-[10px] text-white/20">
                      {text.length} / 5000
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs text-white/50">
                    Voice
                  </label>
                  <VoiceSelect
                    value={voiceOptionId}
                    placeholder={
                      defaultTTS?.public_name
                        ? `Use default TTS voice (${defaultTTS.public_name})`
                        : ttsOptions.length
                        ? "Select TTS voice"
                        : "No active TTS voices available"
                    }
                    options={ttsOptions}
                    onChange={setVoiceOptionId}
                    disabled={ttsOptions.length === 0}
                  />
                </div>
              </>
            ) : (
              <>
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
                    className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-all ${
                      dragActive
                        ? "border-red-500/40 bg-red-500/[0.06]"
                        : "border-white/[0.10] bg-white/[0.02] hover:border-white/[0.18]"
                    }`}
                  >
                    <input
                      type="file"
                      accept="audio/*"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />

                    {file ? (
                      <>
                        <FileAudio className="h-6 w-6 text-red-400/70" />
                        <span className="text-xs font-medium text-white/80">
                          {file.name}
                        </span>
                        <span className="text-[10px] text-white/35">
                          {(file.size / 1024 / 1024).toFixed(1)} MB — click to
                          change
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

                <div>
                  <label className="mb-1.5 block text-xs text-white/50">
                    Model
                  </label>
                  <VoiceSelect
                    value={voiceOptionId}
                    placeholder={
                      defaultSTT?.public_name
                        ? `Use default STT option (${defaultSTT.public_name})`
                        : sttOptions.length
                        ? "Select STT option"
                        : "No active STT options available"
                    }
                    options={sttOptions}
                    onChange={setVoiceOptionId}
                    disabled={sttOptions.length === 0}
                  />
                </div>
              </>
            )}

            {error && (
              <div className="rounded-xl border border-red-500/15 bg-red-500/[0.06] px-3 py-2.5 text-xs text-red-300">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="relative shrink-0 border-t border-white/[0.06] px-5 py-4">
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={submitting}
              className="h-9 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 text-xs font-medium text-white/50 transition-all hover:bg-white/[0.05] hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || done || !canSubmit}
              className="flex h-9 items-center gap-2 rounded-xl bg-red-500 px-5 text-xs font-semibold text-white shadow-[0_4px_16px_rgba(239,68,68,0.25)] transition-all duration-200 hover:scale-[1.01] hover:bg-red-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:scale-100 disabled:opacity-50"
            >
              {done ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Done!
                </>
              ) : submitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Submitting...
                </>
              ) : activeMode === "tts" ? (
                <>
                  <Volume2 className="h-3.5 w-3.5" />
                  Generate voice
                </>
              ) : (
                <>
                  <Mic className="h-3.5 w-3.5" />
                  Transcribe audio
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}