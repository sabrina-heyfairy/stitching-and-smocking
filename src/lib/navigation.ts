import type { ContentSection } from "./types";

export const mainNav = [
  { href: "/stitches/", label: "Stitches" },
  { href: "/pleater/", label: "Read 16 Pleater" },
  { href: "/theory/", label: "Theory" },
  { href: "/fabrics/", label: "Fabrics" },
  { href: "/threads/", label: "Threads" },
  { href: "/needles/", label: "Needles" },
  { href: "/embroidery/", label: "Embroidery" },
  { href: "/garments/", label: "Garments" },
  { href: "/design/", label: "Design" },
  { href: "/search/", label: "Search" },
] as const;

export const sections: ContentSection[] = [
  {
    slug: "stitches",
    title: "Stitch Encyclopedia",
    description:
      "Every English smocking stitch with needle paths, tension studies, mistakes, and garment examples.",
    href: "/stitches/",
    status: "in-progress",
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
