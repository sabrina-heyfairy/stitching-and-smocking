"use client";

import { useState } from "react";
import type { PlateMeta } from "@/lib/plate-types";
import { PLATE_COLORWAYS } from "@/lib/generated-plates";
import { downloadPng, downloadText, plateHtml, plateSvg, printPlatePdf } from "@/lib/plate-export";

export function PlateDownloads({ plate }: { plate: PlateMeta }) {
  const [working, setWorking] = useState(false);
  const formats = [
    { label: "SVG", action: () => downloadText(`${plate.slug}.svg`, plateSvg(plate), "image/svg+xml") },
    { label: "PNG", action: async () => downloadPng(plate) },
    { label: "HTML", action: () => downloadText(`${plate.slug}.html`, plateHtml(plate), "text/html") },
    { label: "JSON", action: () => downloadText(`${plate.slug}.json`, JSON.stringify(plate, null, 2), "application/json") },
    { label: "Black & white SVG", action: () => downloadText(`${plate.slug}-bw.svg`, plateSvg(plate, true), "image/svg+xml") },
    { label: "Print / PDF", action: () => printPlatePdf(plate) },
  ];

  return (
    <section id="downloads" className="mt-12 scroll-mt-24 rounded border border-border bg-paper/60 p-5">
      <h2 className="font-serif text-3xl text-ink">Printable files</h2>
      <p className="mt-2 text-sm text-ink-muted">
        Vector, high-resolution raster, self-contained HTML, complete JSON, and a print layout
        suitable for saving as PDF.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {formats.map(({ label, action }) => (
          <button
            key={label}
            type="button"
            disabled={working}
            onClick={async () => {
              setWorking(true);
              try {
                await action();
              } finally {
                setWorking(false);
              }
            }}
            className="rounded border border-border bg-cream px-3 py-2 text-sm text-ink hover:bg-cream-deep disabled:opacity-50"
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}

export function PlateColorways({ plate }: { plate: PlateMeta }) {
  const names = plate.colorSuggestions ?? Object.keys(PLATE_COLORWAYS);
  return (
    <section id="colorways" className="mt-12 scroll-mt-24">
      <h2 className="font-serif text-3xl text-ink">Colorways</h2>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {names.map((name) => {
          const colors = PLATE_COLORWAYS[name as keyof typeof PLATE_COLORWAYS] ?? plate.threads.map((thread) => thread.hex);
          return (
            <div key={name} className="flex items-center justify-between rounded border border-border bg-paper/60 px-3 py-2">
              <span className="text-sm text-ink-muted">{name}</span>
              <span className="flex overflow-hidden rounded-full border border-border">
                {colors.map((color) => (
                  <span key={color} className="h-5 w-5" style={{ backgroundColor: color }} />
                ))}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function PlateBlackWhiteGraph({ plate }: { plate: PlateMeta }) {
  return (
    <div
      className="mt-5 overflow-x-auto rounded border border-border bg-white p-3"
      dangerouslySetInnerHTML={{ __html: plateSvg(plate, true) }}
    />
  );
}

