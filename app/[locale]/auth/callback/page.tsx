"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  loginSideEffects,
} from "../../../lib/api/auth/auth.helpers";

import {
  fetchBootstrap,
  invalidateAuthCache,
} from "../../../lib/api/auth/auth.api";

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const bootstrap = async () => {
      try {
        // ---------------------------------------------------------
        // 1. Provider error
        // ---------------------------------------------------------

        const oauthError =
          searchParams.get("error") ||
          searchParams.get("error_description");

        if (oauthError) {
          console.error("[OAuth] Provider error:", oauthError);

          router.replace("/?auth_error=oauth");
          return;
        }

        // ---------------------------------------------------------
        // 2. Read JWT from query string
        // ---------------------------------------------------------

        let token =
          searchParams.get("token") ||
          searchParams.get("access_token");

        // ---------------------------------------------------------
        // 3. Fallback: URL hash
        // ---------------------------------------------------------

        if (!token && typeof window !== "undefined") {
          const hash = window.location.hash.replace(/^#/, "");

          if (hash) {
            const params = new URLSearchParams(hash);

            token =
              params.get("token") ||
              params.get("access_token");
          }
        }

        // ---------------------------------------------------------
        // 4. JWT required
        // ---------------------------------------------------------

        if (!token) {
          console.warn("[OAuth] No access token returned");

          router.replace("/?auth_error=missing_token");
          return;
        }

        // ---------------------------------------------------------
        // 5. Persist token + configure API clients
        // ---------------------------------------------------------

        invalidateAuthCache();
        loginSideEffects(token);

        // ---------------------------------------------------------
        // 6. Verify token / bootstrap user
        // ---------------------------------------------------------

        const result = await fetchBootstrap(true);

        if (!result?.user) {
          throw new Error(
            "OAuth authentication succeeded but user bootstrap failed"
          );
        }

        console.log(
          "[OAuth] Authentication completed:",
          result.user.email
        );

        // ---------------------------------------------------------
        // 7. Remove JWT from browser history
        // ---------------------------------------------------------

        if (typeof window !== "undefined") {
          window.history.replaceState(
            {},
            document.title,
            "/auth/callback"
          );
        }

        // ---------------------------------------------------------
        // 8. Return to application
        // ---------------------------------------------------------

        router.replace("/");
      } catch (error: any) {
        console.error(
          "[OAuth] Authentication bootstrap failed:",
          error?.response?.data || error
        );

        router.replace("/?auth_error=bootstrap");
      }
    };

    void bootstrap();
  }, [router, searchParams]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050811]">
      <div className="flex flex-col items-center gap-5">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#d4af37]" />

        <div className="text-center">
          <p className="text-sm font-medium text-white">
            Completing sign-in
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Connecting your OpenQCore account…
          </p>
        </div>
      </div>
    </main>
  );
}