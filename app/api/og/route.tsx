// app/api/og/route.tsx
//
// Branded Open Graph image (1200×630) for pages without a designed one:
// /api/og?title=...&kicker=...  Link previews on LinkedIn, X, WhatsApp and
// Slack show the page title on the site's dark-and-gold look.

import { ImageResponse } from "next/og";

export const runtime = "edge";

const clip = (v: string | null, max: number) => (v ?? "").replace(/\s+/g, " ").trim().slice(0, max);

// Inter (SIL Open Font License, Latin including Albanian, Turkish and French
// letters) is bundled, so the image never depends on a font download. The
// image renderer cannot lay out right-to-left text correctly, so callers pass
// the English title; Arabic pages still get their Arabic title and description
// in the link preview text.
// Literal URLs, so the bundler ships exactly these files.
const load = (url: URL) => fetch(url).then((r) => r.arrayBuffer());
const fonts = Promise.all([
  load(new URL("./fonts/inter-latin-400-normal.woff", import.meta.url)),
  load(new URL("./fonts/inter-latin-700-normal.woff", import.meta.url)),
  load(new URL("./fonts/inter-latin-ext-700-normal.woff", import.meta.url)),
]);

export async function GET(request: Request) {
  const loaded = await fonts.catch(() => null);          // without fonts the default face is used
  const { searchParams } = new URL(request.url);
  const title = clip(searchParams.get("title"), 140) || "OpenQCore AI";
  const kicker = clip(searchParams.get("kicker"), 40) || "OpenQCore";
  const size = title.length > 90 ? 52 : title.length > 60 ? 60 : 68;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: "72px 80px", background: "#050911",
          backgroundImage: "radial-gradient(60% 55% at 12% 8%, rgba(212,175,55,.18), transparent), radial-gradient(45% 40% at 92% 12%, rgba(59,130,246,.16), transparent)",
          color: "#ffffff", fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#d4af37" }} />
          <div style={{ fontSize: 24, letterSpacing: 6, textTransform: "uppercase", color: "#d4af37", fontWeight: 700 }}>{kicker}</div>
        </div>
        <div style={{ display: "flex", fontSize: size, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 1040 }}>{title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26, color: "#94a3b8" }}>
          <div style={{ display: "flex", color: "#ffffff", fontWeight: 700 }}>OpenQCore</div>
          <div style={{ display: "flex" }}>openqcore.com</div>
        </div>
      </div>
    ),
    {
      width: 1200, height: 630,
      fonts: loaded
        ? [
            { name: "Inter", data: loaded[0], weight: 400, style: "normal" },
            { name: "Inter", data: loaded[1], weight: 700, style: "normal" },
            { name: "Inter", data: loaded[2], weight: 700, style: "normal" },
          ]
        : undefined,
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable" },
    },
  );
}
