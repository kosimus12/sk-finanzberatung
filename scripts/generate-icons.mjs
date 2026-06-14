/**
 * OPTIONAL - lokal auszufuehren (benoetigt Internetzugang + Higgsfield-Keys).
 *
 * Erzeugt zusaetzliche Maskottchen-Icons fuer die Dienstleistungen ueber die
 * Higgsfield-API (z. B. Waschbaer mit Schutzhelm = BU, mit Arztkittel = PKV,
 * mit Graph = ETF). Speichert die Ergebnisse in public/images/avatare/.
 *
 * WICHTIG: Keys NUR aus .env lesen - niemals hart im Code hinterlegen.
 * Aufruf:  node scripts/generate-icons.mjs
 *
 * Hinweis: Die genauen Higgsfield-Endpunkte/Parameter koennen sich aendern.
 * Passe URL und Request-Body bei Bedarf an die aktuelle Higgsfield-Doku an.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "..", "public", "images", "avatare");

// --- Keys aus der Umgebung (.env via Hosting/CI oder `node --env-file=.env`) ---
const HF_API_KEY = process.env.HF_API_KEY;
const HF_SECRET = process.env.HF_SECRET;
const HF_ENDPOINT = process.env.HF_ENDPOINT || "https://platform.higgsfield.ai/v1/images/generations";

// Stil-Prompt passend zum bestehenden Maskottchen
const STYLE =
  "3D cartoon mascot raccoon wearing a dark navy business suit and glasses, " +
  "friendly, clean white background, soft studio lighting, centered, full body";

const ICONS = [
  { name: "finanzwaschbaer-helm", prompt: `${STYLE}, wearing a safety helmet, holding a small shield` },
  { name: "finanzwaschbaer-arzt", prompt: `${STYLE}, wearing a white doctor coat with a stethoscope` },
  { name: "finanzwaschbaer-graph", prompt: `${STYLE}, pointing at a rising line chart on a board` },
];

async function generate(icon) {
  const res = await fetch(HF_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${HF_API_KEY}`,
      "hf-secret": HF_SECRET,
    },
    body: JSON.stringify({ prompt: icon.prompt, width: 768, height: 768, n: 1 }),
  });

  if (!res.ok) {
    throw new Error(`Higgsfield-Fehler ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  // Annahme: data.images[0].url ODER data.data[0].b64_json - je nach API anpassen.
  const url = data?.images?.[0]?.url || data?.data?.[0]?.url;
  const b64 = data?.images?.[0]?.b64_json || data?.data?.[0]?.b64_json;

  let buffer;
  if (url) {
    buffer = Buffer.from(await (await fetch(url)).arrayBuffer());
  } else if (b64) {
    buffer = Buffer.from(b64, "base64");
  } else {
    throw new Error("Unerwartetes Antwortformat von Higgsfield.");
  }

  const out = path.join(OUT, `${icon.name}.png`);
  await fs.writeFile(out, buffer);
  console.log("Erzeugt:", out, "\n  -> danach `npm run images` ausfuehren, um WebP zu erzeugen.");
}

async function main() {
  if (!HF_API_KEY || !HF_SECRET) {
    console.error("Bitte HF_API_KEY und HF_SECRET in .env setzen (siehe .env.example).");
    console.error("Tipp: `node --env-file=.env scripts/generate-icons.mjs`");
    process.exit(1);
  }
  await fs.mkdir(OUT, { recursive: true });
  for (const icon of ICONS) {
    try {
      await generate(icon);
    } catch (err) {
      console.error(`Fehler bei ${icon.name}:`, err.message);
    }
  }
}

main();
