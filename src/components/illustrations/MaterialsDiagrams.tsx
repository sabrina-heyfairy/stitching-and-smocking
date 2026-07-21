"use client";

import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "@/components/illustrations/IllustrationFrame";

export function ThreadComparisonDiagram() {
  const samples = [
    { label: "Floche", twists: 2, thick: 3.2, color: ILLUSTRATION.burgundySoft },
    { label: "Perle #8", twists: 5, thick: 3.6, color: ILLUSTRATION.dustyBlue },
    { label: "2-strand", twists: 1, thick: 2.4, color: ILLUSTRATION.sage },
    { label: "Silk", twists: 3, thick: 2.2, color: ILLUSTRATION.gold },
  ];

  return (
    <IllustrationFrame caption="Relative look on a mountain — soft floche vs round perle vs fine stranded/silk">
      <SvgRoot viewBox="0 0 600 160" aria-label="Thread type comparison">
        {samples.map((s, i) => {
          const x = 40 + i * 145;
          return (
            <g key={s.label} transform={`translate(${x}, 20)`}>
              <text
                x={50}
                y={14}
                textAnchor="middle"
                fontSize="12"
                fill={ILLUSTRATION.ink}
                fontFamily="var(--font-display), serif"
              >
                {s.label}
              </text>
              <path
                d="M 10 40 L 30 70 L 50 40 L 70 70 L 90 40 L 90 120 L 70 90 L 50 120 L 30 90 L 10 120 Z"
                fill={ILLUSTRATION.fabric}
                stroke={ILLUSTRATION.fabricShadow}
              />
              <path
                d={`M 15 80 Q 30 ${80 - s.thick * 2} 50 80 Q 70 ${80 + s.thick * 2} 85 80`}
                fill="none"
                stroke={s.color}
                strokeWidth={s.thick}
                strokeLinecap="round"
              />
              {Array.from({ length: s.twists }).map((_, t) => (
                <line
                  key={t}
                  x1={25 + t * 12}
                  y1={72}
                  x2={32 + t * 12}
                  y2={88}
                  stroke={s.color}
                  strokeWidth="0.8"
                  opacity="0.5"
                />
              ))}
            </g>
          );
        })}
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function GatheringVsSmockingThread() {
  return (
    <IllustrationFrame caption="Two jobs, two threads — gathering for the pleater, smocking for the stitches">
      <SvgRoot viewBox="0 0 600 150" aria-label="Gathering thread versus smocking thread">
        <rect x={30} y={30} width={240} height={90} rx={4} fill={ILLUSTRATION.paper} stroke={ILLUSTRATION.border} />
        <text x={150} y={55} textAnchor="middle" fontSize="13" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Gathering thread
        </text>
        <text x={150} y={78} textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          Strong · smooth · temporary
        </text>
        <text x={150} y={98} textAnchor="middle" fontSize="9" fill={ILLUSTRATION.inkFaint} fontFamily="var(--font-body), sans-serif">
          Through Read 16 needle eyes
        </text>

        <rect x={330} y={30} width={240} height={90} rx={4} fill={ILLUSTRATION.paper} stroke={ILLUSTRATION.border} />
        <text x={450} y={55} textAnchor="middle" fontSize="13" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Smocking thread
        </text>
        <text x={450} y={78} textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          Chosen for hand &amp; color
        </text>
        <text x={450} y={98} textAnchor="middle" fontSize="9" fill={ILLUSTRATION.inkFaint} fontFamily="var(--font-body), sans-serif">
          Floche · perle · stranded · silk
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function NeedleComparisonDiagram() {
  const needles = [
    { label: "Milliner", len: 90, eye: 7, note: "Long shaft" },
    { label: "Crewel", len: 70, eye: 9, note: "Long eye" },
    { label: "Chenille", len: 58, eye: 11, note: "Large eye" },
    { label: "Sharp", len: 62, eye: 5, note: "Utility" },
  ];

  return (
    <IllustrationFrame caption="Needle silhouettes — milliners for pleat work; crewel/chenille when the eye must spare thicker thread">
      <SvgRoot viewBox="0 0 600 160" aria-label="Needle type comparison">
        {needles.map((n, i) => {
          const x = 50 + i * 140;
          const y = 40;
          return (
            <g key={n.label} transform={`translate(${x}, ${y})`}>
              <text
                x={40}
                y={0}
                textAnchor="middle"
                fontSize="12"
                fill={ILLUSTRATION.ink}
                fontFamily="var(--font-display), serif"
              >
                {n.label}
              </text>
              <ellipse
                cx={12}
                cy={40}
                rx={n.eye / 2}
                ry={3}
                fill="none"
                stroke={ILLUSTRATION.needle}
                strokeWidth="2"
              />
              <rect
                x={12 + n.eye / 2}
                y={37.5}
                width={n.len - 20}
                height={5}
                rx={1.5}
                fill="url(#needle-grad)"
              />
              <polygon
                points={`${12 + n.eye / 2 + n.len - 20},40 ${12 + n.eye / 2 + n.len - 32},36.5 ${12 + n.eye / 2 + n.len - 32},43.5`}
                fill={ILLUSTRATION.needle}
              />
              <text
                x={40}
                y={85}
                textAnchor="middle"
                fontSize="9"
                fill={ILLUSTRATION.inkMuted}
                fontFamily="var(--font-body), sans-serif"
              >
                {n.note}
              </text>
            </g>
          );
        })}
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function NeedleDepthDiagram() {
  return (
    <IllustrationFrame caption="Always the top third of the mountain — too deep flattens pleats">
      <SvgRoot viewBox="0 0 600 160" aria-label="Needle bite depth on a pleat">
        {[0, 1, 2].map((i) => {
          const x = 60 + i * 180;
          const labels = ["Too shallow", "Ideal (⅓)", "Too deep"];
          const bite = [18, 36, 58][i];
          const color = [ILLUSTRATION.gold, ILLUSTRATION.sage, ILLUSTRATION.burgundy][i];
          return (
            <g key={i} transform={`translate(${x}, 20)`}>
              <text
                x={60}
                y={10}
                textAnchor="middle"
                fontSize="11"
                fill={ILLUSTRATION.ink}
                fontFamily="var(--font-display), serif"
              >
                {labels[i]}
              </text>
              <path
                d="M 20 40 L 60 20 L 100 40 L 100 120 L 60 100 L 20 120 Z"
                fill={ILLUSTRATION.fabric}
                stroke={ILLUSTRATION.fabricShadow}
              />
              <line
                x1={35}
                y1={40 + bite * 0.35}
                x2={85}
                y2={40 + bite * 0.35}
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                x1={60}
                y1={25}
                x2={60}
                y2={25 + bite}
                stroke={color}
                strokeWidth="1"
                strokeDasharray="2 2"
                opacity="0.7"
              />
            </g>
          );
        })}
      </SvgRoot>
    </IllustrationFrame>
  );
}
