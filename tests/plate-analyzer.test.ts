import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { isPlateAnalysis, MAX_PLATE_IMAGE_BYTES, validatePlateImage } from "../src/lib/plate-analyzer.ts";

test("plate uploads accept supported image formats under the size limit", () => {
  for (const type of ["image/jpeg", "image/png", "image/webp"]) {
    assert.equal(validatePlateImage({ type, size: 1024 }), null);
  }
});

test("plate uploads reject unsupported formats and oversized images", () => {
  assert.match(validatePlateImage({ type: "image/heic", size: 1024 }) || "", /JPG, PNG, or WebP/);
  assert.match(validatePlateImage({ type: "image/png", size: MAX_PLATE_IMAGE_BYTES + 1 }) || "", /10 MB/);
});

test("analysis response guard requires the UI's collection fields", () => {
  const fixture = {
    isSmockingPlate: true, confidence: "medium", title: "Plate", overview: "Overview",
    rowsToPleat: 8, workingRows: ["1", "2"], repeatPleats: 8, minimumPleats: 18,
    recommendedExtraPleats: 2, startingPoint: "Left edge", stitches: [], preparation: [],
    steps: [], trackingTips: [], uncertainties: [],
  };
  assert.equal(isPlateAnalysis(fixture), true);
  assert.equal(isPlateAnalysis({ ...fixture, steps: undefined }), false);
});

test("Worker keeps the API key server-side and requests structured output", () => {
  const worker = readFileSync(new URL("../worker/src/index.js", import.meta.url), "utf8");
  assert.match(worker, /env\.OPENAI_API_KEY/);
  assert.match(worker, /https:\/\/api\.openai\.com\/v1\/responses/);
  assert.match(worker, /type: "json_schema"/);
  assert.match(worker, /detail: "high"/);
  assert.match(worker, /turnstile\/v0\/siteverify/);
  assert.match(worker, /env\.TURNSTILE_SECRET_KEY/);
  assert.match(worker, /env\.ALLOWED_ORIGINS/);
  assert.match(worker, /parseAllowedOrigins/);
  assert.doesNotMatch(worker, /sk-[A-Za-z0-9]/);
});

test("Worker configuration preserves GitHub Pages and allows Sewist Studio", () => {
  const config = readFileSync(new URL("../worker/wrangler.toml", import.meta.url), "utf8");
  assert.match(config, /https:\/\/sabrina-heyfairy\.github\.io/);
  assert.match(config, /https:\/\/sewist\.studio/);
});
