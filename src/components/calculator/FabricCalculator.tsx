"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  FABRIC_PRESETS,
  FULLNESS_PRESETS,
  READ16,
  SIZE_PRESETS,
  calculateFabric,
  cmToIn,
  displayLength,
  inToCm,
  ratioFormula,
  type Unit,
} from "@/lib/fabric-calculator";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-ink">{label}</span>
      {children}
      {hint && <span className="text-xs text-ink-faint">{hint}</span>}
    </label>
  );
}

const inputClass =
  "rounded border border-border bg-cream px-3 py-2 text-sm text-ink outline-none focus:border-dusty-blue";

export function FabricCalculator() {
  const [unit, setUnit] = useState<Unit>("in");
  const [sizeId, setSizeId] = useState("3t-yoke");
  const [fabricId, setFabricId] = useState("lawn");
  const [fullnessId, setFullnessId] = useState("standard");

  const sizePreset = SIZE_PRESETS.find((s) => s.id === sizeId) ?? SIZE_PRESETS[3];
  const fabricPreset = FABRIC_PRESETS.find((f) => f.id === fabricId) ?? FABRIC_PRESETS[1];
  const fullnessPreset = FULLNESS_PRESETS.find((f) => f.id === fullnessId) ?? FULLNESS_PRESETS[1];

  const [finishedWidth, setFinishedWidth] = useState(sizePreset.finishedWidthIn);
  const [customRatio, setCustomRatio] = useState(3);
  const [safetyExtra, setSafetyExtra] = useState(2);
  const [flatMargin, setFlatMargin] = useState(0);
  const [needlesUsed, setNeedlesUsed] = useState(8);
  const [needleSpacing, setNeedleSpacing] = useState(READ16.defaultNeedleSpacingIn);
  const [depthMargin, setDepthMargin] = useState(0.5);

  const baseRatio = fabricId === "custom" ? customRatio : fabricPreset.ratio;

  const result = useMemo(
    () =>
      calculateFabric({
        finishedWidthIn: finishedWidth,
        baseRatio,
        fullnessFactor: fullnessPreset.factor,
        safetyExtraIn: safetyExtra,
        flatMarginEachSideIn: flatMargin,
        needlesUsed,
        needleSpacingIn: needleSpacing,
        depthMarginEachSideIn: depthMargin,
      }),
    [
      finishedWidth,
      baseRatio,
      fullnessPreset.factor,
      safetyExtra,
      flatMargin,
      needlesUsed,
      needleSpacing,
      depthMargin,
    ],
  );

  const show = (inches: number, digits = 2) => displayLength(inches, unit, digits);

  const setFinishedFromDisplay = (raw: string) => {
    const n = Number.parseFloat(raw);
    if (Number.isNaN(n) || n < 0) return;
    setFinishedWidth(unit === "cm" ? cmToIn(n) : n);
  };

  const finishedDisplay = unit === "cm" ? inToCm(finishedWidth) : finishedWidth;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-5 rounded border border-border bg-paper/80 p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-serif text-2xl text-ink">Inputs</h2>
          <div className="flex rounded border border-border text-xs">
            <button
              type="button"
              className={`px-3 py-1.5 ${unit === "in" ? "bg-cream-deep text-ink" : "text-ink-muted"}`}
              onClick={() => setUnit("in")}
            >
              Inches
            </button>
            <button
              type="button"
              className={`px-3 py-1.5 ${unit === "cm" ? "bg-cream-deep text-ink" : "text-ink-muted"}`}
              onClick={() => setUnit("cm")}
            >
              Centimetres
            </button>
          </div>
        </div>

        <Field
          label="Garment / size starting point"
          hint="Presets are approximate teaching widths — always prefer your pattern’s finished measurement."
        >
          <select
            className={inputClass}
            value={sizeId}
            onChange={(e) => {
              const id = e.target.value;
              setSizeId(id);
              const preset = SIZE_PRESETS.find((s) => s.id === id);
              if (preset && id !== "custom-size") setFinishedWidth(preset.finishedWidthIn);
            }}
          >
            {SIZE_PRESETS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label={`Finished smocked width (${unit})`}
          hint="How wide the smocked piece should be after you pull the gathers — e.g. across the chest band."
        >
          <input
            type="number"
            min={0}
            step={0.25}
            className={inputClass}
            value={Number(finishedDisplay.toFixed(2))}
            onChange={(e) => setFinishedFromDisplay(e.target.value)}
          />
        </Field>

        <Field label="Fabric" hint={fabricPreset.note}>
          <select
            className={inputClass}
            value={fabricId}
            onChange={(e) => setFabricId(e.target.value)}
          >
            {FABRIC_PRESETS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label} (~{f.ratio}:1)
              </option>
            ))}
          </select>
        </Field>

        {fabricId === "custom" && (
          <Field label="Custom ratio (fabric ÷ finished)" hint="From your sample: flat length ÷ pulled width.">
            <input
              type="number"
              min={1}
              step={0.1}
              className={inputClass}
              value={customRatio}
              onChange={(e) => setCustomRatio(Number(e.target.value) || 3)}
            />
          </Field>
        )}

        <Field label="Fullness preference" hint={fullnessPreset.note}>
          <select
            className={inputClass}
            value={fullnessId}
            onChange={(e) => setFullnessId(e.target.value)}
          >
            {FULLNESS_PRESETS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label={`Safety extra to pleat (${unit})`}
            hint="Added to the pleated length so you can trim after pulling up. Safer than cutting short."
          >
            <input
              type="number"
              min={0}
              step={0.5}
              className={inputClass}
              value={Number((unit === "cm" ? inToCm(safetyExtra) : safetyExtra).toFixed(2))}
              onChange={(e) => {
                const n = Number(e.target.value);
                if (Number.isNaN(n) || n < 0) return;
                setSafetyExtra(unit === "cm" ? cmToIn(n) : n);
              }}
            />
          </Field>
          <Field
            label={`Unpleated margin each side (${unit})`}
            hint="Flat fabric beyond the pleated area (rare for full-strip pleating)."
          >
            <input
              type="number"
              min={0}
              step={0.25}
              className={inputClass}
              value={Number((unit === "cm" ? inToCm(flatMargin) : flatMargin).toFixed(2))}
              onChange={(e) => {
                const n = Number(e.target.value);
                if (Number.isNaN(n) || n < 0) return;
                setFlatMargin(unit === "cm" ? cmToIn(n) : n);
              }}
            />
          </Field>
        </div>

        <hr className="border-border" />

        <h3 className="font-serif text-xl text-ink">Read 16 depth (across the needles)</h3>
        <p className="text-xs text-ink-faint">{READ16.needleSpacingNote}</p>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Needles / gathering rows" hint={`Max ${READ16.needleCount} on a Read 16`}>
            <input
              type="number"
              min={2}
              max={READ16.needleCount}
              step={1}
              className={inputClass}
              value={needlesUsed}
              onChange={(e) => setNeedlesUsed(Number(e.target.value) || 2)}
            />
          </Field>
          <Field label={`Needle spacing (${unit})`} hint="Tip-to-tip on your needle bar">
            <input
              type="number"
              min={0.05}
              step={0.01}
              className={inputClass}
              value={Number((unit === "cm" ? inToCm(needleSpacing) : needleSpacing).toFixed(3))}
              onChange={(e) => {
                const n = Number(e.target.value);
                if (Number.isNaN(n) || n <= 0) return;
                setNeedleSpacing(unit === "cm" ? cmToIn(n) : n);
              }}
            />
          </Field>
          <Field label={`Depth margin each side (${unit})`} hint="Beyond outer needles for seams/handling">
            <input
              type="number"
              min={0}
              step={0.125}
              className={inputClass}
              value={Number((unit === "cm" ? inToCm(depthMargin) : depthMargin).toFixed(3))}
              onChange={(e) => {
                const n = Number(e.target.value);
                if (Number.isNaN(n) || n < 0) return;
                setDepthMargin(unit === "cm" ? cmToIn(n) : n);
              }}
            />
          </Field>
        </div>
      </div>

      <div className="space-y-5">
        <div className="rounded border border-burgundy/25 bg-burgundy/5 p-5 md:p-6">
          <p className="label-caps text-burgundy">Cut / pleat this length</p>
          <p className="mt-2 font-serif text-4xl text-ink md:text-5xl">{show(result.cutLengthIn)}</p>
          <p className="mt-2 text-sm text-ink-muted">
            Feed about <strong className="text-ink">{show(result.fabricLengthIn)}</strong> through
            the Read 16 for the gathered field (at {result.effectiveRatio.toFixed(2)}:1), plus your
            safety/margins.
          </p>
          <p className="mt-3 text-xs text-ink-faint">{ratioFormula(unit)}</p>
        </div>

        <div className="rounded border border-border bg-paper/80 p-5">
          <h3 className="font-serif text-xl text-ink">Strip depth (needle bar)</h3>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-ink-muted">Smocked band depth</dt>
              <dd className="font-medium text-ink">{show(result.smockedDepthIn, 3)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-muted">Cut strip depth</dt>
              <dd className="font-medium text-ink">{show(result.cutDepthIn, 3)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-muted">Needles used</dt>
              <dd className="font-medium text-ink">
                {Math.min(READ16.needleCount, Math.max(2, Math.round(needlesUsed)))} /{" "}
                {READ16.needleCount}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-muted">Approx. pleats in length</dt>
              <dd className="font-medium text-ink">
                ~{Math.round(result.approxPleatsInFinished)}
              </dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-ink-faint">
            Depth = (needles − 1) × spacing. Measure your bar if your casting differs from ~3/16&quot;.
          </p>
        </div>

        <div className="rounded border border-border bg-paper/60 p-5 text-sm text-ink-muted">
          <p className="font-medium text-ink">How to use the answer</p>
          <ol className="mt-2 list-decimal space-y-1.5 pl-4">
            <li>
              Cut a rectangle about <strong className="text-ink">{show(result.cutLengthIn)}</strong>{" "}
              long × <strong className="text-ink">{show(result.cutDepthIn, 3)}</strong> deep (plus
              pattern seam allowances if not included above).
            </li>
            <li>
              Thread {Math.min(READ16.needleCount, Math.max(2, Math.round(needlesUsed)))} needles on
              your Read 16 and pleat the length through the rollers.
            </li>
            <li>
              Pull gathering threads until the pleated piece measures{" "}
              <strong className="text-ink">{show(finishedWidth)}</strong> finished width.
            </li>
            <li>Trim excess only after you like the pleat density.</li>
          </ol>
        </div>

        {result.warnings.length > 0 && (
          <div className="callout-warn callout">
            <ul className="space-y-1 text-sm text-ink-muted">
              {result.warnings.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="callout-tip callout">
          <p className="text-sm text-ink-muted">
            <strong className="text-ink">Sample first:</strong> Pleat a 10&quot; test strip, pull to
            one-third (or your target ratio), and measure. Enter that as a custom ratio. See{" "}
            <Link href="/pleater/#pleating" className="text-dusty-blue-deep">
              pleating
            </Link>{" "}
            and{" "}
            <Link href="/design/" className="text-dusty-blue-deep">
              design planning
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
