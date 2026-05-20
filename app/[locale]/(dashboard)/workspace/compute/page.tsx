"use client";
import React from "react";
import { ClusterCard } from "./ClusterCard";
import { NodeStatusGrid } from "./NodeStatusGrid";
import { RegionMap } from "./RegionMap";
import { ComputeUsageChart } from "./ComputeUsageChart";
import { DeploymentLogs } from "./DeploymentLogs";

const DUMMY_CLUSTERS = [
    { name: "Main Compute", region: "us-east-1", status: "operational" as const, nodes: 8, updated: "2 min ago" },
    { name: "NLP-Research", region: "eu-west-1", status: "maintenance" as const, nodes: 4, updated: "25 min ago" },
];
const DUMMY_NODES = [
    { id: "1", type: "CPU-Standard", status: "running" as const, cpu: "98%", gpu: "—" },
    { id: "2", type: "Nvidia A100", status: "running" as const, cpu: "63%", gpu: "78%" },
    { id: "3", type: "CPU-Standard", status: "pending" as const, cpu: "—", gpu: "—" },
];

export default function InfraPage() {
    return (
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-8 pb-14">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white mb-1">Infrastructure</h1>
                <p className="text-slate-400 mb-4">
                    Monitor infrastructure, clusters, resources, deploys, and hardware in real time.
                </p>
            </div>
            <div className="grid xl:grid-cols-[2fr_1fr] gap-9">
                <div className="flex flex-col gap-9">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {DUMMY_CLUSTERS.map(c => <ClusterCard key={c.name} cluster={c} />)}
                    </div>
                    <NodeStatusGrid nodes={DUMMY_NODES} />
                    <ComputeUsageChart />
                </div>
                <div className="flex flex-col gap-9">
                    <RegionMap />
                    <DeploymentLogs />
                </div>
            </div>
        </div>
    );
}