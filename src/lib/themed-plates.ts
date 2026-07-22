import type { MotifElement, PlateMeta, PlateMotif, PlateStitchRef } from "./plate-types";
import type { Difficulty } from "./types";
import { PLATE_COLORWAYS } from "./plate-colorways";

interface ThemeSeed {
  slug: string;
  title: string;
  subtitle: string;
  category: "Geometric Collection" | "Floral Collection" | "Christmas Collection";
  difficulty: Difficulty;
  rows: number;
  pleats: number;
  repeatPleats: number;
  garments: string[];
  stitchesUsed: PlateStitchRef[];
  embroideryStitches?: string[];
  description: string;
  foundation: string;
  motif?: PlateMotif;
}

const line = (
  stitch: "stem" | "back" | "chain" | "straight",
  threadId: string,
  points: readonly (readonly [number, number])[],
  closed = false,
): MotifElement => ({ kind: "line", stitch, threadId, points: [...points], closed });
const loop = (
  threadId: string,
  from: readonly [number, number],
  to: readonly [number, number],
  width = .06,
): MotifElement => ({ kind: "loop", stitch: "detached-chain", threadId, from, to, width });
const knot = (threadId: string, at: readonly [number, number], wraps: 1 | 2 | 3 = 2): MotifElement =>
  ({ kind: "knot", stitch: "french-knot", threadId, at, wraps });
const bullion = (
  threadId: string,
  from: readonly [number, number],
  to: readonly [number, number],
  wraps: number,
): MotifElement => ({ kind: "bullion", stitch: "bullion", threadId, from, to, wraps });
const fill = (threadId: string, points: readonly (readonly [number, number])[]): MotifElement =>
  ({ kind: "fill", stitch: "satin", threadId, points: [...points] });

