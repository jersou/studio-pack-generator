import {
  checkRunPermission,
  getExtension,
  getNameWithoutExt,
  isAudioItem,
  isFolder,
  isStory,
} from "./utils.ts";
import { bgRed, blue, green, yellow } from "@std/fmt/colors";
import { exists } from "@std/fs";
import { join } from "@std/path";
import $ from "@david/dax";

import type { File, Folder } from "../serialize/serialize-types.ts";
import { getFfmpegCommand } from "./external_commands.ts";

// ---------------------------------------------------------------------------
// Normalisation du volume — méthode "loudness + limiteur true-peak".
//
// Au lieu de pousser la CRÊTE à 0 dBFS (`volume=${maxDb}dB`) puis de remodeler
// l'enveloppe (`dynaudnorm`), ce qui sature après ré-encodage MP3, on vise un
// VOLUME PERÇU cible (EBU R128, −14 LUFS) par un GAIN STATIQUE unique, et on
// protège les crêtes avec un LIMITEUR BRICKWALL (`alimiter`) au lieu d'un
// traitement dynamique. La dynamique de la narration est préservée et le signal
// ne dépasse jamais le plafond → plus d'écrêtage sur la boîte.
//
// Réglages mesurés sur des packs officiels Lunii (médiane ≈ −14,5 LUFS).
// ---------------------------------------------------------------------------
const TARGET_LUFS = -14.0;
const LIMITER_SAMPLE_PEAK_DBFS = -2.0;
const LIMITER_SAMPLE_PEAK_LINEAR = 0.794328; // 10^(-2/20)
const MAX_LIMITING_DB = 6.0;
const DEADBAND_LUFS: [number, number] = [-15.5, -12.5];
const VALIDATION_WINDOW_LUFS: [number, number] = [-20.0, -10.0];
const NEAR_MUTE_LUFS = -45.0;
const VALIDATION_FLOOR_SAFETY_LU = 0.5;

type LoudnessMeasure = { integratedLufs: number; truePeakDb: number };

type LoudnessPlan =
  | { kind: "none" } // déjà dans la bande morte, crête sous le plafond
  | { kind: "filters"; filters: string[] } // volume [+ limiteur]
  | { kind: "uncorrectable"; reason: string };

export async function convertAudioOfFolder(
  rootpath: string,
  folder: Folder,
  addDelay: boolean,
  seekStory: string | undefined,
) {
  await checkRunPermission();
  for (const file of folder.files) {
    if (isFolder(file)) {
      await convertAudioOfFolder(
        join(rootpath, file.name),
        file as Folder,
        addDelay,
        seekStory,
      );
    } else if (isStory(file as File) || isAudioItem(file as File)) {
      const inputPath = join(rootpath, file.name);
      const outPath = join(rootpath, `${getNameWithoutExt(file.name)}.mp3`);
      const skipPath = `${outPath}__skip-convert`;
      if (!(await exists(skipPath))) {
        const plan = await planLoudnessOfFile(inputPath);

        const seek = isStory(file as File) ? seekStory : undefined;
        const needsLoudness = plan.kind === "filters";
        const forceToConvert = addDelay || !!seek || needsLoudness;
        if (forceToConvert || !(await checkAudioFormat(inputPath))) {
          await Deno.copyFile(inputPath, `${inputPath}.bak`);
          const tmpPath = await Deno.makeTempFile({
            dir: rootpath,
            suffix: `.${getExtension(file.name)}`,
          });
          await Deno.copyFile(inputPath, tmpPath);
          await Deno.remove(inputPath);
          await convertAudioFile(tmpPath, plan, outPath, addDelay, seek);
          await Deno.remove(tmpPath);
        } else {
          console.log(green("→ skip : déjà conforme (niveau dans la cible)"));
        }
        await Deno.writeTextFile(skipPath, "");
      }
    }
  }
}

async function convertAudioFile(
  inputPath: string,
  plan: LoudnessPlan,
  outputPath: string,
  addDelay: boolean,
  seek: string | undefined,
) {
  console.log(blue(`Convert file ${inputPath} → ${outputPath}`));
  // Mono d'abord (ce que joue la boîte), puis la correction de niveau planifiée,
  // puis l'éventuel silence de bord. Plus de `dynaudnorm`.
  const filters = ["aformat=channel_layouts=mono"];
  if (plan.kind === "filters") {
    filters.push(...plan.filters);
  }
  if (addDelay) {
    // FIXME adelay=all doesn't work
    filters.push("adelay=1000|1000|1000|1000|1000|1000", "apad=pad_dur=1s");
  }
  const cmd = [
    ...(await getFfmpegCommand()),
    "-i",
    inputPath,
    "-af",
    filters.join(","),
    "-ac",
    "1",
    "-ar",
    "44100",
    "-map_metadata",
    "-1",
    "-fflags",
    "+bitexact",
    "-flags:v",
    "+bitexact",
    "-flags:a",
    "+bitexact",
    ...(seek ? ["-ss", seek] : []),
    "-y",
    outputPath,
  ];
  console.log(blue('"' + cmd.join('" "') + '"'));

  const result = await $`${cmd}`
    .noThrow()
    .stdout("null")
    .stderr("null");

  if (result.code === 0) {
    console.log(green("→ OK"));
  } else {
    console.log(bgRed("→ KO"));
  }
}

