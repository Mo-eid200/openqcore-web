"use client";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { KeyRound } from "lucide-react";
import { getPasswordStatus, changePassword } from "@/app/lib/api/auth/password.api";

type Accent = "red" | "amber";

const ACCENT = {
  red: {
    iconBox: "border-red-500/20 bg-red-500/10",
    icon: "text-red-400",
    focus: "focus:border-red-500/50",
    btn: "bg-red-500 text-white hover:bg-red-400",
  },
  amber: {
    iconBox: "border-amber-400/20 bg-amber-400/10",
    icon: "text-amber-300",
    focus: "focus:border-amber-400/50",
    btn: "bg-amber-400 text-black hover:bg-amber-300",
  },
} as const;

const cardCls = "rounded-2xl border border-white/[0.07] bg-[#0c0a06]/95 backdrop-blur-xl p-5";

function ErrorBanner({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <div className="rounded-lg border border-red-400/25 bg-red-500/10 px-3 py-2 text-xs text-red-300">
        {message}
      </div>
    </motion.div>
  );
}

export function ChangePasswordSettings({ accent = "red" }: { accent?: Accent }) {
  const colors = ACCENT[accent];
  const queryClient = useQueryClient();

  const { data: statusData, isLoading: statusLoading } = useQuery({
    queryKey: ["auth-password-status"],
    queryFn: getPasswordStatus,
    staleTime: 60_000,
  });
  const hasPassword = statusData?.has_password ?? null;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const inputCls = `w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors ${colors.focus} focus:bg-white/[0.07]`;
  const primaryBtnCls = `inline-flex items-center justify-center gap-2 h-10 rounded-xl px-5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-40 ${colors.btn}`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      const result = await changePassword({
        current_password: hasPassword ? currentPassword : undefined,
        new_password: newPassword,
      });
      setSuccess(
        result.action === "set"
          ? "Password set. You can now also sign in with your email and password."
          : "Password changed. Your other sessions have been signed out."
      );
      queryClient.setQueryData(["auth-password-status"], { has_password: true });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={cardCls}>
      <div className="mb-4 flex items-center gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${colors.iconBox}`}>
          <KeyRound className={`h-5 w-5 ${colors.icon}`} />
        </div>
        <div>
          <div className="text-base font-semibold text-white">
            {hasPassword === false ? "Set a Password" : "Change Password"}
          </div>
          <div className="text-xs text-white/35">
            {hasPassword === false
              ? "You currently sign in with Google or Microsoft. Set a password to also enable email login."
              : "Update the password used to sign in with your email."}
          </div>
        </div>
      </div>

      {statusLoading || hasPassword === null ? (
        <div className="h-32 rounded-xl bg-white/[0.03] animate-pulse" />
      ) : (
        <form onSubmit={handleSubmit} className="flex max-w-sm flex-col gap-3">
          <AnimatePresence>
            {hasPassword && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <label className="mb-1.5 block text-xs font-medium text-white/40">Current password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={inputCls}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/40">New password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              required
              className={inputCls}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/40">Confirm new password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
              required
              className={inputCls}
            />
          </div>

          <AnimatePresence>{error && <ErrorBanner message={error} />}</AnimatePresence>

          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="rounded-lg border border-emerald-400/25 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
                  {success}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button type="submit" disabled={submitting} className={`${primaryBtnCls} mt-1 w-full`}>
            {submitting ? "Saving…" : hasPassword ? "Change Password" : "Set Password"}
          </button>
        </form>
      )}
    </div>
  );
}