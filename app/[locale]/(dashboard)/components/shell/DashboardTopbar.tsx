"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Search, LogOut, ChevronDown, Settings, User } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { getUnreadCount } from "@/app/lib/api/notifications/notifications.api";
import { NotificationDropdown } from "./NotificationDropdown";

const SIDEBAR_STORAGE_KEY = "oqc_sidebar_open";
const SIDEBAR_EVENT = "oqc-sidebar-toggle";
const SIDEBAR_OPEN_WIDTH = 240;
const SIDEBAR_COLLAPSED_WIDTH = 60;

function readSidebarOpen(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(SIDEBAR_STORAGE_KEY) !== "false";
}

function PulseDot({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <span className="absolute -right-0.5 -top-0.5">
      <span className="absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75 animate-ping" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
    </span>
  );
}

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const queryClient = useQueryClient();

  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSidebarOpen(readSidebarOpen());

    function handleStorage(e: StorageEvent) {
      if (e.key === SIDEBAR_STORAGE_KEY) {
        setSidebarOpen(e.newValue !== "false");
      }
    }

    function handleSidebarToggle() {
      setSidebarOpen(readSidebarOpen());
    }

    window.addEventListener("storage", handleStorage);
    window.addEventListener(SIDEBAR_EVENT, handleSidebarToggle);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(SIDEBAR_EVENT, handleSidebarToggle);
    };
  }, []);

  const sidebarWidth = sidebarOpen
    ? SIDEBAR_OPEN_WIDTH
    : SIDEBAR_COLLAPSED_WIDTH;

  const { data: unreadData } = useQuery({
    queryKey: ["notifications-unread-count"],
    queryFn: getUnreadCount,
    staleTime: 15_000,
    refetchInterval: 30_000,
  });

  const hasUnread = (unreadData?.count ?? 0) > 0;

  useEffect(() => {
    if (!userMenuOpen) return;

    function handleClick(e: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [userMenuOpen]);

  function handleLogout() {
    logout();
    queryClient.clear();
    router.push("/");
  }

  const initials = user?.full_name
    ? user.full_name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user?.email?.[0]?.toUpperCase() ?? "?";

  return (
    <motion.header
      initial={false}
      animate={{
        left: sidebarWidth,
      }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-0 top-0 z-20 flex h-14 items-center justify-between border-b border-white/[0.06] bg-[#111113]/90 px-5 backdrop-blur-xl"
    >
      {/* Search */}
      <div className="relative max-w-md flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />
        <input
          type="text"
          placeholder="Search projects, APIs, agents..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className={`w-full rounded-xl bg-white/[0.04] py-2 pl-10 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all ${
            searchFocused
              ? "border border-white/15 bg-white/[0.07]"
              : "border border-transparent hover:bg-white/[0.06]"
          }`}
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen((v) => !v);
              setUserMenuOpen(false);
            }}
            className={`relative flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
              notifOpen
                ? "bg-white/[0.08] text-white"
                : "text-white/40 hover:bg-white/[0.06] hover:text-white/70"
            }`}
            aria-label="Activity"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a4.5 4.5 0 00-4.5 4.5c0 5.5-2.5 7-2.5 7h14s-2.5-1.5-2.5-7A4.5 4.5 0 0012 2z" />
              <path d="M9.5 21a2.5 2.5 0 005 0" />
            </svg>
            <PulseDot visible={hasUnread} />
          </button>

          <NotificationDropdown
            open={notifOpen}
            onClose={() => setNotifOpen(false)}
          />
        </div>

        <div className="mx-1 h-5 w-px bg-white/[0.08]" />

        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => {
              setUserMenuOpen((v) => !v);
              setNotifOpen(false);
            }}
            className={`flex items-center gap-2 rounded-xl px-2 py-1.5 transition-colors ${
              userMenuOpen ? "bg-white/[0.08]" : "hover:bg-white/[0.06]"
            }`}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-red-500/80 to-red-600/80 text-[11px] font-bold text-white">
              {initials}
            </div>
            <span className="hidden max-w-[120px] truncate text-sm text-white/70 sm:block">
              {user?.full_name || user?.email || "Account"}
            </span>
            <ChevronDown
              className={`h-3.5 w-3.5 text-white/30 transition-transform ${
                userMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {userMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-[calc(100%+6px)] z-50 w-52 origin-top-right overflow-hidden rounded-xl border border-white/[0.08] bg-[#111113] shadow-2xl"
              >
                <div className="border-b border-white/[0.06] px-3 py-2.5">
                  <div className="truncate text-sm font-medium text-white">
                    {user?.full_name || "Account"}
                  </div>
                  <div className="truncate text-[11px] text-white/35">
                    {user?.email}
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      router.push("/console/settings");
                    }}
                    className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-white/60 transition hover:bg-white/[0.04] hover:text-white"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>

                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      router.push("/console/profile");
                    }}
                    className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-white/60 transition hover:bg-white/[0.04] hover:text-white"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </button>
                </div>

                <div className="border-t border-white/[0.06] py-1">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-red-400/80 transition hover:bg-red-500/10 hover:text-red-400"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}