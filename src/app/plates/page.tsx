"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DifficultyBadge } from "@/components/Badge";
import { filterPlates, plates } from "@/lib/plates";
import type { Difficulty } from "@/lib/types";

export default function PlatesIndexPage() {
  const [q, setQ] = useState("");
  const [difficulty, setDifficulty] = useState<"" | Difficulty>("");
  const [category, setCategory] = useState("");
  const categories = useMemo(
    () => [...new Set(plates.map((plate) => plate.category ?? "Curated Classics"))].sort(),
    [],
  );

  const filtered = useMemo(
    () => filterPlates({ q, difficulty: difficulty || undefined, category: category || undefined }),
    [q, difficulty, category],
  );

  return (
    <div className="site-container py-12 md:py-16">
      <p className="label-caps mb-3 text-dusty-blue">Design library</p>
      <h1 className="font-serif text-4xl text-ink md:text-5xl">Smocking Plate Library</h1>
      <p className="mt-4 max-w-2xl text-ink-muted">
        Tested geometric and picture-smocking teaching plates with connected thread paths, dense
        cable grids, back-smocking, repeat markers, full-width placement, and printable references
        for a Read 16-needle pleater.
      </p>
      <p className="mt-2 text-sm text-ink-faint">
        {plates.length} original plates · See also{" "}
        <Link href="/design/" className="text-dusty-blue-deep">
          Design Planning
        </Link>
        {" · "}
        <Link href="/plates/free-resources/" className="text-dusty-blue-deep">
          Free external picture-smocking resources
        </Link>
      </p>

      <Link
        href="/plates/daisy/"
        className="mt-8 grid overflow-hidden rounded-xl border border-burgundy/25 bg-paper no-underline shadow-sm transition hover:border-burgundy/50 md:grid-cols-[1.15fr_.85fr]"
      >
        <div className="p-6 md:p-8">
          <p className="label-caps text-burgundy">Featured encyclopedia chapter</p>
          <h2 className="mt-2 font-serif text-3xl text-ink">Daisy Smocking Plate</h2>
          <p className="mt-3 max-w-xl leading-relaxed text-ink-muted">
            Decode the original plate with a pleated-fabric grid, layered SVG needle paths,
            a 40-frame sequence across rows 1–8, repeat guidance, troubleshooting, and a printable reference.
          </p>
          <span className="mt-5 inline-block text-sm font-semibold text-burgundy">Open the interactive chapter →</span>
        </div>
        <svg viewBox="0 0 360 210" role="img" aria-label="Stylized Daisy smocking motif preview" className="h-full min-h-48 w-full bg-[#f5e3d8]">
          <path d="M0 150L45 105L90 150L135 105L180 150L225 105L270 150L315 105L360 150M0 170L45 125L90 170L135 125L180 170L225 125L270 170L315 125L360 170" fill="none" stroke="#57724a" strokeWidth="5" />
          {[72, 180, 288].map((x) => <g key={x} transform={`translate(${x} 72)`}>{Array.from({ length: 8 }, (_, index) => <ellipse key={index} rx="6" ry="25" transform={`rotate(${index * 45}) translate(0 -19)`} fill="#fff8f0" stroke="#cf4774" strokeWidth="3" />)}<circle r="9" fill="#d5a62e" /></g>)}
        </svg>
      </Link>

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
        <label className="flex min-w-[12rem] flex-col gap-1 text-xs text-ink-faint">
          Category
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded border border-border bg-cream px-3 py-2 text-sm text-ink"
          >
            <option value="">All categories</option>
            {categories.map((name) => <option key={name} value={name}>{name}</option>)}
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
                <span className="text-[0.65rem] tracking-wide text-dusty-blue uppercase">
                  {p.category ?? "Curated classic"}
                </span>
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
