/**
 * Minimaler statischer Webserver fuer die lokale Vorschau von dist/.
 * Nur Node-Bordmittel. Aufruf: `npm run serve` (oder `npm run dev`).
 */
import { createServer } from "node:http";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "..", "dist");
const PORT = process.env.PORT || 4321;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
};

const server = createServer(async (req, res) => {
  try {
    let urlPath = decodeURIComponent(req.url.split("?")[0]);
    if (urlPath.endsWith("/")) urlPath += "index.html";
    let filePath = path.join(DIST, urlPath);

    // Verzeichnistraversal verhindern
    if (!filePath.startsWith(DIST)) {
      res.writeHead(403).end("Forbidden");
      return;
    }

    let data;
    try {
      data = await fs.readFile(filePath);
    } catch {
      // Fallback: /pfad -> /pfad/index.html
      try {
        filePath = path.join(DIST, urlPath, "index.html");
        data = await fs.readFile(filePath);
      } catch {
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<h1>404 - Seite nicht gefunden</h1>");
        return;
      }
    }

    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  } catch (err) {
    res.writeHead(500).end("Server-Fehler");
  }
});

server.listen(PORT, () => {
  console.log(`Vorschau laeuft auf http://localhost:${PORT}`);
});
