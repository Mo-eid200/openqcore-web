import React from "react";
import { ActivityTimeline } from "./ActivityTimeline";
import { ActivityCard }     from "./ActivityCard";
import type { WorkspaceActivityEvent } from "../../../../lib/api/workspace/activity";

interface Props {
  asTimeline?: boolean;
  events?:     WorkspaceActivityEvent[];
}

export function ActivityFeed({ asTimeline = false, events = [] }: Props) {
  if (events.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 text-white/20 text-sm">
        No activity yet
      </div>
    );
  }

  return asTimeline ? (
    <ActivityTimeline activities={events} />
  ) : (
    <div className="flex flex-col gap-4">
      {events.map((e) => (
        <ActivityCard key={e.id} activity={e} />
      ))}
    </div>
  );
}