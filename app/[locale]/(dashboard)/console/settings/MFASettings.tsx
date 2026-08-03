"use client";

import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { ShieldCheck, Copy, Check, X, Loader2 } from "lucide-react";
import {
  getMfaStatus,
  setupMfa,
  verifyMfaSetup,
  disableMfa,
} from "@/app/lib/api/auth/mfa.api";

type View = "status" | "setup-qr" | "setup-codes" | "disable";
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

const outlineBtnCls = `
  inline-flex h-9 items-center justify-center gap-2 rounded-xl
  border border-white/[0.10]
  bg-white/[0.04] px-4
  text-xs font-medium text-white/70
  transition-all
  hover:bg-white/[0.08]
  hover:text-white
  disabled:cursor-not-allowed disabled:opacity-40
`;

function ErrorBanner({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <div className="rounded-xl border border-red-300/15 bg-red-300/[0.06] px-3 py-2 text-xs text-red-200">
        {message}
      </div>
    </motion.div>
  );
}

export function MFASettings({ accent = "red" }: { accent?: Accent }) {
  const colors = ACCENT[accent];
  const queryClient = useQueryClient();

  const inputCls = `
    w-full rounded-xl border border-white/[0.08]
    bg-white/[0.03] px-4 py-2.5
    text-sm text-white outline-none
    placeholder:text-white/20
    transition-all
    ${colors.focus}
  `;

  const primaryBtnCls = `
    inline-flex h-10 items-center justify-center gap-2 rounded-xl px-5
    text-sm font-semibold transition-all
    disabled:cursor-not-allowed disabled:opacity-40
    ${colors.btn}
  `;

  const { data: statusData, isLoading: statusLoading } = useQuery({
    queryKey: ["auth-mfa-status"],
    queryFn: getMfaStatus,
    staleTime: 60_000,
  });

  const enabled = statusData?.enabled ?? false;

  const [view, setView] = useState<View>("status");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [secret, setSecret] = useState("");
  const [otpauthUri, setOtpauthUri] = useState("");
  const [setupCode, setSetupCode] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const [disablePassword, setDisablePassword] = useState("");
  const [disableCode, setDisableCode] = useState("");

  async function handleStartSetup() {
    setError(null);
    setSubmitting(true);
    try {
      const data = await setupMfa();
      setSecret(data.secret);
      setOtpauthUri(data.otpauth_uri);
      setSetupCode("");
      setView("setup-qr");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleVerifySetup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const data = await verifyMfaSetup(setupCode.trim());
      setBackupCodes(data.backup_codes);
      setView("setup-codes");
    } catch (err: any) {
      setError(err.message);
      setSetupCode("");
    } finally {
      setSubmitting(false);
    }
  }

  function handleFinishSetup() {
    queryClient.setQueryData(["auth-mfa-status"], { enabled: true });
    setBackupCodes([]);
    setSecret("");
    setOtpauthUri("");
    setView("status");
  }

  async function handleDisable(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await disableMfa({
        password: disablePassword || undefined,
        code: disableCode || undefined,
      });
      queryClient.setQueryData(["auth-mfa-status"], { enabled: false });
      setDisablePassword("");
      setDisableCode("");
      setView("status");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function copySecret() {
    navigator.clipboard.writeText(secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function cancelFlow() {
    setError(null);
    setSetupCode("");
    setDisablePassword("");
    setDisableCode("");
    setView("status");
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
      <div className="relative mb-5 flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${colors.iconBox}`}
        >
          <ShieldCheck className={`h-5 w-5 ${colors.icon}`} />
        </div>

        <div>
          <div className="text-base font-semibold text-white">
            Multi-Factor Authentication
          </div>
          <div className="mt-1 text-xs leading-5 text-white/35">
            Add an extra verification step to better protect your account.
          </div>
        </div>
      </div>

      {statusLoading ? (
        <div className="h-24 rounded-xl border border-white/[0.05] bg-white/[0.03] animate-pulse" />
      ) : (
        <AnimatePresence mode="wait">
          {view === "status" && (
            <motion.div
              key="status"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="relative flex flex-col gap-4"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
                    enabled
                      ? "border-emerald-300/10 bg-emerald-300/[0.08] text-emerald-200"
                      : "border-white/[0.08] bg-white/[0.03] text-white/40"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      enabled ? "bg-emerald-300" : "bg-white/30"
                    }`}
                  />
                  {enabled ? "Enabled" : "Disabled"}
                </span>

                <button
                  onClick={() => (enabled ? setView("disable") : handleStartSetup())}
                  disabled={submitting}
                  className={enabled ? outlineBtnCls : primaryBtnCls}
                >
                  {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  {submitting ? "Please wait…" : enabled ? "Disable" : "Enable"}
                </button>
              </div>

              <p className="text-sm leading-6 text-white/40">
                Require a code from an authenticator app in addition to your
                password when signing in.
              </p>

              <AnimatePresence>
                {error && <ErrorBanner message={error} />}
              </AnimatePresence>
            </motion.div>
          )}

          {view === "setup-qr" && (
            <motion.div
              key="setup-qr"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="relative flex flex-col gap-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-white">
                    Scan this QR code
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/40">
                    Use Google Authenticator, Authy, or any TOTP app. If you
                    cannot scan the code, enter the secret manually below.
                  </p>
                </div>

                <button
                  onClick={cancelFlow}
                  className="text-white/30 transition-colors hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.05 }}
                className="mx-auto w-fit rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
              >
                <QRCodeSVG value={otpauthUri} size={180} />
              </motion.div>

              <div className="rounded-xl border border-white/[0.05] bg-white/[0.03] px-3 py-2.5">
                <div className="mb-1 text-[10px] font-medium uppercase tracking-wide text-white/25">
                  Manual setup code
                </div>

                <div className="flex items-center gap-2">
                  <code className="flex-1 break-all font-mono text-xs text-white/60">
                    {secret}
                  </code>

                  <button
                    onClick={copySecret}
                    className="shrink-0 text-white/30 transition-colors hover:text-white"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-emerald-300" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <form onSubmit={handleVerifySetup} className="flex flex-col gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-white/40">
                    Enter the 6-digit code from your app
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    autoFocus
                    required
                    value={setupCode}
                    onChange={(e) => setSetupCode(e.target.value)}
                    placeholder="123456"
                    className={`${inputCls} text-center text-lg tracking-[0.3em]`}
                  />
                </div>

                <AnimatePresence>
                  {error && <ErrorBanner message={error} />}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={submitting || setupCode.trim().length < 6}
                  className={`${primaryBtnCls} w-full`}
                >
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {submitting ? "Verifying…" : "Verify & Enable"}
                </button>
              </form>
            </motion.div>
          )}

          {view === "setup-codes" && (
            <motion.div
              key="setup-codes"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="relative flex flex-col gap-4"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-300" />
                <p className="text-sm font-medium text-white">
                  MFA is now enabled
                </p>
              </div>

              <p className="text-xs leading-5 text-white/40">
                Save these backup codes somewhere safe. Each code can be used
                once if you lose access to your authenticator app. They will
                not be shown again.
              </p>

              <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/[0.05] bg-white/[0.03] p-4 font-mono text-sm text-white/80">
                {backupCodes.map((code) => (
                  <div key={code} className="text-center">
                    {code}
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigator.clipboard.writeText(backupCodes.join("\n"))}
                className={`${outlineBtnCls} w-full`}
              >
                <Copy className="h-3.5 w-3.5" />
                Copy all codes
              </button>

              <button onClick={handleFinishSetup} className={`${primaryBtnCls} w-full`}>
                I&apos;ve saved these codes
              </button>
            </motion.div>
          )}

          {view === "disable" && (
            <motion.div
              key="disable"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="relative flex flex-col gap-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-white">Disable MFA</p>
                  <p className="mt-1 text-xs leading-5 text-white/40">
                    Confirm your password or a current authenticator code to
                    turn off MFA.
                  </p>
                </div>

                <button
                  onClick={cancelFlow}
                  className="text-white/30 transition-colors hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleDisable} className="flex flex-col gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-white/40">
                    Password
                  </label>

                  <input
                    type="password"
                    value={disablePassword}
                    onChange={(e) => setDisablePassword(e.target.value)}
                    placeholder="••••••••"
                    className={`${inputCls} text-sm`}
                  />
                </div>

                <div className="text-center text-xs text-white/25">— or —</div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-white/40">
                    Authenticator code
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    value={disableCode}
                    onChange={(e) => setDisableCode(e.target.value)}
                    placeholder="123456"
                    className={`${inputCls} text-center tracking-[0.2em]`}
                  />
                </div>

                <AnimatePresence>
                  {error && <ErrorBanner message={error} />}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={submitting || (!disablePassword && !disableCode)}
                  className="
                    inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl
                    border border-red-300/15
                    bg-red-300/[0.06]
                    text-sm font-semibold text-red-200
                    transition-all hover:bg-red-300/[0.12]
                    disabled:cursor-not-allowed disabled:opacity-40
                  "
                >
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {submitting ? "Disabling…" : "Disable MFA"}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
}