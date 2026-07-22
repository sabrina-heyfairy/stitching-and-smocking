"use client";

import { ChangeEvent, DragEvent, useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import {
  type PlateAnalysis,
  isPlateAnalysis,
  validatePlateImage,
} from "@/lib/plate-analyzer";

const analyzerUrl = process.env.NEXT_PUBLIC_PLATE_ANALYZER_URL ?? "";
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

async function prepareImage(file: File): Promise<string> {
  const source = await createImageBitmap(file);
  const maxSide = 2400;
  const scale = Math.min(1, maxSide / Math.max(source.width, source.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(source.width * scale));
  canvas.height = Math.max(1, Math.round(source.height * scale));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Your browser could not prepare this image.");
  context.drawImage(source, 0, 0, canvas.width, canvas.height);
  source.close();
  return canvas.toDataURL("image/jpeg", 0.9);
}

export function PlatePhotoAnalyzer() {
  const inputRef = useRef<HTMLInputElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [result, setResult] = useState<PlateAnalysis | null>(null);

  const renderTurnstile = useCallback(() => {
    if (!turnstileSiteKey || !turnstileRef.current || !window.turnstile || widgetIdRef.current) return;
    widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: turnstileSiteKey,
      callback: setTurnstileToken,
      "expired-callback": () => setTurnstileToken(""),
      theme: "auto",
    });
  }, []);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (file) renderTurnstile();
  }, [file, renderTurnstile]);

  function chooseFile(nextFile?: File) {
    setError("");
    setResult(null);
    if (!nextFile) return;
    const problem = validatePlateImage(nextFile);
    if (problem) {
      setFile(null);
      setPreview("");
      setError(problem);
      return;
    }
    setFile(nextFile);
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    chooseFile(event.dataTransfer.files[0]);
  }

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    chooseFile(event.target.files?.[0]);
  }

  async function analyze() {
    if (!file) return;
    if (!analyzerUrl) {
      setError("The analyzer is not connected yet. The site owner needs to add the Worker URL.");
      return;
    }
    if (!turnstileSiteKey || !turnstileToken) {
      setError("Complete the quick security check before analyzing the plate.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const image = await prepareImage(file);
      const response = await fetch(analyzerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, notes: notes.trim().slice(0, 500), turnstileToken }),
      });
      const body = (await response.json()) as { analysis?: unknown; error?: string };
      if (!response.ok) throw new Error(body.error || "The plate could not be analyzed.");
      if (!isPlateAnalysis(body.analysis)) throw new Error("The analyzer returned an incomplete result. Please try again.");
      setResult(body.analysis);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The plate could not be analyzed.");
    } finally {
      setLoading(false);
      setTurnstileToken("");
      if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current);
    }
  }

  return (
    <div className="grid gap-8">
      {turnstileSiteKey && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onLoad={renderTurnstile} />}
      <section className="rounded-xl border border-border bg-paper p-5 shadow-sm md:p-7">
        <div
          className="grid min-h-64 cursor-pointer place-items-center rounded-lg border-2 border-dashed border-cream-deeper bg-cream/50 p-5 text-center transition hover:border-dusty-blue"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={onDrop}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") inputRef.current?.click();
          }}
          aria-label="Choose a smocking plate image"
        >
          {preview ? (
            // This preview is a local object URL and is never part of the static export.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Smocking plate ready to analyze" className="max-h-[32rem] w-auto rounded object-contain" />
          ) : (
            <div className="max-w-md">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-dusty-blue/10 text-2xl text-dusty-blue-deep" aria-hidden="true">↑</span>
              <h2 className="mt-4 font-serif text-2xl text-ink">Add a clear picture of your plate</h2>
              <p className="mt-2 text-sm leading-6 text-ink-muted">Tap to choose a photo, or drag it here. Crop out the phone screen and keep row numbers, arrows, and the full repeat visible.</p>
              <p className="mt-3 text-xs text-ink-faint">JPG, PNG, or WebP · up to 10 MB</p>
            </div>
          )}
        </div>
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={onFileChange} />

        {file && (
          <div className="mt-5 grid gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <span className="min-w-0 truncate text-ink-muted">{file.name}</span>
              <button type="button" className="rounded border border-border px-3 py-2 text-ink hover:bg-cream-deep" onClick={() => inputRef.current?.click()}>Choose a different image</button>
            </div>
            <label className="grid gap-2 text-sm font-semibold text-ink">
              Anything you already know? <span className="font-normal text-ink-faint">Optional</span>
              <textarea value={notes} onChange={(event) => setNotes(event.target.value)} maxLength={500} rows={3} className="rounded border border-border bg-cream px-3 py-2 font-normal text-ink" placeholder="For example: I think the repeat begins at pleat 6, or this is for a 24-inch bishop neckline." />
            </label>
            <div ref={turnstileRef} className="min-h-[65px]" aria-label="Security check" />
            <button type="button" disabled={loading} onClick={analyze} className="min-h-12 rounded bg-burgundy px-5 py-3 font-semibold text-white transition hover:bg-burgundy-soft disabled:cursor-wait disabled:opacity-60">
              {loading ? "Reading rows, pleats, and stitch paths…" : "Explain this plate step by step"}
            </button>
          </div>
        )}

        {error && <p className="mt-4 rounded border-l-4 border-burgundy bg-burgundy/5 p-4 text-sm text-ink" role="alert">{error}</p>}
        <p className="mt-4 text-xs leading-5 text-ink-faint">Your image is sent securely for analysis and is not added to the public plate library. AI can misread tiny symbols or counts—verify the highlighted uncertainties before cutting fabric.</p>
      </section>

      {result && <AnalysisResult result={result} />}
    </div>
  );
}

