#!/usr/bin/env -S deno run  --allow-net=localhost:5555 --allow-env --allow-read --allow-write=assets_bundle.json --allow-run

import $ from "https://deno.land/x/dax@0.39.2/mod.ts";
import { cliteRun } from "https://deno.land/x/clite_parser@0.2.1/clite_parser.ts";
import { extname } from "https://deno.land/std@0.219.0/path/extname.ts";
import { generatePack, getMetadata } from "../gen_pack.ts";
import { fsToFolder } from "../serialize/fs.ts";
import { Metadata } from "../serialize/types.ts";
import { folderToPack } from "../serialize/converter.ts";
import { mimeTypes } from "./mime-types.ts";
import { throttle } from "./src/lodash-throttle-v4.1.1.js";
import { ModOptions } from "../types.ts";
import FsWatcher = Deno.FsWatcher;

// TODO : add generated APIKEY for http request auth

type Assets = {
  [k: string]: { type: string; content: Uint8Array; route: URLPattern };
};

export function openGuiServer(opt: ModOptions) {
  const uiApp = new StudioPackGeneratorGui();
  uiApp.notExitIfNoClient = !opt.isCompiled;
  uiApp.setStudioPackGeneratorOpt(opt);
  return uiApp.main();
}

async function getPack(opt: ModOptions) {
  const folder = await fsToFolder(opt.storyPath, false);
  const metadata: Metadata = await getMetadata(opt);
  return folderToPack(folder, metadata);
}

