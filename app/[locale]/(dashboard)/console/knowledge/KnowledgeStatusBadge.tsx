"use client";

import React from "react";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
} from "lucide-react";

const STATUS_MAP: Record<
  string,
  {
    text: string;
    icon: React.ElementType;
    cls: string;
    spin?: boolean;
  }
> = {
  processed: {
    text: "Processed",
    icon: CheckCircle2,
    cls: "border-emerald-300/10 bg-emerald-300/[0.08] text-emerald-200",
  },
  processing: {
    text: "Processing",
    icon: Loader2,
    cls: "border-amber-300/10 bg-amber-300/[0.08] text-amber-200",
    spin: true,
  },
  pending: {
    text: "Pending",
    icon: Clock,
    cls: "border-amber-300/10 bg-amber-300/[0.08] text-amber-200",
  },
  failed: {
    text: "Failed",
    icon: AlertCircle,
    cls: "border-red-300/10 bg-red-300/[0.08] text-red-200",
  },
};

export function KnowledgeStatusBadge({
  status,
}: {
  status: string;
}) {
  const s = STATUS_MAP[status] ?? STATUS_MAP.pending;
  const Icon = s.icon;

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full border px-2 py-1
        text-[11px] font-semibold ${s.cls}
      `}
    >
      <Icon
        className={`h-3 w-3 ${s.spin ? "animate-spin" : ""}`}
      />
      {s.text}
    </span>
  );
}