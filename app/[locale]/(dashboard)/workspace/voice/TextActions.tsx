"use client";

import { useState } from "react";
import { Copy, Check, FileDown } from "lucide-react";

type Props = {
  text: string;
  filename?: string; // without extension
  children: React.ReactNode;
};

// 🔧 Dependency-free Word export: wraps the text in a minimal HTML
// document and serves it with the "application/msword" MIME type.
// Word (and most word processors) open this natively -- no `docx`
// npm package needed, no backend round-trip required.
function download(text: string, filename: string) {
  const safeText = text
    .split("\n")
    .map((line) => `<p>${line.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</p>`)
    .join("");

  const html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:w="urn:schemas-microsoft-com:office:word"
          xmlns="http://www.w3.org/TR/REC-html40">
    <head><meta charset="utf-8"></head>
    <body>${safeText}</body>
    </html>
  `;

  const blob = new Blob(["\ufeff", html], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function TextActions({ text, filename = "transcript", children }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(e: React.MouseEvent) {
    e.stopPropagation();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleDownload(e: React.MouseEvent) {
    e.stopPropagation();
    download(text, filename);
  }

  if (!text) return <>{children}</>;

  return (
    <div className="group/text relative">
      {children}

      <div
        className="
          absolute top-4- right-0 flex items-center gap-1
          rounded-lg border border-white/10 bg-[#17171c]/95 p-1
          opacity-0 shadow-lg backdrop-blur-sm transition-opacity
          duration-150 group-hover/text:opacity-100
        "
      >
        <button
          type="button"
          onClick={handleCopy}
          title="Copy text"
          className="flex h-6 w-6 items-center justify-center rounded-md text-zinc-400 transition hover:bg-white/10 hover:text-white"
        >
          {copied ? (
            <Check className="h-3 w-3 text-emerald-400" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </button>

        <button
          type="button"
          onClick={handleDownload}
          title="Download as Word"
          className="flex h-6 w-6 items-center justify-center rounded-md text-zinc-400 transition hover:bg-white/10 hover:text-white"
        >
          <FileDown className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}