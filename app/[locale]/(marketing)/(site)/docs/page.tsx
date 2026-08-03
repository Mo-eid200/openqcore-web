"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { CopyableCode } from "../../components/common/CopyableCode";

function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">
      {children}
    </p>
  );
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

export default function DocsPage() {
  const t = useTranslations("resources_docs_page");

  const quickSteps = useMemo(
    () => [
      { title: t("quickstart.steps.s1.title"), desc: t("quickstart.steps.s1.desc") },
      { title: t("quickstart.steps.s2.title"), desc: t("quickstart.steps.s2.desc") },
      { title: t("quickstart.steps.s3.title"), desc: t("quickstart.steps.s3.desc") },
      { title: t("quickstart.steps.s4.title"), desc: t("quickstart.steps.s4.desc") },
      { title: t("quickstart.steps.s5.title"), desc: t("quickstart.steps.s5.desc") }
    ],
    [t]
  );

  const authItems = useMemo(
    () => [
      { label: t("auth.items.i1.label"), value: t("auth.items.i1.value") },
      { label: t("auth.items.i2.label"), value: t("auth.items.i2.value") },
      { label: t("auth.items.i3.label"), value: t("auth.items.i3.value") },
      { label: t("auth.items.i4.label"), value: t("auth.items.i4.value") }
    ],
    [t]
  );

  const rateCards = useMemo(
    () => [
      {
        title: t("rate_limits.cards.api_key.title"),
        value: t("rate_limits.cards.api_key.value"),
        desc: t("rate_limits.cards.api_key.desc")
      },
      {
        title: t("rate_limits.cards.jwt.title"),
        value: t("rate_limits.cards.jwt.value"),
        desc: t("rate_limits.cards.jwt.desc")
      }
    ],
    [t]
  );

  const chatEndpoints = [t("chat.endpoints.health"), t("chat.endpoints.completions")];
  const chatBehaviors = [
    t("chat.behaviors.b1"),
    t("chat.behaviors.b2"),
    t("chat.behaviors.b3"),
    t("chat.behaviors.b4"),
    t("chat.behaviors.b5")
  ];

  const voiceEndpoints = [
    t("voice.endpoints.meta"),
    t("voice.endpoints.chat"),
    t("voice.endpoints.interrupt"),
    t("voice.endpoints.ws")
  ];
  const voiceFeatures = [
    t("voice.features.f1"),
    t("voice.features.f2"),
    t("voice.features.f3"),
    t("voice.features.f4"),
    t("voice.features.f5"),
    t("voice.features.f6")
  ];

  const irisModels = [
    { name: t("iris.models.orbit.name"), desc: t("iris.models.orbit.desc") },
    { name: t("iris.models.genesis.name"), desc: t("iris.models.genesis.desc") },
    { name: t("iris.models.edit.name"), desc: t("iris.models.edit.desc") },
    { name: t("iris.models.lens.name"), desc: t("iris.models.lens.desc") },
    { name: t("iris.models.video.name"), desc: t("iris.models.video.desc") },
    { name: t("iris.models.ocr.name"), desc: t("iris.models.ocr.desc") },
    { name: t("iris.models.verify.name"), desc: t("iris.models.verify.desc") },
    { name: t("iris.models.guard.name"), desc: t("iris.models.guard.desc") },
    { name: t("iris.models.face.name"), desc: t("iris.models.face.desc") }
  ];

  const knowledgeEndpoints = [
    t("knowledge.endpoints.list"),
    t("knowledge.endpoints.create"),
    t("knowledge.endpoints.upload"),
    t("knowledge.endpoints.get"),
    t("knowledge.endpoints.patch"),
    t("knowledge.endpoints.delete"),
    t("knowledge.endpoints.ask")
  ];
  const knowledgeLimits = [
    t("knowledge.limits.l1"),
    t("knowledge.limits.l2"),
    t("knowledge.limits.l3"),
    t("knowledge.limits.l4")
  ];

  const errorItems = [
    { code: t("errors.items.e400.code"), desc: t("errors.items.e400.desc") },
    { code: t("errors.items.e401.code"), desc: t("errors.items.e401.desc") },
    { code: t("errors.items.e403.code"), desc: t("errors.items.e403.desc") },
    { code: t("errors.items.e404.code"), desc: t("errors.items.e404.desc") },
    { code: t("errors.items.e409.code"), desc: t("errors.items.e409.desc") },
    { code: t("errors.items.e413.code"), desc: t("errors.items.e413.desc") },
    { code: t("errors.items.e415.code"), desc: t("errors.items.e415.desc") },
    { code: t("errors.items.e422.code"), desc: t("errors.items.e422.desc") },
    { code: t("errors.items.e429.code"), desc: t("errors.items.e429.desc") },
    { code: t("errors.items.e503.code"), desc: t("errors.items.e503.desc") }
  ];

  const opsItems = [t("ops.items.o1"), t("ops.items.o2"), t("ops.items.o3"), t("ops.items.o4")];
  const opsHeaders = [
    t("ops.headers.h1"),
    t("ops.headers.h2"),
    t("ops.headers.h3"),
    t("ops.headers.h4"),
    t("ops.headers.h5")
  ];
  const rateHeaders = [
    t("rate_limits.headers.h1"),
    t("rate_limits.headers.h2"),
    t("rate_limits.headers.h3"),
    t("rate_limits.headers.h4")
  ];

  return (
    <div className="relative overflow-hidden bg-[#050916] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1100px_520px_at_10%_-20%,rgba(212,175,55,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_520px_at_95%_120%,rgba(212,175,55,0.1),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(148,163,184,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.35)_1px,transparent_1px)] [background-size:30px_30px]" />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-6 py-16 lg:px-8">
        {/* ═══════════════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════════════ */}

        <section className="rounded-[32px] border border-white/12 bg-[linear-gradient(180deg,rgba(10,16,32,0.95),rgba(7,12,24,0.95))] p-8 md:p-12">
          <SectionKicker>{t("hero.kicker")}</SectionKicker>
          <h1 className="mt-6 text-4xl font-black tracking-[-0.03em] md:text-6xl">
            {t("hero.title_1")}
          </h1>
          <h2 className="mt-2 text-2xl font-semibold text-slate-200 md:text-4xl">
            {t("hero.title_2")}
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            {t("hero.desc")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/docs/authentication"
              className="rounded-2xl border border-[#d4af37]/35 bg-[#d4af37]/15 px-5 py-3 text-sm font-semibold text-[#f8df94] transition hover:bg-[#d4af37]/25"
            >
              {t("hero.primary_cta")}
            </Link>
            <Link
              href="/docs/chat"
              className="rounded-2xl border border-white/20 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.09]"
            >
              {t("hero.secondary_cta")}
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {[
              t("hero.chips.c1"),
              t("hero.chips.c2"),
              t("hero.chips.c3"),
              t("hero.chips.c4"),
              t("hero.chips.c5"),
              t("hero.chips.c6")
            ].map((chip, i) => (
              <span
                key={i}
                className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 text-xs text-slate-300"
              >
                {chip}
              </span>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            QUICKSTART + BASE URL
        ═══════════════════════════════════════════════════════ */}

        <section className="mt-8 grid gap-6 xl:grid-cols-12">
          <GlassCard className="xl:col-span-8">
            <SectionKicker>{t("quickstart.kicker")}</SectionKicker>
            <h3 className="mt-4 text-2xl font-bold">{t("quickstart.title")}</h3>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {quickSteps.map((s, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm font-semibold text-[#f2d98d]">{s.title}</p>
                  <p className="mt-1 text-sm text-slate-300">{s.desc}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="xl:col-span-4">
            <SectionKicker>{t("base.kicker")}</SectionKicker>
            <h3 className="mt-4 text-2xl font-bold">{t("base.title")}</h3>

            <CopyableCode value={t("base.value")} className="mt-5" />

            <p className="mt-3 text-sm text-slate-400">{t("base.note")}</p>
          </GlassCard>
        </section>

        {/* ═══════════════════════════════════════════════════════
            AUTHENTICATION + RATE LIMITS
        ═══════════════════════════════════════════════════════ */}

        <section className="mt-6 grid gap-6 xl:grid-cols-12">
          <GlassCard className="xl:col-span-7">
            <SectionKicker>{t("auth.kicker")}</SectionKicker>
            <h3 className="mt-4 text-2xl font-bold">{t("auth.title")}</h3>

            <div className="mt-6 space-y-3">
              {authItems.map((x, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-400">
                    {x.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">{x.value}</p>
                </div>
              ))}
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              {t("auth.rules_title")}
            </p>
            <ul className="mt-2 list-disc space-y-1 ps-5 text-sm text-slate-300">
              {[0, 1, 2].map((i) => (
                <li key={i}>{t(`auth.rules.${i}`)}</li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="xl:col-span-5">
            <SectionKicker>{t("rate_limits.kicker")}</SectionKicker>
            <h3 className="mt-4 text-2xl font-bold">{t("rate_limits.title")}</h3>

            <div className="mt-6 space-y-3">
              {rateCards.map((c, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm font-semibold text-white">{c.title}</p>
                  <p className="mt-1 text-lg font-bold text-[#f3dd94]">{c.value}</p>
                  <p className="mt-1 text-xs text-slate-400">{c.desc}</p>
                </div>
              ))}
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              {t("rate_limits.headers_title")}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {rateHeaders.map((h, i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 text-xs text-slate-300"
                >
                  {h}
                </span>
              ))}
            </div>
          </GlassCard>
        </section>

        {/* ═══════════════════════════════════════════════════════
            CHAT + VOICE
        ═══════════════════════════════════════════════════════ */}

        <section className="mt-6 grid gap-6 xl:grid-cols-12">
          <GlassCard className="xl:col-span-6">
            <SectionKicker>{t("chat.kicker")}</SectionKicker>
            <h3 className="mt-4 text-2xl font-bold">{t("chat.title")}</h3>

            <div className="mt-5 space-y-2">
              {chatEndpoints.map((e, i) => (
                <CopyableCode key={i} value={e} />
              ))}
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              {t("chat.behaviors_title")}
            </p>
            <ul className="mt-2 list-disc space-y-1 ps-5 text-sm text-slate-300">
              {chatBehaviors.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="xl:col-span-6">
            <SectionKicker>{t("voice.kicker")}</SectionKicker>
            <h3 className="mt-4 text-2xl font-bold">{t("voice.title")}</h3>

            <div className="mt-5 space-y-2">
              {voiceEndpoints.map((e, i) => (
                <CopyableCode key={i} value={e} />
              ))}
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              {t("voice.features_title")}
            </p>
            <ul className="mt-2 list-disc space-y-1 ps-5 text-sm text-slate-300">
              {voiceFeatures.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </GlassCard>
        </section>

        {/* ═══════════════════════════════════════════════════════
            IRIS MODELS + KNOWLEDGE
        ═══════════════════════════════════════════════════════ */}

        <section className="mt-6 grid gap-6 xl:grid-cols-12">
          <GlassCard className="xl:col-span-5">
            <SectionKicker>{t("iris.kicker")}</SectionKicker>
            <h3 className="mt-4 text-2xl font-bold">{t("iris.title")}</h3>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              {t("iris.models_title")}
            </p>

            <div className="mt-3 space-y-2">
              {irisModels.map((m, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-sm font-semibold text-white">{m.name}</p>
                  <p className="text-xs text-slate-400">{m.desc}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="xl:col-span-7">
            <SectionKicker>{t("knowledge.kicker")}</SectionKicker>
            <h3 className="mt-4 text-2xl font-bold">{t("knowledge.title")}</h3>

            <CopyableCode value={t("knowledge.base")} className="mt-4" />

            <div className="mt-5 grid gap-2 md:grid-cols-2">
              {knowledgeEndpoints.map((e, i) => (
                <CopyableCode key={i} value={e} />
              ))}
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              {t("knowledge.limits_title")}
            </p>
            <ul className="mt-2 list-disc space-y-1 ps-5 text-sm text-slate-300">
              {knowledgeLimits.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </GlassCard>
        </section>

        {/* ═══════════════════════════════════════════════════════
            ERRORS + OPERATIONS
        ═══════════════════════════════════════════════════════ */}

        <section className="mt-6 grid gap-6 xl:grid-cols-12">
          <GlassCard className="xl:col-span-7">
            <SectionKicker>{t("errors.kicker")}</SectionKicker>
            <h3 className="mt-4 text-2xl font-bold">{t("errors.title")}</h3>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {errorItems.map((e, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-sm font-bold text-[#f3dd94]">{e.code}</p>
                  <p className="text-xs text-slate-300">{e.desc}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="xl:col-span-5">
            <SectionKicker>{t("ops.kicker")}</SectionKicker>
            <h3 className="mt-4 text-2xl font-bold">{t("ops.title")}</h3>

            <ul className="mt-5 list-disc space-y-1 ps-5 text-sm text-slate-300">
              {opsItems.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {opsHeaders.map((h, i) => (
                <span
                  key={i}
                  className="rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-3 py-1 text-xs text-[#f2d98d]"
                >
                  {h}
                </span>
              ))}
            </div>
          </GlassCard>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION NAVIGATION
        ═══════════════════════════════════════════════════════ */}

        <section className="mt-6">
          <GlassCard>
            <SectionKicker>{t("nav.kicker")}</SectionKicker>
            <h3 className="mt-4 text-2xl font-bold">{t("nav.title")}</h3>
            <p className="mt-2 max-w-3xl text-sm text-slate-300">{t("nav.desc")}</p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/docs/authentication"
                className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-[#d4af37]/25 hover:bg-black/30"
              >
                <p className="text-sm font-semibold text-white">
                  {t("nav.items.authentication.title")}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {t("nav.items.authentication.desc")}
                </p>
              </Link>
              <Link
                href="/docs/chat"
                className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-[#d4af37]/25 hover:bg-black/30"
              >
                <p className="text-sm font-semibold text-white">{t("nav.items.chat.title")}</p>
                <p className="mt-1 text-xs text-slate-400">{t("nav.items.chat.desc")}</p>
              </Link>
              <Link
                href="/docs/voice"
                className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-[#d4af37]/25 hover:bg-black/30"
              >
                <p className="text-sm font-semibold text-white">{t("nav.items.voice.title")}</p>
                <p className="mt-1 text-xs text-slate-400">{t("nav.items.voice.desc")}</p>
              </Link>
              <Link
                href="/docs/iris"
                className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-[#d4af37]/25 hover:bg-black/30"
              >
                <p className="text-sm font-semibold text-white">{t("nav.items.iris.title")}</p>
                <p className="mt-1 text-xs text-slate-400">{t("nav.items.iris.desc")}</p>
              </Link>
              <Link
                href="/docs/knowledge"
                className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-[#d4af37]/25 hover:bg-black/30"
              >
                <p className="text-sm font-semibold text-white">
                  {t("nav.items.knowledge.title")}
                </p>
                <p className="mt-1 text-xs text-slate-400">{t("nav.items.knowledge.desc")}</p>
              </Link>
              <Link
                href="/docs/providers"
                className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-[#d4af37]/25 hover:bg-black/30"
              >
                <p className="text-sm font-semibold text-white">
                  {t("nav.items.providers.title")}
                </p>
                <p className="mt-1 text-xs text-slate-400">{t("nav.items.providers.desc")}</p>
              </Link>
              <Link
                href="/docs/output-contracts"
                className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-[#d4af37]/25 hover:bg-black/30"
              >
                <p className="text-sm font-semibold text-white">
                  {t("nav.items.output_contracts.title")}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {t("nav.items.output_contracts.desc")}
                </p>
              </Link>
              <Link
                href="/docs/architecture"
                className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-[#d4af37]/25 hover:bg-black/30"
              >
                <p className="text-sm font-semibold text-white">
                  {t("nav.items.architecture.title")}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {t("nav.items.architecture.desc")}
                </p>
              </Link>
            </div>
          </GlassCard>
        </section>

        {/* ═══════════════════════════════════════════════════════
            FINAL CTA
        ═══════════════════════════════════════════════════════ */}

        <section className="mt-8 rounded-3xl border border-white/12 bg-[linear-gradient(180deg,#0a1220_0%,#09101b_100%)] p-8 text-center">
          <h3 className="text-2xl font-bold md:text-3xl">{t("cta.title")}</h3>
          <p className="mx-auto mt-3 max-w-3xl text-slate-300">{t("cta.desc")}</p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/docs/output-contracts"
              className="rounded-2xl border border-[#d4af37]/35 bg-[#d4af37]/15 px-5 py-3 text-sm font-semibold text-[#f8df94] transition hover:bg-[#d4af37]/25"
            >
              {t("cta.primary")}
            </Link>
            <Link
              href="/docs/architecture"
              className="rounded-2xl border border-white/20 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.09]"
            >
              {t("cta.secondary")}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}