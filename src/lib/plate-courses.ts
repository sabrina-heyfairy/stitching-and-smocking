import type { PlateMeta, PlateStitchRef } from "./plate-types";

export interface CoursePoint {
  pleat: number;
  /** Gathering-row coordinate; fractional values sit between gathering rows. */
  row: number;
}

export type SegmentRole = "level" | "interval" | "closure" | "travel" | "lock";

export interface CourseSegment {
  from: CoursePoint;
  to: CoursePoint;
  role: SegmentRole;
  /** Hidden inside a pleat or on the wrong side. */
  hidden?: boolean;
  /** Whether the working thread stays above or below the needle. */
  threadSide?: "above" | "below";
  /** Adjacent pleats caught as a pair. */
  bind?: [number, number];
  /** Multiple passes through the same pair, as in Van Dyke locks. */
  passes?: number;
  /** Preserve a crisp diagonal instead of easing the interval. */
  straight?: boolean;
}

export interface PlateCourse {
  id: string;
  label: string;
  stitch: PlateStitchRef;
  threadId: string;
  direction: "left-to-right" | "right-to-left";
  segments: CourseSegment[];
}

function cord(
  id: string,
  label: string,
  stitch: "cable-stitch" | "outline-stitch" | "stem-stitch-smocking",
  threadId: string,
  row: number,
  pleats: number,
): PlateCourse {
  const segments: CourseSegment[] = [];
  for (let pleat = 1; pleat < pleats; pleat++) {
    const threadSide = stitch === "cable-stitch"
      ? (pleat % 2 ? "above" : "below")
      : stitch === "outline-stitch" ? "above" : "below";
    segments.push({
      from: { pleat, row },
      to: { pleat: pleat + 1, row },
      role: "level",
      threadSide,
    });
  }
  return { id, label, stitch, threadId, direction: "left-to-right", segments };
}

/**
 * A stepped wave with a level closure stitch at each turn.
 * A wave of four occupies ten pleat intervals: four up, one closure,
 * four down, one closure.
 */
function steppedWave(
  id: string,
  label: string,
  threadId: string,
  upperRow: number,
  lowerRow: number,
  pleats: number,
  steps = 4,
  startAt: "upper" | "lower" = "lower",
  stitch: PlateStitchRef = "wave-stitch",
): PlateCourse {
  const segments: CourseSegment[] = [];
  let pleat = 1;
  let row = startAt === "lower" ? lowerRow : upperRow;
  let movingUp = startAt === "lower";
  while (pleat < pleats) {
    for (let step = 0; step < steps && pleat < pleats; step++) {
      const nextRow = row + (movingUp ? -1 : 1) * ((lowerRow - upperRow) / steps);
      segments.push({
        from: { pleat, row },
        to: { pleat: pleat + 1, row: nextRow },
        role: "interval",
        threadSide: movingUp ? "below" : "above",
      });
      pleat += 1;
      row = nextRow;
    }
    if (pleat < pleats) {
      segments.push({
        from: { pleat, row },
        to: { pleat: pleat + 1, row },
        role: "closure",
        threadSide: movingUp ? "above" : "below",
      });
      pleat += 1;
    }
    movingUp = !movingUp;
  }
  return { id, label, stitch, threadId, direction: "left-to-right", segments };
}

