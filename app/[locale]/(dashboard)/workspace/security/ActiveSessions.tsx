"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Monitor,
  Smartphone,
  Tablet,
  Shield,
  LogOut,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

import {
  getActiveSessions,
  revokeOtherSessions,
  revokeSession,
  type ActiveSessionItem,
} from "@/app/lib/api/security/sessions";

// ─── Shared styles (aligned with MFASettings) ────────────────────────────────

const cardCls =
  "rounded-2xl border border-white/[0.07] bg-[#0c0a06]/95 p-5 backdrop-blur-xl";

const primaryBtnCls =
  "inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-red-500 px-5 text-sm font-semibold text-white transition-all hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-40";

const outlineBtnCls =
  "inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-xs font-medium text-white/70 transition-all hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-40";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ErrorBanner({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <div className="rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs text-red-300">
        {message}
      </div>
    </motion.div>
  );
}

function formatDateTime(value: string | null): string {
  if (!value) return "Unknown";

  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function formatRelativeActivity(value: string | null): string {
  if (!value) return "No recent activity";

  const date = new Date(value);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  if (Number.isNaN(diffMs)) return "Unknown";

  const minutes = Math.floor(diffMs / 1000 / 60);
  if (minutes <= 0) return "Now";
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return formatDateTime(value);
}

function getDeviceIcon(deviceType: string | null) {
  if (deviceType === "mobile") return Smartphone;
  if (deviceType === "tablet") return Tablet;
  return Monitor;
}

function getDeviceLabel(session: ActiveSessionItem): string {
  const parts = [session.os, session.browser].filter(Boolean);
  if (parts.length > 0) return parts.join(" · ");
  return session.device_type ? session.device_type : "Unknown device";
}

function getStatusPill(session: ActiveSessionItem) {
  if (session.revoked) {
    return {
      label: "Revoked",
      cls: "border-white/10 bg-white/[0.04] text-white/45",
      dot: "bg-white/25",
    };
  }

  if (session.is_current) {
    return {
      label: "Current",
      cls: "border-emerald-400/25 bg-emerald-500/10 text-emerald-300",
      dot: "bg-emerald-400",
    };
  }

  return {
    label: "Active",
    cls: "border-red-400/25 bg-red-500/10 text-red-300",
    dot: "bg-red-400",
  };
}

function SessionSkeleton() {
  return (
    <div className="mt-4 space-y-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-20 animate-pulse rounded-2xl border border-white/5 bg-white/[0.03]"
        />
      ))}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ActiveSessions() {
  const [sessions, setSessions] = useState<ActiveSessionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const [revokingOthers, setRevokingOthers] = useState(false);

  async function loadSessions(options?: { silent?: boolean }) {
    const silent = options?.silent ?? false;

    setError(null);

    if (silent) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const data = await getActiveSessions();
      setSessions(data.items);
    } catch (err: any) {
      setError(err.message || "Failed to load active sessions.");
    } finally {
      if (silent) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    void loadSessions();
  }, []);

  const hasOtherActiveSessions = useMemo(() => {
    return sessions.some((s) => !s.revoked && !s.is_current);
  }, [sessions]);

  async function handleRevoke(sessionId: string) {
    setError(null);
    setRevokingId(sessionId);

    try {
      await revokeSession(sessionId);
      await loadSessions({ silent: true });
    } catch (err: any) {
      setError(err.message || "Failed to revoke session.");
    } finally {
      setRevokingId(null);
    }
  }

  async function handleRevokeOthers() {
    setError(null);
    setRevokingOthers(true);

    try {
      await revokeOtherSessions();
      await loadSessions({ silent: true });
    } catch (err: any) {
      setError(err.message || "Failed to revoke other sessions.");
    } finally {
      setRevokingOthers(false);
    }
  }

  return (
    <div className={cardCls}>
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
            <Shield className="h-5 w-5 text-red-400" />
          </div>

          <div>
            <div className="text-base font-semibold text-white">
              Active Sessions
            </div>
            <div className="text-xs text-white/35">
              Manage devices currently signed in to your account
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => void loadSessions({ silent: true })}
            disabled={loading || refreshing || revokingOthers || !!revokingId}
            className={outlineBtnCls}
          >
            <RefreshCw
              className={`h-4 w-4 ${loading || refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </button>

          <button
            type="button"
            onClick={handleRevokeOthers}
            disabled={
              !hasOtherActiveSessions ||
              loading ||
              refreshing ||
              revokingOthers ||
              !!revokingId
            }
            className={primaryBtnCls}
          >
            <LogOut className="h-4 w-4" />
            {revokingOthers ? "Signing out…" : "Sign out other sessions"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {error && <ErrorBanner message={error} />}
      </AnimatePresence>

      {loading ? (
        <SessionSkeleton />
      ) : sessions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-white/8 bg-white/[0.02] px-6 py-10 text-center"
        >
          <AlertCircle className="mb-3 h-6 w-6 text-white/25" />
          <p className="text-sm font-medium text-white">No active sessions found</p>
          <p className="mt-1 text-xs text-white/40">
            New authenticated devices will appear here automatically.
          </p>
        </motion.div>
      ) : (
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/[0.06] bg-black/10">
          <div className="hidden grid-cols-[1.4fr_1fr_1fr_1fr_auto] gap-4 border-b border-white/6 bg-white/[0.02] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35 md:grid">
            <div>Device</div>
            <div>IP Address</div>
            <div>Created</div>
            <div>Activity</div>
            <div>Status</div>
          </div>

          <div className="divide-y divide-white/6">
            {sessions.map((session, index) => {
              const DeviceIcon = getDeviceIcon(session.device_type);
              const status = getStatusPill(session);

              return (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, delay: Math.min(index, 8) * 0.03 }}
                  className="group px-5 py-4 transition-colors hover:bg-white/[0.02]"
                >
                  <div className="hidden items-center gap-4 md:grid md:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03]">
                        <DeviceIcon className="h-5 w-5 text-white/65" />
                      </div>

                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium text-white">
                          {getDeviceLabel(session)}
                        </div>
                        <div className="truncate text-xs text-white/35">
                          {session.user_agent || "Unknown user agent"}
                        </div>
                      </div>
                    </div>

                    <div className="font-mono text-xs text-white/45">
                      {session.ip_address || "Unknown"}
                    </div>

                    <div className="text-xs text-white/45">
                      {formatDateTime(session.created_at)}
                    </div>

                    <div className="text-xs text-white/45">
                      {formatRelativeActivity(
                        session.last_seen_at || session.created_at,
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium ${status.cls}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                        {status.label}
                      </span>

                      {!session.revoked && !session.is_current && (
                        <button
                          type="button"
                          onClick={() => handleRevoke(session.id)}
                          disabled={revokingId === session.id || revokingOthers}
                          className="inline-flex items-center justify-center rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-1.5 text-[11px] font-medium text-red-300 transition-all hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {revokingId === session.id ? "Revoking…" : "Revoke"}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Mobile */}
                  <div className="flex flex-col gap-3 md:hidden">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03]">
                        <DeviceIcon className="h-5 w-5 text-white/65" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-white">
                          {getDeviceLabel(session)}
                        </div>
                        <div className="mt-0.5 text-xs text-white/35">
                          {session.user_agent || "Unknown user agent"}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <div className="mb-1 text-white/25">IP Address</div>
                        <div className="font-mono text-white/50">
                          {session.ip_address || "Unknown"}
                        </div>
                      </div>

                      <div>
                        <div className="mb-1 text-white/25">Activity</div>
                        <div className="text-white/50">
                          {formatRelativeActivity(
                            session.last_seen_at || session.created_at,
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium ${status.cls}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                        {status.label}
                      </span>

                      {!session.revoked && !session.is_current && (
                        <button
                          type="button"
                          onClick={() => handleRevoke(session.id)}
                          disabled={revokingId === session.id || revokingOthers}
                          className="inline-flex items-center justify-center rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-1.5 text-[11px] font-medium text-red-300 transition-all hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {revokingId === session.id ? "Revoking…" : "Revoke"}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}