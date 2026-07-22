import type { PictureSmockingChart, PlateMeta, PlateThread } from "./plate-types";
import { PLATE_COLORWAYS } from "./plate-colorways";

interface PictureSeed {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  difficulty: PlateMeta["difficulty"];
  garments: string[];
  motif: string[];
  legend: Record<string, string>;
  threads: PlateThread[];
  sourceLabel: string;
  sourceHref: string;
}

const tile = (motif: string[]) => motif.map((row) => row.repeat(32 / [...row].length));

const colors = {
  green: "#51745b",
  red: "#b9505d",
  gold: "#c49a47",
  blue: "#5c8eae",
  paleBlue: "#9fc5d6",
  pink: "#cf7897",
  white: "#f7f1e8",
  charcoal: "#554e4b",
  brown: "#8a6048",
  yellow: "#d6ab43",
  lavender: "#8a72a3",
  neutral: "#b9aa98",
};

const thread = (id: string, name: string, hex: string): PlateThread => ({ id, name, hex });

const seeds: PictureSeed[] = [
  {
    slug: "christmas-ornament-row",
    title: "Christmas Ornament Row",
    subtitle: "Jewel-colored baubles built from stacked cable stitches",
    category: "Picture Smocking · Christmas",
    difficulty: "intermediate",
    garments: ["Christmas bishop", "holiday yoke", "romper"],
    motif: ["...g....", "..ggg...", "..grg...", ".grrrg..", ".rryrr..", "..rrr...", "...r....", "........"],
    legend: { g: "green", r: "red", y: "gold" },
    threads: [thread("green", "Pine", colors.green), thread("red", "Berry red", colors.red), thread("gold", "Antique gold", colors.gold), thread("back", "Back-smocking neutral", colors.neutral)],
    sourceLabel: "Christmas picture-smocking roundup (theme reference)",
    sourceHref: "https://www.pinkhollybushdesigns.com/post/round-up-of-free-christmas-picture-smocking-designs",
  },
  {
    slug: "snowman-parade-picture",
    title: "Snowman Parade",
    subtitle: "Tiny snowmen with hats, scarves, and coal buttons",
    category: "Picture Smocking · Christmas",
    difficulty: "advanced",
    garments: ["winter yoke", "Christmas romper", "sampler"],
    motif: ["..kkk...", ".kkkkk..", "..www...", ".wwwww..", ".wrwww..", ".wwkww..", "..www...", ".wwwww..", "..w.w...", "........"],
    legend: { k: "charcoal", w: "white", r: "red" },
    threads: [thread("charcoal", "Charcoal", colors.charcoal), thread("white", "Snow", colors.white), thread("red", "Scarf red", colors.red), thread("back", "Back-smocking neutral", colors.neutral)],
    sourceLabel: "Christmas picture-smocking roundup (theme reference)",
    sourceHref: "https://www.pinkhollybushdesigns.com/post/round-up-of-free-christmas-picture-smocking-designs",
  },
  {
    slug: "balloon-bouquet-picture",
    title: "Balloon Bouquet",
    subtitle: "Three floating balloons with fine trailing strings",
    category: "Picture Smocking · Babies",
    difficulty: "beginner",
    garments: ["baby yoke", "daygown", "first-birthday romper"],
    motif: ["..p..b..", ".pppbbb.", ".pppbbb.", "..p..b..", "...y....", "..yyy...", "..yyy...", "...y....", "..k.k...", ".k..k...", "........"],
    legend: { p: "pink", b: "blue", y: "yellow", k: "charcoal" },
    threads: [thread("pink", "Blush", colors.pink), thread("blue", "Sky", colors.blue), thread("yellow", "Buttercup", colors.yellow), thread("charcoal", "String", colors.charcoal), thread("back", "Back-smocking neutral", colors.neutral)],
    sourceLabel: "Baby smocking-plate roundup (theme reference)",
    sourceHref: "https://www.pinkhollybushdesigns.com/post/free-smocking-plates-for-babies",
  },
  {
    slug: "sleepy-bunny-pair",
    title: "Sleepy Bunny Pair",
    subtitle: "Long-eared baby bunnies worked in soft picture-smocking blocks",
    category: "Picture Smocking · Babies",
    difficulty: "intermediate",
    garments: ["baby bishop", "daygown", "bonnet band"],
    motif: [".w...w..", ".ww.ww..", "..www...", ".wwwww..", ".wkwkw..", ".wwpww..", "..www...", ".wwwww..", ".w...w..", "........"],
    legend: { w: "white", k: "charcoal", p: "pink" },
    threads: [thread("white", "Bunny cream", colors.white), thread("charcoal", "Eyes", colors.charcoal), thread("pink", "Nose", colors.pink), thread("back", "Back-smocking neutral", colors.neutral)],
    sourceLabel: "Baby smocking-plate roundup (theme reference)",
    sourceHref: "https://www.pinkhollybushdesigns.com/post/free-smocking-plates-for-babies",
  },
  {
    slug: "strawberry-basket-picture",
    title: "Strawberry Basket",
    subtitle: "Red berries and green caps in a compact repeating basket",
    category: "Picture Smocking · Girls",
    difficulty: "intermediate",
    garments: ["girl’s yoke", "summer bishop", "pinafore"],
    motif: ["..g.g...", ".ggggg..", "..r.r...", ".rrrrr..", ".ryryr..", "..rrr...", "..bbb...", ".bbbbb..", "........"],
    legend: { g: "green", r: "red", y: "gold", b: "brown" },
    threads: [thread("green", "Leaf", colors.green), thread("red", "Strawberry", colors.red), thread("gold", "Seed", colors.gold), thread("brown", "Basket", colors.brown), thread("back", "Back-smocking neutral", colors.neutral)],
    sourceLabel: "Girls’ picture-smocking roundup (theme reference)",
    sourceHref: "https://www.pinkhollybushdesigns.com/post/free-picture-smocking-plates-for-girls",
  },
  {
    slug: "garden-heart-vines",
    title: "Garden Heart Vines",
    subtitle: "Pink hearts joined by a small green garden vine",
    category: "Picture Smocking · Girls",
    difficulty: "beginner",
    garments: ["girl’s bishop", "yoke", "bonnet"],
    motif: [".pp.pp..", "ppppppp.", "ppppppp.", ".ppppp..", "..ppp...", "...p....", ".g.g.g..", "ggggggg.", "........"],
    legend: { p: "pink", g: "green" },
    threads: [thread("pink", "Rose pink", colors.pink), thread("green", "Garden green", colors.green), thread("back", "Back-smocking neutral", colors.neutral)],
    sourceLabel: "Girls’ picture-smocking roundup (theme reference)",
    sourceHref: "https://www.pinkhollybushdesigns.com/post/free-picture-smocking-plates-for-girls",
  },
  {
    slug: "little-sailboat-fleet",
    title: "Little Sailboat Fleet",
    subtitle: "Blue hulls and striped sails above a rolling waterline",
    category: "Picture Smocking · Boys",
    difficulty: "intermediate",
    garments: ["boy’s yoke", "romper", "summer shortall"],
    motif: ["...k....", "..wk....", ".wwwk...", "..bbk...", ".bbbbb..", "..bbb...", "b.b.b.b.", ".b.b.b..", "........"],
    legend: { k: "charcoal", w: "white", b: "blue" },
    threads: [thread("charcoal", "Mast", colors.charcoal), thread("white", "Sail", colors.white), thread("blue", "Ocean blue", colors.blue), thread("back", "Back-smocking neutral", colors.neutral)],
    sourceLabel: "Boys’ picture-smocking roundup (theme reference)",
    sourceHref: "https://www.pinkhollybushdesigns.com/post/free-picture-smocking-plates-for-boys",
  },
  {
    slug: "farm-tractor-picture",
    title: "Little Farm Tractor",
    subtitle: "A bright tractor with chunky wheels and field stripe",
    category: "Picture Smocking · Boys",
    difficulty: "advanced",
    garments: ["boy’s yoke", "farm romper", "sampler"],
    motif: [
      "........yyyy....",
      ".......yyyyyy...",
      ".......y....y...",
      "..gggggggggggg..",
      "..ggrggggggggg..",
      "..gggggggggggg..",
      ".gggggggggggggg.",
      "..kkkk....kkkk..",
      ".kkkkkk..kkkkkk.",
      "..kkkk....kkkk..",
      "bbbbbbbbbbbbbbbb",
      ".b.b.b.b.b.b.b.b",
    ],
    legend: { y: "yellow", g: "green", r: "red", k: "charcoal", b: "brown" },
    threads: [thread("yellow", "Sun yellow", colors.yellow), thread("green", "Tractor green", colors.green), thread("red", "Engine red", colors.red), thread("charcoal", "Tire", colors.charcoal), thread("brown", "Field", colors.brown), thread("back", "Back-smocking neutral", colors.neutral)],
    sourceLabel: "Boys’ picture-smocking roundup (theme reference)",
    sourceHref: "https://www.pinkhollybushdesigns.com/post/free-picture-smocking-plates-for-boys",
  },
];

