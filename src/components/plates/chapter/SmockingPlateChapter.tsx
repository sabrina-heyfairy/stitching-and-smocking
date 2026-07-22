"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { PlateMeta } from "@/lib/plate-types";
import type { PlateChapterContent } from "@/lib/plate-chapter-content";
import { getPlateCourses, type CourseSegment, type PlateCourse } from "@/lib/plate-courses";
import { PlateColorwayProvider } from "@/components/plates/PlateColorwayContext";
import { PlateFinishedPreview, PlateGraph, PlateProgression } from "@/components/plates/PlateGraph";
import { PlateThreadKey } from "@/components/plates/PlateDownloads";

interface SequenceStep {
  course: PlateCourse;
  segment: CourseSegment;
  courseStep: number;
}

function ChapterSection({ number, title, id, children, className = "" }: { number: number; title: string; id: string; children: React.ReactNode; className?: string }) {
  return <section id={id} className={`rich-plate-section scroll-mt-24 ${className}`}><header><span>{number}</span><h2>{title}</h2></header>{children}</section>;
}

function PleatedFabricGrid({ plate }: { plate: PlateMeta }) {
  const shownPleats = Math.min(Math.max(plate.repeatPleats * 3, 16), 32);
  const repeatStart = Math.max(2, Math.floor((shownPleats - plate.repeatPleats) / 2));
  const x = (pleat: number) => 82 + pleat * 20;
  const y = (row: number) => 34 + row * 30;
  const width = x(shownPleats) + 24;
  const height = y(plate.rows) + 44;
  return <figure><div className="rich-diagram-scroll"><svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${plate.title} pleated fabric grid with ${plate.rows} numbered gathering rows and one repeat highlighted`} style={{ minWidth: Math.max(620, width) }}>
    <defs><linearGradient id={`pleat-${plate.slug}`} x1="0" x2="1"><stop offset="0" stopColor="#cfb6a5"/><stop offset=".48" stopColor="#fff3e9"/><stop offset="1" stopColor="#d5b9a5"/></linearGradient></defs>
    <rect width={width} height={height} rx="12" fill="#fbefe5" />
    {Array.from({ length: shownPleats }, (_, index) => <path key={index} d={`M${x(index)} 22 Q${x(index) + 10} 34 ${x(index + 1)} 22 V${height - 24} Q${x(index) + 10} ${height - 36} ${x(index)} ${height - 24}Z`} fill={`url(#pleat-${plate.slug})`} />)}
    {Array.from({ length: plate.rows }, (_, index) => <g key={index}><line x1="82" y1={y(index + 1)} x2={x(shownPleats)} y2={y(index + 1)} stroke="#b9aa98" strokeDasharray="3 4"/><text x="70" y={y(index + 1) + 4} textAnchor="end" fontSize="12" fill="#59534d">R{index + 1}</text></g>)}
    <rect x={x(repeatStart)} y="25" width={plate.repeatPleats * 20} height={height - 52} rx="8" fill="none" stroke="#7a3f45" strokeWidth="3" strokeDasharray="7 5"/>
    <text x={x(repeatStart) + plate.repeatPleats * 10} y="18" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7a3f45">ONE REPEAT · {plate.repeatPleats} PLEATS</text>
  </svg></div><figcaption>Front view after pleating: gathering threads remain in the fabric, but pleater needles do not. The dashed box isolates one declared repeat.</figcaption></figure>;
}

function sequenceForPlate(plate: PlateMeta, courses: PlateCourse[]): SequenceStep[] {
  const repeatEnd = Math.min(plate.pleats, Math.max(plate.repeatPleats + 1, 2));
  return courses.flatMap((course) => course.segments
    .filter((segment) => segment.from.pleat <= repeatEnd && segment.to.pleat <= repeatEnd)
    .map((segment, courseStep) => ({ course, segment, courseStep })));
}

function SequenceDiagram({ plate, steps, current }: { plate: PlateMeta; steps: SequenceStep[]; current: number }) {
  const repeatEnd = Math.min(plate.pleats, Math.max(plate.repeatPleats + 1, 2));
  const width = 80 + repeatEnd * 58;
  const height = 54 + plate.rows * 42;
  const x = (pleat: number) => 46 + pleat * 58;
  const y = (row: number) => 25 + row * 42;
  const color = (threadId: string) => plate.threads.find((thread) => thread.id === threadId)?.hex ?? "#7a3f45";
  const active = steps[current];
  return <div className="rich-diagram-scroll"><svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Frame ${current + 1} of the ${plate.title} stitch sequence`} style={{ minWidth: Math.max(620, width) }}>
    <defs><marker id={`arrow-${plate.slug}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill={color(active.course.threadId)}/></marker></defs>
    <rect width={width} height={height} rx="12" fill="#fffaf4" />
    {Array.from({ length: plate.rows }, (_, index) => <g key={index} opacity={Math.abs(active.segment.from.row - (index + 1)) < .51 || Math.abs(active.segment.to.row - (index + 1)) < .51 ? 1 : .36}><line x1="86" y1={y(index + 1)} x2={width - 24} y2={y(index + 1)} stroke="#cfc3ae"/><text x="72" y={y(index + 1) + 4} textAnchor="end" fontSize="12">R{index + 1}</text></g>)}
    {Array.from({ length: repeatEnd }, (_, index) => <g key={index}>{Array.from({ length: plate.rows }, (_, row) => <circle key={row} cx={x(index + 1)} cy={y(row + 1)} r="3.5" fill="#3d3832"/>)}<text x={x(index + 1)} y="20" textAnchor="middle" fontSize="10">P{index + 1}</text></g>)}
    {steps.slice(0, current + 1).map((step, index) => {
      const isCurrent = index === current;
      const hidden = step.segment.hidden;
      return <path key={`${step.course.id}-${step.courseStep}`} d={`M${x(step.segment.from.pleat)} ${y(step.segment.from.row)} L${x(step.segment.to.pleat)} ${y(step.segment.to.row)}`} fill="none" stroke={hidden ? "#8d867d" : color(step.course.threadId)} strokeWidth={isCurrent ? 5 : 3} strokeDasharray={hidden ? "5 4" : undefined} opacity={isCurrent ? 1 : .38} markerEnd={isCurrent ? `url(#arrow-${plate.slug})` : undefined}/>;
    })}
    <circle cx={x(active.segment.from.pleat)} cy={y(active.segment.from.row)} r="5" fill="#3d3832" />
    <circle cx={x(active.segment.to.pleat)} cy={y(active.segment.to.row)} r="12" fill="#fff" stroke={color(active.course.threadId)} strokeWidth="3" />
  </svg></div>;
}

function CourseSequenceGuide({ plate, content }: { plate: PlateMeta; content: PlateChapterContent }) {
  const courses = useMemo(() => getPlateCourses(plate), [plate]);
  const steps = useMemo(() => sequenceForPlate(plate, courses), [plate, courses]);
  const [current, setCurrent] = useState(0);
  const step = steps[current];
  const courseStarts = courses.map((course) => ({ course, index: steps.findIndex((item) => item.course.id === course.id) })).filter((item) => item.index >= 0);
  if (!step) return <p className="rich-note">No sequence is available for this plate yet.</p>;
  const insertion = `${step.segment.to.row % 1 ? step.segment.to.row.toFixed(2) : step.segment.to.row} / P${step.segment.to.pleat}`;
  return <div className="rich-sequence">
    <nav aria-label="Stitch sequence courses" className="rich-phase-nav no-print">{courseStarts.map(({ course, index }) => <button key={course.id} type="button" aria-pressed={step.course.id === course.id} onClick={() => setCurrent(index)}>{course.label}</button>)}</nav>
    <SequenceDiagram plate={plate} steps={steps} current={current} />
    <aside><p className="label-caps">{step.course.label}</p><p className="rich-step-count">Step {current + 1} of {steps.length}</p><h3>{step.course.stitch.replaceAll("-", " ")}</h3><p>{step.segment.hidden ? "Travel on the wrong side or inside the pleat" : `${step.segment.role} movement`} from row {step.segment.from.row}, pleat {step.segment.from.pleat}.</p><dl><div><dt>Thread</dt><dd>{plate.threads.find((thread) => thread.id === step.course.threadId)?.name}</dd></div><div><dt>Direction</dt><dd>{step.course.direction}</dd></div><div><dt>Next insertion</dt><dd>R{insertion}</dd></div></dl></aside>
    <div className="rich-sequence-buttons no-print"><button type="button" disabled={current === 0} onClick={() => setCurrent((value) => Math.max(0, value - 1))}>Previous step</button><button type="button" disabled={current === steps.length - 1} onClick={() => setCurrent((value) => Math.min(steps.length - 1, value + 1))}>Next step</button><button type="button" onClick={() => setCurrent(0)}>Restart sequence</button></div>
    <p className="rich-note"><strong>Sequence scope:</strong> {content.sequenceNote}</p>
  </div>;
}

function motifElementName(kind: string, stitch?: string): string {
  return stitch ? `${stitch.replaceAll("-", " ")} ${kind}` : kind;
}

function MotifSequenceGuide({ plate }: { plate: PlateMeta }) {
  const motif = plate.motif;
  const [current, setCurrent] = useState(0);
  if (!motif || motif.elements.length === 0) return null;
  const element = motif.elements[current];
  const color = (threadId: string) => plate.threads.find((thread) => thread.id === threadId)?.hex ?? "#7a3f45";
  const px = ([x]: readonly [number, number]) => 34 + x * 412;
  const py = ([, y]: readonly [number, number]) => 24 + y * 212;
  const renderElement = (item: typeof element, index: number) => {
    const active = index === current;
    const common = { opacity: active ? 1 : .34, stroke: color(item.threadId), strokeWidth: active ? 6 : 3 };
    if (item.kind === "line") return <polyline key={index} points={item.points.map((point) => `${px(point)},${py(point)}`).join(" ")} fill={item.closed ? color(item.threadId) : "none"} fillOpacity={item.closed ? .12 : 0} {...common} />;
    if (item.kind === "fill") return <polygon key={index} points={item.points.map((point) => `${px(point)},${py(point)}`).join(" ")} fill={color(item.threadId)} opacity={active ? .88 : .25} stroke={color(item.threadId)} strokeWidth={active ? 4 : 2} />;
    if (item.kind === "knot") return <g key={index} opacity={active ? 1 : .34}><circle cx={px(item.at)} cy={py(item.at)} r={5 + item.wraps * 2} fill={color(item.threadId)} /><circle cx={px(item.at)} cy={py(item.at)} r={9 + item.wraps * 2} fill="none" stroke={color(item.threadId)} strokeWidth={active ? 3 : 1} /></g>;
    if (item.kind === "bullion") return <g key={index} opacity={active ? 1 : .34}><line x1={px(item.from)} y1={py(item.from)} x2={px(item.to)} y2={py(item.to)} stroke={color(item.threadId)} strokeWidth={active ? 12 : 8} strokeLinecap="round"/><text x={(px(item.from)+px(item.to))/2} y={(py(item.from)+py(item.to))/2 - 10} textAnchor="middle" fontSize="10" fill={color(item.threadId)}>{item.wraps} wraps</text></g>;
    const dx = px(item.to) - px(item.from);
    const dy = py(item.to) - py(item.from);
    const length = Math.max(1, Math.hypot(dx, dy));
    const ox = (-dy / length) * item.width * 220;
    const oy = (dx / length) * item.width * 220;
    return <path key={index} d={`M${px(item.from)} ${py(item.from)} Q${px(item.to) + ox} ${py(item.to) + oy} ${px(item.to)} ${py(item.to)} Q${px(item.to) - ox} ${py(item.to) - oy} ${px(item.from)} ${py(item.from)}`} fill="none" {...common} />;
  };
  const stitch = element.stitch;
  return <div className="rich-motif-sequence">
    <header><p className="label-caps">Surface embroidery · after blocking</p><h3>Motif sequence</h3></header>
    <div className="rich-diagram-scroll"><svg viewBox="0 0 480 260" role="img" aria-label={`Surface embroidery step ${current + 1} of ${motif.elements.length} for ${plate.title}`} style={{ minWidth: 560 }}><rect width="480" height="260" rx="12" fill="#f6e6dc" />{Array.from({ length: 17 }, (_, index) => <line key={index} x1={24 + index * 28} y1="14" x2={24 + index * 28} y2="246" stroke="#cdb6a6" strokeWidth="6" opacity=".38"/>)}{motif.elements.slice(0, current + 1).map(renderElement)}</svg></div>
    <aside><p className="rich-step-count">Embroidery step {current + 1} of {motif.elements.length}</p><h4>{motifElementName(element.kind, stitch)}</h4><p>Thread: {plate.threads.find((thread) => thread.id === element.threadId)?.name ?? element.threadId}</p><p>{motif.instructions[Math.min(current, motif.instructions.length - 1)]}</p></aside>
    <div className="rich-sequence-buttons no-print"><button type="button" disabled={current === 0} onClick={() => setCurrent((value) => Math.max(0, value - 1))}>Previous embroidery step</button><button type="button" disabled={current === motif.elements.length - 1} onClick={() => setCurrent((value) => Math.min(motif.elements.length - 1, value + 1))}>Next embroidery step</button><button type="button" onClick={() => setCurrent(0)}>Restart embroidery sequence</button></div>
  </div>;
}

function PictureChartGuide({ plate }: { plate: PlateMeta }) {
  const chart = plate.pictureChart;
  const [selectedThread, setSelectedThread] = useState("all");
  const [showBack, setShowBack] = useState(true);
  const [completedRows, setCompletedRows] = useState(1);
  const [zoom, setZoom] = useState(100);
  if (!chart) return null;
  const threadIds = [...new Set(Object.values(chart.legend))];
  const columns = Math.max(...chart.grid.map((row) => row.length));
  const width = 72 + columns * 22;
  const height = 48 + chart.grid.length * 28;
  const firstVisibleRow = chart.grid.length - completedRows;
  const visibleCount = chart.grid.slice(firstVisibleRow).reduce((count, row) => count + [...row].filter((mark) => {
    const threadId = chart.legend[mark];
    return threadId && (selectedThread === "all" || threadId === selectedThread);
  }).length, 0);
  const thread = (id: string) => plate.threads.find((item) => item.id === id);
  return <div className="rich-picture-guide">
    <header><p className="label-caps">Picture chart · work bottom upward</p><h3>Build the picture row by row</h3></header>
    <div className="rich-picture-controls no-print">
      <fieldset><legend>Visible thread colors</legend><div><button type="button" aria-pressed={selectedThread === "all"} onClick={() => setSelectedThread("all")}>All colors</button>{threadIds.map((id) => <button key={id} type="button" aria-pressed={selectedThread === id} onClick={() => setSelectedThread(id)}><span style={{ background: thread(id)?.hex }} />{thread(id)?.name ?? id}</button>)}</div></fieldset>
      <button type="button" aria-pressed={showBack} onClick={() => setShowBack((value) => !value)}>{showBack ? "Hide" : "Show"} back-smocking</button>
      <label>Rows completed <input type="range" min="1" max={chart.grid.length} value={completedRows} onChange={(event) => setCompletedRows(Number(event.target.value))}/><output>{completedRows} of {chart.grid.length}</output></label>
      <label>Chart zoom <input type="range" min="100" max="180" step="10" value={zoom} onChange={(event) => setZoom(Number(event.target.value))}/><output>{zoom}%</output></label>
    </div>
    <div className="rich-diagram-scroll"><svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${plate.title} picture chart showing ${completedRows} of ${chart.grid.length} rows`} style={{ minWidth: `${zoom}%` }}>
      <rect width={width} height={height} rx="12" fill="#fffaf4"/>
      {Array.from({ length: columns + 1 }, (_, index) => <line key={`p-${index}`} x1={58 + index * 22} y1="18" x2={58 + index * 22} y2={height - 18} stroke="#d9c8ba" strokeWidth="4" opacity=".48"/>)}
      {chart.grid.map((row, rowIndex) => <g key={rowIndex} opacity={rowIndex < firstVisibleRow ? .08 : 1}><text x="48" y={34 + rowIndex * 28} textAnchor="end" fontSize="11" fill="#665e57">R{rowIndex + 1}</text>{[...row].map((mark, column) => {
        const threadId = chart.legend[mark];
        if (!threadId) return null;
        const muted = selectedThread !== "all" && selectedThread !== threadId;
        return <path key={column} d={`M${58 + column * 22} ${30 + rowIndex * 28} Q${69 + column * 22} ${22 + rowIndex * 28} ${80 + column * 22} ${30 + rowIndex * 28}`} fill="none" stroke={thread(threadId)?.hex ?? "#7a3f45"} strokeWidth="5" strokeLinecap="round" opacity={muted ? .12 : 1}/>;
      })}</g>)}
      {showBack && chart.backSmocking?.map((item, index) => <line key={`b-${index}`} x1={58 + (item.fromPleat ?? 1) * 22} x2={58 + (item.toPleat ?? columns) * 22} y1={30 + (item.row - 1) * 28} y2={30 + (item.row - 1) * 28} stroke={thread(item.threadId)?.hex ?? "#6b625a"} strokeWidth="3" strokeDasharray="7 5" opacity={selectedThread === "all" || selectedThread === item.threadId ? .8 : .1}/>) }
    </svg></div>
    <p className="rich-note" aria-live="polite"><strong>{visibleCount} visible cable stitches</strong> in the selected color view and completed rows. The faint rows above are still waiting to be worked.</p>
  </div>;
}

function FiveRepeatDiagram({ plate }: { plate: PlateMeta }) {
  return <figure><div className="rich-repeat-strip" role="img" aria-label={`Five adjacent ${plate.title} repeats with shared boundaries`}>
    {Array.from({ length: 5 }, (_, index) => <div key={index}><span>Repeat {index + 1}</span><b aria-hidden="true">{index % 2 ? "◇" : "◆"}</b></div>)}
  </div><figcaption>Each ending boundary is also the next starting boundary. Continue the working thread across the full row.</figcaption></figure>;
}

function MistakeGrid({ content }: { content: PlateChapterContent }) {
  return <div className="rich-mistake-grid">{content.mistakes.map((mistake) => <article key={mistake.title}><div aria-hidden="true" className="rich-mistake-mark">×</div><h3>{mistake.title}</h3><p><strong>Looks like:</strong> {mistake.appearance}</p><p><strong>Correct:</strong> {mistake.correction}</p><p><strong>Unpick?</strong> {mistake.unpick}</p></article>)}</div>;
}

function GarmentGrid({ plate, content }: { plate: PlateMeta; content: PlateChapterContent }) {
  return <div className="rich-garment-grid">{plate.garments.map((garment, index) => <article key={garment}><svg viewBox="0 0 160 120" role="img" aria-label={`${plate.title} placement diagram on ${garment}`}><path d={index % 2 ? "M25 12H135L150 112H10Z" : "M35 12Q80 0 125 12L145 112H15Z"} fill="#efe0d5" stroke="#baa998" strokeWidth="2"/><path d="M25 42Q80 30 135 42" fill="none" stroke={plate.threads[0]?.hex} strokeWidth="7" strokeDasharray="5 3"/></svg><h3>{garment}</h3><p>{content.garmentNotes[garment] ?? "Center complete repeats on the most visible garment line and balance any plain edge pleats."}</p></article>)}</div>;
}

function PrintReference({ plate, content }: { plate: PlateMeta; content: PlateChapterContent }) {
  return <div className="plate-print-reference"><header><p>{plate.category ?? "Smocking Plate Library"}</p><h3>{plate.title}</h3><p>{plate.subtitle}</p></header><div className="plate-print-columns"><div><h4>Working map</h4><PlateGraph plate={plate}/></div><div><h4>Instructions</h4><ol>{plate.instructions.map((item) => <li key={item}>{item}</li>)}</ol><h4>Repeat</h4><ul>{content.repeatGuidance.map((item) => <li key={item}>{item}</li>)}</ul></div></div><PlateThreadKey plate={plate}/><p><strong>Tension:</strong> {content.tensionReminder}</p></div>;
}

export function SmockingPlateChapter({ plate, content }: { plate: PlateMeta; content: PlateChapterContent }) {
  return <PlateColorwayProvider><article className="rich-plate-chapter pb-20">
    <header className="rich-plate-hero"><div className="site-container"><nav className="no-print"><Link href="/plates/">Plates</Link><span>/</span><span>{plate.title}</span></nav><p className="label-caps">Interactive smocking plate chapter</p><h1>{plate.title}</h1><p className="rich-subtitle">{plate.subtitle}</p><p className="rich-overview">{content.overview}</p><dl><div><dt>Difficulty</dt><dd>{plate.difficulty}</dd></div><div><dt>Rows</dt><dd>{plate.rows}</dd></div><div><dt>Repeat</dt><dd>{plate.repeatPleats} pleats</dd></div><div><dt>Confidence</dt><dd>{content.confidence}</dd></div></dl></div></header>
    <div className="site-container rich-plate-grid">
      <ChapterSection number={1} title="Finished stitched sample" id="finished-sample"><PlateFinishedPreview plate={plate}/><p className="rich-note">This is an instructional rendering generated from the plate data, not a photograph.</p></ChapterSection>
      <ChapterSection number={2} title="Pleated fabric and grid" id="pleated-grid"><PleatedFabricGrid plate={plate}/></ChapterSection>
      <ChapterSection number={3} title="Where the motif appears" id="motif"><PlateProgression plate={plate}/><p>{content.motifExplanation}</p>{plate.pictureChart && <PictureChartGuide plate={plate}/>} {plate.motif && <ul className="rich-instructions">{plate.motif.instructions.map((item) => <li key={item}>{item}</li>)}</ul>}</ChapterSection>
      <ChapterSection number={4} title="Needle path for one complete repeat" id="needle-path"><PlateGraph plate={plate}/><PlateThreadKey plate={plate}/></ChapterSection>
      <ChapterSection number={5} title="How the pattern repeats across the full width" id="repeat"><FiveRepeatDiagram plate={plate}/><ol className="rich-instructions">{content.repeatGuidance.map((item) => <li key={item}>{item}</li>)}</ol></ChapterSection>
      <ChapterSection number={6} title="Frame-by-frame stitch sequence" id="sequence"><CourseSequenceGuide plate={plate} content={content}/>{plate.motif && <MotifSequenceGuide plate={plate}/>}</ChapterSection>
      <ChapterSection number={7} title="Common mistakes and fixes" id="mistakes"><MistakeGrid content={content}/></ChapterSection>
      <ChapterSection number={8} title="Finished garment applications" id="garments"><GarmentGrid plate={plate} content={content}/><p className="rich-note">These are placement diagrams, not photographs of completed garments.</p></ChapterSection>
      <ChapterSection number={9} title="Printable quick reference" id="print-reference" className="rich-print-section"><PrintReference plate={plate} content={content}/><button className="rich-print-button no-print" type="button" onClick={() => window.print()}>Print quick reference</button></ChapterSection>
      <ChapterSection number={10} title="Interactive digital guide" id="digital-guide" className="no-print"><div className="rich-digital-links"><a href="#needle-path">Toggle graph views and colors</a><a href="#sequence">Open the keyboard-operable sequence</a><a href="#repeat">Review repeat boundaries</a><button type="button" onClick={() => window.print()}>Print control</button></div><p>Use Tab to move through graph, sequence, colorway, and print controls. Wide diagrams scroll horizontally on small screens without widening the page.</p></ChapterSection>
      <aside className="rich-source-note"><h2>Accuracy and interpretation notes</h2><ul>{content.interpretationNotes.map((note) => <li key={note}>{note}</li>)}</ul>{plate.sources && <p>Sources: {plate.sources.map((source) => source.label).join(" · ")}</p>}</aside>
    </div>
  </article></PlateColorwayProvider>;
}
