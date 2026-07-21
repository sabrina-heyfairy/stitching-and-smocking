"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FinishedHoneycombAppearance,
  HoneycombConstructionAnimation,
  HoneycombFrontBackCross,
  HoneycombNeedlePath,
  HoneycombPleatDiagram,
} from "@/components/illustrations/HoneycombStitch";
import {
  HoneycombMistakeDiagrams,
  HoneycombStretchDemo,
  HoneycombTensionDiagram,
  HoneycombVariations,
} from "@/components/illustrations/HoneycombExtras";
import { IllustrationFrame, SvgRoot } from "@/components/illustrations/IllustrationFrame";

const toc = [
  { id: "appearance", label: "Finished appearance" },
  { id: "pleats", label: "Pleat & bind diagram" },
  { id: "construction", label: "Animated construction" },
  { id: "needle-path", label: "Needle path" },
  { id: "front-back", label: "Front · Back · Cross-section" },
  { id: "stretch", label: "How cells open" },
  { id: "tension", label: "Thread tension" },
  { id: "mistakes", label: "Common mistakes" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "variations", label: "Variations" },
  { id: "garments", label: "Garment examples" },
  { id: "theory", label: "Why honeycomb opens" },
];

export function HoneycombStitchChapter() {
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
              <strong className="text-ink">Publication-quality chapter.</strong> Honeycomb is
              intermediate because of the alternating-row stagger. Be solid on{" "}
              <Link href="/stitches/cable-stitch/" className="text-dusty-blue-deep">
                Cable
              </Link>{" "}
              mountain depth and{" "}
              <Link href="/stitches/wave-stitch/" className="text-dusty-blue-deep">
                Wave
              </Link>{" "}
              two-row awareness before starting.
            </p>
          </div>

          <section id="appearance" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Finished appearance</h2>
            <p className="mt-3 text-ink-muted">
              Classic honeycomb reads as a lattice of soft hexagons. Pair-binds hold mountains
              together at alternating heights; between those binds the fabric can open into cells.
              At rest the pattern looks gathered; on the body it yields — that is the stitch&rsquo;s
              job.
            </p>
            <FinishedHoneycombAppearance />
          </section>

          <section id="pleats" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Pleat &amp; bind diagram</h2>
            <p className="mt-3 text-ink-muted">
              Like wave, honeycomb uses <em>two</em> gathering rows. Unlike wave, you do not step
              diagonally across every mountain. You <strong className="text-ink">bind pairs</strong>{" "}
              on one row, then travel <em>inside</em> a mountain to the other row and bind the next
              pair there.
            </p>
            <HoneycombPleatDiagram />
            <ul className="mt-2 space-y-2 text-sm text-ink-muted">
              <li>
                <strong className="text-ink">Bind:</strong> stitch that draws two neighboring
                mountains together on one gathering row.
              </li>
              <li>
                <strong className="text-ink">Travel:</strong> move between lower and upper rows{" "}
                <em>inside</em> the mountain — not across the face of the fabric.
              </li>
              <li>
                <strong className="text-ink">Stagger:</strong> lower binds and upper binds must
                offset (1–2 lower, then 2–3 upper, then 3–4 lower…).
              </li>
              <li>
                <strong className="text-ink">Cell:</strong> the open hex that forms between
                staggered binds when the panel stretches.
              </li>
            </ul>
          </section>

          <section id="construction" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Animated construction</h2>
            <p className="mt-3 text-ink-muted">
              One rhythm: bind → travel → bind → travel. Use Play or step manually until the
              stagger is automatic.
            </p>
            <HoneycombConstructionAnimation />
          </section>

          <section id="needle-path" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Needle path diagram</h2>
            <p className="mt-3 text-ink-muted">
              Previous binds fade; the current bind is gold. Dashed lines are travels inside the
              mountain between rows.
            </p>
            <IllustrationFrame
              caption="Needle path — toggle labels and step through successive binds"
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
                    Prev bind
                  </button>
                  <button
                    type="button"
                    className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep"
                    onClick={() => setPathStep((s) => Math.min(8, s + 1))}
                  >
                    Next bind
                  </button>
                </>
              }
            >
              <HoneycombNeedlePath showLabels={showLabels} step={pathStep} />
            </IllustrationFrame>
            <div className="callout-tip callout">
              <p className="text-sm text-ink-muted">
                <strong className="text-ink">Memory aid:</strong> “Together on the floor, up the
                chimney, together on the ceiling, down the chimney.” Floor = lower row; ceiling =
                upper row; chimney = inside the mountain.
              </p>
            </div>
          </section>

          <section id="front-back" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Front · Back · Cross-section</h2>
            <p className="mt-3 text-ink-muted">
              The lattice is a front-face effect. The back shows short pair stitches. Cross-section
              reveals binds at alternating heights with vertical travels hidden in the folds.
            </p>
            <HoneycombFrontBackCross />
          </section>

          <section id="stretch" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">How cells open</h2>
            <p className="mt-3 text-ink-muted">
              After a few repeats, ease the panel sideways. Cells should bloom. If nothing opens,
              the stagger or tension is wrong — see troubleshooting below.
            </p>
            <HoneycombStretchDemo />
          </section>

          <section id="tension" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Thread tension</h2>
            <p className="mt-3 text-ink-muted">
              Honeycomb tension is a balance: tight enough to hold pairs, loose enough to leave
              cell walls mobile.
            </p>
            <HoneycombTensionDiagram />
          </section>

          <section id="mistakes" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Common mistakes</h2>
            <p className="mt-3 text-ink-muted">
              Check the pattern after every two binds — errors compound fast in a lattice.
            </p>
            <HoneycombMistakeDiagrams />
          </section>

          <section id="troubleshooting" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Troubleshooting</h2>
            <p className="mt-3 text-ink-muted">
              Fix locally when you can. A single wrong bind rarely requires ripping the whole
              field.
            </p>
            <div className="mt-6 space-y-4">
              {[
                {
                  problem: "No hexagonal cells — fabric won’t open",
                  fix: "Usually stacked binds (same pair on both rows) or over-tight tension. Unpick back to the first stacked pair, restore the stagger (offset by one mountain on the other row), and ease tension.",
                },
                {
                  problem: "Visible diagonal bar between rows",
                  fix: "Surface carry. Unpick that travel and re-route inside the mountain. The face should only show the short bind arches.",
                },
                {
                  problem: "Lattice drifts / cells uneven",
                  fix: "Skipped mountain or inconsistent bite depth. Mark mountain numbers on a sample; keep every bind to the top third only.",
                },
                {
                  problem: "Panel cups into a tube",
                  fix: "Tension too high across many binds. Ease several stitches; finger-press mountains round; continue with softer hands.",
                },
                {
                  problem: "Looks like cable or outline",
                  fix: "You stayed on one row with continuous stitches. Restart with explicit pair-binds and row travel — honeycomb is not a single-row cord.",
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
              Change row spacing and field size before changing the bind logic. Stagger is sacred.
            </p>
            <HoneycombVariations />
          </section>

          <section id="garments" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Garment examples</h2>
            <p className="mt-3 text-ink-muted">
              Use honeycomb where you want give — chests, sleeves, and comfortable yokes — often
              framed by cable for edge control.
            </p>
            <IllustrationFrame caption="Honeycomb placements — elastic fields with optional cable borders">
              <SvgRoot viewBox="0 0 560 200" aria-label="Garment placement examples for honeycomb">
                {[
                  { x: 20, label: "Bishop center" },
                  { x: 150, label: "Yoke field" },
                  { x: 280, label: "Sleeve band" },
                  { x: 410, label: "Pillow insert" },
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
                      d="M 14 40 L 26 34 L 38 40 L 50 34 L 62 40 L 74 34 L 86 40 L 98 34 L 108 40"
                      fill="none"
                      stroke="var(--thread)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    {/* mini honeycomb */}
                    <path d="M 20 70 Q 32 64 44 70" fill="none" stroke="var(--sage)" strokeWidth="2" />
                    <path d="M 44 55 Q 56 49 68 55" fill="none" stroke="var(--sage)" strokeWidth="2" />
                    <path d="M 68 70 Q 80 64 92 70" fill="none" stroke="var(--sage)" strokeWidth="2" />
                    <line x1={44} y1={70} x2={44} y2={55} stroke="var(--sage)" strokeWidth="1" strokeDasharray="2 1" opacity="0.6" />
                    <line x1={68} y1={55} x2={68} y2={70} stroke="var(--sage)" strokeWidth="1" strokeDasharray="2 1" opacity="0.6" />
                    <path
                      d="M 14 95 L 26 89 L 38 95 L 50 89 L 62 95 L 74 89 L 86 95 L 98 89 L 108 95"
                      fill="none"
                      stroke="var(--thread)"
                      strokeWidth="1.8"
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
              <li>Bishop dresses — elastic center field between cable borders</li>
              <li>Yokes — comfort stretch across the chest</li>
              <li>Sleeves — bands that flex with the arm</li>
              <li>Home decor — pillow inserts where give is decorative as well as useful</li>
            </ul>
            <p className="mt-4 text-sm text-ink-faint">
              See also:{" "}
              <Link href="/garments/" className="text-dusty-blue-deep">
                Garment construction
              </Link>
            </p>
          </section>

          <section id="theory" className="scroll-mt-24">
            <h2 className="font-serif text-3xl text-ink">Why honeycomb opens</h2>
            <p className="mt-3 text-ink-muted">
              Each bind locks two mountains at one height. Because the next bind locks a{" "}
              <em>shifted</em> pair at the other height, a diamond/hex of fabric between locks is
              free to widen when the garment stretches. Cable across the same area would lock
              every mountain in a continuous cord — no cells. The elasticity is geometric, not
              from elastic thread.
            </p>
            <div className="callout mt-4">
              <p className="text-sm text-ink-muted">
                Deeper fabric physics:{" "}
                <Link href="/theory/" className="text-dusty-blue-deep">
                  Smocking Theory
                </Link>
                . For flatter cells, see the{" "}
                <Link href="/stitches/surface-honeycomb/" className="text-dusty-blue-deep">
                  Surface Honeycomb
                </Link>{" "}
                chapter.
              </p>
            </div>
          </section>

          <section className="mt-16 rounded border border-border bg-cream-deep/30 p-6">
            <p className="label-caps mb-2">Sources &amp; verification</p>
            <p className="text-sm leading-relaxed text-ink-muted">
              Honeycomb mechanics here follow standard English smocking teaching: staggered
              pair-binds on adjacent gathering rows with intra-pleat travel between rows. Some
              manuals reverse whether you start on the upper or lower row — the stagger principle
              is the same. Cell shape varies with row spacing and fabric; “hexagon” is the
              characteristic reading, not a geometric guarantee. Uncertainty is marked rather than
              invented.
            </p>
          </section>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/stitches/wave-stitch/"
              className="rounded border border-border px-4 py-2 text-sm text-ink no-underline hover:bg-cream-deep"
            >
              ← Wave Stitch
            </Link>
            <Link
              href="/stitches/outline-stitch/"
              className="rounded border border-border px-4 py-2 text-sm text-ink no-underline hover:bg-cream-deep"
            >
              Outline →
            </Link>
            <Link
              href="/stitches/surface-honeycomb/"
              className="rounded border border-border px-4 py-2 text-sm text-ink no-underline hover:bg-cream-deep"
            >
              Surface Honeycomb →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
