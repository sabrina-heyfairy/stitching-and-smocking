"use client";

import { useState } from "react";
import type { PlateMeta } from "@/lib/plate-types";
import { PLATE_COLORWAYS } from "@/lib/plate-colorways";
import { downloadPng, downloadText, plateHtml, plateSvg, printPlatePdf } from "@/lib/plate-export";
import { useColorwayPlate, usePlateColorway } from "@/components/plates/PlateColorwayContext";
import { getPlateCourses } from "@/lib/plate-courses";

export function PlateDownloads({ plate: sourcePlate }: { plate: PlateMeta }) {
  const plate = useColorwayPlate(sourcePlate);
  const [working, setWorking] = useState(false);
  const formats = [
    { label: "SVG", action: () => downloadText(`${plate.slug}.svg`, plateSvg(plate), "image/svg+xml") },
    { label: "PNG", action: async () => downloadPng(plate) },
    { label: "HTML", action: () => downloadText(`${plate.slug}.html`, plateHtml(plate), "text/html") },
    {
      label: "JSON",
      action: () => downloadText(
        `${plate.slug}.json`,
        JSON.stringify({ ...plate, cells: undefined, courses: getPlateCourses(plate) }, null, 2),
        "application/json",
      ),
    },
    { label: "Black & white SVG", action: () => downloadText(`${plate.slug}-bw.svg`, plateSvg(plate, true), "image/svg+xml") },
    {
      label: "Print / PDF",
      action: () => {
        if (!printPlatePdf(plate)) {
          downloadText(`${plate.slug}-print.html`, plateHtml(plate), "text/html");
        }
      },
    },
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
            className="min-h-11 rounded border border-border bg-cream px-4 py-2 text-sm text-ink hover:bg-cream-deep disabled:opacity-50"
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}

export function PlateColorways({ plate }: { plate: PlateMeta }) {
  const colorway = usePlateColorway();
  const names = plate.colorSuggestions ?? Object.keys(PLATE_COLORWAYS);
  return (
    <section id="colorways" className="scroll-mt-24 rounded border border-border bg-paper/60 p-5">
      <h2 className="font-serif text-3xl text-ink">Colorways</h2>
      <p className="mt-2 text-sm text-ink-muted">
        Choose a palette to recolor every diagram and color download on this page.
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          aria-pressed={!colorway?.selected}
          onClick={() => colorway?.setSelected(null)}
          className="flex min-h-12 items-center justify-between rounded border border-border bg-paper px-3 py-2 text-left hover:border-dusty-blue aria-pressed:border-burgundy aria-pressed:ring-2 aria-pressed:ring-burgundy/20"
        >
          <span className="text-sm text-ink">Original threads</span>
          <span className="flex overflow-hidden rounded-full border border-border" aria-label="Original thread colors">
            {plate.threads.map((thread) => (
              <span key={thread.id} className="h-6 w-6" style={{ backgroundColor: thread.hex }} title={`${thread.name}: ${thread.hex}`} />
            ))}
          </span>
        </button>
        {names.map((name) => {
          const colors = PLATE_COLORWAYS[name as keyof typeof PLATE_COLORWAYS] ?? plate.threads.map((thread) => thread.hex);
          return (
            <button
              key={name}
              type="button"
              aria-pressed={colorway?.selected === name}
              onClick={() => colorway?.setSelected(name as keyof typeof PLATE_COLORWAYS)}
              className="flex min-h-12 items-center justify-between rounded border border-border bg-paper px-3 py-2 text-left hover:border-dusty-blue aria-pressed:border-burgundy aria-pressed:ring-2 aria-pressed:ring-burgundy/20"
            >
              <span className="text-sm text-ink">{name}</span>
              <span className="flex overflow-hidden rounded-full border border-border" aria-label={`${name}: ${colors.join(", ")}`}>
                {colors.map((color) => (
                  <span key={color} className="h-6 w-6" style={{ backgroundColor: color }} title={color} />
                ))}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-sm font-medium text-burgundy" aria-live="polite">
        Showing: {colorway?.selected ?? "Original threads"}
      </p>
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

export function PlateThreadKey({ plate: sourcePlate }: { plate: PlateMeta }) {
  const plate = useColorwayPlate(sourcePlate);
  return (
    <section id="threads" className="mt-12 scroll-mt-24">
      <h2 className="font-serif text-3xl text-ink">Thread colors</h2>
      <ul className="mt-4 space-y-3">
        {plate.threads.map((thread) => (
          <li key={thread.id} className="flex items-start gap-3 rounded border border-border bg-paper/60 px-4 py-3">
            <span className="mt-1 inline-block h-6 w-6 shrink-0 rounded-full border border-border" style={{ background: thread.hex }} />
            <div>
              <p className="font-medium text-ink">{thread.name}</p>
              {thread.note && <p className="text-sm text-ink-muted">{thread.note}</p>}
              <p className="text-sm text-ink-faint">{thread.hex}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

