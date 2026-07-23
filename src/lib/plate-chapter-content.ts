export type ChapterConfidence = "confirmed" | "interpreted" | "provisional";

export interface PlateChapterMistake {
  title: string;
  appearance: string;
  correction: string;
  unpick: string;
}

export interface PlateChapterContent {
  slug: string;
  confidence: ChapterConfidence;
  overview: string;
  motifExplanation: string;
  repeatGuidance: readonly string[];
  sequenceNote: string;
  mistakes: readonly PlateChapterMistake[];
  garmentNotes: Readonly<Record<string, string>>;
  interpretationNotes: readonly string[];
  tensionReminder: string;
}

const sharedMistakes: readonly PlateChapterMistake[] = [
  { title: "Stitches pulled too tightly", appearance: "Pleats pinch and the design cannot open after blocking.", correction: "Ease the working thread until every pleat fold stays rounded.", unpick: "Unpick if the fabric remains distorted after gentle easing." },
  { title: "Skipped pleat", appearance: "The repeat widens suddenly and later vertices no longer align.", correction: "Mark repeat boundaries and count the next pleat before every change of direction.", unpick: "Return to the skipped pleat; do not compensate in a later repeat." },
  { title: "Uneven stitch depth", appearance: "A level course wanders or diagonal steps have different lengths.", correction: "Catch the same shallow bite on the crown of every pleat.", unpick: "Only the visibly uneven section." },
  { title: "Lost repeat position", appearance: "A motif ends between the intended boundary markers.", correction: "Pause at each boundary and compare the ending point with the printed repeat map.", unpick: "Unpick to the last verified boundary." },
];

