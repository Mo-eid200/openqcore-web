"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="rounded-3xl border border-white/12 bg-[#0b1220]/90 p-6 md:p-8">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-4 text-xs text-slate-200">
      <code>{code}</code>
    </pre>
  );
}

export default function OutputContractsDocsPage() {
  const t = useTranslations("docs_output_contracts_page");

  const principles = [t("principles.p1"), t("principles.p2"), t("principles.p3"), t("principles.p4"), t("principles.p5")];
  const fields = [t("fields.f1"), t("fields.f2"), t("fields.f3"), t("fields.f4"), t("fields.f5"), t("fields.f6"), t("fields.f7")];
  const compatibility = [t("compatibility.c1"), t("compatibility.c2"), t("compatibility.c3"), t("compatibility.c4")];
  const errors = [t("error_contracts.e1"), t("error_contracts.e2"), t("error_contracts.e3"), t("error_contracts.e4")];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050916] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(950px_430px_at_8%_-10%,rgba(14,165,233,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_95%_110%,rgba(168,85,247,0.13),transparent_55%)]" />
      </div>

      <div className="relative mx-auto max-w-[1300px] px-6 py-12 lg:px-8">
        <section className="rounded-3xl border border-white/12 bg-[linear-gradient(180deg,rgba(10,16,32,0.95),rgba(7,12,24,0.95))] p-8 md:p-10">
          <p className="inline-flex rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.14em] text-slate-300">
            {t("hero.kicker")}
          </p>
          <h1 className="mt-5 text-4xl font-black tracking-[-0.02em] md:text-5xl">{t("hero.title")}</h1>
          <p className="mt-4 max-w-3xl text-slate-300">{t("hero.desc")}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/docs" className="rounded-xl border border-white/20 bg-white/[0.05] px-4 py-2 text-sm font-semibold hover:bg-white/[0.1]">
              {t("hero.back_docs")}
            </Link>
            <a href="#contract" className="rounded-xl border border-cyan-300/35 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 hover:bg-cyan-400/20">
              {t("hero.jump_contract")}
            </a>
          </div>
        </section>

        <div className="mt-6 grid gap-6">
          <Section id="contract" title={t("sections.canonical_contract")}>
            <CodeBlock
              code={`{
  "success": true,
  "content": "Primary human-readable output",
  "provider": "openai",
  "usage": {
    "input_tokens": 120,
    "output_tokens": 64
  },
  "metadata": {
    "model": "gpt-x",
    "latency_ms": 540,
    "trace_id": "trc_123"
  },
  "images": [],
  "files": [],
  "videos": []
}`}
            />
          </Section>

          <Section id="principles" title={t("sections.design_principles")}>
            <ul className="list-disc space-y-2 ps-5 text-sm text-slate-300">
              {principles.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </Section>

          <Section id="fields" title={t("sections.field_reference")}>
            <ul className="list-disc space-y-2 ps-5 text-sm text-slate-300">
              {fields.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </Section>

          <Section id="examples" title={t("sections.multi_provider_examples")}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">{t("labels.openai_response")}</p>
                <CodeBlock
                  code={`{
  "success": true,
  "content": "Generated response",
  "provider": "openai",
  "usage": { "input_tokens": 90, "output_tokens": 52 },
  "metadata": { "latency_ms": 480 },
  "images": [],
  "files": [],
  "videos": []
}`}
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">{t("labels.replicate_response")}</p>
                <CodeBlock
                  code={`{
  "success": true,
  "content": "Image generation completed",
  "provider": "replicate",
  "usage": { "input_tokens": 0, "output_tokens": 0 },
  "metadata": { "duration_ms": 2300 },
  "images": [{ "url": "https://..." }],
  "files": [],
  "videos": []
}`}
                />
              </div>
            </div>
          </Section>

          <Section id="compatibility" title={t("sections.client_compatibility")}>
            <ul className="list-disc space-y-2 ps-5 text-sm text-slate-300">
              {compatibility.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </Section>

          <Section id="errors" title={t("sections.error_contracts")}>
            <CodeBlock
              code={`{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request payload",
    "details": {}
  },
  "provider": "system",
  "metadata": {
    "trace_id": "trc_123"
  }
}`}
            />
            <ul className="mt-4 list-disc space-y-2 ps-5 text-sm text-slate-300">
              {errors.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
}