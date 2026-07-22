"use client";

import { useMemo, useState } from "react";
import type { PlateMeta } from "@/lib/plate-types";
import { getPlateCourses, type PlateCourse, type CoursePoint } from "@/lib/plate-courses";
import { ILLUSTRATION, IllustrationFrame } from "@/components/illustrations/IllustrationFrame";
import { useColorwayPlate } from "@/components/plates/PlateColorwayContext";
import { plateMotifSvg } from "@/lib/plate-motif";

const PLEAT_WIDTH = 28;
const ROW_HEIGHT = 42;
const LEFT = 52;
const TOP = 54;

interface RenderGeometry {
  pleatWidth: number;
  rowHeight: number;
  left: number;
  top: number;
}

const GRAPH_GEOMETRY: RenderGeometry = {
  pleatWidth: PLEAT_WIDTH,
  rowHeight: ROW_HEIGHT,
  left: LEFT,
  top: TOP,
};

const FINISHED_GEOMETRY: RenderGeometry = {
  pleatWidth: 20,
  rowHeight: 34,
  left: 38,
  top: 34,
};

const PICTURE_GRAPH_GEOMETRY: RenderGeometry = {
  pleatWidth: 14,
  rowHeight: 22,
  left: 44,
  top: 38,
};

const PICTURE_FINISHED_GEOMETRY: RenderGeometry = {
  pleatWidth: 14,
  rowHeight: 18,
  left: 32,
  top: 28,
};

function threadColor(plate: PlateMeta, threadId: string): string {
  return plate.threads.find((thread) => thread.id === threadId)?.hex ?? ILLUSTRATION.thread;
}

function pointPosition(point: CoursePoint, startPleat: number, geometry = GRAPH_GEOMETRY) {
  return {
    x: geometry.left + (point.pleat - startPleat) * geometry.pleatWidth + geometry.pleatWidth / 2,
    y: geometry.top + (point.row - 1) * geometry.rowHeight + geometry.rowHeight / 2,
  };
}

function bindDisplacement(courses: PlateCourse[], point: CoursePoint, scale = 1): number {
  let displacement = 0;
  for (const course of courses) {
    for (const segment of course.segments) {
      const pair = segment.bind ??
        (segment.role === "closure"
          ? [Math.min(segment.from.pleat, segment.to.pleat), Math.max(segment.from.pleat, segment.to.pleat)] as [number, number]
          : undefined);
      if (!pair) continue;
      const strength = course.stitch === "honeycomb"
        ? 9
        : course.stitch === "surface-honeycomb"
          ? 6
          : course.stitch === "van-dyke"
            ? 8
            : 3;
      const distance = Math.abs(point.row - segment.to.row);
      const influence = Math.max(0, 1 - distance / 1.25);
      if (point.pleat === pair[0]) displacement += strength * influence * scale;
      if (point.pleat === pair[1]) displacement -= strength * influence * scale;
    }
  }
  return displacement;
}

function stitchPath(
  from: { x: number; y: number },
  to: { x: number; y: number },
  segment: PlateCourse["segments"][number],
  scale = 1,
): string {
  const side = segment.threadSide === "above" ? -1 : 1;
  if (segment.straight) {
    return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  }
  if (segment.role === "level" || segment.role === "closure" || segment.role === "lock") {
    const bow = (segment.role === "lock" ? 4 : 5) * scale;
    const third = (to.x - from.x) / 3;
    return `M ${from.x} ${from.y} C ${from.x + third} ${from.y + side * bow}, ${to.x - third} ${to.y + side * bow}, ${to.x} ${to.y}`;
  }
  if (segment.role === "travel") {
    const bend = courseTravelBend(from, to);
    return `M ${from.x} ${from.y} C ${from.x + bend} ${from.y}, ${to.x + bend} ${to.y}, ${to.x} ${to.y}`;
  }
  const third = (to.x - from.x) / 3;
  return `M ${from.x} ${from.y} C ${from.x + third} ${from.y}, ${to.x - third} ${to.y}, ${to.x} ${to.y}`;
}

function courseTravelBend(from: { x: number }, to: { x: number }): number {
  return from.x <= to.x ? 5 : -5;
}

