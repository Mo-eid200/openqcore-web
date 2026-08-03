import React from "react";

export function PageHeader({
    title,
    description,
    icon,
    iconBg,
}: {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    iconBg?: string;
}) {
    return (
        <div className="mb-8 flex items-center gap-5">
            {icon && (
                <div className={`w-14 h-14 flex items-center justify-center rounded-xl ${iconBg ?? "bg-gradient-to-tr from-[#d4af37] to-[#ffe08c]"}`}>
                    {icon}
                </div>
            )}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">{title}</h1>
                {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
            </div>
        </div>
    );
}