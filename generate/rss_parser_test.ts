import { getItemFileName } from "./rss_parser.ts";
import { assert } from "../test_deps.ts";

Deno.test("getItemFileName", () => {
  assert(
    getItemFileName({
      pubDate: "0",
      title: 'a\\z/e:r*t?y"u<i>o|p',
      enclosure: { "@url": "" },
    }).endsWith(" - a z e r t y u i o p."),
  );
});
