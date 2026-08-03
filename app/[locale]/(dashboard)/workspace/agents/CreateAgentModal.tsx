"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Loader2, Bot, ChevronDown, Check } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAvailableModels } from "@/app/lib/api/workspace/agents";

interface CreatePayload {
  name:         string;
  role:         string;
  description:  string;
  model:        string;
  provider:     string;
  systemPrompt: string;
  temperature:  number;
}

export function CreateAgentModal({
  open, onClose, onCreate, loading = false,
}: {
  open:     boolean;
  onClose:  () => void;
  loading?: boolean;
  onCreate: (payload: CreatePayload) => Promise<void>;
}) {
  const [name,         setName]         = useState("");
  const [role,         setRole]         = useState("");
  const [description,  setDescription]  = useState("");
  const [model,        setModel]        = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [temperature,  setTemperature]  = useState(0.7);
  const [modelOpen,    setModelOpen]    = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: models } = useQuery({
    queryKey:  ["available-models"],
    queryFn:   getAvailableModels,
    staleTime: 5 * 60_000,
    enabled:   open,
  });

  const selectedModel = models?.find(m => m.id === model);

  useEffect(() => {
    if (!modelOpen) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setModelOpen(false);
      }
    }
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [modelOpen]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onCreate({
      name, role, description, systemPrompt, temperature,
      model:    selectedModel?.backend_model ?? model,
      provider: selectedModel?.provider      ?? "openai",
    });
    setName(""); setRole(""); setDescription("");
    setModel(""); setSystemPrompt(""); setTemperature(0.7);
  }

  const inputCls = "w-full h-10 px-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-[13px] text-white placeholder:text-white/25 outline-none transition focus:border-red-500/40 focus:ring-2 focus:ring-red-500/10";
  const labelCls = "text-[11px] font-medium text-white/35 uppercase tracking-wider";
  const fillPct  = (temperature / 2) * 100;

  return createPortal(
    <div
      className="fixed inset-0 z-[999] bg-black/75 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#0d0d10] shadow-[0_40px_120px_rgba(0,0,0,0.8)] max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06] shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10">
            <Bot className="w-4 h-4 text-red-400" />
          </div>
          <span className="text-[15px] font-semibold text-white">New Agent</span>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto flex h-7 w-7 items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/[0.06] transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4 overflow-y-auto">

          {/* Name + Role */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Agent Name *</label>
              <input
                placeholder="e.g. Support Bot"
                value={name}
                onChange={e => setName(e.target.value)}
                className={inputCls}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Role *</label>
              <input
                placeholder="e.g. Customer Support"
                value={role}
                onChange={e => setRole(e.target.value)}
                className={inputCls}
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Description</label>
            <input
              placeholder="What does this agent do?"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className={inputCls}
            />
          </div>

          {/* Model */}
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Model *</label>
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setModelOpen(v => !v)}
                className="w-full h-10 px-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-[13px] text-left flex items-center justify-between gap-2 outline-none transition hover:border-white/[0.15]"
              >
                {selectedModel ? (
                  <div className="flex items-center justify-between flex-1 min-w-0">
                    <span className="text-white truncate">{selectedModel.public_name}</span>
                    <span className="text-white/30 text-[11px] shrink-0 ml-2">{selectedModel.version}</span>
                  </div>
                ) : (
                  <span className="text-white/25">Select a model...</span>
                )}
                <ChevronDown className={`w-3.5 h-3.5 text-white/30 shrink-0 transition-transform ${modelOpen ? "rotate-180" : ""}`} />
              </button>

              {modelOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 rounded-xl border border-white/[0.08] bg-[#0d0d10] shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
                  <div className="max-h-48 overflow-y-auto p-1">
                    {models?.map(m => (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => { setModel(m.id); setModelOpen(false); }}
                        className={`
                          w-full flex items-center justify-between px-3 py-2.5
                          rounded-lg text-left transition-all
                          ${model === m.id
                            ? "bg-red-500/10 text-white"
                            : "text-white/70 hover:bg-white/[0.04] hover:text-white"
                          }
                        `}
                      >
                        <span className="text-[13px]">{m.public_name}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11px] text-white/30">{m.version}</span>
                          {model === m.id && <Check className="w-3 h-3 text-red-400" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* System Prompt */}
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>System Prompt</label>
            <textarea
              placeholder="You are a helpful assistant..."
              value={systemPrompt}
              onChange={e => setSystemPrompt(e.target.value)}
              rows={4}
              className="w-full px-3 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-[13px] text-white placeholder:text-white/25 outline-none transition resize-none focus:border-red-500/40 focus:ring-2 focus:ring-red-500/10"
            />
          </div>

          {/* Temperature */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className={labelCls}>Temperature</label>
              <span className="text-[12px] text-white/40 font-mono">{temperature.toFixed(1)}</span>
            </div>
            <div className="relative h-5 flex items-center">
              <div className="absolute inset-x-0 h-1.5 rounded-full bg-white/[0.08]" />
              <div
                className="absolute left-0 h-1.5 rounded-full bg-gradient-to-r from-blue-500 via-white/60 to-red-500 transition-all pointer-events-none"
                style={{ width: `${fillPct}%` }}
              />
              <input
                type="range" min={0} max={2} step={0.1}
                value={temperature}
                onChange={e => setTemperature(parseFloat(e.target.value))}
                className="relative w-full h-1.5 appearance-none bg-transparent cursor-pointer outline-none
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-white
                  [&::-webkit-slider-thumb]:shadow-[0_0_0_3px_rgba(255,255,255,0.1)]
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:hover:scale-110
                  [&::-moz-range-thumb]:w-4
                  [&::-moz-range-thumb]:h-4
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-white
                  [&::-moz-range-thumb]:border-0
                  [&::-moz-range-thumb]:cursor-pointer
                "
              />
            </div>
            <div className="flex justify-between text-[10px] text-white/20">
              <span>Precise</span>
              <span>Balanced</span>
              <span>Creative</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2 border-t border-white/[0.06]">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="h-9 px-4 rounded-xl text-xs font-medium border border-white/[0.08] bg-transparent text-white/50 hover:text-white hover:bg-white/[0.04] transition-all disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !name.trim() || !role.trim() || !model}
              className="h-9 px-5 rounded-xl text-xs font-semibold bg-red-500 text-white hover:bg-red-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {loading ? "Creating..." : "Create Agent"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}