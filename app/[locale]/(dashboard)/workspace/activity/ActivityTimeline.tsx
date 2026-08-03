import React from "react";
import { ActivityCard } from "./ActivityCard";
import type { WorkspaceActivityEvent } from "../../../../lib/api/workspace/activity";

interface Props {
  activities: WorkspaceActivityEvent[];
}

export function ActivityTimeline({ activities }: Props) {
  if (activities.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 text-white/20 text-sm">
        No activity yet
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 relative">
      {activities.map((activity, idx) => (
        <div key={activity.id} className="relative pl-5">

          {/* Timeline Dot */}
          <span className={`
            absolute left-0 top-5 w-2.5 h-2.5 rounded-full
            ${activity.status === "success" ? "bg-emerald-400" :
              activity.status === "danger"  ? "bg-rose-400"    :
              "bg-cyan-400"}
            ring-2 ring-offset-1 ring-offset-[#0d0d10] ring-white/10
          `} />

          <ActivityCard activity={activity} />

          {/* Timeline Line */}
          {idx !== activities.length - 1 && (
            <span className="absolute left-[4.5px] top-8 h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-white/[0.08] to-transparent" />
          )}
        </div>
      ))}
    </div>
  );
}