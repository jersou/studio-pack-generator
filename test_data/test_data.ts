import { Folder, Pack, SerializedPack } from "../serialize/types.ts";

export const minFs: Folder = {
  name: "0-min",
  files: [
    { name: "0-item.ogg", sha1: "1a23e1732632e8bbcb7607a92edd3c3ec3c3357a" },
    { name: "0-item.png", sha1: "5f667e756ba42748a9eea3b0a217579bee960164" },
    {
      name: "alice-city.ogg",
      sha1: "46fe70d98b9763ab70b7e7cea4627e4f8b7c585a",
    },
  ],
};
export const minFsWithoutSha = {
  files: [
    {
      name: "0-item.ogg",
      sha1: "",
    },
    {
      name: "0-item.png",
      sha1: "",
    },
    {
      name: "alice-city.ogg",
      sha1: "",
    },
  ],
  name: "0-min",
};

export const expectedMinPack: Pack = {
  title: "0-min",
  description: "",
  format: "v1",
  version: 1,
  nightModeAvailable: false,
  entrypoint: {
    class: "StageNode-Entrypoint",
    name: "Cover node",
    audio: "1a23e1732632e8bbcb7607a92edd3c3ec3c3357a.ogg",
    image: "5f667e756ba42748a9eea3b0a217579bee960164.png",
    okTransition: {
      class: "ActionNode",
      name: "Action node",
      options: [
        {
          class: "StageNode-Story",
          audio: "46fe70d98b9763ab70b7e7cea4627e4f8b7c585a.ogg",
          image: null,
          name: "alice-city.ogg Stage node",
          okTransition: null,
        },
      ],
    },
  },
};

export const expectedMinPackSerialized = {
  title: "0-min",
  description: "",
  format: "v1",
  version: 1,
  nightModeAvailable: false,
  actionNodes: [
    {
      id: "97a4cfcc-d1eb-449f-8ce7-3c54e676b2b2",
      name: "Action node",
      options: ["a6be50af-ae71-4cd3-be6d-ff1372a6236b"],
      position: {
        x: 0,
        y: 0,
      },
    },
  ],
  stageNodes: [
    {
      audio: "1a23e1732632e8bbcb7607a92edd3c3ec3c3357a.ogg",
      controlSettings: {
        autoplay: false,
        home: false,
        ok: true,
        pause: false,
        wheel: true,
      },
      homeTransition: null,
      image: "5f667e756ba42748a9eea3b0a217579bee960164.png",
      name: "Cover node",
      okTransition: {
        actionNode: "97a4cfcc-d1eb-449f-8ce7-3c54e676b2b2",
        optionIndex: 0,
      },
      position: {
        x: 0,
        y: 0,
      },
      squareOne: true,
      type: "cover",
      uuid: "09e8e5fb-5a8c-4686-819a-cd993f5fd597",
    },
    {
      audio: "46fe70d98b9763ab70b7e7cea4627e4f8b7c585a.ogg",
      controlSettings: {
        autoplay: false,
        home: true,
        ok: false,
        pause: true,
        wheel: false,
      },
      homeTransition: null,
      image: null,
      name: "alice-city.ogg Stage node",
      okTransition: null,
      position: {
        x: 0,
        y: 0,
      },
      squareOne: false,
      type: "stage",
      uuid: "a6be50af-ae71-4cd3-be6d-ff1372a6236b",
    },
  ],
};

export const moyFs: Folder = {
  name: "1-moy",
  files: [
    { name: "0-item.ogg", sha1: "1a23e1732632e8bbcb7607a92edd3c3ec3c3357a" },
    { name: "0-item.png", sha1: "5f667e756ba42748a9eea3b0a217579bee960164" },
    {
      name: "Choose a place",
      files: [
        {
          name: "0-item.ogg",
          sha1: "95617b401ff08d2e981ac1f10d8c9dd862f5c203",
        },
        {
          name: "city.item.ogg",
          sha1: "5e6cb53d9acef28a6f57edf317c31bda673d64ed",
        },
        {
          name: "city.item.png",
          sha1: "5e36825dd492cd428ec8408f55f8dddfe6a1248a",
        },
        {
          name: "city.ogg",
          sha1: "46fe70d98b9763ab70b7e7cea4627e4f8b7c585a",
        },
        {
          name: "alice-jungle.item.ogg",
          sha1: "78adc1006ff121cbf1c7052a02be47c398aecd78",
        },
        {
          name: "alice-jungle.item.png",
          sha1: "da5e7052795b59001f09e2caf27412ef8212f23f",
        },
        {
          name: "alice-jungle.ogg",
          sha1: "f493d4e986a1278ca7db3f7c65bf8ee32535b2e4",
        },
      ],
    },
  ],
};
export const moyFolder: Folder = {
  name: "1-moy",
  files: [
    { name: "0-item.ogg", sha1: "95617b401ff08d2e981ac1f10d8c9dd862f5c203" },
    {
      name: "city.item.ogg",
      sha1: "5e6cb53d9acef28a6f57edf317c31bda673d64ed",
    },
    {
      name: "city.item.png",
      sha1: "5e36825dd492cd428ec8408f55f8dddfe6a1248a",
    },
    {
      name: "city.ogg",
      sha1: "46fe70d98b9763ab70b7e7cea4627e4f8b7c585a",
    },
    {
      name: "alice-jungle.item.ogg",
      sha1: "78adc1006ff121cbf1c7052a02be47c398aecd78",
    },
    {
      name: "alice-jungle.item.png",
      sha1: "da5e7052795b59001f09e2caf27412ef8212f23f",
    },
    {
      name: "alice-jungle.ogg",
      sha1: "f493d4e986a1278ca7db3f7c65bf8ee32535b2e4",
    },
  ],
};

