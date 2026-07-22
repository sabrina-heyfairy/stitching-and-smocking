import type { PlateMeta, PlateStitchRef } from "./plate-types";
import type { Difficulty } from "./types";
import { PLATE_COLORWAYS } from "./plate-colorways";

interface ExpandedPlateSeed {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  difficulty: Difficulty;
  rows: number;
  pleats: number;
  repeatPleats: number;
  garments: string[];
  stitchesUsed: PlateStitchRef[];
  description: string;
  fieldInstruction: string;
  tip: string;
  sources?: PlateMeta["sources"];
}

const geometricRoundupSource = [{
  label: "Free geometric smocking-plate roundup (theme reference)",
  href: "https://www.pinkhollybushdesigns.com/post/free-geometric-smocking-plates",
  note: "Historical and theme reference only; this teaching plate uses newly generated course geometry.",
}];

const seeds: ExpandedPlateSeed[] = [
  {
    slug: "wave-of-three-between-cables", title: "Wave of Three Between Cables",
    subtitle: "A medium-scale wave with level turn closures", category: "Beginner Geometrics",
    difficulty: "beginner", rows: 6, pleats: 25, repeatPleats: 8,
    garments: ["bishop yoke", "day dress", "practice strip"], stitchesUsed: ["cable-stitch", "wave-stitch"],
    description: "A wave of three gives more movement than a baby wave without the height of a wave of four.",
    fieldInstruction: "Across rows 3–4, climb three interval stitches, close the turn level, descend three, and close again.",
    tip: "Count three diagonals between every pair of level closures.",
  },
  {
    slug: "outline-framed-baby-wave", title: "Outline-Framed Baby Wave",
    subtitle: "A soft narrow band without cable borders", category: "Beginner Geometrics",
    difficulty: "beginner", rows: 4, pleats: 25, repeatPleats: 6,
    garments: ["baby bishop", "bonnet", "narrow sleeve"], stitchesUsed: ["outline-stitch", "wave-stitch"],
    description: "Smooth outline cords frame a compact wave of two for a softer edge than cable.",
    fieldInstruction: "Work outline on rows 1 and 4, then a two-step wave with level closures across rows 2–3.",
    tip: "Keep the outline thread above the needle on both frame rows.",
  },
  {
    slug: "stem-framed-wave-of-three", title: "Stem-Framed Wave of Three",
    subtitle: "Twisted frame cords around a medium wave", category: "Beginner Geometrics",
    difficulty: "beginner", rows: 6, pleats: 25, repeatPleats: 8,
    garments: ["collar insert", "yoke band", "sampler"], stitchesUsed: ["stem-stitch-smocking", "wave-stitch"],
    description: "Stem-stitch cords give a rope-like frame to a balanced three-step wave.",
    fieldInstruction: "Stem rows 1 and 6 with thread below the needle; work a wave of three across rows 3–4.",
    tip: "Compare the twisted stem frame with the smooth outline-framed plate.",
  },
  {
    slug: "opposed-baby-wave-band", title: "Opposed Baby-Wave Band",
    subtitle: "Mirrored narrow waves in an open band", category: "Beginner Geometrics",
    difficulty: "beginner", rows: 7, pleats: 25, repeatPleats: 6,
    garments: ["bishop", "child’s yoke", "practice panel"], stitchesUsed: ["cable-stitch", "wave-stitch"],
    description: "Two baby-wave courses begin in opposite directions, creating balanced movement above and below an open center.",
    fieldInstruction: "Work the upper wave from row 3 toward row 2 and the lower wave from row 5 toward row 6, closing every turn level.",
    tip: "Start both courses at the same pleat so their closures oppose cleanly.",
  },
  {
    slug: "five-row-control-band", title: "Five-Row Control Band",
    subtitle: "Cable, outline, cable, stem, cable", category: "Beginner Geometrics",
    difficulty: "beginner", rows: 5, pleats: 24, repeatPleats: 1,
    garments: ["sampler", "cuff", "bonnet band"], stitchesUsed: ["cable-stitch", "outline-stitch", "stem-stitch-smocking"],
    description: "A compact comparison band that makes cable alternation and the opposite sides of outline and stem easy to inspect.",
    fieldInstruction: "Cable rows 1, 3, and 5; outline row 2 with thread above; stem row 4 with thread below.",
    tip: "Use one color initially so stitch structure, rather than color, distinguishes the rows.",
  },
  {
    slug: "triple-cable-border", title: "Triple Cable Border",
    subtitle: "Three adjacent structural control rows", category: "Garment Bands",
    difficulty: "beginner", rows: 3, pleats: 24, repeatPleats: 1,
    garments: ["cuff", "collar", "picture-smocked lower border"], stitchesUsed: ["cable-stitch"],
    description: "Three level cable rows form a firm, compact border where extra control is useful.",
    fieldInstruction: "Cable rows 1, 2, and 3, maintaining the same alternating thread-side rhythm on every row.",
    tip: "Relax tension slightly on the middle row so the border does not become board-stiff.",
  },
  {
    slug: "stem-cuff-band", title: "Stem Cuff Band",
    subtitle: "Cable borders with a rope-like center", category: "Garment Bands",
    difficulty: "beginner", rows: 3, pleats: 20, repeatPleats: 1,
    garments: ["sleeve cuff", "bonnet edge", "ankle band"], stitchesUsed: ["cable-stitch", "stem-stitch-smocking"],
    description: "A shallow cable–stem–cable arrangement sized for narrow garment edges.",
    fieldInstruction: "Cable rows 1 and 3; work stem stitch on row 2 with the thread consistently below the needle.",
    tip: "Sample the finished circumference before closing a cuff seam.",
  },
  {
    slug: "small-diamond-trellis", title: "Small Diamond Trellis",
    subtitle: "Compact two-step diamonds", category: "Traditional English",
    difficulty: "intermediate", rows: 6, pleats: 25, repeatPleats: 6,
    garments: ["bonnet", "baby yoke", "narrow insert"], stitchesUsed: ["cable-stitch", "trellis"],
    description: "Two-step upper and lower courses share closure vertices to form small traditional diamonds.",
    fieldInstruction: "From row 3, work two steps up to row 2 and two steps down to row 4; close both courses at shared vertices.",
    tip: "Verify the first diamond closes before repeating across the width.",
  },
  {
    slug: "medium-diamond-trellis", title: "Medium Diamond Trellis",
    subtitle: "Three-step diamonds with an open center", category: "Traditional English",
    difficulty: "intermediate", rows: 7, pleats: 25, repeatPleats: 8,
    garments: ["bishop", "heirloom yoke", "dress insert"], stitchesUsed: ["cable-stitch", "trellis"],
    description: "A three-step trellis produces broader diamonds suitable for medium-depth yokes.",
    fieldInstruction: "Work mirror trellis courses from row 4 to rows 2 and 6, using three intervals between closures.",
    tip: "Keep both halves equally tensioned so the shared middle vertices stay level.",
  },
  {
    slug: "double-small-trellis", title: "Double Small Trellis",
    subtitle: "Two stacked compact diamond fields", category: "Traditional English",
    difficulty: "intermediate", rows: 9, pleats: 25, repeatPleats: 6,
    garments: ["deep bishop", "yoke panel", "nightgown"], stitchesUsed: ["cable-stitch", "trellis"],
    description: "Two independent small-diamond fields create a light, open band across a deeper pleated area.",
    fieldInstruction: "Work small trellis around rows 2–4, repeat around rows 6–8, and frame the field with cables on rows 1 and 9.",
    tip: "Complete the upper field before counting the lower field from the same starting pleat.",
  },
  {
    slug: "cable-divided-trellis", title: "Cable-Divided Trellis",
    subtitle: "Stacked diamonds separated by a control cable", category: "Traditional English",
    difficulty: "intermediate", rows: 9, pleats: 25, repeatPleats: 6,
    garments: ["structured yoke", "bishop", "sampler"], stitchesUsed: ["cable-stitch", "trellis"],
    description: "A center cable divides two compact trellis fields and provides a strong visual and tension reference.",
    fieldInstruction: "Trellis rows 2–4 and 6–8 around their middle rows; cable rows 1, 5, and 9.",
    tip: "Straighten the center cable before beginning the lower trellis.",
  },
  {
    slug: "bonnet-trellis-band", title: "Bonnet Trellis Band",
    subtitle: "Small diamonds between smooth outline cords", category: "Garment Bands",
    difficulty: "intermediate", rows: 5, pleats: 25, repeatPleats: 6,
    garments: ["bonnet front", "collar", "narrow yoke"], stitchesUsed: ["outline-stitch", "trellis"],
    description: "Outline cords soften the edges of a compact two-step trellis for small heirloom pieces.",
    fieldInstruction: "Outline rows 1 and 5; work mirror two-step trellis courses around row 3.",
    tip: "Use fine thread so the outline frame does not overpower the small diamonds.",
  },
  {
    slug: "two-tier-honeycomb-yoke", title: "Two-Tier Honeycomb Yoke",
    subtitle: "Two elastic fields within one cable frame", category: "Traditional English",
    difficulty: "intermediate", rows: 8, pleats: 25, repeatPleats: 2,
    garments: ["comfortable yoke", "nightgown", "bishop"], stitchesUsed: ["cable-stitch", "honeycomb"],
    description: "Two classic honeycomb tiers provide elasticity across a deeper yoke without a heavy center divider.",
    fieldInstruction: "Work overlapping honeycomb pairs across rows 2–3 and again across rows 5–6; cable rows 1 and 8.",
    tip: "Open both tiers sideways before deciding whether the tension matches.",
  },
  {
    slug: "cable-divided-honeycomb", title: "Cable-Divided Honeycomb",
    subtitle: "Elastic tiers separated by a center cable", category: "Traditional English",
    difficulty: "intermediate", rows: 7, pleats: 25, repeatPleats: 2,
    garments: ["yoke", "waist panel", "sleeve insert"], stitchesUsed: ["cable-stitch", "honeycomb"],
    description: "A control cable separates two overlapping-pair honeycomb fields for a more structured elastic band.",
    fieldInstruction: "Honeycomb rows 2–3 and 5–6; cable rows 1, 4, and 7.",
    tip: "Do not let the center cable inherit the softer honeycomb tension.",
  },
  {
    slug: "outline-framed-honeycomb-band", title: "Outline-Framed Honeycomb Band",
    subtitle: "A soft elastic band for small garments", category: "Garment Bands",
    difficulty: "intermediate", rows: 4, pleats: 25, repeatPleats: 2,
    garments: ["bonnet", "baby sleeve", "soft cuff"], stitchesUsed: ["outline-stitch", "honeycomb"],
    description: "Classic overlapping honeycomb sits between smooth outline cords in a compact four-row layout.",
    fieldInstruction: "Outline rows 1 and 4; work overlapping honeycomb pairs between rows 2 and 3 with travel hidden inside the shared pleat.",
    tip: "Keep the outline frame gentle enough for the honeycomb cells to open.",
  },
  {
    slug: "trellis-and-honeycomb-yoke", title: "Trellis and Honeycomb Yoke",
    subtitle: "Structured diamonds above an elastic field", category: "Traditional English",
    difficulty: "intermediate", rows: 9, pleats: 25, repeatPleats: 6,
    garments: ["bishop", "children’s yoke", "nightgown"], stitchesUsed: ["cable-stitch", "trellis", "honeycomb"],
    description: "Small trellis diamonds provide structure above a softer honeycomb tier in a practical compound yoke.",
    fieldInstruction: "Work two-step trellis around row 3, leave row 5 open, then honeycomb rows 6–7; cable rows 1 and 9.",
    tip: "Treat the two fields as separate tension zones.",
  },
  {
    slug: "outline-framed-van-dyke", title: "Outline-Framed Van Dyke",
    subtitle: "Locked chevrons with smooth frame cords", category: "Traditional English",
    difficulty: "advanced", rows: 6, pleats: 25, repeatPleats: 8,
    garments: ["heirloom yoke", "collar insert", "sampler"], stitchesUsed: ["outline-stitch", "van-dyke"],
    description: "Smooth outline cords frame broad Van Dyke diagonals with pair-locked peaks and valleys.",
    fieldInstruction: "Outline rows 1 and 6; work Van Dyke across rows 3–4, locking an adjacent pair at every turn.",
    tip: "The frame should remain quiet; the locked chevrons are the focal line.",
  },
  {
    slug: "double-van-dyke-band", title: "Double Van Dyke Band",
    subtitle: "Opposed locked chevrons around a center cable", category: "Traditional English",
    difficulty: "advanced", rows: 9, pleats: 25, repeatPleats: 8,
    garments: ["exhibition sampler", "deep yoke", "heirloom panel"], stitchesUsed: ["cable-stitch", "van-dyke"],
    description: "Two opposed Van Dyke courses create a bold advanced field divided by a stabilizing center cable.",
    fieldInstruction: "Work Van Dyke across rows 3–4 and an opposed course across rows 6–7; cable rows 1, 5, and 9.",
    tip: "Mark every peak and valley pair before beginning the second field.",
  },
  {
    slug: "vintage-step-chevron", title: "Vintage Step Chevron",
    subtitle: "A restrained 1930s-style stepped band", category: "Roundup-Inspired Geometrics",
    difficulty: "beginner", rows: 6, pleats: 25, repeatPleats: 8,
    garments: ["vintage yoke", "baby dress", "practice strip"], stitchesUsed: ["cable-stitch", "wave-stitch"],
    description: "A newly charted teaching interpretation of the economical stepped bands seen in early geometric smocking.",
    fieldInstruction: "Cable rows 1 and 6, then work a balanced three-step wave across rows 3–4 with a level closure at every turn.",
    tip: "Pencil a dot over every eighth pleat before beginning the first diagonal.", sources: geometricRoundupSource,
  },
  {
    slug: "heirloom-lattice-1940s", title: "Heirloom Lattice 1940s",
    subtitle: "Small diamonds within a crisp cable frame", category: "Roundup-Inspired Geometrics",
    difficulty: "intermediate", rows: 7, pleats: 25, repeatPleats: 6,
    garments: ["heirloom bishop", "christening yoke", "sampler"], stitchesUsed: ["cable-stitch", "trellis"],
    description: "A compact original lattice that echoes the tidy, repeated diamonds of mid-century smocking references.",
    fieldInstruction: "Cable rows 1 and 7; work mirrored two-step trellis courses around row 4 so both courses share each turn pleat.",
    tip: "Complete one diamond in both directions before extending either course across the width.", sources: geometricRoundupSource,
  },
  {
    slug: "narrow-trellis-ribbon", title: "Narrow Trellis Ribbon",
    subtitle: "A tiny diamond chain for bonnets and cuffs", category: "Roundup-Inspired Geometrics",
    difficulty: "beginner", rows: 5, pleats: 25, repeatPleats: 6,
    garments: ["bonnet front", "sleeve cuff", "collar"], stitchesUsed: ["outline-stitch", "trellis"],
    description: "A slim original trellis ribbon designed to make repeat counting visible on a shallow pleated band.",
    fieldInstruction: "Outline rows 1 and 5, then work two-step mirrored trellis around row 3 with closures every six pleats.",
    tip: "Use a removable marker at every closure pleat; the markers should disappear inside the diamond points.", sources: geometricRoundupSource,
  },
  {
    slug: "princely-chevron-band", title: "Princely Chevron Band",
    subtitle: "Formal locked points divided by a center cable", category: "Roundup-Inspired Geometrics",
    difficulty: "advanced", rows: 9, pleats: 25, repeatPleats: 8,
    garments: ["formal shortall", "tailored yoke", "heirloom panel"], stitchesUsed: ["cable-stitch", "van-dyke"],
    description: "A formal original chevron arrangement inspired by tailored children’s smocking, with a strong center reference line.",
    fieldInstruction: "Cable rows 1, 5, and 9; work opposed Van Dyke courses across rows 3–4 and 6–7, locking each peak pair.",
    tip: "Count and mark every peak pair before threading the needle; never search for the next turn while stitching.", sources: geometricRoundupSource,
  },
  {
    slug: "snowflake-diamond-band", title: "Snowflake Diamond Band",
    subtitle: "Open diamonds stacked around a winter-blue cable", category: "Roundup-Inspired Geometrics",
    difficulty: "intermediate", rows: 9, pleats: 25, repeatPleats: 6,
    garments: ["winter bishop", "holiday yoke", "bonnet"], stitchesUsed: ["cable-stitch", "trellis"],
    description: "Two airy trellis fields create a geometric snowflake rhythm without relying on a copied motif chart.",
    fieldInstruction: "Cable rows 1, 5, and 9; build two-step trellis diamonds around rows 3 and 7 from the same marked starting pleat.",
    tip: "Use the center cable as a ruler: upper and lower diamond points should line up vertically.", sources: geometricRoundupSource,
  },
  {
    slug: "wee-care-heart-trellis", title: "Wee Care Heart Trellis",
    subtitle: "A gentle baby-scale double wave with heart-like openings", category: "Roundup-Inspired Geometrics",
    difficulty: "beginner", rows: 6, pleats: 25, repeatPleats: 6,
    garments: ["preemie gown", "baby bonnet", "tiny yoke"], stitchesUsed: ["cable-stitch", "wave-stitch"],
    description: "A soft original baby-scale band whose opposed two-step waves leave small heart-like negative spaces.",
    fieldInstruction: "Cable rows 1 and 6; work opposed baby waves across rows 3–4, sharing the start and turn pleats every six-pleat repeat.",
    tip: "Use fine thread and lighter tension so the narrow panel remains soft against delicate skin.", sources: geometricRoundupSource,
  },
];