export const plateChapterContent: Readonly<Record<string, PlateChapterContent>> = {
  "cable-borders": {
    slug: "cable-borders",
    confidence: "confirmed",
    overview: "Two straight cable courses stabilize a pleated band while leaving an open center field. This is the control chapter for learning tension, cable direction, and consistent stitch depth.",
    motifExplanation: "The visible design is the pair of level cords. Each cord is made by alternating the working thread above and below the needle while moving one pleat at a time.",
    repeatGuidance: ["One cable interval is the repeat unit.", "Continue across every pleat without cutting the thread.", "Stop at the last complete adjacent-pleat pair and secure on the wrong side."],
    sequenceNote: "The generated sequence shows each adjacent-pleat cable movement for both control rows.",
    mistakes: sharedMistakes,
    garmentNotes: { "bishop practice strip": "Use as a tension sample before shaping the neckline.", "yoke sample": "Keep both rows parallel to the yoke seam line.", "bonnet band": "Work relaxed cables so the band can curve without buckling." },
    interpretationNotes: ["Course geometry comes directly from the plate’s two declared cable rows.", "Cable direction alternates at each adjacent pleat; thread-side labels are shown in the sequence."],
    tensionReminder: "Snug enough to form an even cord, never tight enough to flatten the pleat crowns.",
  },
  "classic-trellis": {
    slug: "classic-trellis",
    confidence: "confirmed",
    overview: "A cable frame surrounds two mirrored stepped-wave courses. Their shared vertices form the open diamonds recognized as classic English-smocking trellis.",
    motifExplanation: "The diamond does not come from a separate stitch. It appears where the upper and lower trellis courses meet on the center row with equal ascent and descent counts.",
    repeatGuidance: ["Mark every tenth pleat for the declared repeat.", "Complete each course across the full width before starting its mirror.", "At an incomplete edge, finish the last balanced turn rather than compressing the steps."],
    sequenceNote: "Follow the upper closures first, then the lower mirrored closures. Fractional row positions represent equal measured steps between gathering rows.",
    mistakes: [...sharedMistakes, { title: "Trellis vertices miss", appearance: "The upper and lower courses cross instead of sharing a point.", correction: "Match each turn pleat and keep the step height identical on both courses.", unpick: "Unpick the second course to its last shared vertex." }],
    garmentNotes: { "heirloom bishop": "Block the diamonds evenly around the neckline curve.", "christening yoke": "Center a complete diamond at center front.", "special-occasion yoke": "Leave balanced plain pleats at both side seams if the width is not an exact repeat." },
    interpretationNotes: ["The course generator follows the plate’s declared rows 3–5 and four-step trellis construction.", "The ten-pleat repeat includes turn closures; it should not be shortened to eight diagonal steps."],
    tensionReminder: "Keep diagonals relaxed and apply only enough tension at shared vertices to define the diamond.",
  },
  "bullion-rose-arbor": {
    slug: "bullion-rose-arbor",
    confidence: "confirmed",
    overview: "Cable borders and a lower three-step wave stabilize an open field for a repeating surface-embroidered rose arbor.",
    motifExplanation: "The smocking foundation is completed first. Stem stitch, three bullion coils, detached-chain leaves, and straight-stitch sepals are then added over the blocked pleats.",
    repeatGuidance: ["Mark every eighth pleat for the arbor motif.", "Complete and block all structural smocking before surface embroidery.", "Repeat the stem continuously; add flowers and leaves one motif at a time."],
    sequenceNote: "The interactive path covers the structural smocking. The embroidery instructions remain a separate layer because bullion and detached-chain stitches are worked after blocking.",
    mistakes: [...sharedMistakes, { title: "Embroidery added too early", appearance: "Rose coils distort when the smocked band is stretched for blocking.", correction: "Finish and block the cable-and-wave foundation before adding the arbor.", unpick: "Remove surface embroidery if it prevents the foundation from settling." }],
    garmentNotes: { "heirloom bishop": "Balance a rose repeat at center front and follow the neckline curve with the stem.", "christening yoke": "Use fine thread and test bullion bulk against the garment fabric.", "sampler": "Leave margin above the arbor so the bullion coils are not crowded." },
    interpretationNotes: ["The structural path is generated from the declared cable and three-step wave courses.", "Surface-embroidery coordinates come from the existing normalized motif chart and are not treated as pleat-entry points."],
    tensionReminder: "Keep the smocking foundation elastic; bullion coils should lie together without crushing the pleats beneath them.",
  },
  "christmas-ornament-row": {
    slug: "christmas-ornament-row",
    confidence: "confirmed",
    overview: "Jewel-colored ornaments are constructed from dense adjacent-pleat cable stitches over stabilizing wrong-side back-smocking.",
    motifExplanation: "Each colored chart mark is one cable stitch. Stacked marks build the ornament silhouette; the dashed neutral courses stabilize the top and bottom from the wrong side.",
    repeatGuidance: ["The chart contains four identical eight-pleat repeats across 33 pleats.", "Verify the first ornament before repeating the color blocks.", "Use separate short thread lengths for isolated colors rather than carrying dark thread behind pale fabric."],
    sequenceNote: "Work from the bottom chart row upward, completing one color block at a time. Hidden back-smocking movements remain visually secondary.",
    mistakes: [...sharedMistakes, { title: "Color carried across open fabric", appearance: "Dark floats shadow through pale pleats between ornaments.", correction: "End the color securely and restart at the next isolated block.", unpick: "Yes when the carried thread is visible from the front." }],
    garmentNotes: { "Christmas bishop": "Center the join between the two middle ornaments at center front.", "holiday yoke": "Keep back-smocking elastic enough for the finished yoke width.", "romper": "Sample the dense picture area to confirm it remains comfortable and flexible." },
    interpretationNotes: ["This is an original teaching chart; its linked source is theme reference only.", "The generated sequence derives directly from the picture chart and includes wrong-side stabilization as hidden travel."],
    tensionReminder: "Cable stitches should meet cleanly without creating a rigid block; check elasticity after every chart row.",
  },
};

export function validatePlateChapterContent(content: PlateChapterContent): string[] {
  const errors: string[] = [];
  if (!content.slug) errors.push("missing slug");
  if (!content.overview.trim()) errors.push(`${content.slug}: missing overview`);
  if (content.repeatGuidance.length < 3) errors.push(`${content.slug}: needs at least three repeat instructions`);
  if (content.mistakes.length < 4) errors.push(`${content.slug}: needs at least four mistake entries`);
  if (Object.keys(content.garmentNotes).length < 1) errors.push(`${content.slug}: missing garment application notes`);
  if (content.interpretationNotes.length < 1) errors.push(`${content.slug}: missing interpretation notes`);
  return errors;
}

export function isAutoGeometricPlate(plate: PlateMeta): boolean {
  return !plate.pictureChart && !plate.motif;
}

export function isAutoMotifPlate(plate: PlateMeta): boolean {
  return Boolean(plate.motif) && !plate.pictureChart;
}

export function isAutoPicturePlate(plate: PlateMeta): boolean {
  return Boolean(plate.pictureChart);
}

