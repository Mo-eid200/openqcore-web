"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Copy, ExternalLink, KeyRound } from "lucide-react";

const API_BASE =
  process.env.NEXT_PUBLIC_QXT_API_BASE_URL || "https://api.openqcore.com";

type Lang = "curl" | "python" | "javascript";

const LANG_LABELS: Record<Lang, string> = {
  curl: "cURL",
  python: "Python",
  javascript: "JavaScript",
};

function buildCurl(workspaceId: string, agentId: string): string {
  return `curl -X POST "${API_BASE}/api/v1/workspaces/${workspaceId}/agents/${agentId}/chat" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "Hello, what can you help me with?"
  }'`;
}

function buildPython(workspaceId: string, agentId: string): string {
  return `import requests

response = requests.post(
    "${API_BASE}/api/v1/workspaces/${workspaceId}/agents/${agentId}/chat",
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

function buildJavaScript(workspaceId: string, agentId: string): string {
  return `const response = await fetch(
  "${API_BASE}/api/v1/workspaces/${workspaceId}/agents/${agentId}/chat",
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

export function ApiCodeTab({ workspaceId, agentId }: { workspaceId: string; agentId: string }) {
  const [lang, setLang] = useState<Lang>("curl");

  const snippets: Record<Lang, string> = {
    curl: buildCurl(workspaceId, agentId),
    python: buildPython(workspaceId, agentId),
    javascript: buildJavaScript(workspaceId, agentId),
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d10]/95 p-5">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/35">
          Endpoint
        </h3>
        <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5">
          <span className="rounded-md bg-emerald-300/[0.12] px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
            POST
          </span>
          <code className="text-xs text-white/70 font-mono break-all">
            /api/v1/workspaces/{workspaceId}/agents/{agentId}/chat
          </code>
        </div>
        <p className="mt-3 text-[11px] text-white/35">
          Any active member of this workspace can use this agent via its
          dashboard chat. This endpoint additionally lets external
          applications — built by anyone on your team or a developer
          you work with — integrate this agent directly.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-red-500/10 bg-red-500/[0.06] p-4">
        <KeyRound className="h-4 w-4 shrink-0 text-red-400" />
        <p className="flex-1 text-xs text-red-100/80">
          Replace <code className="font-mono">YOUR_API_KEY</code> with a real key from your workspace's API Keys page.
        </p>
        <Link
          href="/workspace/apis"
          className="flex items-center gap-1 text-xs font-medium text-red-300 transition-all hover:text-red-200"
        >
          Get a key <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d10]/95 overflow-hidden">
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
                    ? "bg-red-500/[0.10] text-red-300 border border-red-500/20"
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

      <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d10]/95 p-5">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/35">
          Response
        </h3>
        <pre className="overflow-x-auto text-xs leading-6 text-white/60 font-mono">
{`{
  "success": true,
  "agent_id": "${agentId}",
  "workspace_id": "${workspaceId}",
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
