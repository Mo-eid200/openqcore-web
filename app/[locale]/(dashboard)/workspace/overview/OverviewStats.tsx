import React from "react";
import { Bot, Server, Sparkles } from "lucide-react";
import type { WorkspaceOverviewStats } from "../../../../lib/api/workspace/overview";

interface Props {
  stats?: WorkspaceOverviewStats;
}

function StatCard({
  title, value, icon, sub,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="
      relative flex flex-col gap-3 p-5
      rounded-2xl border border-white/[0.06]
      bg-[#0d0d10]/95 backdrop-blur-xl
      overflow-hidden
    ">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent" />

      <div className="flex items-center justify-between">
        <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/35">{title}</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.05] text-white/50">
          {icon}
        </div>
      </div>

      <div>
        <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
        {sub && <div className="text-[11px] text-white/30 mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

export default function OverviewStats({ stats }: Props) {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Agents"
          value={stats?.active_agents ?? "—"}
          icon={<Bot className="w-4 h-4" />}
        />
        <StatCard
          title="API Requests"
          value={stats ? stats.api_requests.toLocaleString() : "—"}
          icon={<Server className="w-4 h-4" />}
          sub="Last 30 days"
        />
        <StatCard
          title="Compute Usage"
          value={stats ? `${stats.compute_hours.toLocaleString()} hrs` : "—"}
          icon={<Sparkles className="w-4 h-4" />}
        />
        <StatCard
          title="QX Power"
          value={stats ? stats.qx_power.toLocaleString() : "—"}
          icon={
            <Sparkles className="w-4 h-4 text-cyan-400" />
          }
        />
      </div>
    </section>
  );
}