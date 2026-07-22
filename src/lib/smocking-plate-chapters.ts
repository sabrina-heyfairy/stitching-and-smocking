export type DaisyLayer = "border" | "daisy" | "trellis";

export interface PlateRowInstruction {
  id: string;
  rows: string;
  layer: DaisyLayer;
  title: string;
  direction: string;
  instruction: string;
  sourceConfidence: "confirmed" | "interpreted";
}

export interface StitchSequenceStep {
  id: number;
  phase: string;
  layer: DaisyLayer;
  row: number;
  pleat: number;
  stitch: string;
  direction: "up" | "down";
  from: readonly [number, number];
  to: readonly [number, number];
  instruction: string;
}

export interface PlateMistake {
  id: string;
  title: string;
  appearance: string;
  cause: string;
  correction: string;
  unpick: string;
}

export interface SmockingPlateChapter {
  id: string;
  title: string;
  designer: string;
  source: string;
  difficulty: string;
  pleaterRows: number;
  workingRows: readonly number[];
  repeatWidth: number;
  threadColors: readonly { id: DaisyLayer; name: string; hex: string }[];
  materials: readonly string[];
  overview: string;
  rowInstructions: readonly PlateRowInstruction[];
  stitchSequence: readonly StitchSequenceStep[];
  repeatInstructions: readonly string[];
  commonMistakes: readonly PlateMistake[];
  garmentApplications: readonly { name: string; note: string }[];
  interpretationNotes: readonly string[];
  assets: { originalSourceLabel: string; prototypeLabel: string };
  printReference: {
    tension: string;
    start: string;
    end: string;
  };
}

