import type {
  Action,
  ActionNode,
  Entrypoint,
  Menu,
  Pack,
  SerializedPack,
  StageNode,
  Story,
  StoryAction,
  StoryItem,
  ZipMenu,
} from "./serialize-types.ts";
import { BlobReader, BlobWriter, ZipReader } from "@zip-js/zip-js";

import type { ModOptions } from "../types.ts";

type SerializePackOption = {
  autoNextStoryTransition?: boolean;
  nightModeAudioItemName?: string | null;
};
type Groups = { [key: string]: { stage: string; action: string }[] };
type Entry = {
  // deno-lint-ignore no-explicit-any
  getData: (writer: BlobWriter) => Promise<any>;
};

export async function serializePack(
  pack: Pack,
  opt: ModOptions,
  serializePackOption?: SerializePackOption,
): Promise<SerializedPack> {
  const serialized: SerializedPack = {
    title: pack.title,
    version: pack.version,
    description: pack.description,
    format: pack.format,
    nightModeAvailable: pack.nightModeAvailable,
    actionNodes: [],
    stageNodes: [],
  };
  const nightActionId = pack.nightModeAvailable ? crypto.randomUUID() : "";

  const groups: Groups = {};
  await exploreStageNode(
    pack.entrypoint,
    serialized,
    undefined,
    [],
    [],
    groups,
    opt.storyPath,
    nightActionId,
    opt,
  );
  const firstActionId =
    serialized.stageNodes.find((s) => s.squareOne)?.okTransition?.actionNode ||
    "";

  serialized.actionNodes = serialized.actionNodes.reverse();
  serialized.stageNodes = serialized.stageNodes.reverse();

  if (nightActionId) {
    const nightStageNodeId = crypto.randomUUID();
    const nightAction: ActionNode = {
      id: nightActionId,
      name: "nightAction",
      options: [nightStageNodeId],
      position: { x: 0, y: 0 },
    };
    serialized.actionNodes.push(nightAction);
    const nightStage: StageNode = {
      image: null,
      audio: serializePackOption?.nightModeAudioItemName || null,
      controlSettings: {
        autoplay: true,
        home: true,
        ok: true,
        pause: false,
        wheel: false,
      },
      name: "nightStage",
      type: "stage",
      uuid: nightStageNodeId,
      homeTransition: { actionNode: firstActionId, optionIndex: 0 },
      okTransition: { actionNode: firstActionId, optionIndex: 0 },
      position: { x: 0, y: 0 },
      squareOne: false,
    };
    serialized.stageNodes.push(nightStage);
  }

  if (serializePackOption?.autoNextStoryTransition) {
    for (const menuId of Object.keys(groups)) {
      const group = groups[menuId];
      for (let i = 1; i < group.length; i++) {
        const stageId = group[i - 1].stage;
        const actionId = group[i].action;
        const stage = serialized.stageNodes.find((e) => e.uuid === stageId);
        if (stage) {
          stage.okTransition = {
            actionNode: actionId,
            optionIndex: 0,
          };
        }
      }
    }
  }
  return serialized;
}

type ActionHistory = {
  id: string;
  optionIndex: number;
  size: number;
};

function getControlSettings(
  stageNode: Menu | Entrypoint | StoryItem | Story,
  parent: Action | undefined,
) {
  switch (stageNode.class) {
    case "StageNode-Entrypoint":
      return {
        autoplay: false,
        home: false,
        ok: true,
        pause: false,
        wheel: true,
      };
    case "StageNode-Menu":
      return {
        autoplay: !!parent?.options && parent?.options.length === 1,
        home: true,
        ok: true,
        pause: false,
        wheel: !!parent?.options && parent?.options.length > 1,
      };
    case "StageNode-StoryItem":
      return {
        autoplay: false,
        home: true,
        ok: true,
        pause: false,
        wheel: true,
      };
    case "StageNode-Story":
      return {
        autoplay: false,
        home: true,
        ok: false,
        pause: true,
        wheel: false,
      };
  }
}

