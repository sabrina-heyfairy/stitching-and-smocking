import assert from "node:assert/strict";
import test from "node:test";
import { plateChapterContent, validatePlateChapterContent } from "../src/lib/plate-chapter-content.ts";

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
