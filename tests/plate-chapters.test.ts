import assert from "node:assert/strict";
import test from "node:test";
import { deriveGeometricChapterContent, deriveMotifChapterContent, isAutoGeometricPlate, isAutoMotifPlate, plateChapterContent, validatePlateChapterContent } from "../src/lib/plate-chapter-content.ts";
import type { PlateMeta } from "../src/lib/plate-types.ts";

const migrated = ["cable-borders", "classic-trellis", "bullion-rose-arbor", "christmas-ornament-row"];

test("the pilot migration covers four representative plate families", () => {
  assert.deepEqual(Object.keys(plateChapterContent).sort(), [...migrated].sort());
});

test("every rich chapter passes required-content validation", () => {
  for (const chapter of Object.values(plateChapterContent)) {
    assert.deepEqual(validatePlateChapterContent(chapter), []);
  }
});

test("every rich chapter documents confidence, interpretation, and print tension", () => {
  for (const chapter of Object.values(plateChapterContent)) {
    assert.match(chapter.confidence, /^(confirmed|interpreted|provisional)$/);
    assert.ok(chapter.interpretationNotes.length > 0);
    assert.ok(chapter.tensionReminder.length > 20);
  }
});

const geometricFixture = {
  slug: "test-geometric", title: "Test Geometric", subtitle: "Test", difficulty: "beginner",
  garments: ["sampler"], rows: 5, pleats: 24, repeatPleats: 8,
  threads: [{ id: "a", name: "Thread", hex: "#000000" }], stitchesUsed: ["trellis"],
  description: "A test geometric plate.", instructions: ["Work the plate."], tips: ["Relax the thread."], cells: {},
} as PlateMeta;

test("structural plates opt into derived rich chapters without capturing motif or picture plates", () => {
  assert.equal(isAutoGeometricPlate(geometricFixture), true);
  assert.equal(isAutoGeometricPlate({ ...geometricFixture, motif: { repeatPleats: 8, elements: [], instructions: [] } }), false);
  assert.equal(isAutoGeometricPlate({ ...geometricFixture, pictureChart: { grid: ["........"], legend: {} } }), false);
});

test("derived geometric content satisfies the reusable chapter contract", () => {
  const content = deriveGeometricChapterContent(geometricFixture);
  assert.deepEqual(validatePlateChapterContent(content), []);
  assert.match(content.motifExplanation, /trellis/i);
  assert.match(content.repeatGuidance.join(" "), /8 pleats/i);
});

const motifFixture = {
  ...geometricFixture,
  slug: "test-motif",
  repeatPleats: 8,
  embroideryStitches: ["French knot"],
  motif: {
    repeatPleats: 8,
    instructions: ["Work the stem.", "Add the knot."],
    elements: [
      { kind: "line", stitch: "stem", threadId: "a", points: [[.1, .8], [.9, .2]] },
      { kind: "knot", stitch: "french-knot", threadId: "a", at: [.5, .4], wraps: 2 },
    ],
  },
} as PlateMeta;

test("motif plates opt into the embroidery chapter but picture charts do not", () => {
  assert.equal(isAutoMotifPlate(motifFixture), true);
  assert.equal(isAutoMotifPlate({ ...motifFixture, pictureChart: { grid: ["........"], legend: {} } }), false);
  assert.equal(isAutoGeometricPlate(motifFixture), false);
});

test("derived motif content separates structural and surface-embroidery work", () => {
  const content = deriveMotifChapterContent(motifFixture);
  assert.deepEqual(validatePlateChapterContent(content), []);
  assert.match(content.overview, /surface|embroidery/i);
  assert.match(content.sequenceNote, /separate embroidery sequence/i);
});
