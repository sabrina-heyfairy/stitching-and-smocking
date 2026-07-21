import type { SearchItem } from "./types";
import { stitches } from "./stitches";
import { sections } from "./navigation";
import { embroideryStitches } from "./embroidery";
import { plates } from "./plates";

export const searchIndex: SearchItem[] = [
  ...stitches.map((s) => ({
    id: `stitch-${s.slug}`,
    title: s.title,
    description: s.description,
    href: `/stitches/${s.slug}/`,
    type: "stitch" as const,
    tags: [...s.categories, s.difficulty, ...s.uses, "smocking", "stitch"],
    difficulty: s.difficulty,
  })),
  ...embroideryStitches.map((s) => ({
    id: `embroidery-${s.slug}`,
    title: s.title,
    description: s.description,
    href: `/embroidery/${s.slug}/`,
    type: "embroidery" as const,
    tags: [...s.uses, s.difficulty, "embroidery", "surface", "motif"],
    difficulty: s.difficulty,
  })),
  ...plates.map((p) => ({
    id: `plate-${p.slug}`,
    title: p.title,
    description: p.description,
    href: `/plates/${p.slug}/`,
    type: "plate" as const,
    tags: ["plate", "graph", p.difficulty, ...p.garments, ...p.stitchesUsed, p.subtitle],
    difficulty: p.difficulty,
  })),
  {
    id: "plates-index",
    title: "Smocking Plate Library",
    description: "Digitized teaching plates with graphs, thread keys, and instructions.",
    href: "/plates/",
    type: "plate",
    tags: ["plates", "library", "design", "graph"],
  },
  {
    id: "learn-path",
    title: "Practice Path",
    description:
      "Guided curriculum from first pleat to first bishop — checklists linking stitches, plates, and garments.",
    href: "/learn/",
    type: "theory",
    tags: ["learn", "practice", "curriculum", "sampler", "beginner", "checklist"],
  },  {
    id: "embroidery-motifs",
    title: "Decorative Motifs",
    description: "Flower, bow, vine, monogram, and holiday motif recipes for smocked garments.",
    href: "/embroidery/motifs/",
    type: "embroidery",
    tags: ["motifs", "flowers", "bows", "monogram", "borders", "embroidery"],
  },
  {
    id: "pleater-overview",
    title: "Read 16-Needle Pleater",
    description: "Complete machine encyclopedia: history, threading, maintenance, troubleshooting.",
    href: "/pleater/",
    type: "pleater",
    tags: ["read", "pleater", "16-needle", "machine", "maintenance", "threading"],
  },
  {
    id: "pleater-threading",
    title: "Pleater Threading Guide",
    description: "Every guide, hole, and path for gathering threads on the Read 16.",
    href: "/pleater/#threading",
    type: "pleater",
    tags: ["threading", "spool", "hook", "needle eye", "gathering thread"],
  },
  {
    id: "pleater-troubleshoot",
    title: "Pleating Troubleshooting",
    description: "Twisted pleats, skipped needles, broken needles, fabric bunching, and fixes.",
    href: "/pleater/#troubleshooting",
    type: "pleater",
    tags: ["troubleshooting", "broken needle", "twisted pleats", "skipped needle"],
  },
  {
    id: "pleater-maintenance",
    title: "Pleater Maintenance",
    description: "Oil locations, cleaning schedule, storage, and reassembly.",
    href: "/pleater/#maintenance",
    type: "pleater",
    tags: ["oil", "lubrication", "cleaning", "storage", "maintenance"],
  },
  ...sections
    .filter(
      (s) =>
        s.slug !== "stitches" &&
        s.slug !== "pleater" &&
        s.slug !== "embroidery" &&
        s.slug !== "plates",
    )
    .map((s) => ({
      id: `section-${s.slug}`,
      title: s.title,
      description: s.description,
      href: s.href,
      type: (s.slug === "fabrics"
        ? "fabric"
        : s.slug === "threads"
          ? "thread"
          : s.slug === "needles"
            ? "needle"
            : s.slug === "garments"
              ? "garment"
              : "theory") as SearchItem["type"],
      tags: [s.slug, "guide", "encyclopedia"],
    })),
  {
    id: "section-embroidery",
    title: "Embroidery Companion",
    description:
      "Surface embroidery stitches commonly combined with English smocking — bullion, knots, daisy, and more.",
    href: "/embroidery/",
    type: "embroidery",
    tags: ["embroidery", "companion", "motifs"],
  },
  {
    id: "fabric-batiste",
    title: "Batiste",
    description: "Fine cotton or cotton-blend; excellent for heirloom bishop dresses.",
    href: "/fabrics/#batiste",
    type: "fabric",
    tags: ["batiste", "cotton", "heirloom", "lightweight"],
  },
  {
    id: "fabric-lawn",
    title: "Cotton Lawn",
    description: "Smooth, tightly woven cotton; pleats cleanly on a Read 16.",
    href: "/fabrics/#lawn",
    type: "fabric",
    tags: ["lawn", "cotton", "pleating"],
  },
  {
    id: "thread-floche",
    title: "Floche",
    description: "Soft, loosely twisted cotton preferred for classic English smocking.",
    href: "/threads/#floche",
    type: "thread",
    tags: ["floche", "DMC", "cotton", "smocking thread"],
  },
  {
    id: "thread-perle",
    title: "Perle Cotton",
    description: "Non-divisible twisted cotton; #8 and #12 are common for cables and waves.",
    href: "/threads/#perle",
    type: "thread",
    tags: ["perle", "pearl cotton", "#8", "#12"],
  },
  {
    id: "problem-uneven-tension",
    title: "Uneven tension",
    description: "How to diagnose and fix uneven cable or wave tension without ripping out.",
    href: "/stitches/cable-stitch/#troubleshooting",
    type: "stitch",
    tags: ["problem", "tension", "troubleshooting", "cable"],
    difficulty: "beginner",
  },
  {
    id: "problem-wave-peaks",
    title: "Wave peaks miss the upper row",
    description: "Fix short peaks and collapsed amplitude in wave stitch without ripping the whole panel.",
    href: "/stitches/wave-stitch/#troubleshooting",
    type: "stitch",
    tags: ["problem", "wave", "troubleshooting", "amplitude", "peaks"],
    difficulty: "beginner",
  },
  {
    id: "problem-honeycomb-cells",
    title: "Honeycomb cells won’t open",
    description: "Fix sealed cells from stacked binds or over-tight tension without ripping the whole field.",
    href: "/stitches/honeycomb/#troubleshooting",
    type: "stitch",
    tags: ["problem", "honeycomb", "elastic", "cells", "troubleshooting"],
    difficulty: "intermediate",
  },
  {
    id: "problem-bullion-coil",
    title: "Bullion coil won’t slide",
    description: "Wrapped bullion stuck on the needle — ease wraps and shorten the bite.",
    href: "/embroidery/bullion/#troubleshooting",
    type: "embroidery",
    tags: ["problem", "bullion", "rose", "troubleshooting"],
    difficulty: "advanced",
  },
  {
    id: "garment-bishop",
    title: "Bishop dress construction",
    description: "Pleat, smock, and assemble a bishop — visual stages and checklist.",
    href: "/garments/#bishop",
    type: "garment",
    tags: ["bishop", "construction", "neckline", "assembly"],
  },
  {
    id: "garment-yoke",
    title: "Smocked yoke insert",
    description: "Set a compressed smocked insert into a bodice yoke opening.",
    href: "/garments/#yokes",
    type: "garment",
    tags: ["yoke", "insert", "construction"],
  },
  {
    id: "garment-bonnet",
    title: "Bonnet smocking",
    description: "Horizontal brim/crown smocking with soft tension for head curve.",
    href: "/garments/#bonnets",
    type: "garment",
    tags: ["bonnet", "construction", "brim"],
  },
];
