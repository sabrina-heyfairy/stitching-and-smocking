import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const page = readFileSync(new URL("../src/app/embroidery/motifs/page.tsx", import.meta.url), "utf8");

test("decorative guide teaches a complete bullion rose from center outward", () => {
  assert.match(page, /How to make a bullion rose/);
  assert.match(page, /Work from the center outward/);
  assert.match(page, /Step \{index \+ 1\}/);
  assert.match(page, /Rose looks like a wheel/);
});

test("decorative guide links every surface embroidery chapter", () => {
  for (const slug of [
    "bullion",
    "french-knot",
    "lazy-daisy",
    "feather-stitch",
    "stem-embroidery",
    "outline-embroidery",
    "satin-stitch",
    "back-stitch",
    "chain-stitch",
    "blanket-stitch",
    "running-stitch",
  ]) {
    assert.match(page, new RegExp(`/embroidery/${slug}/`));
  }
});

test("decorative guide keeps embroidery on stable fabric around smocking", () => {
  assert.match(page, /Finish the structural smocking first/);
  assert.match(page, /stable flat fabric/);
});

test("decorative guide distinguishes extra stitches from heirloom construction", () => {
  for (const technique of ["Cast-on rose", "Granito", "Woven-wheel rose", "Worked eyelet", "Shadow work"]) {
    assert.match(page, new RegExp(technique));
  }
  for (const construction of ["Entredeux", "Lace insertion", "Pin tucks", "Hemstitching", "Madeira-style appliqué"]) {
    assert.match(page, new RegExp(construction));
  }
  assert.match(page, /do not yet have full interactive chapters/);
});
