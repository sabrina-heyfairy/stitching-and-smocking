export type Difficulty = "beginner" | "intermediate" | "advanced";

export type StitchCategory =
  | "cable"
  | "wave"
  | "honeycomb"
  | "trellis"
  | "outline"
  | "decorative"
  | "structural"
  | "elastic";

export type GarmentUse =
  | "children's clothing"
  | "heirloom sewing"
  | "bishop dresses"
  | "bonnets"
  | "sleeves"
  | "yokes"
  | "collars"
  | "home decor"
  | "christening gowns"
  | "nightgowns"
  | "aprons";

export interface StitchMeta {
  slug: string;
  title: string;
  subtitle?: string;
  difficulty: Difficulty;
  categories: StitchCategory[];
  uses: GarmentUse[];
  threadCount?: string;
  status: "complete" | "template" | "planned";
  description: string;
}

export interface ContentSection {
  slug: string;
  title: string;
  description: string;
  href: string;
  status: "complete" | "in-progress" | "planned";
}

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  href: string;
  type: "stitch" | "pleater" | "fabric" | "thread" | "needle" | "garment" | "theory" | "embroidery" | "plate";
  tags: string[];
  difficulty?: Difficulty;
}
