"use client";

import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "./IllustrationFrame";
import { PleatFabric } from "./PleatFabric";
import { wavePoints } from "./WaveStitch";

function WaveMini({
  label,
  amplitude,
  cycle,
  color,
}: {
  label: string;
  amplitude: number;
  cycle: number;
  color: string;
}) {
  const count = cycle * 2;
  const pleatW = 22;
  const lowerY = 70;
  const upperY = 70 - amplitude;
  const points = Array.from({ length: count }, (_, i) => {
    const pos = i % cycle;
    const half = cycle / 2;
    let y: number;
    if (pos < half) {
      y = lowerY + (upperY - lowerY) * (pos / half);
    } else {
      y = upperY + (lowerY - upperY) * ((pos - half) / half);
    }
    return { x: 16 + i * pleatW, y };
  });
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <g>
      <text x={100} y={14} textAnchor="middle" fontSize="11" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
        {label}
      </text>
      {Array.from({ length: count }).map((_, i) => {
        const x = 16 + i * pleatW;
        return (
          <path
            key={i}
            d={`M ${x} 35 L ${x + pleatW / 2} 28 L ${x + pleatW} 35 L ${x + pleatW} 95 L ${x + pleatW / 2} 88 L ${x} 95 Z`}
            fill={ILLUSTRATION.fabric}
            stroke={ILLUSTRATION.fabricShadow}
            strokeWidth="0.5"
            opacity="0.85"
          />
        );
      })}
      <path d={d} fill="none" stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

export function WaveTensionDiagram() {
  return (
    <IllustrationFrame caption="Wave tension — amplitude and slope suffer when stitches are too tight or too loose">
      <SvgRoot viewBox="0 0 640 140" aria-label="Wave stitch tension examples">
        <g transform="translate(0,10)">
          <WaveMini label="Too loose" amplitude={18} cycle={8} color={ILLUSTRATION.burgundySoft} />
        </g>
        <g transform="translate(160,10)">
          <WaveMini label="Ideal" amplitude={28} cycle={8} color={ILLUSTRATION.threadAlt} />
        </g>
        <g transform="translate(320,10)">
          <WaveMini label="Too tight" amplitude={12} cycle={8} color={ILLUSTRATION.burgundy} />
        </g>
        <g transform="translate(480,10)">
          <WaveMini label="Uneven steps" amplitude={28} cycle={8} color={ILLUSTRATION.gold} />
        </g>
        {/* Scribble uneven for last panel - overlay jagged */}
        <path
          d="M 496 80 L 510 55 L 528 78 L 545 48 L 565 82 L 585 60 L 605 85"
          fill="none"
          stroke={ILLUSTRATION.burgundy}
          strokeWidth="2"
          opacity="0.5"
          strokeDasharray="3 2"
        />
      </SvgRoot>
      <ul className="mx-auto mt-4 grid max-w-2xl gap-2 text-sm text-ink-muted sm:grid-cols-2">
        <li>
          <strong className="text-ink">Too loose:</strong> Wave sags; peaks miss the upper row; pattern looks stringy.
        </li>
        <li>
          <strong className="text-ink">Ideal:</strong> Peaks kiss the upper row; troughs sit on the lower; slope is smooth.
        </li>
        <li>
          <strong className="text-ink">Too tight:</strong> Amplitude collapses; fabric cups; rows bow toward each other.
        </li>
        <li>
          <strong className="text-ink">Uneven steps:</strong> Some stitches jump height — the chevron looks broken.
        </li>
      </ul>
    </IllustrationFrame>
  );
}

export function WaveMistakeDiagrams() {
  const mistakes = [
    {
      title: "Skipped vertical step",
      desc: "Jumping straight from lower to upper in one stitch flattens the slope into a spike.",
      draw: "spike" as const,
    },
    {
      title: "Uneven wave count",
      desc: "3 stitches up and 5 down shifts every peak — the repeat no longer centers.",
      draw: "uneven" as const,
    },
    {
      title: "Cable on one row by mistake",
      desc: "Forgetting to change height produces a cable, not a wave. Restart the ascent.",
      draw: "flat" as const,
    },
    {
      title: "Mirrored mid-wave",
      desc: "Changing direction before the peak (or trough) creates a stutter instead of a smooth crest.",
      draw: "stutter" as const,
    },
  ];

  return (
    <IllustrationFrame caption="Common wave mistakes — catch them within the first half-cycle">
      <div className="grid gap-4 sm:grid-cols-2">
        {mistakes.map((m) => (
          <div key={m.title} className="rounded border border-border bg-cream/50 p-3">
            <SvgRoot viewBox="0 0 220 110" aria-label={m.title} className="max-w-full">
              <PleatFabric count={6} startX={10} y={15} width={200} height={75} showLabels={false} />
              <line x1={10} y1={40} x2={210} y2={40} stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 2" strokeWidth="0.8" opacity="0.5" />
              <line x1={10} y1={70} x2={210} y2={70} stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 2" strokeWidth="0.8" opacity="0.5" />
              {m.draw === "spike" && (
                <path d="M 30 70 L 60 68 L 95 38 L 130 70 L 165 68 L 195 70" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.8" strokeLinecap="round" />
              )}
              {m.draw === "uneven" && (
                <path d="M 30 70 L 50 55 L 70 42 L 90 40 L 110 48 L 130 58 L 150 68 L 170 70 L 195 55" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.8" strokeLinecap="round" />
              )}
              {m.draw === "flat" && (
                <path d="M 30 70 L 60 62 L 95 70 L 130 62 L 165 70 L 195 62" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.8" strokeLinecap="round" />
              )}
              {m.draw === "stutter" && (
                <path d="M 30 70 L 55 55 L 75 48 L 90 58 L 110 45 L 135 40 L 160 55 L 185 70" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.8" strokeLinecap="round" />
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

export function WaveVariations() {
  const variants = [
    { name: "Wave of 2 (baby wave)", note: "2 up, 2 down — tight ripple between close rows" },
    { name: "Wave of 4 (standard)", note: "Most common teaching wave; clear peaks and troughs" },
    { name: "Wave of 6+", note: "Longer slopes; needs wider row spacing and calm tension" },
    { name: "Double wave", note: "Two parallel waves on stacked row pairs" },
    { name: "Offset / half-drop", note: "Start the next row’s wave shifted by half a cycle" },
    { name: "Toward trellis", note: "Mirror a second wave to form diamonds — see Trellis chapter" },
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

export function WaveToTrellisPreview() {
  const startX = 40;
  const width = 520;
  const count = 16;
  const pleatW = width / count;
  const mid = 150;
  const amp = 35;
  const upper = wavePoints(count, startX, pleatW, mid + amp, mid - amp);
  // Mirror wave: invert so peaks meet troughs → diamonds
  const lower = upper.map((p) => ({
    x: p.x,
    y: mid * 2 - p.y,
  }));

  return (
    <IllustrationFrame caption="Preview: a wave plus its mirror begins to read as trellis diamonds (full Trellis chapter is next).">
      <SvgRoot viewBox="0 0 600 280" aria-label="Paired waves forming early trellis diamonds">
        <PleatFabric count={count} startX={startX} y={55} width={width} height={160} showLabels={false} />
        <path
          d={upper.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")}
          fill="none"
          stroke={ILLUSTRATION.threadAlt}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={lower.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")}
          fill="none"
          stroke={ILLUSTRATION.thread}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
      </SvgRoot>
    </IllustrationFrame>
  );
}
