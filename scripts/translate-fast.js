const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

if (fs.existsSync(".env.local")) {
  dotenv.config({ path: ".env.local" });
} else {
  dotenv.config();
}

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MESSAGES_DIR = path.join(process.cwd(), "messages");
const SOURCE_FILE = path.join(MESSAGES_DIR, "en.json");

// 🔧 NEW: snapshot of English content as of the last successful run.
// This is what makes change-detection possible — without it, the
// script has no way to know "this key existed before AND its English
// text was different back then" vs "this key just happens to already
// have a translated value that's still correct."
const SNAPSHOT_FILE = path.join(MESSAGES_DIR, ".en-snapshot.json");

// 🔧 Tune these for speed/cost:
// - Bigger BATCH_SIZE = fewer API calls = faster + cheaper, but each
//   call takes a bit longer and risks losing more work if one batch
//   fails to parse. 25-40 is a good range for short UI strings.
// - Bigger CONCURRENCY = more batches running at once = faster, but
//   watch your OpenAI rate limits (requests-per-minute) for your tier.
const BATCH_SIZE = 30;
const CONCURRENCY = 5;
const SAVE_EVERY_N_BATCHES = 3;

// =========================================================
// Array-aware flatten/unflatten. Arrays like "keywords": [...]
// get one dotted key per item (`keywords.0`, `keywords.1`, ...)
// instead of being treated as an opaque blob that never gets
// translated.
// =========================================================

function flatten(obj, prefix = "", result = {}) {
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (Array.isArray(value)) {
      value.forEach((item, i) => {
        const arrKey = `${newKey}.${i}`;
        if (item && typeof item === "object") {
          flatten(item, arrKey, result);
        } else {
          result[arrKey] = item;
        }
      });
    } else if (value && typeof value === "object") {
      flatten(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }

  return result;
}

function unflatten(data) {
  const result = {};

  for (const key of Object.keys(data)) {
    const parts = key.split(".");
    let current = result;

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      const nextPart = parts[i + 1];
      const nextIsArrayIndex = /^\d+$/.test(nextPart);

      if (!(part in current)) {
        current[part] = nextIsArrayIndex ? [] : {};
      }
      current = current[part];
    }

    current[parts[parts.length - 1]] = data[key];
  }

  return result;
}

// =========================================================
// translateBatch() makes ONE API call per batch of {key, text}
// pairs instead of one call per key — the main speed + cost win.
// Prompt is tuned for natural, idiomatic translation (not literal
// word-for-word), and explicitly protects brand/product names.
// =========================================================

async function translateBatch(batch, language) {
  const payload = {};
  batch.forEach(({ key, text }) => {
    payload[key] = text;
  });

  const response = await client.responses.create({
    model: "gpt-5-mini",
    input: `
You are a professional native-speaking localizer for OpenQCore, an
enterprise AI infrastructure platform. Translate the string values in
this JSON object into ${language}.

Translate for MEANING and NATURAL FLOW, not word-for-word. A native
${language} speaker reading this should feel it was written
originally in ${language}, not translated. This means:
- Reorder phrasing, split or merge clauses, and choose the
  expression a native speaker would actually use — don't mirror
  English sentence structure if it sounds unnatural in ${language}.
- Match the register of the source text: formal/institutional for
  legal or enterprise copy, natural conversational tone for UI
  labels and marketing copy, technical precision for developer-facing
  strings. Don't flatten everything to the same tone.
- Idioms and figures of speech should be replaced with the closest
  natural equivalent in ${language}, not translated literally.

Do NOT translate: product and brand names (OpenQCore, Pulse Engine,
Iris Engine, ChatQXT, QXT, etc.), company/technical proper nouns, or
code-like tokens.

Formatting rules (these ARE literal, do not adapt):
- Return ONLY a JSON object with the exact same keys.
- Keep placeholders exactly as-is, unchanged: {name}, {{count}}, %s, %d
- Keep HTML tags exactly as-is.
- Keep Markdown syntax exactly as-is.
- Do not explain, do not add commentary, do not wrap in markdown fences.

JSON:
${JSON.stringify(payload)}
`,
  });

  let raw = response.output_text.trim();
  raw = raw.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();

  return JSON.parse(raw);
}

async function translateBatchWithRetry(batch, language, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await translateBatch(batch, language);
    } catch (err) {
      console.warn(`    ! batch failed (attempt ${attempt}/${retries}): ${err.message}`);
      if (attempt === retries) {
        const fallback = {};
        batch.forEach(({ key, text }) => (fallback[key] = text));
        return fallback;
      }
      await new Promise((r) => setTimeout(r, 800 * attempt));
    }
  }
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

async function runBatchesConcurrently(batches, worker, limit) {
  const results = new Array(batches.length);
  let nextIndex = 0;

  async function runOne() {
    while (nextIndex < batches.length) {
      const i = nextIndex++;
      results[i] = await worker(batches[i], i);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, batches.length) }, runOne)
  );

  return results;
}

