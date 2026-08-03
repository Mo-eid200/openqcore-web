"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { CopyableCode, CopyableCodeBlock } from "../../../components/common/CopyableCode";

function Section({
  id,
  title,
  children
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="rounded-3xl border border-white/12 bg-[#0b1220]/90 p-6 md:p-8">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function ChatDocsPage() {
  const t = useTranslations("docs_chat_page");

  const endpoints = [t("endpoints.health"), t("endpoints.completions")];
  const headers = [t("headers.h1"), t("headers.h2"), t("headers.h3"), t("headers.h4")];
  const behaviors = [
    t("behaviors.b1"),
    t("behaviors.b2"),
    t("behaviors.b3"),
    t("behaviors.b4"),
    t("behaviors.b5")
  ];
  const streamEvents = [
    t("events.e1"),
    t("events.e2"),
    t("events.e3"),
    t("events.e4"),
    t("events.e5")
  ];
  const errors = [
    { code: "400", desc: t("errors.e400") },
    { code: "401", desc: t("errors.e401") },
    { code: "403", desc: t("errors.e403") },
    { code: "409", desc: t("errors.e409") },
    { code: "422", desc: t("errors.e422") },
    { code: "429", desc: t("errors.e429") },
    { code: "503", desc: t("errors.e503") }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050916] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_5%_-10%,rgba(212,175,55,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_95%_110%,rgba(212,175,55,0.1),transparent_55%)]" />
      </div>

      <div className="relative mx-auto max-w-[1300px] px-6 py-12 lg:px-8">
        <div className="rounded-3xl border border-white/12 bg-[linear-gradient(180deg,rgba(10,16,32,0.95),rgba(7,12,24,0.95))] p-8 md:p-10">
          <p className="inline-flex rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.14em] text-slate-300">
            {t("hero.kicker")}
          </p>
          <h1 className="mt-5 text-4xl font-black tracking-[-0.02em] md:text-5xl">
            {t("hero.title")}
          </h1>
          <p className="mt-4 max-w-3xl text-slate-300">{t("hero.desc")}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/docs"
              className="rounded-xl border border-white/20 bg-white/[0.05] px-4 py-2 text-sm font-semibold hover:bg-white/[0.1]"
            >
              {t("hero.back_docs")}
            </Link>
            <a
              href="#endpoints"
              className="rounded-xl border border-[#d4af37]/35 bg-[#d4af37]/10 px-4 py-2 text-sm font-semibold text-[#f2d98d] hover:bg-[#d4af37]/20"
            >
              {t("hero.jump_api")}
            </a>
          </div>
        </div>

        <div className="mt-6 grid gap-6">
          <Section id="endpoints" title={t("sections.endpoints")}>
            <div className="grid gap-2 md:grid-cols-2">
              {endpoints.map((e, i) => (
                <CopyableCode key={i} value={e} />
              ))}
            </div>
          </Section>

          <Section id="headers" title={t("sections.required_headers")}>
            <div className="flex flex-wrap gap-2">
              {headers.map((h, i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 text-xs text-slate-300"
                >
                  {h}
                </span>
              ))}
            </div>
          </Section>

          <Section id="request" title={t("sections.request_body")}>
            <CopyableCodeBlock
              language="json"
              code={`{
  "message": "Summarize the last meeting in bullet points",
  "session_id": "sess_123",
  "stream": true,
  "attachments": [],
  "metadata": {
    "locale": "en",
    "channel": "web"
  }
}`}
            />
          </Section>

          <Section id="response" title={t("sections.response_body")}>
            <CopyableCodeBlock
              language="json"
              code={`{
  "success": true,
  "session_id": "sess_123",
  "content": "• Discussed roadmap\\n• Confirmed release scope\\n• Assigned owners",
  "provider": "pulse",
  "usage": {
    "input_tokens": 324,
    "output_tokens": 118
  },
  "metadata": {
    "latency_ms": 612
  }
}`}
            />
          </Section>

          <Section id="stream" title={t("sections.streaming_events")}>
            <ul className="list-disc space-y-2 ps-5 text-sm text-slate-300">
              {streamEvents.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </Section>

          <Section id="behaviors" title={t("sections.runtime_behaviors")}>
            <ul className="list-disc space-y-2 ps-5 text-sm text-slate-300">
              {behaviors.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </Section>

          <Section id="errors" title={t("sections.error_models")}>
            <div className="grid gap-2 sm:grid-cols-2">
              {errors.map((e) => (
                <div key={e.code} className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-sm font-bold text-[#f3dd94]">{e.code}</p>
                  <p className="text-xs text-slate-300">{e.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="examples" title={t("sections.examples")}>
            <CopyableCodeBlock
              language="bash"
              code={`curl -X POST "/api/v1/chat/completions" \\
  -H "Authorization: Bearer [token]" \\
  -H "Content-Type: application/json" \\
  -H "X-Scope-Type: personal" \\
  -d '{
    "message":"Write a short product update",
    "session_id":"sess_123",
    "stream":false
  }'`}
            />
          </Section>
        </div>
      </div>
    </div>
  );
}