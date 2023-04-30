import { fixUrl, getItemFileName } from "./rss_parser.ts";
import { assert, assertEquals } from "../test_deps.ts";

Deno.test("getItemFileName", () => {
  assert(
    getItemFileName({
      pubDate: "0",
      title: 'a\\z/e:r*t?y"u<i>o|p',
      enclosure: { "@url": "" },
    }).endsWith(" - a z e r t y u i o p."),
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
