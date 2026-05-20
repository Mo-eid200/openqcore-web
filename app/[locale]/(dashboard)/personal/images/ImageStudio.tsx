"use client";
import React from "react";

export default function ImageStudio({
    children,
    stats,
    actions,
    toolbar,
    history,
}: {
    children?: React.ReactNode; // محتوى حر داخل ImageStudio
    stats?: React.ReactNode;    // stats summary أو أرقام عامة (مثلاً: عدد الصور/الميديات)
    actions?: React.ReactNode;  // visual actions (تصفية أو أزرار سريعة)
    toolbar?: React.ReactNode;  // اختياري: place for filters/search
    history?: React.ReactNode;  // history/images grid
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