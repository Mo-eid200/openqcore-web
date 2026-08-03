"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

function Section({ id, title, desc, children }: { id: string; title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="rounded-3xl border border-white/12 bg-[#0b1220]/90 p-6 md:p-8">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      {desc ? <p className="mt-2 text-sm text-slate-300">{desc}</p> : null}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Node({ title, body, tone = "cyan" }: { title: string; body: string; tone?: "cyan" | "emerald" | "amber" | "violet" }) {
  const toneClass =
    tone === "emerald"
      ? "border-emerald-300/25 bg-emerald-400/10"
      : tone === "amber"
      ? "border-amber-300/25 bg-amber-400/10"
      : tone === "violet"
      ? "border-violet-300/25 bg-violet-400/10"
      : "border-cyan-300/25 bg-cyan-400/10";

  return (
    <div className={`rounded-2xl border p-4 ${toneClass}`}>
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 text-xs text-slate-200">{body}</p>
    </div>
  );
}

function Arrow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-2 text-xs text-slate-400">
      <span className="h-px w-10 bg-white/20" />
      <span>{label}</span>
      <span className="h-px w-10 bg-white/20" />
    </div>
  );
}

export default function DocsArchitecturePage() {
  const t = useTranslations("docs_architecture_page");

  const pillars = [t("pillars.p1"), t("pillars.p2"), t("pillars.p3"), t("pillars.p4")];
  const guarantees = [t("guarantees.g1"), t("guarantees.g2"), t("guarantees.g3"), t("guarantees.g4"), t("guarantees.g5")];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050916] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(980px_440px_at_10%_-10%,rgba(56,189,248,0.14),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(980px_440px_at_95%_110%,rgba(168,85,247,0.12),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(148,163,184,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.35)_1px,transparent_1px)] [background-size:34px_34px]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 py-12 lg:px-8">
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
            <a href="#runtime" className="rounded-xl border border-cyan-300/35 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 hover:bg-cyan-400/20">
              {t("hero.jump_runtime")}
            </a>
          </div>
        </section>

        <div className="mt-6 grid gap-6">
          <Section id="runtime" title={t("sections.runtime_architecture")} desc={t("sections.runtime_architecture_desc")}>
            <div className="grid gap-3 md:grid-cols-4">
              <Node title={t("runtime.n1.title")} body={t("runtime.n1.body")} tone="cyan" />
              <Node title={t("runtime.n2.title")} body={t("runtime.n2.body")} tone="violet" />
              <Node title={t("runtime.n3.title")} body={t("runtime.n3.body")} tone="emerald" />
              <Node title={t("runtime.n4.title")} body={t("runtime.n4.body")} tone="amber" />
            </div>
            <Arrow label={t("runtime.flow_label")} />
            <div className="grid gap-3 md:grid-cols-3">
              <Node title={t("runtime.n5.title")} body={t("runtime.n5.body")} tone="cyan" />
              <Node title={t("runtime.n6.title")} body={t("runtime.n6.body")} tone="violet" />
              <Node title={t("runtime.n7.title")} body={t("runtime.n7.body")} tone="emerald" />
            </div>
          </Section>

          <Section id="providers" title={t("sections.provider_layer")} desc={t("sections.provider_layer_desc")}>
            <div className="grid gap-3 md:grid-cols-4">
              <Node title="OpenAI" body={t("providers.openai")} tone="cyan" />
              <Node title="Gemini" body={t("providers.gemini")} tone="violet" />
              <Node title="Claude" body={t("providers.claude")} tone="amber" />
              <Node title="Replicate" body={t("providers.replicate")} tone="emerald" />
            </div>
            <Arrow label={t("providers.router_label")} />
            <Node title={t("providers.router_title")} body={t("providers.router_body")} tone="cyan" />
          </Section>

          <Section id="routing" title={t("sections.routing_matrix")} desc={t("sections.routing_matrix_desc")}>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="min-w-full bg-black/20 text-left text-sm">
                <thead className="border-b border-white/10 bg-white/[0.03] text-slate-300">
                  <tr>
                    <th className="px-4 py-3">{t("matrix.intent")}</th>
                    <th className="px-4 py-3">{t("matrix.primary")}</th>
                    <th className="px-4 py-3">{t("matrix.fallback")}</th>
                    <th className="px-4 py-3">{t("matrix.contract")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3">{t("matrix.r1.intent")}</td>
                    <td className="px-4 py-3">{t("matrix.r1.primary")}</td>
                    <td className="px-4 py-3">{t("matrix.r1.fallback")}</td>
                    <td className="px-4 py-3">{t("matrix.r1.contract")}</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3">{t("matrix.r2.intent")}</td>
                    <td className="px-4 py-3">{t("matrix.r2.primary")}</td>
                    <td className="px-4 py-3">{t("matrix.r2.fallback")}</td>
                    <td className="px-4 py-3">{t("matrix.r2.contract")}</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3">{t("matrix.r3.intent")}</td>
                    <td className="px-4 py-3">{t("matrix.r3.primary")}</td>
                    <td className="px-4 py-3">{t("matrix.r3.fallback")}</td>
                    <td className="px-4 py-3">{t("matrix.r3.contract")}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">{t("matrix.r4.intent")}</td>
                    <td className="px-4 py-3">{t("matrix.r4.primary")}</td>
                    <td className="px-4 py-3">{t("matrix.r4.fallback")}</td>
                    <td className="px-4 py-3">{t("matrix.r4.contract")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="contract" title={t("sections.output_contract")} desc={t("sections.output_contract_desc")}>
            <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-4 text-xs text-slate-200">
              <code>{`{
  "success": true,
  "content": "...",
  "provider": "...",
  "usage": {},
  "metadata": {},
  "images": [],
  "files": [],
  "videos": []
}`}</code>
            </pre>
          </Section>

          <Section id="pillars" title={t("sections.architecture_pillars")}>
            <ul className="list-disc space-y-2 ps-5 text-sm text-slate-300">
              {pillars.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </Section>

          <Section id="guarantees" title={t("sections.production_guarantees")}>
            <ul className="list-disc space-y-2 ps-5 text-sm text-slate-300">
              {guarantees.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
}