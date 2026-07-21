"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FinishedWaveAppearance,
  WaveConstructionAnimation,
  WaveFrontBackCross,
  WaveNeedlePath,
  WavePleatRowsDiagram,
} from "@/components/illustrations/WaveStitch";
import {
  WaveMistakeDiagrams,
  WaveTensionDiagram,
  WaveToTrellisPreview,
  WaveVariations,
} from "@/components/illustrations/WaveExtras";
import { IllustrationFrame, SvgRoot } from "@/components/illustrations/IllustrationFrame";

const toc = [
  { id: "appearance", label: "Finished appearance" },
  { id: "pleats", label: "Pleat & row diagram" },
  { id: "construction", label: "Animated construction" },
  { id: "needle-path", label: "Needle path" },
  { id: "front-back", label: "Front · Back · Cross-section" },
  { id: "tension", label: "Thread tension" },
  { id: "mistakes", label: "Common mistakes" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "variations", label: "Variations" },
  { id: "garments", label: "Garment examples" },
  { id: "theory", label: "Why waves curve" },
  { id: "trellis-preview", label: "Toward trellis" },
];

export function WaveStitchChapter() {
  const [showLabels, setShowLabels] = useState(true);
  const [pathStep, setPathStep] = useState(5);

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
              <strong className="text-ink">Publication-quality chapter.</strong> Wave builds on{" "}
              <Link href="/stitches/cable-stitch/" className="text-dusty-blue-deep">
                Cable Stitch
              </Link>
              . Master cable tension and mountain depth first — wave adds vertical travel between
              two gathering rows.
            </p>
          </div>

          <section id="appearance" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Finished appearance</h2>
            <p className="mt-3 text-ink-muted">
              A wave looks like a smooth chevron or sine along the pleated panel. Peaks touch the
              upper gathering row; troughs sit on the lower. From a short distance the steps blend
              into a continuous curve — that optical blend is why we call it a wave, not a zigzag.
            </p>
            <FinishedWaveAppearance />
          </section>

          <section id="pleats" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Pleat &amp; row diagram</h2>
            <p className="mt-3 text-ink-muted">
              Cable lives on <em>one</em> gathering row. Wave needs <em>two</em> parallel rails —
              a lower row and an upper row — with enough space between them for the amplitude you
              want. Stitches still take only the top third of each mountain; the change is in{" "}
              <em>height</em>, not depth into the valley.
            </p>
            <WavePleatRowsDiagram />
            <ul className="mt-2 space-y-2 text-sm text-ink-muted">
              <li>
                <strong className="text-ink">Lower row:</strong> trough line — every wave cycle
                starts and ends here.
              </li>
              <li>
                <strong className="text-ink">Upper row:</strong> peak line — the crest of each wave.
              </li>
              <li>
                <strong className="text-ink">Wave of 4:</strong> four stitches ascending, four
                descending (counts vary; keep ascent = descent).
              </li>
              <li>
                <strong className="text-ink">Row spacing:</strong> wider spacing = taller waves.
                Rows that are too close make baby waves that read as cable mistakes.
              </li>
            </ul>
          </section>

          <section id="construction" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Animated construction</h2>
            <p className="mt-3 text-ink-muted">
              Follow one full cycle: anchor, climb, crest, descend, trough. Use Play or step
              manually.
            </p>
            <WaveConstructionAnimation />
          </section>

          <section id="needle-path" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Needle path diagram</h2>
            <p className="mt-3 text-ink-muted">
              Previous stitches fade; the current stitch is gold. Arrows label whether you are
              ascending or descending.
            </p>
            <IllustrationFrame
              caption="Needle path — toggle labels and step through the wave"
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
                    onClick={() => setPathStep((s) => Math.min(12, s + 1))}
                  >
                    Next stitch
                  </button>
                </>
              }
            >
              <WaveNeedlePath showLabels={showLabels} step={pathStep} />
            </IllustrationFrame>
            <div className="callout-tip callout">
              <p className="text-sm text-ink-muted">
                <strong className="text-ink">Counting tip:</strong> Say the steps aloud — “one,
                two, three, four — peak — four, three, two, one — trough.” Matching counts keep
                the repeat centered on a bishop yoke.
              </p>
            </div>
          </section>

          <section id="front-back" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Front · Back · Cross-section</h2>
            <p className="mt-3 text-ink-muted">
              On the front, the wave flows. On the back, carries slant with the slope. In
              cross-section, stitch height changes while bite depth stays shallow.
            </p>
            <WaveFrontBackCross />
          </section>

          <section id="tension" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Thread tension</h2>
            <p className="mt-3 text-ink-muted">
              Wave tension controls amplitude. Too tight collapses the curve; too loose leaves
              peaks short of the upper row.
            </p>
            <WaveTensionDiagram />
          </section>

          <section id="mistakes" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Common mistakes</h2>
            <p className="mt-3 text-ink-muted">
              Most wave errors appear before you finish the first crest. Stop and fix early.
            </p>
            <WaveMistakeDiagrams />
          </section>

          <section id="troubleshooting" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Troubleshooting</h2>
            <p className="mt-3 text-ink-muted">
              Repair within the current half-cycle when you can — full-row rip-outs are rarely
              required.
            </p>
            <div className="mt-6 space-y-4">
              {[
                {
                  problem: "Peaks don’t reach the upper row",
                  fix: "Vertical steps are too small or tension is slack. Unpick back to the trough, recount the ascent, and land deliberately on the upper gathering thread as a visual rail.",
                },
                {
                  problem: "Wave looks like a sharp zigzag, not a curve",
                  fix: "Often a skipped intermediate height (spike). Insert the missing step heights on the next cycle; for the bad crest, unpick to the stitch before the jump and redistribute.",
                },
                {
                  problem: "Peaks drift left/right each cycle",
                  fix: "Ascent and descent counts don’t match. Mark pleat numbers for peak and trough on your sample until the habit sticks.",
                },
                {
                  problem: "Fabric cups between the two rows",
                  fix: "Tension too tight across the amplitude. Ease each stitch; gently finger-press mountains round again before continuing.",
                },
                {
                  problem: "Accidentally worked cable on one row",
                  fix: "No vertical travel. Unpick to where height should have changed, then resume the stepped ascent. Keep the upper row visible — some smockers baste a contrast thread on each gathering row as a temporary guide.",
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
              Change cycle length and row spacing before changing thread. The geometry does more
              than the color.
            </p>
            <WaveVariations />
          </section>

          <section id="garments" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Garment examples</h2>
            <p className="mt-3 text-ink-muted">
              Wave is the decorative traveler — often framed by cable borders.
            </p>
            <IllustrationFrame caption="Typical wave placements on heirloom garments">
              <SvgRoot viewBox="0 0 560 200" aria-label="Garment placement examples for wave stitch">
                {[
                  { x: 20, label: "Bishop field" },
                  { x: 150, label: "Yoke band" },
                  { x: 280, label: "Bonnet brim" },
                  { x: 410, label: "Sleeve smock" },
                ].map((g) => (
                  <g key={g.label} transform={`translate(${g.x}, 30)`}>
                    <rect
                      width="120"
                      height="120"
                      rx="4"
                      fill="var(--fabric)"
                      stroke="var(--fabric-shadow)"
                    />
                    {/* cable borders */}
                    <path
                      d="M 12 38 L 24 32 L 36 38 L 48 32 L 60 38 L 72 32 L 84 38 L 96 32 L 108 38"
                      fill="none"
                      stroke="var(--thread)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 12 98 L 24 92 L 36 98 L 48 92 L 60 98 L 72 92 L 84 98 L 96 92 L 108 98"
                      fill="none"
                      stroke="var(--thread)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    {/* wave field */}
                    <path
                      d="M 12 68 L 27 55 L 42 48 L 57 55 L 72 68 L 87 55 L 102 48"
                      fill="none"
                      stroke="var(--dusty-blue)"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
              <li>Bishop dress centers — wave fields between cable borders</li>
              <li>Yokes — single or double wave bands</li>
              <li>Bonnets — gentle baby waves that still curve with the head</li>
              <li>Sleeves — short wave repeats above a cuff cable</li>
            </ul>
            <p className="mt-4 text-sm text-ink-faint">
              See also:{" "}
              <Link href="/garments/" className="text-dusty-blue-deep">
                Garment construction
              </Link>
            </p>
          </section>

          <section id="theory" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Why waves curve</h2>
            <p className="mt-3 text-ink-muted">
              The needle path is a stepped diagonal on a corrugated surface. Your eye averages
              those steps into a curve when step height and stitch length stay even. Uneven steps
              break the illusion and read as a broken chevron. Paired mirror waves share vertices
              and close into diamonds — the geometry behind trellis.
            </p>
            <div className="callout mt-4">
              <p className="text-sm text-ink-muted">
                More on compression and pleat physics:{" "}
                <Link href="/theory/" className="text-dusty-blue-deep">
                  Smocking Theory
                </Link>
                .
              </p>
            </div>
          </section>

          <section id="trellis-preview" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Toward trellis</h2>
            <p className="mt-3 text-ink-muted">
              When you can work a clean wave of 4, you are one mirror-image row away from trellis.
              The preview below is orientation only — the full{" "}
              <Link href="/stitches/trellis/" className="text-dusty-blue-deep">
                Trellis
              </Link>{" "}
              chapter will cover meeting points, diamond tension, and centering.
            </p>
            <WaveToTrellisPreview />
          </section>

          <section className="mt-16 rounded border border-border bg-cream-deep/30 p-6">
            <p className="label-caps mb-2">Sources &amp; verification</p>
            <p className="text-sm leading-relaxed text-ink-muted">
              Wave / trellis mechanics follow standard English smocking teaching: stitches travel
              between two gathering levels with matched ascent and descent counts. Exact “wave of
              N” naming varies by manual; this chapter standardizes on wave of 4 for clarity.
              Model-dependent pleater row spacing still depends on how deep you pleated — verify
              on your sample. Uncertainty is marked rather than invented.
            </p>
          </section>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/stitches/cable-stitch/"
              className="rounded border border-border px-4 py-2 text-sm text-ink no-underline hover:bg-cream-deep"
            >
              ← Cable Stitch
            </Link>
            <Link
              href="/stitches/trellis/"
              className="rounded border border-border px-4 py-2 text-sm text-ink no-underline hover:bg-cream-deep"
            >
              Trellis →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
