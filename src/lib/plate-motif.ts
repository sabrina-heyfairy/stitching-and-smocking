import type { MotifElement, MotifPoint, PlateMeta } from "./plate-types";

interface MotifRenderOptions {
  originX: number;
  originY: number;
  pleatWidth: number;
  rowSpan: number;
  startPleat?: number;
  endPleat?: number;
  monochrome?: boolean;
  finished?: boolean;
}

const point = (
  value: MotifPoint,
  repeatX: number,
  repeatWidth: number,
  originY: number,
  rowSpan: number,
) => ({ x: repeatX + value[0] * repeatWidth, y: originY + value[1] * rowSpan });

function colorFor(plate: PlateMeta, element: MotifElement, monochrome: boolean) {
  if (monochrome) return "#111";
  return plate.threads.find((thread) => thread.id === element.threadId)?.hex ?? "#333";
}

export function plateMotifSvg(plate: PlateMeta, options: MotifRenderOptions): string {
  if (!plate.motif) return "";
  const {
    originX,
    originY,
    pleatWidth,
    rowSpan,
    startPleat = 1,
    endPleat = plate.pleats,
    monochrome = false,
    finished = false,
  } = options;
  const repeatWidth = plate.motif.repeatPleats * pleatWidth;
  const repeatCount = Math.ceil((plate.pleats - 1) / plate.motif.repeatPleats);
  const output: string[] = [];

  for (let repeat = 0; repeat < repeatCount; repeat++) {
    const firstPleat = 1 + repeat * plate.motif.repeatPleats;
    if (firstPleat > endPleat || firstPleat + plate.motif.repeatPleats < startPleat) continue;
    const repeatX = originX + (firstPleat - startPleat) * pleatWidth;
    for (const element of plate.motif.elements) {
      const color = colorFor(plate, element, monochrome);
      if (element.kind === "line") {
        const points = element.points.map((item) => point(item, repeatX, repeatWidth, originY, rowSpan));
        const d = points.map((item, index) => `${index ? "L" : "M"} ${item.x} ${item.y}`).join(" ") + (element.closed ? " Z" : "");
        output.push(`<path d="${d}" fill="none" stroke="${color}" stroke-width="${element.stitch === "straight" ? 2 : 2.6}" stroke-linecap="round" stroke-linejoin="round"/>`);
      } else if (element.kind === "loop") {
        const from = point(element.from, repeatX, repeatWidth, originY, rowSpan);
        const to = point(element.to, repeatX, repeatWidth, originY, rowSpan);
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const length = Math.max(1, Math.hypot(dx, dy));
        const px = (-dy / length) * element.width * repeatWidth;
        const py = (dx / length) * element.width * repeatWidth;
        output.push(`<path d="M ${from.x} ${from.y} Q ${from.x + dx * .55 + px} ${from.y + dy * .55 + py} ${to.x} ${to.y} Q ${from.x + dx * .55 - px} ${from.y + dy * .55 - py} ${from.x} ${from.y}" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round"/>`);
        if (!finished) output.push(`<path d="M ${to.x - dx / length * 4} ${to.y - dy / length * 4} L ${to.x + dx / length * 4} ${to.y + dy / length * 4}" stroke="${color}" stroke-width="1.4"/>`);
      } else if (element.kind === "knot") {
        const at = point(element.at, repeatX, repeatWidth, originY, rowSpan);
        output.push(`<circle cx="${at.x}" cy="${at.y}" r="${2 + element.wraps}" fill="${monochrome && element.wraps === 1 ? "white" : color}" stroke="${color}" stroke-width="1.4"/>`);
      } else if (element.kind === "bullion") {
        const from = point(element.from, repeatX, repeatWidth, originY, rowSpan);
        const to = point(element.to, repeatX, repeatWidth, originY, rowSpan);
        output.push(`<path d="M ${from.x} ${from.y} Q ${(from.x + to.x) / 2} ${(from.y + to.y) / 2 - 4} ${to.x} ${to.y}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round"/>`);
        if (!finished) {
          for (let tick = 1; tick < element.wraps; tick += 2) {
            const ratio = tick / element.wraps;
            const x = from.x + (to.x - from.x) * ratio;
            const y = from.y + (to.y - from.y) * ratio;
            output.push(`<line x1="${x}" y1="${y - 3}" x2="${x}" y2="${y + 3}" stroke="${monochrome ? "white" : "#fff"}" stroke-width=".8" opacity=".75"/>`);
          }
        }
      } else {
        const points = element.points.map((item) => point(item, repeatX, repeatWidth, originY, rowSpan));
        output.push(`<polygon points="${points.map((item) => `${item.x},${item.y}`).join(" ")}" fill="${monochrome ? "none" : color}" fill-opacity=".75" stroke="${color}" stroke-width="1.5"/>`);
      }
    }
  }
  return output.join("");
}

