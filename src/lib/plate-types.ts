import type { Difficulty } from "./types";

/** Cell on a plate graph: gathering row (1 = top) × pleat (1 = left). */
export type PlateCell =
  | { kind: "cable"; color?: string }
  | { kind: "outline"; color?: string }
  | { kind: "stem"; color?: string }
  | { kind: "wave-up"; color?: string }
  | { kind: "wave-down"; color?: string }
  | { kind: "honeycomb"; color?: string }
  | { kind: "trellis"; color?: string }
  | { kind: "van-dyke"; color?: string }
  | { kind: "surface"; color?: string }
  | { kind: "knot"; color?: string }
  | { kind: "empty" };

export type PlateStitchRef =
  | "cable-stitch"
  | "wave-stitch"
  | "honeycomb"
  | "outline-stitch"
  | "trellis"
  | "stem-stitch-smocking"
  | "van-dyke"
  | "surface-honeycomb";

export interface PlateThread {
  id: string;
  name: string;
  /** CSS color for swatches / graph */
  hex: string;
  note?: string;
}

export interface PlateMeta {
  slug: string;
  title: string;
  subtitle: string;
  difficulty: Difficulty;
  /** Suggested finished use */
  garments: string[];
  rows: number;
  pleats: number;
  /** Pleats in one full horizontal repeat */
  repeatPleats: number;
  /** Collection shelf used for browsing and print indexes. */
  category?: string;
  /** Width of the blocked, stitched sample. */
  finishedWidth?: string;
  /** Cut width before running the fabric through the Read pleater. */
  fabricWidth?: string;
  /** Human-readable center reference (one pleat or the valley between two pleats). */
  centerLine?: string;
  symmetry?: string;
  threadWeight?: string;
  colorSuggestions?: string[];
  /** Surface embroidery used after the holding rows are removed. */
  embroideryStitches?: string[];
  /** Shape guide drawn over the geometric foundation. Values are normalized 0–100. */
  motifPath?: string;
  /** Short mark used for tiny index previews. */
  motifMark?: string;
  threads: PlateThread[];
  stitchesUsed: PlateStitchRef[];
  description: string;
  instructions: string[];
  tips: string[];
  /** Sparse map: "row-pleat" → cell (1-indexed). Missing = empty. */
  cells: Record<string, PlateCell>;
}

export function cellKey(row: number, pleat: number): string {
  return `${row}-${pleat}`;
}

export function getPlateCell(plate: PlateMeta, row: number, pleat: number): PlateCell {
  return plate.cells[cellKey(row, pleat)] ?? { kind: "empty" };
}
