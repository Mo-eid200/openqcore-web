import React from "react";
import { Badge } from "../../components/ui/Badge";
import { Copy } from "lucide-react";

type Endpoint = {
    method: "POST" | "GET" | "PUT" | "DELETE";
    path: string;
    description: string;
    status?: "stable" | "beta" | "deprecated";
};

export function ApiEndpointCard({ endpoint }: { endpoint: Endpoint }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-[#1a2031]/90 px-6 py-5 mb-3 shadow group relative hover:shadow-lg">
            <div className="flex items-center gap-2 mb-3">
                <span className={`
          font-mono text-xs inline-flex items-center px-2.5 py-1.5 rounded-lg 
          ${endpoint.method === "POST" ? "bg-blue-500/10 text-blue-300"
                        : endpoint.method === "GET" ? "bg-emerald-500/10 text-emerald-300"
                            : "bg-slate-600/10 text-slate-300"}
        `}>
                    {endpoint.method}
                </span>
                <span className="font-mono text-[15px] text-white">{endpoint.path}</span>
                {endpoint.status && (
                    <Badge color={endpoint.status === "stable" ? "emerald"
                        : endpoint.status === "beta" ? "cyan"
                            : "danger"} className="ml-2">{endpoint.status}</Badge>
                )}
                <button
                    className="ml-auto p-1 rounded hover:bg-[#ffe68c1a] transition"
                    title="Copy"
                    onClick={() => navigator.clipboard.writeText(endpoint.path)}
                >
                    <Copy className="w-4 h-4 text-[#d4af37]" />
                </button>
            </div>
            <div className="text-slate-400 text-sm">{endpoint.description}</div>
        </div>
    );
}