const paletteNames = Object.keys(PLATE_COLORWAYS);
const frameColors = ["#7a3f45", "#6b8a9e", "#c4a35a", "#5a7a78"];
const fieldColors = ["#5a7a78", "#7a8f6e", "#6b8a9e", "#7a3f45"];

export const expandedPlates: PlateMeta[] = seeds.map((seed, index) => {
  const { fieldInstruction, tip, ...meta } = seed;
  const estimatedWidth = seed.pleats / 6;
  const centerLine = seed.pleats % 2
    ? `center pleat ${Math.ceil(seed.pleats / 2)}`
    : `valley between pleats ${seed.pleats / 2} and ${seed.pleats / 2 + 1}`;
  return {
    ...meta,
    finishedWidth: `About ${estimatedWidth.toFixed(1)} in at 6 pleats/in; confirm with a tension sample`,
    fabricWidth: `Start with about ${(estimatedWidth * 3).toFixed(1)} in at 3:1 compression; test this fabric first`,
    centerLine,
    symmetry: "Center one complete repeat on the marked center reference",
    threadWeight: "3 strands cotton floss or No. 8 pearl cotton",
    colorSuggestions: paletteNames,
    threads: [
      { id: "frame", name: "Frame thread", hex: frameColors[index % frameColors.length] },
      { id: "field", name: "Field thread", hex: fieldColors[index % fieldColors.length] },
    ],
    embroideryStitches: [],
    instructions: [
      `Pleat ${seed.rows} gathering rows across at least ${seed.pleats} pleat mountains.`,
      `Mark ${centerLine} and the ${seed.repeatPleats}-pleat-interval repeat before stitching.`,
      fieldInstruction,
      "Check the first complete repeat against the working graph before continuing.",
      "Block to the measured garment width; use the listed width only as a sampling estimate.",
    ],
    tips: [tip, "Keep gathering threads in place until every structural course is complete."],
    cells: {},
  };
});
