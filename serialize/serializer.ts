import {
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
} from "./types.ts";

type serializePackOption = {
  autoNextStoryTransition?: boolean;
};
type Groups = { [key: string]: { stage: string; action: string }[] };

export function serializePack(
  pack: Pack,
  opt?: serializePackOption,
): SerializedPack {
  const serialized: SerializedPack = {
    title: pack.title,
    version: pack.version,
    description: pack.description,
    format: pack.format,
    nightModeAvailable: pack.nightModeAvailable,
    actionNodes: [],
    stageNodes: [],
  };
  const groups: Groups = {};
  exploreStageNode(pack.entrypoint, serialized, undefined, [], [], groups);
  serialized.actionNodes = serialized.actionNodes.reverse();
  serialized.stageNodes = serialized.stageNodes.reverse();

  if (opt?.autoNextStoryTransition) {
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

function exploreStageNode(
  stageNode: Menu | Entrypoint | StoryItem | Story,
  serialized: SerializedPack,
  parent: Action | undefined,
  actionHistory: ActionHistory[],
  parentIDs: string[],
  groups: Groups,
) {
  const uuid = crypto.randomUUID();
  if (stageNode.class === "StageNode-Story") {
    const menu = parentIDs[parentIDs.length - 3];
    if (!groups[menu]) {
      groups[menu] = [];
    }
    groups[menu].push({ stage: uuid, action: parentIDs[parentIDs.length - 1] });
  }
  const serializedStageNode: StageNode = {
    audio: stageNode.audio,
    controlSettings: getControlSettings(stageNode, parent),
    homeTransition: actionHistory.length > 1
      ? {
        actionNode: actionHistory[actionHistory.length - 2].id,
        optionIndex: actionHistory[actionHistory.length - 2].optionIndex,
      }
      : null,
    image: stageNode.image,
    name: stageNode.name,
    okTransition: stageNode.okTransition
      ? {
        actionNode: exploreActionNode(
          stageNode.okTransition,
          serialized,
          actionHistory,
          [...parentIDs, uuid],
          groups,
        ),
        optionIndex: 0,
      }
      : null,
    position: { x: 0, y: 0 },
    squareOne: stageNode.class === "StageNode-Entrypoint",
    type: stageNode.class === "StageNode-Entrypoint" ? "cover" : "stage",
    uuid,
  };

  if (
    serializedStageNode.okTransition === null &&
    stageNode.class === "StageNode-Story" &&
    actionHistory.length > 1
  ) {
    serializedStageNode.okTransition = {
      actionNode: actionHistory[actionHistory.length - 2].id,
      optionIndex: actionHistory[actionHistory.length - 2].optionIndex,
    };
    serializedStageNode.controlSettings.autoplay = true;
  }

  serialized.stageNodes.push(serializedStageNode);
  return uuid;
}

function exploreActionNode(
  actionNode: Action | StoryAction,
  serialized: SerializedPack,
  actionHistory: ActionHistory[],
  parentIDs: string[],
  groups: Groups,
) {
  const id = crypto.randomUUID();
  const serializedActionNode: ActionNode = {
    id,
    name: actionNode.name,
    options: actionNode.options.map((stageNode, optionIndex) =>
      exploreStageNode(
        stageNode,
        serialized,
        actionNode,
        [
          ...actionHistory,
          {
            id,
            optionIndex,
          },
        ],
        [...parentIDs, id],
        groups,
      )
    ),
    position: { x: 0, y: 0 },
  };

  serialized.actionNodes.push(serializedActionNode);
  return id;
}
