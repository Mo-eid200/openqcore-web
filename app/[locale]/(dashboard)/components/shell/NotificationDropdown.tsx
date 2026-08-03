"use client";
import React, { useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Users,
  CreditCard,
  MessageCircle,
  Bot,
  CheckCheck,
  ExternalLink,
} from "lucide-react";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  type Notification,
} from "@/app/lib/api/notifications/notifications.api";

// ─── Category icons ──────────────────────────────────────────────────────────

const CATEGORY_CONFIG: Record<string, { icon: typeof ShieldCheck; color: string }> = {
  security:  { icon: ShieldCheck,   color: "text-red-400" },
  workspace: { icon: Users,         color: "text-blue-400" },
  billing:   { icon: CreditCard,    color: "text-amber-400" },
  support:   { icon: MessageCircle, color: "text-emerald-400" },
  agents:    { icon: Bot,           color: "text-purple-400" },
};

function CategoryIcon({ category }: { category: string }) {
  const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.security;
  const Icon = config.icon;
  return <Icon className={`h-4 w-4 shrink-0 ${config.color}`} />;
}

// ─── Time formatting ─────────────────────────────────────────────────────────

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `${days}d`;
}

// ─── Component ───────────────────────────────────────────────────────────────

interface Props {
  open: boolean;
  onClose: () => void;
}

export function NotificationDropdown({ open, onClose }: Props) {
  const queryClient = useQueryClient();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications-list"],
    queryFn: () => getNotifications({ limit: 30 }),
    staleTime: 15_000,
    enabled: open,
  });

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  async function handleMarkRead(n: Notification) {
    if (n.is_read) return;
    await markAsRead(n.id);
    queryClient.setQueryData<Notification[]>(["notifications-list"], (prev) =>
      prev?.map((item) => (item.id === n.id ? { ...item, is_read: true } : item)) ?? []
    );
    queryClient.invalidateQueries({ queryKey: ["notifications-unread-count"] });
  }

  async function handleMarkAllRead() {
    await markAllAsRead();
    queryClient.setQueryData<Notification[]>(["notifications-list"], (prev) =>
      prev?.map((item) => ({ ...item, is_read: true })) ?? []
    );
    queryClient.invalidateQueries({ queryKey: ["notifications-unread-count"] });
  }

  function handleClickNotification(n: Notification) {
    handleMarkRead(n);
    if (n.link) {
      window.location.href = n.link;
      onClose();
    }
  }

  const unreadCount = notifications?.filter((n) => !n.is_read).length ?? 0;
  const items = notifications ?? [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-[380px] origin-top-right overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111113] shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
            <span className="text-sm font-semibold text-white">Activity</span>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="flex items-center gap-1 text-[11px] text-white/40 transition hover:text-white"
              >
                <CheckCheck className="h-3 w-3" />
                Mark all read
              </button>
            )}
          </div>

          {/* Body */}
          <div className="max-h-[420px] overflow-y-auto overscroll-contain">
            {isLoading ? (
              <div className="flex flex-col gap-1 p-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-14 rounded-lg bg-white/[0.03] animate-pulse" />
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="py-12 text-center text-sm text-white/30">
                No activity yet
              </div>
            ) : (
              <div className="flex flex-col">
                {items.map((n, idx) => (
                  <motion.button
                    key={n.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.12, delay: Math.min(idx, 8) * 0.02 }}
                    onClick={() => handleClickNotification(n)}
                    className={`flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.04] ${
                      !n.is_read ? "bg-white/[0.02]" : ""
                    }`}
                  >
                    {/* Unread indicator */}
                    <div className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center">
                      {!n.is_read ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                      ) : (
                        <CategoryIcon category={n.category} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`truncate text-[13px] ${
                            !n.is_read ? "font-semibold text-white" : "text-white/70"
                          }`}
                        >
                          {n.title}
                        </span>
                        <span className="shrink-0 text-[11px] text-white/25">{timeAgo(n.created_at)}</span>
                      </div>
                      {n.body && (
                        <p className="mt-0.5 truncate text-[12px] text-white/35">{n.body}</p>
                      )}
                    </div>

                    {/* Link arrow */}
                    {n.link && (
                      <ExternalLink className="mt-1 h-3 w-3 shrink-0 text-white/15" />
                    )}
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-white/[0.06] px-4 py-2.5 text-center">
              <span className="text-[11px] text-white/25">
                Showing last {items.length} notification{items.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}