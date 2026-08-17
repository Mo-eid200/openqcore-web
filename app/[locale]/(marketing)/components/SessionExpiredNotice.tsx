"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * 🔧 NEW: shows a clear "your session has expired" banner instead of
 * silently leaving the dashboard open with a console error when a
 * 401 fires (e.g. after the tab was idle/asleep and the token
 * expired). Paired with qxtClient.ts's handleSessionExpiry(), which
 * redirects here with "?session_expired=true" after cleaning up
 * stored auth state.
 *
 * Mount this ONCE, high up in the app (e.g. the root layout), so it
 * catches the redirect regardless of which page the user lands back
 * on.
 */
export default function SessionExpiredNotice() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (searchParams.get("session_expired") !== "true") return;

    setVisible(true);

    // Strip the query param so a page refresh doesn't re-trigger the
    // banner.
    const params = new URLSearchParams(searchParams.toString());
    params.delete("session_expired");
    const cleanQuery = params.toString();
    router.replace(cleanQuery ? `/?${cleanQuery}` : "/", { scroll: false });

    const timer = setTimeout(() => setVisible(false), 6000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  if (!visible) return null;

  return (
    <div
      role="alert"
      className="
        fixed left-1/2 top-4 z-[999] -translate-x-1/2
        rounded-xl border border-white/[0.10]
        bg-[#12141a]/95 px-5 py-3
        text-[13px] text-slate-200
        shadow-[0_12px_40px_rgba(0,0,0,0.35)]
        backdrop-blur-xl
        animate-in fade-in slide-in-from-top-3 duration-300
      "
    >
      Your session has expired — please sign in again.
    </div>
  );
}