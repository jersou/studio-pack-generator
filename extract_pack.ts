#!/usr/bin/env -S deno run -A

import { BlobReader, BlobWriter, ZipReader } from "@zip-js/zip-js";
import { dirname } from "@std/path";
import type {
  ActionNode,
  Metadata,
  SerializedPack,
  StageNode,
} from "./serialize/serialize-types.ts";
import type { ModOptions } from "./types.ts";
import { Queue } from "./utils/queue.ts";

type StageType = "STORY" | "FOLDER" | "ITEM";
export class PackExtractor {
  packPath: string;
  outputPath: string;
  zipReader?: ZipReader;
  // deno-lint-ignore no-explicit-any
  entries: any[] = [];
  // deno-lint-ignore no-explicit-any
  storyEntry: any;
  story?: SerializedPack;
  entrypoint?: StageNode;
  stageMap = new Map<string, StageNode>();
  actionMap = new Map<string, ActionNode>();
  children: { [k: string]: string[] } = {};
  parents: { [k: string]: string } = {};
  assets: { key: string; path: string }[] = [];
  transitionCount = new Map<string, number>();
  nightAction?: string;
  questions = new Set<string>();
  constructor(opt: ModOptions) {
    this.packPath = opt.storyPath;
    this.outputPath = opt.outputFolder ?? opt.storyPath + "-extract";
  }
  async init() {
    this.zipReader = new ZipReader(
      new BlobReader(new Blob([await Deno.readFile(this.packPath)])),
      { useWebWorkers: false },
    );
    this.entries = await this.zipReader.getEntries();
    this.storyEntry = this.entries.find((e) => e.filename === "story.json")!;
    const blob = await this.storyEntry.getData(new BlobWriter());
    this.story = JSON.parse(await blob.text()) as SerializedPack;
    this.entrypoint = this.story.stageNodes.find((s) => s.squareOne)!;
    this.story.stageNodes.forEach((s) => this.stageMap.set(s.uuid, s));
    this.story.actionNodes.forEach((a) => this.actionMap.set(a.id, a));

    if (this.story.nightModeAvailable) {
      this.story.stageNodes.forEach((s) => {
        const dest = s.okTransition?.actionNode;
        if (dest) {
          this.transitionCount.set(
            dest,
            (this.transitionCount.get(dest) ?? 0) + 1,
          );
        }
      });
      let maxCount = 0;
      let maxId;

      for (const [id, count] of this.transitionCount.entries()) {
        if (count > maxCount) {
          maxCount = count;
          maxId = id;
        }
      }
      if (maxCount > 2) {
        this.nightAction = maxId;
      }
    }
  }

  getNodeType(uuid: string): StageType {
    const nodeChildren = this.children[uuid] ?? [];
    switch (nodeChildren.length) {
      case 0:
        return "STORY";
      case 1:
        return (this.children[nodeChildren[0]] ?? []).length > 0
          ? "FOLDER"
          : "ITEM";
      default:
        return "FOLDER";
    }
  }

  async extractPack() {
    await this.init();
    const toExplore = new Queue<string>();
    toExplore.enqueue(this.entrypoint!.uuid);
    const stagesSeen = new Set<string>();
    stagesSeen.add(this.entrypoint!.uuid);

    while (toExplore.size > 0) {
      const current = toExplore.dequeue()!;
      const stage = this.stageMap.get(current);
      const okActionId = stage?.okTransition?.actionNode;

      if (
        okActionId &&
        okActionId !== stage?.homeTransition?.actionNode &&
        this.nightAction !== okActionId
      ) {
        const action = this.actionMap.get(okActionId)!;
        for (const option of action.options) {
          if (!stagesSeen.has(option)) {
            toExplore.enqueue(option);
            if (!this.children[current]) {
              this.children[current] = [];
            }
            this.children[current].push(option);
            this.parents[option] = current;
          }
          stagesSeen.add(option);
        }
      }
    }
    console.log(this.children);
    this.explore(this.entrypoint!.uuid, "", 0);
    console.log({ assets: this.assets });
    await Deno.mkdir(this.outputPath, { recursive: true });
    for (const { key, path } of this.assets) {
      const entry = this.entries.find((e) => e.filename === `assets/${key}`)!;
      const blob = await entry.getData(new BlobWriter());
      const buffer = await blob.arrayBuffer();
      const filePath = `${this.outputPath}${path}`;
      const parentPath = dirname(filePath);
      await Deno.mkdir(parentPath, { recursive: true });
      await Deno.writeFile(filePath, new Uint8Array(buffer));
    }

    const thumbnailEntry = this.entries.find((e) =>
      e.filename === `thumbnail.png`
    );
    if (thumbnailEntry) {
      const blob = await thumbnailEntry.getData(new BlobWriter());
      const buffer = await blob.arrayBuffer();
      const filePath = `${this.outputPath}/thumbnail.png`;
      await Deno.writeFile(filePath, new Uint8Array(buffer));
    }
    const metadata: Metadata = {
      "title": this.story?.title ?? "",
      "description": this.story?.description ?? "",
      "format": this.story?.format ?? "",
      "version": this.story?.version ?? 0,
      "nightMode": !!this.story?.nightModeAvailable,
    };
    await Deno.writeTextFile(
      `${this.outputPath}/metadata.json`,
      JSON.stringify(metadata, null, "  "),
    );
  }

