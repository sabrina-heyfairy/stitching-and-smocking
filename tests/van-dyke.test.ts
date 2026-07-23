import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const courseSource = readFileSync(new URL("../src/lib/plate-courses.ts", import.meta.url), "utf8");
const chapter = readFileSync(new URL("../src/components/chapters/VanDykeStitchChapter.tsx", import.meta.url), "utf8");
const illustration = readFileSync(new URL("../src/components/illustrations/VanDykeStitch.tsx", import.meta.url), "utf8");

test("Van Dyke courses work right to left using adjacent old/new pairs", () => {
  assert.match(courseSource, /direction: "right-to-left"/);
  assert.match(courseSource, /const pair: \[number, number\] = \[newPleat, oldPleat\]/);
  assert.match(courseSource, /newPleat = oldPleat - 1/);
});

test("every generated Van Dyke travel is followed by a lock through the same pair", () => {
  const vanDykeBody = courseSource.slice(courseSource.indexOf("function vanDyke("), courseSource.indexOf("function cable("));
  assert.match(vanDykeBody, /role: "travel"[\s\S]*?bind: pair[\s\S]*?role: "lock"[\s\S]*?bind: pair/);
});

test("Van Dyke teaching copy states the old-new-same-pair invariant", () => {
  assert.match(chapter, /travel through old \+ new, lock the same pair/i);
  assert.match(chapter, /right-handed smocker normally works right to left/i);
  assert.match(illustration, /Only a traveling stitch introduces a new pleat/i);
  assert.doesNotMatch(chapter, /pair-binding at every turn/i);
});
