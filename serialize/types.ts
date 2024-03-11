export type Folder = {
  name: string;
  files: (Folder | File)[];
};
export type File = {
  name: string;
  sha1: string;
};

export type Pack = {
  title: string;
  description: string;
  format: string;
  version: number;
  nightModeAvailable: boolean;
  entrypoint: Entrypoint;
};

export type Entrypoint = Omit<Menu, "class"> & {
  class: "StageNode-Entrypoint";
};
export type Menu = {
  class: "StageNode-Menu";
  audio: string | null;
  image: string | null;
  name: string;
  okTransition: Action;
};

export type StoryItem = Omit<Menu, "class" | "okTransition"> & {
  class: "StageNode-StoryItem";
  okTransition: StoryAction;
};

export type Action = {
  class: "ActionNode";
  name: string;
  options: (Menu | ZipMenu | StoryItem | Story)[];
};
export type StoryAction = {
  class: "ActionNode";
  name: string;
  options: [Story];
};

export type Story = {
  class: "StageNode-Story";
  audio: string;
  image: null;
  name: string;
  okTransition: null;
};

export type StageNode = {
  uuid: string;
  squareOne: boolean;
  type: string;
  name: string;
  homeTransition: { actionNode: string; optionIndex: number } | null;
  audio: string | null;
  image: string | null;
  controlSettings: {
    autoplay: boolean;
    home: boolean;
    pause: boolean;
    wheel: boolean;
    ok: boolean;
  };
  position: { x: 0; y: 0 };
  okTransition: null | {
    actionNode: string;
    optionIndex: number;
  };
};
export type ActionNode = {
  id: string;
  name: string;
  options: string[];
  position: { x: 0; y: 0 };
};

export type SerializedPack = {
  title: string;
  description: string;
  format: string;
  version: number;
  nightModeAvailable: boolean;
  actionNodes: ActionNode[];
  stageNodes: StageNode[];
  zipPaths?: string[];
};

export type ZipMenu = {
  class: "ZipMenu";
  path: string;
};

export type Metadata = {
  title?: string;
  description?: string;
  format?: string;
  version?: number;
  nightModeAvailable?: boolean;
};
