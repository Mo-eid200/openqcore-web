"use client";

import React from "react";

export default function SidebarGroup({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className="
                flex flex-col
            "
        >
            {children}
        </div>
    );
}