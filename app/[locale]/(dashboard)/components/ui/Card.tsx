import React from "react";

export function Card({
    className = "",
    children,
}: { className?: string; children: React.ReactNode }) {
    return (
        <div
            className={`rounded-2xl bg-[#111827]/85 border border-white/8 shadow-lg transition ${className}`}
        >
            {children}
        </div>
    );
}

export function CardHeader({
    className = "",
    children,
}: { className?: string; children: React.ReactNode }) {
    return (
        <div className={`px-6 pt-5 pb-4 border-b border-white/7 ${className}`}>
            {children}
        </div>
    );
}

export function CardContent({
    className = "",
    children,
}: { className?: string; children: React.ReactNode }) {
    return (
        <div className={`px-6 py-5 ${className}`}>
            {children}
        </div>
    );
}