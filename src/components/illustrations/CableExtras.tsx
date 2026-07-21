"use client";

import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "./IllustrationFrame";
import { PleatFabric } from "./PleatFabric";

function TensionSample({
  label,
  gap,
  strokeWidth,
  flatten,
  x,
}: {
  label: string;
  gap: number;
  strokeWidth: number;
  flatten: number;
  x: number;
}) {
  const count = 5;
  const pleatW = 36;
  const midY = 70;
  const points = Array.from({ length: count })
    .map((_, i) => {
      const px = 10 + i * (pleatW + gap);
      const py = i % 2 === 0 ? midY - 8 : midY + 8;
      return `${i === 0 ? "M" : "L"} ${px} ${py}`;
    })
    .join(" ");

  return (
    <g transform={`translate(${x}, 20)`}>
      <text x={90} y={0} textAnchor="middle" fontSize="11" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
        {label}
      </text>
      {/* Simplified pleats with flatten factor */}
      {Array.from({ length: count }).map((_, i) => {
        const left = 10 + i * (pleatW + gap);
        const h = 50 - flatten * 20;
        return (
          <path
            key={i}
            d={`M ${left} ${40 + flatten * 15}
                L ${left + pleatW / 2} ${40 - h / 2}
                L ${left + pleatW} ${40 + flatten * 15}
                L ${left + pleatW} ${90}
                L ${left + pleatW / 2} ${80 - flatten * 10}
                L ${left} ${90} Z`}
            fill={ILLUSTRATION.fabric}
            stroke={ILLUSTRATION.fabricShadow}
            strokeWidth="0.8"
          />
        );
      })}
      <path
        d={points}
        fill="none"
        stroke={ILLUSTRATION.thread}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

export function TensionDiagram() {
  return (
    <IllustrationFrame caption="Thread tension comparison — same cable stitch, four outcomes">
      <SvgRoot viewBox="0 0 640 160" aria-label="Cable stitch tension examples">
        <TensionSample label="Too loose" gap={8} strokeWidth={2.2} flatten={0} x={0} />
        <TensionSample label="Ideal" gap={2} strokeWidth={3} flatten={0.15} x={160} />
        <TensionSample label="Too tight" gap={0} strokeWidth={3.5} flatten={0.7} x={320} />
        <TensionSample label="Uneven" gap={5} strokeWidth={2.8} flatten={0.35} x={480} />
      </SvgRoot>
      <ul className="mx-auto mt-4 grid max-w-2xl gap-2 text-sm text-ink-muted sm:grid-cols-2">
        <li>
          <strong className="text-ink">Too loose:</strong> Gaps between stitches; cable looks stringy; pleats drift.
        </li>
        <li>
          <strong className="text-ink">Ideal:</strong> Cord sits snug on mountains; pleats remain round and even.
        </li>
        <li>
          <strong className="text-ink">Too tight:</strong> Mountains flatten; fabric cups; gathering rows distort.
        </li>
        <li>
          <strong className="text-ink">Uneven:</strong> Mix of loose and tight — the most common beginner issue.
        </li>
      </ul>
    </IllustrationFrame>
  );
}

export function MistakeDiagrams() {
  const mistakes = [
    {
      title: "Twisted cable",
      desc: "Needle always on the same side of the thread → stem stitch look, not a braid.",
    },
    {
      title: "Skipped pleat",
      desc: "Jumping a mountain leaves a gap and shifts the pattern repeat.",
    },
    {
      title: "Deep bite",
      desc: "Needle takes more than the top third — pulls valleys closed and flattens work.",
    },
    {
      title: "Crossed thread",
      desc: "Working thread wraps the wrong way between stitches; cable looks knotted.",
    },
  ];

  return (
    <IllustrationFrame caption="Common cable mistakes — recognize them early">
      <div className="grid gap-4 sm:grid-cols-2">
        {mistakes.map((m, idx) => (
          <div key={m.title} className="rounded border border-border bg-cream/50 p-3">
            <SvgRoot viewBox="0 0 220 100" aria-label={m.title} className="max-w-full">
              <PleatFabric count={5} startX={15} y={15} width={190} height={70} showLabels={false} />
              {idx === 0 && (
                // All stitches on one side = twisted
                <path
                  d="M 34 45 L 72 42 L 110 40 L 148 42 L 186 45"
                  fill="none"
                  stroke={ILLUSTRATION.burgundy}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              )}
              {idx === 1 && (
                <path
                  d="M 34 55 L 72 45 M 110 55 L 148 45 L 186 55"
                  fill="none"
                  stroke={ILLUSTRATION.burgundy}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              )}
              {idx === 2 && (
                <>
                  <path
                    d="M 34 60 L 72 70 L 110 60 L 148 70 L 186 60"
                    fill="none"
                    stroke={ILLUSTRATION.burgundy}
                    strokeWidth="3"
                  />
                  <text x={110} y={95} textAnchor="middle" fontSize="8" fill={ILLUSTRATION.burgundy}>
                    too deep
                  </text>
                </>
              )}
              {idx === 3 && (
                <path
                  d="M 34 55 C 50 30, 55 70, 72 45 C 90 20, 95 75, 110 55 C 130 30, 135 70, 148 45"
                  fill="none"
                  stroke={ILLUSTRATION.burgundy}
                  strokeWidth="2.5"
                />
              )}
            </SvgRoot>
            <p className="mt-1 font-serif text-base text-ink">{m.title}</p>
            <p className="text-sm text-ink-muted">{m.desc}</p>
          </div>
        ))}
      </div>
    </IllustrationFrame>
  );
}

export function CableVariations() {
  const variants = [
    { name: "Standard", note: "1 gathering row; #8 perle or 2–3 floche" },
    { name: "Wide / double", note: "Two parallel cables on adjacent rows" },
    { name: "Narrow", note: "Finer thread (#12 perle); denser look" },
    { name: "Offset", note: "Start one pleat off for mirror borders" },
    { name: "Two-color", note: "Alternate thread colors every few stitches" },
    { name: "Cable + wave", note: "Cable borders framing a wave or trellis field" },
  ];

  return (
    <div className="my-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {variants.map((v) => (
        <div key={v.name} className="rounded border border-border bg-paper px-4 py-3">
          <p className="font-serif text-lg text-ink">{v.name}</p>
          <p className="mt-1 text-sm text-ink-muted">{v.note}</p>
        </div>
      ))}
    </div>
  );
}