function AnalysisResult({ result }: { result: PlateAnalysis }) {
  if (!result.isSmockingPlate) {
    return <section className="rounded-xl border border-gold bg-paper p-6"><h2 className="font-serif text-2xl text-ink">This may not be a readable smocking plate</h2><p className="mt-2 leading-7 text-ink-muted">{result.overview}</p><Uncertainties items={result.uncertainties} /></section>;
  }
  return (
    <article className="grid gap-6" aria-live="polite">
      <header className="rounded-xl border border-border bg-paper p-6 md:p-8">
        <p className="label-caps text-dusty-blue">Your plate walkthrough · {result.confidence} confidence</p>
        <h2 className="mt-2 font-serif text-3xl text-ink md:text-4xl">{result.title}</h2>
        <p className="mt-3 max-w-3xl leading-7 text-ink-muted">{result.overview}</p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Fact label="Pleating rows" value={result.rowsToPleat ?? "Check plate"} />
          <Fact label="Working rows" value={result.workingRows.join(", ") || "Check plate"} />
          <Fact label="Pleats per repeat" value={result.repeatPleats ?? "Check plate"} />
          <Fact label="Minimum pleats" value={result.minimumPleats ?? "Depends on garment"} />
        </dl>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <ResultSection eyebrow="Before you stitch" title="Prepare and mark">
          <ol className="grid gap-3">{result.preparation.map((item, index) => <li key={`${index}-${item}`} className="flex gap-3 text-sm leading-6 text-ink-muted"><Number value={index + 1} /><span>{item}</span></li>)}</ol>
          <p className="mt-5 rounded bg-cream p-4 text-sm leading-6 text-ink"><strong>Starting point:</strong> {result.startingPoint}</p>
        </ResultSection>
        <ResultSection eyebrow="Stitch key" title="Stitches you will need">
          <div className="grid gap-3">{result.stitches.map((stitch) => <div key={`${stitch.name}-${stitch.rows}`} className="rounded border border-border bg-cream/50 p-3"><h4 className="font-semibold text-ink">{stitch.name} <span className="font-normal text-ink-faint">· {stitch.rows}</span></h4><p className="mt-1 text-sm leading-6 text-ink-muted">{stitch.purpose}</p></div>)}</div>
        </ResultSection>
      </section>

      <ResultSection eyebrow="Work in this order" title="Step-by-step stitch sequence">
        <ol className="grid gap-4">{result.steps.map((step) => <li key={`${step.number}-${step.instruction}`} className="rounded-lg border border-border bg-cream/40 p-4 md:p-5"><div className="flex gap-4"><Number value={step.number} /><div><p className="text-xs font-semibold tracking-wider text-burgundy uppercase">{step.row} · {step.stitch} · {step.direction}</p><p className="mt-2 leading-7 text-ink">{step.instruction}</p><p className="mt-2 text-sm leading-6 text-ink-muted"><strong>Checkpoint:</strong> {step.checkpoint}</p></div></div></li>)}</ol>
      </ResultSection>

      <section className="grid gap-6 lg:grid-cols-2">
        <ResultSection eyebrow="Do not lose your place" title="Tracking tips"><ul className="grid list-disc gap-2 pl-5 text-sm leading-6 text-ink-muted">{result.trackingTips.map((tip) => <li key={tip}>{tip}</li>)}</ul></ResultSection>
        <ResultSection eyebrow="Verify on the original" title="Uncertainties"><Uncertainties items={result.uncertainties} /></ResultSection>
      </section>
    </article>
  );
}

function Fact({ label, value }: { label: string; value: string | number }) { return <div className="rounded-lg bg-cream p-4"><dt className="text-xs font-semibold tracking-wider text-ink-faint uppercase">{label}</dt><dd className="mt-1 font-serif text-2xl text-ink">{value}</dd></div>; }
function Number({ value }: { value: number }) { return <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-burgundy text-sm font-semibold text-white">{value}</span>; }
function ResultSection({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) { return <section className="rounded-xl border border-border bg-paper p-6"><p className="label-caps text-dusty-blue">{eyebrow}</p><h3 className="mt-1 mb-5 font-serif text-2xl text-ink">{title}</h3>{children}</section>; }
function Uncertainties({ items }: { items: string[] }) { return items.length ? <ul className="grid list-disc gap-2 pl-5 text-sm leading-6 text-ink-muted">{items.map((item) => <li key={item}>{item}</li>)}</ul> : <p className="text-sm leading-6 text-ink-muted">No major uncertainties were detected. Still count the repeat once on the original plate before stitching.</p>; }
