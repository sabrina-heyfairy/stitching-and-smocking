import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const home = readFileSync(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const learn = readFileSync(new URL("../src/app/learn/page.tsx", import.meta.url), "utf8");
const footer = readFileSync(new URL("../src/components/Footer.tsx", import.meta.url), "utf8");

test("learner-facing navigation does not expose editorial completion language", () => {
  assert.doesNotMatch(home, /Publication-quality|Completed stitches|chapters complete/i);
  assert.match(home, /Smocking stitch guides/);
});

test("the global footer does not privilege Cable over the other stitches", () => {
  assert.doesNotMatch(footer, /stitches\/cable-stitch/);
  assert.match(footer, /Stitch encyclopedia/);
});

test("each practice step title and description links to its primary lesson", () => {
  assert.match(learn, /href=\{step\.links\[0\]\.href\}/);
  assert.match(learn, /Open lesson/);
});