function stitchLabel(stitch: string): string {
  return stitch.replaceAll("-", " ");
}

export function deriveGeometricChapterContent(plate: PlateMeta): PlateChapterContent {
  const stitches = plate.stitchesUsed.map(stitchLabel);
  const distinctiveMistake: PlateChapterMistake = plate.stitchesUsed.includes("trellis")
    ? { title: "Trellis turns do not meet", appearance: "Mirrored courses cross or leave an open vertex.", correction: "Match the turn pleat and measured step depth before continuing the mirrored course.", unpick: "Return to the last shared vertex." }
    : plate.stitchesUsed.includes("honeycomb") || plate.stitchesUsed.includes("surface-honeycomb")
      ? { title: "Honeycomb cells collapse", appearance: "The cells remain pinched instead of opening into an even lattice.", correction: "Relax each bind and verify that overlapping pairs share exactly one pleat.", unpick: "Unpick any bind that joins the wrong pair." }
      : plate.stitchesUsed.includes("van-dyke")
        ? { title: "Travel/lock pair is incomplete", appearance: "The Van Dyke chain has a gap or one pleat is not secured.", correction: "Check that the traveling stitch used an old and new pleat, then repeat through those same two pleats for the lock.", unpick: "Return to the first incomplete pair." }
        : { title: "Cable direction changes", appearance: "A smooth course develops an isolated reversed twist.", correction: "Keep the thread on the declared side of the needle for the current stitch.", unpick: "Return to the last correctly oriented stitch." };
  const garmentNotes = Object.fromEntries(plate.garments.map((garment) => [
    garment,
    `Center a complete ${plate.repeatPleats}-pleat repeat on the most visible ${garment} line and balance any unused pleats at both edges.`,
  ]));
  return {
    slug: plate.slug,
    confidence: "confirmed",
    overview: `${plate.description} This chapter expands the plate into a beginner-readable grid, continuous course sequence, repeat map, troubleshooting guide, garment placement, and print reference.`,
    motifExplanation: `The visible structure is built from ${stitches.join(", ")}. Complete each course across the full width in the listed order so shared turns and control rows remain aligned.`,
    repeatGuidance: [
      `Mark the first pleat and every ${plate.repeatPleats} pleats before stitching.`,
      "Complete each course across the full pleated width without cutting the thread at every repeat.",
      "If the final space is incomplete, stop at the last balanced structural turn and secure the thread on the wrong side.",
    ],
    sequenceNote: `The sequence is generated from the plate’s ${plate.rows}-row course geometry and shows one ${plate.repeatPleats}-pleat repeat plus its shared ending boundary.`,
    mistakes: [...sharedMistakes, distinctiveMistake],
    garmentNotes,
    interpretationNotes: [
      `Rows, pleat positions, thread assignments, and movement order are generated directly from the existing ${plate.title} course definition.`,
      "Fractional row coordinates indicate evenly measured stitch depth between gathering rows; they are not additional gathering threads.",
      "The finished rendering is instructional and should be compared with a tension sample before working the garment.",
    ],
    tensionReminder: plate.tips[0] ?? "Keep the working thread even while allowing the pleat crowns and open spaces to retain their shape.",
  };
}

export function deriveMotifChapterContent(plate: PlateMeta): PlateChapterContent {
  const motif = plate.motif;
  if (!motif) throw new Error(`${plate.slug}: cannot derive motif chapter without a motif chart`);
  const embroidery = plate.embroideryStitches?.join(", ") || "charted surface embroidery";
  return {
    slug: plate.slug,
    confidence: "confirmed",
    overview: `${plate.description} The chapter separates the structural smocking from the surface embroidery (${embroidery}) added after the pleats have been stitched and blocked.`,
    motifExplanation: `First complete the structural courses shown on the pleated grid. After blocking, work the surface motif in this order: ${motif.instructions.join(" ")}`,
    repeatGuidance: [
      `Mark every ${plate.repeatPleats} pleats for the structural and embroidery repeat.`,
      "Complete and block the structural smocking across the full width before beginning surface embroidery.",
      "Carry a continuous stem only where the motif chart connects it; end isolated flowers, knots, and fills securely on the wrong side.",
    ],
    sequenceNote: `The first sequence covers the structural smocking. The separate embroidery sequence then reveals all ${motif.elements.length} normalized motif elements in their charted order.`,
    mistakes: [...sharedMistakes,
      { title: "Embroidery added before blocking", appearance: "Motifs distort or pull apart when the smocked panel is stretched to its finished width.", correction: "Remove the surface work, block the structural smocking, then transfer the motif centers again.", unpick: "Yes when the motif prevents even blocking." },
      { title: "Motif center drifts", appearance: "Flowers or figures no longer sit inside their intended repeat windows.", correction: `Mark every ${motif.repeatPleats}-pleat motif center after blocking and verify the first complete repeat.`, unpick: "Unpick only the misplaced surface element." },
    ],
    garmentNotes: Object.fromEntries(plate.garments.map((garment) => [garment, `Center a complete embroidered motif on the principal ${garment} line and preserve clear space around raised stitches.`])),
    interpretationNotes: [
      "Structural needle paths are generated from the existing plate-course definition.",
      "Surface-embroidery positions are normalized within one repeat and are intentionally shown as a separate flat overlay rather than pleat-entry coordinates.",
      `The declared motif repeat of ${motif.repeatPleats} pleats matches the structural repeat of ${plate.repeatPleats} pleats.`,
    ],
    tensionReminder: "Keep structural smocking elastic; lay surface stitches smoothly over the blocked pleats without using them to pull the fabric into shape.",
  };
}

