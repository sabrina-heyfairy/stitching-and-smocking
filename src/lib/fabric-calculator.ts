/**
 * Read 16 fabric calculator — pure logic.
 *
 * Orientation (English smocking on a Read pleater):
 * - Fabric LENGTH fed through the rollers becomes the across-garment WIDTH after gathering.
 * - Fabric DEPTH across the needles becomes the smocked band DEPTH (gathering rows).
 *
 * Classic rule (Read manuals & heirloom teaching): ~3:1 fabric:finished width.
 * Fine fabrics often need more; heavier fabrics less. Always sample.
 */

export const READ16 = {
  needleCount: 16,
  /** Historically typical spacing on common Read castings — verify on your machine. */
  defaultNeedleSpacingIn: 3 / 16,
  needleSpacingNote:
    "Classic Read 16 needle pitch is often about 3/16\". Measure tip-to-tip on your bar and override if different.",
} as const;

export type Unit = "in" | "cm";

export interface FabricPreset {
  id: string;
  label: string;
  ratio: number;
  note: string;
}

/** Recommended starting ratios — guidelines, not guarantees. */
export const FABRIC_PRESETS: FabricPreset[] = [
  {
    id: "batiste",
    label: "Batiste / fine lawn",
    ratio: 3.5,
    note: "Fine fabrics often need more than 3:1 for pleasing density.",
  },
  {
    id: "lawn",
    label: "Cotton lawn / broadcloth",
    ratio: 3.0,
    note: "The classic teaching ratio used in most English smocking patterns.",
  },
  {
    id: "liberty",
    label: "Liberty-weight cotton",
    ratio: 3.0,
    note: "Start at 3:1; sample — some prints prefer slightly more fullness.",
  },
  {
    id: "linen",
    label: "Fine linen",
    ratio: 2.75,
    note: "More body than batiste; often a touch less fabric than 3:1.",
  },
  {
    id: "voile",
    label: "Voile",
    ratio: 3.75,
    note: "Soft and thin — often wants extra fullness.",
  },
  {
    id: "custom",
    label: "Custom ratio",
    ratio: 3.0,
    note: "Enter your sampled ratio from a test strip.",
  },
];

export interface FullnessPreset {
  id: string;
  label: string;
  /** Multiplier applied on top of fabric base ratio */
  factor: number;
  note: string;
}

export const FULLNESS_PRESETS: FullnessPreset[] = [
  {
    id: "closer",
    label: "Denser pleats",
    factor: 1.15,
    note: "Slightly more fabric for a packed heirloom look.",
  },
  {
    id: "standard",
    label: "Standard (pattern)",
    factor: 1,
    note: "Matches the usual pattern assumption.",
  },
  {
    id: "softer",
    label: "Softer / airier",
    factor: 0.9,
    note: "A little less fabric — still sample before cutting the garment.",
  },
];

/** Approximate finished smocked widths as starting points — always confirm with your pattern. */
export interface SizePreset {
  id: string;
  label: string;
  finishedWidthIn: number;
  garment: string;
  note: string;
}

export const SIZE_PRESETS: SizePreset[] = [
  {
    id: "nb-bishop",
    label: "Newborn bishop band",
    finishedWidthIn: 9,
    garment: "bishop / day gown",
    note: "Approximate starting width — verify against your pattern.",
  },
  {
    id: "12m-bishop",
    label: "12-month bishop band",
    finishedWidthIn: 11,
    garment: "bishop",
    note: "Approximate starting width — verify against your pattern.",
  },
  {
    id: "2t-yoke",
    label: "2T yoke / bishop",
    finishedWidthIn: 12.5,
    garment: "yoke or bishop",
    note: "Approximate starting width — verify against your pattern.",
  },
  {
    id: "3t-yoke",
    label: "3T yoke / bishop",
    finishedWidthIn: 13.5,
    garment: "yoke or bishop",
    note: "Approximate starting width — verify against your pattern.",
  },
  {
    id: "4t-yoke",
    label: "4T yoke / bishop",
    finishedWidthIn: 14.5,
    garment: "yoke or bishop",
    note: "Approximate starting width — verify against your pattern.",
  },
  {
    id: "sleeve",
    label: "Child sleeve band",
    finishedWidthIn: 8,
    garment: "sleeve / cuff",
    note: "Approximate arm circumference band — verify against your pattern.",
  },
  {
    id: "custom-size",
    label: "Custom finished width",
    finishedWidthIn: 12,
    garment: "custom",
    note: "Enter the finished smocked width from your pattern or measurement.",
  },
];