const seeds: ThemeSeed[] = [
  {
    slug: "opposed-chevron-rails", title: "Opposed Chevron Rails",
    subtitle: "Mirrored waves around a center control cable", category: "Geometric Collection",
    difficulty: "intermediate", rows: 9, pleats: 33, repeatPleats: 8,
    garments: ["deep yoke", "sampler", "bishop"], stitchesUsed: ["cable-stitch", "wave-stitch"],
    description: "Two broad wave rails move in opposite directions around a straight center cable.",
    foundation: "Cable rows 1, 5, and 9; work opposed three-step waves across rows 2–4 and 6–8.",
  },
  {
    slug: "nested-diamond-trellis", title: "Nested Diamond Trellis",
    subtitle: "Small diamonds inside a broad trellis field", category: "Geometric Collection",
    difficulty: "advanced", rows: 9, pleats: 25, repeatPleats: 24,
    garments: ["heirloom yoke", "sampler panel", "exhibition piece"], stitchesUsed: ["cable-stitch", "trellis"],
    description: "A broad three-step diamond field surrounds a smaller two-step trellis on the same center line.",
    foundation: "Cable rows 1 and 9; work the outer trellis from row 5 to rows 2 and 8, then the inner trellis from row 5 to rows 3.5 and 6.5.",
  },
  {
    slug: "crossed-wave-lattice", title: "Crossed Wave Lattice",
    subtitle: "Opposed stepped waves forming a rhythmic lattice", category: "Geometric Collection",
    difficulty: "intermediate", rows: 7, pleats: 33, repeatPleats: 8,
    garments: ["bishop", "dress yoke", "practice panel"], stitchesUsed: ["cable-stitch", "wave-stitch"],
    description: "Two three-step wave courses cross between shared upper and lower rails to form a simple lattice.",
    foundation: "Cable rows 1 and 7; work one three-step wave from row 5 to row 3 and a second course beginning on the opposite rail.",
  },
  {
    slug: "surface-honeycomb-grid", title: "Surface Honeycomb Grid",
    subtitle: "Two visible-carry honeycomb tiers", category: "Geometric Collection",
    difficulty: "intermediate", rows: 8, pleats: 33, repeatPleats: 2,
    garments: ["modern yoke", "cuff panel", "sampler"], stitchesUsed: ["cable-stitch", "surface-honeycomb"],
    description: "Two surface-honeycomb tiers expose their vertical carries to create a regular stitched grid.",
    foundation: "Cable rows 1, 4, and 8; work surface honeycomb across rows 2–3 and rows 6–7.",
  },
  {
    slug: "bullion-rose-arbor", title: "Bullion Rose Arbor",
    subtitle: "Bullion roses and lazy-daisy leaves over a wave band", category: "Floral Collection",
    difficulty: "advanced", rows: 7, pleats: 25, repeatPleats: 8,
    garments: ["heirloom bishop", "christening yoke", "sampler"], stitchesUsed: ["cable-stitch", "wave-stitch"],
    embroideryStitches: ["Stem stitch", "Bullion", "Lazy daisy", "Straight stitch"],
    description: "A charted bullion rose and leaf arbor repeats above a stable three-step wave foundation.",
    foundation: "Cable rows 1 and 7; work a three-step wave across rows 5–6 before adding surface embroidery.",
    motif: {
      repeatPleats: 8,
      instructions: ["Work the stem first.", "Add the three bullion coils from largest to smallest.", "Finish with detached-chain leaves and straight-stitch sepals."],
      elements: [
        line("stem", "foliage", [[.08,.72],[.26,.54],[.50,.48],[.74,.54],[.92,.72]]),
        bullion("flower", [.39,.34], [.61,.34], 10),
        bullion("flower", [.42,.28], [.58,.27], 8),
        bullion("accent", [.46,.34], [.56,.30], 6),
        loop("foliage", [.28,.54], [.17,.38], .07),
        loop("foliage", [.72,.54], [.83,.38], .07),
        line("straight", "foliage", [[.50,.39],[.44,.46]]),
        line("straight", "foliage", [[.50,.39],[.50,.47]]),
        line("straight", "foliage", [[.50,.39],[.56,.46]]),
      ],
    },
  },
  {
    slug: "bluebells-in-diamonds", title: "Bluebells in Open Diamonds",
    subtitle: "Bluebell sprigs centered in trellis medallions", category: "Floral Collection",
    difficulty: "advanced", rows: 7, pleats: 33, repeatPleats: 8,
    garments: ["special-occasion yoke", "bishop", "sampler"], stitchesUsed: ["cable-stitch", "trellis"],
    embroideryStitches: ["Stem stitch", "Lazy daisy", "French knot"],
    description: "Each open trellis diamond contains a fully charted three-bloom bluebell sprig.",
    foundation: "Cable rows 1 and 7; complete the three-step trellis around row 4 before embroidering inside each diamond.",
    motif: {
      repeatPleats: 8,
      instructions: ["Stem the central stalk.", "Work three detached-chain bells.", "Add leaves, then one-wrap knots at the bell mouths."],
      elements: [
        line("stem", "foliage", [[.50,.72],[.48,.56],[.51,.39],[.49,.27]]),
        loop("flower", [.48,.40], [.32,.53], .06), loop("flower", [.50,.36], [.50,.54], .06),
        loop("flower", [.51,.41], [.68,.54], .06),
        loop("foliage", [.49,.60], [.34,.70], .055), loop("foliage", [.50,.64], [.66,.73], .055),
        knot("accent", [.32,.55], 1), knot("accent", [.50,.56], 1), knot("accent", [.68,.56], 1),
      ],
    },
  },
  {
    slug: "twin-daisy-garland", title: "Twin Daisy Garland",
    subtitle: "Two lazy-daisy blooms on a stemmed garland", category: "Floral Collection",
    difficulty: "intermediate", rows: 6, pleats: 25, repeatPleats: 8,
    garments: ["girl’s yoke", "bonnet band", "sampler"], stitchesUsed: ["outline-stitch", "wave-stitch"],
    embroideryStitches: ["Stem stitch", "Lazy daisy", "French knot"],
    description: "A pair of five-petal daisies follows a shallow garland above an outline-framed baby wave.",
    foundation: "Outline rows 1 and 6; work a baby wave across rows 4–5, leaving the upper field for the garland.",
    motif: {
      repeatPleats: 8,
      instructions: ["Stem the garland.", "Work five detached-chain petals around each marked center.", "Finish each flower with a two-wrap French knot."],
      elements: [
        line("stem", "foliage", [[.05,.45],[.25,.56],[.50,.47],[.75,.58],[.95,.45]]),
        ...[[.30,.35],[.70,.39]].flatMap(([x,y]) => [
          loop("flower", [x,y], [x-.11,y], .05), loop("flower", [x,y], [x-.04,y-.13], .05),
          loop("flower", [x,y], [x+.09,y-.10], .05), loop("flower", [x,y], [x+.10,y+.08], .05),
          loop("flower", [x,y], [x-.04,y+.12], .05), knot("accent", [x,y], 2),
        ]),
      ],
    },
  },
  {
    slug: "pomegranate-sprig", title: "Pomegranate Sprig",
    subtitle: "Outlined fruit, satin crown, and detached-chain leaves", category: "Floral Collection",
    difficulty: "advanced", rows: 7, pleats: 25, repeatPleats: 8,
    garments: ["heirloom yoke", "sampler", "adult collar"], stitchesUsed: ["cable-stitch", "stem-stitch-smocking"],
    embroideryStitches: ["Stem stitch", "Back stitch", "Satin stitch", "Lazy daisy"],
    description: "An outlined pomegranate avoids a heavy fill while preserving a traditional botanical silhouette.",
    foundation: "Cable row 1 and stem-smocking row 7 stabilize an open field for the surface sprig.",
    motif: {
      repeatPleats: 8,
      instructions: ["Stem the branch.", "Back stitch the closed fruit outline.", "Add the satin crown and detached-chain leaves."],
      elements: [
        line("stem", "foliage", [[.10,.82],[.30,.64],[.50,.53],[.75,.31],[.90,.18]]),
        line("back", "flower", [[.38,.62],[.33,.50],[.37,.35],[.50,.28],[.63,.35],[.67,.50],[.61,.62]], true),
        fill("accent", [[.42,.34],[.46,.21],[.50,.31]]), fill("accent", [[.50,.31],[.55,.20],[.59,.35]]),
        loop("foliage", [.65,.42], [.79,.49], .06), loop("foliage", [.73,.32], [.84,.21], .06),
        knot("accent", [.45,.45], 1), knot("accent", [.52,.40], 1), knot("accent", [.58,.49], 1),
      ],
    },
  },
  {
    slug: "holly-cable-garland", title: "Holly Cable Garland",
    subtitle: "Holly leaves and French-knot berries", category: "Christmas Collection",
    difficulty: "intermediate", rows: 7, pleats: 25, repeatPleats: 8,
    garments: ["Christmas bishop", "holiday yoke", "bonnet"], stitchesUsed: ["cable-stitch", "wave-stitch"],
    embroideryStitches: ["Stem stitch", "Back stitch", "Straight stitch", "French knot"],
    description: "A repeatable holly cluster follows a curved stem above a three-step wave.",
    foundation: "Cable rows 1 and 7; work a three-step wave across rows 5–6 before adding the holly garland.",
    motif: {
      repeatPleats: 8,
      instructions: ["Stem the garland.", "Back stitch both serrated leaves and their veins.", "Add three two-wrap berry knots."],
      elements: [
        line("stem", "foliage", [[.06,.72],[.28,.55],[.50,.60],[.72,.55],[.94,.72]]),
        line("back", "foliage", [[.47,.57],[.34,.49],[.28,.37],[.39,.39],[.34,.27],[.47,.35],[.51,.52]], true),
        line("back", "foliage", [[.53,.57],[.66,.49],[.72,.37],[.61,.39],[.66,.27],[.53,.35],[.49,.52]], true),
        line("straight", "accent", [[.50,.55],[.37,.36]]), line("straight", "accent", [[.50,.55],[.63,.36]]),
        knot("berry", [.46,.58], 2), knot("berry", [.52,.55], 2), knot("berry", [.56,.62], 2),
      ],
    },
  },
  {
    slug: "candlelight-diamonds", title: "Candlelight Diamonds",
    subtitle: "Satin flames centered in trellis windows", category: "Christmas Collection",
    difficulty: "advanced", rows: 7, pleats: 25, repeatPleats: 8,
    garments: ["Christmas yoke", "church dress", "sampler"], stitchesUsed: ["cable-stitch", "trellis"],
    embroideryStitches: ["Back stitch", "Satin stitch", "Stem stitch", "Straight stitch"],
    description: "Each trellis window frames a narrow candle with a satin-stitched flame.",
    foundation: "Cable rows 1 and 7; complete the three-step trellis around row 4 before filling each window.",
    motif: {
      repeatPleats: 8,
      instructions: ["Back stitch the candle outline.", "Fill the candle and flame with narrow satin stitches.", "Add the wick and three straight rays."],
      elements: [
        line("back", "candle", [[.43,.72],[.43,.42],[.57,.42],[.57,.72]], true),
        fill("candle", [[.45,.70],[.45,.45],[.55,.45],[.55,.70]]),
        line("stem", "accent", [[.50,.42],[.50,.36]]),
        fill("flame", [[.50,.16],[.43,.29],[.50,.38],[.57,.29]]),
        line("straight", "accent", [[.50,.13],[.50,.06]]),
        line("straight", "accent", [[.40,.22],[.32,.15]]), line("straight", "accent", [[.60,.22],[.68,.15]]),
      ],
    },
  },
  {
    slug: "snowflake-trellis-medallions", title: "Snowflake Trellis Medallions",
    subtitle: "Six-ray snowflakes inside open diamonds", category: "Christmas Collection",
    difficulty: "intermediate", rows: 7, pleats: 33, repeatPleats: 8,
    garments: ["winter bishop", "holiday yoke", "sampler"], stitchesUsed: ["cable-stitch", "trellis"],
    embroideryStitches: ["Straight stitch", "French knot"],
    description: "A six-ray snowflake is charted inside every trellis diamond with a knotted center.",
    foundation: "Cable rows 1 and 7; complete the three-step trellis around row 4 before adding snowflakes.",
    motif: {
      repeatPleats: 8,
      instructions: ["Make the center knot.", "Work six equal straight-stitch rays.", "Add short branches near the end of each ray."],
      elements: [
        knot("snow", [.50,.50], 2),
        ...[[.50,.25],[.72,.37],[.72,.63],[.50,.75],[.28,.63],[.28,.37]].map((tip) =>
          line("straight", "snow", [[.50,.50], tip as [number, number]])),
        line("straight", "accent", [[.50,.32],[.45,.38]]), line("straight", "accent", [[.50,.32],[.55,.38]]),
        line("straight", "accent", [[.66,.41],[.58,.41]]), line("straight", "accent", [[.66,.41],[.62,.48]]),
        line("straight", "accent", [[.66,.59],[.58,.59]]), line("straight", "accent", [[.66,.59],[.62,.52]]),
        line("straight", "accent", [[.50,.68],[.45,.62]]), line("straight", "accent", [[.50,.68],[.55,.62]]),
        line("straight", "accent", [[.34,.59],[.42,.59]]), line("straight", "accent", [[.34,.59],[.38,.52]]),
        line("straight", "accent", [[.34,.41],[.42,.41]]), line("straight", "accent", [[.34,.41],[.38,.48]]),
      ],
    },
  },
  {
    slug: "fir-trees-and-stars", title: "Fir Trees and Gold Stars",
    subtitle: "Straight-stitched trees with knotted ornaments", category: "Christmas Collection",
    difficulty: "intermediate", rows: 7, pleats: 25, repeatPleats: 8,
    garments: ["Christmas jon-jon", "holiday bishop", "winter sampler"], stitchesUsed: ["outline-stitch", "wave-stitch"],
    embroideryStitches: ["Stem stitch", "Straight stitch", "French knot"],
    description: "A tiered fir tree, star, and three knotted ornaments repeat over an outline-framed wave.",
    foundation: "Outline rows 1 and 7; work a baby wave across rows 5–6, leaving the upper field for the trees.",
    motif: {
      repeatPleats: 8,
      instructions: ["Stem the trunk.", "Build five branch tiers with straight stitches.", "Add the star and ornament knots last."],
      elements: [
        line("stem", "trunk", [[.50,.72],[.50,.35]]),
        line("straight", "foliage", [[.50,.37],[.40,.48]]), line("straight", "foliage", [[.50,.37],[.60,.48]]),
        line("straight", "foliage", [[.50,.45],[.34,.58]]), line("straight", "foliage", [[.50,.45],[.66,.58]]),
        line("straight", "foliage", [[.50,.54],[.28,.69]]), line("straight", "foliage", [[.50,.54],[.72,.69]]),
        line("straight", "star", [[.50,.08],[.55,.19],[.67,.19],[.58,.27],[.61,.38],[.50,.31],[.39,.38],[.42,.27],[.33,.19],[.45,.19]], true),
        knot("berry", [.42,.52], 2), knot("berry", [.58,.57], 2), knot("berry", [.49,.45], 2),
      ],
    },
  },
];

