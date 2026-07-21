"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DifficultyBadge } from "@/components/Badge";
import { filterPlates, plates } from "@/lib/plates";
import type { Difficulty } from "@/lib/types";

export default function PlatesIndexPage() {
  const [q, setQ] = useState("");
  const [difficulty, setDifficulty] = useState<"" | Difficulty>("");

  const filtered = useMemo(
    () => filterPlates({ q, difficulty: difficulty || undefined }),
    [q, difficulty],
  );

  return (
    <div className="site-container py-12 md:py-16">
      <p className="label-caps mb-3 text-dusty-blue">Design library</p>
      <h1 className="font-serif text-4xl text-ink md:text-5xl">Smocking Plate Library</h1>
      <p className="mt-4 max-w-2xl text-ink-muted">
        Digitized teaching plates with graphs, thread keys, finished schematics, and step
        instructions. Start with Cable Borders, then add waves, trellis, and honeycomb fields.
      </p>
      <p className="mt-2 text-sm text-ink-faint">
        {plates.length} plates · See also{" "}
        <Link href="/design/" className="text-dusty-blue-deep">
          Design Planning
        </Link>
      </p>

      <div className="stitch-controls mt-8 flex flex-col gap-3 rounded border border-border bg-paper/80 p-4 sm:flex-row sm:flex-wrap sm:items-center">
        <label className="flex min-w-[12rem] flex-1 flex-col gap-1 text-xs text-ink-faint">
          Search
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Trellis, honeycomb, bishop…"
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
          {filtered.length} of {plates.length}
        </p>
      </div>

      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {filtered.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/plates/${p.slug}/`}
              className="block h-full rounded border border-border bg-paper/70 p-5 no-underline transition hover:border-dusty-blue/40"
            >
              <div className="flex flex-wrap items-center gap-2">
                <DifficultyBadge difficulty={p.difficulty} />
                <span className="text-[0.65rem] tracking-wide text-ink-faint uppercase">
                  {p.rows}×{p.pleats} · repeat {p.repeatPleats}
                </span>
              </div>
              <h2 className="mt-3 font-serif text-2xl text-ink">{p.title}</h2>
              <p className="text-sm text-ink-faint">{p.subtitle}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.threads.map((t) => (
                  <span
                    key={t.id}
                    className="inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-[0.65rem] text-ink-muted"
                  >
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ background: t.hex }}
                    />
                    {t.name}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
