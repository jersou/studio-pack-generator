import { i18next, yellow } from "../deps.ts";

const en = {
  partQuestion: "Choisis your part",
  partTitle: "Part",
  storyQuestion: "Choose your story",
};
const fr = {
  partQuestion: "Choisis ta partie",
  partTitle: "Partie",
  storyQuestion: "Choisis ton histoire",
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

export async function getLang() {
  let LANG;
  if ((await Deno.permissions.query({ name: "env" })).state === "granted") {
    LANG = Deno.env.get("LANG");
  } else {
    console.error(
      yellow(
        `Missing Deno env permission ! add "--allow-env" to permit lang detection`,
      ),
    );
  }
  let lang;
  const langRegex = /^([a-zA-Z_]+)\./;
  if (LANG && langRegex.test(LANG)) {
    lang = langRegex.exec(LANG)![1].replace(/_/g, "-");
  }
  return lang || "en-US";
}
