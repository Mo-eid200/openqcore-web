"use client";

import React from "react";

import { ChangePasswordSettings } from "../../workspace/settings/ChangePasswordSettings";
import { MFASettings } from "../../workspace/security/MFASettings";
import { ActiveSessions } from "./ActiveSessions";

export default function SecuritySettings() {
  return (
    <section className="flex flex-col gap-5">
      <ChangePasswordSettings accent="amber" />
      <MFASettings accent="amber" />
      <ActiveSessions />
    </section>
  );
}