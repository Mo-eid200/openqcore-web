"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { CopyableCodeBlock } from "../../../components/common/CopyableCode";

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

export default function AuthenticationDocsPage() {
  const t = useTranslations("docs_authentication_page");

  const methods = [t("methods.m1"), t("methods.m2")];
  const scopes = [t("scopes.s1"), t("scopes.s2")];
  const requiredHeaders = [t("headers.h1"), t("headers.h2"), t("headers.h3"), t("headers.h4")];
  const rules = [t("rules.r1"), t("rules.r2"), t("rules.r3")];
  const errors = [
    { code: "401", desc: t("errors.e401") },
    { code: "403", desc: t("errors.e403") },
    { code: "422", desc: t("errors.e422") },
    { code: "429", desc: t("errors.e429") }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050916] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_5%_-10%,rgba(212,175,55,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_95%_110%,rgba(212,175,55,0.12),transparent_55%)]" />
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
              href="#methods"
              className="rounded-xl border border-[#d4af37]/35 bg-[#d4af37]/15 px-4 py-2 text-sm font-semibold text-[#f8df94] hover:bg-[#d4af37]/25"
            >
              {t("hero.jump_start")}
            </a>
          </div>
        </div>

        <div className="mt-6 grid gap-6">
          <Section id="methods" title={t("sections.auth_methods")}>
            <ul className="list-disc space-y-2 ps-5 text-sm text-slate-300">
              {methods.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </Section>

          <Section id="headers" title={t("sections.required_headers")}>
            <div className="flex flex-wrap gap-2">
              {requiredHeaders.map((h, i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 text-xs text-slate-300"
                >
                  {h}
                </span>
              ))}
            </div>
          </Section>

          <Section id="scopes" title={t("sections.scope_model")}>
            <ul className="list-disc space-y-2 ps-5 text-sm text-slate-300">
              {scopes.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </Section>

          <Section id="rules" title={t("sections.validation_rules")}>
            <ul className="list-disc space-y-2 ps-5 text-sm text-slate-300">
              {rules.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </Section>

          <Section id="jwt" title={t("sections.jwt_example")}>
            <CopyableCodeBlock
              language="bash"
              code={`curl -X POST "/api/v1/chat/completions" \\
  -H "Authorization: Bearer [jwt_token]" \\
  -H "Content-Type: application/json" \\
  -H "X-Scope-Type: personal" \\
  -d '{
    "message":"Hello from JWT auth",
    "stream":false
  }'`}
            />
          </Section>

          <Section id="api-key" title={t("sections.api_key_example")}>
            <CopyableCodeBlock
              language="bash"
              code={`curl -X POST "/api/v1/chat/completions" \\
  -H "X-API-Key: [api_key]" \\
  -H "Content-Type: application/json" \\
  -H "X-Scope-Type: workspace" \\
  -H "X-Workspace-ID: [workspace_uuid]" \\
  -d '{
    "message":"Hello from API key auth",
    "stream":false
  }'`}
            />
          </Section>

          <Section id="workspace" title={t("sections.workspace_scope")}>
            <CopyableCodeBlock
              language="json"
              code={`{
  "headers": {
    "X-Scope-Type": "workspace",
    "X-Workspace-ID": "[workspace_uuid]"
  },
  "note": "Workspace scope requires workspace id."
}`}
            />
          </Section>

          <Section id="personal" title={t("sections.personal_scope")}>
            <CopyableCodeBlock
              language="json"
              code={`{
  "headers": {
    "X-Scope-Type": "personal"
  },
  "note": "Personal scope must not include workspace id."
}`}
            />
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