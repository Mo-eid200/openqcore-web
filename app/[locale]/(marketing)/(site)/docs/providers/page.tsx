"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

type Capability = {
  provider: string;
  text: string;
  image: string;
  audio: string;
  video: string;
  note: string;
};

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="rounded-3xl border border-white/12 bg-[#0b1220]/90 p-6 md:p-8">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Badge({ value }: { value: string }) {
  const isYes = value === "yes";
  return (
    <span
      className={`inline-flex min-w-14 items-center justify-center rounded-full border px-2.5 py-1 text-xs font-semibold ${
        isYes
          ? "border-emerald-300/35 bg-emerald-400/10 text-emerald-200"
          : "border-rose-300/35 bg-rose-400/10 text-rose-200"
      }`}
    >
      {isYes ? "✓" : "—"}
    </span>
  );
}

export default function ProvidersDocsPage() {
  const t = useTranslations("docs_providers_page");

  const rows: Capability[] = [
    {
      provider: t("table.openai.provider"),
      text: t("table.openai.text"),
      image: t("table.openai.image"),
      audio: t("table.openai.audio"),
      video: t("table.openai.video"),
      note: t("table.openai.note")
    },
    {
      provider: t("table.gemini.provider"),
      text: t("table.gemini.text"),
      image: t("table.gemini.image"),
      audio: t("table.gemini.audio"),
      video: t("table.gemini.video"),
      note: t("table.gemini.note")
    },
    {
      provider: t("table.claude.provider"),
      text: t("table.claude.text"),
      image: t("table.claude.image"),
      audio: t("table.claude.audio"),
      video: t("table.claude.video"),
      note: t("table.claude.note")
    },
    {
      provider: t("table.replicate.provider"),
      text: t("table.replicate.text"),
      image: t("table.replicate.image"),
      audio: t("table.replicate.audio"),
      video: t("table.replicate.video"),
      note: t("table.replicate.note")
    }
  ];

  const routing = [t("routing.r1"), t("routing.r2"), t("routing.r3"), t("routing.r4"), t("routing.r5")];
  const policy = [t("policy.p1"), t("policy.p2"), t("policy.p3"), t("policy.p4")];
  const slas = [t("sla.s1"), t("sla.s2"), t("sla.s3"), t("sla.s4")];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050916] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(950px_430px_at_8%_-10%,rgba(56,189,248,0.14),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_95%_110%,rgba(212,175,55,0.12),transparent_55%)]" />
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
            <Link
              href="/docs"
              className="rounded-xl border border-white/20 bg-white/[0.05] px-4 py-2 text-sm font-semibold hover:bg-white/[0.1]"
            >
              {t("hero.back_docs")}
            </Link>
            <a
              href="#matrix"
              className="rounded-xl border border-cyan-300/35 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 hover:bg-cyan-400/20"
            >
              {t("hero.jump_matrix")}
            </a>
          </div>
        </section>

        <div className="mt-6 grid gap-6">
          <Section id="matrix" title={t("sections.capability_matrix")}>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="min-w-full bg-black/20 text-left text-sm">
                <thead className="border-b border-white/10 bg-white/[0.03] text-slate-300">
                  <tr>
                    <th className="px-4 py-3">{t("columns.provider")}</th>
                    <th className="px-4 py-3">{t("columns.text")}</th>
                    <th className="px-4 py-3">{t("columns.image")}</th>
                    <th className="px-4 py-3">{t("columns.audio")}</th>
                    <th className="px-4 py-3">{t("columns.video")}</th>
                    <th className="px-4 py-3">{t("columns.notes")}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.provider} className="border-b border-white/10 last:border-b-0">
                      <td className="px-4 py-3 font-semibold text-white">{r.provider}</td>
                      <td className="px-4 py-3"><Badge value={r.text} /></td>
                      <td className="px-4 py-3"><Badge value={r.image} /></td>
                      <td className="px-4 py-3"><Badge value={r.audio} /></td>
                      <td className="px-4 py-3"><Badge value={r.video} /></td>
                      <td className="px-4 py-3 text-xs text-slate-300">{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="routing" title={t("sections.routing_policy")}>
            <ul className="list-disc space-y-2 ps-5 text-sm text-slate-300">
              {routing.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </Section>

          <Section id="failover" title={t("sections.failover_and_sla")}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">{t("labels.failover")}</p>
                <ul className="mt-2 list-disc space-y-1 ps-5 text-sm text-slate-300">
                  {policy.map((x, i) => <li key={i}>{x}</li>)}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">{t("labels.sla")}</p>
                <ul className="mt-2 list-disc space-y-1 ps-5 text-sm text-slate-300">
                  {slas.map((x, i) => <li key={i}>{x}</li>)}
                </ul>
              </div>
            </div>
          </Section>

          <Section id="contract" title={t("sections.standardized_contract")}>
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
        </div>
      </div>
    </div>
  );
}