export function derivePictureChapterContent(plate: PlateMeta): PlateChapterContent {
  const chart = plate.pictureChart;
  if (!chart) throw new Error(`${plate.slug}: cannot derive picture chapter without a picture chart`);
  const colors = new Set(Object.values(chart.legend)).size;
  const backRows = chart.backSmocking?.length ?? 0;
  return {
    slug: plate.slug,
    confidence: "confirmed",
    overview: `${plate.description} This picture-smocking chapter turns the dense color chart into a bottom-up row progression with color isolation, back-smocking visibility, stitch counting, and a complete needle sequence.`,
    motifExplanation: `The picture is built from ${chart.grid.length} chart rows and ${colors} thread color${colors === 1 ? "" : "s"}. Each colored mark represents one cable stitch between adjacent pleats; the silhouette becomes readable as the rows accumulate from the bottom upward.`,
    repeatGuidance: [
      `Mark every ${plate.repeatPleats} pleats and verify the first complete picture before continuing across the width.`,
      "Work from the bottom chart row upward, finishing one isolated color block before moving to the next block.",
      "End and restart thread across open areas instead of carrying a dark float behind pale fabric.",
    ],
    sequenceNote: `The generated sequence includes every charted cable movement and ${backRows} wrong-side back-smocking course${backRows === 1 ? "" : "s"}; use the picture chart controls to rehearse the same construction row by row.`,
    mistakes: [...sharedMistakes,
      { title: "Chart worked from the top down", appearance: "The picture is difficult to support and row alignment drifts as the motif grows.", correction: "Rotate your reading order: begin with the bottom visible chart row and move upward one row at a time.", unpick: "Return to the last complete bottom-up row if alignment has shifted." },
      { title: "Color carried across open fabric", appearance: "Long floats shadow through the fabric or catch on the wrong side.", correction: "Finish the color securely and restart at the next isolated block.", unpick: "Yes when the float is visible or restricts the pleats." },
      { title: "Back-smocking omitted", appearance: "Dense colored blocks buckle or spread unevenly when the panel is handled.", correction: "Add the declared wrong-side stabilizing rows without pulling away the panel's elasticity.", unpick: "Usually no; add the missing support before continuing upward." },
    ],
    garmentNotes: Object.fromEntries(plate.garments.map((garment) => [garment, `Center one complete ${plate.repeatPleats}-pleat picture on the principal ${garment} line and confirm that the dense stitched area remains flexible.`])),
    interpretationNotes: [
      "Every visible stitch is generated directly from the existing character grid and its thread legend.",
      "Chart row 1 is displayed at the top, but the working progression reveals the lowest row first to match picture-smocking construction.",
      "Dashed back-smocking is worked on the wrong side and can be hidden in the interactive chart without removing it from the needle sequence.",
    ],
    tensionReminder: "Keep each cable stitch neat but elastic; check that the picture block can still spread gently after every completed chart row.",
  };
}

const chapterErrors = Object.values(plateChapterContent).flatMap(validatePlateChapterContent);
if (chapterErrors.length > 0) throw new Error(`Invalid rich plate chapters:\n${chapterErrors.join("\n")}`);
import type { PlateMeta } from "./plate-types";
