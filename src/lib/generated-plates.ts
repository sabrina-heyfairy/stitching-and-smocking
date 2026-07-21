import type { PlateCell, PlateMeta, PlateStitchRef } from "./plate-types";
import { cellKey } from "./plate-types";
import type { Difficulty } from "./types";

type PlateSeed = { category: string; name: string };

export const PLATE_COLORWAYS = {
  "Traditional heirloom": ["#f8f4e8", "#d8cfb5", "#9b835f"],
  Pink: ["#f7cad7", "#d9829b", "#8e405c"],
  Blue: ["#c8e0ef", "#6b9cba", "#315d78"],
  Pastel: ["#e8c8d8", "#c8ddeb", "#c9ddb8"],
  Christmas: ["#9f2936", "#315f47", "#d2ad58"],
  "Modern neutral": ["#e8e1d7", "#9b9187", "#47433f"],
  Rainbow: ["#d34c53", "#e89b3c", "#e2ca4b", "#5c9b69", "#5685ba", "#8a62a5"],
  Monochrome: ["#dedede", "#888888", "#282828"],
  Vintage: ["#b77b78", "#78908b", "#c1a56c"],
  "French country": ["#d9e2ea", "#56738d", "#e8dfca"],
  "Liberty floral": ["#b85d73", "#647c5c", "#d6a85e"],
  "William Morris inspired": ["#355c4d", "#9b493f", "#c09a4b"],
  "Beatrix Potter inspired": ["#80977a", "#bd8e78", "#8aa0ae"],
} as const;

const categoryEntries: Record<string, string[]> = {
  "Beginner Geometrics": [
    "Diamonds", "Small Diamonds", "Nested Diamonds", "Offset Diamonds", "Checkerboards",
    "Boxes", "Tiny Squares", "Large Squares", "Triangles", "Chevron", "Zigzag", "Ladders",
    "Basket Weave", "Honeycomb", "Brick", "Crosses", "Stars", "Octagons", "Hexagons",
    "Greek Key", "Simple Celtic Repeat",
  ],
  "Traditional English": [
    "Classic Waves", "Trellis", "Cable Layouts", "Lattice", "Shell", "Feather",
    "Honeycomb Layouts", "Leaf Repeats", "Victorian Borders", "Edwardian Children’s Dress",
    "Heirloom Bishop Dress",
  ],
  Floral: [
    "Tiny Flowers", "Daisies", "Roses", "Tulips", "Bluebells", "Cherry Blossoms",
    "Forget-me-nots", "Lavender", "Sunflowers", "Wildflowers", "Vines", "Flower Garlands",
    "Flower Borders", "Bouquets", "Wreaths",
  ],
  Nature: [
    "Leaves", "Oak Leaves", "Maple Leaves", "Acorns", "Pine Trees", "Branches", "Birds",
    "Butterflies", "Dragonflies", "Ladybugs", "Honey Bees", "Bunnies", "Foxes", "Owls",
    "Deer", "Mushrooms", "Fern Patterns", "Raindrops", "Snowflakes", "Stars", "Moon", "Sun",
    "Clouds",
  ],
  Baby: [
    "Baby Bottles", "Rattles", "Pacifiers", "Baby Feet", "Blocks", "Rubber Ducks",
    "Teddy Bears", "Rocking Horses", "Moon and Stars", "Nursery Animals", "Baby Initials",
    "Baby Monograms",
  ],
  "Girly Designs": [
    "Bows", "Crowns", "Tiaras", "Hearts", "Ballet Slippers", "Princess Carriages",
    "Unicorns", "Rainbows", "Fairies", "Mermaids", "Flowers", "Butterflies", "Tea Parties",
    "Dolls", "Kittens", "Puppies", "Jewels", "Castle Borders", "Magic Wands",
  ],
  "Boy Designs": [
    "Trains", "Cars", "Dump Trucks", "Construction Equipment", "Fire Trucks", "Police Cars",
    "Airplanes", "Helicopters", "Rocket Ships", "Dinosaurs", "Pirates", "Knights", "Dragons",
    "Camping", "Fishing", "Forest Animals", "Baseball", "Football", "Basketball", "Soccer",
    "Boats", "Anchors", "Compasses",
  ],
  Christmas: [
    "Christmas Trees", "Ornaments", "Snowflakes", "Holly", "Mistletoe", "Santa", "Reindeer",
    "Stockings", "Candy Canes", "Stars", "Nativity", "Angels", "Churches", "Wreaths",
    "Presents", "Gingerbread", "Snowmen", "Penguins", "Poinsettias", "Noel Borders",
    "Merry Christmas Lettering",
  ],
  Easter: [
    "Crosses", "Lilies", "Easter Eggs", "Bunnies", "Chicks", "Lambs", "Palm Branches",
    "Spring Flowers", "Baskets", "Carrots", "Resurrection Motifs",
  ],
  Halloween: [
    "Pumpkins", "Ghosts", "Black Cats", "Candy", "Spiders", "Bats", "Haunted Houses",
    "Friendly Witches", "Owls", "Autumn Leaves",
  ],
  Thanksgiving: [
    "Turkey", "Pumpkins", "Corn", "Acorns", "Leaves", "Harvest Baskets", "Sunflowers",
    "Wheat", "Plaid Borders",
  ],
  "Valentine’s": ["Hearts", "Cupid", "Love Birds", "Roses", "Cupid Arrows", "XO Borders", "Lace Hearts"],
  "Fourth of July": ["Stars", "Flags", "Fireworks", "Eagles", "Liberty Bells", "Patriotic Bunting"],
  Winter: ["Snowflakes", "Icicles", "Mittens", "Scarves", "Pine Forests", "Cabins", "Sleds", "Polar Bears", "Penguins"],
  Spring: ["Tulips", "Daffodils", "Rain Showers", "Umbrellas", "Bird Nests", "Baby Birds", "Fresh Leaves"],
  Summer: ["Beach", "Shells", "Starfish", "Lighthouses", "Flip-flops", "Sailboats", "Sun", "Ice Cream", "Lemonade", "Palm Trees"],
  Fall: ["Leaves", "Pumpkins", "Acorns", "Apple Orchards", "Hay Bales", "Scarecrows", "Sunflowers"],
  Borders: [
    "Continuous Borders", "Scallops", "Greek Key", "Vines", "Rope", "Pearls", "Hearts",
    "Stars", "Flowers", "Leaves", "Holiday Borders",
  ],
  "Corner Motifs": ["Matching Corners", "Inside Corners", "Outside Corners", "Frame Layouts"],
  "Complete Dress Layouts": [
    "Bishop Dresses", "Yokes", "Bonnets", "Bloomers", "Sleeves", "Cuffs", "Collars",
    "Children’s Dresses", "Adult Yokes", "Christmas Dresses", "Boys’ Jon-jons",
    "Bubble Suits", "Rompers", "Nightgowns",
  ],
};

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const alphabetSeeds: PlateSeed[] = [
  ...alphabet.map((name) => ({ category: "Alphabet · Uppercase", name })),
  ...alphabet.map((name) => ({ category: "Alphabet · Lowercase", name: name.toLowerCase() })),
  ...["Script", "Block", "Victorian", "Monogram"].flatMap((style) =>
    alphabet.map((letter) => ({ category: `Alphabet · ${style}`, name: `${style} ${letter}` })),
  ),
  ...["Double-letter Monogram", "Three-letter Monogram", "Interlocking Monogram", "Initial with Decorative Border"].map(
    (name) => ({ category: "Alphabet · Monogram Templates", name }),
  ),
];

