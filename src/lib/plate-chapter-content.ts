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

const chapterErrors = Object.values(plateChapterContent).flatMap(validatePlateChapterContent);
if (chapterErrors.length > 0) throw new Error(`Invalid rich plate chapters:\n${chapterErrors.join("\n")}`);