  addAsset(assetKey: string | null, folderPath: string, basename: string) {
    if (assetKey) {
      const ext = assetKey.split(".")[1]!;
      console.log(`→ ${folderPath}/${basename}.${ext}`);
      this.assets.push({
        key: assetKey,
        path: `${folderPath}/${basename}.${ext}`,
      });
    }
  }

  // TODO refactor
  explore(
    uuid: string,
    parentPath: string,
    index: number,
  ) {
    const nodeChildren = this.children[uuid] ?? [];
    const isQuestion = this.questions.has(uuid);
    let createQuestion = false;

    let folderPath = "";
    let type: StageType;
    if (isQuestion) {
      folderPath = parentPath + "/Question";
      type = "FOLDER";
    } else {
      type = this.getNodeType(uuid);
      const stage = this.stageMap.get(uuid)!;
      const parent = this.stageMap.get(this.parents[uuid]);
      const parentActionNode = this.actionMap.get(
        parent?.okTransition?.actionNode || "",
      );
      createQuestion = stage.squareOne ||
        ((parentActionNode?.options.length ?? 1) > 1);
      const prefix = index ? (index.toString().padStart(3, "0") + " - ") : "";
      let name;
      if (type === "ITEM") {
        // use child stage name
        name = this.stageMap.get(nodeChildren[0])?.name ?? "stage";
      } else {
        name = stage.name;
      }

      name = name.startsWith(prefix) ? name : prefix + name;
      const res = /^(.*)(\.[^. ]+ (item|Stage node))/.exec(name);
      name = res?.[1] ?? name;
      if (uuid === this.entrypoint?.uuid) {
        folderPath = parentPath;
      } else {
        folderPath = parentPath + (type === "FOLDER" ? "/" + name : "");
      }

      switch (type) {
        case "FOLDER":
          this.addAsset(stage.audio, folderPath, `0-item`);
          this.addAsset(stage.image, folderPath, `0-item`);
          break;
        case "ITEM":
          this.addAsset(stage.audio, folderPath, `${name}.item`);
          this.addAsset(stage.image, folderPath, `${name}.item`);
          break;
        case "STORY":
          this.addAsset(stage.audio, folderPath, name);
          this.addAsset(stage.image, folderPath, name);
          break;
      }
    }

    if (createQuestion && nodeChildren.length > 1) {
      const questionUuid = crypto.randomUUID();
      this.questions.add(questionUuid);
      this.children[questionUuid] = nodeChildren;
      this.children[uuid] = [questionUuid];
      this.explore(questionUuid, folderPath, 0);
    } else {
      nodeChildren.forEach((child, i) => {
        const newIndex = type === "ITEM"
          ? index
          : (nodeChildren.length > 1 ? i + 1 : 0);
        this.explore(child, folderPath, newIndex);
      });
    }
  }
}

if (import.meta.main) {
  // await extractPack({ storyPath: "test_data/zip/2-full.zip" } as ModOptions);
  const opt = {
    storyPath: Deno.args[0] ??
      "test_data/zip/2-full.zip",
  } as ModOptions;
  await (new PackExtractor(opt).extractPack());
}