const numberSeeds: PlateSeed[] = [
  ..."0123456789".split("").map((name) => ({ category: "Numbers", name })),
  ...["Birth Year", "Age", "Milestone", "Birthday Layout"].map((name) => ({ category: "Numbers", name })),
];

const seeds: PlateSeed[] = [
  ...Object.entries(categoryEntries).flatMap(([category, names]) =>
    names.map((name) => ({ category, name })),
  ),
  ...alphabetSeeds,
  ...numberSeeds,
];

function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-");
}

function hash(value: string): number {
  return [...value].reduce((total, char) => (total * 31 + char.charCodeAt(0)) >>> 0, 2166136261);
}

const motifPaths = [
  "M10 55 Q25 20 40 55 T70 55 T100 55",
  "M8 60 L25 35 L42 60 L59 35 L76 60 L93 35",
  "M10 62 Q25 34 40 62 Q55 90 70 62 Q85 34 100 62",
  "M12 68 C25 25 42 25 52 68 C62 25 80 25 94 68",
  "M10 50 L28 28 L46 50 L64 72 L82 50 L100 28",
  "M12 60 C25 40 35 40 48 60 C60 80 75 80 94 55",
  "M10 65 Q25 35 40 65 L55 40 L70 65 Q85 35 100 65",
  "M8 58 L22 42 L36 58 L50 42 L64 58 L78 42 L94 58",
] as const;

const motifMarks = ["◇", "✦", "❧", "✿", "△", "♡", "⌁", "✣"] as const;
const baseColors = ["#7a3f45", "#5a7a78", "#6b8a9e", "#7a8f6e", "#c4a35a"];

function makeCells(index: number, rows: number, pleats: number): Record<string, PlateCell> {
  const cells: Record<string, PlateCell> = {};
  const border = baseColors[index % baseColors.length];
  const field = baseColors[(index + 2) % baseColors.length];
  for (let p = 1; p <= pleats; p++) {
    cells[cellKey(1, p)] = { kind: "cable", color: border };
    cells[cellKey(rows, p)] = { kind: "cable", color: border };
    const pos = (p - 1) % 8;
    const row = pos <= 4 ? 3 : 4;
    cells[cellKey(row, p)] = { kind: pos <= 4 ? "wave-up" : "wave-down", color: field };
    if (index % 3 === 0 && p % 4 === 1) cells[cellKey(6, p)] = { kind: "knot", color: field };
    if (index % 3 === 1 && p % 2 === 1) cells[cellKey(5, p)] = { kind: "honeycomb", color: field };
    if (index % 3 === 2 && p % 4 === 0) cells[cellKey(5, p)] = { kind: "surface", color: field };
  }
  return cells;
}

