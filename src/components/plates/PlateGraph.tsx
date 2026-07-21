"use client";

import { useMemo, useState } from "react";
import type { PlateMeta } from "@/lib/plate-types";
import { getPlateCourses, type PlateCourse, type CoursePoint } from "@/lib/plate-courses";
import { ILLUSTRATION, IllustrationFrame } from "@/components/illustrations/IllustrationFrame";
import { useColorwayPlate } from "@/components/plates/PlateColorwayContext";

const PLEAT_WIDTH = 28;
const ROW_HEIGHT = 42;
const LEFT = 52;
const TOP = 54;

function threadColor(plate: PlateMeta, threadId: string): string {
  return plate.threads.find((thread) => thread.id === threadId)?.hex ?? ILLUSTRATION.thread;
}

function pointPosition(point: CoursePoint, startPleat: number) {
  return {
    x: LEFT + (point.pleat - startPleat) * PLEAT_WIDTH + PLEAT_WIDTH / 2,
    y: TOP + (point.row - 1) * ROW_HEIGHT + ROW_HEIGHT / 2,
  };
}

function CoursePaths({
  plate,
  courses,
  startPleat,
  endPleat,
  showHidden,
  showOrder,
}: {
  plate: PlateMeta;
  courses: PlateCourse[];
  startPleat: number;
  endPleat: number;
  showHidden: boolean;
  showOrder: boolean;
}) {
  return courses.map((course, courseIndex) => {
    const color = threadColor(plate, course.threadId);
    const segments = course.segments.filter(
      (segment) =>
        segment.from.pleat >= startPleat &&
        segment.to.pleat <= endPleat &&
        (showHidden || !segment.hidden),
    );
    const first = segments[0] ? pointPosition(segments[0].from, startPleat) : null;
    return (
      <g key={course.id}>
        {segments.map((segment, index) => {
          const from = pointPosition(segment.from, startPleat);
          const to = pointPosition(segment.to, startPleat);
          return (
            <g key={`${course.id}-${index}`}>
              <path
                d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                fill="none"
                stroke={segment.hidden ? ILLUSTRATION.inkFaint : color}
                strokeWidth={segment.hidden ? 1.4 : 3}
                strokeDasharray={segment.hidden ? "5 4" : undefined}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {!segment.hidden && (
                <circle cx={to.x} cy={to.y} r="2.8" fill={color} stroke={ILLUSTRATION.fabric} strokeWidth=".8" />
              )}
              {segment.bind && (
                <path
                  d={`M ${to.x - 7} ${to.y - 6} Q ${to.x} ${to.y + 7} ${to.x + 7} ${to.y - 6}`}
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
            <path d={`M ${first.x - 1} ${first.y - 1} l 9 0 l -4 -4 m 4 4 l -4 4`} fill="none" stroke={color} strokeWidth="1.5" />
          </>
        )}
      </g>
    );
  });
}

export function PlateGraph({ plate: sourcePlate }: { plate: PlateMeta }) {
  const plate = useColorwayPlate(sourcePlate);
  const courses = useMemo(() => getPlateCourses(plate), [plate]);
  const [fullWidth, setFullWidth] = useState(false);
  const repeatEnd = plate.repeatPleats > 1 ? Math.min(plate.pleats, plate.repeatPleats + 1) : Math.min(plate.pleats, 12);
  const endPleat = fullWidth ? plate.pleats : repeatEnd;
  const shownPleats = endPleat;
  const width = LEFT + shownPleats * PLEAT_WIDTH + 24;
  const height = TOP + plate.rows * ROW_HEIGHT + 54;
  const centerX = LEFT + (plate.pleats / 2) * PLEAT_WIDTH;

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
          const y = TOP + rowIndex * ROW_HEIGHT + ROW_HEIGHT / 2;
          return (
            <g key={`row-${rowIndex + 1}`}>
              <line x1={LEFT} y1={y} x2={LEFT + shownPleats * PLEAT_WIDTH} y2={y} stroke={ILLUSTRATION.fabricShadow} strokeDasharray="3 4" />
              <text x={LEFT - 10} y={y + 4} textAnchor="end" fontSize="12" fill={ILLUSTRATION.inkMuted}>R{rowIndex + 1}</text>
            </g>
          );
        })}
        {Array.from({ length: shownPleats }, (_, index) => {
          const x = LEFT + index * PLEAT_WIDTH + PLEAT_WIDTH / 2;
          return (
            <g key={`pleat-${index + 1}`}>
              <path
                d={`M ${x - PLEAT_WIDTH / 2} ${TOP - 4} Q ${x} ${TOP + 5} ${x + PLEAT_WIDTH / 2} ${TOP - 4} V ${TOP + plate.rows * ROW_HEIGHT} Q ${x} ${TOP + plate.rows * ROW_HEIGHT - 9} ${x - PLEAT_WIDTH / 2} ${TOP + plate.rows * ROW_HEIGHT} Z`}
                fill={index % 2 ? ILLUSTRATION.fabric : ILLUSTRATION.mountain}
                opacity=".56"
              />
              <line x1={x} y1={TOP - 4} x2={x} y2={TOP + plate.rows * ROW_HEIGHT} stroke={ILLUSTRATION.fabricShadow} strokeWidth=".6" />
              <text x={x} y={TOP - 14} textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted}>{index + 1}</text>
            </g>
          );
        })}
        <CoursePaths plate={plate} courses={courses} startPleat={1} endPleat={endPleat} showHidden showOrder />
        {plate.repeatPleats > 1 && !fullWidth && (
          <g>
            {[LEFT, LEFT + plate.repeatPleats * PLEAT_WIDTH].map((x) => (
              <line key={x} x1={x} y1={TOP - 8} x2={x} y2={TOP + plate.rows * ROW_HEIGHT + 8} stroke={ILLUSTRATION.gold} strokeWidth="1.5" strokeDasharray="5 3" />
            ))}
            <text x={LEFT + plate.repeatPleats * PLEAT_WIDTH / 2} y={height - 15} textAnchor="middle" fontSize="11" fontWeight="700" fill={ILLUSTRATION.gold}>ONE REPEAT</text>
          </g>
        )}
        {fullWidth && (
          <g>
            <line x1={centerX} y1={TOP - 18} x2={centerX} y2={TOP + plate.rows * ROW_HEIGHT + 10} stroke={ILLUSTRATION.burgundy} strokeWidth="2" strokeDasharray="6 4" />
            <text x={centerX} y={height - 14} textAnchor="middle" fontSize="11" fontWeight="700" fill={ILLUSTRATION.burgundy}>CENTER VALLEY</text>
          </g>
        )}
      </svg>
      <div className="mt-4 grid gap-2 text-sm text-ink-muted sm:grid-cols-2">
        {courses.map((course, index) => (
          <div key={course.id} className="flex items-start gap-2">
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: threadColor(plate, course.threadId) }}>{index + 1}</span>
            <span><strong className="font-medium text-ink">{course.label}</strong><br />Work {course.direction.replaceAll("-", " ")}.</span>
          </div>
        ))}
        <div className="flex items-center gap-2"><span className="w-8 border-t-2 border-dashed border-ink-faint" />Dashed line = hidden travel inside the pleat.</div>
        <div className="flex items-center gap-2"><span className="text-lg">⌒</span>Arc = catch the marked pleat pair together.</div>
      </div>
    </IllustrationFrame>
  );
}

