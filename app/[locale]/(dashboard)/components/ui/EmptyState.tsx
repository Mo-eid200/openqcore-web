import React from "react";

export function EmptyState({
    icon,
    title,
    description,
    children,
    action,
}: {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: React.ReactNode;
    children?: React.ReactNode;
}) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            {icon && <div className="mb-5">{icon}</div>}
            <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
            {description && <div className="mb-2 text-slate-400">{description}</div>}
            {children}
            {action && <div className="mt-3">{action}</div>}
        </div>
    );
}