/** Mesure le loudness intégré + la crête vraie (EBU R128, mixdown mono). */
async function measureLoudnessOfFile(
  inputPath: string,
): Promise<LoudnessMeasure | undefined> {
  console.log(blue(`measure loudness of file ${inputPath}`));
  const cmd = [
    ...(await getFfmpegCommand()),
    "-hide_banner",
    "-nostats",
    "-i",
    inputPath,
    "-map",
    "0:a:0",
    "-af",
    "aformat=channel_layouts=mono,ebur128=peak=true",
    "-f",
    "null",
    "-",
  ];
  const result = await $`${cmd}`.noThrow().stdout("null").stderr("piped");
  if (result.code !== 0) {
    console.log(bgRed("→ KO"));
    return undefined;
  }
  // On ne parse que le bloc "Summary:" final (pas les lignes par-trame).
  const summary = result.stderr.split("Summary:").pop() ?? "";
  const i = /I:\s*(-?\d+(?:\.\d+)?)\s*LUFS/.exec(summary);
  const peak = /Peak:\s*(-?\d+(?:\.\d+)?)\s*dBFS/.exec(summary);
  if (!i || !peak) {
    console.log(bgRed("→ KO : mesure incomplète"));
    return undefined;
  }
  const measure = {
    integratedLufs: parseFloat(i[1]),
    truePeakDb: parseFloat(peak[1]),
  };
  console.log(
    green(
      `→ OK : ${measure.integratedLufs} LUFS, crête ${measure.truePeakDb} dBFS`,
    ),
  );
  return measure;
}

async function planLoudnessOfFile(inputPath: string): Promise<LoudnessPlan> {
  const measure = await measureLoudnessOfFile(inputPath);
  if (!measure) {
    return { kind: "uncorrectable", reason: "mesure de niveau impossible" };
  }
  const plan = planLoudness(measure);
  if (plan.kind === "uncorrectable") {
    console.log(yellow(`→ niveau non corrigé : ${plan.reason}`));
  }
  return plan;
}

/**
 * Planifie le gain statique + l'éventuel limiteur, en visant −14 LUFS sans
 * jamais laisser la crête dépasser le plafond −2 dBFS (réplique de la logique de
 * Story Studio). Le gain MONTANT est plafonné (anti-pompage des sources faibles)
 * mais le plafond de crête est TOUJOURS imposé (mate les sources chaudes/écrêtées).
 */
export function planLoudness(measure: LoudnessMeasure): LoudnessPlan {
  const { integratedLufs: i, truePeakDb: tp } = measure;
  if (!Number.isFinite(i) || !Number.isFinite(tp)) {
    return { kind: "uncorrectable", reason: "mesure de niveau invalide" };
  }
  if (i < NEAR_MUTE_LUFS) {
    return { kind: "uncorrectable", reason: "audio presque muet" };
  }

  let gainDb: number;
  if (inRange(i, DEADBAND_LUFS)) {
    gainDb = 0;
  } else {
    const idealGain = TARGET_LUFS - i;
    if (idealGain <= 0) {
      gainDb = idealGain; // atténuation : non plafonnée
    } else {
      const maxBoost = Math.max(
        LIMITER_SAMPLE_PEAK_DBFS + MAX_LIMITING_DB - tp,
        0,
      );
      gainDb = Math.min(idealGain, maxBoost);
      if (
        gainDb < idealGain &&
        i + gainDb < VALIDATION_WINDOW_LUFS[0] + VALIDATION_FLOOR_SAFETY_LU
      ) {
        return {
          kind: "uncorrectable",
          reason: "audio trop dynamique/faible pour monter sans écraser",
        };
      }
    }
  }

  const projectedPeak = tp + gainDb;
  if (projectedPeak <= LIMITER_SAMPLE_PEAK_DBFS) {
    return inRange(i, DEADBAND_LUFS)
      ? { kind: "none" }
      : { kind: "filters", filters: [`volume=${fmtNum(gainDb)}dB`] };
  }
  return {
    kind: "filters",
    filters: [
      `volume=${fmtNum(gainDb)}dB`,
      `alimiter=limit=${fmtNum(LIMITER_SAMPLE_PEAK_LINEAR)}:level=disabled`,
    ],
  };
}

function inRange(value: number, [min, max]: [number, number]): boolean {
  return value >= min && value <= max;
}

/** Formate sans zéros superflus : 4.0 → "4", 2.25 → "2.25". */
function fmtNum(value: number): string {
  return Number(value.toFixed(6)).toString();
}

async function checkAudioFormat(filePath: string) {
  const info = await getFfmpegInfo(filePath);
  const isOk = /^ *Stream #0:0: Audio: mp3, 44100 Hz, mono,.*$/m.test(info);
  console.log(
    blue(`checkAudioFormat of ${filePath} : Format is ${isOk ? "OK" : "KO"}`),
  );
  return isOk;
}

async function getFfmpegInfo(filePath: string): Promise<string> {
  console.log(blue(`get info of file ${filePath}`));
  const cmd = [
    ...(await getFfmpegCommand()),
    "-i",
    filePath,
    "-hide_banner",
    "-f",
    "null",
    "-",
  ];

  const result = await $`${cmd}`.noThrow().stdout("null").stderr("piped");
  let info = "";
  if (result.code === 0) {
    info = result.stderr;
  }
  // console.log(green("info=" + info));
  return info;
}