async function exploreStageNode(
  stageNode: Menu | Entrypoint | StoryItem | Story,
  serialized: SerializedPack,
  parent: Action | undefined,
  actionHistory: ActionHistory[],
  parentIDs: string[],
  groups: Groups,
  storyPath: string,
  nightActionId: string,
  opt: ModOptions,
) {
  const uuid = crypto.randomUUID();
  if (stageNode.class === "StageNode-Story") {
    const menu = parentIDs[parentIDs.length - 3];
    if (!groups[menu]) {
      groups[menu] = [];
    }
    groups[menu].push({ stage: uuid, action: parentIDs[parentIDs.length - 1] });
  }

  let homeTransitionRelativeIndex: number;

  switch (stageNode.class) {
    case "StageNode-StoryItem":
      homeTransitionRelativeIndex = actionHistory.length >= 4
        ? 4
        : actionHistory.length >= 2
        ? 2
        : -1;
      break;

    case "StageNode-Menu":
      homeTransitionRelativeIndex = actionHistory.length >= 3 ? 3 : -1;
      break;

    default:
      homeTransitionRelativeIndex = actionHistory.length >= 2 ? 2 : -1;
  }
  const homeTransition = homeTransitionRelativeIndex === -1 ? null : {
    actionNode:
      actionHistory[actionHistory.length - homeTransitionRelativeIndex].id,
    optionIndex:
      actionHistory[actionHistory.length - homeTransitionRelativeIndex]
        .optionIndex,
  };

  const serializedStageNode: StageNode = {
    audio: stageNode.audio,
    controlSettings: getControlSettings(stageNode, parent),
    homeTransition,
    image: stageNode.image,
    name: stageNode.name,
    okTransition: stageNode.okTransition
      ? {
        actionNode: await exploreActionNode(
          stageNode.okTransition,
          serialized,
          actionHistory,
          [...parentIDs, uuid],
          groups,
          storyPath,
          nightActionId,
          opt,
        ),
        optionIndex: 0,
      }
      : null,
    position: { x: 0, y: 0 },
    squareOne: stageNode.class === "StageNode-Entrypoint",
    type: "stage",
    uuid,
  };
  if (((stageNode as Story).duration !== undefined)) {
    serializedStageNode.duration = (stageNode as Story).duration;
  }
  if (opt.rssEpisodeNumbers && ((stageNode as Story).episode !== undefined)) {
    serializedStageNode.episode = (stageNode as Story).episode;
  }
  if (
    serializedStageNode.okTransition === null &&
    stageNode.class === "StageNode-Story" &&
    actionHistory.length > 1
  ) {
    if (nightActionId) {
      serializedStageNode.okTransition = {
        actionNode: nightActionId,
        optionIndex: 0,
      };
    } else {
      const parentAction = actionHistory[actionHistory.length - 2];
      serializedStageNode.okTransition = {
        actionNode: parentAction.id,
        optionIndex: opt.selectNextStoryAtEnd
          ? (parentAction.optionIndex + 1) % parentAction.size
          : parentAction.optionIndex,
      };
    }
    serializedStageNode.controlSettings.autoplay = true;
  }

  serialized.stageNodes.push(serializedStageNode);
  return uuid;
}

async function exploreZipMenu(
  zipMenu: ZipMenu,
  serialized: SerializedPack,
  actionHistory: ActionHistory[],
  storyPath: string,
) {
  if (!serialized.zipPaths) {
    serialized.zipPaths = [];
  }
  serialized.zipPaths.push(zipMenu.path);

  const zipReader = new ZipReader(
    new BlobReader(
      new Blob([await Deno.readFile(`${storyPath}/${zipMenu.path}`)]),
    ),
    { useWebWorkers: false },
  );

  const entries = await zipReader.getEntries() as Entry[];
  const storyEntry = entries.find(
    // deno-lint-ignore no-explicit-any
    (entry: any) => entry.filename === "story.json",
  );

  if (!storyEntry) {
    console.error(
      `The zip file '${storyPath}/${zipMenu.path}' is not Studio pack zip !`,
    );
    Deno.exit(6);
  }

  const blobWriter = new BlobWriter("application/json");
  const blob = await storyEntry.getData(blobWriter);
  const storyTxt: string = await blob.text();

  await zipReader.close();

  // deno-lint-ignore no-explicit-any
  const story: any = JSON.parse(storyTxt);

  const entrypoint = story.stageNodes.find(
    // deno-lint-ignore no-explicit-any
    (stageNode: any) => stageNode.squareOne === true,
  );
  entrypoint.squareOne = false;
  entrypoint.type = "stage";
  entrypoint.homeTransition = actionHistory.length > 1
    ? {
      actionNode: actionHistory[actionHistory.length - 2].id,
      optionIndex: actionHistory[actionHistory.length - 2].optionIndex,
    }
    : null;
  if (!entrypoint.controlSettings) {
    entrypoint.controlSettings = {};
  }
  entrypoint.controlSettings.home = true;

  const entrypointActionNodeUuid = entrypoint.okTransition.actionNode;
  if (entrypointActionNodeUuid && actionHistory.length > 0) {
    const entrypointActionNode = story.actionNodes.find(
      // deno-lint-ignore no-explicit-any
      (actionNode: any) => actionNode.id === entrypointActionNodeUuid,
    );

    for (const option of entrypointActionNode.options) {
      // deno-lint-ignore no-explicit-any
      const stage = story.stageNodes.find((s: any) => s.uuid === option);
      if (!stage.controlSettings) {
        stage.controlSettings = {};
      }
      stage.controlSettings.homeTransition = true;
      stage.homeTransition = {
        actionNode: actionHistory[actionHistory.length - 1].id,
        optionIndex: actionHistory[actionHistory.length - 1].optionIndex,
      };
    }
  }

  serialized.actionNodes.push(...story.actionNodes);
  serialized.stageNodes.push(...story.stageNodes);
  return entrypoint.uuid;
}

async function exploreActionNode(
  actionNode: Action | StoryAction,
  serialized: SerializedPack,
  actionHistory: ActionHistory[],
  parentIDs: string[],
  groups: Groups,
  storyPath: string,
  nightActionId: string,
  opt: ModOptions,
) {
  const id = crypto.randomUUID();

  const options: string[] = [];

  for (const stageNode of actionNode.options) {
    {
      const histo = [...actionHistory, {
        id,
        optionIndex: options.length,
        size: actionNode.options.length,
      }];
      if (stageNode.class == "ZipMenu") {
        options.push(
          await exploreZipMenu(stageNode, serialized, histo, storyPath),
        );
      } else {
        options.push(
          await exploreStageNode(
            stageNode,
            serialized,
            actionNode,
            histo,
            [...parentIDs, id],
            groups,
            storyPath,
            nightActionId,
            opt,
          ),
        );
      }
    }
  }

  const serializedActionNode: ActionNode = {
    id,
    name: actionNode.name,
    options,
    position: { x: 0, y: 0 },
  };

  serialized.actionNodes.push(serializedActionNode);
  return id;
}
