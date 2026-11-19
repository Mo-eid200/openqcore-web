import type { Metadata } from "next";
import { Suspense } from "react";

// The OAuth return page carries one-time codes; it must never be indexed.
export const metadata: Metadata = { robots: { index: false, follow: false } };

// The page reads the query string (useSearchParams), so it renders in the
// browser inside a Suspense boundary while the rest of the site is static.
export default function Layout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}
