"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FinishedSurfaceHoneycombAppearance,
  SurfaceHoneycombConstructionAnimation,
  SurfaceHoneycombFrontBackCross,
  SurfaceHoneycombGarmentsDiagram,
  SurfaceHoneycombMistakeDiagrams,
  SurfaceHoneycombNeedlePath,
  SurfaceHoneycombPleatDiagram,
  SurfaceHoneycombTensionDiagram,
  SurfaceHoneycombTheoryDiagram,
  SurfaceHoneycombTroubleshootingDiagram,
  SurfaceHoneycombVariationsDiagram,
} from "@/components/illustrations/SurfaceHoneycombStitch";
import {
  StitchChapterLayout,
  TroubleshootList,
  VariationGrid,
  STANDARD_TOC,
} from "@/components/chapters/StitchChapterLayout";

const toc = STANDARD_TOC.map((item) => {
  if (item.id === "pleats") return { ...item, label: "Pleat & surface diagram" };
  if (item.id === "theory") return { ...item, label: "Why it stays flat" };
  return item;
});

const troubleshooting = [
  {
    problem: "The stitch looks exactly like classic honeycomb",
    fix: "Your row spacing or pull is too deep. Ease the bind until the thread rests on the ridge crowns, then keep the upper and lower rows closer together than a classic honeycomb sample.",
  },
  {
    problem: "Long diagonal threads show between rows",
    fix: "Shorten the travel and keep it close to the same pleat path. Surface honeycomb can show a neat rise, but it should not slash across the face.",
  },
  {
    problem: "No low lozenge pattern appears",
    fix: "Check the stagger. Lower binds should connect 1-2, 3-4, 5-6 while upper binds connect 2-3, 4-5, 6-7. Stacked pairs flatten into bars.",
  },
  {
    problem: "The surface loops snag or float",
    fix: "The bind is too loose or the bite is too shallow. Re-seat each bind with a small crown bite on both mountains without pulling the valley inward.",
  },
  {
    problem: "Pleats pucker or cup under the band",
    fix: "You are cinching the stitch. Unpick a few repeats, finger-press the pleats flat, and restart with enough slack for the fabric face to stay level.",
  },
];

const variations = [
  {
    name: "Fine surface",
    note: "Close rows and fine thread for a barely raised honeycomb texture on baby garments.",
  },
  {
    name: "Wide decorative",
    note: "Slightly wider rows for visible lozenges, still flatter and less elastic than classic honeycomb.",
  },
  {
    name: "Two-color",
    note: "Alternate thread colors by row or by repeat to emphasize the surface bind rhythm.",
  },
  {
    name: "Bordered band",
    note: "Frame the surface honeycomb with cable rows when a yoke or cuff needs crisp edges.",
  },
  {
    name: "Single accent row",
    note: "Work a narrow band between embroidery motifs where classic honeycomb would add too much bulk.",
  },
  {
    name: "Tone-on-tone",
    note: "Match the fabric for shadow texture rather than contrast; best on crisp cotton or linen.",
  },
];

