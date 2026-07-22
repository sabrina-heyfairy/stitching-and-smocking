import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const pictureSource = readFileSync(new URL("../src/lib/picture-plates.ts", import.meta.url), "utf8");
const geometricSource = readFileSync(new URL("../src/lib/expanded-plates.ts", import.meta.url), "utf8");

const newPictureSlugs = [
  "elephant-promenade", "little-lamb-row", "christening-crosses", "hello-ducklings",
  "mitten-kitten-row", "santa-sleigh-parade", "jolly-santa-row", "rudolph-reindeer-row",
  "gingerbread-bakery", "evergreen-tree-row", "holiday-station-wagon", "nutcracker-guards",
  "midnight-princess", "merry-mermaid", "birthday-cupcakes", "posy-bouquets",
  "little-poodle-parade", "bonnet-garden-girl", "pansy-bloom-row", "butterfly-meadow",
  "blooming-rose-row", "pirate-ship-adventure", "little-car-parade", "traffic-signal-row",
  "happy-hippo-row",
];

test("all 25 new roundup themes are present as original picture plates", () => {
  for (const slug of newPictureSlugs) assert.match(pictureSource, new RegExp(`slug: ["']${slug}["']`), slug);
});

test("picture catalog validates chart shape, symbols, attribution, and unique slugs", () => {
  assert.match(pictureSource, /chart rows must be 32 stitches wide/);
  assert.match(pictureSource, /unmapped chart character/);
  assert.match(pictureSource, /missing source or theme-reference note/);
  assert.match(pictureSource, /duplicate slug/);
});

test("the geometric roundup contributes six newly generated teaching plates", () => {
  assert.equal(geometricSource.match(/category: "Roundup-Inspired Geometrics"/g)?.length, 6);
  assert.match(geometricSource, /pinkhollybushdesigns\.com\/post\/free-geometric-smocking-plates/);
  assert.match(geometricSource, /newly generated course geometry/);
});
