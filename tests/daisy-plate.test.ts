import assert from "node:assert/strict";
import test from "node:test";
import { clampSequenceStep, daisyPlate } from "../src/lib/smocking-plate-chapters.ts";

test("Daisy chapter retains the eight working rows and a complete teaching repeat", () => {
  assert.deepEqual(daisyPlate.workingRows, [1, 2, 3, 4, 5, 6, 7, 8]);
  assert.equal(daisyPlate.repeatWidth, 8);
  assert.equal(daisyPlate.stitchSequence.length, 8);
});

test("every sequence step has a valid current and destination position", () => {
  for (const step of daisyPlate.stitchSequence) {
    assert.ok(step.row >= 1 && step.row <= daisyPlate.pleaterRows);
    assert.ok(step.pleat >= 1 && step.pleat <= daisyPlate.repeatWidth);
    assert.ok(step.to[1] >= 1 && step.to[1] <= daisyPlate.pleaterRows);
    assert.ok(step.to[0] >= 1 && step.to[0] <= daisyPlate.repeatWidth + 1);
  }
});

test("sequence controls clamp at both ends", () => {
  assert.equal(clampSequenceStep(-1, 8), 0);
  assert.equal(clampSequenceStep(3.9, 8), 3);
  assert.equal(clampSequenceStep(99, 8), 7);
  assert.equal(clampSequenceStep(2, 0), 0);
});

test("accuracy-sensitive interpretations remain explicitly labeled", () => {
  assert.ok(daisyPlate.rowInstructions.some((row) => row.sourceConfidence === "interpreted"));
  assert.ok(daisyPlate.interpretationNotes.length >= 3);
  assert.match(daisyPlate.interpretationNotes.join(" "), /quarter-row|fractional-row/i);
});
