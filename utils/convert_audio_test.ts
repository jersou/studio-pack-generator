import { assertEquals } from "@std/assert";
import { planLoudness } from "./convert_audio.ts";

// Réplique des cas de référence de Story Studio (plan_loudness_fix) : on vise
// −14 LUFS par gain statique et on impose toujours le plafond de crête −2 dBFS.

Deno.test("planLoudness : ne touche pas un fichier déjà dans la bande morte", () => {
  assertEquals(planLoudness({ integratedLufs: -14.2, truePeakDb: -3.0 }), {
    kind: "none",
  });
});

Deno.test("planLoudness : limiteur seul si la crête est chaude dans la bande morte", () => {
  assertEquals(planLoudness({ integratedLufs: -13.5, truePeakDb: 0.5 }), {
    kind: "filters",
    filters: ["volume=0dB", "alimiter=limit=0.794328:level=disabled"],
  });
});

Deno.test("planLoudness : mate une source écrêtée même dans la bande morte", () => {
  assertEquals(planLoudness({ integratedLufs: -14.0, truePeakDb: 10.0 }), {
    kind: "filters",
    filters: ["volume=0dB", "alimiter=limit=0.794328:level=disabled"],
  });
});

Deno.test("planLoudness : gain seul quand la crête a de la marge", () => {
  assertEquals(planLoudness({ integratedLufs: -18.0, truePeakDb: -8.0 }), {
    kind: "filters",
    filters: ["volume=4dB"],
  });
});

Deno.test("planLoudness : gain + limiteur quand la cible exige de contrôler la crête", () => {
  assertEquals(planLoudness({ integratedLufs: -18.0, truePeakDb: -4.0 }), {
    kind: "filters",
    filters: ["volume=4dB", "alimiter=limit=0.794328:level=disabled"],
  });
});

Deno.test("planLoudness : plafonne le gain montant (budget de limitation)", () => {
  assertEquals(planLoudness({ integratedLufs: -22.0, truePeakDb: 0.0 }), {
    kind: "filters",
    filters: ["volume=4dB", "alimiter=limit=0.794328:level=disabled"],
  });
});

Deno.test("planLoudness : niveau valide mais source écrêtée → limiteur sans toucher au niveau", () => {
  assertEquals(planLoudness({ integratedLufs: -16.0, truePeakDb: 8.0 }), {
    kind: "filters",
    filters: ["volume=0dB", "alimiter=limit=0.794328:level=disabled"],
  });
});

Deno.test("planLoudness : atténue (gain négatif non plafonné)", () => {
  assertEquals(planLoudness({ integratedLufs: -10.0, truePeakDb: -5.0 }), {
    kind: "filters",
    filters: ["volume=-4dB"],
  });
});

Deno.test("planLoudness : non corrigeable si trop faible pour atteindre la fenêtre", () => {
  assertEquals(
    planLoudness({ integratedLufs: -32.0, truePeakDb: 0.0 }).kind,
    "uncorrectable",
  );
});

Deno.test("planLoudness : non corrigeable si presque muet", () => {
  assertEquals(
    planLoudness({ integratedLufs: -50.0, truePeakDb: 0.0 }).kind,
    "uncorrectable",
  );
});
