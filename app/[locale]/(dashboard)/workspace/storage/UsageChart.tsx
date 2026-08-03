import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { formatBytes } from "@/app/lib/api/workspace/storage";

const KIND_COLORS: Record<string, string> = {
  image:    "#a855f7",
  document: "#f59e0b",
  video:    "#3b82f6",
  audio:    "#ec4899",
  other:    "#6b7280",
};

const KIND_LABELS: Record<string, string> = {
  image:    "Images",
  document: "Documents",
  video:    "Videos",
  audio:    "Audio",
  other:    "Other",
};

export function UsageChart({
  byKind     = {},
  totalBytes = 0,
}: {
  byKind?:     Record<string, number>;
  totalBytes?: number;
}) {
  const data = Object.entries(byKind)
    .filter(([, v]) => v > 0)
    .map(([kind, bytes]) => ({
      name:  KIND_LABELS[kind] ?? kind,
      value: bytes,
      color: KIND_COLORS[kind] ?? "#6b7280",
    }));

  return (
    <div className="
      relative flex flex-col gap-4 p-5
      rounded-2xl border border-white/[0.06]
      bg-[#0d0d10]/95 backdrop-blur-xl
      overflow-hidden min-h-[220px]
    ">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="flex items-center justify-between">
        <span className="text-[15px] font-semibold text-white">Storage Usage</span>
        <span className="text-[12px] text-white/30">{formatBytes(totalBytes)} total</span>
      </div>

      {data.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-white/20 text-sm py-8">
          No storage data yet
        </div>
      ) : (
        <div className="flex items-center gap-6">
          {/* Pie */}
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background:   "#0d0d10",
                  border:       "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 10,
                  fontSize:     11,
                  color:        "#fff",
                }}
                formatter={(v) => formatBytes(Number(v ?? 0))}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex flex-col gap-2.5 flex-1">
            {data.map((d, i) => (
              <div key={i} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="text-[12px] text-white/50 truncate">{d.name}</span>
                </div>
                <span className="text-[12px] font-medium text-white shrink-0">{formatBytes(d.value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}