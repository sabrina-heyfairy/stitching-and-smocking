"use client";

import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "@/components/illustrations/IllustrationFrame";

function SmockBand({
  x,
  y,
  w,
  rows = 3,
  color = ILLUSTRATION.thread,
}: {
  x: number;
  y: number;
  w: number;
  rows?: number;
  color?: string;
}) {
  return (
    <g>
      {Array.from({ length: rows }).map((_, i) => (
        <path
          key={i}
          d={`M ${x} ${y + i * 8} ${Array.from({ length: 9 })
            .map((_, j) => {
              const px = x + (j + 1) * (w / 10);
              const py = y + i * 8 + (j % 2 === 0 ? -3 : 3);
              return `L ${px} ${py}`;
            })
            .join(" ")}`}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </g>
  );
}

export function BishopConstructionDiagram() {
  return (
    <IllustrationFrame caption="Bishop dress — pleat a wide rectangle, smock the chest band, then bind the neck and set sleeves">
      <SvgRoot viewBox="0 0 600 280" aria-label="Bishop dress construction stages">
        {/* Stage 1 flat */}
        <text x={90} y={24} textAnchor="middle" fontSize="11" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          1. Pleat panel
        </text>
        <rect x={20} y={40} width={140} height={100} fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={i}
            x1={32 + i * 12}
            y1={45}
            x2={32 + i * 12}
            y2={135}
            stroke={ILLUSTRATION.fabricShadow}
            strokeWidth="2"
            opacity="0.5"
          />
        ))}

        {/* Stage 2 smocked */}
        <text x={300} y={24} textAnchor="middle" fontSize="11" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          2. Smock chest
        </text>
        <path
          d="M 230 50 L 370 50 L 355 140 L 245 140 Z"
          fill={ILLUSTRATION.fabric}
          stroke={ILLUSTRATION.fabricShadow}
        />
        <SmockBand x={250} y={70} w={100} rows={4} color={ILLUSTRATION.burgundy} />
        <text x={300} y={160} textAnchor="middle" fontSize="8" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          Compresses to neck width
        </text>

        {/* Stage 3 dress */}
        <text x={500} y={24} textAnchor="middle" fontSize="11" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          3. Assemble
        </text>
        <path
          d="M 455 55 Q 500 48 545 55 L 560 220 L 500 200 L 440 220 Z"
          fill={ILLUSTRATION.fabric}
          stroke={ILLUSTRATION.fabricShadow}
        />
        <SmockBand x={468} y={62} w={64} rows={3} color={ILLUSTRATION.burgundy} />
        <ellipse cx={478} cy={100} rx={18} ry={28} fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
        <ellipse cx={522} cy={100} rx={18} ry={28} fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
        <path d="M 470 55 Q 500 42 530 55" fill="none" stroke={ILLUSTRATION.inkMuted} strokeWidth="2" />

        <text x={300} y={250} textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          Embroider on the flat area above the smocking before setting the neck binding when possible.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function YokeInsertDiagram() {
  return (
    <IllustrationFrame caption="Smocked yoke insert — match compressed pleat width to the bodice opening">
      <SvgRoot viewBox="0 0 600 240" aria-label="Yoke insert construction">
        <text x={140} y={28} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Bodice with opening
        </text>
        <path
          d="M 40 50 L 240 50 L 240 200 L 40 200 Z"
          fill={ILLUSTRATION.fabric}
          stroke={ILLUSTRATION.fabricShadow}
        />
        <rect x={90} y={60} width={100} height={70} fill={ILLUSTRATION.paper} stroke={ILLUSTRATION.dustyBlue} strokeDasharray="4 3" />
        <text x={140} y={100} textAnchor="middle" fontSize="9" fill={ILLUSTRATION.dustyBlue} fontFamily="var(--font-body), sans-serif">
          yoke opening
        </text>

        <text x={420} y={28} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Smocked insert set in
        </text>
        <path
          d="M 320 50 L 520 50 L 520 200 L 320 200 Z"
          fill={ILLUSTRATION.fabric}
          stroke={ILLUSTRATION.fabricShadow}
        />
        <rect x={370} y={60} width={100} height={70} fill={ILLUSTRATION.mountain} stroke={ILLUSTRATION.fabricShadow} />
        <SmockBand x={380} y={72} w={80} rows={3} color={ILLUSTRATION.dustyBlue} />
        <SmockBand x={380} y={100} w={80} rows={1} color={ILLUSTRATION.burgundy} />
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function BonnetDiagram() {
  return (
    <IllustrationFrame caption="Bonnet — horizontal smocking on brim or crown; keep tension soft for head curve">
      <SvgRoot viewBox="0 0 600 220" aria-label="Bonnet smocking placement">
        <path
          d="M 120 160 Q 120 50 300 45 Q 480 50 480 160 Q 400 190 300 195 Q 200 190 120 160"
          fill={ILLUSTRATION.fabric}
          stroke={ILLUSTRATION.fabricShadow}
        />
        <SmockBand x={180} y={90} w={240} rows={3} color={ILLUSTRATION.sage} />
        <path
          d="M 200 160 Q 300 175 400 160"
          fill="none"
          stroke={ILLUSTRATION.inkFaint}
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <text x={300} y={40} textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          Smocked band follows the brim curve
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function SleeveBandDiagram() {
  return (
    <IllustrationFrame caption="Sleeve / cuff band — short smocked strip controls fullness into armseye or cuff">
      <SvgRoot viewBox="0 0 600 200" aria-label="Sleeve smocking band">
        <path
          d="M 80 40 L 280 55 L 270 170 L 90 155 Z"
          fill={ILLUSTRATION.fabric}
          stroke={ILLUSTRATION.fabricShadow}
        />
        <SmockBand x={130} y={90} w={100} rows={3} color={ILLUSTRATION.teal} />
        <text x={180} y={30} textAnchor="middle" fontSize="11" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Sleeve with smocked band
        </text>

        <rect x={360} y={60} width={180} height={90} fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1={372 + i * 14}
            y1={65}
            x2={372 + i * 14}
            y2={145}
            stroke={ILLUSTRATION.fabricShadow}
            strokeWidth="1.5"
            opacity="0.45"
          />
        ))}
        <SmockBand x={380} y={95} w={140} rows={2} color={ILLUSTRATION.burgundy} />
        <text x={450} y={40} textAnchor="middle" fontSize="11" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Flat strip before setting
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function AssemblyOrderDiagram() {
  const steps = [
    "Cut & mark panel",
    "Pleat on Read 16",
    "Smock the plate",
    "Embroider flat areas",
    "Remove gathers*",
    "Set into garment",
  ];
  return (
    <IllustrationFrame caption="*Remove temporary gathering threads after smocking unless your pattern keeps them">
      <SvgRoot viewBox="0 0 600 120" aria-label="Garment assembly order">
        {steps.map((s, i) => {
          const x = 20 + i * 95;
          return (
            <g key={s}>
              <rect
                x={x}
                y={30}
                width={85}
                height={50}
                rx={4}
                fill={ILLUSTRATION.paper}
                stroke={i === 2 || i === 3 ? ILLUSTRATION.burgundy : ILLUSTRATION.border}
              />
              <text
                x={x + 42}
                y={52}
                textAnchor="middle"
                fontSize="9"
                fill={ILLUSTRATION.ink}
                fontFamily="var(--font-body), sans-serif"
              >
                {i + 1}.
              </text>
              <text
                x={x + 42}
                y={66}
                textAnchor="middle"
                fontSize="8"
                fill={ILLUSTRATION.inkMuted}
                fontFamily="var(--font-body), sans-serif"
              >
                {s}
              </text>
              {i < steps.length - 1 && (
                <path
                  d={`M ${x + 86} 55 L ${x + 94} 55`}
                  stroke={ILLUSTRATION.dustyBlue}
                  strokeWidth="1.5"
                />
              )}
            </g>
          );
        })}
      </SvgRoot>
    </IllustrationFrame>
  );
}