export function inToCm(n: number): number {
  return n * 2.54;
}

export function cmToIn(n: number): number {
  return n / 2.54;
}

export function displayLength(inches: number, unit: Unit, digits = 2): string {
  const n = unit === "cm" ? inToCm(inches) : inches;
  const u = unit === "cm" ? "cm" : "in";
  return `${n.toFixed(digits)} ${u}`;
}

export interface CalculatorInput {
  /** Desired finished width of the smocked piece (inches) */
  finishedWidthIn: number;
  /** Fabric:finished ratio before fullness factor */
  baseRatio: number;
  /** Fullness multiplier */
  fullnessFactor: number;
  /**
   * Extra flat fabric on EACH end that will also be fed through the pleater
   * (e.g. you want more length to trim after pulling up). Inches per side.
   * Applied as: (finishedWidth * effectiveRatio) + 2 * extraEachSide
   * Actually if extra is for unpleated margins, it shouldn't be multiplied.
   * If extra is "safety fullness in the pleated length", add after multiply.
   */
  safetyExtraIn: number;
  /** Unpleated flat margin each side (not gathered) — added after ratio */
  flatMarginEachSideIn: number;
  /** Needles threaded (= gathering rows) */
  needlesUsed: number;
  /** Tip-to-tip spacing between needles (inches) */
  needleSpacingIn: number;
  /** Extra fabric beyond the outer needles for seams / handling (each side, inches) */
  depthMarginEachSideIn: number;
}

export interface CalculatorResult {
  effectiveRatio: number;
  /** Flat fabric LENGTH to feed through the rollers */
  fabricLengthIn: number;
  /** Suggested cut length including safety + flat margins */
  cutLengthIn: number;
  /** Fabric DEPTH across the needle bar for the chosen row count */
  smockedDepthIn: number;
  /** Total strip depth including margins beyond needles */
  cutDepthIn: number;
  /** Approx pleats across finished width at Read spacing (informational) */
  approxPleatsInFinished: number;
  warnings: string[];
}

export function calculateFabric(input: CalculatorInput): CalculatorResult {
  const warnings: string[] = [];
  const finished = Math.max(0, input.finishedWidthIn);
  const ratio = Math.max(1, input.baseRatio) * Math.max(0.5, input.fullnessFactor);
  const fabricLengthIn = finished * ratio;
  const cutLengthIn =
    fabricLengthIn + Math.max(0, input.safetyExtraIn) + 2 * Math.max(0, input.flatMarginEachSideIn);

  const needles = Math.min(
    READ16.needleCount,
    Math.max(2, Math.round(input.needlesUsed)),
  );
  if (input.needlesUsed > READ16.needleCount) {
    warnings.push(`Read 16 has ${READ16.needleCount} needles — using ${READ16.needleCount}.`);
  }
  if (input.needlesUsed < 2) {
    warnings.push("Use at least 2 needles (two gathering rows) for a smockable band.");
  }

  const spacing = Math.max(0.05, input.needleSpacingIn);
  const smockedDepthIn = (needles - 1) * spacing;
  const cutDepthIn = smockedDepthIn + 2 * Math.max(0, input.depthMarginEachSideIn);

  // Approximate how many pleats sit in the finished width if pulled to that width
  // Each pleat pitch ≈ needle spacing when fabric is on the machine; after pull-up,
  // pleat count ≈ fabricLength / spacing, and they pack into finished width.
  const approxPleatsInFinished = spacing > 0 ? fabricLengthIn / spacing : 0;

  if (ratio < 2) {
    warnings.push("Ratios under 2:1 are unusual for English smocking — confirm with a sample.");
  }
  if (ratio > 5) {
    warnings.push("Ratios over 5:1 are rare; double-check your sample before cutting yardage.");
  }
  if (finished > 0 && finished < 4) {
    warnings.push("Very narrow finished widths are hard to center — leave room for a full plate repeat.");
  }

  return {
    effectiveRatio: ratio,
    fabricLengthIn,
    cutLengthIn,
    smockedDepthIn,
    cutDepthIn,
    approxPleatsInFinished,
    warnings,
  };
}

/** Formula helpers for UI copy */
export function ratioFormula(unit: Unit): string {
  const u = unit === "cm" ? "cm" : "in";
  return `Fabric to pleat (${u}) ≈ Finished width (${u}) × ratio`;
}