function CoursePaths({
  plate,
  courses,
  startPleat,
  endPleat,
  showHidden,
  showOrder,
  deformBinds = false,
  finished = false,
  geometry = GRAPH_GEOMETRY,
  finishedFilterId,
}: {
  plate: PlateMeta;
  courses: PlateCourse[];
  startPleat: number;
  endPleat: number;
  showHidden: boolean;
  showOrder: boolean;
  deformBinds?: boolean;
  finished?: boolean;
  geometry?: RenderGeometry;
  finishedFilterId?: string;
}) {
  const pathScale = geometry.pleatWidth / PLEAT_WIDTH;
  return courses.map((course, courseIndex) => {
    const color = threadColor(plate, course.threadId);
    const segments = course.segments.filter(
      (segment) =>
        segment.from.pleat >= startPleat &&
        segment.to.pleat <= endPleat &&
        (showHidden || !segment.hidden),
    );
    const first = segments[0] ? pointPosition(segments[0].from, startPleat, geometry) : null;
    return (
      <g key={course.id} filter={finishedFilterId ? `url(#${finishedFilterId})` : undefined}>
        {segments.map((segment, index) => {
          const from = pointPosition(segment.from, startPleat, geometry);
          const to = pointPosition(segment.to, startPleat, geometry);
          if (deformBinds) {
            const scale = geometry.pleatWidth / PLEAT_WIDTH;
            from.x += bindDisplacement(courses, segment.from, scale);
            to.x += bindDisplacement(courses, segment.to, scale);
          }
          return (
            <g key={`${course.id}-${index}`}>
              {finished && (
                <path
                  d={stitchPath(from, to, segment, pathScale)}
                  fill="none"
                  stroke="#3b302b"
                  strokeWidth="5.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity=".2"
                />
              )}
              <path
                d={stitchPath(from, to, segment, pathScale)}
                fill="none"
                stroke={segment.hidden ? ILLUSTRATION.inkFaint : color}
                strokeWidth={segment.hidden ? 1.4 : finished ? 3.2 : plate.pictureChart ? 2.2 : 3}
                strokeDasharray={segment.hidden ? "5 4" : undefined}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {(segment.passes ?? 1) > 1 && (
                <path
                  d={stitchPath({ x: from.x, y: from.y + 2.4 }, { x: to.x, y: to.y + 2.4 }, segment, pathScale)}
                  fill="none"
                  stroke={color}
                  strokeWidth={finished ? 3 : 2.4}
                  strokeLinecap="round"
                />
              )}
              {!segment.hidden && !finished && (
                <circle cx={to.x} cy={to.y} r={plate.pictureChart ? 1.6 : 2.8} fill={color} stroke={ILLUSTRATION.fabric} strokeWidth=".8" />
              )}
              {segment.bind && !finished && (
                <path
                  d={`M ${(from.x + to.x) / 2 - Math.max(5, Math.abs(to.x - from.x) / 2)} ${to.y - 6} Q ${(from.x + to.x) / 2} ${to.y + 7} ${(from.x + to.x) / 2 + Math.max(5, Math.abs(to.x - from.x) / 2)} ${to.y - 6}`}
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                />
              )}
            </g>
          );
        })}
        {showOrder && first && (
          <>
            <circle cx={first.x - 9} cy={first.y - 10} r="9" fill={color} />
            <text x={first.x - 9} y={first.y - 7} textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">
              {courseIndex + 1}
            </text>
            <path
              d={course.direction === "left-to-right"
                ? `M ${first.x - 1} ${first.y - 1} l 9 0 l -4 -4 m 4 4 l -4 4`
                : `M ${first.x - 17} ${first.y - 1} l -9 0 l 4 -4 m -4 4 l 4 4`}
              fill="none"
              stroke={color}
              strokeWidth="1.5"
            />
          </>
        )}
      </g>
    );
  });
}

