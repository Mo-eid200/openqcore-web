"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";

import {
    FaGithub,
    FaXTwitter,
    FaLinkedinIn,
    FaYoutube,
    FaInstagram,
    FaFacebookF,
    FaDiscord,
    FaRedditAlien,
} from "react-icons/fa6";

import { ArrowUpRight } from "lucide-react";

import LanguageSwitcher from "./LanguageSwitcher";

import { useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations("footer");

    const footerSections = [
        {
            title: t("platform"),
            links: [
                { label: t("overview"), href: "/platform" },
                { label: t("runtime"), href: "/runtime" },
                { label: t("studio"), href: "/studio" },
                { label: t("agents"), href: "/agents" },
                {
                    label: t("voice_infrastructure"),
                    href: "/voice",
                },
            ],
        },

        {
            title: t("products"),
            links: [
                { label: "ChatQXT", href: "/qxt/chat" },
                { label: "ResearchQXT", href: "/qxt/research" },
                { label: "VisionQXT", href: "/qxt/vision" },
                { label: "CodeQXT", href: "/qxt/code" },
                { label: "LibraryQXT", href: "/qxt/library" },
            ],
        },

        {
            title: t("developers"),
            links: [
                { label: t("documentation"), href: "/docs" },
                { label: t("sdks"), href: "/sdks" },
                {
                    label: t("api_platform"),
                    href: "/platform/api",
                },
                {
                    label: t("system_status"),
                    href: "/status",
                },
                {
                    label: t("changelog"),
                    href: "/changelog",
                },
            ],
        },

        {
            title: t("company"),
            links: [
                { label: t("about"), href: "/company" },
                { label: t("careers"), href: "/careers" },
                { label: t("security"), href: "/security" },
                {
                    label: t("privacy"),
                    href: "/legal/privacy",
                },
                { label: t("contact"), href: "/contact" },
            ],
        },
    ];

    const socialLinks = [
        {
            label: "GitHub",
            href: "https://github.com",
            icon: FaGithub,
        },

        {
            label: "X",
            href: "https://x.com",
            icon: FaXTwitter,
        },

        {
            label: "LinkedIn",
            href: "https://linkedin.com",
            icon: FaLinkedinIn,
        },

        {
            label: "YouTube",
            href: "https://youtube.com",
            icon: FaYoutube,
        },

        {
            label: "Instagram",
            href: "https://instagram.com",
            icon: FaInstagram,
        },

        {
            label: "Facebook",
            href: "https://facebook.com",
            icon: FaFacebookF,
        },

        {
            label: "Discord",
            href: "https://discord.com",
            icon: FaDiscord,
        },

        {
            label: "Reddit",
            href: "https://reddit.com",
            icon: FaRedditAlien,
        },
    ];

    return (
        <footer
            className="
                relative
                mt-32
                overflow-hidden
                border-t border-white/[0.06]
                bg-[#050811]
            "
        >
            {/* GOLD LINE */}
            <div
                className="
                    absolute inset-x-0 top-0 h-px
                    bg-gradient-to-r
                    from-transparent
                    via-[#d4af37]/25
                    to-transparent
                "
            />

            {/* GLOW */}
            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-0
                    h-[420px]
                    w-[900px]
                    -translate-x-1/2
                    bg-[#d4af37]/[0.04]
                    blur-[140px]
                "
            />

            <div className="container-app relative z-10 pt-24 pb-10">

                {/* TOP */}
                <div
                    className="
                        grid
                        grid-cols-1
                        gap-14

                        md:grid-cols-2
                        xl:grid-cols-[1.4fr_repeat(4,1fr)]
                    "
                >
                    {/* BRAND */}
                    <div className="max-w-sm">

                        {/* LOGO */}
                        <div className="flex items-center gap-4">
                            <Image
                                src="/opq-logo.png"
                                alt="OpenQCore"
                                width={72}
                                height={72}
                                priority
                                className="
                                    rounded-2xl
                                    select-none
                                "
                            />

                            <div className="flex items-end gap-2">
                                <span
                                    className="
                                        text-2xl
                                        font-extrabold
                                        tracking-[-0.05em]
                                        text-white
                                    "
                                >
                                    OpenQCore
                                </span>

                                <span
                                    className="
                                        mb-1
                                        text-sm
                                        font-semibold
                                        tracking-wide
                                        text-[#d4af37]
                                    "
                                >
                                    AI
                                </span>
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <p
                            className="
                                mt-6
                                text-[15px]
                                leading-7
                                text-slate-400
                            "
                        >
                            {t("footer_description")}
                        </p>

                        {/* STATUS */}
                        <div
                            className="
                                mt-7
                                flex w-fit items-center gap-3
                                rounded-full
                                border border-emerald-500/15
                                bg-emerald-500/10
                                px-4 py-2
                            "
                        >
                            <span
                                className="
                                    h-2 w-2
                                    rounded-full
                                    bg-emerald-400
                                    animate-pulse
                                "
                            />

                            <span
                                className="
                                    text-sm
                                    text-emerald-300
                                "
                            >
                                {t("all_systems_operational")}
                            </span>
                        </div>
                    </div>

                    {/* SECTIONS */}
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <div
                                className="
                                    text-[11px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.18em]
                                    text-slate-500
                                "
                            >
                                {section.title}
                            </div>

                            <div className="mt-6 flex flex-col gap-3">
                                {section.links.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className="
                                            footer-link
                                            group

                                            flex w-fit items-center gap-2

                                            text-[14px]
                                            text-slate-400

                                            transition-all duration-200

                                            hover:text-[#d4af37]
                                            hover:translate-x-1

                                            cursor-pointer
                                        "
                                    >
                                        <span>{link.label}</span>

                                        <ArrowUpRight
                                            className="
                                                h-3.5 w-3.5

                                                translate-y-1
                                                -translate-x-1

                                                opacity-0

                                                transition-all duration-200

                                                group-hover:translate-y-0
                                                group-hover:translate-x-0
                                                group-hover:opacity-100
                                            "
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* BOTTOM */}
                <div
                    className="
                        mt-24
                        flex flex-col
                        items-start
                        justify-between
                        gap-8

                        border-t border-white/[0.06]

                        pt-7

                        lg:flex-row
                        lg:items-center
                    "
                >
                    {/* LEFT */}
                    <div className="flex flex-col gap-5">

                        {/* SOCIALS */}
                        <div className="flex flex-wrap items-center gap-3">
                            {socialLinks.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={item.label}
                                        className="
                                            social-glow
                                            hover-lift
                                            group

                                            flex items-center justify-center

                                            h-11 w-11

                                            rounded-2xl

                                            border border-white/[0.06]
                                            bg-white/[0.03]

                                            text-slate-500

                                            transition-all duration-300

                                            hover:border-[#d4af37]/20
                                            hover:bg-[#d4af37]/10
                                            hover:text-white

                                            cursor-pointer
                                        "
                                    >
                                        <Icon className="h-[18px] w-[18px]" />
                                    </a>
                                );
                            })}
                        </div>

                        {/* COPYRIGHT */}
                        <div
                            className="
                                text-sm
                                text-slate-500
                            "
                        >
                            © {new Date().getFullYear()} OpenQCore.{" "}
                            {t("copyright")}
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div
                        className="
                            flex flex-wrap
                            items-center
                            gap-5
                        "
                    >
                        {/* LEGAL */}
                        <div className="flex items-center gap-5">
                            <Link
                                href="/legal/privacy"
                                className="
                                    footer-link
                                    text-sm
                                    text-slate-500

                                    transition-colors duration-200

                                    hover:text-white
                                    cursor-pointer
                                "
                            >
                                {t("privacy")}
                            </Link>

                            <Link
                                href="/legal/terms"
                                className="
                                    footer-link
                                    text-sm
                                    text-slate-500

                                    transition-colors duration-200

                                    hover:text-white
                                    cursor-pointer
                                "
                            >
                                {t("terms")}
                            </Link>

                            <Link
                                href="/security"
                                className="
                                    footer-link
                                    text-sm
                                    text-slate-500

                                    transition-colors duration-200

                                    hover:text-white
                                    cursor-pointer
                                "
                            >
                                {t("security")}
                            </Link>
                        </div>

                        {/* LANGUAGE SWITCHER */}
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>
        </footer>
    );
}