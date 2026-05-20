"use client";

import React, { useEffect, useRef, useState } from "react";

import {
    ChevronDown,
    LogOut,
    CreditCard,
    Shield,
    KeyRound,
    Settings,
} from "lucide-react";

export default function UserMenu() {
    const [open, setOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleOpen = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setOpen(true);
    };

    const handleClose = () => {
        timeoutRef.current = setTimeout(() => {
            setOpen(false);
        }, 180);
    };

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        }

        window.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    return (
        <div
            ref={menuRef}
            className="relative"
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
        >
            {/* TRIGGER */}
            <button
                className="
                    flex
                    items-center
                    gap-2

                    h-10

                    px-2

                    rounded-xl

                    hover:bg-white/[0.04]

                    transition-all
                    duration-200

                    cursor-pointer
                "
            >
                {/* AVATAR */}
                <div
                    className="
                        relative

                        w-8
                        h-8

                        rounded-full

                        bg-gradient-to-br
                        from-[#d6c28a]
                        to-[#8e7440]

                        flex
                        items-center
                        justify-center

                        text-black
                        text-[12px]
                        font-semibold
                    "
                >
                    M

                    {/* STATUS */}
                    <div
                        className="
                            absolute
                            bottom-0
                            right-0

                            w-2
                            h-2

                            rounded-full

                            bg-emerald-400

                            border
                            border-[#0b1020]
                        "
                    />
                </div>

                {/* NAME */}
                <div
                    className="
                        hidden
                        lg:flex

                        items-center
                        gap-1
                    "
                >
                    <span
                        className="
                            text-[13px]
                            font-medium

                            text-white/88
                        "
                    >
                        Mohamed
                    </span>

                    <ChevronDown
                        className={`
                            w-4
                            h-4

                            text-white/35

                            transition-transform
                            duration-200

                            ${open ? "rotate-180" : ""}
                        `}
                    />
                </div>
            </button>

            {/* MENU */}
            <div
                className={`
                    absolute
                    right-0
                    top-[calc(100%+8px)]

                    w-[240px]

                    rounded-2xl

                    border border-white/[0.06]

                    bg-[#111318]/92

                    backdrop-blur-2xl

                    shadow-[0_10px_40px_rgba(0,0,0,0.45)]

                    overflow-hidden

                    transition-all
                    duration-200

                    origin-top-right

                    z-[999]

                    ${open
                        ? `
                            opacity-100
                            scale-100
                            translate-y-0
                            pointer-events-auto
                        `
                        : `
                            opacity-0
                            scale-[0.98]
                            -translate-y-1
                            pointer-events-none
                        `
                    }
                `}
            >
                {/* USER INFO */}
                <div
                    className="
                        px-4
                        py-3

                        border-b border-white/[0.05]
                    "
                >
                    <div
                        className="
                            text-[13px]
                            font-medium

                            text-white
                        "
                    >
                        Mohamed Eid
                    </div>

                    <div
                        className="
                            mt-0.5

                            text-[12px]

                            text-white/38
                        "
                    >
                        founder@openqcore.ai
                    </div>
                </div>

                {/* ITEMS */}
                <div className="p-1.5">
                    <MenuItem
                        icon={CreditCard}
                        label="Billing"
                    />

                    <MenuItem
                        icon={KeyRound}
                        label="API Keys"
                    />

                    <MenuItem
                        icon={Shield}
                        label="Security"
                    />

                    <MenuItem
                        icon={Settings}
                        label="Settings"
                    />
                </div>

                {/* FOOTER */}
                <div
                    className="
                        p-1.5

                        border-t border-white/[0.05]
                    "
                >
                    <MenuItem
                        icon={LogOut}
                        label="Log out"
                        danger
                    />
                </div>
            </div>
        </div>
    );
}

type MenuItemProps = {
    icon: React.ElementType;
    label: string;
    danger?: boolean;
};

function MenuItem({
    icon: Icon,
    label,
    danger,
}: MenuItemProps) {
    return (
        <button
            className={`
                w-full

                flex
                items-center
                gap-3

                px-3
                py-2.5

                rounded-xl

                transition-all
                duration-150

                cursor-pointer

                group

                ${danger
                    ? `
                        text-red-400

                        hover:bg-red-500/[0.08]
                    `
                    : `
                        text-white/72

                        hover:bg-white/[0.045]
                        hover:text-white
                    `
                }
            `}
        >
            <Icon className="w-4 h-4 opacity-80" />

            <span
                className="
                    text-[13px]
                    font-medium
                "
            >
                {label}
            </span>
        </button>
    );
}