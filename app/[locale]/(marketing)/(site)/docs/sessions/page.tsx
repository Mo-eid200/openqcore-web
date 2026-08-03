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

export default function SessionsDocsPage() {
  const t = useTranslations("docs_sessions_page");

  const sessionEndpoints = [
    t("endpoints.create"),
    t("endpoints.list"),
    t("endpoints.get_messages", { session_id: "{session_id}" }),
    t("endpoints.patch", { session_id: "{session_id}" }),
    t("endpoints.delete", { session_id: "{session_id}" })
  ];

  const messageEndpoints = [
    t("endpoints.get_message", { message_id: "{message_id}" }),
    t("endpoints.patch_message", { message_id: "{message_id}" }),
    t("endpoints.history", { message_id: "{message_id}" }),
    t("endpoints.undo", { message_id: "{message_id}" }),
    t("endpoints.delete_message", { message_id: "{message_id}" })
  ];

  const listQueryParams = [
    t("query_params.kind"),
    t("query_params.agent_id"),
    t("query_params.pinned"),
    t("query_params.limit"),
    t("query_params.offset")
  ];

  const patchFields = [
    t("patch_fields.title"),
    t("patch_fields.pinned"),
    t("patch_fields.starred"),
    t("patch_fields.marked_unread")
  ];

  const behaviors = [
    t("behaviors.b1"),
    t("behaviors.b2"),
    t("behaviors.b3", { session_id: "{session_id}" }),
    t("behaviors.b4"),
    t("behaviors.b5")
  ];

  const messageBehaviors = [
    t("message_behaviors.b1"),
    t("message_behaviors.b2"),
    t("message_behaviors.b3")
  ];

  const errors = [
    { code: "400", desc: t("errors.e400") },
    { code: "401", desc: t("errors.e401") },
    { code: "404", desc: t("errors.e404") }
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
              href="#sessions"
              className="rounded-xl border border-[#d4af37]/35 bg-[#d4af37]/10 px-4 py-2 text-sm font-semibold text-[#f2d98d] hover:bg-[#d4af37]/20"
            >
              {t("hero.jump_api")}
            </a>
          </div>
        </div>

        <div className="mt-6 grid gap-6">
          <Section id="sessions" title={t("sections.session_endpoints")}>
            <div className="grid gap-2 md:grid-cols-2">
              {sessionEndpoints.map((e, i) => (
                <CopyableCode key={i} value={e} />
              ))}
            </div>
          </Section>

          <Section id="messages" title={t("sections.message_endpoints")}>
            <div className="grid gap-2 md:grid-cols-2">
              {messageEndpoints.map((e, i) => (
                <CopyableCode key={i} value={e} />
              ))}
            </div>
          </Section>

          <Section id="create" title={t("sections.create_request")}>
            <CopyableCodeBlock
              language="json"
              code={`{
  "title": "Untitled Chat",
  "kind": "chat",
  "folder_id": null,
  "agent_id": null,
  "metadata": {}
}`}
            />
            <p className="mt-4 text-sm leading-6 text-slate-400">{t("create.note")}</p>
          </Section>

          <Section id="list" title={t("sections.list_query_params")}>
            <div className="flex flex-wrap gap-2">
              {listQueryParams.map((q, i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 text-xs text-slate-300"
                >
                  {q}
                </span>
              ))}
            </div>

            <div className="mt-5">
              <CopyableCodeBlock
                language="json"
                code={`{
  "items": [ { "id": "...", "title": "...", "pinned": false, "...": "..." } ],
  "total": 12,
  "limit": 50,
  "offset": 0
}`}
              />
            </div>
          </Section>

          <Section id="patch" title={t("sections.patch_session")}>
            <p className="text-sm leading-6 text-slate-400">{t("patch.desc")}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {patchFields.map((f, i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 text-xs text-slate-300"
                >
                  {f}
                </span>
              ))}
            </div>
            <div className="mt-4">
              <CopyableCodeBlock
                language="json"
                code={`{
  "pinned": true,
  "starred": false
}`}
              />
            </div>
          </Section>

          <Section id="behaviors" title={t("sections.session_behaviors")}>
            <ul className="list-disc space-y-2 ps-5 text-sm text-slate-300">
              {behaviors.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </Section>

          <Section id="edit-history" title={t("sections.message_edit_history")}>
            <p className="text-sm leading-6 text-slate-400">{t("edit_history.desc")}</p>
            <div className="mt-4">
              <CopyableCodeBlock
                language="json"
                code={`[
  {
    "id": "8f14e...",
    "old_content": "Original message text",
    "old_payload": null,
    "edited_at": "2026-07-30T16:40:00Z"
  }
]`}
              />
            </div>
            <ul className="mt-4 list-disc space-y-2 ps-5 text-sm text-slate-300">
              {messageBehaviors.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </Section>

          <Section id="errors" title={t("sections.error_models")}>
            <div className="grid gap-2 sm:grid-cols-3">
              {errors.map((e) => (
                <div key={e.code} className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-sm font-bold text-[#f3dd94]">{e.code}</p>
                  <p className="text-xs text-slate-300">{e.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="examples" title={t("sections.examples")}>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              {t("examples.create_label")}
            </p>
            <div className="mt-3">
              <CopyableCodeBlock
                language="bash"
                code={`curl -X POST "/api/v1/sessions" \\
  -H "Authorization: Bearer [token]" \\
  -H "Content-Type: application/json" \\
  -d '{"title": "New Chat", "kind": "chat"}'`}
              />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              {t("examples.pin_label")}
            </p>
            <div className="mt-3">
              <CopyableCodeBlock
                language="bash"
                code={`curl -X PATCH "/api/v1/sessions/[session_id]" \\
  -H "Authorization: Bearer [token]" \\
  -H "Content-Type: application/json" \\
  -d '{"pinned": true}'`}
              />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              {t("examples.edit_label")}
            </p>
            <div className="mt-3">
              <CopyableCodeBlock
                language="bash"
                code={`curl -X PATCH "/api/v1/messages/[message_id]" \\
  -H "Authorization: Bearer [token]" \\
  -H "Content-Type: application/json" \\
  -d '{"content": "Corrected message text"}'`}
              />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              {t("examples.undo_label")}
            </p>
            <div className="mt-3">
              <CopyableCodeBlock
                language="bash"
                code={`curl -X POST "/api/v1/messages/[message_id]/undo" \\
  -H "Authorization: Bearer [token]"`}
              />
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}