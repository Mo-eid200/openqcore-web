import React from "react";
import { ActivityCard } from "./ActivityCard";

type Activity = Parameters<typeof ActivityCard>[0]["activity"];

export function ActivityTimeline({ activities }: { activities: Activity[] }) {
    return (
        <div className="flex flex-col gap-6 relative">
            {activities.map((activity, idx) => (
                <div key={activity.id} className="relative pl-5">
                    {/* Timeline Dot */}
                    <span className={`
            absolute left-0 top-5 w-3 h-3 rounded-full
            ${activity.status === "success" ? "bg-emerald-400" :
                            activity.status === "danger" ? "bg-rose-400" :
                                "bg-cyan-400"}
            ring-2 ring-offset-2 ring-white/15
          `} />
                    <ActivityCard activity={activity} />
                    {/* Timeline Line (except last) */}
                    {idx !== activities.length - 1 && (
                        <span className="absolute left-1.5 top-8 h-[calc(100%-2rem)] w-0.5 bg-gradient-to-b from-[#e0e7ef33] to-transparent" />
                    )}
                </div>
            ))}
        </div>
    );
}