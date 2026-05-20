"use client";

import { useState } from "react";

import Navbar from "./Navbar";
import RightActions from "./RightActions";
import SearchOverlay from "./SearchOverlay";

export default function Header() {
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <>
            <header
                className="
                    sticky
                    top-0
                    z-[100]

                    w-full

                    border-b border-white/5

                    bg-[#070b14]/95
                    backdrop-blur-xl

                    supports-[backdrop-filter]:bg-[#070b14]/80
                "
            >
                <div
                    className="
                        container-app
                        relative

                        h-[72px]

                        flex
                        items-center
                        justify-between

                        gap-4
                    "
                >
                    {/* ==== LEFT / LOGO ==== */}
                    <a
                        href="/"
                        className="
                            flex items-center gap-3
                            shrink-0
                            select-none

                            no-underline
                        "
                    >
                        <span className="flex items-end leading-none">
                            <span
                                className="
                                    text-white
                                    font-extrabold
                                    text-xl
                                    md:text-2xl
                                    tracking-[-0.05em]
                                "
                            >
                                OpenQCore
                            </span>

                            <span
                                className="
                                    ml-2
                                    mb-0.5

                                    text-[#d4af37]
                                    font-semibold
                                    tracking-wide
                                "
                                style={{ fontSize: "0.98rem" }}
                            >
                                AI
                            </span>
                        </span>
                    </a>

                    {/* ==== NAVBAR ==== */}
                    <div
                        className="
                            flex-1
                            flex
                            items-center

                            min-w-0

                            pl-10
                        "
                    >
                        <Navbar />
                    </div>

                    {/* ==== SEARCH ==== */}
                    <button
                        onClick={() =>
                            setSearchOpen((prev) => !prev)
                        }
                        className={`
                            hidden xl:flex

items - center
justify - center

w - 10
h - 10

rounded-xl

                            border border-white/[0.06]

transition-all
duration-300

                            ${searchOpen
                                ? "bg-white/[0.10] text-white"
                                : "bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.07]"
                            }
`}
                    >
                        {searchOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                                />
                            </svg>
                        )}
                    </button>

                    {/* ==== RIGHT ACTIONS ==== */}
                    <RightActions />
                </div>
            </header>

            {/* SEARCH OVERLAY */}
            {searchOpen && (
                <SearchOverlay
                    open={searchOpen}
                    onClose={() => setSearchOpen(false)}
                />
            )}
        </>
    );
}