function trellisPair(
  id: string,
  label: string,
  threadId: string,
  upperRow: number,
  middleRow: number,
  lowerRow: number,
  pleats: number,
  steps = 4,
): PlateCourse[] {
  return [
    steppedWave(`${id}-upper`, `${label} · upper closures`, threadId, upperRow, middleRow, pleats, steps, "lower", "trellis"),
    steppedWave(`${id}-lower`, `${label} · lower closures`, threadId, middleRow, lowerRow, pleats, steps, "upper", "trellis"),
  ];
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
  let previousRow: number | undefined;
  for (let leftPleat = 1; leftPleat < pleats; leftPleat++) {
    const row = leftPleat % 2 ? bottomRow : topRow;
    if (previousRow !== undefined) {
      segments.push({
        from: { pleat: leftPleat, row: previousRow },
        to: { pleat: leftPleat, row },
        role: "travel",
        hidden: !surface,
      });
    }
    segments.push({
      from: { pleat: leftPleat, row },
      to: { pleat: leftPleat + 1, row },
      role: "lock",
      bind: [leftPleat, leftPleat + 1],
      threadSide: leftPleat % 2 ? "below" : "above",
    });
    previousRow = row;
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
  startAt: "upper" | "lower" = "lower",
): PlateCourse {
  const segments: CourseSegment[] = [];
  let previousRight: CoursePoint | undefined;
  let bindIndex = 0;
  for (let leftPleat = 1; leftPleat < pleats; leftPleat += 4) {
    const rightPleat = leftPleat + 1;
    if (rightPleat > pleats) break;
    const startsLower = startAt === "lower";
    const row = (bindIndex % 2 === 0) === startsLower ? bottomRow : topRow;
    const left = { pleat: leftPleat, row };
    const right = { pleat: rightPleat, row };
    if (previousRight) {
      segments.push({
        from: previousRight,
        to: left,
        role: "interval",
        threadSide: row === topRow ? "below" : "above",
        straight: true,
      });
    }
    segments.push({
      from: left,
      to: right,
      role: "lock",
      bind: [leftPleat, rightPleat],
      threadSide: row === topRow ? "above" : "below",
      passes: 2,
    });
    previousRight = right;
    bindIndex += 1;
  }
  return { id, label, stitch: "van-dyke", threadId, direction: "left-to-right", segments };
}

function cable(row: number, plate: PlateMeta, threadId = plate.threads[0].id, id = `cable-${row}`) {
  return cord(id, `Cable on gathering row ${row}`, "cable-stitch", threadId, row, plate.pleats);
}

export function getPlateCourses(plate: PlateMeta): PlateCourse[] {
  const first = plate.threads[0]?.id ?? "a";
  const second = plate.threads[1]?.id ?? first;
  switch (plate.slug) {
    case "cable-borders":
      return [cable(1, plate), cable(5, plate)];
    case "wave-between-cables":
      return [cable(1, plate), steppedWave("wave", "Wave of four with turn closures", second, 3, 4, plate.pleats), cable(6, plate)];
    case "classic-trellis":
      return [cable(1, plate), ...trellisPair("trellis", "Diamond trellis", second, 3, 4, 5, plate.pleats), cable(7, plate)];
    case "honeycomb-yoke":
      return [cable(1, plate), honeycomb("honeycomb", "Overlapping honeycomb binds", second, 3, 4, plate.pleats), cable(6, plate)];
    case "outline-and-stem-bands":
      return [
        cord("outline", "Outline stitch · thread above", "outline-stitch", first, 2, plate.pleats),
        cord("stem", "Stem stitch · thread below", "stem-stitch-smocking", second, 4, plate.pleats),
      ];
    case "van-dyke-accent":
      return [cable(1, plate), vanDyke("van-dyke", "Broad Van Dyke chevron with pair-locked turns", second, 3, 4, plate.pleats), cable(6, plate)];
    case "baby-bishop-starter":
      return [cable(1, plate), steppedWave("baby-wave", "Wave of two with turn closures", first, 2, 3, plate.pleats, 2), cable(4, plate)];
    case "surface-honeycomb-band":
      return [cable(1, plate), honeycomb("surface-honeycomb", "Overlapping binds with visible surface carries", second, 3, 4, plate.pleats, true), cable(6, plate)];
    case "double-cable-wave":
      return [
        cable(1, plate),
        steppedWave("upper-wave", "Upper wave with closures", second, 1.7, 2.5, plate.pleats),
        cable(3, plate, first, "cable-3"),
        steppedWave("lower-wave", "Lower wave with closures", second, 3.5, 4.3, plate.pleats, 4, "upper"),
        cable(5, plate, first, "cable-5"),
      ];
    case "christening-trellis":
      return [
        cable(1, plate),
        ...trellisPair("christening-trellis", "Long diamond trellis", second, 3, 4.5, 6, plate.pleats),
        cable(8, plate),
      ];
    case "sampler-five-row":
      return [
        cable(1, plate),
        cord("outline", "Outline stitch · thread above", "outline-stitch", second, 2, plate.pleats),
        steppedWave("baby-wave", "Wave of two with closures", second, 2.6, 3.4, plate.pleats, 2),
        cord("stem", "Stem stitch · thread below", "stem-stitch-smocking", second, 4, plate.pleats),
        cable(5, plate),
      ];
    case "sleeve-band-mini":
      return [
        cable(1, plate),
        cord("outline", "Outline stitch · thread above", "outline-stitch", first, 2, plate.pleats),
        cable(3, plate, first, "cable-3"),
      ];
    case "wave-of-three-between-cables":
      return [cable(1, plate), steppedWave("wave-three", "Wave of three with turn closures", second, 3, 4, plate.pleats, 3), cable(6, plate)];
    case "outline-framed-baby-wave":
      return [
        cord("outline-1", "Upper outline frame · thread above", "outline-stitch", first, 1, plate.pleats),
        steppedWave("baby-wave", "Wave of two with turn closures", second, 2, 3, plate.pleats, 2),
        cord("outline-4", "Lower outline frame · thread above", "outline-stitch", first, 4, plate.pleats),
      ];
    case "stem-framed-wave-of-three":
      return [
        cord("stem-1", "Upper stem frame · thread below", "stem-stitch-smocking", first, 1, plate.pleats),
        steppedWave("wave-three", "Wave of three with turn closures", second, 3, 4, plate.pleats, 3),
        cord("stem-6", "Lower stem frame · thread below", "stem-stitch-smocking", first, 6, plate.pleats),
      ];
    case "opposed-baby-wave-band":
      return [
        cable(1, plate),
        steppedWave("upper-baby-wave", "Upper baby wave", second, 2, 3, plate.pleats, 2),
        steppedWave("lower-baby-wave", "Opposed lower baby wave", second, 5, 6, plate.pleats, 2, "upper"),
        cable(7, plate, first, "cable-7"),
      ];
    case "five-row-control-band":
      return [
        cable(1, plate),
        cord("outline", "Outline · thread above", "outline-stitch", second, 2, plate.pleats),
        cable(3, plate, first, "cable-3"),
        cord("stem", "Stem · thread below", "stem-stitch-smocking", second, 4, plate.pleats),
        cable(5, plate, first, "cable-5"),
      ];
    case "triple-cable-border":
      return [cable(1, plate), cable(2, plate, first, "cable-2"), cable(3, plate, first, "cable-3")];
    case "stem-cuff-band":
      return [
        cable(1, plate),
        cord("stem", "Center stem cord · thread below", "stem-stitch-smocking", second, 2, plate.pleats),
        cable(3, plate, first, "cable-3"),
      ];
    case "small-diamond-trellis":
      return [cable(1, plate), ...trellisPair("small-trellis", "Small diamond trellis", second, 2, 3, 4, plate.pleats, 2), cable(6, plate)];
    case "medium-diamond-trellis":
      return [cable(1, plate), ...trellisPair("medium-trellis", "Medium diamond trellis", second, 2, 4, 6, plate.pleats, 3), cable(7, plate)];
    case "double-small-trellis":
      return [
        cable(1, plate),
        ...trellisPair("upper-trellis", "Upper small trellis", second, 2, 3, 4, plate.pleats, 2),
        ...trellisPair("lower-trellis", "Lower small trellis", second, 6, 7, 8, plate.pleats, 2),
        cable(9, plate, first, "cable-9"),
      ];
    case "cable-divided-trellis":
      return [
        cable(1, plate),
        ...trellisPair("upper-trellis", "Upper small trellis", second, 2, 3, 4, plate.pleats, 2),
        cable(5, plate, first, "cable-5"),
        ...trellisPair("lower-trellis", "Lower small trellis", second, 6, 7, 8, plate.pleats, 2),
        cable(9, plate, first, "cable-9"),
      ];
    case "bonnet-trellis-band":
      return [
        cord("outline-1", "Upper outline frame", "outline-stitch", first, 1, plate.pleats),
        ...trellisPair("bonnet-trellis", "Small bonnet trellis", second, 2, 3, 4, plate.pleats, 2),
        cord("outline-5", "Lower outline frame", "outline-stitch", first, 5, plate.pleats),
      ];
    case "two-tier-honeycomb-yoke":
      return [
        cable(1, plate),
        honeycomb("upper-honeycomb", "Upper overlapping honeycomb", second, 2, 3, plate.pleats),
        honeycomb("lower-honeycomb", "Lower overlapping honeycomb", second, 5, 6, plate.pleats),
        cable(8, plate, first, "cable-8"),
      ];
    case "cable-divided-honeycomb":
      return [
        cable(1, plate),
        honeycomb("upper-honeycomb", "Upper overlapping honeycomb", second, 2, 3, plate.pleats),
        cable(4, plate, first, "cable-4"),
        honeycomb("lower-honeycomb", "Lower overlapping honeycomb", second, 5, 6, plate.pleats),
        cable(7, plate, first, "cable-7"),
      ];
    case "outline-framed-honeycomb-band":
      return [
        cord("outline-1", "Upper outline frame", "outline-stitch", first, 1, plate.pleats),
        honeycomb("honeycomb", "Overlapping honeycomb", second, 2, 3, plate.pleats),
        cord("outline-4", "Lower outline frame", "outline-stitch", first, 4, plate.pleats),
      ];
    case "trellis-and-honeycomb-yoke":
      return [
        cable(1, plate),
        ...trellisPair("small-trellis", "Small upper trellis", second, 2, 3, 4, plate.pleats, 2),
        honeycomb("honeycomb", "Lower overlapping honeycomb", second, 6, 7, plate.pleats),
        cable(9, plate, first, "cable-9"),
      ];
    case "outline-framed-van-dyke":
      return [
        cord("outline-1", "Upper outline frame", "outline-stitch", first, 1, plate.pleats),
        vanDyke("van-dyke", "Pair-locked Van Dyke chevron", second, 3, 4, plate.pleats),
        cord("outline-6", "Lower outline frame", "outline-stitch", first, 6, plate.pleats),
      ];
    case "double-van-dyke-band":
      return [
        cable(1, plate),
        vanDyke("upper-van-dyke", "Upper Van Dyke chevron", second, 3, 4, plate.pleats),
        cable(5, plate, first, "cable-5"),
        vanDyke("lower-van-dyke", "Opposed lower Van Dyke chevron", second, 6, 7, plate.pleats, "upper"),
        cable(9, plate, first, "cable-9"),
      ];
    default:
      return [];
  }
}

export function validatePlateCourses(plate: PlateMeta): string[] {
  const errors: string[] = [];
  const threadIds = new Set(plate.threads.map((thread) => thread.id));
  const courses = getPlateCourses(plate);
  if (courses.length === 0) errors.push("has no stitch courses");
  for (const course of courses) {
    if (!threadIds.has(course.threadId)) errors.push(`${course.id} references missing thread ${course.threadId}`);
    if (course.segments.length === 0) errors.push(`${course.id} has no segments`);
    for (const [index, segment] of course.segments.entries()) {
      for (const point of [segment.from, segment.to]) {
        if (point.pleat < 1 || point.pleat > plate.pleats) {
          errors.push(`${course.id} segment ${index} uses pleat ${point.pleat} outside 1–${plate.pleats}`);
        }
        if (point.row < 0.5 || point.row > plate.rows + 0.5) {
          errors.push(`${course.id} segment ${index} uses row ${point.row} outside the plate`);
        }
      }
    }
    if (course.stitch === "honeycomb" && course.segments.some((segment) => segment.role === "travel" && !segment.hidden)) {
      errors.push(`${course.id} exposes classic honeycomb travel`);
    }
    if (course.stitch === "surface-honeycomb" && course.segments.some((segment) => segment.role === "travel" && segment.hidden)) {
      errors.push(`${course.id} hides surface honeycomb travel`);
    }
  }
  return errors;
}

