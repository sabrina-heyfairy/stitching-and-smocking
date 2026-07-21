import type { PlateMeta } from "./plate-types";
import { cellKey } from "./plate-types";

const dusty = "#6b8a9e";
const burgundy = "#7a3f45";
const sage = "#7a8f6e";
const gold = "#c4a35a";
const teal = "#5a7a78";

function fillRow(
  cells: Record<string, PlateMeta["cells"][string]>,
  row: number,
  pleats: number,
  kind: Exclude<PlateMeta["cells"][string]["kind"], "empty">,
  color: string,
  start = 1,
  end?: number,
) {
  const last = end ?? pleats;
  for (let p = start; p <= last; p++) {
    cells[cellKey(row, p)] = { kind, color };
  }
}

/** Wave of 4 pattern across a span: ascend then descend between two rows. */
function fillWaveBand(
  cells: Record<string, PlateMeta["cells"][string]>,
  lowerRow: number,
  upperRow: number,
  pleats: number,
  color: string,
  startPleat = 1,
) {
  for (let p = startPleat; p <= pleats; p++) {
    const pos = (p - startPleat) % 8;
    if (pos <= 4) {
      // climbing / peak — mark on upper proportionally via wave-up/down tags
      if (pos === 0) cells[cellKey(lowerRow, p)] = { kind: "wave-up", color };
      else if (pos === 4) cells[cellKey(upperRow, p)] = { kind: "wave-up", color };
      else cells[cellKey(pos < 4 ? lowerRow : upperRow, p)] = { kind: "wave-up", color };
      // For mid steps, put on both conceptually — use single cell on interpolated row label
      if (pos === 1 || pos === 2 || pos === 3) {
        cells[cellKey(lowerRow, p)] = { kind: "wave-up", color };
        if (pos >= 2) cells[cellKey(upperRow, p)] = { kind: "wave-up", color };
      }
    } else {
      cells[cellKey(upperRow, p)] = { kind: "wave-down", color };
      if (pos >= 6) cells[cellKey(lowerRow, p)] = { kind: "wave-down", color };
      if (pos === 7 || pos === 0) cells[cellKey(lowerRow, p)] = { kind: "wave-down", color };
    }
  }
}

function honeycombField(
  cells: Record<string, PlateMeta["cells"][string]>,
  rowA: number,
  rowB: number,
  pleats: number,
  color: string,
  start = 1,
) {
  for (let p = start; p < pleats; p++) {
    const odd = (p - start) % 2 === 0;
    cells[cellKey(odd ? rowA : rowB, p)] = { kind: "honeycomb", color };
    cells[cellKey(odd ? rowA : rowB, p + 1)] = { kind: "honeycomb", color };
  }
}

