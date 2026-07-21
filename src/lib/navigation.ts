import type { ContentSection } from "./types";

export const mainNav = [
  { href: "/learn/", label: "Practice Path" },
  { href: "/stitches/", label: "Stitches" },
  { href: "/plates/", label: "Plates" },
  { href: "/pleater/", label: "Read 16" },
  { href: "/calculator/", label: "Calculator" },
  { href: "/garments/", label: "Garments" },
  { href: "/embroidery/", label: "Embroidery" },
  { href: "/fabrics/", label: "Fabrics" },
  { href: "/threads/", label: "Threads" },
  { href: "/needles/", label: "Needles" },
  { href: "/design/", label: "Design" },
  { href: "/theory/", label: "Theory" },
  { href: "/search/", label: "Search" },
] as const;

/**
 * Grouped navigation for the desktop header. Top-level items are the primary
 * learning flow; menus collect the remaining sections so all twelve stay
 * reachable without crowding the bar.
 */
export type NavItem = { href: string; label: string };
export type NavEntry =
  | { kind: "link"; href: string; label: string }
  | { kind: "menu"; label: string; items: NavItem[] };

export const navGroups: NavEntry[] = [
  { kind: "link", href: "/learn/", label: "Practice Path" },
  { kind: "link", href: "/stitches/", label: "Stitches" },
  { kind: "link", href: "/plates/", label: "Plates" },
  { kind: "link", href: "/pleater/", label: "Read 16" },
  {
    kind: "menu",
    label: "Materials",
    items: [
      { href: "/fabrics/", label: "Fabrics" },
      { href: "/threads/", label: "Threads" },
      { href: "/needles/", label: "Needles" },
    ],
  },
  {
    kind: "menu",
    label: "Reference",
    items: [
      { href: "/embroidery/", label: "Embroidery" },
      { href: "/garments/", label: "Garments" },
      { href: "/design/", label: "Design" },
      { href: "/theory/", label: "Theory" },
    ],
  },
];

export const sections: ContentSection[] = [
  {
    slug: "stitches",
    title: "Stitch Encyclopedia",
    description:
      "Every English smocking stitch with needle paths, tension studies, mistakes, and garment examples.",
    href: "/stitches/",
    status: "complete",
  },
  {
    slug: "pleater",
    title: "Read 16-Needle Pleater",
    description:
      "History, threading, maintenance, timing, parts diagrams, and troubleshooting for the vintage Read pleater.",
    href: "/pleater/",
    status: "complete",
  },
  {
    slug: "calculator",
    title: "Fabric Calculator",
    description:
      "Finished smocked width X → fabric length Y to pleat on your Read 16 — size presets, fabric ratios, and strip depth.",
    href: "/calculator/",
    status: "complete",
  },
  {
    slug: "theory",
    title: "Smocking Theory",
    description:
      "Why stitches work: compression, pleat geometry, thread tension, and fabric physics.",
    href: "/theory/",
    status: "complete",
  },
  {
    slug: "fabrics",
    title: "Fabric Guide",
    description:
      "Cotton lawn, batiste, linen, voile, Liberty, and more — weight, pleating quality, and best uses.",
    href: "/fabrics/",
    status: "complete",
  },
  {
    slug: "threads",
    title: "Thread Guide",
    description:
      "Floche, perle cotton, stranded cotton, silk — sizes, colors, and when to choose each.",
    href: "/threads/",
    status: "complete",
  },
  {
    slug: "needles",
    title: "Needle Guide",
    description: "Crewel, milliner, chenille, and embroidery needles sized for smocking work.",
    href: "/needles/",
    status: "complete",
  },
  {
    slug: "embroidery",
    title: "Embroidery Companion",
    description:
      "Bullion roses, French knots, lazy daisy, and other stitches commonly combined with smocking.",
    href: "/embroidery/",
    status: "complete",
  },
  {
    slug: "garments",
    title: "Garment Construction",
    description:
      "How smocking integrates into bishop dresses, yokes, bonnets, rompers, and nightgowns.",
    href: "/garments/",
    status: "complete",
  },
  {
    slug: "design",
    title: "Design Planning",
    description:
      "Design your own plates: pleat counts, repeats, centering, borders, and mirror layouts.",
    href: "/design/",
    status: "complete",
  },
  {
    slug: "plates",
    title: "Smocking Plate Library",
    description:
      "Digitized teaching plates with graphs, thread keys, finished schematics, and instructions.",
    href: "/plates/",
    status: "complete",
  },
  {
    slug: "learn",
    title: "Practice Path",
    description:
      "Beginner-to-advanced curriculum linking pleater, stitches, plates, embroidery, and first garments.",
    href: "/learn/",
    status: "complete",
  },
];

export const pleaterNav = [
  { href: "/pleater/", label: "Overview" },
  { href: "/pleater/#history", label: "History" },
  { href: "/pleater/#parts", label: "Parts Diagram" },
  { href: "/pleater/#threading", label: "Threading" },
  { href: "/pleater/#pleating", label: "Pleating" },
  { href: "/pleater/#troubleshooting", label: "Troubleshooting" },
  { href: "/pleater/#maintenance", label: "Maintenance" },
  { href: "/pleater/#parts-list", label: "Replacement Parts" },
] as const;
