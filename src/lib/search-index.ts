import type { SearchItem } from "./types";
import { stitches } from "./stitches";
import { sections } from "./navigation";

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
    .filter((s) => s.slug !== "stitches" && s.slug !== "pleater")
    .map((s) => ({
      id: `section-${s.slug}`,
      title: s.title,
      description: s.description,
      href: s.href,
      type: (s.slug === "embroidery"
        ? "embroidery"
        : s.slug === "fabrics"
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
    id: "problem-wave-count",
    title: "Uneven wave count",
    description: "When ascent and descent stitch counts don’t match and peaks drift.",
    href: "/stitches/wave-stitch/#mistakes",
    type: "stitch",
    tags: ["problem", "wave", "counting", "chevon", "mistakes"],
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
    id: "problem-honeycomb-stagger",
    title: "Honeycomb stagger lost",
    description: "Stacked binds on both rows create tubes instead of hexagons.",
    href: "/stitches/honeycomb/#mistakes",
    type: "stitch",
    tags: ["problem", "honeycomb", "stagger", "mistakes"],
    difficulty: "intermediate",
  },
  {
    id: "problem-trellis-diamonds",
    title: "Trellis diamonds won’t close",
    description: "Mirror waves that don’t meet — fix shared vertices without ripping both rows.",
    href: "/stitches/trellis/#troubleshooting",
    type: "stitch",
    tags: ["problem", "trellis", "diamonds", "wave", "troubleshooting"],
    difficulty: "intermediate",
  },
  {
    id: "problem-van-dyke",
    title: "Van Dyke looks like plain wave",
    description: "Peaks and valleys missing the two-pleat catch bind.",
    href: "/stitches/van-dyke/#troubleshooting",
    type: "stitch",
    tags: ["problem", "van dyke", "chevron", "bind", "troubleshooting"],
    difficulty: "advanced",
  },
  {
    id: "problem-stem-vs-cable",
    title: "Stem vs cable confusion",
    description: "Twisted rope when you wanted a braid — needle side consistency.",
    href: "/stitches/stem-stitch-smocking/#mistakes",
    type: "stitch",
    tags: ["problem", "stem", "cable", "mistakes"],
    difficulty: "beginner",
  },
  {
    id: "problem-surface-honeycomb",
    title: "Surface honeycomb too deep",
    description: "When the flatter lattice pulls into classic honeycomb cells.",
    href: "/stitches/surface-honeycomb/#troubleshooting",
    type: "stitch",
    tags: ["problem", "surface honeycomb", "honeycomb", "troubleshooting"],
    difficulty: "intermediate",
  },
];
