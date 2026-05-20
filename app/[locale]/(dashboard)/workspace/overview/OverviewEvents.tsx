import React from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Bot } from "lucide-react";

// نموذج بيانات
const events = [
    {
        id: 1,
        icon: <Bot className="w-4 h-4 text-purple-400" />,
        title: "Agent Deployed",
        description: "QCoreAgent-02 deployed to US-East-1.",
        timestamp: "5 min ago",
        status: "success",
    },
    {
        id: 2,
        icon: <Bot className="w-4 h-4 text-cyan-400" />,
        title: "API Key Used",
        description: "API Key x1c7… was used on endpoint /generate.",
        timestamp: "12 min ago",
        status: "info",
    },
    {
        id: 3,
        icon: <Bot className="w-4 h-4 text-rose-400" />,
        title: "Agent Down",
        description: "RealtimeAgent-07 became unresponsive.",
        timestamp: "1 hr ago",
        status: "danger",
    },
];

export default function OverviewEvents() {
    return (
        <section className="w-full">
            <div className="flex flex-col gap-6">
                {events.map((e) => (
                    <Card
                        key={e.id}
                        className="flex flex-col rounded-2xl border border-white/8 bg-[#101827]/85"
                    >
                        <CardHeader className="flex items-center gap-2 py-3 px-5">
                            {e.icon}
                            <span className="text-[15px] font-bold text-white">{e.title}</span>
                            <Badge
                                color={
                                    e.status === "success"
                                        ? "emerald"
                                        : e.status === "danger"
                                            ? "danger"
                                            : "cyan"
                                }
                                className="ml-auto capitalize"
                            >
                                {e.status}
                            </Badge>
                        </CardHeader>
                        <CardContent className="px-5 pb-4 pt-1">
                            <div className="text-slate-300 mb-2">{e.description}</div>
                            <div className="text-xs text-slate-500">{e.timestamp}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}