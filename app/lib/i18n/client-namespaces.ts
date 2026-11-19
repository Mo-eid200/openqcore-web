// app/lib/i18n/client-namespaces.ts
//
// Translations sent to the browser. Server components read the full message
// files on the server; only these namespaces, used by client components
// (useTranslations in "use client" code), are serialised into every page.
// That keeps ~90 KB of the ~450 KB message file in the page instead of all
// of it. `npm run build` runs scripts/i18n/check-client-namespaces.mjs,
// which fails when a client component uses a namespace missing here.

export const CLIENT_NAMESPACES = [
  "auth_modal",
  "contact_page",
  "cta_section",
  "docs_api_page",
  "docs_architecture_page",
  "docs_authentication_page",
  "docs_chat_page",
  "docs_iris_page",
  "docs_knowledge_page",
  "docs_output_contracts_page",
  "docs_providers_page",
  "docs_sessions_page",
  "docs_voice_page",
  "ecosystem_section",
  "footer",
  "hero_section",
  "how_we_work_section",
  "live_ai_section",
  "menu",
  "multimodal_stack_page",
  "navbar",
  "privacy_policy_page",
  "realtime_runtime_page",
  "resources_docs_page",
  "right_actions",
  "runtime_section",
  "search",
  "solutions_section",
  "support_page",
  "terms_page",
] as const;

export function pickClientMessages<T extends Record<string, unknown>>(messages: T): Partial<T> {
  const out: Partial<T> = {};
  for (const ns of CLIENT_NAMESPACES) {
    if (ns in messages) (out as Record<string, unknown>)[ns] = messages[ns];
  }
  return out;
}
