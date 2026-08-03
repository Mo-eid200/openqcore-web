"use client";

import { useState } from "react";

function CheckIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
      />
    </svg>
  );
}

/**
 * Inline copyable code — for short single-line values shown next to a
 * label (base URL, a single endpoint, a header name).
 */
export function CopyableCode({
  value,
  className = ""
}: {
  value: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API can fail (permissions, insecure context) — fail silently,
      // the value is still visible and selectable for manual copy.
    }
  };

  return (
    <div
      className={`group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#080d18] px-4 py-2.5 ${className}`}
    >
      <code className="min-w-0 flex-1 truncate font-mono text-sm text-slate-200">
        {value}
      </code>

      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy to clipboard"}
        className={`
          flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1.5
          text-xs font-medium transition-all duration-200
          ${
            copied
              ? "border-[#d4af37]/40 bg-[#d4af37]/15 text-[#f2d98d]"
              : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-[#d4af37]/30 hover:bg-[#d4af37]/10 hover:text-[#f2d98d]"
          }
        `}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}

/**
 * Multi-line code block — for longer snippets (curl examples, JSON
 * payloads). Copy button sits in the top-right corner of the block.
 */
export function CopyableCodeBlock({
  code,
  language,
  className = ""
}: {
  code: string;
  language?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fail silently — see note above.
    }
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#080d18] ${className}`}
    >
      <div className="flex items-center justify-between border-b border-white/8 bg-white/[0.02] px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-slate-500">
          {language ?? "text"}
        </span>

        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy to clipboard"}
          className={`
            flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5
            text-xs font-medium transition-all duration-200
            ${
              copied
                ? "border-[#d4af37]/40 bg-[#d4af37]/15 text-[#f2d98d]"
                : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-[#d4af37]/30 hover:bg-[#d4af37]/10 hover:text-[#f2d98d]"
            }
          `}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <pre className="overflow-x-auto p-4">
        <code className="font-mono text-[13px] leading-6 text-slate-200">
          {code}
        </code>
      </pre>
    </div>
  );
}