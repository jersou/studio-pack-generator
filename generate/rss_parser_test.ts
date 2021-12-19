import { getItemFileName } from "./rss_parser.ts";
import { assertEquals } from "../test_deps.ts";

Deno.test("getItemFileName", () => {
  assertEquals(
    getItemFileName({
      pubDate: "0",
      title: 'a\\z/e:r*t?y"u<i>o|p',
      enclosure: { "@url": "" },
    }),
    "946681200000 - a z e r t y u i o p.",
  );
});
