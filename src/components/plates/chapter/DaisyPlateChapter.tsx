"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { clampSequenceStep, daisyPlate, type DaisyLayer } from "@/lib/smocking-plate-chapters";

const COLORS = { pink: "#cf4774", deepPink: "#a9345d", green: "#57724a", gold: "#d5a62e", ink: "#3d3832", grid: "#c9bca8", fabric: "#f4dfcf" };

function Section({ number, title, id, children, printClass = "" }: { number: number; title: string; id: string; children: React.ReactNode; printClass?: string }) {
  return (
    <section id={id} className={`daisy-section scroll-mt-24 ${printClass}`}>
      <div className="daisy-section-heading">
        <span aria-hidden="true">{number}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function DaisyFlower({ cx, cy, scale = 1, faded = false }: { cx: number; cy: number; scale?: number; faded?: boolean }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`} opacity={faded ? 0.26 : 1}>
      {Array.from({ length: 10 }, (_, index) => (
        <ellipse key={index} rx="5" ry="21" transform={`rotate(${index * 36}) translate(0 -18)`} fill="#fff7ee" stroke={COLORS.pink} strokeWidth="2" />
      ))}
      <circle r="8" fill={COLORS.gold} stroke="#9b7012" strokeWidth="1.5" />
    </g>
  );
}

function Trellis({ offset = 0, opacity = 1 }: { offset?: number; opacity?: number }) {
  return (
    <g transform={`translate(${offset} 0)`} opacity={opacity} fill="none" stroke={COLORS.green} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 156 L22 128 L44 156 L66 128 L88 156 L110 128 L132 156 L154 128 L176 156" />
      <path d="M0 168 L22 140 L44 168 L66 140 L88 168 L110 140 L132 168 L154 140 L176 168" />
      <path d="M0 180 L22 152 L44 180 L66 152 L88 180 L110 152 L132 180 L154 152 L176 180" />
    </g>
  );
}

function FabricDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-fabric`} x1="0" x2="1">
        <stop offset="0" stopColor="#d8b8a4" />
        <stop offset="0.45" stopColor="#fff2e8" />
        <stop offset="0.55" stopColor="#f6d7c4" />
        <stop offset="1" stopColor="#c9a38f" />
      </linearGradient>
      <filter id={`${id}-shadow`}><feDropShadow dx="0" dy="2" stdDeviation="1.5" floodOpacity=".2" /></filter>
    </defs>
  );
}

function Pleats({ id, count = 32, height = 210 }: { id: string; count?: number; height?: number }) {
  const width = 16;
  return (
    <g>
      {Array.from({ length: count }, (_, index) => (
        <path key={index} d={`M${index * width} 0 Q${index * width + width / 2} 12 ${index * width + width} 0 V${height} Q${index * width + width / 2} ${height - 12} ${index * width} ${height}Z`} fill={`url(#${id}-fabric)`} opacity={index % 2 ? .92 : 1} />
      ))}
    </g>
  );
}

function FinishedSample({ overlay = false }: { overlay?: boolean }) {
  const id = useId().replace(/:/g, "");
  return (
    <figure>
      <div className="daisy-diagram-scroll">
        <svg viewBox="0 0 720 235" role="img" aria-label={overlay ? "Finished Daisy smocking rendering with three flower boundaries outlined" : "Instructional rendering of a repeating Daisy smocking band above green trellis leaves"}>
          <FabricDefs id={id} />
          <rect width="720" height="235" rx="14" fill={COLORS.fabric} />
          <Pleats id={id} count={45} height={235} />
          <g filter={`url(#${id}-shadow)`}>
            {Array.from({ length: 8 }, (_, index) => <DaisyFlower key={index} cx={48 + index * 90} cy={82} scale={.72} />)}
            {Array.from({ length: 5 }, (_, index) => <Trellis key={index} offset={index * 176 - 22} />)}
          </g>
          {overlay && Array.from({ length: 3 }, (_, index) => (
            <g key={index}>
              <circle cx={138 + index * 180} cy="82" r="50" fill="none" stroke="#fff" strokeWidth="7" />
              <circle cx={138 + index * 180} cy="82" r="50" fill="none" stroke={COLORS.deepPink} strokeWidth="2.5" strokeDasharray="6 5" />
            </g>
          ))}
        </svg>
      </div>
      <figcaption>{overlay ? "Dashed circles identify the negative-space flower area; adjacent daisies share stitched side boundaries." : "Instructional rendering—not a photograph. The pink framework reads as petals around open flower spaces; the green trellis forms the lower leaf band."}</figcaption>
    </figure>
  );
}

