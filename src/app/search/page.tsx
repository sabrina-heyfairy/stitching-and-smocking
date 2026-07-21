"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { searchIndex } from "@/lib/search-index";
import type { SearchItem } from "@/lib/types";

const types: { value: "" | SearchItem["type"]; label: string }[] = [
  { value: "", label: "All types" },
  { value: "stitch", label: "Stitch" },
  { value: "pleater", label: "Pleater / machine" },
  { value: "fabric", label: "Fabric" },
  { value: "thread", label: "Thread" },
  { value: "needle", label: "Needle" },
  { value: "garment", label: "Garment" },
  { value: "theory", label: "Theory" },
  { value: "embroidery", label: "Embroidery" },
];

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<"" | SearchItem["type"]>("");

  const fuse = useMemo(
    () =>
      new Fuse(searchIndex, {
        keys: ["title", "description", "tags"],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [],
  );

  const results = useMemo(() => {
    const base = q.trim() ? fuse.search(q.trim()).map((r) => r.item) : searchIndex;
    return type ? base.filter((i) => i.type === type) : base;
  }, [q, type, fuse]);

  return (
    <div className="site-container py-12 md:py-16">
      <p className="label-caps mb-3">Encyclopedia</p>
      <h1 className="font-serif text-4xl text-ink md:text-5xl">Search</h1>
      <p className="mt-4 max-w-xl text-ink-muted">
        Search by stitch, garment, difficulty, problem, fabric, needle, thread, or machine issue.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g. twisted pleats, cable, batiste, floche…"
          className="flex-1 rounded border border-border bg-paper px-4 py-3 text-ink outline-none focus:border-dusty-blue"
          autoFocus
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "" | SearchItem["type"])}
          className="rounded border border-border bg-paper px-4 py-3 text-ink"
        >
          {types.map((t) => (
            <option key={t.label} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-4 text-xs text-ink-faint">{results.length} results</p>

      <ul className="mt-6 space-y-3">
        {results.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className="block rounded border border-border bg-paper/70 px-4 py-3 no-underline transition hover:border-dusty-blue/40"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded border border-border px-1.5 py-0.5 text-[0.65rem] tracking-wide text-ink-faint uppercase">
                  {item.type}
                </span>
                {item.difficulty && (
                  <span className="text-[0.65rem] text-ink-faint uppercase">{item.difficulty}</span>
                )}
              </div>
              <h2 className="mt-1 font-serif text-xl text-ink">{item.title}</h2>
              <p className="mt-1 text-sm text-ink-muted">{item.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