export function PlateFinishedPreview({ plate: sourcePlate }: { plate: PlateMeta }) {
  const plate = useColorwayPlate(sourcePlate);
  const courses = getPlateCourses(plate);
  const width = LEFT * 2 + plate.pleats * PLEAT_WIDTH;
  const height = TOP + plate.rows * ROW_HEIGHT + 24;

  return (
    <IllustrationFrame caption={`Complete ${plate.pleats}-pleat stitched sample · scroll sideways on mobile`}>
      <svg viewBox={`0 0 ${width} ${height}`} width={width} style={{ minWidth: width }} className="h-auto max-w-none" role="img" aria-label={`Finished stitched sample for ${plate.title}`}>
        <defs>
          <linearGradient id={`pleat-${plate.slug}`} x1="0" x2="1">
            <stop offset="0" stopColor={ILLUSTRATION.fabricShadow} />
            <stop offset=".5" stopColor={ILLUSTRATION.mountain} />
            <stop offset="1" stopColor={ILLUSTRATION.fabricShadow} />
          </linearGradient>
        </defs>
        <rect width={width} height={height} rx="8" fill={ILLUSTRATION.fabric} />
        {Array.from({ length: plate.pleats }, (_, index) => (
          <rect key={index} x={LEFT + index * PLEAT_WIDTH} y={TOP} width={PLEAT_WIDTH} height={plate.rows * ROW_HEIGHT} fill={`url(#pleat-${plate.slug})`} opacity={index % 2 ? ".55" : ".9"} />
        ))}
        <CoursePaths plate={plate} courses={courses} startPleat={1} endPleat={plate.pleats} showHidden={false} showOrder={false} />
      </svg>
    </IllustrationFrame>
  );
}

export function PlateProgression({ plate: sourcePlate }: { plate: PlateMeta }) {
  const plate = useColorwayPlate(sourcePlate);
  const courses = getPlateCourses(plate);
  const shown = plate.repeatPleats > 1 ? Math.min(plate.repeatPleats + 1, plate.pleats) : Math.min(12, plate.pleats);
  const width = LEFT + shown * PLEAT_WIDTH + 20;
  const height = TOP + plate.rows * ROW_HEIGHT + 16;
  return (
    <div className="mt-5 grid gap-3 lg:grid-cols-3">
      {[0, Math.max(1, Math.ceil(courses.length / 2)), courses.length].map((count, index) => (
        <figure key={index} className="overflow-x-auto rounded border border-border bg-paper/60 p-2">
          <svg viewBox={`0 0 ${width} ${height}`} width={width} style={{ minWidth: width }} className="h-auto max-w-none" role="img" aria-label={["Blank pleats", "Foundation in progress", "Finished repeat"][index]}>
            <rect width={width} height={height} fill={ILLUSTRATION.fabric} />
            {Array.from({ length: shown }, (_, pleat) => {
              const x = LEFT + pleat * PLEAT_WIDTH + PLEAT_WIDTH / 2;
              return <path key={pleat} d={`M${x - 14} ${TOP} Q${x} ${TOP + 10} ${x + 14} ${TOP} V${height - 10} Q${x} ${height - 20} ${x - 14} ${height - 10}Z`} fill={pleat % 2 ? ILLUSTRATION.fabric : ILLUSTRATION.mountain} stroke={ILLUSTRATION.fabricShadow} strokeWidth=".5" />;
            })}
            <CoursePaths plate={plate} courses={courses.slice(0, count)} startPleat={1} endPleat={shown} showHidden={index === 1} showOrder={index === 1} />
          </svg>
          <figcaption className="px-1 py-2 text-sm text-ink-muted">{index + 1} · {["Blank pleats", "Foundation in progress", "Finished repeat"][index]}</figcaption>
        </figure>
      ))}
    </div>
  );
}
