// Fails the build when a component calls useTranslations("x") or
// t("x.key") through useTranslations() and "x" is not in
// app/lib/i18n/client-namespaces.ts (the browser would miss those texts).
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const listFile = fs.readFileSync(path.join(root, "app/lib/i18n/client-namespaces.ts"), "utf8");
const allowed = new Set([...listFile.matchAll(/^\s*"([\w.]+)",$/gm)].map((m) => m[1]));
const en = JSON.parse(fs.readFileSync(path.join(root, "messages/en.json"), "utf8"));

const used = new Map();
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!["node_modules", ".next"].includes(e.name)) walk(p); continue; }
    if (!/\.(tsx|ts)$/.test(e.name)) continue;
    const src = fs.readFileSync(p, "utf8");
    for (const m of src.matchAll(/useTranslations\(\s*["']([\w.]+)["']\s*\)/g)) used.set(m[1].split(".")[0], p);
    if (/useTranslations\(\s*\)/.test(src)) {
      // root translator: namespaces come from t("ns.key") here and in helpers it is passed to
      for (const m of src.matchAll(/\bt\(\s*["']([\w]+)\./g)) used.set(m[1], p);
    }
  }
}
walk(path.join(root, "app"));
// helpers that receive the root translator
for (const m of fs.readFileSync(path.join(root, "app/[locale]/(marketing)/components/get-header-data.ts"), "utf8").matchAll(/\bt\(\s*["']([\w]+)\./g)) used.set(m[1], "get-header-data.ts");

const missing = [...used].filter(([ns]) => !allowed.has(ns) && ns in en);
if (missing.length) {
  console.error("Client translation namespaces missing from app/lib/i18n/client-namespaces.ts:");
  for (const [ns, file] of missing) console.error(`  ${ns}  (${path.relative(root, file)})`);
  process.exit(1);
}
console.log(`client translations: ${used.size} namespaces, all listed`);
