"use client";

import { ILLUSTRATION, SvgRoot } from "./IllustrationFrame";

export interface PleatConfig {
  count?: number;
  startX?: number;
  y?: number;
  width?: number;
  height?: number;
  showLabels?: boolean;
  highlightPleat?: number | null;
  showNeedleNumbers?: boolean;
}

/**
 * Realistic accordion-style pleat fabric for English smocking diagrams.
 * Mountains = raised ridges; valleys = recessed grooves where the needle enters.
 * Pleats are numbered left→right as the smocker works (typically right-handed L→R).
 */
export function PleatFabric({
  count = 8,
  startX = 40,
  y = 80,
  width = 520,
  height = 140,
  showLabels = true,
  highlightPleat = null,
  showNeedleNumbers = false,
}: PleatConfig) {
  const pleatW = width / count;
  const mid = y + height / 2;

  const mountains: { i: number; x: number }[] = [];
  const valleys: { i: number; x: number }[] = [];

  for (let i = 0; i < count; i++) {
    const x = startX + i * pleatW + pleatW / 2;
    mountains.push({ i: i + 1, x });
    if (i < count - 1) {
      valleys.push({ i: i + 1, x: startX + (i + 1) * pleatW });
    }
  }

  // For each pleat: mountain peak in center, valleys at edges
  let dTop = "";
  let dBottom = "";
  const topCoords: { x: number; y: number }[] = [];
  const bottomCoords: { x: number; y: number }[] = [];

  for (let i = 0; i < count; i++) {
    const left = startX + i * pleatW;
    const midX = left + pleatW / 2;
    const right = left + pleatW;
    const valleyY = y + height * 0.58;
    const mountainY = y + height * 0.12;

    if (i === 0) {
      topCoords.push({ x: left, y: valleyY });
    }
    topCoords.push({ x: midX, y: mountainY });
    topCoords.push({ x: right, y: valleyY });
  }

  for (let i = 0; i < count; i++) {
    const left = startX + i * pleatW;
    const midX = left + pleatW / 2;
    const right = left + pleatW;
    const valleyY = y + height * 0.92;
    const mountainY = y + height * 0.72;

    if (i === 0) {
      bottomCoords.push({ x: left, y: valleyY });
    }
    bottomCoords.push({ x: midX, y: mountainY });
    bottomCoords.push({ x: right, y: valleyY });
  }

  dTop = topCoords.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  dBottom = bottomCoords
    .slice()
    .reverse()
    .map((p, i) => `${i === 0 ? "L" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const fabricPath = `${dTop} ${dBottom} Z`;

  return (
    <g>
      {/* Soft fabric body */}
      <path
        d={fabricPath}
        fill={ILLUSTRATION.fabric}
        stroke={ILLUSTRATION.fabricShadow}
        strokeWidth="1"
        filter="url(#soft-shadow)"
      />
      <path d={fabricPath} fill="url(#fabric-weave)" opacity="0.5" />

      {/* Individual pleat faces for depth */}
      {Array.from({ length: count }).map((_, i) => {
        const left = startX + i * pleatW;
        const midX = left + pleatW / 2;
        const right = left + pleatW;
        const highlighted = highlightPleat === i + 1;
        return (
          <g key={i}>
            {/* Left face (shadowed) */}
            <path
              d={`M ${left} ${y + height * 0.58}
                  L ${midX} ${y + height * 0.12}
                  L ${midX} ${y + height * 0.72}
                  L ${left} ${y + height * 0.92} Z`}
              fill={highlighted ? "rgba(107,138,158,0.25)" : ILLUSTRATION.fabricShadow}
              opacity={highlighted ? 0.9 : 0.45}
            />
            {/* Right face (lit) */}
            <path
              d={`M ${midX} ${y + height * 0.12}
                  L ${right} ${y + height * 0.58}
                  L ${right} ${y + height * 0.92}
                  L ${midX} ${y + height * 0.72} Z`}
              fill={highlighted ? "rgba(196,163,90,0.2)" : ILLUSTRATION.mountain}
              opacity={0.85}
            />
            {/* Mountain ridge line */}
            <line
              x1={midX}
              y1={y + height * 0.12}
              x2={midX}
              y2={y + height * 0.72}
              stroke={ILLUSTRATION.inkFaint}
              strokeWidth="0.6"
              opacity="0.5"
            />
          </g>
        );
      })}

      {/* Gathering row guideline */}
      <line
        x1={startX}
        y1={mid}
        x2={startX + width}
        y2={mid}
        stroke={ILLUSTRATION.dustyBlue}
        strokeWidth="1"
        strokeDasharray="4 3"
        opacity="0.55"
      />

      {showLabels && (
        <g fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          <text x={startX + width / 2} y={y - 8} textAnchor="middle" className="label">
            Gathering row
          </text>
          {mountains.map((m) => (
            <text key={`m-${m.i}`} x={m.x} y={y + height + 16} textAnchor="middle" fontSize="9">
              M{m.i}
            </text>
          ))}
          {valleys.slice(0, 6).map((v) => (
            <text
              key={`v-${v.i}`}
              x={v.x}
              y={y + height * 0.5 - 6}
              textAnchor="middle"
              fontSize="8"
              fill={ILLUSTRATION.burgundy}
            >
              V{v.i}
            </text>
          ))}
          <text x={startX - 8} y={y + height * 0.2} textAnchor="end" fontSize="8">
            Mountain
          </text>
          <text x={startX - 8} y={y + height * 0.55} textAnchor="end" fontSize="8" fill={ILLUSTRATION.burgundy}>
            Valley
          </text>
        </g>
      )}

      {showNeedleNumbers &&
        mountains.map((m) => (
          <text
            key={`n-${m.i}`}
            x={m.x}
            y={y - 4}
            textAnchor="middle"
            fontSize="9"
            fill={ILLUSTRATION.dustyBlue}
            fontFamily="var(--font-body), sans-serif"
          >
            {m.i}
          </text>
        ))}
    </g>
  );
}

export function PleatDiagramStandalone(props: PleatConfig) {
  return (
    <SvgRoot viewBox="0 0 600 260" aria-label="Pleat diagram showing mountains and valleys">
      <PleatFabric {...props} y={40} height={160} />
    </SvgRoot>
  );
}