export function SurfaceHoneycombChapter() {
  const [showLabels, setShowLabels] = useState(true);
  const [pathStep, setPathStep] = useState(4);

  return (
    <StitchChapterLayout
      toc={toc}
      prev={{ href: "/stitches/van-dyke/", label: "Van Dyke" }}
      next={{ href: "/stitches/", label: "Stitch index" }}
      sources="Surface honeycomb is presented as a flatter companion to standard English smocking honeycomb: staggered pair-binds on two gathering rows with less row depth and less pull into the cells. Manuals vary in naming and exact travel visibility, so this chapter marks the invariant mechanics - stagger, shallow bind, close row spacing, and reduced elasticity - rather than inventing a single universal standard."
      callout={
        <div className="callout">
          <p className="text-sm leading-relaxed text-ink-muted">
            <strong className="text-ink">Intermediate surface stitch.</strong> Surface honeycomb
            uses the same alternating pair-bind logic as{" "}
            <Link href="/stitches/honeycomb/" className="text-dusty-blue-deep">
              classic honeycomb
            </Link>
            , but the binds sit on the fabric face. Expect decoration first and elasticity second.
          </p>
        </div>
      }
    >
      <section id="appearance" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Finished appearance</h2>
        <p className="mt-3 text-ink-muted">
          Surface honeycomb reads as a low, sparkling lattice. The bind points still alternate
          lower, upper, lower, upper, but the cells stay flatter than the open hexagons in classic
          honeycomb. Use it when you want honeycomb rhythm on the garment face without a springy
          elastic field.
        </p>
        <FinishedSurfaceHoneycombAppearance />
      </section>

      <section id="pleats" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Pleat &amp; surface diagram</h2>
        <p className="mt-3 text-ink-muted">
          The mechanics are familiar: bind a pair on one row, travel to the other row, and bind the
          offset pair. The difference is depth. Take crown bites on the pleat mountains and let the
          thread sit on the surface instead of drawing neighboring pleats into deep cells.
        </p>
        <SurfaceHoneycombPleatDiagram />
        <ul className="mt-2 space-y-2 text-sm text-ink-muted">
          <li>
            <strong className="text-ink">Surface bind:</strong> a shallow tack across two adjacent
            mountain crowns.
          </li>
          <li>
            <strong className="text-ink">Close rows:</strong> less distance between upper and lower
            rows means lower cell depth.
          </li>
          <li>
            <strong className="text-ink">Stagger:</strong> the honeycomb identity still depends on
            offset pair-binds, not stacked pairs.
          </li>
          <li>
            <strong className="text-ink">Reduced give:</strong> flatter cells decorate; classic
            cells stretch.
          </li>
        </ul>
      </section>

      <section id="construction" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Animated construction</h2>
        <p className="mt-3 text-ink-muted">
          Practice the rhythm slowly: shallow bind, short travel, offset shallow bind. Use Play or
          step through the sequence until the surface tension feels different from classic
          honeycomb.
        </p>
        <SurfaceHoneycombConstructionAnimation />
      </section>

      <section id="needle-path" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Needle path diagram</h2>
        <p className="mt-3 text-ink-muted">
          The needle path follows the honeycomb stagger, but each active stitch sits flatter on the
          front. Toggle labels to focus on the row logic, then step bind by bind.
        </p>
        <SurfaceHoneycombNeedlePathFrame
          showLabels={showLabels}
          setShowLabels={setShowLabels}
          pathStep={pathStep}
          setPathStep={setPathStep}
        />
        <div className="callout-tip callout">
          <p className="text-sm text-ink-muted">
            <strong className="text-ink">Feel check:</strong> after two repeats, run a fingertip
            over the band. You should feel small surface tacks, not deep honeycomb pockets.
          </p>
        </div>
      </section>

      <section id="front-back" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Front &middot; Back &middot; Cross-section</h2>
        <p className="mt-3 text-ink-muted">
          On the front, surface honeycomb shows low paired arches. The back has only small nips and
          short carries. In cross-section, the thread rides on the pleat crowns instead of cinching
          the valleys into a deep honeycomb cavity.
        </p>
        <SurfaceHoneycombFrontBackCross />
      </section>

      <section id="tension" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Thread tension</h2>
        <p className="mt-3 text-ink-muted">
          Surface honeycomb tension is lighter than classic honeycomb. Pull just enough to seat the
          bind across two mountains; stop before the fabric forms a true elastic cell.
        </p>
        <SurfaceHoneycombTensionDiagram />
      </section>

      <section id="mistakes" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Common mistakes</h2>
        <p className="mt-3 text-ink-muted">
          Most errors come from borrowing too much classic honeycomb habit: deep pulls, hidden
          tunnels, or a row gap that is too wide for a surface effect.
        </p>
        <SurfaceHoneycombMistakeDiagrams />
      </section>

      <section id="troubleshooting" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Troubleshooting</h2>
        <p className="mt-3 text-ink-muted">
          Diagnose the surface first. If the thread is not sitting visibly and evenly on the face,
          fix depth and tension before adjusting the repeat count.
        </p>
        <SurfaceHoneycombTroubleshootingDiagram />
        <TroubleshootList items={troubleshooting} />
      </section>

      <section id="variations" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Variations</h2>
        <p className="mt-3 text-ink-muted">
          Vary scale and thread after the shallow bind is reliable. If you need strong expansion,
          choose classic honeycomb instead.
        </p>
        <SurfaceHoneycombVariationsDiagram />
        <VariationGrid variants={variations} />
      </section>

      <section id="garments" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Garment examples</h2>
        <p className="mt-3 text-ink-muted">
          Surface honeycomb belongs on flatter decorative zones: yoke accents, cuffs, inset bands,
          and heirloom panels. It is not the best choice for areas that rely on honeycomb stretch
          for fit.
        </p>
        <SurfaceHoneycombGarmentsDiagram />
        <ul className="mt-4 space-y-2 text-sm text-ink-muted">
          <li>Yoke accents where a low geometric texture frames embroidery.</li>
          <li>Bishop bands above or below a more elastic smocked field.</li>
          <li>Cuff and sleeve trims that need decoration without bulky spring.</li>
          <li>Heirloom insets and samples where surface thread color is the feature.</li>
        </ul>
        <p className="mt-4 text-sm text-ink-faint">
          See also:{" "}
          <Link href="/garments/" className="text-dusty-blue-deep">
            Garment construction
          </Link>
          .
        </p>
      </section>

      <section id="theory" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Why surface honeycomb stays flat</h2>
        <p className="mt-3 text-ink-muted">
          Classic honeycomb opens because staggered pair-binds lock alternating rows while leaving
          taller spans of fabric free to expand. Surface honeycomb keeps the stagger but reduces
          three things: row spacing, bite depth, and draw-up. The geometry remains honeycomb; the
          energy changes from elastic expansion to surface ornament.
        </p>
        <SurfaceHoneycombTheoryDiagram />
        <div className="callout mt-4">
          <p className="text-sm text-ink-muted">
            For the deeper elastic version, compare the diagrams in{" "}
            <Link href="/stitches/honeycomb/" className="text-dusty-blue-deep">
              Classic Honeycomb
            </Link>
            . For general fabric physics, see{" "}
            <Link href="/theory/" className="text-dusty-blue-deep">
              Smocking Theory
            </Link>
            .
          </p>
        </div>
      </section>
    </StitchChapterLayout>
  );
}

