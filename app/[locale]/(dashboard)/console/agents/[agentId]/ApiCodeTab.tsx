"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Copy, ExternalLink, KeyRound } from "lucide-react";

// ─── Config ───────────────────────────────────────────────────────────────────

const API_BASE =
  process.env.NEXT_PUBLIC_QXT_API_BASE_URL || "https://api.openqcore.com";

type Lang = "curl" | "python" | "javascript";

const LANG_LABELS: Record<Lang, string> = {
  curl: "cURL",
  python: "Python",
  javascript: "JavaScript",
};

// ─── Snippet builders ─────────────────────────────────────────────────────────

function buildCurl(agentId: string): string {
  return `curl -X POST "${API_BASE}/api/v1/console/agents/${agentId}/chat" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "Hello, what can you help me with?"
  }'`;
}

function buildPython(agentId: string): string {
  return `import requests

response = requests.post(
    "${API_BASE}/api/v1/console/agents/${agentId}/chat",
    headers={
        "X-API-Key": "YOUR_API_KEY",
        "Content-Type": "application/json",
    },
    json={
        "message": "Hello, what can you help me with?"
    },
)

data = response.json()
print(data["result"])`;
}

function buildJavaScript(agentId: string): string {
  return `const response = await fetch(
  "${API_BASE}/api/v1/console/agents/${agentId}/chat",
  {
    method: "POST",
    headers: {
      "X-API-Key": "YOUR_API_KEY",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "Hello, what can you help me with?",
    }),
  }
);

const data = await response.json();
console.log(data.result);`;
}

// ─── Copy button ──────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-[11px] font-medium text-white/50 transition-all hover:bg-white/[0.06] hover:text-white"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3 text-emerald-300" /> Copied
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" /> Copy
        </>
      )}
    </button>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ApiCodeTab({ agentId }: { agentId: string }) {
  const [lang, setLang] = useState<Lang>("curl");

  const snippets: Record<Lang, string> = {
    curl: buildCurl(agentId),
    python: buildPython(agentId),
    javascript: buildJavaScript(agentId),
  };

  return (
    <div className="space-y-4">
      {/* Endpoint reference */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#0f1012]/92 p-5 backdrop-blur-xl">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/35">
          Endpoint
        </h3>
        <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5">
          <span className="rounded-md bg-emerald-300/[0.12] px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
            POST
          </span>
          <code className="text-xs text-white/70 font-mono">
            /api/v1/console/agents/{agentId}/chat
          </code>
        </div>
      </div>

      {/* API key notice */}
      <div className="flex items-center gap-3 rounded-2xl border border-amber-300/10 bg-amber-300/[0.06] p-4">
        <KeyRound className="h-4 w-4 shrink-0 text-amber-300" />
        <p className="flex-1 text-xs text-amber-100/80">
          Replace <code className="font-mono">YOUR_API_KEY</code> with a real key from your API Keys page.
        </p>
        <Link
          href="/console/api-keys"
          className="flex items-center gap-1 text-xs font-medium text-amber-200 transition-all hover:text-amber-100"
        >
          Get a key <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      {/* Code snippet */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#0f1012]/92 overflow-hidden backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
          <div className="flex gap-1">
            {(Object.keys(LANG_LABELS) as Lang[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setLang(key)}
                className={`
                  rounded-lg px-3 py-1.5 text-xs font-medium transition-all
                  ${lang === key
                    ? "bg-amber-300/[0.10] text-amber-200 border border-amber-300/20"
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                  }
                `}
              >
                {LANG_LABELS[key]}
              </button>
            ))}
          </div>

          <CopyButton text={snippets[lang]} />
        </div>

        <pre className="overflow-x-auto p-4 text-xs leading-6 text-white/75 font-mono">
          {snippets[lang]}
        </pre>
      </div>

      {/* Response shape */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#0f1012]/92 p-5 backdrop-blur-xl">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/35">
          Response
        </h3>
        <pre className="overflow-x-auto text-xs leading-6 text-white/60 font-mono">
{`{
  "success": true,
  "agent_id": "${agentId}",
  "session_id": "...",
  "result": {
    "content": "The agent's reply text..."
  }
}`}
        </pre>
      </div>
    </div>
  );
}