function PleatedGrid() {
  const id = useId().replace(/:/g, "");
  return (
    <figure>
      <div className="daisy-diagram-scroll">
        <svg viewBox="0 0 760 330" role="img" aria-label="Pleated fabric grid with gathering rows one through eight and one eight-pleat repeat highlighted">
          <FabricDefs id={id} />
          <rect width="760" height="330" rx="14" fill="#f9eee5" />
          <g transform="translate(70 38)"><Pleats id={id} count={38} height={248} /></g>
          {Array.from({ length: 8 }, (_, row) => {
            const y = 58 + row * 29;
            return <g key={row}><line x1="70" y1={y} x2="678" y2={y} stroke={COLORS.grid} strokeDasharray="3 5" /><text x="49" y={y + 5} textAnchor="end" fontSize="14" fill={COLORS.ink}>Row {row + 1}</text></g>;
          })}
          <rect x="246" y="44" width="128" height="238" rx="10" fill="none" stroke={COLORS.deepPink} strokeWidth="3" strokeDasharray="8 6" />
          <rect x="70" y="44" width="176" height="238" fill="#fff" opacity=".43" />
          <rect x="374" y="44" width="304" height="238" fill="#fff" opacity=".43" />
          <path d="M246 29 V44 M374 29 V44 M246 30 H374" stroke={COLORS.deepPink} strokeWidth="2" />
          <text x="310" y="22" textAnchor="middle" fill={COLORS.deepPink} fontWeight="700">ONE TEACHING REPEAT · 8 PLEATS</text>
          <circle cx="254" cy="296" r="7" fill={COLORS.deepPink} /><text x="254" y="318" textAnchor="middle" fontSize="12">start</text>
          <circle cx="374" cy="296" r="7" fill={COLORS.green} /><text x="374" y="318" textAnchor="middle" fontSize="12">shared end / next start</text>
        </svg>
      </div>
      <figcaption>This is the front view after pleating. Gathering threads hold the rows; no pleater needles remain in the fabric. Adjacent repeats are faded to keep one repeat readable.</figcaption>
    </figure>
  );
}

