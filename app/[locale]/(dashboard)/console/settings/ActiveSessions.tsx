"use client";

import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Monitor,
  Tablet,
  Loader2,
  Laptop,
} from "lucide-react";
import {
  getSessions,
  revokeSession,
  type UserSession,
} from "@/app/lib/api/auth/sessions.api";

function formatRelativeTime(iso: string | null): string {
  if (!iso) return "—";

  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);

  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;

  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;

  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function deviceLabel(session: UserSession): string {
  const parts = [session.browser, session.os].filter(Boolean);
  return parts.length > 0
    ? parts.join(" · ")
    : session.device_type || "Unknown device";
}

function DeviceIcon({
  deviceType,
}: {
  deviceType: string | null;
}) {
  if (deviceType === "mobile") {
    return <Smartphone className="h-4.5 w-4.5 text-amber-300" />;
  }

  if (deviceType === "tablet") {
    return <Tablet className="h-4.5 w-4.5 text-amber-300" />;
  }

  if (deviceType === "desktop") {
    return <Laptop className="h-4.5 w-4.5 text-amber-300" />;
  }

  return <Monitor className="h-4.5 w-4.5 text-amber-300" />;
}

export function ActiveSessions() {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const [revokingId, setRevokingId] = useState<string | null>(null);

  const { data: sessions, isLoading } = useQuery({
    queryKey: ["auth-sessions"],
    queryFn: getSessions,
    staleTime: 30_000,
  });

  async function handleSignOut(id: string) {
    setRevokingId(id);
    setError(null);

    try {
      await revokeSession(id);

      queryClient.setQueryData<UserSession[]>(
        ["auth-sessions"],
        (prev) => prev?.filter((s) => s.id !== id) ?? []
      );
    } catch (err: any) {
      setError(err.message || "Failed to sign out this session.");
    } finally {
      setRevokingId(null);
    }
  }

  return (
    <section
      className="
        relative overflow-hidden rounded-2xl
        border border-white/[0.06]
        bg-[#0f1012]/92
        shadow-[0_16px_40px_rgba(0,0,0,0.18)]
        backdrop-blur-xl
      "
    >
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-40px] top-[-50px] h-[120px] w-[120px] rounded-full bg-amber-300/[0.04] blur-[70px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.02),transparent_35%)]" />
      </div>

      {/* Header */}
      <div className="relative border-b border-white/[0.06] px-5 py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-white">
              Active Sessions
            </h3>
            <p className="mt-1 text-xs leading-5 text-white/35">
              Devices currently signed in to your account. Review them and sign
              out any session you do not recognize.
            </p>
          </div>

          {!isLoading && sessions && sessions.length > 0 && (
            <div className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-white/35">
              {sessions.length} device{sessions.length > 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative px-5 py-4">
        {isLoading ? (
          <div className="flex flex-col gap-2.5">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="
                  h-[76px] rounded-xl border border-white/[0.05]
                  bg-white/[0.03] animate-pulse
                "
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-300/15 bg-red-300/[0.06] px-3 py-2.5 text-xs text-red-200">
            {error}
          </div>
        ) : !sessions || sessions.length === 0 ? (
          <div className="rounded-xl border border-white/[0.05] bg-white/[0.03] px-4 py-10 text-center">
            <p className="text-sm font-medium text-white/55">
              No active sessions found
            </p>
            <p className="mt-1 text-xs text-white/28">
              Signed-in devices will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            <AnimatePresence initial={false}>
              {sessions.map((s) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.18 }}
                  className="overflow-hidden"
                >
                  <div
                    className="
                      group flex flex-col gap-3 rounded-xl
                      border border-white/[0.05]
                      bg-white/[0.03] px-4 py-3
                      transition-all duration-200
                      hover:border-white/[0.07]
                      hover:bg-white/[0.04]
                      sm:flex-row sm:items-center
                    "
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-300/10 bg-amber-300/[0.08]">
                        <DeviceIcon deviceType={s.device_type} />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="truncate text-sm font-medium text-white/78">
                            {deviceLabel(s)}
                          </span>

                          {s.is_current && (
                            <span className="rounded-full border border-emerald-300/10 bg-emerald-300/[0.08] px-2 py-0.5 text-[10px] font-medium text-emerald-200">
                              This device
                            </span>
                          )}
                        </div>

                        <div className="mt-1 text-xs text-white/28">
                          Last active{" "}
                          <span className="text-white/42">
                            {formatRelativeTime(
                              s.last_seen_at || s.created_at
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {!s.is_current && (
                      <button
                        onClick={() => handleSignOut(s.id)}
                        disabled={revokingId === s.id}
                        className="
                          inline-flex h-9 items-center justify-center gap-2
                          rounded-lg border border-red-300/12
                          bg-red-300/[0.06] px-4
                          text-xs font-medium text-red-200/80
                          transition-all
                          hover:bg-red-300/[0.12]
                          hover:text-red-100
                          disabled:cursor-not-allowed disabled:opacity-50
                        "
                      >
                        {revokingId === s.id && (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        )}
                        {revokingId === s.id ? "Signing out…" : "Sign out"}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}