"use client";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { ShieldCheck, Copy, Check, X } from "lucide-react";
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
const outlineBtnCls =
  "inline-flex items-center justify-center gap-2 h-9 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-xs font-medium text-white/70 transition-all hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-40";

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

export function MFASettings({ accent = "red" }: { accent?: Accent }) {
  const colors = ACCENT[accent];
  const queryClient = useQueryClient();

  const inputCls = `w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none transition-colors ${colors.focus} focus:bg-white/[0.07]`;
  const primaryBtnCls = `inline-flex items-center justify-center gap-2 h-10 rounded-xl px-5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-40 ${colors.btn}`;

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
    <div className={cardCls}>
      <div className="mb-4 flex items-center gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${colors.iconBox}`}>
          <ShieldCheck className={`h-5 w-5 ${colors.icon}`} />
        </div>
        <div>
          <div className="text-base font-semibold text-white">Multi-Factor Authentication</div>
          <div className="text-xs text-white/35">Extra protection for your account</div>
        </div>
      </div>

      {statusLoading ? (
        <div className="h-14 rounded-xl bg-white/[0.03] animate-pulse" />
      ) : (
        <AnimatePresence mode="wait">
          {view === "status" && (
            <motion.div
              key="status"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
                    enabled
                      ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-300"
                      : "border-white/10 bg-white/[0.04] text-white/40"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${enabled ? "bg-emerald-400" : "bg-white/30"}`} />
                  {enabled ? "Enabled" : "Disabled"}
                </span>

                <button
                  onClick={() => (enabled ? setView("disable") : handleStartSetup())}
                  disabled={submitting}
                  className={enabled ? outlineBtnCls : primaryBtnCls}
                >
                  {submitting ? "Please wait…" : enabled ? "Disable" : "Enable"}
                </button>
              </div>

              <p className="text-sm text-white/40">
                Require a code from an authenticator app in addition to your password when signing in.
              </p>

              <AnimatePresence>{error && <ErrorBanner message={error} />}</AnimatePresence>
            </motion.div>
          )}

          {view === "setup-qr" && (
            <motion.div
              key="setup-qr"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">Scan this QR code</p>
                <button onClick={cancelFlow} className="text-white/30 hover:text-white transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-white/40">
                Use Google Authenticator, Authy, or any TOTP app. Can't scan? Enter the code manually below.
              </p>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.05 }}
                className="mx-auto w-fit rounded-xl bg-white p-4"
              >
                <QRCodeSVG value={otpauthUri} size={180} />
              </motion.div>

              <div className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-2">
                <code className="flex-1 break-all font-mono text-xs text-white/60">{secret}</code>
                <button onClick={copySecret} className="shrink-0 text-white/30 hover:text-white transition-colors">
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
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

                <AnimatePresence>{error && <ErrorBanner message={error} />}</AnimatePresence>

                <button
                  type="submit"
                  disabled={submitting || setupCode.trim().length < 6}
                  className={`${primaryBtnCls} w-full`}
                >
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
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                <p className="text-sm font-medium text-white">MFA is now enabled</p>
              </div>
              <p className="text-xs text-white/40">
                Save these backup codes somewhere safe. Each one can be used once if you lose access to your
                authenticator app — they won't be shown again.
              </p>

              <div className="grid grid-cols-2 gap-2 rounded-xl bg-white/[0.03] p-4 font-mono text-sm text-white/80">
                {backupCodes.map((code) => (
                  <div key={code} className="text-center">{code}</div>
                ))}
              </div>

              <button
                onClick={() => navigator.clipboard.writeText(backupCodes.join("\n"))}
                className={`${outlineBtnCls} w-full`}
              >
                Copy all codes
              </button>

              <button onClick={handleFinishSetup} className={`${primaryBtnCls} w-full`}>
                I've saved these codes
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
              className="flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">Disable MFA</p>
                <button onClick={cancelFlow} className="text-white/30 hover:text-white transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-white/40">
                Confirm your password or a current authenticator code to turn off MFA.
              </p>

              <form onSubmit={handleDisable} className="flex flex-col gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-white/40">Password</label>
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
                  <label className="mb-1.5 block text-xs font-medium text-white/40">Authenticator code</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={disableCode}
                    onChange={(e) => setDisableCode(e.target.value)}
                    placeholder="123456"
                    className={`${inputCls} text-center tracking-[0.2em]`}
                  />
                </div>

                <AnimatePresence>{error && <ErrorBanner message={error} />}</AnimatePresence>

                <button
                  type="submit"
                  disabled={submitting || (!disablePassword && !disableCode)}
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-red-400/25 bg-red-500/10 text-sm font-semibold text-red-300 transition-all hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {submitting ? "Disabling…" : "Disable MFA"}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}