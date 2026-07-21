"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "@/components/illustrations/IllustrationFrame";
import { FlatFabric } from "@/components/illustrations/FlatFabric";
import { Needle, DirectionArrow } from "@/components/illustrations/Needle";

const CHAIN_LOOPS = [
  { x: 118, y: 148 },
  { x: 172, y: 148 },
  { x: 226, y: 148 },
  { x: 280, y: 148 },
  { x: 334, y: 148 },
  { x: 388, y: 148 },
  { x: 442, y: 148 },
] as const;

const CHAIN_STEPS = [
  {
    title: "Bring the thread up on the line",
    body: "Chain stitch begins with a loop. Bring the thread up on the line and hold the working thread in a relaxed curve.",
    pathStep: 1,
  },
  {
    title: "Return near the same hole",
    body: "Insert close to the starting hole, then bring the needle out ahead on the line. Keep the thread under the needle point.",
    pathStep: 1,
  },
  {
    title: "Draw a loop around the needle",
    body: "Pull until the loop settles around the next exit point. The loop should be oval, not a tight knot.",
    pathStep: 2,
  },
  {
    title: "Link the next loop",
    body: "Repeat through the end of the previous loop. Each new loop holds the last one in place.",
    pathStep: 4,
  },
  {
    title: "Anchor the final loop",
    body: "Finish with a small straight stitch over the final loop so the chain cannot pull open.",
    pathStep: 7,
  },
] as const;

function ChainGuide({ showLabels = true }: { showLabels?: boolean }) {
  return (
    <g>
      <line x1="88" y1="148" x2="484" y2="148" stroke={ILLUSTRATION.dustyBlue} strokeWidth="1.1" strokeDasharray="5 5" opacity="0.5" />
      {showLabels && (
        <text x="92" y="172" fontSize="10" fill={ILLUSTRATION.dustyBlue} fontFamily="var(--font-body), sans-serif">
          chain line
        </text>
      )}
    </g>
  );
}

function ChainLoop({
  x,
  y,
  color = ILLUSTRATION.thread,
  opacity = 1,
  strokeWidth = 3.3,
}: {
  x: number;
  y: number;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
}) {
  return (
    <path
      d={`M ${x - 22} ${y} C ${x - 18} ${y - 32}, ${x + 18} ${y - 32}, ${x + 22} ${y} C ${x + 16} ${
        y + 20
      }, ${x - 16} ${y + 20}, ${x - 22} ${y}`}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={opacity}
    />
  );
}

function ChainLine({
  count = CHAIN_LOOPS.length,
  active = -1,
  color = ILLUSTRATION.thread,
}: {
  count?: number;
  active?: number;
  color?: string;
}) {
  return (
    <g>
      {CHAIN_LOOPS.slice(0, count).map((loop, index) => (
        <ChainLoop
          key={loop.x}
          x={loop.x}
          y={loop.y}
          color={index === active ? ILLUSTRATION.gold : color}
          opacity={active === -1 || index === active ? 1 : 0.38}
          strokeWidth={index === active ? 4 : 3.2}
        />
      ))}
      {count >= CHAIN_LOOPS.length && (
        <line
          x1={CHAIN_LOOPS[CHAIN_LOOPS.length - 1].x + 20}
          y1={CHAIN_LOOPS[CHAIN_LOOPS.length - 1].y}
          x2={CHAIN_LOOPS[CHAIN_LOOPS.length - 1].x + 38}
          y2={CHAIN_LOOPS[CHAIN_LOOPS.length - 1].y}
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
      )}
    </g>
  );
}