function difficultyFor(index: number, category: string): Difficulty {
  if (category === "Beginner Geometrics" || index % 7 === 0) return "beginner";
  if (category.includes("Dress") || category.includes("Victorian") || index % 5 === 0) return "advanced";
  return "intermediate";
}

function stitchesFor(index: number): PlateStitchRef[] {
  if (index % 3 === 0) return ["cable-stitch", "wave-stitch"];
  if (index % 3 === 1) return ["cable-stitch", "honeycomb"];
  return ["cable-stitch", "trellis", "surface-honeycomb"];
}

function buildPlate(seed: PlateSeed, index: number): PlateMeta {
  const pleats = seed.category === "Complete Dress Layouts" ? 48 : 32;
  const rows = seed.category === "Complete Dress Layouts" ? 12 : 8;
  const repeatPleats = index % 4 === 0 ? 4 : 8;
  const center = pleats / 2;
  const paletteNames = Object.keys(PLATE_COLORWAYS);
  const isTemplate = /Monogram|Birth Year|Age|Milestone|Birthday/.test(seed.name);
  const article = /^[AEIOU]/i.test(seed.name) ? "an" : "a";
  const embroidery = index % 3 === 0
    ? ["Back stitch", "French knot", "Lazy daisy"]
    : index % 3 === 1
      ? ["Stem stitch", "Satin stitch", "French knot"]
      : ["Chain stitch", "Bullion", "Running stitch"];

  return {
    slug: `collection-${slugify(seed.category)}-${slugify(seed.name)}`,
    title: seed.category.startsWith("Alphabet") ? `${seed.name} Plate` : `${seed.name} Smocking Plate`,
    subtitle: `${seed.category} · Read 16-needle repeat`,
    category: seed.category,
    difficulty: difficultyFor(index, seed.category),
    garments: seed.category === "Complete Dress Layouts"
      ? [seed.name.toLowerCase(), "full garment layout"]
      : ["bishop yoke", "children’s dress", "sampler panel"],
    rows,
    pleats,
    repeatPleats,
    finishedWidth: pleats === 48 ? "8 in / 20.3 cm" : "5⅓ in / 13.5 cm",
    fabricWidth: pleats === 48 ? "24 in / 61 cm" : "16 in / 40.6 cm",
    centerLine: `valley between pleats ${center} and ${center + 1}`,
    symmetry: isTemplate ? "Center the personalized characters on the marked valley" : "Mirror symmetry about the center line",
    threadWeight: "3 strands cotton floss or No. 8 pearl cotton; No. 12 pearl for fine fabric",
    colorSuggestions: paletteNames,
    threads: [
      { id: "foundation", name: "Foundation", hex: baseColors[index % baseColors.length], note: "Cable frame" },
      { id: "motif", name: "Motif accent", hex: baseColors[(index + 2) % baseColors.length], note: embroidery.join(", ") },
    ],
    stitchesUsed: stitchesFor(index),
    embroideryStitches: embroidery,
    motifPath: motifPaths[index % motifPaths.length],
    motifMark: motifMarks[index % motifMarks.length],
    description: `An original ${seed.name.toLowerCase()} plate built on a stable geometric foundation for a vintage Read 16-needle pleater. The surface motif is added only after the holding rows are secured, so it remains practical to embroider by hand.`,
    instructions: [
      `Pleat ${seed.category === "Complete Dress Layouts" ? "12" : "8"} gathering rows, leaving two needle spaces above and below the working area.`,
      `Mark the center valley between pleats ${center} and ${center + 1}; begin one ${repeatPleats}-pleat repeat to its left.`,
      "Work the top and bottom cable rows without removing gathering threads.",
      `Build the central geometric field, checking the repeat at pleats ${repeatPleats}, ${repeatPleats * 2}, and ${repeatPleats * 3}.`,
      `Add the ${seed.name.toLowerCase()} surface motif with ${embroidery.join(", ").toLowerCase()}.`,
      "Block to the stated finished width, knot off on the wrong side, then remove only the gathering threads outside the stitched area.",
    ],
    tips: [
      `Sample one repeat before committing to ${article} ${seed.name.toLowerCase()} garment.`,
      "The cut width assumes approximately 3:1 pleating compression; test the actual fabric before cutting heirloom yardage.",
      isTemplate ? "Trace personalized characters on the blocked pleats with a water-soluble marker." : "Mirror the second half from the center rather than counting from the outer edge.",
    ],
    cells: makeCells(index, rows, pleats),
  };
}

export const generatedPlates: PlateMeta[] = seeds.map(buildPlate);

