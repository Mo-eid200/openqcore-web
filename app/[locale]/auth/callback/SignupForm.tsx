"use client";

// The provider came back without an e-mail we can use (ORCID record without a
// public e-mail, GitHub account without a verified one). The person types an
// address, gets a 6-digit code there, and enters it; the API then signs them
// in to the account with that address (connecting their ORCID iD) or makes
// one. The pending token only works in the browser that came back from the
// provider (an httpOnly cookie on the API host).
//
// Text blocks are <div>s: the global `p` style would override font sizes.

import { FormEvent, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";

import {
  oauthSignupInfo,
  oauthSignupSendCode,
  oauthSignupVerify,
  type OAuthSignupInfo,
  type OAuthSignupResult,
} from "@/app/lib/api/auth/auth.api";
import { errorCode, errorExtra } from "@/app/lib/errors";

// errors after which this pending sign-in can't continue
const FINAL = new Set(["SIGNUP_EXPIRED", "SIGNUP_OTHER_BROWSER", "SIGNUP_INVALID", "ORCID_IN_USE", "ACCOUNT_DISABLED"]);
const KNOWN = new Set([
  ...FINAL,
  "EMAIL_INVALID",
  "TOO_MANY_CODES",
  "EMAIL_NOT_SENT",
  "CODE_WRONG",
  "CODE_EXPIRED",
  "TOO_MANY_ATTEMPTS",
]);

const inputCls =
  "h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#d4af37]";
const primaryCls =
  "h-11 w-full rounded-xl border border-white/10 bg-gradient-to-r from-[#d4af37] via-[#ffe89e] to-[#ffd466] text-base font-bold text-[#161d2a] shadow transition hover:opacity-90 disabled:opacity-50";
const linkCls = "text-xs font-medium text-slate-400 underline-offset-4 transition hover:text-white hover:underline";

type Props = {
  token: string;
  provider: "orcid" | "github";
  onSignedIn: (result: OAuthSignupResult) => void;
  onStartAgain: () => void;
};

export default function SignupForm({ token, provider, onSignedIn, onStartAgain }: Props) {
  const t = useTranslations("auth_modal.callback");
  const [info, setInfo] = useState<OAuthSignupInfo | null>(null);
  const [email, setEmail] = useState("");
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<{ code: string; left?: number } | null>(null);

  // who is signing in (also checks early that this is the right browser)
  useEffect(() => {
    let alive = true;
    oauthSignupInfo(token)
      .then((data) => {
        if (alive) setInfo(data);
      })
      .catch((caught) => {
        if (alive) setError({ code: errorCode(caught) || "default" });
      });
    return () => {
      alive = false;
    };
  }, [token]);

  function fail(caught: unknown) {
    const c = errorCode(caught) || "default";
    const left = errorExtra(caught).attempts_left;
    setError({ code: c, left: typeof left === "number" ? left : undefined });
    if (c === "CODE_EXPIRED" || c === "TOO_MANY_ATTEMPTS") {
      setCode("");
    }
  }

  async function sendCode(e?: FormEvent) {
    e?.preventDefault();
    if (busy || !email.trim()) return;
    setBusy(true);
    setError(null);
    try {
      await oauthSignupSendCode(token, email.trim());
      setSentTo(email.trim().toLowerCase());
      setCode("");
    } catch (caught) {
      fail(caught);
    } finally {
      setBusy(false);
    }
  }

  async function verify(e: FormEvent) {
    e.preventDefault();
    if (busy || !code.trim()) return;
    setBusy(true);
    setError(null);
    try {
      onSignedIn(await oauthSignupVerify(token, code.trim()));
    } catch (caught) {
      fail(caught);
      setBusy(false);
    }
  }

  const final = error && FINAL.has(error.code);
  const message = error
    ? error.code === "ACCOUNT_DISABLED"
      ? t("errors.ACCOUNT_DISABLED")
      : KNOWN.has(error.code)
        ? t(`signup.errors.${error.code}`, { left: error.left ?? 0 })
        : t("errors.default")
    : null;

  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-7">
      <Mail className="mx-auto h-8 w-8 text-[#d4af37]" />
      <h1 className="mt-4 text-center text-lg font-semibold text-white">
        {provider === "orcid" ? t("signup.title_orcid") : t("signup.title_github")}
      </h1>

      {info && (info.name || info.orcid) && (
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center">
          <div className="text-[11px] uppercase tracking-wider text-slate-500">{t("signup.signing_in_as")}</div>
          {info.name && <div className="mt-1 text-sm font-semibold text-white">{info.name}</div>}
          {info.orcid && (
            <a
              href={`https://orcid.org/${info.orcid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-0.5 inline-block font-mono text-xs text-[#a6ce39] hover:underline"
            >
              {info.orcid}
            </a>
          )}
        </div>
      )}

      {final ? (
        <>
          <div className="mt-5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-xs leading-5 text-red-200">
            {message}
          </div>
          <button type="button" onClick={onStartAgain} className={`mt-4 ${primaryCls}`}>
            {t("signup.start_again")}
          </button>
        </>
      ) : !sentTo ? (
        <form onSubmit={sendCode} className="mt-4">
          <div className="text-center text-xs leading-5 text-slate-400">
            {provider === "orcid" ? t("signup.intro_orcid") : t("signup.intro_github")}
          </div>
          <label htmlFor="signup-email" className="mt-5 mb-2 block text-xs font-medium text-neutral-400">
            {t("signup.email_label")}
          </label>
          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@university.edu"
            autoFocus
            required
            className={inputCls}
          />
          <div className="mt-2 text-[11px] leading-4 text-slate-500">
            {provider === "orcid" ? t("signup.existing_orcid") : t("signup.existing_github")}
          </div>
          {message && (
            <div className="mt-3 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-xs text-red-200">
              {message}
            </div>
          )}
          <button type="submit" disabled={busy || !info} className={`mt-4 ${primaryCls}`}>
            {busy ? t("signup.sending") : t("signup.send")}
          </button>
        </form>
      ) : (
        <form onSubmit={verify} className="mt-4">
          <div className="text-center text-xs leading-5 text-slate-400">
            {t("signup.code_sent", { email: sentTo, minutes: info?.code_minutes ?? 10 })}
          </div>
          <label htmlFor="signup-code" className="mt-5 mb-2 block text-xs font-medium text-neutral-400">
            {t("signup.code_label")}
          </label>
          <input
            id="signup-code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="123456"
            autoFocus
            required
            className={`${inputCls} text-center text-lg font-medium tracking-[0.3em]`}
          />
          {message && (
            <div className="mt-3 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-xs text-red-200">
              {message}
            </div>
          )}
          <button type="submit" disabled={busy || code.length < 6} className={`mt-4 ${primaryCls}`}>
            {busy ? t("signup.verifying") : t("signup.verify")}
          </button>
          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              className={linkCls}
              onClick={() => {
                setSentTo(null);
                setError(null);
              }}
            >
              {t("signup.change_email")}
            </button>
            <button type="button" className={linkCls} disabled={busy} onClick={() => void sendCode()}>
              {t("signup.resend")}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