async function runSpg(opt: ModOptions) {
  try {
    await generatePack({ ...opt });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function getAccessControlAllowOrigin(request: Request): Record<string, string> {
  const origin = request.headers.get("Origin");
  if ((origin ?? "").startsWith("http://localhost:")) {
    return { "Access-Control-Allow-Origin": (origin ?? "http://localhost") };
  } else {
    return {};
  }
}
async function getFileBrowser() {
  switch (Deno.build.os) {
    case "windows":
      return ["start"];
    case "darwin":
      return ["open"];
    case "linux":
    default:
      if (await $.commandExists("gio")) {
        return ["gio", "open"];
      } else if (await $.commandExists("xdg-open")) {
        return ["xdg-open"];
      } else if (await $.commandExists("nautilus")) {
        return ["nautilus"];
      } else if (await $.commandExists("nemo")) {
        return ["nemo"];
      } else {
        return null;
      }
  }
}

async function openFolder(path: string) {
  const fileBrowser = await getFileBrowser();
  if (fileBrowser) {
    return $`${fileBrowser} ${path}`.noThrow(true).printCommand(true).spawn();
  } else {
    return null;
  }
}

class StudioPackGeneratorGui {
  setStudioPackGeneratorOpt(opt: ModOptions) {
    this.#opt = opt;
  }
  hostname = "localhost";
  port = 5555;
  notExitIfNoClient: boolean | string = false;
  _update_desc = "update assets_bundle.json";
  #opt?: ModOptions;
  #watcher: FsWatcher;
  #sockets = new Set<WebSocket>();
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
      route: new URLPattern({ pathname: "/api/runSpg" }),
      exec: async (_match: URLPatternResult, request: Request) => {
        const opt = await request.json();
        const optFiltered = {
          addDelay: opt.addDelay,
          autoNextStoryTransition: opt.autoNextStoryTransition,
          selectNextStoryAtEnd: opt.selectNextStoryAtEnd,
          nightMode: opt.nightMode,
          skipAudioConvert: opt.skipAudioConvert,
          skipImageConvert: opt.skipImageConvert,
          skipAudioItemGen: opt.skipAudioItemGen,
          skipExtractImageFromMp3: opt.skipExtractImageFromMp3,
          skipImageItemGen: opt.skipImageItemGen,
          skipNotRss: opt.skipNotRss,
          skipRssImageDl: opt.skipRssImageDl,
          skipWsl: opt.skipWsl,
          skipZipGeneration: opt.skipZipGeneration,
          useOpenAiTts: opt.useOpenAiTts,
          lang: opt.lang,
          outputFolder: opt.outputFolder,
          seekStory: opt.seekStory,
          openAiApiKey: opt.openAiApiKey,
          openAiModel: opt.openAiModel,
          openAiVoice: opt.openAiVoice,
        };
        const configPath = `${this.#opt!.storyPath}/config.json`;
        console.log(`Write config to ${configPath}`);
        await Deno.writeTextFile(
          configPath,
          JSON.stringify(optFiltered, null, "  "),
        );
        console.log(`Run SPG on ${this.#opt!.storyPath}`);

        (async () => {
          console.log("SPG start");
          this.#sendWs(JSON.stringify({ type: "SPG-start" }));

          try {
            const res = await runSpg(this.#opt!);
            console.log("SPG end");
            this.#sendWs(JSON.stringify({ type: "SPG-end", ok: res }));
          } catch (error) {
            console.error(error);
          }
        })();

        return new Response("ok", {
          status: 200,
          headers: getAccessControlAllowOrigin(request),
        });
      },
    },
    {
      route: new URLPattern({ pathname: "/api/openFolder" }),
      exec: (_match: URLPatternResult, request: Request) => {
        const url = new URL(request.url);
        const path = decodeURIComponent(url.searchParams.get("path") ?? "");
        if (path.startsWith(this.#opt!.storyPath)) {
          openFolder(path);
          return new Response("ok", {
            status: 200,
            headers: getAccessControlAllowOrigin(request),
          });
        } else {
          return new Response("Not a pack file", { status: 403 });
        }
      },
    },
    {
      route: new URLPattern({ pathname: "/api/storyPath" }),
      exec: (_match: URLPatternResult, request: Request) => {
        const url = new URL(request.url);
        const path = decodeURIComponent(url.searchParams.get("path") ?? "");
        this.#watchStoryPath(path);
        return new Response("ok", {
          status: 200,
          headers: getAccessControlAllowOrigin(request),
        });
      },
    },
  ] as const;

  #sendWs(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
    this.#sockets.forEach((s) => s.send(data));
  }

  async #watchStoryPath(path: string) {
    this.#opt!.storyPath = path;
    if (this.#watcher) {
      try {
        this.#watcher.close();
        this.#watcher = null;
      } catch (e) {
        console.error("#watcher.close()", e);
      }
    }
    if (this.#opt!.storyPath) {
      try {
        const onWatchEvent = async (newStoryPath?: boolean) => {
          const pack = await getPack(this.#opt!);
          this.#sendWs(
            JSON.stringify({ type: "fs-update", pack, newStoryPath }),
          );
        };
        const onWatchEventThrottle = throttle(onWatchEvent, 1000);
        onWatchEventThrottle(true);
        console.log({ storyPath: this.#opt!.storyPath });
        this.#watcher = Deno.watchFs(this.#opt!.storyPath);
        for await (const _event of this.#watcher) {
          onWatchEventThrottle();
        }
      } catch (e) {
        console.error("watchStoryPath", e);
      }
    } else {
      this.#sendWs(
        JSON.stringify({
          type: "fs-update",
          pack: {
            title: "",
            description: "",
            format: "",
            version: 0,
            nightModeAvailable: false,
            entrypoint: {
              class: "StageNode-Entrypoint",
              name: "",
              okTransition: {
                class: "ActionNode",
                name: "",
                options: [],
              },
              image: null,
              audio: null,
            },
          },
          newStoryPath: true,
        }),
      );
    }
  }

  async main() {
    const onListen = (params: { hostname: string; port: number }) => {
      if (this.#opt!.storyPath) {
        this.#watchStoryPath(this.#opt!.storyPath);
      }

      this.port = params.port;
      this.hostname = params.hostname;
      console.log(`Listen on ${this.hostname}:${this.port}`);
    };
    Deno.serve(
      { hostname: this.hostname, port: this.port, onListen },
      (r) => this.#handleRequest(r),
    );
  }

  async #handleRequest(request: Request) {
    try {
      console.log(`handle ${request.url}`);
      for (const { route, exec } of this.#routes) {
        const match = route.exec(request.url);
        if (match) {
          return await exec(match, request);
        }
      }
      if (this.#wsRoute.exec(request.url)) {
        return this.#handleWsRequest(request);
      }
      return new Response("", { status: 404 });
    } catch (err) {
      console.error("handleRequest error", err);
      return new Response("", { status: 500 });
    }
  }

  #handleWsRequest(request: Request) {
    if (request.headers.get("upgrade") != "websocket") {
      return new Response(null, { status: 501 });
    }
    const { socket, response } = Deno.upgradeWebSocket(request);
    socket.addEventListener("open", async () => {
      this.#sockets.add(socket);
      console.log(`a client connected! ${this.#sockets.size} clients`);
      if (this.#opt?.storyPath) {
        try {
          const pack = await getPack(this.#opt!);
          // console.log(JSON.stringify(pack, null, "  "));
          socket.send(
            JSON.stringify({ type: "fs-update", pack, newStoryPath: true }),
          );
          socket.send(JSON.stringify({ type: "opt", opt: this.#opt }));
        } catch (e) {
          console.error(e);
        }
      }
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
}

if (import.meta.main) {
  cliteRun(new StudioPackGeneratorGui());
}
