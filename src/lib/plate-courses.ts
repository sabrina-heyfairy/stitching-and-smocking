import type { PlateMeta, PlateStitchRef } from "./plate-types";

export interface CoursePoint {
  pleat: number;
  /** Gathering-row coordinate; halves sit between gathering rows. */
  row: number;
}

export interface CourseSegment {
  from: CoursePoint;
  to: CoursePoint;
  /** Hidden travel inside a pleat or on the wrong side. */
  hidden?: boolean;
  /** Two adjacent pleats are caught together here. */
  bind?: [number, number];
}

export interface PlateCourse {
  id: string;
  label: string;
  stitch: PlateStitchRef;
  threadId: string;
  direction: "left-to-right" | "right-to-left";
  segments: CourseSegment[];
}

function segmentsThrough(points: CoursePoint[]): CourseSegment[] {
  return points.slice(1).map((point, index) => ({ from: points[index], to: point }));
}

function horizontal(
  id: string,
  label: string,
  stitch: PlateStitchRef,
  threadId: string,
  row: number,
  pleats: number,
): PlateCourse {
  const points = Array.from({ length: pleats }, (_, index) => ({
    pleat: index + 1,
    row: row + (index % 2 === 0 ? -0.07 : 0.07),
  }));
  return { id, label, stitch, threadId, direction: "left-to-right", segments: segmentsThrough(points) };
}

function wave(
  id: string,
  label: string,
  threadId: string,
  topRow: number,
  bottomRow: number,
  pleats: number,
  phase = 0,
  stitch: PlateStitchRef = "wave-stitch",
  halfWidth = 4,
): PlateCourse {
  const points = Array.from({ length: pleats }, (_, index) => {
    const period = halfWidth * 2;
    const position = (index + phase) % period;
    const triangle = position <= halfWidth ? position / halfWidth : (period - position) / halfWidth;
    return { pleat: index + 1, row: bottomRow - triangle * (bottomRow - topRow) };
  });
  return { id, label, stitch, threadId, direction: "left-to-right", segments: segmentsThrough(points) };
}

function honeycomb(
  id: string,
  label: string,
  threadId: string,
  topRow: number,
  bottomRow: number,
  pleats: number,
  surface = false,
): PlateCourse {
  const segments: CourseSegment[] = [];
  let last: CoursePoint | undefined;
  for (let pleat = 1; pleat < pleats; pleat += 2) {
    const row = ((pleat - 1) / 2) % 2 === 0 ? bottomRow : topRow;
    const left = { pleat, row };
    const right = { pleat: pleat + 1, row };
    if (last) segments.push({ from: last, to: left, hidden: true });
    segments.push({ from: left, to: right, bind: [pleat, pleat + 1] });
    last = right;
  }
  return {
    id,
    label,
    stitch: surface ? "surface-honeycomb" : "honeycomb",
    threadId,
    direction: "left-to-right",
    segments,
  };
}

function vanDyke(
  id: string,
  label: string,
  threadId: string,
  topRow: number,
  bottomRow: number,
  pleats: number,
): PlateCourse {
  const course = wave(id, label, threadId, topRow, bottomRow, pleats, 0, "van-dyke");
  course.segments = course.segments.map((segment) => {
    const atVertex = segment.to.pleat % 4 === 1;
    return atVertex
      ? { ...segment, bind: [Math.max(1, segment.to.pleat - 1), segment.to.pleat] }
      : segment;
  });
  return course;
}

function cable(row: number, plate: PlateMeta, threadId = plate.threads[0].id, id = `cable-${row}`) {
  return horizontal(id, `Cable on gathering row ${row}`, "cable-stitch", threadId, row, plate.pleats);
}

export function getPlateCourses(plate: PlateMeta): PlateCourse[] {
  const first = plate.threads[0]?.id ?? "a";
  const second = plate.threads[1]?.id ?? first;
  switch (plate.slug) {
    case "cable-borders":
      return [cable(1, plate), cable(5, plate)];
    case "wave-between-cables":
      return [cable(1, plate), wave("wave", "Wave of four", second, 3, 4, plate.pleats), cable(6, plate)];
    case "classic-trellis":
      return [
        cable(1, plate),
        wave("trellis-up", "Upper trellis course", second, 3, 5, plate.pleats),
        wave("trellis-down", "Mirror trellis course", second, 3, 5, plate.pleats, 4, "trellis"),
        cable(7, plate),
      ];
    case "honeycomb-yoke":
      return [cable(1, plate), honeycomb("honeycomb", "Alternating honeycomb binds", second, 3, 4, plate.pleats), cable(6, plate)];
    case "outline-and-stem-bands":
      return [
        horizontal("outline", "Outline stitch", "outline-stitch", first, 2, plate.pleats),
        horizontal("stem", "Stem stitch", "stem-stitch-smocking", second, 4, plate.pleats),
      ];
    case "van-dyke-accent":
      return [cable(1, plate), vanDyke("van-dyke", "Van Dyke course", second, 3, 4, plate.pleats), cable(6, plate)];
    case "baby-bishop-starter":
      return [cable(1, plate), wave("baby-wave", "Wave of two", first, 2, 3, plate.pleats, 0, "wave-stitch", 2), cable(4, plate)];
    case "surface-honeycomb-band":
      return [cable(1, plate), honeycomb("surface-honeycomb", "Surface honeycomb binds", second, 3, 4, plate.pleats, true), cable(6, plate)];
    case "double-cable-wave":
      return [
        cable(1, plate),
        wave("upper-wave", "Upper wave", second, 1.7, 2.5, plate.pleats),
        cable(3, plate, first, "cable-3"),
        wave("lower-wave", "Lower wave", second, 3.5, 4.3, plate.pleats, 4),
        cable(5, plate, first, "cable-5"),
      ];
    case "christening-trellis":
      return [
        cable(1, plate),
        wave("upper-trellis-a", "Upper trellis course", second, 3, 4, plate.pleats),
        wave("upper-trellis-b", "Upper mirror course", second, 3, 4, plate.pleats, 4, "trellis"),
        wave("lower-trellis-a", "Lower trellis course", second, 5, 6, plate.pleats),
        wave("lower-trellis-b", "Lower mirror course", second, 5, 6, plate.pleats, 4, "trellis"),
        cable(8, plate),
      ];
    case "sampler-five-row":
      return [
        cable(1, plate),
        horizontal("outline", "Outline stitch", "outline-stitch", second, 2, plate.pleats),
        wave("baby-wave", "Wave of two", second, 2.6, 3.4, plate.pleats, 0, "wave-stitch", 2),
        horizontal("stem", "Stem stitch", "stem-stitch-smocking", second, 4, plate.pleats),
        cable(5, plate),
      ];
    case "sleeve-band-mini":
      return [
        cable(1, plate),
        horizontal("outline", "Outline stitch", "outline-stitch", first, 2, plate.pleats),
        cable(3, plate, first, "cable-3"),
      ];
    default:
      return [];
  }
}

