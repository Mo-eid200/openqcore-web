import type { Metadata } from "next";

// The OAuth return page carries one-time codes; it must never be indexed.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
