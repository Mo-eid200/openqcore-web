"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "../../../context/AuthContext";
import { useWorkspace } from "../../../context/WorkspaceContext";

import AuthModal from "./AuthModal";
import { UpgradeModal } from "./UpgradeModal";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type ArrowDownIconProps = {
    className?: string;
};

type ProductLinkProps = {
    href: string;
    product: string;
    engine: string;
    icon: string;
    iconBg: string;
    iconColor: string;
    border: string;
    hover: string;
};

const ArrowDownIcon = ({
    className,
}: ArrowDownIconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className={`w-3.5 h-3.5 ${className || ""}`}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25L12 15.75 4.5 8.25"
        />
    </svg>
);

const ProductLink = ({
    href,
    product,
    engine,
    icon,
    iconBg,
    iconColor,
    border,
    hover,
}: ProductLinkProps) => (
    <Link
        href={href}
        className={`
            group/qxt
            flex items-center gap-3
            rounded-2xl
            p-3
            transition-all duration-200
            ${hover}
        `}
    >
        <div
            className={`
                w-10 h-10
                rounded-xl
                border
                flex items-center justify-center
                text-sm font-semibold
                ${iconBg}
                ${iconColor}
                ${border}
            `}
        >
            {icon}
        </div>

        <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3">
                <div className="text-[14px] font-medium text-white">
                    {product}
                </div>

                <div
                    className="
                        flex items-center gap-1
                        text-[12px]
                        text-slate-500
                        group-hover/qxt:text-white
                        transition-colors
                    "
                >
                    <span>Open</span>

                    <span
                        className="
                            transition-transform duration-200
                            group-hover/qxt:-translate-y-0.5
                            group-hover/qxt:translate-x-0.5
                        "
                    >
                        ↗
                    </span>
                </div>
            </div>

            <div className="mt-0.5 text-[12px] text-slate-400">
                {engine}
            </div>
        </div>
    </Link>
);

