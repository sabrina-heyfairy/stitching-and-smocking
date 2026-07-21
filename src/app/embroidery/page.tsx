"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DifficultyBadge, StatusBadge } from "@/components/Badge";
import { embroideryStitches, filterEmbroidery } from "@/lib/embroidery";
import type { Difficulty } from "@/lib/types";

export default function EmbroideryIndexPage() {
  const [q, setQ] = useState("");
  const [difficulty, setDifficulty] = useState<"" | Difficulty>("");

  const filtered = useMemo(
    () =>
      filterEmbroidery({
        q,
        difficulty: difficulty || undefined,
      }),
    [q, difficulty],
  );

  const complete = embroideryStitches.filter((s) => s.status === "complete").length;

  return (
    <div className="site-container py-12 md:py-16">
      <p className="label-caps mb-3 text-dusty-blue">Companion skills</p>
      <h1 className="font-serif text-4xl text-ink md:text-5xl">Embroidery</h1>
      <p className="mt-4 max-w-2xl text-ink-muted">
        Surface embroidery stitches commonly combined with English smocking — so motifs sit
        gracefully above a cable, wave, or trellis field. Same visual standard as the smocking
        chapters: needle path, tension, mistakes, and construction you can follow without a video.
      </p>
      <p className="mt-2 text-sm text-ink-faint">
        {complete} of {embroideryStitches.length} companion stitches complete ·{" "}
        <Link href="/embroidery/motifs/" className="text-dusty-blue-deep">
          Decorative motifs
        </Link>
      </p>

      <div className="stitch-controls mt-8 flex flex-col gap-3 rounded border border-border bg-paper/80 p-4 sm:flex-row sm:flex-wrap sm:items-center">
        <label className="flex min-w-[12rem] flex-1 flex-col gap-1 text-xs text-ink-faint">
          Search
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Bullion, daisy, vine…"
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
            <option value="">All levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>
        <p className="text-xs text-ink-faint sm:ml-auto">
          {filtered.length} of {embroideryStitches.length}
        </p>
      </div>

      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {filtered.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/embroidery/${s.slug}/`}
              className="block h-full rounded border border-border bg-paper/70 p-5 no-underline transition hover:border-dusty-blue/40"
            >
              <div className="flex flex-wrap items-center gap-2">
                <DifficultyBadge difficulty={s.difficulty} />
                <StatusBadge status={s.status} />
              </div>
              <h2 className="mt-3 font-serif text-2xl text-ink">{s.title}</h2>
              {s.subtitle && <p className="text-sm text-ink-faint">{s.subtitle}</p>}
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.description}</p>
              <p className="mt-3 text-xs text-ink-faint">
                <span className="font-medium text-ink-muted">With smocking:</span> {s.withSmocking}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <section className="mt-16 max-w-3xl">
        <h2 className="font-serif text-3xl text-ink">Decorative motifs</h2>
        <p className="mt-3 text-ink-muted">
          Combine these stitches into roses, sprays, bows, and borders that live on the flat fabric
          around your smocking.
        </p>
        <Link
          href="/embroidery/motifs/"
          className="mt-4 inline-flex rounded border border-border bg-paper px-4 py-2 text-sm text-ink no-underline hover:bg-cream-deep"
        >
          Open motif guide
        </Link>
      </section>
    </div>
  );
}
