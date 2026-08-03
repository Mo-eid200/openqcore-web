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

export default function KnowledgeDocsPage() {
  const t = useTranslations("docs_knowledge_page");

  const endpoints = [
    t("endpoints.list"),
    t("endpoints.create"),
    t("endpoints.upload"),
    t("endpoints.get"),
    t("endpoints.patch"),
    t("endpoints.delete"),
    t("endpoints.ask")
  ];

  const headers = [t("headers.h1"), t("headers.h2"), t("headers.h3"), t("headers.h4")];
  const constraints = [
    t("constraints.c1"),
    t("constraints.c2"),
    t("constraints.c3"),
    t("constraints.c4")
  ];
  const lifecycle = [t("lifecycle.s1"), t("lifecycle.s2"), t("lifecycle.s3"), t("lifecycle.s4")];
  const errors = [
    { code: "400", desc: t("errors.e400") },
    { code: "401", desc: t("errors.e401") },
    { code: "403", desc: t("errors.e403") },
    { code: "404", desc: t("errors.e404") },
    { code: "413", desc: t("errors.e413") },
    { code: "415", desc: t("errors.e415") },
    { code: "422", desc: t("errors.e422") },
    { code: "429", desc: t("errors.e429") }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050916] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_5%_-10%,rgba(212,175,55,0.14),transparent_60%)]" />
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

          <Section id="upload" title={t("sections.upload_example")}>
            <CopyableCodeBlock
              language="bash"
              code={`curl -X POST "/api/v1/console/knowledge/upload" \\
  -H "Authorization: Bearer [token]" \\
  -H "X-Scope-Type: workspace" \\
  -H "X-Workspace-ID: [workspace_uuid]" \\
  -F "file=@handbook.pdf" \\
  -F "title=Team Handbook" \\
  -F "tags=hr,policy"`}
            />
          </Section>

          <Section id="ask" title={t("sections.ask_example")}>
            <CopyableCodeBlock
              language="json"
              code={`{
  "question": "What is our remote-work policy?",
  "top_k": 5,
  "filters": {
    "tags": ["hr", "policy"]
  },
  "session_id": "sess_123"
}`}
            />
          </Section>

          <Section id="response" title={t("sections.response_example")}>
            <CopyableCodeBlock
              language="json"
              code={`{
  "success": true,
  "answer": "Employees may work remotely up to 3 days per week...",
  "citations": [
    {
      "item_id": "kb_456",
      "title": "Team Handbook",
      "score": 0.91
    }
  ],
  "usage": {
    "input_tokens": 180,
    "output_tokens": 72
  },
  "metadata": {
    "retrieved_items": 5
  }
}`}
            />
          </Section>

          <Section id="constraints" title={t("sections.constraints")}>
            <ul className="list-disc space-y-2 ps-5 text-sm text-slate-300">
              {constraints.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </Section>

          <Section id="lifecycle" title={t("sections.ingestion_lifecycle")}>
            <ol className="list-decimal space-y-2 ps-5 text-sm text-slate-300">
              {lifecycle.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
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
        </div>
      </div>
    </div>
  );
}