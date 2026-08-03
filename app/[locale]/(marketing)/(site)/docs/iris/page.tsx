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

export default function IrisDocsPage() {
  const t = useTranslations("docs_iris_page");

  const models = [
    { name: t("models.orbit.name"), desc: t("models.orbit.desc") },
    { name: t("models.genesis.name"), desc: t("models.genesis.desc") },
    { name: t("models.edit.name"), desc: t("models.edit.desc") },
    { name: t("models.lens.name"), desc: t("models.lens.desc") },
    { name: t("models.video.name"), desc: t("models.video.desc") },
    { name: t("models.ocr.name"), desc: t("models.ocr.desc") },
    { name: t("models.verify.name"), desc: t("models.verify.desc") },
    { name: t("models.guard.name"), desc: t("models.guard.desc") },
    { name: t("models.face.name"), desc: t("models.face.desc") }
  ];

  const endpoints = [
    t("endpoints.generate_image"),
    t("endpoints.edit_image"),
    t("endpoints.analyze_image"),
    t("endpoints.generate_video"),
    t("endpoints.ocr"),
    t("endpoints.verify")
  ];

  const routerRules = [
    t("routing.r1"),
    t("routing.r2"),
    t("routing.r3"),
    t("routing.r4"),
    t("routing.r5")
  ];
  const outputFields = [
    t("output.f1"),
    t("output.f2"),
    t("output.f3"),
    t("output.f4"),
    t("output.f5")
  ];
  const errors = [
    { code: "400", desc: t("errors.e400") },
    { code: "401", desc: t("errors.e401") },
    { code: "413", desc: t("errors.e413") },
    { code: "415", desc: t("errors.e415") },
    { code: "422", desc: t("errors.e422") },
    { code: "429", desc: t("errors.e429") },
    { code: "503", desc: t("errors.e503") }
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
              href="#models"
              className="rounded-xl border border-[#d4af37]/35 bg-[#d4af37]/10 px-4 py-2 text-sm font-semibold text-[#f2d98d] hover:bg-[#d4af37]/20"
            >
              {t("hero.jump_models")}
            </a>
          </div>
        </div>

        <div className="mt-6 grid gap-6">
          <Section id="models" title={t("sections.model_catalog")}>
            <div className="grid gap-2 sm:grid-cols-2">
              {models.map((m) => (
                <div key={m.name} className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-sm font-semibold text-white">{m.name}</p>
                  <p className="text-xs text-slate-300">{m.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="endpoints" title={t("sections.endpoints")}>
            <div className="grid gap-2 md:grid-cols-2">
              {endpoints.map((e, i) => (
                <CopyableCode key={i} value={e} />
              ))}
            </div>
          </Section>

          <Section id="routing" title={t("sections.routing_logic")}>
            <ul className="list-disc space-y-2 ps-5 text-sm text-slate-300">
              {routerRules.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </Section>

          <Section id="request" title={t("sections.request_example")}>
            <CopyableCodeBlock
              language="json"
              code={`{
  "model": "iris-genesis",
  "prompt": "A futuristic city skyline at sunrise, cinematic lighting",
  "size": "1024x1024",
  "quality": "high",
  "stream": false,
  "metadata": {
    "workspace_id": "[workspace_uuid]",
    "trace_id": "[trace_id]"
  }
}`}
            />
          </Section>

          <Section id="response" title={t("sections.response_contract")}>
            <CopyableCodeBlock
              language="json"
              code={`{
  "success": true,
  "content": "Generation completed",
  "provider": "openai",
  "images": [
    { "url": "https://...", "mime_type": "image/png" }
  ],
  "files": [],
  "videos": [],
  "usage": {
    "input_tokens": 0,
    "output_tokens": 0
  },
  "metadata": {
    "model": "iris-genesis",
    "duration_ms": 1542
  }
}`}
            />
          </Section>

          <Section id="output" title={t("sections.unified_output_fields")}>
            <ul className="list-disc space-y-2 ps-5 text-sm text-slate-300">
              {outputFields.map((f, i) => (
                <li key={i}>{f}</li>
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
              code={`curl -X POST "/api/v1/iris/generate-image" \\
  -H "Authorization: Bearer [token]" \\
  -H "Content-Type: application/json" \\
  -H "X-Scope-Type: workspace" \\
  -H "X-Workspace-ID: [workspace_uuid]" \\
  -d '{
    "model":"iris-genesis",
    "prompt":"A modern AI control room dashboard",
    "stream":false
  }'`}
            />
          </Section>
        </div>
      </div>
    </div>
  );
}