export default function RightActions() {

    const router = useRouter();

    const {
        user,
        logout,
    } = useAuth();

    const {
        activeWorkspace,
        workspaces,
        switchWorkspace,
    } = useWorkspace();

    const t =
        useTranslations("right_actions");

    const [authOpen, setAuthOpen] =
        useState(false);

    const [
        upgradeOpen,
        setUpgradeOpen,
    ] = useState(false);

    const workspacePlan =
        activeWorkspace?.plan || null;

    const hasWorkspaceSubscription =
        activeWorkspace?.subscription_status === "active";

    const qxtProducts: ProductLinkProps[] = [
        {
            href: "/qxt/chat",
            product: "ChatQXT",
            engine: "Pulse Engine",
            icon: "Q",
            iconBg: "bg-[#00ffbf]/10",
            iconColor: "text-[#00ffbf]",
            border: "border-[#00ffbf]/15",
            hover: "hover:bg-[#00ffbf]/[0.04]",
        },

        {
            href: "/qxt/research",
            product: "ResearchQXT",
            engine: "Atlas Engine",
            icon: "R",
            iconBg: "bg-[#ff9d00]/10",
            iconColor: "text-[#ff9d00]",
            border: "border-[#ff9d00]/15",
            hover: "hover:bg-[#ff9d00]/[0.04]",
        },

        {
            href: "/qxt/vision",
            product: "VisionQXT",
            engine: "Iris Engine",
            icon: "V",
            iconBg: "bg-[#4f8cff]/10",
            iconColor: "text-[#4f8cff]",
            border: "border-[#4f8cff]/15",
            hover: "hover:bg-[#4f8cff]/[0.04]",
        },

        {
            href: "/qxt/code",
            product: "CodeQXT",
            engine: "Forge Engine",
            icon: "C",
            iconBg: "bg-[#ff5f5f]/10",
            iconColor: "text-[#ff5f5f]",
            border: "border-[#ff5f5f]/15",
            hover: "hover:bg-[#ff5f5f]/[0.04]",
        },

        {
            href: "/qxt/library",
            product: "LibraryQXT",
            engine: "Archive Engine",
            icon: "L",
            iconBg: "bg-[#b26cff]/10",
            iconColor: "text-[#b26cff]",
            border: "border-[#b26cff]/15",
            hover: "hover:bg-[#b26cff]/[0.04]",
        },
    ];

    return (
        <>
            <div className="flex items-center gap-4 shrink-0">

                {/* ACCOUNT */}
                <div className="hidden sm:block">

                    {!user ? (
                        <div className="group">

                            <button
                                type="button"
                                onClick={() =>
                                    setAuthOpen(true)
                                }
                                className="
                                    h-10
                                    px-4

                                    rounded-xl

                                    border border-white/10
                                    bg-white/[0.03]

                                    text-[13px]
                                    font-medium
                                    text-slate-300

                                    flex items-center gap-2

                                    transition-all duration-200

                                    hover:bg-white/[0.06]
                                    hover:text-white
                                    hover:border-white/20
                                "
                            >
                                <span>
                                    {t("workspace")}
                                </span>

                                <span
                                    className="
                                        text-slate-500
                                        transition-transform duration-200

                                        group-hover:-translate-y-0.5
                                        group-hover:translate-x-0.5
                                    "
                                >
                                    ↗
                                </span>
                            </button>

                            <AuthModal
                                open={authOpen}
                                onClose={() =>
                                    setAuthOpen(false)
                                }
                            />
                        </div>
                    ) : (
                        <div className="relative group">

                            {/* BUTTON */}
                            <button
                                type="button"
                                className="
                                    h-10
                                    pl-2 pr-3

                                    rounded-xl

                                    border border-white/10
                                    bg-white/[0.04]

                                    flex items-center gap-2

                                    transition-all duration-200

                                    hover:bg-white/[0.06]
                                    hover:border-white/20
                                "
                            >
                                {/* AVATAR */}
                                <div
                                    className="
                                        w-7 h-7
                                        rounded-full

                                        bg-gradient-to-br
                                        from-[#d4af37]
                                        to-[#8b6b16]

                                        flex items-center justify-center

                                        text-[11px]
                                        font-semibold
                                        text-black
                                    "
                                >
                                    {(
                                        user.full_name?.charAt(0) || "U"
                                    ).toUpperCase()}
                                </div>

                                {/* INFO */}
                                <div className="flex flex-col items-start leading-none">

                                    <span className="text-[12px] text-white font-medium max-w-[120px] truncate">
                                        {user.full_name ||
                                            user.email?.split("@")[0]}
                                    </span>

                                    <div className="mt-0.5 text-[10px] text-slate-500">
                                        Personal • Free Plan
                                    </div>
                                </div>

                                <ArrowDownIcon className="text-slate-500 ml-1" />
                            </button>

                            {/* DROPDOWN */}
                            <div
                                className="
                                    invisible opacity-0 translate-y-3
                                    group-hover:visible
                                    group-hover:opacity-100
                                    group-hover:translate-y-0

                                    absolute right-0 top-[calc(100%+8px)]
                                    pt-3
                                    w-[340px]

                                    rounded-3xl
                                    border border-white/10
                                    bg-[#0b1020]/95
                                    backdrop-blur-2xl

                                    shadow-[0_20px_80px_rgba(0,0,0,0.65)]

                                    overflow-hidden
                                    z-50

                                    transition-all duration-300
                                "
                            >
                                {/* HEADER */}
                                <div className="px-4 py-4 border-b border-white/10">

                                    <div className="text-white text-[14px] font-medium">
                                        {user.full_name || user.email}
                                    </div>

                                    <div className="mt-1 text-[12px] text-slate-400">
                                        Personal • Free Plan
                                    </div>

                                    {hasWorkspaceSubscription ? (
                                        <div className="mt-1 text-[12px] text-[#d4af37]">
                                            Workspace • {workspacePlan}
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setUpgradeOpen(true)
                                            }
                                            className="
            mt-1
            text-[12px]
            text-[#d4af37]

            hover:text-[#f5d97b]

            transition-colors
        "
                                        >
                                            + Create Workspace
                                        </button>
                                    )}
                                </div>

                                {/* DASHBOARDS */}
                                <div className="p-2 border-b border-white/10">

                                    <Link
                                        href="/dashboard/personal"
                                        className="
                                            flex items-center justify-between

                                            rounded-2xl
                                            px-3 py-3

                                            text-[13px]
                                            text-slate-300

                                            transition-all duration-200

                                            hover:bg-white/[0.04]
                                            hover:text-white
                                        "
                                    >
                                        <span>
                                            Personal Dashboard
                                        </span>

                                        <span>
                                            ↗
                                        </span>
                                    </Link>

                                    {hasWorkspaceSubscription && (
                                        <button
                                            type="button"
                                            onClick={async () => {

                                                if (!workspaces.length) {
                                                    return;
                                                }

                                                await switchWorkspace(
                                                    workspaces[0].id
                                                );

                                                router.push(
                                                    "/dashboard/workspace"
                                                );
                                            }}
                                            className="
                                                w-full

                                                flex items-center justify-between

                                                rounded-2xl
                                                px-3 py-3

                                                text-[13px]
                                                text-slate-300

                                                transition-all duration-200

                                                hover:bg-white/[0.04]
                                                hover:text-white
                                            "
                                        >
                                            <span>
                                                Manage Workspace
                                            </span>

                                            <span>
                                                ↗
                                            </span>
                                        </button>
                                    )}
                                </div>

                                {/* WORKSPACES */}
                                {hasWorkspaceSubscription && (
                                    <div className="border-b border-white/10 p-2">

                                        <div className="px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                                            Workspaces
                                        </div>

                                        {workspaces.map(
                                            (workspace) => (
                                                <button
                                                    key={workspace.id}
                                                    type="button"
                                                    onClick={async () => {

                                                        await switchWorkspace(
                                                            workspace.id
                                                        );

                                                        router.push(
                                                            "/dashboard/workspace"
                                                        );
                                                    }}
                                                    className="
                                                        w-full

                                                        flex items-center justify-between

                                                        rounded-2xl
                                                        px-3 py-3

                                                        text-[13px]
                                                        text-slate-300

                                                        transition-all duration-200

                                                        hover:bg-white/[0.04]
                                                        hover:text-white
                                                    "
                                                >
                                                    <div className="flex flex-col items-start">

                                                        <span className="text-white font-medium">
                                                            {workspace.name}
                                                        </span>

                                                        <span className="text-[11px] text-slate-500">
                                                            {workspace.plan}
                                                        </span>
                                                    </div>

                                                    {workspace.id ===
                                                        activeWorkspace?.id ? (
                                                        <span className="text-[#d4af37] text-[11px] font-medium">
                                                            Active
                                                        </span>
                                                    ) : (
                                                        <span className="text-slate-600">
                                                            ›
                                                        </span>
                                                    )}
                                                </button>
                                            )
                                        )}
                                    </div>
                                )}

                                {/* LOGOUT */}
                                <div className="p-2">

                                    <button
                                        type="button"
                                        onClick={logout}
                                        className="
                                            w-full

                                            rounded-2xl
                                            px-3 py-3

                                            text-left
                                            text-[13px]

                                            text-red-400

                                            transition-all duration-200

                                            hover:bg-red-500/10
                                        "
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* GET STARTED */}
                <div className="relative group">

                    <Link
                        href="/qxt/chat"
                        className="
                            h-10
                            px-4

                            rounded-xl

                            border border-[#d4af37]/20
                            bg-[#d4af37]/10

                            text-[13px]
                            font-medium
                            text-white

                            flex items-center gap-2

                            transition-all duration-200

                            hover:bg-[#d4af37]/15
                            hover:border-[#d4af37]/35
                        "
                    >
                        {t("get_started")}

                        <ArrowDownIcon />
                    </Link>

                    {/* PRODUCTS */}
                    <div
                        className="
                            invisible opacity-0 translate-y-2
                            group-hover:visible
                            group-hover:opacity-100
                            group-hover:translate-y-0

                            absolute right-0 top-[calc(100%+14px)]
                            w-[340px]

                            rounded-3xl
                            border border-white/10
                            bg-[#07111d]/95
                            backdrop-blur-2xl

                            shadow-[0_20px_80px_rgba(0,0,0,0.75)]

                            overflow-hidden
                            z-50

                            transition-all duration-300
                        "
                    >
                        <div className="px-4 pt-4 pb-2">

                            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-semibold">
                                {t("qxt_products")}
                            </div>
                        </div>

                        <div className="p-2 pt-1 flex flex-col">

                            {qxtProducts.map(
                                (product) => (
                                    <ProductLink
                                        key={product.href}
                                        {...product}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* UPGRADE */}
            <UpgradeModal
                open={upgradeOpen}
                onClose={() =>
                    setUpgradeOpen(false)
                }
                onUpgrade={async (
                    planId,
                    billing
                ) => {
                    console.log(
                        planId,
                        billing
                    );
                }}
            />
        </>
    );
}