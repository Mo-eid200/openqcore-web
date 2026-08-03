"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

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

import {
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

import LanguageSwitcher from "./LanguageSwitcher";

/* ─────────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────────── */

type FooterLink = {
  label: string;
  href: string;
  comingSoon?: boolean;
  external?: boolean;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  const footerSections: FooterSection[] = [
    {
      title: t("platform"),
      links: [
        {
          label: t("overview"),
          href: "/platform",
        },
        {
          label: t("runtime"),
          href: "/infrastructure/runtime",
        },
        {
          label: t("studio"),
          href: "/platform/studio",
        },
        {
          label: t("agents"),
          href: "/platform/agents",
        },
        {
          label: t("voice_infrastructure"),
          href: "/platform/voice",
        },
      ],
    },

    {
      title: t("products"),
      links: [
        {
          label: "ChatQXT",
          href: "https://qxt.openqcore.com",
          external: true,
        },
        {
          label: "ResearchQXT",
          href: "/qxt/research",
          comingSoon: true,
        },
        {
          label: "VisionQXT",
          href: "/qxt/vision",
          comingSoon: true,
        },
        {
          label: "CodeQXT",
          href: "/qxt/code",
          comingSoon: true,
        },
        {
          label: "LibraryQXT",
          href: "/qxt/library",
          comingSoon: true,
        },
      ],
    },

    {
      title: t("developers"),
      links: [
        {
          label: t("documentation"),
          href: "/docs",
        },
        {
          label: t("sdks"),
          href: "/sdks",
          comingSoon: true,
        },
        {
          label: t("api_platform"),
          href: "/docs/api",
        },
        {
          label: t("system_status"),
          href: "/status",
          comingSoon: true,
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
        {
          label: t("about"),
          href: "/company",
        },
        {
          label: t("careers"),
          href: "/company/careers",
        },
        {
          label: t("security"),
          href: "/company/security",
        },
        {
          label: t("privacy"),
          href: "/company/legal/privacy",
        },
        {
          label: t("contact"),
          href: "/company/contact",
        },
      ],
    },
  ];

  /*
   * IMPORTANT:
   * Replace these generic URLs with the official OpenQCore
   * profile URLs once each account is ready.
   */
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

  const legalLinks = [
    {
      label: t("privacy"),
      href: "/company/legal/privacy",
    },
    {
      label: t("terms"),
      href: "/company/legal/terms",
    },
    {
      label: t("security"),
      href: "/company/security",
    },
  ];

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/[0.06] bg-[#050811]">

      {/* ── Top accent ─────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent" />

      {/* ── Ambient lighting ──────────────────────────────────────── */}
      <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[#d4af37]/[0.035] blur-[150px]" />

      <div className="pointer-events-none absolute bottom-[-260px] left-[-180px] h-[500px] w-[500px] rounded-full bg-blue-700/[0.035] blur-[150px]" />

      {/* ── Main container ────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-8 pt-16 lg:px-8 lg:pt-20">

        {/* ───────────────────────────────────────────────────────────
            Main navigation area
        ─────────────────────────────────────────────────────────── */}
        <div className="grid gap-14 lg:grid-cols-[300px_1fr] lg:gap-20 xl:grid-cols-[340px_1fr] xl:gap-28">

          {/* ── Brand ─────────────────────────────────────────────── */}
          <div>
            <Link
              href="/"
              aria-label="OpenQCore AI"
              className="group inline-flex items-baseline"
            >
              <span className="text-[31px] font-extrabold leading-none tracking-[-0.045em] text-white transition-colors duration-300 group-hover:text-white/90 sm:text-[34px]">
                OpenQCore
              </span>

              <span className="ml-2 text-[25px] font-semibold leading-none tracking-[-0.03em] text-[#d4af37] sm:text-[28px]">
                AI
              </span>
            </Link>

            {/* Brand descriptor */}
            <div className="mt-4 flex items-center gap-2">
              <span className="h-px w-5 bg-[#d4af37]/50" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d4af37]/70">
                Intelligence Infrastructure
              </span>
            </div>

            {/* Description */}
            <p className="mt-5 max-w-[300px] text-[13px] leading-[1.85] text-slate-400">
              {t("footer_description")}
            </p>

            {/* QXT CTA */}
            <a
              href="https://qxt.openqcore.com"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group mt-7 inline-flex items-center gap-2
                rounded-full border border-white/[0.07]
                bg-white/[0.025]
                px-4 py-2
                text-[11px] font-medium text-slate-300
                transition-all duration-300
                hover:border-[#d4af37]/25
                hover:bg-[#d4af37]/[0.06]
                hover:text-[#f1d77d]
              "
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>

              Try QXT Chat

              <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* ── Navigation columns ───────────────────────────────── */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4 sm:gap-x-6 xl:gap-x-12">

            {footerSections.map((section) => (
              <nav
                key={section.title}
                aria-label={section.title}
              >
                {/* Section heading */}
                <p className="text-[10px] font-bold uppercase tracking-[0.19em] text-slate-500">
                  {section.title}
                </p>

                <ul className="mt-5 flex flex-col gap-3">

                  {section.links.map((link) => {
                    /* Coming soon */
                    if (link.comingSoon) {
                      return (
                        <li
                          key={link.label}
                          className="flex min-h-[20px] items-center gap-2"
                        >
                          <span className="cursor-default text-[13px] text-slate-600">
                            {link.label}
                          </span>

                          <span
                            className="
                              rounded-full
                              border border-white/[0.05]
                              bg-white/[0.025]
                              px-1.5 py-[1px]
                              text-[7px] font-bold uppercase
                              tracking-[0.09em]
                              text-slate-600
                            "
                          >
                            Soon
                          </span>
                        </li>
                      );
                    }

                    /* External */
                    if (link.external) {
                      return (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              group inline-flex items-center gap-1.5
                              text-[13px] text-slate-400
                              transition-colors duration-200
                              hover:text-[#e2c568]
                            "
                          >
                            {link.label}

                            <ExternalLink className="h-[10px] w-[10px] opacity-40 transition-opacity group-hover:opacity-100" />
                          </a>
                        </li>
                      );
                    }

                    /* Internal */
                    return (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="
                            group inline-flex items-center gap-1
                            text-[13px] text-slate-400
                            transition-all duration-200
                            hover:text-[#e2c568]
                          "
                        >
                          <span>{link.label}</span>

                          <ArrowUpRight
                            className="
                              h-[11px] w-[11px]
                              translate-y-0.5
                              opacity-0
                              transition-all duration-200
                              group-hover:translate-x-0.5
                              group-hover:translate-y-0
                              group-hover:opacity-100
                            "
                          />
                        </Link>
                      </li>
                    );
                  })}

                </ul>
              </nav>
            ))}

          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────
            Bottom bar
        ─────────────────────────────────────────────────────────── */}
        <div className="mt-16 border-t border-white/[0.055] pt-6">

          <div className="flex flex-col gap-6 xl:grid xl:grid-cols-[1fr_auto_1fr] xl:items-center">

            {/* Social */}
            <div className="flex flex-wrap items-center gap-1.5">

              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    title={item.label}
                    className="
                      flex h-8 w-8 items-center justify-center
                      rounded-lg
                      text-slate-600
                      transition-all duration-200
                      hover:bg-white/[0.04]
                      hover:text-[#d9bd62]
                    "
                  >
                    <Icon className="h-[13px] w-[13px]" />
                  </a>
                );
              })}

            </div>

            {/* Copyright */}
            <p className="text-[10px] text-slate-600 xl:text-center">
              © {year} OpenQCore AI. {t("copyright")}
            </p>

            {/* Legal + language */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 xl:justify-end">

              <div className="flex items-center gap-5">
                {legalLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-[11px] text-slate-600 transition-colors duration-200 hover:text-slate-300"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="hidden h-3.5 w-px bg-white/[0.08] sm:block" />

              <LanguageSwitcher />

            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}