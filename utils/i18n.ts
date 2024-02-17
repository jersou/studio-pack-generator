import { $, i18next, yellow } from "../deps.ts";

const en = {
  partQuestion: "Choose your part",
  partTitle: "Part",
  storyQuestion: "Choose your story",
  NightModeTransition: "Want to listen to a new story?",
};
const fr = {
  partQuestion: "Choisis ta partie",
  partTitle: "Partie",
  storyQuestion: "Choisis ton histoire",
  NightModeTransition: "Tu veux écouter une nouvelle histoire ?",
};

export async function initI18n(lng: string) {
  await i18next.init(
    {
      lng,
      fallbackLng: "en-US",
      resources: {
        "en-US": { translation: en },
        "fr-FR": { translation: fr },
      },
    },
    undefined,
  );
}

let LANG: string | undefined;
export async function getLang() {
  if (!LANG) {
    if (Deno.build.os === "windows") {
      LANG =
        await $`powershell -NoProfile "Get-UICulture|select -ExpandProperty Name"`
          .noThrow().text();
    } else if (
      (await Deno.permissions.query({ name: "env" })).state === "granted"
    ) {
      LANG = Deno.env.get("LANG");
    } else {
      console.error(
        yellow(
          `Missing Deno env permission ! add "--allow-env" to permit lang detection`,
        ),
      );
    }

    let lang;
    const langRegex = /^([a-zA-Z_-]{2,})\.?/;
    if (LANG && langRegex.test(LANG)) {
      lang = langRegex.exec(LANG)![1].replace(/_/g, "-");
    }
    LANG = lang || "en-US";
  }

  return LANG;
}
