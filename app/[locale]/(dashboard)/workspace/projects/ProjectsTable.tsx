import React from "react";
import { Trash2, ExternalLink } from "lucide-react";

type Project = {
  id:          string;
  name:        string;
  status:      "active" | "paused" | "archived";
  description?: string;
  createdAt?:  string;
};

const statusConfig = {
  active:   "bg-emerald-500/10 border-emerald-400/20 text-emerald-300",
  paused:   "bg-white/[0.05] border-white/[0.08] text-white/40",
  archived: "bg-red-500/10 border-red-400/20 text-red-300",
};

export function ProjectsTable({
  data,
  onOpen,
  onDelete,
}: {
  data:       Project[];
  onOpen?:    (id: string) => void;
  onDelete?:  (id: string) => void;
}) {
  if (!data.length) return null;

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d10]/95 backdrop-blur-xl overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/[0.05]">
            <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-white/25">Name</th>
            <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-white/25">Status</th>
            <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-white/25">Created</th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr
              key={p.id}
              className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
            >
              <td className="px-5 py-3">
                <div className="text-[13px] font-medium text-white">{p.name}</div>
                {p.description && (
                  <div className="text-[11px] text-white/30 mt-0.5 truncate max-w-[200px]">{p.description}</div>
                )}
              </td>

              <td className="px-5 py-3">
                <span className={`px-2 py-0.5 rounded-full border text-[10px] font-medium ${statusConfig[p.status]}`}>
                  {p.status}
                </span>
              </td>

              <td className="px-5 py-3 text-[12px] text-white/30">
                {p.createdAt}
              </td>

              <td className="px-5 py-3">
                <div className="flex items-center justify-end gap-2">
                  {onOpen && (
                    <button
                      type="button"
                      onClick={() => onOpen(p.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/[0.06] transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      type="button"
                      onClick={() => onDelete(p.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}