export const aliceCityStory = {
  name: "city.ogg",
  sha1: "46fe70d98b9763ab70b7e7cea4627e4f8b7c585a",
};
export const aliceJungleStory = {
  name: "alice-jungle.ogg",
  sha1: "f493d4e986a1278ca7db3f7c65bf8ee32535b2e4",
};
export const emptyFolder = { name: "", files: [] };
export const expectedMoyPack: Pack = {
  title: "1-moy",
  description: "",
  format: "v1",
  version: 1,
  nightModeAvailable: false,
  entrypoint: {
    class: "StageNode-Entrypoint",
    name: "Cover node",
    audio: "1a23e1732632e8bbcb7607a92edd3c3ec3c3357a.ogg",
    image: "5f667e756ba42748a9eea3b0a217579bee960164.png",
    okTransition: {
      class: "ActionNode",
      name: "Action node",
      options: [
        {
          class: "StageNode-Menu",
          name: "Choose a place",
          image: null,
          audio: "95617b401ff08d2e981ac1f10d8c9dd862f5c203.ogg",
          okTransition: {
            name: "Choose a place ActionNode",
            class: "ActionNode",
            options: [
              {
                class: "StageNode-StoryItem",
                name: "city.ogg item",
                audio: "5e6cb53d9acef28a6f57edf317c31bda673d64ed.ogg",
                image: "5e36825dd492cd428ec8408f55f8dddfe6a1248a.png",
                okTransition: {
                  name: "city.ogg ActionNode",
                  class: "ActionNode",
                  options: [
                    {
                      class: "StageNode-Story",
                      audio: "46fe70d98b9763ab70b7e7cea4627e4f8b7c585a.ogg",
                      image: null,
                      name: "city.ogg Stage node",
                      okTransition: null,
                    },
                  ],
                },
              },
              {
                class: "StageNode-StoryItem",
                name: "alice-jungle.ogg item",
                audio: "78adc1006ff121cbf1c7052a02be47c398aecd78.ogg",
                image: "da5e7052795b59001f09e2caf27412ef8212f23f.png",
                okTransition: {
                  name: "alice-jungle.ogg ActionNode",
                  class: "ActionNode",
                  options: [
                    {
                      class: "StageNode-Story",
                      name: "alice-jungle.ogg Stage node",
                      audio: "f493d4e986a1278ca7db3f7c65bf8ee32535b2e4.ogg",
                      image: null,
                      okTransition: null,
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
};

export const expectedMoyPackSerialized = {
  title: "1-moy",
  version: 1,
  description: "",
  format: "v1",
  nightModeAvailable: false,
  actionNodes: [
    {
      id: "5ec8ae83-7afd-44c4-8dd8-2cb1974ef14d",
      name: "Action node",
      options: ["822bbfd7-7b9e-4344-9c4d-b8ae005ebdab"],
      position: {
        x: 0,
        y: 0,
      },
    },
    {
      id: "23189e83-5f4a-41e5-8f2c-0ce25a1f5b2c",
      name: "Choose a place ActionNode",
      options: [
        "97bb8423-dfba-4bf3-b7e3-4555c99e6bed",
        "5ab4fedf-081e-43ff-bfe1-b81bb3a893a8",
      ],
      position: {
        x: 0,
        y: 0,
      },
    },
    {
      id: "5b00e9fc-ae5e-465d-908f-8020aba093b4",
      name: "alice-jungle.ogg ActionNode",
      options: ["76e84dff-e0a4-4d8e-94a2-3872c84b9510"],
      position: {
        x: 0,
        y: 0,
      },
    },
    {
      id: "5697dee5-155c-485f-9032-fe99eee6c407",
      name: "city.ogg ActionNode",
      options: ["e8b2d354-055a-464a-80d8-9885a06f4ae2"],
      position: {
        x: 0,
        y: 0,
      },
    },
  ],
  stageNodes: [
    {
      audio: "1a23e1732632e8bbcb7607a92edd3c3ec3c3357a.ogg",
      controlSettings: {
        autoplay: false,
        home: false,
        ok: true,
        pause: false,
        wheel: true,
      },
      homeTransition: null,
      image: "5f667e756ba42748a9eea3b0a217579bee960164.png",
      name: "Cover node",
      okTransition: {
        actionNode: "5ec8ae83-7afd-44c4-8dd8-2cb1974ef14d",
        optionIndex: 0,
      },
      position: {
        x: 0,
        y: 0,
      },
      squareOne: true,
      type: "cover",
      uuid: "1b280bb1-858e-499f-b093-02259d939881",
    },
    {
      audio: "95617b401ff08d2e981ac1f10d8c9dd862f5c203.ogg",
      controlSettings: {
        autoplay: true,
        home: true,
        ok: true,
        pause: false,
        wheel: false,
      },
      homeTransition: null,
      image: null,
      name: "Choose a place",
      okTransition: {
        actionNode: "23189e83-5f4a-41e5-8f2c-0ce25a1f5b2c",
        optionIndex: 0,
      },
      position: {
        x: 0,
        y: 0,
      },
      squareOne: false,
      type: "stage",
      uuid: "822bbfd7-7b9e-4344-9c4d-b8ae005ebdab",
    },
    {
      audio: "78adc1006ff121cbf1c7052a02be47c398aecd78.ogg",
      controlSettings: {
        autoplay: false,
        home: true,
        ok: true,
        pause: false,
        wheel: true,
      },
      homeTransition: {
        actionNode: "ID",
        optionIndex: 0,
      },
      image: "da5e7052795b59001f09e2caf27412ef8212f23f.png",
      name: "alice-jungle.ogg item",
      okTransition: {
        actionNode: "5b00e9fc-ae5e-465d-908f-8020aba093b4",
        optionIndex: 0,
      },
      position: {
        x: 0,
        y: 0,
      },
      squareOne: false,
      type: "stage",
      uuid: "5ab4fedf-081e-43ff-bfe1-b81bb3a893a8",
    },
    {
      audio: "f493d4e986a1278ca7db3f7c65bf8ee32535b2e4.ogg",
      controlSettings: {
        autoplay: true,
        home: true,
        ok: false,
        pause: true,
        wheel: false,
      },
      homeTransition: {
        actionNode: "23189e83-5f4a-41e5-8f2c-0ce25a1f5b2c",
        optionIndex: 1,
      },
      image: null,
      name: "alice-jungle.ogg Stage node",
      okTransition: {
        actionNode: "ID",
        optionIndex: 1,
      },
      position: {
        x: 0,
        y: 0,
      },
      squareOne: false,
      type: "stage",
      uuid: "76e84dff-e0a4-4d8e-94a2-3872c84b9510",
    },
    {
      audio: "5e6cb53d9acef28a6f57edf317c31bda673d64ed.ogg",
      controlSettings: {
        autoplay: false,
        home: true,
        ok: true,
        pause: false,
        wheel: true,
      },
      homeTransition: {
        actionNode: "ID",
        optionIndex: 0,
      },
      image: "5e36825dd492cd428ec8408f55f8dddfe6a1248a.png",
      name: "city.ogg item",
      okTransition: {
        actionNode: "5697dee5-155c-485f-9032-fe99eee6c407",
        optionIndex: 0,
      },
      position: {
        x: 0,
        y: 0,
      },
      squareOne: false,
      type: "stage",
      uuid: "97bb8423-dfba-4bf3-b7e3-4555c99e6bed",
    },
    {
      audio: "46fe70d98b9763ab70b7e7cea4627e4f8b7c585a.ogg",
      controlSettings: {
        autoplay: true,
        home: true,
        ok: false,
        pause: true,
        wheel: false,
      },
      homeTransition: {
        actionNode: "23189e83-5f4a-41e5-8f2c-0ce25a1f5b2c",
        optionIndex: 0,
      },
      image: null,
      name: "city.ogg Stage node",
      okTransition: {
        actionNode: "ID",
        optionIndex: 0,
      },
      position: {
        x: 0,
        y: 0,
      },
      squareOne: false,
      type: "stage",
      uuid: "e8b2d354-055a-464a-80d8-9885a06f4ae2",
    },
  ],
};

export const fullFs: Folder = {
  name: "2-full",
  files: [
    { name: "0-item.ogg", sha1: "1a23e1732632e8bbcb7607a92edd3c3ec3c3357a" },
    { name: "0-item.png", sha1: "5f667e756ba42748a9eea3b0a217579bee960164" },
    {
      name: "Choose a character",
      files: [
        {
          name: "0-item.ogg",
          sha1: "53018173b8245b5d03d729da410daed6d3fd3570",
        },
        {
          name: "Alice",
          files: [
            {
              name: "0-item.ogg",
              sha1: "6ef0a88a7b823fc81a85d448c971821d3570e606",
            },
            {
              name: "0-item.png",
              sha1: "c68e4b1028b3c93e434506e6a0203e5edbaed43b",
            },
            {
              name: "Choose a place",
              files: [
                {
                  name: "0-item.ogg",
                  sha1: "95617b401ff08d2e981ac1f10d8c9dd862f5c203",
                },
                {
                  name: "city.item.ogg",
                  sha1: "5e6cb53d9acef28a6f57edf317c31bda673d64ed",
                },
                {
                  name: "city.item.png",
                  sha1: "5e36825dd492cd428ec8408f55f8dddfe6a1248a",
                },
                {
                  name: "city.ogg",
                  sha1: "46fe70d98b9763ab70b7e7cea4627e4f8b7c585a",
                },
                {
                  name: "alice-jungle.item.ogg",
                  sha1: "78adc1006ff121cbf1c7052a02be47c398aecd78",
                },
                {
                  name: "alice-jungle.item.png",
                  sha1: "da5e7052795b59001f09e2caf27412ef8212f23f",
                },
                {
                  name: "alice-jungle.ogg",
                  sha1: "f493d4e986a1278ca7db3f7c65bf8ee32535b2e4",
                },
              ],
            },
          ],
        },
        {
          name: "Bob",
          files: [
            {
              name: "0-item.ogg",
              sha1: "f8932ae73324764b45bb7a3e1e92f4fabde3c2f8",
            },
            {
              name: "0-item.png",
              sha1: "4977589ba6e6d131a500309d3f8ee84c66b615f1",
            },
            {
              name: "Choose a place",
              files: [
                {
                  name: "0-item.ogg",
                  sha1: "95617b401ff08d2e981ac1f10d8c9dd862f5c203",
                },
                {
                  name: "bob-city.item.ogg",
                  sha1: "e260fd4baef8d32d1cb598355ca691e5fe401bc8",
                },
                {
                  name: "bob-city.item.png",
                  sha1: "95daa0dc90c3f15300edb39c807e9c9d6acff3f6",
                },
                {
                  name: "bob-city.ogg",
                  sha1: "90304af3b9d81fb1590ad367df796e791ea78750",
                },
                {
                  name: "jungle.item.ogg",
                  sha1: "78adc1006ff121cbf1c7052a02be47c398aecd78",
                },
                {
                  name: "jungle.item.png",
                  sha1: "da5e7052795b59001f09e2caf27412ef8212f23f",
                },
                {
                  name: "jungle.ogg",
                  sha1: "084c25abd45f62e50aed566e74ae3317bf844d6c",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const expectedFullPack: Pack = {
  title: "2-full",
  description: "",
  format: "v1",
  version: 1,
  nightModeAvailable: false,
  entrypoint: {
    class: "StageNode-Entrypoint",
    name: "Cover node",
    image: "5f667e756ba42748a9eea3b0a217579bee960164.png",
    audio: "1a23e1732632e8bbcb7607a92edd3c3ec3c3357a.ogg",
    okTransition: {
      class: "ActionNode",
      name: "Action node",
      options: [
        {
          class: "StageNode-Menu",
          image: null,
          audio: "53018173b8245b5d03d729da410daed6d3fd3570.ogg",
          name: "Choose a character",
          okTransition: {
            class: "ActionNode",
            name: "Choose a character ActionNode",
            options: [
              {
                class: "StageNode-Menu",
                image: "c68e4b1028b3c93e434506e6a0203e5edbaed43b.png",
                audio: "6ef0a88a7b823fc81a85d448c971821d3570e606.ogg",
                name: "Alice",
                okTransition: {
                  class: "ActionNode",
                  name: "Alice ActionNode",
                  options: [
                    {
                      class: "StageNode-Menu",
                      image: null,
                      audio: "95617b401ff08d2e981ac1f10d8c9dd862f5c203.ogg",
                      name: "Choose a place",
                      okTransition: {
                        class: "ActionNode",
                        name: "Choose a place ActionNode",
                        options: [
                          {
                            class: "StageNode-StoryItem",
                            name: "city.ogg item",
                            audio:
                              "5e6cb53d9acef28a6f57edf317c31bda673d64ed.ogg",
                            image:
                              "5e36825dd492cd428ec8408f55f8dddfe6a1248a.png",
                            okTransition: {
                              name: "city.ogg ActionNode",
                              class: "ActionNode",
                              options: [
                                {
                                  class: "StageNode-Story",
                                  audio:
                                    "46fe70d98b9763ab70b7e7cea4627e4f8b7c585a.ogg",
                                  image: null,
                                  name: "city.ogg Stage node",
                                  okTransition: null,
                                },
                              ],
                            },
                          },
                          {
                            class: "StageNode-StoryItem",
                            name: "alice-jungle.ogg item",
                            audio:
                              "78adc1006ff121cbf1c7052a02be47c398aecd78.ogg",
                            image:
                              "da5e7052795b59001f09e2caf27412ef8212f23f.png",
                            okTransition: {
                              name: "alice-jungle.ogg ActionNode",
                              class: "ActionNode",
                              options: [
                                {
                                  class: "StageNode-Story",
                                  audio:
                                    "f493d4e986a1278ca7db3f7c65bf8ee32535b2e4.ogg",
                                  image: null,
                                  name: "alice-jungle.ogg Stage node",
                                  okTransition: null,
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                class: "StageNode-Menu",
                image: "4977589ba6e6d131a500309d3f8ee84c66b615f1.png",
                audio: "f8932ae73324764b45bb7a3e1e92f4fabde3c2f8.ogg",
                name: "Bob",
                okTransition: {
                  class: "ActionNode",
                  name: "Bob ActionNode",
                  options: [
                    {
                      class: "StageNode-Menu",
                      image: null,
                      audio: "95617b401ff08d2e981ac1f10d8c9dd862f5c203.ogg",
                      name: "Choose a place",
                      okTransition: {
                        class: "ActionNode",
                        name: "Choose a place ActionNode",
                        options: [
                          {
                            class: "StageNode-StoryItem",
                            name: "bob-city.ogg item",
                            audio:
                              "e260fd4baef8d32d1cb598355ca691e5fe401bc8.ogg",
                            image:
                              "95daa0dc90c3f15300edb39c807e9c9d6acff3f6.png",
                            okTransition: {
                              name: "bob-city.ogg ActionNode",
                              class: "ActionNode",
                              options: [
                                {
                                  class: "StageNode-Story",
                                  audio:
                                    "90304af3b9d81fb1590ad367df796e791ea78750.ogg",
                                  image: null,
                                  name: "bob-city.ogg Stage node",
                                  okTransition: null,
                                },
                              ],
                            },
                          },
                          {
                            class: "StageNode-StoryItem",
                            name: "jungle.ogg item",
                            audio:
                              "78adc1006ff121cbf1c7052a02be47c398aecd78.ogg",
                            image:
                              "da5e7052795b59001f09e2caf27412ef8212f23f.png",
                            okTransition: {
                              name: "jungle.ogg ActionNode",
                              class: "ActionNode",
                              options: [
                                {
                                  class: "StageNode-Story",
                                  audio:
                                    "084c25abd45f62e50aed566e74ae3317bf844d6c.ogg",
                                  image: null,
                                  name: "jungle.ogg Stage node",
                                  okTransition: null,
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
};
export const expectedSha1s = [
  "084c25abd45f62e50aed566e74ae3317bf844d6c",
  "1a23e1732632e8bbcb7607a92edd3c3ec3c3357a",
  "46fe70d98b9763ab70b7e7cea4627e4f8b7c585a",
  "4977589ba6e6d131a500309d3f8ee84c66b615f1",
  "53018173b8245b5d03d729da410daed6d3fd3570",
  "5e36825dd492cd428ec8408f55f8dddfe6a1248a",
  "5e6cb53d9acef28a6f57edf317c31bda673d64ed",
  "5f667e756ba42748a9eea3b0a217579bee960164",
  "6ef0a88a7b823fc81a85d448c971821d3570e606",
  "78adc1006ff121cbf1c7052a02be47c398aecd78",
  "78adc1006ff121cbf1c7052a02be47c398aecd78",
  "90304af3b9d81fb1590ad367df796e791ea78750",
  "95617b401ff08d2e981ac1f10d8c9dd862f5c203",
  "95617b401ff08d2e981ac1f10d8c9dd862f5c203",
  "95daa0dc90c3f15300edb39c807e9c9d6acff3f6",
  "c68e4b1028b3c93e434506e6a0203e5edbaed43b",
  "da5e7052795b59001f09e2caf27412ef8212f23f",
  "da5e7052795b59001f09e2caf27412ef8212f23f",
  "e260fd4baef8d32d1cb598355ca691e5fe401bc8",
  "f493d4e986a1278ca7db3f7c65bf8ee32535b2e4",
  "f8932ae73324764b45bb7a3e1e92f4fabde3c2f8",
];
export const expectedSha1sMap = {
  "084c25abd45f62e50aed566e74ae3317bf844d6c":
    "Choose a character/Bob/Choose a place/jungle.ogg",
  "1a23e1732632e8bbcb7607a92edd3c3ec3c3357a": "0-item.ogg",
  "46fe70d98b9763ab70b7e7cea4627e4f8b7c585a":
    "Choose a character/Alice/Choose a place/city.ogg",
  "4977589ba6e6d131a500309d3f8ee84c66b615f1":
    "Choose a character/Bob/0-item.png",
  "53018173b8245b5d03d729da410daed6d3fd3570": "Choose a character/0-item.ogg",
  "5e36825dd492cd428ec8408f55f8dddfe6a1248a":
    "Choose a character/Alice/Choose a place/city.item.png",
  "5e6cb53d9acef28a6f57edf317c31bda673d64ed":
    "Choose a character/Alice/Choose a place/city.item.ogg",
  "5f667e756ba42748a9eea3b0a217579bee960164": "0-item.png",
  "6ef0a88a7b823fc81a85d448c971821d3570e606":
    "Choose a character/Alice/0-item.ogg",
  "78adc1006ff121cbf1c7052a02be47c398aecd78":
    "Choose a character/Bob/Choose a place/jungle.item.ogg",
  "90304af3b9d81fb1590ad367df796e791ea78750":
    "Choose a character/Bob/Choose a place/bob-city.ogg",
  "95617b401ff08d2e981ac1f10d8c9dd862f5c203":
    "Choose a character/Bob/Choose a place/0-item.ogg",
  "95daa0dc90c3f15300edb39c807e9c9d6acff3f6":
    "Choose a character/Bob/Choose a place/bob-city.item.png",
  c68e4b1028b3c93e434506e6a0203e5edbaed43b:
    "Choose a character/Alice/0-item.png",
  da5e7052795b59001f09e2caf27412ef8212f23f:
    "Choose a character/Bob/Choose a place/jungle.item.png",
  e260fd4baef8d32d1cb598355ca691e5fe401bc8:
    "Choose a character/Bob/Choose a place/bob-city.item.ogg",
  f493d4e986a1278ca7db3f7c65bf8ee32535b2e4:
    "Choose a character/Alice/Choose a place/alice-jungle.ogg",
  f8932ae73324764b45bb7a3e1e92f4fabde3c2f8: "Choose a character/Bob/0-item.ogg",
};
export const expectedAssetPaths = [
  {
    path: "Choose a character/Bob/Choose a place/jungle.ogg",
    sha1: "084c25abd45f62e50aed566e74ae3317bf844d6c",
  },
  {
    path: "0-item.ogg",
    sha1: "1a23e1732632e8bbcb7607a92edd3c3ec3c3357a",
  },
  {
    path: "Choose a character/Alice/Choose a place/city.ogg",
    sha1: "46fe70d98b9763ab70b7e7cea4627e4f8b7c585a",
  },
  {
    path: "Choose a character/Bob/0-item.png",
    sha1: "4977589ba6e6d131a500309d3f8ee84c66b615f1",
  },
  {
    path: "Choose a character/0-item.ogg",
    sha1: "53018173b8245b5d03d729da410daed6d3fd3570",
  },
  {
    path: "Choose a character/Alice/Choose a place/city.item.png",
    sha1: "5e36825dd492cd428ec8408f55f8dddfe6a1248a",
  },
  {
    path: "Choose a character/Alice/Choose a place/city.item.ogg",
    sha1: "5e6cb53d9acef28a6f57edf317c31bda673d64ed",
  },
  {
    path: "0-item.png",
    sha1: "5f667e756ba42748a9eea3b0a217579bee960164",
  },
  {
    path: "Choose a character/Alice/0-item.ogg",
    sha1: "6ef0a88a7b823fc81a85d448c971821d3570e606",
  },
  {
    path: "Choose a character/Bob/Choose a place/jungle.item.ogg",
    sha1: "78adc1006ff121cbf1c7052a02be47c398aecd78",
  },
  {
    path: "Choose a character/Bob/Choose a place/bob-city.ogg",
    sha1: "90304af3b9d81fb1590ad367df796e791ea78750",
  },
  {
    path: "Choose a character/Bob/Choose a place/0-item.ogg",
    sha1: "95617b401ff08d2e981ac1f10d8c9dd862f5c203",
  },
  {
    path: "Choose a character/Bob/Choose a place/bob-city.item.png",
    sha1: "95daa0dc90c3f15300edb39c807e9c9d6acff3f6",
  },
  {
    path: "Choose a character/Alice/0-item.png",
    sha1: "c68e4b1028b3c93e434506e6a0203e5edbaed43b",
  },
  {
    path: "Choose a character/Bob/Choose a place/jungle.item.png",
    sha1: "da5e7052795b59001f09e2caf27412ef8212f23f",
  },
  {
    path: "Choose a character/Bob/Choose a place/bob-city.item.ogg",
    sha1: "e260fd4baef8d32d1cb598355ca691e5fe401bc8",
  },
  {
    path: "Choose a character/Alice/Choose a place/alice-jungle.ogg",
    sha1: "f493d4e986a1278ca7db3f7c65bf8ee32535b2e4",
  },
  {
    path: "Choose a character/Bob/0-item.ogg",
    sha1: "f8932ae73324764b45bb7a3e1e92f4fabde3c2f8",
  },
];

export const expectedFullPackSerialized: SerializedPack = {
  title: "2-full",
  version: 1,
  description: "",
  format: "v1",
  nightModeAvailable: false,
  actionNodes: [
    {
      id: "41bb0e8b-5cda-45c7-883a-193e3570e7db",
      name: "Action node",
      options: ["3dedf0da-184f-47ff-9d1a-08c33b510d04"],
      position: {
        x: 0,
        y: 0,
      },
    },
    {
      id: "f13a6d12-f14c-417c-a1b9-0d472a81f71f",
      name: "Choose a character ActionNode",
      options: [
        "d30ffb97-937c-40e4-87cb-52bb165a6f2c",
        "f45fedec-1bd0-4079-b30f-9ba4dcb53251",
      ],
      position: {
        x: 0,
        y: 0,
      },
    },
    {
      id: "ee081709-807e-411f-b849-3564deeec2c1",
      name: "Bob ActionNode",
      options: ["43675af0-4a46-43fd-b499-7b0f50d245ae"],
      position: {
        x: 0,
        y: 0,
      },
    },
    {
      id: "2ce22c3f-ddc9-4e6f-93d8-09aa7f1c6bda",
      name: "Choose a place ActionNode",
      options: [
        "f8833e95-2723-472c-ae09-37ae39ddfc40",
        "cfd5a4a4-096c-435b-9d76-f8df327448d2",
      ],
      position: {
        x: 0,
        y: 0,
      },
    },
    {
      id: "ea493af6-e355-4c9b-ad47-f2e905740495",
      name: "jungle.ogg ActionNode",
      options: ["66a9993c-5b76-47e6-9145-1b41bf1b3a92"],
      position: {
        x: 0,
        y: 0,
      },
    },
    {
      id: "7db64f23-1f42-4e03-baa9-9a5beee60c0d",
      name: "bob-city.ogg ActionNode",
      options: ["a16263c0-df61-4dd1-a5a0-af39252ccfa2"],
      position: {
        x: 0,
        y: 0,
      },
    },
    {
      id: "a9a456f5-3087-4506-adc3-8fdbd1120273",
      name: "Alice ActionNode",
      options: ["8c446610-4c51-45da-b58b-7a6d0de7f807"],
      position: {
        x: 0,
        y: 0,
      },
    },
    {
      id: "ed4794d1-59ea-4024-a25a-c20fae794bb3",
      name: "Choose a place ActionNode",
      options: [
        "92c20747-0778-4db3-8623-b316c429ce19",
        "3688c876-dd4c-4ec0-bea2-d3dc78149183",
      ],
      position: {
        x: 0,
        y: 0,
      },
    },
    {
      id: "faa61366-848e-4606-ba2a-2b34bb2111ff",
      name: "alice-jungle.ogg ActionNode",
      options: ["0d9b1524-1929-4c49-925c-462ed3284e70"],
      position: {
        x: 0,
        y: 0,
      },
    },
    {
      id: "11e10b4b-c9b7-4f9c-8bc9-bd857466267d",
      name: "city.ogg ActionNode",
      options: ["925387b3-e971-4218-bf4e-cb6dd3c493eb"],
      position: {
        x: 0,
        y: 0,
      },
    },
  ],
  stageNodes: [
    {
      audio: "1a23e1732632e8bbcb7607a92edd3c3ec3c3357a.ogg",
      controlSettings: {
        autoplay: false,
        home: false,
        ok: true,
        pause: false,
        wheel: true,
      },
      homeTransition: null,
      image: "5f667e756ba42748a9eea3b0a217579bee960164.png",
      name: "Cover node",
      okTransition: {
        actionNode: "41bb0e8b-5cda-45c7-883a-193e3570e7db",
        optionIndex: 0,
      },
      position: {
        x: 0,
        y: 0,
      },
      squareOne: true,
      type: "cover",
      uuid: "86e05883-99a3-4031-8399-1b8a6f1c252a",
    },
    {
      audio: "53018173b8245b5d03d729da410daed6d3fd3570.ogg",
      controlSettings: {
        autoplay: true,
        home: true,
        ok: true,
        pause: false,
        wheel: false,
      },
      homeTransition: null,
      image: null,
      name: "Choose a character",
      okTransition: {
        actionNode: "f13a6d12-f14c-417c-a1b9-0d472a81f71f",
        optionIndex: 0,
      },
      position: {
        x: 0,
        y: 0,
      },
      squareOne: false,
      type: "stage",
      uuid: "3dedf0da-184f-47ff-9d1a-08c33b510d04",
    },
    {
      audio: "f8932ae73324764b45bb7a3e1e92f4fabde3c2f8.ogg",
      controlSettings: {
        autoplay: false,
        home: true,
        ok: true,
        pause: false,
        wheel: true,
      },
      homeTransition: {
        actionNode: "ID",
        optionIndex: 0,
      },
      image: "4977589ba6e6d131a500309d3f8ee84c66b615f1.png",
      name: "Bob",
      okTransition: {
        actionNode: "ee081709-807e-411f-b849-3564deeec2c1",
        optionIndex: 0,
      },
      position: {
        x: 0,
        y: 0,
      },
      squareOne: false,
      type: "stage",
      uuid: "f45fedec-1bd0-4079-b30f-9ba4dcb53251",
    },
    {
      audio: "95617b401ff08d2e981ac1f10d8c9dd862f5c203.ogg",
      controlSettings: {
        autoplay: true,
        home: true,
        ok: true,
        pause: false,
        wheel: false,
      },
      homeTransition: {
        actionNode: "f13a6d12-f14c-417c-a1b9-0d472a81f71f",
        optionIndex: 1,
      },
      image: null,
      name: "Choose a place",
      okTransition: {
        actionNode: "2ce22c3f-ddc9-4e6f-93d8-09aa7f1c6bda",
        optionIndex: 0,
      },
      position: {
        x: 0,
        y: 0,
      },
      squareOne: false,
      type: "stage",
      uuid: "43675af0-4a46-43fd-b499-7b0f50d245ae",
    },
    {
      audio: "78adc1006ff121cbf1c7052a02be47c398aecd78.ogg",
      controlSettings: {
        autoplay: false,
        home: true,
        ok: true,
        pause: false,
        wheel: true,
      },
      homeTransition: {
        actionNode: "ee081709-807e-411f-b849-3564deeec2c1",
        optionIndex: 0,
      },
      image: "da5e7052795b59001f09e2caf27412ef8212f23f.png",
      name: "jungle.ogg item",
      okTransition: {
        actionNode: "ea493af6-e355-4c9b-ad47-f2e905740495",
        optionIndex: 0,
      },
      position: {
        x: 0,
        y: 0,
      },
      squareOne: false,
      type: "stage",
      uuid: "cfd5a4a4-096c-435b-9d76-f8df327448d2",
    },
    {
      audio: "084c25abd45f62e50aed566e74ae3317bf844d6c.ogg",
      controlSettings: {
        autoplay: true,
        home: true,
        ok: false,
        pause: true,
        wheel: false,
      },
      homeTransition: {
        actionNode: "2ce22c3f-ddc9-4e6f-93d8-09aa7f1c6bda",
        optionIndex: 1,
      },
      image: null,
      name: "jungle.ogg Stage node",
      okTransition: {
        actionNode: "ID",
        optionIndex: 1,
      },
      position: {
        x: 0,
        y: 0,
      },
      squareOne: false,
      type: "stage",
      uuid: "66a9993c-5b76-47e6-9145-1b41bf1b3a92",
    },
    {
      audio: "e260fd4baef8d32d1cb598355ca691e5fe401bc8.ogg",
      controlSettings: {
        autoplay: false,
        home: true,
        ok: true,
        pause: false,
        wheel: true,
      },
      homeTransition: {
        actionNode: "ee081709-807e-411f-b849-3564deeec2c1",
        optionIndex: 0,
      },
      image: "95daa0dc90c3f15300edb39c807e9c9d6acff3f6.png",
      name: "bob-city.ogg item",
      okTransition: {
        actionNode: "7db64f23-1f42-4e03-baa9-9a5beee60c0d",
        optionIndex: 0,
      },
      position: {
        x: 0,
        y: 0,
      },
      squareOne: false,
      type: "stage",
      uuid: "f8833e95-2723-472c-ae09-37ae39ddfc40",
    },
    {
      audio: "90304af3b9d81fb1590ad367df796e791ea78750.ogg",
      controlSettings: {
        autoplay: true,
        home: true,
        ok: false,
        pause: true,
        wheel: false,
      },
      homeTransition: {
        actionNode: "2ce22c3f-ddc9-4e6f-93d8-09aa7f1c6bda",
        optionIndex: 0,
      },
      image: null,
      name: "bob-city.ogg Stage node",
      okTransition: {
        actionNode: "ID",
        optionIndex: 0,
      },
      position: {
        x: 0,
        y: 0,
      },
      squareOne: false,
      type: "stage",
      uuid: "a16263c0-df61-4dd1-a5a0-af39252ccfa2",
    },
    {
      audio: "6ef0a88a7b823fc81a85d448c971821d3570e606.ogg",
      controlSettings: {
        autoplay: false,
        home: true,
        ok: true,
        pause: false,
        wheel: true,
      },
      homeTransition: {
        actionNode: "ID",
        optionIndex: 0,
      },
      image: "c68e4b1028b3c93e434506e6a0203e5edbaed43b.png",
      name: "Alice",
      okTransition: {
        actionNode: "a9a456f5-3087-4506-adc3-8fdbd1120273",
        optionIndex: 0,
      },
      position: {
        x: 0,
        y: 0,
      },
      squareOne: false,
      type: "stage",
      uuid: "d30ffb97-937c-40e4-87cb-52bb165a6f2c",
    },
    {
      audio: "95617b401ff08d2e981ac1f10d8c9dd862f5c203.ogg",
      controlSettings: {
        autoplay: true,
        home: true,
        ok: true,
        pause: false,
        wheel: false,
      },
      homeTransition: {
        actionNode: "f13a6d12-f14c-417c-a1b9-0d472a81f71f",
        optionIndex: 0,
      },
      image: null,
      name: "Choose a place",
      okTransition: {
        actionNode: "ed4794d1-59ea-4024-a25a-c20fae794bb3",
        optionIndex: 0,
      },
      position: {
        x: 0,
        y: 0,
      },
      squareOne: false,
      type: "stage",
      uuid: "8c446610-4c51-45da-b58b-7a6d0de7f807",
    },
    {
      audio: "78adc1006ff121cbf1c7052a02be47c398aecd78.ogg",
      controlSettings: {
        autoplay: false,
        home: true,
        ok: true,
        pause: false,
        wheel: true,
      },
      homeTransition: {
        actionNode: "a9a456f5-3087-4506-adc3-8fdbd1120273",
        optionIndex: 0,
      },
      image: "da5e7052795b59001f09e2caf27412ef8212f23f.png",
      name: "alice-jungle.ogg item",
      okTransition: {
        actionNode: "faa61366-848e-4606-ba2a-2b34bb2111ff",
        optionIndex: 0,
      },
      position: {
        x: 0,
        y: 0,
      },
      squareOne: false,
      type: "stage",
      uuid: "3688c876-dd4c-4ec0-bea2-d3dc78149183",
    },
    {
      audio: "f493d4e986a1278ca7db3f7c65bf8ee32535b2e4.ogg",
      controlSettings: {
        autoplay: true,
        home: true,
        ok: false,
        pause: true,
        wheel: false,
      },
      homeTransition: {
        actionNode: "ed4794d1-59ea-4024-a25a-c20fae794bb3",
        optionIndex: 1,
      },
      image: null,
      name: "alice-jungle.ogg Stage node",
      okTransition: {
        actionNode: "ID",
        optionIndex: 1,
      },
      position: {
        x: 0,
        y: 0,
      },
      squareOne: false,
      type: "stage",
      uuid: "0d9b1524-1929-4c49-925c-462ed3284e70",
    },
    {
      audio: "5e6cb53d9acef28a6f57edf317c31bda673d64ed.ogg",
      controlSettings: {
        autoplay: false,
        home: true,
        ok: true,
        pause: false,
        wheel: true,
      },
      homeTransition: {
        actionNode: "a9a456f5-3087-4506-adc3-8fdbd1120273",
        optionIndex: 0,
      },
      image: "5e36825dd492cd428ec8408f55f8dddfe6a1248a.png",
      name: "city.ogg item",
      okTransition: {
        actionNode: "11e10b4b-c9b7-4f9c-8bc9-bd857466267d",
        optionIndex: 0,
      },
      position: {
        x: 0,
        y: 0,
      },
      squareOne: false,
      type: "stage",
      uuid: "92c20747-0778-4db3-8623-b316c429ce19",
    },
    {
      audio: "46fe70d98b9763ab70b7e7cea4627e4f8b7c585a.ogg",
      controlSettings: {
        autoplay: true,
        home: true,
        ok: false,
        pause: true,
        wheel: false,
      },
      homeTransition: {
        actionNode: "ed4794d1-59ea-4024-a25a-c20fae794bb3",
        optionIndex: 0,
      },
      image: null,
      name: "city.ogg Stage node",
      okTransition: {
        actionNode: "ID",
        optionIndex: 0,
      },
      position: {
        x: 0,
        y: 0,
      },
      squareOne: false,
      type: "stage",
      uuid: "925387b3-e971-4218-bf4e-cb6dd3c493eb",
    },
  ],
};

export const expectedFullFolder = {
  files: [
    {
      name: "0-item.ogg",
      sha1: "1a23e1732632e8bbcb7607a92edd3c3ec3c3357a",
    },
    {
      name: "0-item.png",
      sha1: "5f667e756ba42748a9eea3b0a217579bee960164",
    },
    {
      files: [
        {
          name: "0-item.ogg",
          sha1: "53018173b8245b5d03d729da410daed6d3fd3570",
        },
        {
          files: [
            {
              name: "0-item.ogg",
              sha1: "6ef0a88a7b823fc81a85d448c971821d3570e606",
            },
            {
              name: "0-item.png",
              sha1: "c68e4b1028b3c93e434506e6a0203e5edbaed43b",
            },
            {
              files: [
                {
                  name: "0-item.ogg",
                  sha1: "95617b401ff08d2e981ac1f10d8c9dd862f5c203",
                },
                {
                  name: "city.item.ogg",
                  sha1: "5e6cb53d9acef28a6f57edf317c31bda673d64ed",
                },
                {
                  name: "city.item.png",
                  sha1: "5e36825dd492cd428ec8408f55f8dddfe6a1248a",
                },
                {
                  name: "city.ogg",
                  sha1: "46fe70d98b9763ab70b7e7cea4627e4f8b7c585a",
                },
                {
                  name: "jungle.item.ogg",
                  sha1: "78adc1006ff121cbf1c7052a02be47c398aecd78",
                },
                {
                  name: "jungle.item.png",
                  sha1: "da5e7052795b59001f09e2caf27412ef8212f23f",
                },
                {
                  name: "jungle.ogg",
                  sha1: "f493d4e986a1278ca7db3f7c65bf8ee32535b2e4",
                },
              ],
              name: "Choose a place",
            },
          ],
          name: "Alice",
        },
        {
          files: [
            {
              name: "0-item.ogg",
              sha1: "f8932ae73324764b45bb7a3e1e92f4fabde3c2f8",
            },
            {
              name: "0-item.png",
              sha1: "4977589ba6e6d131a500309d3f8ee84c66b615f1",
            },
            {
              files: [
                {
                  name: "0-item.ogg",
                  sha1: "95617b401ff08d2e981ac1f10d8c9dd862f5c203",
                },
                {
                  name: "desert.item.ogg",
                  sha1: "e260fd4baef8d32d1cb598355ca691e5fe401bc8",
                },
                {
                  name: "desert.item.png",
                  sha1: "95daa0dc90c3f15300edb39c807e9c9d6acff3f6",
                },
                {
                  name: "desert.ogg",
                  sha1: "90304af3b9d81fb1590ad367df796e791ea78750",
                },
                {
                  name: "jungle.item.ogg",
                  sha1: "78adc1006ff121cbf1c7052a02be47c398aecd78",
                },
                {
                  name: "jungle.item.png",
                  sha1: "da5e7052795b59001f09e2caf27412ef8212f23f",
                },
                {
                  name: "jungle.ogg",
                  sha1: "084c25abd45f62e50aed566e74ae3317bf844d6c",
                },
              ],
              name: "Choose a place",
            },
          ],
          name: "Bob",
        },
      ],
      name: "Choose a character",
    },
  ],
  name: "2-full",
};

export const expectedSortFolder = {
  files: [
    {
      files: [
        {
          name: "2 jungle.ogg",
          sha1: "084c25abd45f62e50aed566e74ae3317bf844d6c",
        },
        {
          name: "10 desert.ogg",
          sha1: "90304af3b9d81fb1590ad367df796e791ea78750",
        },
      ],
      name: "Choose a place",
    },
  ],
  name: "3-sort",
};
