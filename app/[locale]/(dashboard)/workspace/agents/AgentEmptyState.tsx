import React from "react";
import { Button } from "../../components/ui/Button";
import { Bot } from "lucide-react";

export function AgentEmptyState({ onCreate }: { onCreate?: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-5">
                <Bot className="w-9 h-9 text-[#d4af37]/70 mx-auto" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">No Agents yet</h2>
            <div className="mb-3 text-slate-400">
                Get started by creating your first agent.
            </div>
            {onCreate && (
                <Button variant="primary" onClick={onCreate}>
                    + New Agent
                </Button>
            )}
        </div>
    );
}