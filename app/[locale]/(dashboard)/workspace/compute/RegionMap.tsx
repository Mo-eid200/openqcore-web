import React from "react";
import { MapPin } from "lucide-react";

type Cluster = {
  id:     string;
  name:   string;
  region: string;
  status: "operational" | "maintenance" | "degraded";
  nodes:  number;
};

const REGION_POSITIONS: Record<string, { x: number; y: number; label: string }> = {
  "us-east-1":    { x: 22,  y: 38,  label: "US East"     },
  "us-west-2":    { x: 12,  y: 35,  label: "US West"     },
  "eu-west-1":    { x: 46,  y: 28,  label: "EU West"     },
  "eu-central-1": { x: 50,  y: 27,  label: "EU Central"  },
  "ap-east-1":    { x: 78,  y: 38,  label: "Asia East"   },
  "ap-south-1":   { x: 68,  y: 45,  label: "Asia South"  },
  "me-south-1":   { x: 58,  y: 42,  label: "Middle East" },
};

const statusColor = {
  operational: "#34d399",
  maintenance: "#22d3ee",
  degraded:    "#f87171",
};

export function RegionMap({ clusters = [] }: { clusters?: Cluster[] }) {
  return (
    <div className="
      relative flex flex-col gap-3 p-5
      rounded-2xl border border-white/[0.06]
      bg-[#0d0d10]/95 backdrop-blur-xl
      overflow-hidden
    ">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <span className="text-[13px] font-semibold text-white">Region Map</span>

      {/* Map */}
      <div className="relative w-full h-[180px] rounded-xl bg-white/[0.02] border border-white/[0.04] overflow-hidden">
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          {[...Array(8)].map((_, i) => (
            <line key={`v${i}`} x1={`${(i + 1) * 12.5}%`} y1="0" x2={`${(i + 1) * 12.5}%`} y2="100%" stroke="white" strokeWidth="1" />
          ))}
          {[...Array(5)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={`${(i + 1) * 16.6}%`} x2="100%" y2={`${(i + 1) * 16.6}%`} stroke="white" strokeWidth="1" />
          ))}
        </svg>

        {/* Clusters */}
        {clusters.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-white/15 text-xs">
            No clusters deployed
          </div>
        ) : (
          clusters.map(c => {
            const pos = REGION_POSITIONS[c.region] ?? { x: 50, y: 50, label: c.region };
            const color = statusColor[c.status] ?? "#ffffff";
            return (
              <div
                key={c.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                {/* Pulse */}
                <div
                  className="absolute inset-0 rounded-full animate-ping opacity-30"
                  style={{ backgroundColor: color, width: 12, height: 12 }}
                />
                {/* Dot */}
                <div
                  className="relative w-3 h-3 rounded-full border-2 border-[#0d0d10]"
                  style={{ backgroundColor: color }}
                />
                {/* Tooltip */}
                <div className="
                  absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                  opacity-0 group-hover:opacity-100 transition-all
                  pointer-events-none z-10
                  bg-[#0d0d10] border border-white/[0.08]
                  rounded-lg px-2 py-1.5 whitespace-nowrap
                ">
                  <div className="text-[11px] font-medium text-white">{c.name}</div>
                  <div className="text-[10px] text-white/40">{pos.label} · {c.nodes} nodes</div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Legend */}
      {clusters.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {clusters.map(c => {
            const color = statusColor[c.status] ?? "#ffffff";
            return (
              <div key={c.id} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-[11px] text-white/40 truncate max-w-[80px]">{c.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}