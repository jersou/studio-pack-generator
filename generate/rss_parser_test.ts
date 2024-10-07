import type { ModOptions } from "../types.ts";
import { fixUrl, getItemFileName } from "./rss_parser.ts";
import { assert, assertEquals } from "@std/assert";

Deno.test("getItemFileName", () => {
  assert(
    getItemFileName({
      pubDate: "0",
      title: 'a\\z/e:r*t?y"u<i>o|p',
      enclosure: { "@url": "" },
    }, {} as ModOptions).endsWith(" - a z e r t y u i o p."),
  );
});

Deno.test("fixUrl", () => {
  assertEquals(
    fixUrl(
      "https://azert/https://tyui/op.mp3",
    ),
    "https://tyui/op.mp3",
  );
});
