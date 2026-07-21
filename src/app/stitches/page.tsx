"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DifficultyBadge, StatusBadge } from "@/components/Badge";
import { filterStitches, stitches } from "@/lib/stitches";
import type { Difficulty, StitchCategory } from "@/lib/types";

const difficulties: { value: "" | Difficulty; label: string }[] = [
  { value: "", label: "All levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const categories: { value: "" | StitchCategory; label: string }[] = [
  { value: "", label: "All types" },
  { value: "cable", label: "Cable" },
  { value: "wave", label: "Wave" },
  { value: "honeycomb", label: "Honeycomb" },
  { value: "trellis", label: "Trellis" },
  { value: "outline", label: "Outline" },
  { value: "decorative", label: "Decorative" },
  { value: "structural", label: "Structural" },
  { value: "elastic", label: "Elastic" },
];

export default function StitchesIndexPage() {
  const [q, setQ] = useState("");
  const [difficulty, setDifficulty] = useState<"" | Difficulty>("");
  const [category, setCategory] = useState<"" | StitchCategory>("");

  const filtered = useMemo(
    () =>
      filterStitches({
        q,
        difficulty: difficulty || undefined,
        category: category || undefined,
      }),
    [q, difficulty, category],
  );

  return (
    <div className="site-container py-12 md:py-16">
      <p className="label-caps mb-3">Encyclopedia</p>
      <h1 className="font-serif text-4xl text-ink md:text-5xl">Stitch Index</h1>
      <p className="mt-4 max-w-2xl text-ink-muted">
        Clickable index of English smocking stitches. Filter by difficulty and type. Cable
        Stitch is complete; remaining chapters follow its publication template.
      </p>

      <div className="stitch-controls mt-8 flex flex-col gap-3 rounded border border-border bg-paper/80 p-4 sm:flex-row sm:flex-wrap sm:items-center">
        <label className="flex min-w-[12rem] flex-1 flex-col gap-1 text-xs text-ink-faint">
          Search
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cable, honeycomb, bishop…"
            className="rounded border border-border bg-cream px-3 py-2 text-sm text-ink outline-none focus:border-dusty-blue"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-ink-faint">
          Difficulty
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as "" | Difficulty)}
            className="rounded border border-border bg-cream px-3 py-2 text-sm text-ink"
          >
            {difficulties.map((d) => (
              <option key={d.label} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-ink-faint">
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as "" | StitchCategory)}
            className="rounded border border-border bg-cream px-3 py-2 text-sm text-ink"
          >
            {categories.map((c) => (
              <option key={c.label} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <p className="text-xs text-ink-faint sm:ml-auto">
          {filtered.length} of {stitches.length}
        </p>
      </div>

      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {filtered.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/stitches/${s.slug}/`}
              className="block h-full rounded border border-border bg-paper/70 p-5 no-underline transition hover:border-dusty-blue/40"
            >
              <div className="flex flex-wrap items-center gap-2">
                <DifficultyBadge difficulty={s.difficulty} />
                <StatusBadge status={s.status} />
                {s.categories.map((c) => (
                  <span
                    key={c}
                    className="rounded border border-border px-1.5 py-0.5 text-[0.65rem] tracking-wide text-ink-faint uppercase"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <h2 className="mt-3 font-serif text-2xl text-ink">{s.title}</h2>
              {s.subtitle && <p className="text-sm text-ink-faint">{s.subtitle}</p>}
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.description}</p>
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-ink-muted">No stitches match those filters.</p>
      )}
    </div>
  );
}
