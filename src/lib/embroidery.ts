import type { Difficulty } from "./types";

export type EmbroideryMeta = {
  slug: string;
  title: string;
  subtitle?: string;
  difficulty: Difficulty;
  uses: string[];
  status: "complete" | "planned";
  description: string;
  withSmocking: string;
};

/**
 * Surface embroidery companions commonly combined with English smocking.
 */
export const embroideryStitches: EmbroideryMeta[] = [
  {
    slug: "bullion",
    title: "Bullion Stitch",
    subtitle: "Wrapped needle for roses and buds",
    difficulty: "advanced",
    uses: ["roses", "buds", "bishop yokes", "bonnets", "christening"],
    status: "complete",
    description:
      "A tightly wrapped stitch that builds dimensional roses and buds — the signature flower of heirloom smocked garments.",
    withSmocking: "Cluster above cable borders or in open trellis diamonds on bishop yokes.",
  },
  {
    slug: "french-knot",
    title: "French Knot",
    subtitle: "Compact wrapped dot",
    difficulty: "beginner",
    uses: ["flower centers", "berries", "filler", "texture"],
    status: "complete",
    description:
      "A small wrapped knot used for centers, berries, and textured fill. Essential beside lazy daisy and bullion work.",
    withSmocking: "Dot the centers of daisy sprays and fill small fields above smocked panels.",
  },
  {
    slug: "lazy-daisy",
    title: "Lazy Daisy",
    subtitle: "Detached chain petals",
    difficulty: "beginner",
    uses: ["petals", "leaves", "sprays", "children's wear"],
    status: "complete",
    description:
      "A detached chain loop that forms petals and simple leaves. Fast, readable, and perfect with smocked grounds.",
    withSmocking: "Build sprays that sit on the plain fabric above a smocked yoke.",
  },
  {
    slug: "feather-stitch",
    title: "Feather Stitch",
    subtitle: "Branching vine stitch",
    difficulty: "intermediate",
    uses: ["vines", "borders", "foliage", "bonnets"],
    status: "complete",
    description:
      "An open branching stitch that climbs like a vine. Frames smocked panels and carries leaves or knots.",
    withSmocking: "Run beside cable borders or climb from a smocked band into the skirt.",
  },
  {
    slug: "stem-embroidery",
    title: "Stem Stitch (Embroidery)",
    subtitle: "Surface outline rope — not smocking stem",
    difficulty: "beginner",
    uses: ["stems", "outlines", "lettering guides", "vines"],
    status: "complete",
    description:
      "The classic surface stem for botanical outlines. Distinct from smocking stem stitch worked across pleats.",
    withSmocking: "Draw flower stems and motif outlines on the flat fabric around the smocked field.",
  },
  {
    slug: "satin-stitch",
    title: "Satin Stitch",
    subtitle: "Smooth solid fill",
    difficulty: "intermediate",
    uses: ["petals", "bows", "leaves", "small motifs"],
    status: "complete",
    description:
      "Parallel stitches that fill a shape with a smooth sheen. Keep shapes small for heirloom work.",
    withSmocking: "Fill bow loops and petal hearts above cable or trellis panels.",
  },
  {
    slug: "back-stitch",
    title: "Back Stitch",
    subtitle: "Firm outline line",
    difficulty: "beginner",
    uses: ["outlines", "lettering", "structure"],
    status: "complete",
    description:
      "A strong, continuous outline made by stitching backward into the previous hole. Ideal under monograms.",
    withSmocking: "Outline motifs and stabilize shapes near gathering rows.",
  },
  {
    slug: "chain-stitch",
    title: "Chain Stitch",
    subtitle: "Linked loop line",
    difficulty: "beginner",
    uses: ["borders", "outlines", "decorative lines"],
    status: "complete",
    description:
      "A line of linked loops that frames panels and draws bold curves.",
    withSmocking: "Border a smocked insert or echo the neckline above the first cable.",
  },
  {
    slug: "blanket-stitch",
    title: "Blanket Stitch",
    subtitle: "Edge and appliqué stitch",
    difficulty: "beginner",
    uses: ["edges", "appliqué", "hems", "felt motifs"],
    status: "planned",
    description:
      "A looped edge stitch for hems, appliqué, and decorative boundaries on garments with smocked inserts.",
    withSmocking: "Finish appliqué animals or lace edges near smocked yokes.",
  },
  {
    slug: "outline-embroidery",
    title: "Outline Stitch (Embroidery)",
    subtitle: "Smooth surface line — not smocking outline",
    difficulty: "beginner",
    uses: ["outlines", "stems", "fine lines"],
    status: "planned",
    description:
      "Surface outline related to stem; keep thread position consistent for a smooth cord on flat fabric.",
    withSmocking: "Fine botanical lines on batiste surrounding the smocked area.",
  },
  {
    slug: "running-stitch",
    title: "Running Stitch",
    subtitle: "Utility and light texture",
    difficulty: "beginner",
    uses: ["guidelines", "quilting look", "utility"],
    status: "planned",
    description:
      "Even in-and-out stitches for temporary guidelines or delicate textured lines.",
    withSmocking: "Mark motif placement before permanent embroidery above the smocking.",
  },
];

export function getEmbroidery(slug: string): EmbroideryMeta | undefined {
  return embroideryStitches.find((s) => s.slug === slug);
}

export function filterEmbroidery(opts: {
  difficulty?: string;
  q?: string;
  status?: string;
}): EmbroideryMeta[] {
  const q = opts.q?.toLowerCase().trim();
  return embroideryStitches.filter((s) => {
    if (opts.difficulty && s.difficulty !== opts.difficulty) return false;
    if (opts.status && s.status !== opts.status) return false;
    if (q) {
      const hay = `${s.title} ${s.subtitle ?? ""} ${s.description} ${s.uses.join(" ")}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}
