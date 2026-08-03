"use client";

import React from "react";
import { LifeBuoy, Sparkles, BookText } from "lucide-react";
import HelpCenter from "./HelpCenter";
import FAQ from "./FAQ";
import ContactSupport from "./ContactSupport";
import type { HelpSection, FaqItem } from "./types";

const ARTICLES: HelpSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    content:
      "Create your account, then explore Agents, Knowledge, and Compute from the sidebar. Switch between your personal console and any workspace using the switcher in the top-left.",
  },
  {
    id: "workspaces",
    title: "Workspaces & Teams",
    content:
      "A workspace is a shared environment for your team — its own plan, seats, credits, and members. Invite teammates from Members, and manage the plan from Billing.",
  },
  {
    id: "security",
    title: "Keeping Your Account Secure",
    content:
      "Enable two-factor authentication and review your active sessions from Security. If you signed up with Google or Microsoft, you can also set a password to enable email login.",
  },
];

const FAQS: FaqItem[] = [
  {
    id: "f1",
    question: "How do I reset or change my password?",
    answer:
      "Go to Settings → Security, then use Change Password. If you signed in with Google or Microsoft and have no password yet, you'll see Set a Password instead — no current password needed.",
  },
  {
    id: "f2",
    question: "How do I enable two-factor authentication (MFA)?",
    answer:
      "Go to Settings → Security → Multi-Factor Authentication → Enable. Scan the QR code with an authenticator app (Google Authenticator, Authy), enter the 6-digit code, and save your backup codes somewhere safe — they're shown only once.",
  },
  {
    id: "f3",
    question: "I can't see my old devices or sessions — where are they?",
    answer:
      "Under Settings → Security → Sessions, you'll see every device currently signed in to your account, including location and last activity. You can sign out any device you don't recognize — except the one you're using right now.",
  },
  {
    id: "f4",
    question: "How do I invite someone to my workspace?",
    answer:
      "Open your workspace, go to Members, and click Invite Member. Choose a role (Member or Admin) and send the invite — they'll get an email with a link to join.",
  },
  {
    id: "f5",
    question: "Why can't I invite more members to my workspace?",
    answer:
      "Your workspace has reached its seat limit for the current plan. Go to Billing to upgrade the plan or remove an existing member to free up a seat.",
  },
  {
    id: "f6",
    question: "Where can I see my workspace's usage and billing history?",
    answer:
      "Go to Billing inside your workspace to see your current plan, seats used, QX-Power balance, usage this cycle, and recent transactions.",
  },
  {
    id: "f7",
    question: "Is workspace billing the same as my personal plan?",
    answer:
      "No — they're completely separate. Your personal plan and credits are yours alone; a workspace's plan, seats, and QX-Power are shared by everyone in that workspace.",
  },
  {
    id: "f8",
    question: "How do I create or manage API keys?",
    answer:
      "Go to API & SDK inside your workspace to create, view, and revoke API keys, including their scopes and usage limits.",
  },
  {
    id: "f9",
    question: "Who can see my workspace's login history?",
    answer:
      "Workspace admins can view Access Logs under the workspace's Security page — who signed in, from where, on what device, and when.",
  },
  {
    id: "f10",
    question: "How long does support take to respond?",
    answer:
      "Our average response time is under 24 hours. You'll get an email confirmation with a ticket number right after you submit your request — keep it for reference.",
  },
];

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-300/10 bg-amber-300/[0.08] text-amber-300">
        {icon}
      </div>

      <div>
        <h2 className="text-base font-semibold text-white">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm leading-6 text-white/40">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function SupportPage() {
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-3 py-8 sm:px-6 xl:px-10">
      {/* Page Header */}
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-amber-300/80">
            <Sparkles className="h-3.5 w-3.5" />
            Help Center
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white lg:text-3xl">
              Help & Support
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/45">
              Find answers, explore help articles, and contact our team
              whenever you need assistance.
            </p>
          </div>
        </div>

        <div
          className="
            flex items-center gap-2 rounded-2xl
            border border-white/[0.06]
            bg-[#0f1012]/92 px-3.5 py-2.5
            shadow-[0_8px_24px_rgba(0,0,0,0.14)]
            backdrop-blur-xl
          "
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-300/10 bg-amber-300/[0.08]">
            <LifeBuoy className="h-4 w-4 text-amber-300/70" />
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-wide text-white/30">
              Response Time
            </div>
            <div className="text-sm font-bold text-white">
              &lt; 24h
            </div>
          </div>
        </div>
      </section>

      {/* Help Articles */}
      <section>
        <SectionHeader
          icon={<BookText className="h-4 w-4" />}
          title="Help Articles"
          description="Start with curated guides for the most common account, workspace, and security topics."
        />
        <HelpCenter sections={ARTICLES} />
      </section>

      {/* FAQ */}
      <section>
        <SectionHeader
          icon={<Sparkles className="h-4 w-4" />}
          title="Frequently Asked Questions"
          description="Quick answers to the questions users ask most often."
        />
        <FAQ items={FAQS} />
      </section>

      {/* Contact */}
      <section>
        <SectionHeader
          icon={<LifeBuoy className="h-4 w-4" />}
          title="Contact Support"
          description="Still need help? Send a message and our team will get back to you."
        />
        <ContactSupport />
      </section>
    </div>
  );
}