"use client";

// (Text blocks are <div>s: the global `p` style in globals.css would
// override their Tailwind font sizes.)
//
// Where every social sign-in (Google, Microsoft, Apple, GitHub, ORCID) comes
// back to. The API sends one of:
//   ?token=<jwt>&next=<path>          signed in
//   ?mfa_challenge=<id>&next=<path>   two-factor sign-in is on: ask for the code
//   ?auth_error=<CODE>                nothing signed in (GitHub and ORCID)
//   ?error=...                        the provider refused (older flows)

import { FormEvent, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ShieldCheck } from "lucide-react";

import { useAuth } from "@/app/context/AuthContext";
import { useMounted } from "@/app/hooks/useMounted";
import { errorMessage } from "@/app/lib/errors";

const KNOWN_ERRORS = new Set(["GITHUB_NO_VERIFIED_EMAIL", "ORCID_NO_ACCOUNT", "ACCOUNT_DISABLED"]);
const DENIED = new Set(["GITHUB_DENIED", "ORCID_DENIED", "access_denied"]);

/** Internal paths only: "/research" yes, "//evil.example" or "https://…" no. */
function safeNext(value: string | null): string {
  return value && value.startsWith("/") && !value.startsWith("//") && !value.startsWith("/\\") ? value : "/";
}

// Some providers put the token in the URL fragment, which the server never sees.
const noopSubscribe = () => () => {};
function useHashParam(name: string): string | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => new URLSearchParams(window.location.hash.replace(/^#/, "")).get(name),
    () => null,
  );
}

/** Drop the token or challenge from the address bar and the history. */
function cleanAddress() {
  window.history.replaceState({}, document.title, window.location.pathname);
}

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("auth_modal");
  const { setAuthFromToken, verifyMfaLogin } = useAuth();

  const hashToken = useHashParam("token");
  const hashAccessToken = useHashParam("access_token");
  const token = searchParams.get("token") || searchParams.get("access_token") || hashToken || hashAccessToken;
  const challenge = searchParams.get("mfa_challenge");
  const next = safeNext(searchParams.get("next"));
  const providerError = searchParams.get("auth_error") || searchParams.get("error");

  const [failure, setFailure] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [mfaError, setMfaError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const startedRef = useRef(false);
  const mounted = useMounted();

  // Signed in: store the token, load the account, go on.
  useEffect(() => {
    if (!token || startedRef.current) return;
    startedRef.current = true;
    cleanAddress();
    setAuthFromToken(token)
      .then(() => router.replace(next))
      .catch((caught) => {
        console.error("[OAuth] sign-in could not be completed:", errorMessage(caught));
        setFailure("default");
      });
  }, [token, next, router, setAuthFromToken]);

  async function submitCode(e: FormEvent) {
    e.preventDefault();
    if (!challenge || submitting || !code.trim()) return;
    setSubmitting(true);
    setMfaError(null);
    try {
      await verifyMfaLogin(challenge, code.trim());
      cleanAddress();
      router.replace(next);
    } catch (caught) {
      setMfaError(errorMessage(caught, t("errors.mfa_code_invalid")));
      setCode("");
      setSubmitting(false);
    }
  }

  // ── what to show ──────────────────────────────────────────────────────────

  let errorKey: string | null = failure;
  if (!errorKey && providerError) {
    errorKey = KNOWN_ERRORS.has(providerError) ? providerError : DENIED.has(providerError) ? "DENIED" : "default";
  }
  // nothing to work with (opened directly, or the token was already used)
  if (!errorKey && mounted && !token && !challenge) errorKey = "default";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050811] px-4">
      {errorKey ? (
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-7 text-center">
          <h1 className="text-lg font-semibold text-white">{t("callback.error_title")}</h1>
          <div className="mt-3 text-sm leading-6 text-slate-400">{t(`callback.errors.${errorKey}`)}</div>
          <button
            type="button"
            onClick={() => router.replace("/")}
            className="mt-6 h-10 w-full rounded-xl border border-white/10 bg-white/[0.04] text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.08]"
          >
            {t("callback.back")}
          </button>
        </div>
      ) : challenge && !token ? (
        <form
          onSubmit={submitCode}
          className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-7"
        >
          <ShieldCheck className="mx-auto h-8 w-8 text-[#d4af37]" />
          <h1 className="mt-4 text-center text-lg font-semibold text-white">{t("mfa.title")}</h1>
          <div className="mt-2 text-center text-xs leading-5 text-slate-400">{t("mfa.desc")}</div>

          <label htmlFor="mfa-code" className="mt-5 mb-2 block text-xs font-medium text-neutral-400">
            {t("mfa.code_label")}
          </label>
          <input
            id="mfa-code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="123456"
            autoFocus
            required
            className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-center text-lg font-medium tracking-[0.3em] text-white outline-none transition focus:border-[#d4af37]"
          />

          {mfaError && (
            <div className="mt-3 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-xs text-red-200">
              {mfaError}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-4 h-11 w-full rounded-xl border border-white/10 bg-gradient-to-r from-[#d4af37] via-[#ffe89e] to-[#ffd466] text-base font-bold text-[#161d2a] shadow transition hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? t("mfa.verifying") : t("mfa.verify_cta")}
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center gap-5">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#d4af37]" />
          <div className="text-center">
            <div className="text-sm font-medium text-white">{t("callback.completing")}</div>
            <div className="mt-1 text-xs text-slate-500">{t("callback.connecting")}</div>
          </div>
        </div>
      )}
    </main>
  );
}
