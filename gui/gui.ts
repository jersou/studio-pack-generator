#!/usr/bin/env -S deno run  --allow-net=localhost:5555 --allow-env --allow-read --allow-write=assets_bundle.json --allow-run

import $ from "https://deno.land/x/dax@0.39.2/mod.ts";
import {
  decodeBase64,
  encodeBase64,
} from "https://deno.land/std@0.220.0/encoding/base64.ts";
import { cliteRun } from "https://deno.land/x/clite_parser@0.2.1/clite_parser.ts";
import assetsFromJson from "./assets_bundle.json" with { type: "json" };
import { walk } from "https://deno.land/std@0.219.0/fs/walk.ts";
import { assert } from "https://deno.land/std@0.219.0/assert/assert.ts";
import { extname } from "https://deno.land/std@0.219.0/path/extname.ts";
import { getMetadata, ModOptions } from "../gen_pack.ts";
import { fsToFolder } from "../serialize/fs.ts";
import { Metadata } from "../serialize/types.ts";
import { folderToPack } from "../serialize/converter.ts";
import { mimeTypes } from "./mime-types.ts";

type Assets = {
  [k: string]: { type: string; content: Uint8Array; route: URLPattern };
};

export function openGui(opt: ModOptions) {
  if (!opt.storyPath) {
    console.log("No story path → exit");
    Deno.exit(1);
  }

  const uiApp = new StudioPackGeneratorGui();
  uiApp.update = true;
  uiApp.openInBrowser = true;
  uiApp.setStudioPackGeneratorOpt(opt);
  return uiApp.main();
}

async function getPack(opt: ModOptions) {
  const folder = await fsToFolder(opt.storyPath, false);
  const metadata: Metadata = await getMetadata(opt);
  return folderToPack(folder, metadata);
}

class StudioPackGeneratorGui {
  setStudioPackGeneratorOpt(opt: ModOptions) {
    this.#opt = opt;
  }
  hostname = "localhost";
  port = 5555;
  notExitIfNoClient: boolean | string = false;
  openInBrowser: boolean | string = false;
  openInBrowserAppMode: boolean | string = false;
  update: boolean | string = false;
  _update_desc = "update assets_bundle.json";
  #opt?: ModOptions;
  #server: Deno.HttpServer | undefined;
  #sockets = new Set<WebSocket>();
  #assets: Assets = {};
  #wsRoute = new URLPattern({ pathname: "/api/events-ws" });
  #routes = [
    {
      route: new URLPattern({ pathname: "/file" }),
      exec: async (_match: URLPatternResult, request: Request) => {
        const url = new URL(request.url);
        const path = decodeURIComponent(url.searchParams.get("path") ?? "");
        if (path.startsWith(this.#opt!.storyPath)) {
          const ext = extname(path)?.substring(1);
          const type = mimeTypes[ext];
          const content = await Deno.readFile(path);
          const headers = { "Content-Type": type };
          return new Response(content, { status: 200, headers });
        } else {
          return new Response("Not a pack file", { status: 403 });
        }
      },
    },
    {
      route: new URLPattern({ pathname: "/api/openFolder" }),
      exec: async (_match: URLPatternResult, request: Request) => {
        const url = new URL(request.url);
        const path = decodeURIComponent(url.searchParams.get("path") ?? "");
        if (path.startsWith(this.#opt!.storyPath)) {
          // TODO
          await $`nemo ${path}`.printCommand(true);
          return new Response("ok", { status: 200 });
        } else {
          return new Response("Not a pack file", { status: 403 });
        }
      },
    },
  ] as const;

  #sendWs(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
    this.#sockets.forEach((s) => s.send(data));
  }

