import React from "react";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";

type Bucket = {
    name: string,
    region: string,
    files: number,
    usage: string,
    status: "active" | "disabled"
};

export function BucketCard({ bucket }: { bucket: Bucket }) {
    return (
        <Card className="rounded-2xl border border-white/10 bg-[#101827]/90 p-6 flex flex-col gap-1 shadow hover:shadow-lg">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-white font-bold text-base">{bucket.name}</span>
                <Badge color={bucket.status === "active" ? "emerald" : "slate"}>{bucket.status}</Badge>
            </div>
            <div className="flex gap-4 items-center text-xs text-slate-400 mb-1">
                <span>Region: <span className="font-bold text-white">{bucket.region}</span></span>
                <span>| Files: <span className="font-bold text-white">{bucket.files}</span></span>
                <span>| Usage: <span className="font-bold text-white">{bucket.usage}</span></span>
            </div>
        </Card>
    );
}