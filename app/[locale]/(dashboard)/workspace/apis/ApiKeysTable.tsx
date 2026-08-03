import React from "react";
import { KeyRound, Copy, ShieldOff } from "lucide-react";

type ApiKey = {
  id:        string;
  label:     string;
  key:       string;
  createdAt: string;
  status:    "active" | "revoked";
  rawId:     number;
};

export function ApiKeysTable({
  keys,
  onRevoke,
}: {
  keys:     ApiKey[];
  onRevoke: (id: string) => void;
}) {
  if (!keys.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 rounded-2xl border border-white/[0.06] bg-[#0d0d10]/95">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02]">
          <KeyRound className="w-6 h-6 text-white/20" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-white/40">No API keys yet</p>
          <p className="text-xs text-white/20 mt-1">Create your first API key to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d10]/95 backdrop-blur-xl overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/[0.05]">
            <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-white/25">Name</th>
            <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-white/25">Key</th>
            <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-white/25">Status</th>
            <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-white/25">Created</th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody>
          {keys.map((key) => (
            <tr
              key={key.id}
              className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
            >
              {/* Name */}
              <td className="px-5 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.04]">
                    <KeyRound className="w-3.5 h-3.5 text-white/30" />
                  </div>
                  <span className="text-[13px] font-medium text-white">{key.label}</span>
                </div>
              </td>

              {/* Key */}
              <td className="px-5 py-3">
                <div className="flex items-center gap-2">
                  <code className="text-[12px] font-mono text-white/40">{key.key}</code>
                  {key.status === "active" && (
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(key.key)}
                      className="text-white/20 hover:text-white/60 transition-all"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </td>

              {/* Status */}
              <td className="px-5 py-3">
                <span className={`
                  flex items-center gap-1.5 w-fit px-2 py-0.5 rounded-full border text-[10px] font-medium
                  ${key.status === "active"
                    ? "bg-emerald-500/10 border-emerald-400/20 text-emerald-300"
                    : "bg-white/[0.04] border-white/[0.08] text-white/25"
                  }
                `}>
                  <span className={`w-1.5 h-1.5 rounded-full ${key.status === "active" ? "bg-emerald-400" : "bg-white/20"}`} />
                  {key.status === "active" ? "Active" : "Revoked"}
                </span>
              </td>

              {/* Created */}
              <td className="px-5 py-3 text-[12px] text-white/30">
                {key.createdAt}
              </td>

              {/* Action */}
              <td className="px-5 py-3">
                {key.status === "active" ? (
                  <button
                    type="button"
                    onClick={() => onRevoke(key.id)}
                    className="flex items-center gap-1.5 h-7 px-3 rounded-lg border border-white/[0.08] text-[11px] text-white/40 hover:text-red-400 hover:border-red-400/20 hover:bg-red-500/10 transition-all"
                  >
                    <ShieldOff className="w-3 h-3" />
                    Revoke
                  </button>
                ) : (
                  <span className="text-[11px] text-white/20">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}