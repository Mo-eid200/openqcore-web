"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { CopyableCode } from "../../../components/common/CopyableCode";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold text-white">{children}</h2>;
}

function GlassCard({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/12 bg-[linear-gradient(180deg,#0b1222_0%,#09101d_100%)] p-6 shadow-[0_14px_40px_rgba(0,0,0,0.35)] ${className}`}
    >
      {children}
    </div>
  );
}

function EndpointList({ items }: { items: string[] }) {
  return (
    <div className="space-y-2">
      {items.map((e, i) => (
        <CopyableCode key={i} value={e} />
      ))}
    </div>
  );
}

export default function ApiReferencePage() {
  const t = useTranslations("docs_api_page");

  const authEndpoints = [t("catalog.auth.e1"), t("catalog.auth.e2")];
  const chatEndpoints = [t("catalog.chat.e1"), t("catalog.chat.e2")];
  const voiceEndpoints = [
    t("catalog.voice.e1"),
    t("catalog.voice.e2"),
    t("catalog.voice.e3", { session_id: "{session_id}" }),
    t("catalog.voice.e4")
  ];
  const irisEndpoints = [
    t("catalog.iris.e1"),
    t("catalog.iris.e2"),
    t("catalog.iris.e3"),
    t("catalog.iris.e4")
  ];
  const knowledgeEndpoints = [
    t("catalog.knowledge.e1"),
    t("catalog.knowledge.e2"),
    t("catalog.knowledge.e3"),
    t("catalog.knowledge.e4"),
    t("catalog.knowledge.e5", { id: "{id}" }),
    t("catalog.knowledge.e6", { id: "{id}" })
  ];
  const apiKeysEndpoints = [
    t("catalog.api_keys.e1"),
    t("catalog.api_keys.e2"),
    t("catalog.api_keys.e3", { key_id: "{key_id}" }),
    t("catalog.api_keys.e4", { key_id: "{key_id}" })
  ];
  const archiveEndpoints = [
    t("catalog.archive.e1"),
    t("catalog.archive.e2"),
    t("catalog.archive.e3", { unit_id: "{unit_id}" }),
    t("catalog.archive.e4", { unit_id: "{unit_id}" }),
    t("catalog.archive.e5", { unit_id: "{unit_id}" })
  ];
  const sessionsEndpoints = [
    t("catalog.sessions.e1"),
    t("catalog.sessions.e2"),
    t("catalog.sessions.e3", { session_id: "{session_id}" }),
    t("catalog.sessions.e4", { session_id: "{session_id}" }),
    t("catalog.sessions.e5", { session_id: "{session_id}" }),
    t("catalog.sessions.e6", { message_id: "{message_id}" }),
    t("catalog.sessions.e7", { message_id: "{message_id}" }),
    t("catalog.sessions.e8", { message_id: "{message_id}" }),
    t("catalog.sessions.e9", { message_id: "{message_id}" }),
    t("catalog.sessions.e10", { message_id: "{message_id}" })
  ];

  const headers = [
    { name: "Authorization", req: t("headers.h1_req") },
    { name: "X-API-Key", req: t("headers.h5_req") },
    { name: "X-Scope-Type", req: t("headers.h2_req") },
    { name: "X-Workspace-ID", req: t("headers.h3_req") },
    { name: "X-Agent-ID", req: t("headers.h4_req") }
  ];

  const codes = [
    { code: "200", meaning: t("codes.c200") },
    { code: "400", meaning: t("codes.c400") },
    { code: "401", meaning: t("codes.c401") },
    { code: "403", meaning: t("codes.c403") },
    { code: "409", meaning: t("codes.c409") },
    { code: "422", meaning: t("codes.c422") },
    { code: "429", meaning: t("codes.c429") },
    { code: "503", meaning: t("codes.c503") }
  ];

  const stats = [
    { value: t("stats.s1_value"), label: t("stats.s1_label") },
    { value: t("stats.s2_value"), label: t("stats.s2_label") },
    { value: t("stats.s3_value"), label: t("stats.s3_label") },
    { value: t("stats.s4_value"), label: t("stats.s4_label") },
    { value: t("stats.s5_value"), label: t("stats.s5_label") }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050916] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1100px_520px_at_10%_-20%,rgba(212,175,55,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_520px_at_95%_120%,rgba(212,175,55,0.1),transparent_55%)]" />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-6 py-16 lg:px-8">
        {/* Hero */}
        <section className="rounded-[32px] border border-white/12 bg-[linear-gradient(180deg,rgba(10,16,32,0.95),rgba(7,12,24,0.95))] p-8 md:p-12">
          <p className="inline-flex rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">
            {t("hero.kicker")}
          </p>
          <h1 className="mt-6 text-4xl font-black tracking-[-0.03em] md:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{t("hero.desc")}</p>
        </section>

        {/* Catalog */}
        <section className="mt-8">
          <GlassCard>
            <SectionTitle>{t("catalog.title")}</SectionTitle>
            <p className="mt-2 text-sm text-slate-300">{t("catalog.desc")}</p>

            <div className="mt-6 grid gap-6 xl:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-lg font-semibold">{t("catalog.auth.title")}</p>
                <div className="mt-3">
                  <EndpointList items={authEndpoints} />
                </div>
                <p className="mt-4 text-sm text-slate-300">{t("catalog.auth.body")}</p>
                <Link
                  href="/docs/authentication"
                  className="mt-4 inline-block text-sm font-semibold text-[#f2d98d] hover:text-[#f8df94]"
                >
                  {t("catalog.auth.cta")}
                </Link>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-lg font-semibold">{t("catalog.api_keys.title")}</p>
                <div className="mt-3">
                  <EndpointList items={apiKeysEndpoints} />
                </div>
                <p className="mt-4 text-sm text-slate-300">{t("catalog.api_keys.body")}</p>
                <Link
                  href="/docs/api-keys"
                  className="mt-4 inline-block text-sm font-semibold text-[#f2d98d] hover:text-[#f8df94]"
                >
                  {t("catalog.api_keys.cta")}
                </Link>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-lg font-semibold">{t("catalog.chat.title")}</p>
                <div className="mt-3">
                  <EndpointList items={chatEndpoints} />
                </div>
                <p className="mt-4 text-sm text-slate-300">{t("catalog.chat.body")}</p>
                <Link
                  href="/docs/chat"
                  className="mt-4 inline-block text-sm font-semibold text-[#f2d98d] hover:text-[#f8df94]"
                >
                  {t("catalog.chat.cta")}
                </Link>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5 xl:col-span-2">
                <p className="text-lg font-semibold">{t("catalog.sessions.title")}</p>
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  <EndpointList items={sessionsEndpoints} />
                </div>
                <p className="mt-4 text-sm text-slate-300">{t("catalog.sessions.body")}</p>
                <Link
                  href="/docs/sessions"
                  className="mt-4 inline-block text-sm font-semibold text-[#f2d98d] hover:text-[#f8df94]"
                >
                  {t("catalog.sessions.cta")}
                </Link>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-lg font-semibold">{t("catalog.voice.title")}</p>
                <div className="mt-3">
                  <EndpointList items={voiceEndpoints} />
                </div>
                <p className="mt-4 text-sm text-slate-300">{t("catalog.voice.body")}</p>
                <Link
                  href="/docs/voice"
                  className="mt-4 inline-block text-sm font-semibold text-[#f2d98d] hover:text-[#f8df94]"
                >
                  {t("catalog.voice.cta")}
                </Link>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-lg font-semibold">{t("catalog.iris.title")}</p>
                <div className="mt-3">
                  <EndpointList items={irisEndpoints} />
                </div>
                <p className="mt-4 text-sm text-slate-300">{t("catalog.iris.body")}</p>
                <Link
                  href="/docs/iris"
                  className="mt-4 inline-block text-sm font-semibold text-[#f2d98d] hover:text-[#f8df94]"
                >
                  {t("catalog.iris.cta")}
                </Link>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5 xl:col-span-2">
                <p className="text-lg font-semibold">{t("catalog.knowledge.title")}</p>
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  <EndpointList items={knowledgeEndpoints} />
                </div>
                <p className="mt-4 text-sm text-slate-300">{t("catalog.knowledge.body")}</p>
                <Link
                  href="/docs/knowledge"
                  className="mt-4 inline-block text-sm font-semibold text-[#f2d98d] hover:text-[#f8df94]"
                >
                  {t("catalog.knowledge.cta")}
                </Link>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5 xl:col-span-2">
                <p className="text-lg font-semibold">{t("catalog.archive.title")}</p>
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  <EndpointList items={archiveEndpoints} />
                </div>
                <p className="mt-4 text-sm text-slate-300">{t("catalog.archive.body")}</p>
                <Link
                  href="/docs/archive"
                  className="mt-4 inline-block text-sm font-semibold text-[#f2d98d] hover:text-[#f8df94]"
                >
                  {t("catalog.archive.cta")}
                </Link>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Headers + Codes */}
        <section className="mt-6 grid gap-6 xl:grid-cols-12">
          <GlassCard className="xl:col-span-6">
            <SectionTitle>{t("headers.title")}</SectionTitle>
            <p className="mt-2 text-sm text-slate-300">{t("headers.desc")}</p>

            <div className="mt-4 overflow-x-auto rounded-2xl border border-white/10">
              <table className="min-w-full bg-black/20 text-left text-sm">
                <thead className="border-b border-white/10 bg-white/[0.03] text-slate-300">
                  <tr>
                    <th className="px-4 py-3">{t("headers.col_header")}</th>
                    <th className="px-4 py-3">{t("headers.col_required")}</th>
                  </tr>
                </thead>
                <tbody>
                  {headers.map((h) => (
                    <tr key={h.name} className="border-b border-white/10 last:border-b-0">
                      <td className="px-4 py-3">
                        <CopyableCode value={h.name} className="max-w-[220px] py-1.5" />
                      </td>
                      <td className="px-4 py-3 text-slate-300">{h.req}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>

          <GlassCard className="xl:col-span-6">
            <SectionTitle>{t("codes.title")}</SectionTitle>
            <p className="mt-2 text-sm text-slate-300">{t("codes.desc")}</p>

            <div className="mt-4 overflow-x-auto rounded-2xl border border-white/10">
              <table className="min-w-full bg-black/20 text-left text-sm">
                <thead className="border-b border-white/10 bg-white/[0.03] text-slate-300">
                  <tr>
                    <th className="px-4 py-3">{t("codes.col_code")}</th>
                    <th className="px-4 py-3">{t("codes.col_meaning")}</th>
                  </tr>
                </thead>
                <tbody>
                  {codes.map((c) => (
                    <tr key={c.code} className="border-b border-white/10 last:border-b-0">
                      <td className="px-4 py-3 font-bold text-[#f3dd94]">{c.code}</td>
                      <td className="px-4 py-3 text-slate-300">{c.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </section>

        {/* Stats */}
        <section className="mt-6">
          <GlassCard>
            <SectionTitle>{t("stats.title")}</SectionTitle>
            <p className="mt-2 text-sm text-slate-300">{t("stats.desc")}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4 text-center"
                >
                  <p className="text-2xl font-black text-[#f3dd94]">{s.value}</p>
                  <p className="mt-1 text-xs text-slate-300">{s.label}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>
      </div>
    </div>
  );
}