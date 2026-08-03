import React from "react";
import { Database } from "lucide-react";
import { KnowledgeCard } from "./KnowledgeCard";

type KnowledgeSource = {
  id:         string;
  name:       string;
  type:       string;
  size:       string;
  uploadedAt: string;
  status:     "pending" | "processing" | "processed" | "failed";
  embeddings: number;
};

export function KnowledgeGrid({
  sources,
  workspaceId,
  onCardMenu,
}: {
  sources:      KnowledgeSource[];
  workspaceId:  string;
  onCardMenu?:  (source: KnowledgeSource) => void;
}) {
  if (!sources.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02]">
          <Database className="w-8 h-8 text-white/20" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-white/40">No knowledge sources yet</p>
          <p className="text-xs text-white/20 mt-1">Add your first knowledge source to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sources.map((src, i) => (
        <div
          key={src.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <KnowledgeCard
            source={src}
            workspaceId={workspaceId}
            onMenu={() => onCardMenu?.(src)}
          />
        </div>
      ))}
    </div>
  );
}