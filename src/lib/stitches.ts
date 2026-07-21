import type { StitchMeta } from "./types";

/**
 * Registry of all stitch chapters.
 * Cable Stitch is the gold-standard complete chapter.
 * Others are listed as planned templates that follow the same structure.
 */
export const stitches: StitchMeta[] = [
  {
    slug: "cable-stitch",
    title: "Cable Stitch",
    subtitle: "The foundation stitch of English smocking",
    difficulty: "beginner",
    categories: ["cable", "structural"],
    uses: [
      "children's clothing",
      "heirloom sewing",
      "bishop dresses",
      "bonnets",
      "yokes",
      "sleeves",
    ],
    threadCount: "2–3 strands floche or #8 perle",
    status: "complete",
    description:
      "A firm, braided-looking stitch worked across consecutive pleats. Cable is the first stitch most smockers learn and the structural backbone of nearly every plate.",
  },
  {
    slug: "wave-stitch",
    title: "Wave Stitch",
    subtitle: "Traveling stitch between two gathering rows",
    difficulty: "beginner",
    categories: ["wave", "structural"],
    uses: [
      "bishop dresses",
      "yokes",
      "bonnets",
      "sleeves",
      "children's clothing",
      "heirloom sewing",
    ],
    threadCount: "2–3 strands floche or #8 perle",
    status: "complete",
    description:
      "A stitch that travels up and down between two gathering rows, creating a flowing wave. The building block of trellis and diamond patterns.",
  },
  {
    slug: "honeycomb",
    title: "Honeycomb Stitch",
    subtitle: "The classic elastic lattice",
    difficulty: "intermediate",
    categories: ["honeycomb", "elastic"],
    uses: [
      "bishop dresses",
      "yokes",
      "sleeves",
      "home decor",
      "children's clothing",
      "heirloom sewing",
    ],
    threadCount: "2–3 strands floche or #8 perle",
    status: "complete",
    description:
      "Pairs of stitches that gather and release, forming hexagonal cells. Provides stretch and a distinctive open texture.",
  },
  {
    slug: "outline-stitch",
    title: "Outline Stitch",
    subtitle: "Smooth single-row control stitch",
    difficulty: "beginner",
    categories: ["outline", "structural"],
    uses: ["yokes", "collars", "bonnets", "heirloom sewing"],
    status: "planned",
    description:
      "A continuous stitch along one gathering row that holds pleats firmly with a smooth cord-like appearance.",
  },
  {
    slug: "trellis",
    title: "Trellis",
    subtitle: "Diamond lattice from paired waves",
    difficulty: "intermediate",
    categories: ["trellis", "wave", "decorative"],
    uses: ["bishop dresses", "christening gowns", "yokes"],
    status: "planned",
    description:
      "Two mirror-image wave rows that meet to form diamonds. One of the most recognizable English smocking motifs.",
  },
  {
    slug: "stem-stitch-smocking",
    title: "Stem Stitch (Smocking)",
    subtitle: "Twisted cable cousin",
    difficulty: "beginner",
    categories: ["cable", "structural"],
    uses: ["children's clothing", "bonnets", "sleeves"],
    status: "planned",
    description:
      "Worked like cable but with the needle always above (or always below) the thread, producing a twisted rope effect.",
  },
  {
    slug: "van-dyke",
    title: "Van Dyke Stitch",
    subtitle: "Chevron with a catch stitch",
    difficulty: "advanced",
    categories: ["decorative", "wave"],
    uses: ["heirloom sewing", "christening gowns", "bishop dresses"],
    status: "planned",
    description:
      "A dramatic chevron formed by catching two pleats together at each peak and valley.",
  },
  {
    slug: "surface-honeycomb",
    title: "Surface Honeycomb",
    subtitle: "Honeycomb without deep gathers",
    difficulty: "intermediate",
    categories: ["honeycomb", "decorative"],
    uses: ["yokes", "home decor", "aprons"],
    status: "planned",
    description:
      "A flatter honeycomb variation that sits on the surface of the pleats rather than pulling them into deep cells.",
  },
];

export function getStitch(slug: string): StitchMeta | undefined {
  return stitches.find((s) => s.slug === slug);
}

export function getCompleteStitches(): StitchMeta[] {
  return stitches.filter((s) => s.status === "complete");
}

export function filterStitches(opts: {
  difficulty?: string;
  category?: string;
  q?: string;
}): StitchMeta[] {
  const q = opts.q?.toLowerCase().trim();
  return stitches.filter((s) => {
    if (opts.difficulty && s.difficulty !== opts.difficulty) return false;
    if (opts.category && !s.categories.includes(opts.category as StitchMeta["categories"][number]))
      return false;
    if (q) {
      const hay = `${s.title} ${s.subtitle ?? ""} ${s.description} ${s.categories.join(" ")}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}
