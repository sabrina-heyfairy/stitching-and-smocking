import type { PlateMeta } from "./plate-types";
import type { CourseSegment, PlateCourse } from "./plate-courses";

export function compilePictureCourses(plate: PlateMeta): PlateCourse[] {
  const chart = plate.pictureChart;
  if (!chart) return [];

  const courses: PlateCourse[] = [];
  chart.grid.forEach((line, rowIndex) => {
    const row = rowIndex + 1;
    for (const [symbol, threadId] of Object.entries(chart.legend)) {
      const segments: CourseSegment[] = [];
      [...line].forEach((cell, columnIndex) => {
        if (cell !== symbol) return;
        const pleat = columnIndex + 1;
        segments.push({
          from: { pleat, row },
          to: { pleat: pleat + 1, row },
          role: "level",
          threadSide: (row + pleat) % 2 ? "above" : "below",
        });
      });
      if (segments.length > 0) {
        courses.push({
          id: `picture-r${row}-${symbol}`,
          label: `Picture row ${row} · ${plate.threads.find((thread) => thread.id === threadId)?.name ?? threadId}`,
          stitch: "cable-stitch",
          threadId,
          direction: row % 2 ? "left-to-right" : "right-to-left",
          segments,
        });
      }
    }
  });

  for (const [index, backRow] of (chart.backSmocking ?? []).entries()) {
    const from = backRow.fromPleat ?? 1;
    const to = backRow.toPleat ?? plate.pleats;
    const segments: CourseSegment[] = [];
    for (let pleat = from; pleat < to; pleat++) {
      segments.push({
        from: { pleat, row: backRow.row },
        to: { pleat: pleat + 1, row: backRow.row },
        role: "level",
        hidden: true,
        threadSide: pleat % 2 ? "above" : "below",
      });
    }
    courses.push({
      id: `back-smocking-${index + 1}`,
      label: `Back-smocking row ${backRow.row}`,
      stitch: "cable-stitch",
      threadId: backRow.threadId,
      direction: "left-to-right",
      segments,
    });
  }

  return courses;
}

export function validatePictureChart(plate: PlateMeta): string[] {
  const chart = plate.pictureChart;
  if (!chart) return [];

  const errors: string[] = [];
  const expectedWidth = plate.pleats - 1;
  const threadIds = new Set(plate.threads.map((thread) => thread.id));
  if (chart.grid.length !== plate.rows) {
    errors.push(`picture chart has ${chart.grid.length} rows; expected ${plate.rows}`);
  }
  chart.grid.forEach((line, rowIndex) => {
    if ([...line].length !== expectedWidth) {
      errors.push(`picture row ${rowIndex + 1} has ${[...line].length} cells; expected ${expectedWidth}`);
    }
    for (const symbol of new Set([...line].filter((cell) => cell !== "."))) {
      if (!chart.legend[symbol]) errors.push(`picture row ${rowIndex + 1} uses undefined symbol ${symbol}`);
    }
  });
  for (const [symbol, threadId] of Object.entries(chart.legend)) {
    if ([...symbol].length !== 1 || symbol === ".") errors.push(`picture legend symbol ${symbol} must be one non-dot character`);
    if (!threadIds.has(threadId)) errors.push(`picture symbol ${symbol} references missing thread ${threadId}`);
  }
  for (const [index, row] of (chart.backSmocking ?? []).entries()) {
    if (!threadIds.has(row.threadId)) errors.push(`back-smocking row ${index + 1} references missing thread ${row.threadId}`);
    if (row.row < 1 || row.row > plate.rows) errors.push(`back-smocking row ${row.row} is outside 1–${plate.rows}`);
    if ((row.fromPleat ?? 1) < 1 || (row.toPleat ?? plate.pleats) > plate.pleats) {
      errors.push(`back-smocking row ${row.row} exceeds the plate width`);
    }
  }
  return errors;
}