function SurfaceHoneycombNeedlePathFrame({
  showLabels,
  setShowLabels,
  pathStep,
  setPathStep,
}: {
  showLabels: boolean;
  setShowLabels: (value: boolean | ((current: boolean) => boolean)) => void;
  pathStep: number;
  setPathStep: (value: number | ((current: number) => number)) => void;
}) {
  return (
    <div className="illustration-frame my-6">
      <div className="stitch-controls mb-3 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep"
          onClick={() => setShowLabels((value) => !value)}
        >
          {showLabels ? "Hide labels" : "Show labels"}
        </button>
        <button
          type="button"
          className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep"
          onClick={() => setPathStep((value) => Math.max(1, value - 1))}
        >
          Prev bind
        </button>
        <button
          type="button"
          className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep"
          onClick={() => setPathStep((value) => Math.min(8, value + 1))}
        >
          Next bind
        </button>
        <span className="self-center text-xs text-ink-faint">Bind {pathStep}/8</span>
      </div>
      <div className="overflow-x-auto">
        <SurfaceHoneycombNeedlePath showLabels={showLabels} step={pathStep} />
      </div>
      <p className="mt-3 text-center text-sm text-ink-muted">
        Needle path - toggle labels and step through the shallow stagger.
      </p>
    </div>
  );
}
