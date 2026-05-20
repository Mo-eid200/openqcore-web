import React from "react";
import { StatCard } from "../../components/ui/StatCard";
import { Bot, Server, Sparkles } from "lucide-react";

export default function OverviewStats() {
    return (
        <section className="
      w-full
      py-1
      mb-1
    ">
            <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-6
      ">
                <StatCard
                    title="Active Agents"
                    value="6"
                    icon={<Bot className="w-5 h-5" />}
                    trend="+2"
                    status="up"
                />
                <StatCard
                    title="API Requests"
                    value="8,740"
                    icon={<Server className="w-5 h-5" />}
                    trend="+3.1%"
                    status="up"
                />
                <StatCard
                    title="Compute Usage"
                    value="1,250 hrs"
                    icon={<Sparkles className="w-5 h-5" />}
                    trend="-0.8%"
                    status="down"
                />
                <StatCard
                    title="QX Power"
                    value="12,400"
                    icon={
                        <img
                            src="/qx-power-logo.png"
                            alt="QX Power"
                            className="w-5 h-5"
                            style={{ filter: "drop-shadow(0 0 2px #d4af37CC)" }}
                        />
                    }
                    trend=""
                    status="stable"
                />
            </div>
        </section>
    );
}