export const daisyPlate: SmockingPlateChapter = {
  id: "daisy",
  title: "Daisy Smocking Plate",
  designer: "Pink Hollybush Designs",
  source: "Original one-page Daisy Smocking Plate, copyright 2021; supplied by the repository owner for instructional interpretation.",
  difficulty: "Intermediate · sample first",
  pleaterRows: 8,
  workingRows: [1, 2, 3, 4, 5, 6, 7, 8],
  repeatWidth: 8,
  threadColors: [
    { id: "border", name: "Cable border", hex: "#cf4774" },
    { id: "daisy", name: "Daisy framework", hex: "#b43f69" },
    { id: "trellis", name: "Trellis leaves", hex: "#57724a" },
  ],
  materials: [
    "Evenly pleated lightweight cotton, gathering rows 1–8 retained",
    "Three strands of stranded cotton or comparable smocking thread",
    "Crewel needle sized to pass through pleat folds without splitting gathering thread",
    "Removable center and repeat markers",
  ],
  overview:
    "A continuous flower-and-leaf band. Cable work across rows 1–2 stabilizes the top; mirrored cable movements across rows 2–5 create the framework and negative space read as daisies; stepped trellis across rows 5–8 creates the lower leaf band.",
  rowInstructions: [
    {
      id: "border-1",
      rows: "Rows 1–2",
      layer: "border",
      title: "Cable border",
      direction: "Left to right",
      instruction:
        "Cable across row 1 beginning with an up cable. Cable across row 2 beginning with a down cable—the reverse of row 1.",
      sourceConfidence: "confirmed",
    },
    {
      id: "daisy-upper",
      rows: "Rows 2–4",
      layer: "daisy",
      title: "Upper daisy framework",
      direction: "Across one repeat, then continue",
      instruction:
        "From row 2, alternate cable direction while stepping down in quarter-row increments, make the half-step excursion to row 3, then return to row 2. Keep each repeat connected to the next.",
      sourceConfidence: "interpreted",
    },
    {
      id: "daisy-lower",
      rows: "Rows 4–5",
      layer: "daisy",
      title: "Mirrored lower framework",
      direction: "Mirror the upper framework",
      instruction:
        "Work the corresponding mirrored sequence between rows 4 and 5 so adjacent flower spaces share their side framework.",
      sourceConfidence: "interpreted",
    },
    {
      id: "trellis",
      rows: "Rows 5–8",
      layer: "trellis",
      title: "Seven-step trellis",
      direction: "Down, up, and repeat across",
      instruction:
        "Beginning with an up cable on row 5, work the seven-step trellis to the lower quarter-row positions indicated by the source, then repeat the same rhythm across the width.",
      sourceConfidence: "interpreted",
    },
  ],
  stitchSequence: [
    { id: 1, phase: "Row 1 cable border", layer: "border", row: 1, pleat: 1, stitch: "Up cable", direction: "up", from: [1, 1], to: [2, 1], instruction: "Begin row 1 at pleat 1 with an up cable into pleat 2." },
    { id: 2, phase: "Row 1 cable border", layer: "border", row: 1, pleat: 2, stitch: "Down cable", direction: "down", from: [2, 1], to: [3, 1], instruction: "Alternate with a down cable into pleat 3, keeping the cable level on row 1." },
    { id: 3, phase: "Row 1 cable border", layer: "border", row: 1, pleat: 3, stitch: "Up cable", direction: "up", from: [3, 1], to: [4, 1], instruction: "Work the next up cable into pleat 4." },
    { id: 4, phase: "Row 1 cable border", layer: "border", row: 1, pleat: 4, stitch: "Down cable", direction: "down", from: [4, 1], to: [5, 1], instruction: "Continue alternating across the first half of the repeat." },
    { id: 5, phase: "Row 1 cable border", layer: "border", row: 1, pleat: 5, stitch: "Up cable", direction: "up", from: [5, 1], to: [6, 1], instruction: "Work an up cable into pleat 6." },
    { id: 6, phase: "Row 1 cable border", layer: "border", row: 1, pleat: 6, stitch: "Down cable", direction: "down", from: [6, 1], to: [7, 1], instruction: "Work a down cable into pleat 7." },
    { id: 7, phase: "Row 1 cable border", layer: "border", row: 1, pleat: 7, stitch: "Up cable", direction: "up", from: [7, 1], to: [8, 1], instruction: "Work an up cable into pleat 8." },
    { id: 8, phase: "Row 1 cable border", layer: "border", row: 1, pleat: 8, stitch: "Down cable", direction: "down", from: [8, 1], to: [9, 1], instruction: "Finish the teaching repeat at the shared boundary pleat; continue across the full row." },
    { id: 9, phase: "Row 2 reverse cable", layer: "border", row: 2, pleat: 1, stitch: "Down cable", direction: "down", from: [1, 2], to: [2, 2], instruction: "Begin row 2 with a down cable—the reverse of row 1." },
    { id: 10, phase: "Row 2 reverse cable", layer: "border", row: 2, pleat: 2, stitch: "Up cable", direction: "up", from: [2, 2], to: [3, 2], instruction: "Alternate with an up cable into pleat 3." },
    { id: 11, phase: "Row 2 reverse cable", layer: "border", row: 2, pleat: 3, stitch: "Down cable", direction: "down", from: [3, 2], to: [4, 2], instruction: "Keep the reverse cable rhythm level across row 2." },
    { id: 12, phase: "Row 2 reverse cable", layer: "border", row: 2, pleat: 4, stitch: "Up cable", direction: "up", from: [4, 2], to: [5, 2], instruction: "Work an up cable into pleat 5." },
    { id: 13, phase: "Row 2 reverse cable", layer: "border", row: 2, pleat: 5, stitch: "Down cable", direction: "down", from: [5, 2], to: [6, 2], instruction: "Begin the second half of the repeat with a down cable." },
    { id: 14, phase: "Row 2 reverse cable", layer: "border", row: 2, pleat: 6, stitch: "Up cable", direction: "up", from: [6, 2], to: [7, 2], instruction: "Work an up cable into pleat 7." },
    { id: 15, phase: "Row 2 reverse cable", layer: "border", row: 2, pleat: 7, stitch: "Down cable", direction: "down", from: [7, 2], to: [8, 2], instruction: "Work a down cable into pleat 8." },
    { id: 16, phase: "Row 2 reverse cable", layer: "border", row: 2, pleat: 8, stitch: "Up cable", direction: "up", from: [8, 2], to: [9, 2], instruction: "Reach the shared boundary and continue the reverse cable across the full row." },
    { id: 17, phase: "Upper Daisy framework", layer: "daisy", row: 2, pleat: 1, stitch: "Down cable", direction: "down", from: [1, 2], to: [2, 3], instruction: "Begin the flower framework at row 2, pleat 1 and move down toward row 3." },
    { id: 18, phase: "Upper Daisy framework", layer: "daisy", row: 3, pleat: 2, stitch: "Down cable", direction: "down", from: [2, 3], to: [3, 4], instruction: "Continue the descent to row 4, pleat 3." },
    { id: 19, phase: "Upper Daisy framework", layer: "daisy", row: 4, pleat: 3, stitch: "Up cable", direction: "up", from: [3, 4], to: [4, 3], instruction: "Reverse direction and cable up to row 3, pleat 4." },
    { id: 20, phase: "Upper Daisy framework", layer: "daisy", row: 3, pleat: 4, stitch: "Up cable", direction: "up", from: [4, 3], to: [5, 2], instruction: "Return to row 2 to close the first side of the flower space." },
    { id: 21, phase: "Upper Daisy framework", layer: "daisy", row: 2, pleat: 5, stitch: "Down cable", direction: "down", from: [5, 2], to: [6, 3], instruction: "Start the shared side of the next flower with a down cable." },
    { id: 22, phase: "Upper Daisy framework", layer: "daisy", row: 3, pleat: 6, stitch: "Down cable", direction: "down", from: [6, 3], to: [7, 4], instruction: "Continue down to row 4 with matching depth." },
    { id: 23, phase: "Upper Daisy framework", layer: "daisy", row: 4, pleat: 7, stitch: "Up cable", direction: "up", from: [7, 4], to: [8, 3], instruction: "Turn upward at the lower point of the framework." },
    { id: 24, phase: "Upper Daisy framework", layer: "daisy", row: 3, pleat: 8, stitch: "Up cable", direction: "up", from: [8, 3], to: [9, 2], instruction: "Return to row 2 at the next repeat boundary." },
    { id: 25, phase: "Mirrored lower framework", layer: "daisy", row: 4, pleat: 1, stitch: "Down cable", direction: "down", from: [1, 4], to: [2, 5], instruction: "Begin the interpreted mirrored framework at row 4 and move down to row 5." },
    { id: 26, phase: "Mirrored lower framework", layer: "daisy", row: 5, pleat: 2, stitch: "Up cable", direction: "up", from: [2, 5], to: [3, 4], instruction: "Return to row 4 to make the first lower point." },
    { id: 27, phase: "Mirrored lower framework", layer: "daisy", row: 4, pleat: 3, stitch: "Down cable", direction: "down", from: [3, 4], to: [4, 5], instruction: "Repeat the mirrored movement toward row 5." },
    { id: 28, phase: "Mirrored lower framework", layer: "daisy", row: 5, pleat: 4, stitch: "Up cable", direction: "up", from: [4, 5], to: [5, 4], instruction: "Return to row 4 at the center shared boundary." },
    { id: 29, phase: "Mirrored lower framework", layer: "daisy", row: 4, pleat: 5, stitch: "Down cable", direction: "down", from: [5, 4], to: [6, 5], instruction: "Continue the second half of the mirrored framework." },
    { id: 30, phase: "Mirrored lower framework", layer: "daisy", row: 5, pleat: 6, stitch: "Up cable", direction: "up", from: [6, 5], to: [7, 4], instruction: "Return to row 4 while preserving the same stitch depth." },
    { id: 31, phase: "Mirrored lower framework", layer: "daisy", row: 4, pleat: 7, stitch: "Down cable", direction: "down", from: [7, 4], to: [8, 5], instruction: "Move down to the last pleat inside the repeat." },
    { id: 32, phase: "Mirrored lower framework", layer: "daisy", row: 5, pleat: 8, stitch: "Up cable", direction: "up", from: [8, 5], to: [9, 4], instruction: "Return to row 4 at the shared boundary." },
    { id: 33, phase: "Seven-step trellis", layer: "trellis", row: 5, pleat: 1, stitch: "Down trellis step", direction: "down", from: [1, 5], to: [2, 6], instruction: "Begin at row 5 and step down one level on the next pleat." },
    { id: 34, phase: "Seven-step trellis", layer: "trellis", row: 6, pleat: 2, stitch: "Down trellis step", direction: "down", from: [2, 6], to: [3, 7], instruction: "Continue the descent to row 7." },
    { id: 35, phase: "Seven-step trellis", layer: "trellis", row: 7, pleat: 3, stitch: "Down trellis step", direction: "down", from: [3, 7], to: [4, 8], instruction: "Reach the lower point at row 8." },
    { id: 36, phase: "Seven-step trellis", layer: "trellis", row: 8, pleat: 4, stitch: "Up trellis step", direction: "up", from: [4, 8], to: [5, 7], instruction: "Turn and step upward to row 7." },
    { id: 37, phase: "Seven-step trellis", layer: "trellis", row: 7, pleat: 5, stitch: "Up trellis step", direction: "up", from: [5, 7], to: [6, 6], instruction: "Continue upward to row 6." },
    { id: 38, phase: "Seven-step trellis", layer: "trellis", row: 6, pleat: 6, stitch: "Up trellis step", direction: "up", from: [6, 6], to: [7, 5], instruction: "Return to row 5 to complete the rising side." },
    { id: 39, phase: "Seven-step trellis", layer: "trellis", row: 5, pleat: 7, stitch: "Down trellis step", direction: "down", from: [7, 5], to: [8, 6], instruction: "Begin the next descent without cutting the thread." },
    { id: 40, phase: "Seven-step trellis", layer: "trellis", row: 6, pleat: 8, stitch: "Down trellis step", direction: "down", from: [8, 6], to: [9, 7], instruction: "Continue into the next repeat; follow the source’s fractional-row placements on the actual fabric." },
  ],
  repeatInstructions: [
    "Mark the first pleat and every eighth pleat before stitching.",
    "Work the row sequence continuously across the pleated width; do not tie off after each flower.",
    "The ending point of one repeat is the starting boundary of the next.",
    "If fewer than eight pleats remain, stop at the last complete shared boundary rather than compressing the motif.",
    "Secure the thread on the back and leave the incomplete edge area plain or balance it during garment blocking.",
  ],
  commonMistakes: [
    { id: "tight", title: "Cables pulled too tightly", appearance: "Flower spaces pinch closed.", cause: "The working thread is cinched after every cable.", correction: "Ease each cable until the pleat folds remain rounded.", unpick: "Usually yes if the petals cannot open." },
    { id: "skipped", title: "Skipped pleat", appearance: "One daisy is wider and the repeat drifts.", cause: "The next valley was mistaken for the next pleat.", correction: "Count and mark eight-pleat repeats before continuing.", unpick: "Yes, back to the skipped pleat." },
    { id: "direction", title: "Incorrect cable direction", appearance: "The cord twists inconsistently at a turn.", cause: "An up cable was substituted for a down cable, or vice versa.", correction: "Keep the working thread consistently above or below the needle for the named cable.", unpick: "Yes, to the last correct turn." },
    { id: "depth", title: "Uneven stitch depth", appearance: "The framework looks jagged instead of mirrored.", cause: "Needle bites vary in depth on the pleat fold.", correction: "Catch the same shallow depth of fabric on every pleat.", unpick: "Only the visibly uneven section." },
    { id: "trellis", title: "Trellis steps do not match", appearance: "Leaf points land on different levels.", cause: "A quarter-row step was enlarged or omitted.", correction: "Use the gathering rows as fixed guides and compare every seventh step.", unpick: "Yes, to the last matched point." },
    { id: "repeat", title: "Lost repeat position", appearance: "Shared boundaries double or disappear.", cause: "The repeat ending pleat was not treated as the next start.", correction: "Use removable markers at repeat boundaries and move them only after checking.", unpick: "Only if the shared boundary is wrong." },
    { id: "gathering", title: "Stitched into gathering thread", appearance: "A holding thread is trapped or splits when removed.", cause: "The needle caught thread instead of only fabric at the pleat fold.", correction: "Angle the needle through fabric beside the gathering thread.", unpick: "Yes—free the gathering thread before proceeding." },
  ],
  garmentApplications: [
    { name: "Bishop neckline", note: "Curve the band during blocking; keep all complete repeats visually balanced from center front." },
    { name: "Yoke", note: "Center a daisy at center front and allow plain pleats at the side seams if needed." },
    { name: "Baby dress", note: "Use a lightweight thread and relaxed tension so the bodice remains supple." },
    { name: "Bubble or romper", note: "Place the band above the fullest chest area and test movement before construction." },
  ],
  interpretationNotes: [
    "The supplied source confirms row 1 begins with an up cable and row 2 begins with a down cable.",
    "The source prose repeats “Beginning on Row 4” for two different operations. This chapter treats the second occurrence as the mirrored lower daisy framework, following the visible source diagram.",
    "The source describes quarter-row and fractional-row trellis positions (including 6¾ and later offsets) that cannot be represented as whole gathering rows. The diagrams show their rhythm between rows 5–8 and label the geometry as an interpretation, not a replacement master plate.",
    "The exact commercial repeat boundary is not explicitly dimensioned. Eight pleats is used here as a teaching repeat based on the visible framework; sample one repeat and compare it with the source before beginning a garment.",
  ],
  assets: {
    originalSourceLabel: "Original Daisy Smocking Plate screenshot supplied by repository owner",
    prototypeLabel: "Daisy encyclopedia infographic supplied as visual direction",
  },
  printReference: {
    tension: "Snug enough to define the cable, loose enough that the pleat folds stay rounded and the flower space opens.",
    start: "Row 1 cable begins with an up cable; daisy teaching repeat begins at row 2 on a marked boundary pleat.",
    end: "Finish at a complete shared boundary, secure on the wrong side, then continue the next row as directed.",
  },
};

export function clampSequenceStep(step: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(Math.max(Math.trunc(step), 0), total - 1);
}
