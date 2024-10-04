import { getLang } from "./i18n.ts";
import { assertEquals } from "@std/assert";

Deno.test("getLang", async () => {
  const lang = await getLang();
  console.log({ lang });
  assertEquals("a".localeCompare("b", lang.substring(0, 2)), -1);
});
