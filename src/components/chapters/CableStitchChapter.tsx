"use client";

import Link from "next/link";
import {
  CableConstructionAnimation,
  CableFrontBackCross,
  CableNeedlePath,
  FinishedCableAppearance,
} from "@/components/illustrations/CableStitch";
import {
  CableVariations,
  MistakeDiagrams,
  TensionDiagram,
} from "@/components/illustrations/CableExtras";
import { IllustrationFrame, SvgRoot } from "@/components/illustrations/IllustrationFrame";
import { PleatDiagramStandalone } from "@/components/illustrations/PleatFabric";
import { useState } from "react";

const toc = [
  { id: "appearance", label: "Finished appearance" },
  { id: "pleats", label: "Pleat diagram" },
  { id: "construction", label: "Animated construction" },
  { id: "needle-path", label: "Needle path" },
  { id: "front-back", label: "Front · Back · Cross-section" },
  { id: "tension", label: "Thread tension" },
  { id: "mistakes", label: "Common mistakes" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "variations", label: "Variations" },
  { id: "garments", label: "Garment examples" },
  { id: "theory", label: "Why cable works" },
];

export function CableStitchChapter() {
  const [showLabels, setShowLabels] = useState(true);
  const [pathStep, setPathStep] = useState(3);

  return (
    <div className="site-container">
      <div className="grid gap-10 py-10 lg:grid-cols-[220px_1fr]">
        <aside className="no-print lg:sticky lg:top-24 lg:self-start">
          <p className="label-caps mb-3">On this page</p>
          <nav className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="whitespace-nowrap text-sm text-ink-muted no-underline hover:text-burgundy lg:whitespace-normal"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 max-w-3xl">
          <div className="callout">
            <p className="text-sm leading-relaxed text-ink-muted">
              <strong className="text-ink">Start here.</strong> Cable is the foundation for many
              smocking patterns. Use the diagrams to learn consistent stitch depth and tension
              before adding vertical movement.
            </p>
          </div>

          <section id="appearance" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Finished appearance</h2>
            <p className="mt-3 text-ink-muted">
              A well-worked cable looks like a narrow braided cord lying along a gathering row.
              Stitches alternate above and below the line, catching only the top third of each
              mountain. From a short distance, the row reads as a single solid rope — not as
              individual stitches.
            </p>
            <FinishedCableAppearance />
          </section>

          <section id="pleats" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Pleat diagram</h2>
            <p className="mt-3 text-ink-muted">
              English smocking is worked on fabric already gathered into uniform pleats —
              traditionally by a Read 16-needle pleater. Mountains are the raised ridges;
              valleys are the recessed grooves. The needle enters and exits the{" "}
              <em>mountains</em>, never diving deep into the valleys.
            </p>
            <IllustrationFrame caption="Mountains (M) and valleys (V). Gathering row shown as dashed line.">
              <PleatDiagramStandalone count={8} showLabels showNeedleNumbers />
            </IllustrationFrame>
            <ul className="mt-2 space-y-2 text-sm text-ink-muted">
              <li>
                <strong className="text-ink">Mountain:</strong> the crest of each pleat — where
                stitches sit.
              </li>
              <li>
                <strong className="text-ink">Valley:</strong> the fold between mountains — do not
                stitch deep here for cable.
              </li>
              <li>
                <strong className="text-ink">Pleat numbers:</strong> count left to right as you
                work (or reverse if left-handed; keep consistent).
              </li>
              <li>
                <strong className="text-ink">Needle spacing on Read 16:</strong> historically about
                3/16&quot; between needles on common Read castings — confirm on your machine.
              </li>
            </ul>
          </section>

          <section id="construction" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Animated construction</h2>
            <p className="mt-3 text-ink-muted">
              Work step by step. Use Play to advance automatically, or step manually. Each pass
              is shown individually.
            </p>
            <CableConstructionAnimation />
          </section>

          <section id="needle-path" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Needle path diagram</h2>
            <p className="mt-3 text-ink-muted">
              Previous stitches fade; the current stitch is highlighted in gold. Entry and exit
              points sit on consecutive mountains, alternating sides of the gathering row.
            </p>
            <IllustrationFrame
              caption="Needle path — toggle labels and step through the row"
              controls={
                <>
                  <button
                    type="button"
                    className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep"
                    onClick={() => setShowLabels((v) => !v)}
                  >
                    {showLabels ? "Hide labels" : "Show labels"}
                  </button>
                  <button
                    type="button"
                    className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep"
                    onClick={() => setPathStep((s) => Math.max(1, s - 1))}
                  >
                    Prev stitch
                  </button>
                  <button
                    type="button"
                    className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep"
                    onClick={() => setPathStep((s) => Math.min(7, s + 1))}
                  >
                    Next stitch
                  </button>
                </>
              }
            >
              <CableNeedlePath showLabels={showLabels} step={pathStep} />
            </IllustrationFrame>
            <div className="callout-tip callout">
              <p className="text-sm text-ink-muted">
                <strong className="text-ink">Rule of thumb:</strong> Take about one-third of the
                mountain. Same depth, every stitch. The cable should sit centered on the gathering
                row.
              </p>
            </div>
          </section>

          <section id="front-back" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Front · Back · Cross-section</h2>
            <p className="mt-3 text-ink-muted">
              On the front, the braid is continuous. On the back, you see short carries between
              mountains. In cross-section, the thread only pierces the upper portion of each fold.
            </p>
            <CableFrontBackCross />
          </section>

          <section id="tension" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Thread tension</h2>
            <p className="mt-3 text-ink-muted">
              Tension is the difference between a soft braid and a puckered disaster. Compare
              these four outcomes on the same pleated strip.
            </p>
            <TensionDiagram />
          </section>

          <section id="mistakes" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Common mistakes</h2>
            <p className="mt-3 text-ink-muted">
              Learn to spot these early — usually within the first half-dozen stitches.
            </p>
            <MistakeDiagrams />
          </section>

          <section id="troubleshooting" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Troubleshooting</h2>
            <p className="mt-3 text-ink-muted">
              Fix problems without ripping the entire row when possible.
            </p>
            <div className="mt-6 space-y-4">
              {[
                {
                  problem: "Cable looks like stem stitch (twisted rope)",
                  fix: "You kept the needle on the same side of the thread. Unpick back to the error, then alternate: thread below needle, then above, then below.",
                },
                {
                  problem: "Pleats flattening mid-row",
                  fix: "Stitches are too deep or too tight. Unpick 4–6 stitches, take shallower bites, and ease tension. Gently finger-press mountains back into roundness before continuing.",
                },
                {
                  problem: "Skipped pleat / gap in the braid",
                  fix: "Unpick to the gap, work the missing mountain, then continue. Do not bridge the gap with a longer stitch — it will show forever.",
                },
                {
                  problem: "Uneven stitch length",
                  fix: "Mark the gathering row lightly with a water-soluble pen as a depth guide, or use the pleater’s gathering threads as your visual rail. Consistency beats speed.",
                },
                {
                  problem: "Thread shredding",
                  fix: "Switch to a larger needle eye (milliner #7–9 or crewel #7), shorten your thread length to ~18\", and check for burrs on the needle.",
                },
              ].map((item) => (
                <div key={item.problem} className="rounded border border-border bg-paper/60 p-4">
                  <p className="font-medium text-ink">{item.problem}</p>
                  <p className="mt-1 text-sm text-ink-muted">{item.fix}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="variations" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Variations</h2>
            <p className="mt-3 text-ink-muted">
              Once the basic cable is reliable, these variations appear constantly on plates.
            </p>
            <CableVariations />
          </section>

          <section id="garments" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Garment examples</h2>
            <p className="mt-3 text-ink-muted">
              Cable is structural: it holds pleats and frames decorative fields.
            </p>
            <IllustrationFrame caption="Where cable typically appears on heirloom garments">
              <SvgRoot viewBox="0 0 560 200" aria-label="Garment placement examples for cable stitch">
                {[
                  { x: 20, label: "Bishop yoke" },
                  { x: 150, label: "Sleeve insert" },
                  { x: 280, label: "Bonnet front" },
                  { x: 410, label: "Collar band" },
                ].map((g) => (
                  <g key={g.label} transform={`translate(${g.x}, 30)`}>
                    <rect
                      width="120"
                      height="120"
                      rx="4"
                      fill="var(--fabric)"
                      stroke="var(--fabric-shadow)"
                    />
                    <path
                      d="M 15 50 L 30 42 L 45 50 L 60 42 L 75 50 L 90 42 L 105 50"
                      fill="none"
                      stroke="var(--thread)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <text
                      x="60"
                      y="150"
                      textAnchor="middle"
                      fontSize="11"
                      fill="var(--ink-muted)"
                      fontFamily="var(--font-body), sans-serif"
                    >
                      {g.label}
                    </text>
                  </g>
                ))}
              </SvgRoot>
            </IllustrationFrame>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              <li>Children&rsquo;s bishop dresses — top and bottom borders of the smocked yoke</li>
              <li>Bonnets — horizontal control rows above decorative waves</li>
              <li>Sleeves and cuffs — elastic-looking bands that still hold shape</li>
              <li>Day gowns and nightgowns — neckline and chest panels</li>
              <li>Home decor — pillowcase inserts and lampshade bands</li>
            </ul>
            <p className="mt-4 text-sm text-ink-faint">
              See also:{" "}
              <Link href="/garments/" className="text-dusty-blue-deep">
                Garment construction
              </Link>
            </p>
          </section>

          <section id="theory" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Why cable works</h2>
            <p className="mt-3 text-ink-muted">
              Cable compresses consecutive mountains toward each other with alternating leverage
              above and below the gathering line. That alternating leverage is why the stitch{" "}
              <em>rolls</em> into a braid instead of lying flat like a running stitch. Too much
              compression flattens the pleat geometry; too little fails to lock the folds.
            </p>
            <div className="callout mt-4">
              <p className="text-sm text-ink-muted">
                Deeper theory — fabric geometry, pleat physics, and tension mathematics — lives in
                the{" "}
                <Link href="/theory/" className="text-dusty-blue-deep">
                  Smocking Theory
                </Link>{" "}
                chapter.
              </p>
            </div>
          </section>

          <section className="mt-16 rounded border border-border bg-cream-deep/30 p-6">
            <p className="label-caps mb-2">Sources &amp; verification</p>
            <p className="text-sm leading-relaxed text-ink-muted">
              Cable mechanics described here follow standard English smocking practice as taught
              in classic smocking manuals and heirloom sewing references. Read 16 needle spacing
              is noted as historically typical (~3/16&quot;) but varies by casting — verify on
              your machine. When a detail is model-dependent, it is marked as uncertain rather
              than invented.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
