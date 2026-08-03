"use client";

import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { KeyRound, Loader2 } from "lucide-react";
import {
  getPasswordStatus,
  changePassword,
} from "@/app/lib/api/auth/password.api";

type Accent = "red" | "amber";

const ACCENT = {
  red: {
    iconBox: "border-red-300/10 bg-red-300/[0.08]",
    icon: "text-red-200",
    glow: "bg-red-300/[0.04]",
    focus:
      "focus:border-red-300/12 focus:bg-white/[0.05] focus:ring-2 focus:ring-red-300/[0.08]",
    btn: "bg-red-300 text-black hover:bg-red-200",
  },
  amber: {
    iconBox: "border-amber-300/10 bg-amber-300/[0.08]",
    icon: "text-amber-300",
    glow: "bg-amber-300/[0.04]",
    focus:
      "focus:border-amber-300/12 focus:bg-white/[0.05] focus:ring-2 focus:ring-amber-300/[0.08]",
    btn: "bg-amber-300 text-black hover:bg-amber-200",
  },
} as const;

const cardCls = `
  relative overflow-hidden rounded-2xl
  border border-white/[0.06]
  bg-[#0f1012]/92 p-5
  shadow-[0_16px_40px_rgba(0,0,0,0.18)]
  backdrop-blur-xl
`;

function Banner({
  tone,
  message,
}: {
  tone: "error" | "success";
  message: string;
}) {
  const cls =
    tone === "error"
      ? "border-red-300/15 bg-red-300/[0.06] text-red-200"
      : "border-emerald-300/15 bg-emerald-300/[0.06] text-emerald-200";

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <div className={`rounded-xl border px-3 py-2 text-xs ${cls}`}>
        {message}
      </div>
    </motion.div>
  );
}

export function ChangePasswordSettings({
  accent = "red",
}: {
  accent?: Accent;
}) {
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

  const inputCls = `
    w-full rounded-xl border border-white/[0.08]
    bg-white/[0.03] px-4 py-2.5
    text-sm text-white outline-none
    placeholder:text-white/20
    transition-all
    ${colors.focus}
  `;

  const primaryBtnCls = `
    inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl
    text-sm font-semibold transition-all
    disabled:cursor-not-allowed disabled:opacity-40
    ${colors.btn}
  `;

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

      queryClient.setQueryData(["auth-password-status"], {
        has_password: true,
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message || "Failed to update password.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className={cardCls}>
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute right-[-40px] top-[-50px] h-[120px] w-[120px] rounded-full blur-[70px] ${colors.glow}`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.02),transparent_35%)]" />
      </div>

      {/* Header */}
      <div className="relative mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${colors.iconBox}`}
          >
            <KeyRound className={`h-5 w-5 ${colors.icon}`} />
          </div>

          <div>
            <div className="text-base font-semibold text-white">
              {hasPassword === false ? "Set a Password" : "Change Password"}
            </div>

            <div className="mt-1 text-xs leading-5 text-white/35">
              {hasPassword === false
                ? "You currently sign in with Google or Microsoft. Set a password to also enable email login."
                : "Update the password used to sign in with your email."}
            </div>
          </div>
        </div>
      </div>

      {statusLoading || hasPassword === null ? (
        <div className="relative h-40 rounded-xl border border-white/[0.05] bg-white/[0.03] animate-pulse" />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="relative flex max-w-md flex-col gap-3"
        >
          <AnimatePresence>
            {hasPassword && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <label className="mb-1.5 block text-xs font-medium text-white/40">
                  Current password
                </label>

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
            <label className="mb-1.5 block text-xs font-medium text-white/40">
              New password
            </label>

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
            <label className="mb-1.5 block text-xs font-medium text-white/40">
              Confirm new password
            </label>

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

          <p className="text-[11px] leading-5 text-white/25">
            Use at least 8 characters. If you change your password, your other
            signed-in sessions may be signed out.
          </p>

          <AnimatePresence>
            {error && <Banner tone="error" message={error} />}
          </AnimatePresence>

          <AnimatePresence>
            {success && <Banner tone="success" message={success} />}
          </AnimatePresence>

          <button
            type="submit"
            disabled={submitting}
            className={`${primaryBtnCls} mt-1`}
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {submitting
              ? "Saving…"
              : hasPassword
                ? "Change Password"
                : "Set Password"}
          </button>
        </form>
      )}
    </section>
  );
}