export const plates: PlateMeta[] = [
  {
    slug: "cable-borders",
    title: "Cable Borders",
    subtitle: "Two control cables with open field",
    difficulty: "beginner",
    garments: ["bishop practice strip", "yoke sample", "bonnet band"],
    rows: 5,
    pleats: 24,
    repeatPleats: 1,
    threads: [
      { id: "a", name: "Dusty blue", hex: dusty, note: "Floche or perle #8" },
    ],
    stitchesUsed: ["cable-stitch"],
    description:
      "The first plate every smocker should master: a cable on the top gathering row and a cable on the bottom, with three empty rows between for later decoration.",
    instructions: [
      "Pleat a sample at least 24 pleats wide and 5 gathering rows deep.",
      "Work a cable across row 1 (top), left to right, ideal tension.",
      "Skip rows 2–4 entirely.",
      "Work a matching cable across row 5 (bottom).",
      "Check that mountains stay round and both cables sit centered on their rows.",
    ],
    tips: [
      "Use this plate to calibrate tension before any decorative field.",
      "Keep both cables in the same thread and stitch length.",
    ],
    cells: (() => {
      const cells: PlateMeta["cells"] = {};
      fillRow(cells, 1, 24, "cable", dusty);
      fillRow(cells, 5, 24, "cable", dusty);
      return cells;
    })(),
  },
  {
    slug: "wave-between-cables",
    title: "Wave Between Cables",
    subtitle: "Classic beginner bishop band",
    difficulty: "beginner",
    garments: ["children's bishop", "day gown yoke", "sleeve band"],
    rows: 6,
    pleats: 24,
    repeatPleats: 8,
    threads: [
      { id: "border", name: "Burgundy cable", hex: burgundy, note: "Borders" },
      { id: "wave", name: "Dusty blue wave", hex: dusty, note: "Field" },
    ],
    stitchesUsed: ["cable-stitch", "wave-stitch"],
    description:
      "Cable borders framing a single wave-of-4 band — the workhorse plate for children’s bishops.",
    instructions: [
      "Cable across row 1 in burgundy.",
      "On rows 3–4, work a wave of 4 in dusty blue: climb to row 3 peak, descend to row 4 trough, repeat.",
      "Keep ascent and descent counts equal (4 and 4).",
      "Cable across row 6 in burgundy to close the band.",
      "Leave rows 2 and 5 empty as breathing space.",
    ],
    tips: [
      "Center the first peak on a marked center pleat for mirror symmetry.",
      "If peaks miss row 3, your vertical steps are too small — see Wave Stitch chapter.",
    ],
    cells: (() => {
      const cells: PlateMeta["cells"] = {};
      fillRow(cells, 1, 24, "cable", burgundy);
      fillRow(cells, 6, 24, "cable", burgundy);
      fillWaveBand(cells, 4, 3, 24, dusty);
      return cells;
    })(),
  },
  {
    slug: "classic-trellis",
    title: "Classic Trellis",
    subtitle: "Mirror waves forming diamonds",
    difficulty: "intermediate",
    garments: ["heirloom bishop", "christening yoke", "special-occasion yoke"],
    rows: 7,
    pleats: 24,
    repeatPleats: 8,
    threads: [
      { id: "cable", name: "Soft gold cable", hex: gold },
      { id: "trellis", name: "Muted teal trellis", hex: teal },
    ],
    stitchesUsed: ["cable-stitch", "wave-stitch", "trellis"],
    description:
      "Cable frame with a trellis field: an upper wave and its mirror meeting in diamonds — the most recognizable English smocking motif.",
    instructions: [
      "Cable rows 1 and 7 in soft gold.",
      "Work the upper wave across rows 3–4 in muted teal (wave of 4).",
      "Work the mirror wave across rows 4–5 so peaks/troughs share vertices with the first wave on row 4.",
      "Confirm diamonds close before continuing the full width.",
      "Leave row 2 and 6 empty beside the cables.",
    ],
    tips: [
      "Study the Trellis chapter before this plate — mirror logic is everything.",
      "Mark shared vertices lightly until the rhythm is automatic.",
    ],
    cells: (() => {
      const cells: PlateMeta["cells"] = {};
      fillRow(cells, 1, 24, "cable", gold);
      fillRow(cells, 7, 24, "cable", gold);
      fillWaveBand(cells, 4, 3, 24, teal);
      // mirror band rows 4-5
      for (let p = 1; p <= 24; p++) {
        const pos = (p - 1) % 8;
        if (pos === 0 || pos === 7) cells[cellKey(4, p)] = { kind: "trellis", color: teal };
        else if (pos === 4) cells[cellKey(5, p)] = { kind: "trellis", color: teal };
        else if (pos < 4) cells[cellKey(4, p)] = { kind: "trellis", color: teal };
        else cells[cellKey(5, p)] = { kind: "trellis", color: teal };
      }
      return cells;
    })(),
  },
  {
    slug: "honeycomb-yoke",
    title: "Honeycomb Yoke",
    subtitle: "Elastic center with cable frame",
    difficulty: "intermediate",
    garments: ["bishop center", "comfortable yoke", "sleeve insert"],
    rows: 6,
    pleats: 24,
    repeatPleats: 2,
    threads: [
      { id: "cable", name: "Burgundy cable", hex: burgundy },
      { id: "honey", name: "Sage honeycomb", hex: sage },
    ],
    stitchesUsed: ["cable-stitch", "honeycomb"],
    description:
      "Cable borders with a staggered honeycomb field for give across the chest — classic comfort plate.",
    instructions: [
      "Cable row 1 and row 6 in burgundy.",
      "On rows 3–4, work classic honeycomb in sage: bind pairs on the lower row, travel up, bind on the upper, travel down.",
      "Keep the stagger true — never stack binds on the same two mountains on both rows.",
      "Ease the panel sideways after a few repeats to confirm cells open.",
      "Leave rows 2 and 5 empty.",
    ],
    tips: [
      "Softer tension than cable — cells need room to bloom.",
      "See Honeycomb Stitch chapter if cells stay sealed.",
    ],
    cells: (() => {
      const cells: PlateMeta["cells"] = {};
      fillRow(cells, 1, 24, "cable", burgundy);
      fillRow(cells, 6, 24, "cable", burgundy);
      honeycombField(cells, 4, 3, 24, sage);
      return cells;
    })(),
  },
  {
    slug: "outline-and-stem-bands",
    title: "Outline & Stem Bands",
    subtitle: "Smooth cord and twisted rope practice",
    difficulty: "beginner",
    garments: ["sampler", "collar band", "bonnet front"],
    rows: 5,
    pleats: 20,
    repeatPleats: 1,
    threads: [
      { id: "outline", name: "Dusty blue outline", hex: dusty },
      { id: "stem", name: "Burgundy stem", hex: burgundy },
    ],
    stitchesUsed: ["outline-stitch", "stem-stitch-smocking"],
    description:
      "Side-by-side single-row cords so you can feel the difference: outline (smooth) vs stem (twisted rope).",
    instructions: [
      "Work outline stitch across row 2 in dusty blue — thread below the needle, L→R.",
      "Work stem stitch across row 4 in burgundy — needle always on the same side of the thread.",
      "Compare the two finished cords: braid-smooth vs rope-twist.",
      "Optional: add light cables on rows 1 and 5 later as a frame.",
    ],
    tips: [
      "Do not confuse these with surface embroidery stem/outline on flat fabric.",
      "If stem looks like cable, you started alternating — restart with consistent needle side.",
    ],
    cells: (() => {
      const cells: PlateMeta["cells"] = {};
      fillRow(cells, 2, 20, "outline", dusty);
      fillRow(cells, 4, 20, "stem", burgundy);
      return cells;
    })(),
  },
  {
    slug: "van-dyke-accent",
    title: "Van Dyke Accent",
    subtitle: "Dramatic chevron between cables",
    difficulty: "advanced",
    garments: ["christening", "heirloom bishop", "exhibition sampler"],
    rows: 6,
    pleats: 24,
    repeatPleats: 8,
    threads: [
      { id: "cable", name: "Gold cable", hex: gold },
      { id: "vd", name: "Burgundy Van Dyke", hex: burgundy },
    ],
    stitchesUsed: ["cable-stitch", "van-dyke", "wave-stitch"],
    description:
      "Cable frame with a Van Dyke chevron field — pair-binds at every peak and valley for a bold heirloom accent.",
    instructions: [
      "Cable rows 1 and 6 in gold.",
      "Across rows 3–4, work Van Dyke: diagonal travel like a wave, but catch two pleats together at each peak and each trough.",
      "Keep bind depth to the top third of both mountains in the pair.",
      "If it reads as plain wave, you skipped the catches — see Van Dyke chapter.",
    ],
    tips: [
      "Sample on scrap before a christening yoke.",
      "Slightly firmer tension at binds; ease on the diagonal travels.",
    ],
    cells: (() => {
      const cells: PlateMeta["cells"] = {};
      fillRow(cells, 1, 24, "cable", gold);
      fillRow(cells, 6, 24, "cable", gold);
      for (let p = 1; p <= 24; p++) {
        const pos = (p - 1) % 8;
        if (pos === 0 || pos === 7) cells[cellKey(4, p)] = { kind: "van-dyke", color: burgundy };
        else if (pos === 4) cells[cellKey(3, p)] = { kind: "van-dyke", color: burgundy };
        else if (pos < 4) cells[cellKey(3, p)] = { kind: "van-dyke", color: burgundy };
        else cells[cellKey(4, p)] = { kind: "van-dyke", color: burgundy };
      }
      return cells;
    })(),
  },
  {
    slug: "baby-bishop-starter",
    title: "Baby Bishop Starter",
    subtitle: "Narrow three-row teaching plate",
    difficulty: "beginner",
    garments: ["newborn bishop", "doll dress", "practice band"],
    rows: 4,
    pleats: 16,
    repeatPleats: 8,
    threads: [
      { id: "a", name: "Sage", hex: sage, note: "All rows same color for clarity" },
    ],
    stitchesUsed: ["cable-stitch", "wave-stitch"],
    description:
      "A short, narrow plate for tiny garments and first full projects: cable, baby wave, cable.",
    instructions: [
      "Cable row 1.",
      "Wave of 2 (baby wave) across rows 2–3.",
      "Cable row 4.",
      "Keep tension gentle — newborn bishops need softness more than drama.",
    ],
    tips: [
      "16 pleats is a teaching width; scale repeat to your neckline after sampling compression.",
    ],
    cells: (() => {
      const cells: PlateMeta["cells"] = {};
      fillRow(cells, 1, 16, "cable", sage);
      fillRow(cells, 4, 16, "cable", sage);
      for (let p = 1; p <= 16; p++) {
        const pos = (p - 1) % 4;
        if (pos === 0 || pos === 3) cells[cellKey(3, p)] = { kind: "wave-down", color: sage };
        else cells[cellKey(2, p)] = { kind: "wave-up", color: sage };
      }
      return cells;
    })(),
  },
];

export function getPlate(slug: string): PlateMeta | undefined {
  return plates.find((p) => p.slug === slug);
}

export function filterPlates(opts: {
  difficulty?: string;
  q?: string;
}): PlateMeta[] {
  const q = opts.q?.toLowerCase().trim();
  return plates.filter((p) => {
    if (opts.difficulty && p.difficulty !== opts.difficulty) return false;
    if (q) {
      const hay = `${p.title} ${p.subtitle} ${p.description} ${p.garments.join(" ")} ${p.stitchesUsed.join(" ")}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}
