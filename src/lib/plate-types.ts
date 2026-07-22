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

export type MotifPoint = readonly [x: number, y: number];
export type MotifElement =
  | { kind: "line"; stitch: "stem" | "back" | "chain" | "straight"; threadId: string; points: MotifPoint[]; closed?: boolean }
  | { kind: "loop"; stitch: "detached-chain"; threadId: string; from: MotifPoint; to: MotifPoint; width: number }
  | { kind: "knot"; stitch: "french-knot"; threadId: string; at: MotifPoint; wraps: 1 | 2 | 3 }
  | { kind: "bullion"; stitch: "bullion"; threadId: string; from: MotifPoint; to: MotifPoint; wraps: number }
  | { kind: "fill"; stitch: "satin"; threadId: string; points: MotifPoint[] };

export interface PlateMotif {
  repeatPleats: number;
  elements: MotifElement[];
  instructions: string[];
}

export interface PictureSmockingChart {
  /** One character per stitch between adjacent pleats; "." means no front stitch. */
  grid: string[];
  /** Character-to-thread mapping used by the grid. */
  legend: Record<string, string>;
  /** Wrong-side stabilizing rows, shown dashed on the working graph only. */
  backSmocking?: {
    row: number;
    threadId: string;
    fromPleat?: number;
    toPleat?: number;
  }[];
}

export interface PlateSource {
  label: string;
  href: string;
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
  /** Surface embroidery charted over one horizontal repeat. */
  motif?: PlateMotif;
  /** Dense structural cable-stitch chart used for picture smocking. */
  pictureChart?: PictureSmockingChart;
  /** Attribution, inspiration, or further-reading links for this plate. */
  sources?: PlateSource[];
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
