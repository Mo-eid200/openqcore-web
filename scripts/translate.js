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

function flatten(obj, prefix = "", result = {}) {
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
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

    while (parts.length > 1) {
      const part = parts.shift();

      if (!current[part]) current[part] = {};

      current = current[part];
    }

    current[parts[0]] = data[key];
  }

  return result;
}

async function translate(text, language) {
  const response = await client.responses.create({
    model: "gpt-5-mini",
    input: `
Translate this UI text into ${language}.

Rules:
- Return ONLY the translated text.
- Keep placeholders exactly:
{name}
{{count}}
%s
%d
 - Keep HTML tags.
- Keep Markdown.
- Do not explain.

Text:
${text}
`,
  });

  return response.output_text.trim();
}

async function run() {
  if (!fs.existsSync(SOURCE_FILE)) {
    throw new Error("messages/en.json not found.");
  }

  const source = JSON.parse(
    fs.readFileSync(SOURCE_FILE, "utf8")
  );

  const sourceFlat = flatten(source);

  const files = fs
    .readdirSync(MESSAGES_DIR)
    .filter(
      (f) =>
        f.endsWith(".json") &&
        f !== "en.json" &&
        !f.includes("backup")
    );

  for (const file of files) {
    const locale = file.replace(".json", "");

    console.log(`\n🌍 ${locale}`);

    const targetPath = path.join(MESSAGES_DIR, file);

    let target = {};

    if (fs.existsSync(targetPath)) {
      target = JSON.parse(
        fs.readFileSync(targetPath, "utf8")
      );
    }

    const targetFlat = flatten(target);

    let translated = 0;

    for (const key of Object.keys(sourceFlat)) {
      if (
        targetFlat[key] !== undefined &&
        targetFlat[key] !== ""
      ) {
        continue;
      }

      const value = sourceFlat[key];

      if (typeof value !== "string") {
        targetFlat[key] = value;
        continue;
      }

      console.log(`  ➜ ${key}`);

      targetFlat[key] = await translate(
        value,
        locale
      );

      translated++;
    }

    fs.writeFileSync(
      targetPath,
      JSON.stringify(unflatten(targetFlat), null, 2) + "\n"
    );

    console.log(`✅ ${translated} translated.`);
  }

  console.log("\n🎉 Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});