  async main() {
    await this.#loadAssets();
    const onListen = (params: { hostname: string; port: number }) => {
      (async () => {
        const watcher = Deno.watchFs(this.#opt!.storyPath);
        for await (const event of watcher) {
          // console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
          console.log(">>>> event", event);
          const pack = await getPack(this.#opt!);
          // console.log(JSON.stringify(pack, null, "  "));
          this.#sendWs(JSON.stringify({ type: "fs-update", pack }));
        }
      })();

      this.port = params.port;
      this.hostname = params.hostname;
      console.log(`Listen on ${this.hostname}:${this.port}`);

      if (this.openInBrowser && this.openInBrowser !== "false") {
        this.#openInBrowser().then();
      }
    };
    this.#server = Deno.serve(
      { hostname: this.hostname, port: this.port, onListen },
      (r) => this.#handleRequest(r),
    );
  }

  async #openInBrowser() {
    const appMode = this.openInBrowserAppMode === true ||
      this.openInBrowserAppMode === "true";
    const arg = appMode ? "--app=" : "";
    if (this.openInBrowser === true || this.openInBrowser === "true") {
      if (await $.commandExists("chromium")) {
        await $`chromium ${arg}http://${this.hostname}:${this.port}/`;
      } else if (await $.commandExists("google-chrome")) {
        await $`google-chrome ${arg}http://${this.hostname}:${this.port}/`;
      } else {
        await $`gio open http://${this.hostname}:${this.port}/`;
      }
    } else {
      await $`${this.openInBrowser} ${arg}http://${this.hostname}:${this.port}/`;
    }
  }

  async #handleRequest(request: Request) {
    console.log(`handle ${request.url}`);
    for (const { route, exec } of this.#routes) {
      const match = route.exec(request.url);
      if (match) {
        return await exec(match, request);
      }
    }
    for (const file of Object.values(this.#assets ?? {})) {
      if (file.route?.exec(request.url)) {
        const headers = { "Content-Type": file.type };
        return new Response(file.content, { status: 200, headers });
      }
    }
    if (this.#wsRoute.exec(request.url)) {
      return this.#handleWsRequest(request);
    }
    return new Response("", { status: 404 });
  }

  #handleWsRequest(request: Request) {
    if (request.headers.get("upgrade") != "websocket") {
      return new Response(null, { status: 501 });
    }
    const { socket, response } = Deno.upgradeWebSocket(request);
    socket.addEventListener("open", async () => {
      this.#sockets.add(socket);
      console.log(`a client connected! ${this.#sockets.size} clients`);
      const pack = await getPack(this.#opt!);
      socket.send(JSON.stringify({ type: "fs-update", pack }));
    });
    socket.addEventListener("close", () => {
      this.#sockets.delete(socket);
      console.log(`a client disconnected! ${this.#sockets.size} clients`);
      if (
        (this.notExitIfNoClient === false ||
          this.notExitIfNoClient === "false") && this.#sockets.size === 0
      ) {
        console.log(`→ ExitIfNoClient → shutdown server !`);
        // this.#server?.shutdown();
        Deno.exit(0);
      }
    });
    return response;
  }

  async updateAssets() {
    console.log("update assets_bundle.json");
    const frontendPath = $.path(import.meta).resolve(`../frontend/`).toString();
    for await (const entry of walk(frontendPath, { includeDirs: false })) {
      assert(entry.path.startsWith(frontendPath));
      const path = entry.path.substring(frontendPath.length);
      const ext = extname(path)?.substring(1);
      const type = mimeTypes[ext];
      const content = await Deno.readFile(entry.path);
      const route = new URLPattern({ pathname: path });
      this.#assets[path] = { type, route, content };
      console.log({ path, type });
    }
    const paths = Object.keys(this.#assets).sort();
    const assets: Assets = {};
    paths.forEach((path) => (assets[path] = this.#assets[path]));
    await Deno.writeTextFile(
      $.path(import.meta).resolve("../assets_bundle.json").toString(),
      JSON.stringify(assets, (key, value) => {
        if (key === "content") {
          return encodeBase64(value as Uint8Array);
        } else if (key === "route") {
          return (value as URLPattern).pathname;
        } else {
          return value;
        }
      }, "  "),
    );
  }

  async #loadAssets() {
    if (this.update === true || this.update === "true") {
      await this.updateAssets();
    } else {
      for (const [key, asset] of Object.entries(assetsFromJson)) {
        this.#assets[key] = {
          type: asset?.type,
          route: new URLPattern({ pathname: asset.route }),
          content: decodeBase64(asset.content),
        };
      }
    }
    if (this.#assets["/index.html"]) {
      const route = new URLPattern({ pathname: "/" });
      this.#assets["/"] = { ...this.#assets["/index.html"], route };
    }
  }
}

if (import.meta.main) {
  cliteRun(new StudioPackGeneratorGui());
}