const paletteNames = Object.keys(PLATE_COLORWAYS);
const colors = {
  frame: "#6b8a9e", field: "#7a3f45", foliage: "#53745a", flower: "#b85d73",
  accent: "#c4a35a", berry: "#a12f3d", candle: "#b79045", flame: "#d88a35",
  snow: "#769db7", trunk: "#79563d", star: "#c4a35a",
};

export const themedPlates: PlateMeta[] = seeds.map((seed) => {
  const { foundation, ...meta } = seed;
  const centerLine = seed.pleats % 2
    ? `center pleat ${Math.ceil(seed.pleats / 2)}`
    : `valley between pleats ${seed.pleats / 2} and ${seed.pleats / 2 + 1}`;
  const estimatedWidth = seed.pleats / 6;
  return {
    ...meta,
    finishedWidth: `About ${estimatedWidth.toFixed(1)} in at 6 pleats/in; confirm with a tension sample`,
    fabricWidth: `Start with about ${(estimatedWidth * 3).toFixed(1)} in at 3:1 compression; test this fabric first`,
    centerLine,
    symmetry: "Center one complete repeat on the marked center reference",
    threadWeight: "3 strands cotton floss; use 1–2 strands for fine motif details",
    colorSuggestions: paletteNames,
    threads: Object.entries(colors).map(([id, hex]) => ({ id, name: id[0].toUpperCase() + id.slice(1), hex })),
    instructions: [
      `Pleat ${seed.rows} gathering rows across ${seed.pleats} pleat mountains and mark the center.`,
      foundation,
      ...(seed.motif ? ["Keep gathering threads in place and support surface embroidery with lightweight tear-away stabilizer.", ...seed.motif.instructions] : []),
      "Check the first complete repeat before continuing across the garment.",
    ],
    tips: [
      seed.motif ? "Complete every structural smocking course before beginning the surface motif." : "Check every turn closure before repeating the field.",
      "Test the full repeat on matching fabric before stitching a garment.",
    ],
    cells: {},
  };
});

