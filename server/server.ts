
import { dirname, join, extname, resolve } from "@std/path";
import { ensureDir, exists } from "@std/fs";
import { BlobReader, BlobWriter, ZipReader } from "@zip-js/zip-js";
import { generatePack } from "../gen_pack.ts";
import { downloadRss } from "../generate/rss_parser.ts";
import { StudioPackGenerator } from "../studio_pack_generator.ts";
import { contentType } from "@std/media-types";

const PORT = 5555;
const TMP_DIR = "/tmp/spg-uploads";

interface SessionData {
  id: string;
  dir: string; // The folder containing the story
  zipPath?: string; // The generated zip path
  lastActive: number;
}

const sessions = new Map<string, SessionData>();

// Cleanup task
setInterval(async () => {
  const now = Date.now();
  for (const [id, session] of sessions) {
    if (now - session.lastActive > 1000 * 60 * 60) { // 1 hour
      console.log(`Cleaning up session ${id}`);
      try {
        await Deno.remove(session.dir, { recursive: true });
      } catch (e) { console.error(e) }
      sessions.delete(id);
    }
  }
}, 1000 * 60 * 10);

async function unzip(zipData: Uint8Array, destDir: string) {
  const reader = new ZipReader(new BlobReader(new Blob([zipData])));
  const entries = await reader.getEntries();
  const destDirResolved = resolve(destDir);
  for (const entry of entries) {
    if (entry.directory) continue;
    const filePath = resolve(destDirResolved, entry.filename);

    if (!filePath.startsWith(destDirResolved)) {
      console.error(`Zip Slip detected: ${entry.filename}`);
      continue;
    }

    await ensureDir(dirname(filePath));
    const writer = new BlobWriter();
    const blob = await entry.getData(writer);
    await Deno.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
  }
  await reader.close();
}

async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // CORS
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  const headers = { "Access-Control-Allow-Origin": "*" };

  try {
    if (pathname === "/api/upload" && request.method === "POST") {
      const formData = await request.formData();
      const file = formData.get("file") as File;
      if (!file) {
        return new Response("No file uploaded", { status: 400, headers });
      }

      const sessionId = crypto.randomUUID();
      const sessionDir = join(TMP_DIR, sessionId);
      await ensureDir(sessionDir);

      const buf = await file.arrayBuffer();
      await unzip(new Uint8Array(buf), sessionDir);

      sessions.set(sessionId, {
        id: sessionId,
        dir: sessionDir,
        lastActive: Date.now(),
      });

      return new Response(JSON.stringify({ sessionId }), { headers });

    } else if (pathname === "/api/rss" && request.method === "POST") {
      const body = await request.json();
      const rssUrl = body.url;
      if (!rssUrl) {
        return new Response("No URL provided", { status: 400, headers });
      }

      const sessionId = crypto.randomUUID();
      const sessionDir = join(TMP_DIR, sessionId);
      await ensureDir(sessionDir);

      // We need a dummy options object for downloadRss
      const opt = new StudioPackGenerator();
      // Apply some defaults or user provided options if any
      // For RSS, we usually want to download it.

      const downloadedPaths = await downloadRss(rssUrl, sessionDir, opt);
      // downloadRss creates subfolders in sessionDir.
      // We assume the first downloaded path is the one we want, or just set sessionDir as root.
      // However, generatePack typically expects the story folder itself.
      // If RSS creates multiple packs (seasons), we might have an issue.
      // For now, let's assume we point to sessionDir and let generatePack find things?
      // No, generatePack takes a single folder.

      // If multiple paths, we might need to handle that.
      // For simplicity, let's take the first one if available.

      const storyPath = downloadedPaths[0] || sessionDir;

      sessions.set(sessionId, {
        id: sessionId,
        dir: storyPath,
        lastActive: Date.now(),
      });

      return new Response(JSON.stringify({ sessionId }), { headers });

    } else if (pathname === "/api/generate" && request.method === "POST") {
      const body = await request.json();
      const sessionId = body.sessionId;
      const session = sessions.get(sessionId);

      if (!session) {
        return new Response("Session not found", { status: 404, headers });
      }
      session.lastActive = Date.now();

      const opt = new StudioPackGenerator();
      Object.assign(opt, body.options || {});
      opt.storyPath = session.dir;
      opt.outputFolder = session.dir; // Generate zip inside the temp dir
      opt.skipZipGeneration = false;

      // Override important things
      opt.gui = false;

      try {
        await generatePack(opt);

        // Find the generated zip
        let zipName = "";
        for await (const dirEntry of Deno.readDir(session.dir)) {
            if (dirEntry.isFile && dirEntry.name.endsWith(".zip")) {
                zipName = dirEntry.name;
                // Prefer the one with date if multiple?
                // Usually only one is generated per run.
            }
        }

        if (zipName) {
            session.zipPath = join(session.dir, zipName);
            return new Response(JSON.stringify({ success: true, downloadUrl: `/api/download?session=${sessionId}` }), { headers });
        } else {
             return new Response(JSON.stringify({ success: false, message: "Zip generation failed (no zip found)" }), { headers });
        }

      } catch (e: any) {
        console.error(e);
        return new Response(JSON.stringify({ success: false, message: e.message }), { status: 500, headers });
      }

    } else if (pathname === "/api/download" && request.method === "GET") {
        const sessionId = url.searchParams.get("session");
        const session = sessions.get(sessionId || "");
        if (!session || !session.zipPath) {
             return new Response("File not found", { status: 404, headers });
        }

        const file = await Deno.open(session.zipPath);
        const filename = session.zipPath.split(/[\\/]/).pop();

        return new Response(file.readable, {
            headers: {
                ...headers,
                "Content-Type": "application/zip",
                "Content-Disposition": `attachment; filename="${filename}"`
            }
        });
    }

    // Static Files (Frontend)
    // Try to serve from gui/frontend/dist
    let filePath = pathname;
    if (filePath === "/") filePath = "/index.html";

    const distPath = join(Deno.cwd(), "gui/frontend/dist");
    const fullPath = join(distPath, filePath);

    // Security check
    if (!fullPath.startsWith(distPath)) {
         return new Response("Forbidden", { status: 403 });
    }

    if (await exists(fullPath)) {
        const file = await Deno.readFile(fullPath);
        const type = contentType(extname(fullPath)) || "application/octet-stream";
        return new Response(file, { headers: { "Content-Type": type } });
    }

    // Fallback to index.html for SPA routing if we were using it, but here likely not needed as it's simple.

    return new Response("Not Found", { status: 404 });

  } catch (e: any) {
    console.error(e);
    return new Response(e.message, { status: 500, headers });
  }
}

console.log(`Server running on http://localhost:${PORT}`);
Deno.serve({ port: PORT }, handleRequest);