export function PlateGraph({ plate: sourcePlate }: { plate: PlateMeta }) {
  const plate = useColorwayPlate(sourcePlate);
  const courses = useMemo(() => getPlateCourses(plate), [plate]);
  const isPicture = Boolean(plate.pictureChart);
  const geometry = isPicture ? PICTURE_GRAPH_GEOMETRY : GRAPH_GEOMETRY;
  const [fullWidth, setFullWidth] = useState(isPicture);
  const repeatEnd = plate.repeatPleats > 1
    ? Math.min(plate.pleats, plate.repeatPleats <= 4 ? plate.repeatPleats * 2 + 1 : plate.repeatPleats + 1)
    : Math.min(plate.pleats, 12);
  const endPleat = fullWidth ? plate.pleats : repeatEnd;
  const shownPleats = endPleat;
  const width = geometry.left + shownPleats * geometry.pleatWidth + 24;
  const height = geometry.top + plate.rows * geometry.rowHeight + 54;
  const centerX = geometry.left + (plate.pleats / 2) * geometry.pleatWidth;
  const repeatStartX = geometry.left + geometry.pleatWidth / 2;
  const centerLabel = (plate.centerLine ?? "center reference").toUpperCase();

  return (
    <IllustrationFrame
      caption={fullWidth
        ? `Full placement · ${plate.pleats} pleats · scroll sideways to inspect`
        : `Enlarged working repeat · ${shownPleats} pleats shown`}
      controls={
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            aria-pressed={!fullWidth}
            onClick={() => setFullWidth(false)}
            className="min-h-11 rounded border border-border bg-paper px-4 py-2 text-sm text-ink hover:bg-cream-deep"
          >
            Working repeat
          </button>
          <button
            type="button"
            aria-pressed={fullWidth}
            onClick={() => setFullWidth(true)}
            className="min-h-11 rounded border border-border bg-paper px-4 py-2 text-sm text-ink hover:bg-cream-deep"
          >
            Full placement
          </button>
        </div>
      }
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        style={{ minWidth: width }}
        className="h-auto max-w-none"
        role="img"
        aria-label={`Connected stitch graph for ${plate.title}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width={width} height={height} rx="8" fill={ILLUSTRATION.fabric} />
        {Array.from({ length: plate.rows }, (_, rowIndex) => {
          const y = geometry.top + rowIndex * geometry.rowHeight + geometry.rowHeight / 2;
          return (
            <g key={`row-${rowIndex + 1}`}>
              <line x1={geometry.left} y1={y} x2={geometry.left + shownPleats * geometry.pleatWidth} y2={y} stroke={ILLUSTRATION.fabricShadow} strokeDasharray="3 4" />
              <text x={geometry.left - 8} y={y + 4} textAnchor="end" fontSize={isPicture ? 9 : 12} fill={ILLUSTRATION.inkMuted}>R{rowIndex + 1}</text>
            </g>
          );
        })}
        {Array.from({ length: shownPleats }, (_, index) => {
          const x = geometry.left + index * geometry.pleatWidth + geometry.pleatWidth / 2;
          return (
            <g key={`pleat-${index + 1}`}>
              <path
                d={`M ${x - geometry.pleatWidth / 2} ${geometry.top - 4} Q ${x} ${geometry.top + 5} ${x + geometry.pleatWidth / 2} ${geometry.top - 4} V ${geometry.top + plate.rows * geometry.rowHeight} Q ${x} ${geometry.top + plate.rows * geometry.rowHeight - 9} ${x - geometry.pleatWidth / 2} ${geometry.top + plate.rows * geometry.rowHeight} Z`}
                fill={index % 2 ? ILLUSTRATION.fabric : ILLUSTRATION.mountain}
                opacity=".56"
              />
              <line x1={x} y1={geometry.top - 4} x2={x} y2={geometry.top + plate.rows * geometry.rowHeight} stroke={ILLUSTRATION.fabricShadow} strokeWidth=".6" />
              <text x={x} y={geometry.top - 12} textAnchor="middle" fontSize={isPicture ? 8 : 11} fill={ILLUSTRATION.inkMuted}>{index + 1}</text>
            </g>
          );
        })}
        <CoursePaths plate={plate} courses={courses} startPleat={1} endPleat={endPleat} showHidden showOrder={!isPicture} geometry={geometry} />
        {plate.motif && (
          <g
            dangerouslySetInnerHTML={{
              __html: plateMotifSvg(plate, {
                originX: geometry.left + geometry.pleatWidth / 2,
                originY: geometry.top + geometry.rowHeight / 2,
                pleatWidth: geometry.pleatWidth,
                rowSpan: (plate.rows - 1) * geometry.rowHeight,
                endPleat,
              }),
            }}
          />
        )}
        {plate.repeatPleats > 1 && !fullWidth && (
          <g>
            {[repeatStartX, repeatStartX + plate.repeatPleats * geometry.pleatWidth].map((x) => (
              <line key={x} x1={x} y1={geometry.top - 8} x2={x} y2={geometry.top + plate.rows * geometry.rowHeight + 8} stroke={ILLUSTRATION.gold} strokeWidth="1.5" strokeDasharray="5 3" />
            ))}
            <text x={repeatStartX + plate.repeatPleats * geometry.pleatWidth / 2} y={height - 15} textAnchor="middle" fontSize="11" fontWeight="700" fill={ILLUSTRATION.gold}>ONE REPEAT</text>
          </g>
        )}
        {fullWidth && (
          <g>
            <line x1={centerX} y1={geometry.top - 18} x2={centerX} y2={geometry.top + plate.rows * geometry.rowHeight + 10} stroke={ILLUSTRATION.burgundy} strokeWidth="2" strokeDasharray="6 4" />
            <text x={centerX} y={height - 14} textAnchor="middle" fontSize="11" fontWeight="700" fill={ILLUSTRATION.burgundy}>{centerLabel}</text>
          </g>
        )}
      </svg>
      <div className="mt-4 grid gap-2 text-sm text-ink-muted sm:grid-cols-2">
        {!isPicture && courses.map((course, index) => (
          <div key={course.id} className="flex items-start gap-2">
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: threadColor(plate, course.threadId) }}>{index + 1}</span>
            <span><strong className="font-medium text-ink">{course.label}</strong><br />Work {course.direction.replaceAll("-", " ")}.</span>
          </div>
        ))}
        {isPicture && plate.threads.filter((thread) => thread.id !== "back").map((thread) => (
          <div key={thread.id} className="flex items-center gap-2">
            <span className="h-4 w-4 rounded-full border border-border" style={{ backgroundColor: thread.hex }} />
            <span><strong className="font-medium text-ink">{thread.name}</strong> · stacked cable stitches</span>
          </div>
        ))}
        {isPicture && (
          <div className="flex items-center gap-2"><span className="w-8 border-t-2 border-dashed border-ink-faint" />Dashed line = wrong-side back-smocking.</div>
        )}
        {plate.motif && (
          <div className="flex items-start gap-2">
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-burgundy text-xs font-bold text-white">E</span>
            <span><strong className="font-medium text-ink">Surface embroidery · work last</strong><br />{plate.motif.instructions.join(" ")}</span>
          </div>
        )}
        {!isPicture && <div className="flex items-center gap-2"><span className="w-8 border-t-2 border-dashed border-ink-faint" />Dashed line = hidden travel inside the pleat.</div>}
        {!isPicture && <div className="flex items-center gap-2"><span className="text-lg">⌒</span>Arc = catch the marked pleat pair together.</div>}
        {!isPicture && <div className="flex items-center gap-2"><span className="inline-block h-3 w-8 rounded-full border-t-2 border-ink" />Level stitch at a peak or trough = turn closure.</div>}
      </div>
    </IllustrationFrame>
  );
}

export function PlateFinishedPreview({ plate: sourcePlate }: { plate: PlateMeta }) {
  const plate = useColorwayPlate(sourcePlate);
  const courses = getPlateCourses(plate);
  const geometry = plate.pictureChart ? PICTURE_FINISHED_GEOMETRY : FINISHED_GEOMETRY;
  const hasDeformation = Boolean(plate.pictureChart) || courses.some((course) =>
    course.segments.some((segment) => segment.bind || segment.role === "closure"),
  );
  const fabricWidth = plate.pleats * geometry.pleatWidth;
  const fabricHeight = plate.rows * geometry.rowHeight;
  const width = geometry.left * 2 + fabricWidth;
  const height = geometry.top * 2 + fabricHeight;
  const pleatGradientId = `finished-pleat-${plate.slug}`;
  const weaveId = `finished-weave-${plate.slug}`;
  const fabricClipId = `finished-fabric-clip-${plate.slug}`;
  const fabricShadowId = `finished-fabric-shadow-${plate.slug}`;
  const threadShadowId = `finished-thread-shadow-${plate.slug}`;

  return (
    <IllustrationFrame caption={`Rendered ${plate.pleats}-pleat stitched sample · fabric relief follows the charted catch points`}>
      <svg viewBox={`0 0 ${width} ${height}`} width={width} style={{ minWidth: width }} className="h-auto max-w-none" role="img" aria-label={`Finished stitched sample for ${plate.title}`}>
        <defs>
          <linearGradient id={pleatGradientId} x1="0" x2="1">
            <stop offset="0" stopColor="#b9aa97" />
            <stop offset=".16" stopColor="#d7cbb9" />
            <stop offset=".42" stopColor="#f5efe3" />
            <stop offset=".56" stopColor="#fffdf8" />
            <stop offset=".76" stopColor="#e1d5c3" />
            <stop offset="1" stopColor="#aa9a87" />
          </linearGradient>
          <pattern id={weaveId} width="7" height="7" patternUnits="userSpaceOnUse">
            <path d="M 0 .5 H 7 M .5 0 V 7" stroke="#8d7d69" strokeWidth=".35" opacity=".28" />
            <path d="M 0 3.5 H 7 M 3.5 0 V 7" stroke="#fff" strokeWidth=".3" opacity=".48" />
          </pattern>
          <clipPath id={fabricClipId}>
            <rect x={geometry.left} y={geometry.top} width={fabricWidth} height={fabricHeight} rx="3" />
          </clipPath>
          <filter id={fabricShadowId} x="-10%" y="-15%" width="120%" height="135%">
            <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#6f6254" floodOpacity=".28" />
          </filter>
          <filter id={threadShadowId} x="-15%" y="-20%" width="130%" height="145%">
            <feDropShadow dx=".6" dy="1.1" stdDeviation=".65" floodColor="#2f2521" floodOpacity=".42" />
          </filter>
        </defs>
        <rect width={width} height={height} rx="9" fill="#ede6da" />
        <rect
          x={geometry.left}
          y={geometry.top}
          width={fabricWidth}
          height={fabricHeight}
          rx="3"
          fill="#d8ccba"
          filter={`url(#${fabricShadowId})`}
        />
        <g clipPath={`url(#${fabricClipId})`}>
          <rect x={geometry.left} y={geometry.top} width={fabricWidth} height={fabricHeight} fill="#e7ddcd" />
          {Array.from({ length: plate.pleats }, (_, index) => {
            if (!hasDeformation) {
              return (
                <rect
                  key={index}
                  x={geometry.left + index * geometry.pleatWidth}
                  y={geometry.top}
                  width={geometry.pleatWidth + .5}
                  height={fabricHeight}
                  fill={`url(#${pleatGradientId})`}
                />
              );
            }
            const pleat = index + 1;
            const points = Array.from({ length: plate.rows * 6 + 1 }, (_, sample) => {
              const row = 0.5 + sample / 6;
              const position = pointPosition({ pleat, row }, 1, geometry);
              return {
                x: position.x + bindDisplacement(courses, { pleat, row }, geometry.pleatWidth / PLEAT_WIDTH),
                y: position.y,
              };
            });
            const path = points.map((point, pointIndex) => `${pointIndex === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
            return (
              <g key={index}>
                <path d={path} fill="none" stroke="#aa9a87" strokeWidth={geometry.pleatWidth + 1} strokeLinejoin="round" opacity=".78" />
                <path d={path} fill="none" stroke="#dfd3c1" strokeWidth={geometry.pleatWidth - 3} strokeLinejoin="round" />
                <path d={path} fill="none" stroke="#f8f3e9" strokeWidth={geometry.pleatWidth * .46} strokeLinejoin="round" opacity=".96" />
                <path d={path} fill="none" stroke="#fffefb" strokeWidth="1.1" opacity=".88" />
              </g>
            );
          })}
          <rect
            x={geometry.left}
            y={geometry.top}
            width={fabricWidth}
            height={fabricHeight}
            fill={`url(#${weaveId})`}
            opacity=".38"
          />
          <path d={`M ${geometry.left} ${geometry.top + 1} H ${geometry.left + fabricWidth}`} stroke="#fff" strokeWidth="1.2" opacity=".75" />
          <path d={`M ${geometry.left} ${geometry.top + fabricHeight - 1} H ${geometry.left + fabricWidth}`} stroke="#8e7e6b" strokeWidth="1" opacity=".4" />
        </g>
        <CoursePaths
          plate={plate}
          courses={courses}
          startPleat={1}
          endPleat={plate.pleats}
          showHidden={false}
          showOrder={false}
          deformBinds
          finished
          geometry={geometry}
          finishedFilterId={threadShadowId}
        />
        {plate.motif && (
          <g
            filter={`url(#${threadShadowId})`}
            dangerouslySetInnerHTML={{
              __html: plateMotifSvg(plate, {
                originX: geometry.left + geometry.pleatWidth / 2,
                originY: geometry.top + geometry.rowHeight / 2,
                pleatWidth: geometry.pleatWidth,
                rowSpan: (plate.rows - 1) * geometry.rowHeight,
                finished: true,
              }),
            }}
          />
        )}
      </svg>
    </IllustrationFrame>
  );
}

export function PlateProgression({ plate: sourcePlate }: { plate: PlateMeta }) {
  const plate = useColorwayPlate(sourcePlate);
  const courses = getPlateCourses(plate);
  const geometry = plate.pictureChart ? PICTURE_GRAPH_GEOMETRY : GRAPH_GEOMETRY;
  const shown = plate.repeatPleats > 1 ? Math.min(plate.repeatPleats + 1, plate.pleats) : Math.min(12, plate.pleats);
  const width = geometry.left + shown * geometry.pleatWidth + 20;
  const height = geometry.top + plate.rows * geometry.rowHeight + 16;
  return (
    <div className="mt-5 grid gap-3 lg:grid-cols-3">
      {[0, Math.max(1, Math.ceil(courses.length / 2)), courses.length].map((count, index) => (
        <figure key={index} className="overflow-x-auto rounded border border-border bg-paper/60 p-2">
          <svg viewBox={`0 0 ${width} ${height}`} width={width} style={{ minWidth: width }} className="h-auto max-w-none" role="img" aria-label={["Blank pleats", "Foundation in progress", "Finished repeat"][index]}>
            <rect width={width} height={height} fill={ILLUSTRATION.fabric} />
            {Array.from({ length: shown }, (_, pleat) => {
              const x = geometry.left + pleat * geometry.pleatWidth + geometry.pleatWidth / 2;
              return <path key={pleat} d={`M${x - geometry.pleatWidth / 2} ${geometry.top} Q${x} ${geometry.top + 8} ${x + geometry.pleatWidth / 2} ${geometry.top} V${height - 10} Q${x} ${height - 18} ${x - geometry.pleatWidth / 2} ${height - 10}Z`} fill={pleat % 2 ? ILLUSTRATION.fabric : ILLUSTRATION.mountain} stroke={ILLUSTRATION.fabricShadow} strokeWidth=".5" />;
            })}
            <CoursePaths plate={plate} courses={courses.slice(0, count)} startPleat={1} endPleat={shown} showHidden={index === 1} showOrder={index === 1 && !plate.pictureChart} finished={index === 2} deformBinds={index === 2} geometry={geometry} />
            {index === 2 && plate.motif && (
              <g
                dangerouslySetInnerHTML={{
                  __html: plateMotifSvg(plate, {
                    originX: geometry.left + geometry.pleatWidth / 2,
                    originY: geometry.top + geometry.rowHeight / 2,
                    pleatWidth: geometry.pleatWidth,
                    rowSpan: (plate.rows - 1) * geometry.rowHeight,
                    endPleat: shown,
                    finished: true,
                  }),
                }}
              />
            )}
          </svg>
          <figcaption className="px-1 py-2 text-sm text-ink-muted">{index + 1} · {["Blank pleats", "Foundation in progress", "Finished repeat"][index]}</figcaption>
        </figure>
      ))}
    </div>
  );
}
