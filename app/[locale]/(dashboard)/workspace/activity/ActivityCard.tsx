import React from "react";
import { Badge } from "../../components/ui/Badge";

type Activity = {
    id: string;
    type: "agent" | "api" | "system";
    title: string;
    description: string;
    time: string;
    status: "success" | "info" | "danger";
};

export function ActivityCard({ activity }: { activity: Activity }) {
    return (
        <div className="rounded-xl border border-white/10 bg-[#121729]/90 p-5 shadow flex gap-4">
            <div className="flex flex-col items-center mr-1">
                <Badge color={
                    activity.status === "success" ? "emerald" :
                        activity.status === "danger" ? "danger" : "cyan"
                }>
                    {activity.status}
                </Badge>
                <span className="text-xs text-slate-500 mt-2">{activity.time}</span>
            </div>
            <div>
                <div className="font-bold text-white">{activity.title}</div>
                <div className="text-slate-300 text-sm">{activity.description}</div>
            </div>
        </div>
    );
}