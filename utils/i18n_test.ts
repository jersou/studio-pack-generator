import { getLang } from "./i18n.ts";
import { assertEquals } from "https://deno.land/std@0.158.0/testing/asserts.ts";

Deno.test("getLang", async () => {
  const lang = await getLang();
  console.log({ lang });
  assertEquals("a".localeCompare("b", lang.substring(0, 2)), -1);
});
