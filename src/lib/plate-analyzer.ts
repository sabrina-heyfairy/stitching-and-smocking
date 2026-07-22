export const MAX_PLATE_IMAGE_BYTES = 10 * 1024 * 1024;
export const ACCEPTED_PLATE_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

export type PlateAnalysisStep = {
  number: number;
  row: string;
  stitch: string;
  direction: string;
  instruction: string;
  checkpoint: string;
};

export type PlateAnalysis = {
  isSmockingPlate: boolean;
  confidence: "low" | "medium" | "high";
  title: string;
  overview: string;
  rowsToPleat: number | null;
  workingRows: string[];
  repeatPleats: number | null;
  minimumPleats: number | null;
  recommendedExtraPleats: number;
  startingPoint: string;
  stitches: Array<{ name: string; rows: string; purpose: string }>;
  preparation: string[];
  steps: PlateAnalysisStep[];
  trackingTips: string[];
  uncertainties: string[];
};

export function validatePlateImage(file: Pick<File, "size" | "type">): string | null {
  if (!ACCEPTED_PLATE_IMAGE_TYPES.includes(file.type as (typeof ACCEPTED_PLATE_IMAGE_TYPES)[number])) {
    return "Choose a JPG, PNG, or WebP image. If your phone saved HEIC, take a screenshot first.";
  }
  if (file.size > MAX_PLATE_IMAGE_BYTES) {
    return "That image is larger than 10 MB. Crop it to the plate and try again.";
  }
  return null;
}

export function isPlateAnalysis(value: unknown): value is PlateAnalysis {
  if (!value || typeof value !== "object") return false;
  const result = value as Partial<PlateAnalysis>;
  return (
    typeof result.isSmockingPlate === "boolean" &&
    typeof result.title === "string" &&
    typeof result.overview === "string" &&
    Array.isArray(result.workingRows) &&
    Array.isArray(result.stitches) &&
    Array.isArray(result.preparation) &&
    Array.isArray(result.steps) &&
    Array.isArray(result.trackingTips) &&
    Array.isArray(result.uncertainties)
  );
}
