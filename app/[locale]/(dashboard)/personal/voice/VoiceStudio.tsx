"use client";
import React from "react";

export default function VoiceStudio({
    stats,
    actions,
    toolbar,
    history,
    children,
}: {
    stats?: React.ReactNode;
    actions?: React.ReactNode;
    toolbar?: React.ReactNode;
    history?: React.ReactNode;
    children?: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-4 w-full">
            {stats}
            {actions}
            {toolbar}
            {children}
            {history}
        </div>
    );
}