const paletteNames = Object.keys(PLATE_COLORWAYS);

export const picturePlates: PlateMeta[] = seeds.map((seed) => {
  const motifWidth = [...seed.motif[0]].length;
  const repeatCount = 32 / motifWidth;
  const grid = tile([".".repeat(motifWidth), ...seed.motif, ".".repeat(motifWidth)]);
  const chart: PictureSmockingChart = {
    grid,
    legend: seed.legend,
    backSmocking: [
      { row: 1, threadId: "back" },
      { row: grid.length, threadId: "back" },
    ],
  };
  return {
    slug: seed.slug,
    title: seed.title,
    subtitle: seed.subtitle,
    category: seed.category,
    difficulty: seed.difficulty,
    garments: seed.garments,
    rows: grid.length,
    pleats: 33,
    repeatPleats: motifWidth,
    finishedWidth: "About 5.5 in at 6 pleats/in; confirm with a tension sample",
    fabricWidth: "Start with about 16.5 in at 3:1 compression; test this fabric first",
    centerLine: "center pleat 17",
    symmetry: `Center the join between the two middle ${motifWidth}-pleat repeats on pleat 17`,
    threadWeight: "3 strands cotton floss; use 2 strands for tiny details",
    colorSuggestions: paletteNames,
    threads: seed.threads,
    stitchesUsed: ["cable-stitch"],
    description: `${seed.subtitle}. This is a newly charted original teaching plate; the linked roundup is a theme reference, not the source of this stitch chart.`,
    pictureChart: chart,
    sources: [{ label: seed.sourceLabel, href: seed.sourceHref, note: "Theme reference only; this plate is an original chart." }],
    instructions: [
      `Pleat ${grid.length} gathering rows across 33 pleat mountains and mark center pleat 17.`,
      "Back-smock the dashed top and bottom rows from the wrong side before beginning the picture.",
      "Work the dense chart from the bottom row upward, completing one color block at a time.",
      "Each colored horizontal mark is one cable stitch across the adjacent pleat pair.",
      "Keep every cable snug but elastic; compare the shape after each completed row.",
    ],
    tips: [
      "Use separate short lengths for isolated color areas instead of carrying dark thread behind pale fabric.",
      `The ${repeatCount} repeats are identical; verify the first repeat before continuing.`,
    ],
    cells: {},
  };
});
