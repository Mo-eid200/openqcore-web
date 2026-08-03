import React from "react";
import { Copy } from "lucide-react";

type Endpoint = {
  method:  "POST" | "GET" | "PUT" | "DELETE";
  path:    string;
  description: string;
  status?: "stable" | "beta" | "deprecated";
};

const methodConfig = {
  POST:   "bg-blue-500/10 border-blue-400/20 text-blue-300",
  GET:    "bg-emerald-500/10 border-emerald-400/20 text-emerald-300",
  PUT:    "bg-amber-500/10 border-amber-400/20 text-amber-300",
  DELETE: "bg-red-500/10 border-red-400/20 text-red-300",
};

const statusConfig = {
  stable:     "bg-emerald-500/10 border-emerald-400/20 text-emerald-300",
  beta:       "bg-cyan-500/10 border-cyan-400/20 text-cyan-300",
  deprecated: "bg-red-500/10 border-red-400/20 text-red-300",
};

export function ApiEndpointCard({ endpoint }: { endpoint: Endpoint }) {
  return (
    <div className="
      relative flex flex-col gap-2.5 p-4
      rounded-2xl border border-white/[0.06]
      bg-[#0d0d10]/95 backdrop-blur-xl
      hover:border-white/[0.10] transition-all
      overflow-hidden group
    ">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Top row */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`
          px-2 py-0.5 rounded-lg border text-[10px] font-bold font-mono
          ${methodConfig[endpoint.method]}
        `}>
          {endpoint.method}
        </span>

        <code className="text-[13px] font-mono text-white flex-1 truncate">
          {endpoint.path}
        </code>

        {endpoint.status && (
          <span className={`
            px-2 py-0.5 rounded-full border text-[10px] font-medium
            ${statusConfig[endpoint.status]}
          `}>
            {endpoint.status}
          </span>
        )}

        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(endpoint.path)}
          className="opacity-0 group-hover:opacity-100 flex h-6 w-6 items-center justify-center rounded-lg text-white/25 hover:text-white hover:bg-white/[0.06] transition-all"
        >
          <Copy className="w-3 h-3" />
        </button>
      </div>

      {/* Description */}
      <p className="text-[12px] text-white/35">{endpoint.description}</p>
    </div>
  );
}