export function FinishedChainStitchAppearance() {
  return (
    <IllustrationFrame caption="Finished chain stitch - linked loops form a flexible decorative line.">
      <SvgRoot viewBox="0 0 600 280" aria-label="Finished chain stitch on flat fabric">
        <FlatFabric x={48} y={34} width={504} height={210} />
        <ChainGuide />
        <ChainLine />
        <text x="300" y="264" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          Each loop catches the previous loop; a tiny final anchor secures the chain.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function ChainStitchNeedlePath({ showLabels = true, step = 4 }: { showLabels?: boolean; step?: number }) {
  const visible = Math.min(Math.max(step, 1), CHAIN_LOOPS.length);
  const activeIndex = visible - 1;
  const active = CHAIN_LOOPS[activeIndex];
  const next = CHAIN_LOOPS[Math.min(activeIndex + 1, CHAIN_LOOPS.length - 1)];

  return (
    <SvgRoot viewBox="0 0 600 285" aria-label="Chain stitch needle path">
      <FlatFabric x={48} y={34} width={504} height={214} />
      <ChainGuide showLabels={showLabels} />
      <ChainLine count={visible} active={activeIndex} />
      <path
        d={`M ${active.x - 22} ${active.y} C ${active.x - 38} ${active.y - 46}, ${active.x + 36} ${
          active.y - 48
        }, ${next.x - 22} ${next.y}`}
        fill="none"
        stroke={ILLUSTRATION.sage}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="5 3"
      />
      <DirectionArrow
        x1={active.x - 20}
        y1={active.y + 18}
        x2={active.x + 22}
        y2={active.y + 18}
        color={ILLUSTRATION.burgundy}
        label="loop held open"
      />
      <DirectionArrow
        x1={active.x + 22}
        y1={active.y}
        x2={next.x - 22}
        y2={next.y}
        color={ILLUSTRATION.dustyBlue}
        label="next exit"
      />
      <Needle x={next.x - 36} y={next.y - 32} angle={8} length={62} label="thread under point" />
      {showLabels && (
        <g fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          <text x="300" y="24" textAnchor="middle">
            Gold = active loop; keep the working thread under the needle to catch the loop.
          </text>
          <text x="300" y="268" textAnchor="middle">
            Step {visible}: form a loop, emerge inside it, then let the next loop hold it.
          </text>
        </g>
      )}
    </SvgRoot>
  );
}

export function ChainStitchConstructionAnimation() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = window.setInterval(() => {
      setStep((current) => {
        if (current >= CHAIN_STEPS.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 2400);

    return () => window.clearInterval(id);
  }, [playing, reduce]);

  const current = CHAIN_STEPS[step];

  return (
    <IllustrationFrame
      caption={`Step ${step + 1} of ${CHAIN_STEPS.length}: ${current.title}`}
      controls={
        <>
          <button
            type="button"
            className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep"
            onClick={() => setStep((value) => Math.max(0, value - 1))}
          >
            Previous
          </button>
          <button
            type="button"
            className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep"
            onClick={() => setStep((value) => Math.min(CHAIN_STEPS.length - 1, value + 1))}
          >
            Next
          </button>
          <button
            type="button"
            className="rounded border border-dusty-blue/40 bg-dusty-blue/10 px-3 py-1 text-xs text-dusty-blue-deep hover:bg-dusty-blue/20"
            onClick={() => {
              if (step >= CHAIN_STEPS.length - 1) setStep(0);
              setPlaying((value) => !value);
            }}
          >
            {playing ? "Pause" : "Play animation"}
          </button>
          <span className="text-xs text-ink-faint">
            {step + 1}/{CHAIN_STEPS.length}
          </span>
        </>
      }
    >
      <ChainStitchNeedlePath step={current.pathStep} showLabels={step > 0} />
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">{current.body}</p>
    </IllustrationFrame>
  );
}

function ChainTensionSample({
  x,
  title,
  kind,
}: {
  x: number;
  title: string;
  kind: "loose" | "balanced" | "tight" | "uneven";
}) {
  return (
    <g transform={`translate(${x} 18)`}>
      <text x="70" y="0" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
        {title}
      </text>
      <rect x="0" y="16" width="140" height="108" rx="6" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
      <line x1="16" y1="70" x2="124" y2="70" stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 3" opacity="0.35" />
      {[0, 1, 2].map((i) => {
        const rx = kind === "loose" ? 28 : kind === "tight" ? 13 : kind === "uneven" && i === 1 ? 28 : 20;
        const lift = kind === "tight" ? -16 : -26;
        const cx = 38 + i * 32;
        const color = kind === "balanced" ? ILLUSTRATION.thread : ILLUSTRATION.burgundy;
        return (
          <path
            key={i}
            d={`M ${cx - rx} 70 C ${cx - rx + 4} ${70 + lift}, ${cx + rx - 4} ${
              70 + lift
            }, ${cx + rx} 70 C ${cx + rx - 5} 88, ${cx - rx + 5} 88, ${cx - rx} 70`}
            fill="none"
            stroke={color}
            strokeWidth={kind === "tight" ? 4.4 : 3}
            strokeLinecap="round"
          />
        );
      })}
      {kind === "tight" && <path d="M 20 102 C 50 88, 88 88, 118 102" fill="none" stroke={ILLUSTRATION.burgundy} strokeDasharray="4 3" opacity="0.5" />}
    </g>
  );
}

export function ChainStitchTensionDiagram() {
  return (
    <IllustrationFrame caption="Chain stitch tension - loops should be even, linked, and open enough to read as chain.">
      <SvgRoot viewBox="0 0 640 165" aria-label="Chain stitch tension examples">
        <ChainTensionSample x={0} title="Too loose" kind="loose" />
        <ChainTensionSample x={160} title="Balanced" kind="balanced" />
        <ChainTensionSample x={320} title="Too tight" kind="tight" />
        <ChainTensionSample x={480} title="Uneven" kind="uneven" />
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function ChainStitchMistakeDiagrams() {
  const mistakes = [
    { title: "Loop not caught", note: "The chain opens because the needle missed the loop.", kind: "miss" },
    { title: "Loops pulled tight", note: "The line becomes knots instead of links.", kind: "tight" },
    { title: "Uneven loop size", note: "Irregular ovals make the border look restless.", kind: "uneven" },
    { title: "No final anchor", note: "The last loop can pull open during wear.", kind: "anchor" },
  ] as const;

  return (
    <IllustrationFrame caption="Common chain stitch mistakes - secure each loop, keep size even, and anchor the end.">
      <div className="grid gap-4 sm:grid-cols-2">
        {mistakes.map((mistake) => (
          <div key={mistake.title} className="rounded border border-border bg-cream/50 p-3">
            <SvgRoot viewBox="0 0 220 120" aria-label={mistake.title} className="max-w-full">
              <rect x="10" y="12" width="200" height="82" rx="5" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
              <line x1="24" y1="58" x2="196" y2="58" stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 3" opacity="0.35" />
              {mistake.kind === "miss" && (
                <>
                  <path d="M 42 58 C 48 28, 82 28, 88 58 C 82 74, 48 74, 42 58" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3" />
                  <path d="M 98 36 C 128 26, 156 70, 188 44" fill="none" stroke={ILLUSTRATION.burgundy} strokeDasharray="4 3" strokeWidth="2" />
                </>
              )}
              {mistake.kind === "tight" &&
                [52, 92, 132, 172].map((x) => (
                  <ellipse key={x} cx={x} cy="58" rx="9" ry="14" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3.6" />
                ))}
              {mistake.kind === "uneven" &&
                [
                  { x: 48, rx: 22 },
                  { x: 94, rx: 12 },
                  { x: 132, rx: 28 },
                  { x: 180, rx: 16 },
                ].map((loop) => (
                  <path key={loop.x} d={`M ${loop.x - loop.rx} 58 C ${loop.x - loop.rx + 4} 28, ${loop.x + loop.rx - 4} 28, ${loop.x + loop.rx} 58 C ${loop.x + loop.rx - 5} 74, ${loop.x - loop.rx + 5} 74, ${loop.x - loop.rx} 58`} fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3" />
                ))}
              {mistake.kind === "anchor" && (
                <>
                  {[52, 96, 140].map((x) => (
                    <path key={x} d={`M ${x - 18} 58 C ${x - 16} 30, ${x + 16} 30, ${x + 18} 58 C ${x + 14} 74, ${x - 14} 74, ${x - 18} 58`} fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3" />
                  ))}
                  <path d="M 160 58 C 182 32, 202 84, 184 88" fill="none" stroke={ILLUSTRATION.burgundy} strokeDasharray="4 3" />
                </>
              )}
            </SvgRoot>
            <p className="mt-1 font-serif text-base text-ink">{mistake.title}</p>
            <p className="text-sm text-ink-muted">{mistake.note}</p>
          </div>
        ))}
      </div>
    </IllustrationFrame>
  );
}

export function ChainStitchWithSmockingDiagram() {
  return (
    <IllustrationFrame caption="With smocking - chain stitch makes flexible flat outlines, flower stems, and borders beside smocked texture.">
      <SvgRoot viewBox="0 0 620 230" aria-label="Chain stitch used with smocking">
        <FlatFabric x={24} y={28} width={572} height={160} />
        {[58, 86, 114, 142, 170, 198, 226].map((x) => (
          <path key={x} d={`M ${x} 48 C ${x + 7} 82, ${x + 7} 122, ${x} 158`} fill="none" stroke={ILLUSTRATION.fabricShadow} strokeWidth="4" strokeLinecap="round" opacity="0.5" />
        ))}
        <path d="M 60 82 L 88 98 L 116 82 L 144 98 L 172 82 L 200 98 L 228 82" fill="none" stroke={ILLUSTRATION.threadAlt} strokeWidth="2.4" strokeLinecap="round" />
        <g transform="translate(240 -10)">
          <ChainLine color={ILLUSTRATION.sage} />
        </g>
        <text x="144" y="206" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          smocked panel
        </text>
        <text x="430" y="206" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          chain line on flat fabric
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function ChainStitchTheoryDiagram() {
  return (
    <IllustrationFrame caption="Why chain stitch works - each loop is held by the next loop, and the final straight stitch locks the sequence.">
      <SvgRoot viewBox="0 0 620 245" aria-label="Chain stitch theory diagram">
        <FlatFabric x={38} y={28} width={544} height={150} />
        <ChainGuide />
        <ChainLine color={ILLUSTRATION.gold} />
        <DirectionArrow x1={142} y1={120} x2={176} y2={120} color={ILLUSTRATION.burgundy} label="next loop holds previous" />
        <DirectionArrow x1={458} y1={148} x2={484} y2={148} color={ILLUSTRATION.dustyBlue} label="anchor" />
        <rect x="92" y="194" width="436" height="28" rx="14" fill="var(--cream)" stroke={ILLUSTRATION.creamDeeper} />
        <text x="310" y="213" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          Chain stitch is secure when every loop is caught and the last loop is anchored.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}