function StitchDiagram({ layers, activeRow, showRepeat, zoom, currentStep }: { layers: Record<DaisyLayer, boolean>; activeRow: number | null; showRepeat: boolean; zoom: number; currentStep?: number }) {
  const markerId = useId().replace(/:/g, "");
  const steps = daisyPlate.stitchSequence;
  const maxStep = currentStep === undefined ? steps.length - 1 : currentStep;
  const x = (pleat: number) => 58 + pleat * 58;
  const y = (row: number) => 30 + row * 38;
  return (
    <div className="daisy-diagram-scroll" style={{ "--diagram-zoom": zoom } as React.CSSProperties}>
      <svg className="daisy-zoomable" viewBox="0 0 700 365" role="img" aria-label="Needle path diagram for one Daisy repeat with cable, daisy framework, and trellis layers">
        <defs>
          <marker id={`${markerId}-pink`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill={COLORS.deepPink} /></marker>
          <marker id={`${markerId}-green`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill={COLORS.green} /></marker>
        </defs>
        <rect width="700" height="365" rx="12" fill="#fffaf4" />
        {Array.from({ length: 8 }, (_, row) => <g key={row} opacity={activeRow && activeRow !== row + 1 ? .22 : 1}><line x1="82" y1={y(row + 1)} x2="650" y2={y(row + 1)} stroke={COLORS.grid} /><text x="67" y={y(row + 1) + 5} textAnchor="end" fontSize="13">R{row + 1}</text></g>)}
        {Array.from({ length: 10 }, (_, pleat) => <g key={pleat}><circle cx={x(pleat + 1)} cy={y(1)} r="3.5" fill={COLORS.ink} /><text x={x(pleat + 1)} y="22" textAnchor="middle" fontSize="11">P{pleat + 1}</text>{Array.from({ length: 7 }, (_, row) => <circle key={row} cx={x(pleat + 1)} cy={y(row + 2)} r="3.5" fill={COLORS.ink} />)}</g>)}
        {showRepeat && <rect x={x(1) - 22} y="25" width={x(9) - x(1) + 44} height="330" rx="10" fill="none" stroke={COLORS.gold} strokeWidth="3" strokeDasharray="8 6" />}
        {layers.border && <g opacity={activeRow && activeRow > 2 ? .18 : 1} fill="none" stroke={COLORS.pink} strokeWidth="3" markerEnd={`url(#${markerId}-pink)`}><path d={`M${x(1)} ${y(1)} ${Array.from({ length: 8 }, (_, i) => `Q${x(i + 1) + 29} ${y(1) - (i % 2 ? -7 : 7)} ${x(i + 2)} ${y(1)}`).join(" ")}`} /><path d={`M${x(1)} ${y(2)} ${Array.from({ length: 8 }, (_, i) => `Q${x(i + 1) + 29} ${y(2) + (i % 2 ? -7 : 7)} ${x(i + 2)} ${y(2)}`).join(" ")}`} /></g>}
        {layers.daisy && <g fill="none" stroke={COLORS.deepPink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">{steps.slice(0, maxStep + 1).map((step) => <g key={step.id} opacity={activeRow && activeRow !== step.from[1] && activeRow !== step.to[1] ? .18 : 1}><path d={`M${x(step.from[0])} ${y(step.from[1])} L${x(step.to[0])} ${y(step.to[1])}`} markerEnd={`url(#${markerId}-pink)`} /><circle cx={x(step.to[0])} cy={y(step.to[1])} r="10" fill="#fff" stroke={COLORS.deepPink} /><text x={x(step.to[0])} y={y(step.to[1]) + 4} textAnchor="middle" fontSize="10" fill={COLORS.deepPink} stroke="none" fontWeight="700">{step.id}</text></g>)}</g>}
        {layers.trellis && <g opacity={activeRow && activeRow < 5 ? .18 : 1} fill="none" stroke={COLORS.green} strokeWidth="3" markerEnd={`url(#${markerId}-green)`}><path d={`M${x(1)} ${y(5)} L${x(2)} ${y(8)} L${x(3)} ${y(5)} L${x(4)} ${y(8)} L${x(5)} ${y(5)} L${x(6)} ${y(8)} L${x(7)} ${y(5)} L${x(8)} ${y(8)} L${x(9)} ${y(5)}`} /><path d={`M${x(1)} ${y(5.45)} L${x(2)} ${y(7.55)} L${x(3)} ${y(5.45)} L${x(4)} ${y(7.55)} L${x(5)} ${y(5.45)} L${x(6)} ${y(7.55)} L${x(7)} ${y(5.45)} L${x(8)} ${y(7.55)} L${x(9)} ${y(5.45)}`} opacity=".65" /></g>}
      </svg>
    </div>
  );
}

function Legend() {
  return <ul className="daisy-legend" aria-label="Stitch diagram legend"><li><span style={{ background: COLORS.pink }} />Cable border</li><li><span style={{ background: COLORS.deepPink }} />Daisy framework / down and up cables</li><li><span style={{ background: COLORS.green }} />Trellis</li><li><i>●</i>Pleat and needle position</li><li><b>→</b>Travel direction</li></ul>;
}

function RepeatBand() {
  return (
    <figure>
      <div className="daisy-diagram-scroll"><svg viewBox="0 0 900 220" role="img" aria-label="Five continuous Daisy repeats with shared boundaries marked">
        <rect width="900" height="220" rx="12" fill="#f7e7dc" />
        {Array.from({ length: 5 }, (_, repeat) => <g key={repeat} transform={`translate(${repeat * 176 + 10} 0)`}><DaisyFlower cx={88} cy={72} scale={.62} /><Trellis /></g>)}
        {Array.from({ length: 6 }, (_, boundary) => <g key={boundary}><line x1={10 + boundary * 176} y1="18" x2={10 + boundary * 176} y2="190" stroke={boundary === 5 ? COLORS.green : COLORS.deepPink} strokeDasharray="5 5" /><text x={10 + boundary * 176} y="210" textAnchor={boundary === 5 ? "end" : "start"} fontSize="12" fill={COLORS.ink}>{boundary < 5 ? `Repeat ${boundary + 1}` : "next start"}</text></g>)}
      </svg></div>
      <figcaption>Five repeats share their boundary pleats. The working thread continues across the full row; it is not cut between motifs.</figcaption>
    </figure>
  );
}

function SequenceGuide() {
  const [step, setStep] = useState(0);
  const current = daisyPlate.stitchSequence[step];
  const layers = { border: false, daisy: true, trellis: false };
  return (
    <div className="daisy-sequence" aria-live="polite">
      <StitchDiagram layers={layers} activeRow={current.row} showRepeat={true} zoom={1} currentStep={step} />
      <div className="daisy-step-copy">
        <p className="label-caps">Step {current.id} of {daisyPlate.stitchSequence.length}</p>
        <h3>{current.stitch} · Row {current.row}, pleat {current.pleat}</h3>
        <p>{current.instruction}</p>
        <dl><div><dt>Current needle</dt><dd>R{current.row} / P{current.pleat}</dd></div><div><dt>Movement</dt><dd>{current.direction}</dd></div><div><dt>Next insertion</dt><dd>R{current.to[1]} / P{current.to[0]}</dd></div></dl>
      </div>
      <div className="stitch-controls daisy-button-row no-print">
        <button type="button" onClick={() => setStep((value) => clampSequenceStep(value - 1, daisyPlate.stitchSequence.length))} disabled={step === 0}>Previous step</button>
        <button type="button" onClick={() => setStep((value) => clampSequenceStep(value + 1, daisyPlate.stitchSequence.length))} disabled={step === daisyPlate.stitchSequence.length - 1}>Next step</button>
        <button type="button" onClick={() => setStep(0)}>Restart sequence</button>
      </div>
    </div>
  );
}

function MistakeSketch({ type }: { type: string }) {
  const tight = type === "tight";
  const skipped = type === "skipped";
  return <svg viewBox="0 0 180 76" role="img" aria-label={`Diagram showing ${type} mistake`}><rect width="180" height="76" rx="8" fill="#f6e4d8" />{Array.from({ length: 10 }, (_, index) => <line key={index} x1={12 + index * 17} y1="8" x2={12 + index * 17} y2="68" stroke="#c59e89" strokeWidth="6" opacity={skipped && index === 5 ? .12 : .55} />)}<path d={tight ? "M12 42 L42 16 L70 42 L98 16 L126 42 L156 16" : "M12 52 L42 22 L70 52 L98 22 L126 52 L156 22"} fill="none" stroke={type === "trellis" ? COLORS.green : COLORS.deepPink} strokeWidth={tight ? 6 : 3} /><text x="164" y="18" textAnchor="middle" fill="#b4233d" fontWeight="700">×</text></svg>;
}

function GarmentMockup({ index, name }: { index: number; name: string }) {
  const paths = ["M30 28 Q75 4 120 28 L140 142 H10Z", "M18 24 H132 L145 142 H5Z", "M42 22 H108 L135 142 H15Z", "M25 20 H125 L142 118 Q110 150 75 126 Q40 150 8 118Z"];
  return <figure><svg viewBox="0 0 150 155" role="img" aria-label={`${name} placement diagram`}><path d={paths[index]} fill="#f1ddd2" stroke="#bba999" strokeWidth="2" /><path d="M26 48 Q75 37 124 48" fill="none" stroke={COLORS.pink} strokeWidth="7" strokeDasharray="4 3" /><path d="M26 58 Q75 47 124 58" fill="none" stroke={COLORS.green} strokeWidth="4" /></svg><figcaption>{name}</figcaption></figure>;
}

function QuickReference() {
  return <div className="daisy-quick-reference"><header><p>Pink Hollybush Designs · interpreted teaching chapter</p><h3>Daisy Smocking Plate</h3></header><div className="daisy-quick-grid"><FinishedSample /><div><h4>Row map</h4>{daisyPlate.rowInstructions.map((row) => <p key={row.id}><strong>{row.rows}</strong> · {row.title}</p>)}<h4>Repeat</h4><ol>{daisyPlate.repeatInstructions.slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ol></div></div><Legend /><dl className="daisy-print-facts"><div><dt>Start</dt><dd>{daisyPlate.printReference.start}</dd></div><div><dt>End</dt><dd>{daisyPlate.printReference.end}</dd></div><div><dt>Tension</dt><dd>{daisyPlate.printReference.tension}</dd></div></dl></div>;
}

export function DaisyPlateChapter() {
  const [layers, setLayers] = useState<Record<DaisyLayer, boolean>>({ border: true, daisy: true, trellis: true });
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [showRepeat, setShowRepeat] = useState(true);
  const [zoom, setZoom] = useState(1);
  const toggleLayer = (layer: DaisyLayer) => setLayers((current) => ({ ...current, [layer]: !current[layer] }));
  return (
    <article className="daisy-chapter pb-20">
      <header className="daisy-hero">
        <div className="site-container">
          <nav className="no-print"><Link href="/plates/">Plates</Link><span>/</span><span>Daisy</span></nav>
          <p className="label-caps">Reusable smocking plate chapter · prototype</p>
          <h1>{daisyPlate.title}</h1>
          <p className="daisy-byline">{daisyPlate.designer}</p>
          <p className="daisy-deck">{daisyPlate.overview}</p>
          <dl className="daisy-meta"><div><dt>Level</dt><dd>{daisyPlate.difficulty}</dd></div><div><dt>Working rows</dt><dd>1–8</dd></div><div><dt>Teaching repeat</dt><dd>{daisyPlate.repeatWidth} pleats</dd></div><div><dt>Method</dt><dd>Hand smocking after pleating</dd></div></dl>
        </div>
      </header>

      <div className="site-container daisy-section-grid">
        <Section number={1} title="Finished stitched sample" id="finished-sample"><FinishedSample /><div className="daisy-copy-grid"><p><strong>The daisies sit in the upper band.</strong> Their petals are perceived in the open spaces shaped by the surrounding pink cable framework—not sewn as literal white petals.</p><p><strong>The trellis sits below.</strong> Its repeated green points make a leaf-like base and visually anchor the flower band.</p></div></Section>

        <Section number={2} title="Pleated fabric and grid" id="pleated-grid"><PleatedGrid /><p className="daisy-note"><strong>Before hand-smocking:</strong> spread the pleats just enough to count them, leave the gathering threads in place, and mark every eighth pleat with a removable marker.</p></Section>

        <Section number={3} title="Where the daisies appear" id="daisy-boundaries"><FinishedSample overlay /><div className="daisy-copy-grid"><p>The upper and lower cable movements create a scalloped framework. The eye reads the untouched fabric between them as petals around a center. The side of one framework is also the side of the next, so neighboring motifs cannot be treated as isolated medallions.</p><p>The commercial source compresses cables, fractional-row movement, and a continuous repeat into a single monochrome plate. That is efficient for an experienced smocker but difficult for a beginner to decode; these overlays separate structure from appearance.</p></div></Section>

        <Section number={4} title="Needle path for one complete repeat" id="needle-path" printClass="daisy-print-core">
          <div className="daisy-row-instructions">{daisyPlate.rowInstructions.map((row) => <article key={row.id}><span className={`daisy-confidence ${row.sourceConfidence}`}>{row.sourceConfidence}</span><p className="label-caps">{row.rows}</p><h3>{row.title}</h3><p>{row.instruction}</p><small>{row.direction}</small></article>)}</div>
          <StitchDiagram layers={layers} activeRow={activeRow} showRepeat={showRepeat} zoom={zoom} /><Legend />
          <p className="daisy-note"><strong>Interpretation note:</strong> the solid grid points are whole gathering rows. The source also calls for quarter-row placements; the lower trellis line is therefore a rhythmic teaching interpretation, not a newly asserted commercial master chart.</p>
        </Section>

        <Section number={5} title="How the pattern repeats across the full width" id="full-width"><RepeatBand /><ol className="daisy-instruction-list">{daisyPlate.repeatInstructions.map((item) => <li key={item}>{item}</li>)}</ol></Section>

        <Section number={6} title="Frame-by-frame stitch sequence" id="sequence"><SequenceGuide /><p className="daisy-note"><strong>Scope:</strong> these eight frames explain the visible framework rhythm. They do not override the source’s fractional-row wording; sample and compare before using precious fabric.</p></Section>

        <Section number={7} title="Common mistakes and fixes" id="mistakes"><div className="daisy-mistakes">{daisyPlate.commonMistakes.map((mistake) => <article key={mistake.id}><MistakeSketch type={mistake.id} /><div><h3>{mistake.title}</h3><p><strong>Looks like:</strong> {mistake.appearance}</p><p><strong>Why:</strong> {mistake.cause}</p><p><strong>Correct:</strong> {mistake.correction}</p><p><strong>Unpick?</strong> {mistake.unpick}</p></div></article>)}</div></Section>

        <Section number={8} title="Finished garment applications" id="garments"><div className="daisy-garments">{daisyPlate.garmentApplications.map((item, index) => <article key={item.name}><GarmentMockup index={index} name={item.name} /><p>{item.note}</p></article>)}</div><p className="daisy-note">These are placement diagrams, not photographs of finished garments.</p></Section>

        <Section number={9} title="Printable quick reference" id="quick-reference" printClass="daisy-print-only-reference"><QuickReference /><button type="button" className="daisy-print-button no-print" onClick={() => window.print()}>Print quick reference</button></Section>

        <Section number={10} title="Interactive digital guide" id="digital-guide" printClass="no-print">
          <div className="daisy-control-panel stitch-controls">
            <fieldset><legend>Highlight a row</legend><div>{[null, ...daisyPlate.workingRows].map((row) => <button key={row ?? "all"} type="button" aria-pressed={activeRow === row} onClick={() => setActiveRow(row)}>{row ? `Row ${row}` : "All rows"}</button>)}</div></fieldset>
            <fieldset><legend>Stitch layers</legend><div>{daisyPlate.threadColors.map((thread) => <button key={thread.id} type="button" aria-pressed={layers[thread.id]} onClick={() => toggleLayer(thread.id)}><span aria-hidden="true" style={{ background: thread.hex }} />{thread.name}</button>)}</div></fieldset>
            <label>Diagram zoom <input type="range" min="1" max="1.8" step=".1" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} /><output>{Math.round(zoom * 100)}%</output></label>
            <button type="button" aria-pressed={showRepeat} onClick={() => setShowRepeat((value) => !value)}>One-repeat highlight</button>
            <a href="#sequence">Open needle-path sequence</a>
            <button type="button" onClick={() => window.print()}>Print control</button>
          </div>
          <StitchDiagram layers={layers} activeRow={activeRow} showRepeat={showRepeat} zoom={zoom} />
          <p className="daisy-keyboard-note">All controls use native buttons, links, and inputs and are operable by keyboard. Use Tab to move between controls and Space or Enter to activate a button.</p>
        </Section>

        <aside className="daisy-source-note">
          <h2>Source fidelity and unresolved ambiguities</h2>
          <p>{daisyPlate.source}</p>
          <ul>{daisyPlate.interpretationNotes.map((note) => <li key={note}>{note}</li>)}</ul>
          <p className="text-sm">Reference assets: {daisyPlate.assets.originalSourceLabel}; {daisyPlate.assets.prototypeLabel}. Source images are intentionally not republished as page-filling raster content.</p>
        </aside>
      </div>
    </article>
  );
}