// =========================================================
// 🔧 NEW: loads the last-known English snapshot. If it doesn't
// exist yet (first run with this feature), treat every current
// English key as "unchanged" so existing translations aren't
// needlessly re-translated on the first run — only genuinely new
// or actually-edited keys trigger work going forward.
// =========================================================

function loadSnapshot(currentEnFlat) {
  if (!fs.existsSync(SNAPSHOT_FILE)) {
    return { ...currentEnFlat };
  }
  try {
    return flatten(JSON.parse(fs.readFileSync(SNAPSHOT_FILE, "utf8")));
  } catch {
    console.warn("  ! Could not read .en-snapshot.json, treating all keys as unchanged this run.");
    return { ...currentEnFlat };
  }
}

function saveSnapshot(currentEnFlat) {
  fs.writeFileSync(
    SNAPSHOT_FILE,
    JSON.stringify(unflatten(currentEnFlat), null, 2) + "\n"
  );
}

async function run() {
  if (!fs.existsSync(SOURCE_FILE)) {
    throw new Error("messages/en.json not found.");
  }

  const source = JSON.parse(fs.readFileSync(SOURCE_FILE, "utf8"));
  const sourceFlat = flatten(source);
  const snapshotFlat = loadSnapshot(sourceFlat);

  // 🔧 NEW: which English keys changed since the last run (existed
  // before, with a different value) — these force re-translation in
  // every locale regardless of whether the locale already has some
  // (now-stale) value for them.
  const changedKeys = new Set();
  for (const key of Object.keys(sourceFlat)) {
    const prev = snapshotFlat[key];
    if (prev !== undefined && prev !== sourceFlat[key]) {
      changedKeys.add(key);
    }
  }
  if (changedKeys.size > 0) {
    console.log(`\n📝 ${changedKeys.size} English key(s) changed since last run — will be re-translated in every locale:`);
    for (const k of changedKeys) console.log(`    - ${k}`);
  }

  const files = fs
    .readdirSync(MESSAGES_DIR)
    .filter((f) => f.endsWith(".json") && f !== "en.json" && !f.includes("backup"));

  for (const file of files) {
    const locale = file.replace(".json", "");
    console.log(`\n🌍 ${locale}`);

    const targetPath = path.join(MESSAGES_DIR, file);
    let target = {};
    if (fs.existsSync(targetPath)) {
      target = JSON.parse(fs.readFileSync(targetPath, "utf8"));
    }

    const targetFlat = flatten(target);

    const toTranslate = [];
    let newCount = 0;
    let changedCount = 0;

    for (const key of Object.keys(sourceFlat)) {
      const value = sourceFlat[key];
      const targetHasValue = targetFlat[key] !== undefined && targetFlat[key] !== "";
      const englishChanged = changedKeys.has(key);

      // 🔧 NEW: translate if either the locale is missing this key
      // OR the English source for this key changed since last run —
      // previously only the first condition was checked, so edited
      // English text silently kept its old (now-wrong) translation
      // forever.
      if (targetHasValue && !englishChanged) {
        continue;
      }

      if (typeof value !== "string") {
        targetFlat[key] = value;
        continue;
      }

      if (!targetHasValue) newCount++;
      else changedCount++;

      toTranslate.push({ key, text: value });
    }

    if (toTranslate.length === 0) {
      console.log(`  ✅ Already fully in sync, nothing to translate.`);
      continue;
    }

    const batches = chunk(toTranslate, BATCH_SIZE);
    console.log(
      `  ${toTranslate.length} string(s) to translate ` +
      `(${newCount} new, ${changedCount} updated), in ${batches.length} batch(es)...`
    );

    let completed = 0;

    await runBatchesConcurrently(
      batches,
      async (batch) => {
        const translated = await translateBatchWithRetry(batch, locale);

        batch.forEach(({ key, text }) => {
          targetFlat[key] = translated[key] ?? text;
        });

        completed++;
        console.log(`  batch ${completed}/${batches.length} done`);

        if (completed % SAVE_EVERY_N_BATCHES === 0) {
          fs.writeFileSync(targetPath, JSON.stringify(unflatten(targetFlat), null, 2) + "\n");
        }
      },
      CONCURRENCY
    );

    fs.writeFileSync(targetPath, JSON.stringify(unflatten(targetFlat), null, 2) + "\n");
    console.log(`✅ ${toTranslate.length} translated (${newCount} new, ${changedCount} updated).`);
  }

  // 🔧 NEW: only update the snapshot AFTER every locale has been
  // processed against the current English content — so a crash
  // mid-run doesn't mark keys as "already accounted for" before
  // they've actually been re-translated everywhere.
  saveSnapshot(sourceFlat);

  console.log("\n🎉 Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});