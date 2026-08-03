import React, { useState } from "react";
import { Database, Trash2, FileText, Globe, Table2, FileJson, Bot } from "lucide-react";
import { LinkKnowledgeModal } from "../components/shared/LinkKnowledgeModal";

type KnowledgeSource = {
  id:         string;
  name:       string;
  type:       string;
  size:       string;
  uploadedAt: string;
  status:     "pending" | "processing" | "processed" | "failed";
  embeddings: number;
};

const statusConfig = {
  processed:  { label: "Ready",      cls: "bg-emerald-500/10 border-emerald-400/20 text-emerald-300", dot: "bg-emerald-400" },
  processing: { label: "Processing", cls: "bg-blue-500/10 border-blue-400/20 text-blue-300",          dot: "bg-blue-400 animate-pulse" },
  pending:    { label: "Pending",    cls: "bg-white/[0.05] border-white/[0.08] text-white/40",        dot: "bg-white/30"  },
  failed:     { label: "Failed",     cls: "bg-red-500/10 border-red-400/20 text-red-300",             dot: "bg-red-400"   },
};

function TypeIcon({ type }: { type: string }) {
  const t = type.toLowerCase();
  const cls = "w-4 h-4 text-white/40";
  if (t === "pdf" || t === "docx" || t === "txt") return <FileText className={cls} />;
  if (t === "web")                                 return <Globe    className={cls} />;
  if (t === "csv" || t === "sql")                  return <Table2   className={cls} />;
  if (t === "json")                                return <FileJson className={cls} />;
  return <Database className={cls} />;
}

export function KnowledgeCard({
  source,
  workspaceId,
  onMenu,
}: {
  source:       KnowledgeSource;
  workspaceId:  string;
  onMenu?:      () => void;
}) {
  const cfg = statusConfig[source.status] ?? statusConfig.pending;
  const [showLinker, setShowLinker] = useState(false);

  return (
    <div className="
      group relative flex flex-col gap-3 p-5
      rounded-2xl border border-white/[0.06]
      bg-[#0d0d10]/95 backdrop-blur-xl
      transition-all duration-200
      hover:border-red-500/20 hover:bg-white/[0.02]
      overflow-hidden
    ">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/10 to-transparent" />

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20">
            <TypeIcon type={source.type} />
          </div>
          <div className="min-w-0">
            <div className="text-[14px] font-semibold text-white truncate">{source.name}</div>
            <div className="text-[11px] text-white/30 font-mono">
              {source.type.toUpperCase()}{source.size && source.size !== "—" ? ` · ${source.size}` : ""}
            </div>
          </div>
        </div>

        {/* Actions on hover */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button
            type="button"
            onClick={() => setShowLinker(true)}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-all"
            title="Link Agents"
          >
            <Bot className="w-3.5 h-3.5" />
          </button>
          {onMenu && (
            <button
              type="button"
              onClick={onMenu}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2">
        <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-medium ${cfg.cls}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-1 border-t border-white/[0.04]">
        <span className="text-[11px] text-white/20">{source.uploadedAt}</span>
      </div>

      <LinkKnowledgeModal
        open={showLinker}
        mode="knowledge"
        workspaceId={workspaceId}
        entityId={source.id}
        entityName={source.name}
        onClose={() => setShowLinker(false)}
      />
    </div>
  );
}