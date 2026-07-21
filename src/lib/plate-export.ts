import type { PlateMeta } from "./plate-types";
import { getPlateCourses } from "./plate-courses";

const escape = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] ?? char);

export function plateSvg(plate: PlateMeta, monochrome = false): string {
  const cell = 24;
  const rowHeight = 36;
  const left = 58;
  const top = 58;
  const width = left + plate.pleats * cell + 28;
  const height = top + plate.rows * rowHeight + 68;
  const ink = "#202020";
  const fabric = monochrome ? "#ffffff" : "#faf7ef";
  const courses = getPlateCourses(plate);
  const x = (pleat: number) => left + (pleat - 1) * cell + cell / 2;
  const y = (row: number) => top + (row - 1) * rowHeight + rowHeight / 2;

  const rowGuides = Array.from({ length: plate.rows }, (_, index) =>
    `<line x1="${left}" y1="${y(index + 1)}" x2="${left + plate.pleats * cell}" y2="${y(index + 1)}" stroke="#aaa" stroke-width=".7" stroke-dasharray="3 4"/><text x="${left - 10}" y="${y(index + 1) + 4}" text-anchor="end" class="label">R${index + 1}</text>`,
  ).join("");
  const pleatGuides = Array.from({ length: plate.pleats }, (_, index) =>
    `<line x1="${x(index + 1)}" y1="${top}" x2="${x(index + 1)}" y2="${top + plate.rows * rowHeight}" stroke="#ccc" stroke-width=".6"/><text x="${x(index + 1)}" y="${top - 13}" text-anchor="middle" class="label">${index + 1}</text>`,
  ).join("");
  const coursePaths = courses.map((course, courseIndex) => {
    const thread = plate.threads.find((item) => item.id === course.threadId);
    const color = monochrome ? ink : (thread?.hex ?? ink);
    const segments = course.segments.map((segment) => {
      const from = { x: x(segment.from.pleat), y: y(segment.from.row) };
      const to = { x: x(segment.to.pleat), y: y(segment.to.row) };
      const side = segment.threadSide === "above" ? -1 : 1;
      const third = (to.x - from.x) / 3;
      const d = segment.straight
        ? `M ${from.x} ${from.y} L ${to.x} ${to.y}`
        : segment.role === "level" || segment.role === "closure" || segment.role === "lock"
        ? `M ${from.x} ${from.y} C ${from.x + third} ${from.y + side * 5}, ${to.x - third} ${to.y + side * 5}, ${to.x} ${to.y}`
        : segment.role === "travel"
          ? `M ${from.x} ${from.y} C ${from.x + (from.x <= to.x ? 5 : -5)} ${from.y}, ${to.x + (from.x <= to.x ? 5 : -5)} ${to.y}, ${to.x} ${to.y}`
          : `M ${from.x} ${from.y} C ${from.x + third} ${from.y}, ${to.x - third} ${to.y}, ${to.x} ${to.y}`;
      const path = `<path d="${d}" fill="none" stroke="${segment.hidden ? "#777" : color}" stroke-width="${segment.hidden ? 1.3 : 3}" ${segment.hidden ? 'stroke-dasharray="5 4"' : ""} stroke-linecap="round"/>`;
      const secondPass = (segment.passes ?? 1) > 1
        ? `<path d="${d}" transform="translate(0 2.4)" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round"/>`
        : "";
      const bind = segment.bind
        ? `<path d="M ${Math.min(from.x, to.x)} ${to.y - 6} Q ${(from.x + to.x) / 2} ${to.y + 7} ${Math.max(from.x, to.x)} ${to.y - 6}" fill="none" stroke="${color}" stroke-width="2"/>`
        : "";
      return path + secondPass + bind;
    }).join("");
    const first = course.segments[0]?.from;
    const order = first
      ? `<circle cx="${x(first.pleat) - 9}" cy="${y(first.row) - 10}" r="9" fill="${color}"/><text x="${x(first.pleat) - 9}" y="${y(first.row) - 7}" text-anchor="middle" class="order">${courseIndex + 1}</text>`
      : "";
    return `<g>${segments}${order}</g>`;
  }).join("");
  const repeatX = left + plate.repeatPleats * cell;
  const centerX = left + (plate.pleats / 2) * cell;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${escape(plate.title)} connected stitch graph">
  <style>text{font-family:Arial,sans-serif;fill:${ink}}.title{font:700 16px Georgia,serif}.label{font-size:9px}.order{font-size:9px;font-weight:700;fill:#fff}</style>
  <rect width="100%" height="100%" fill="${fabric}"/>
  <text x="${left}" y="24" class="title">${escape(plate.title)}</text>
  <text x="${left}" y="41" class="label">${plate.rows} gathering rows · ${plate.pleats} pleats · solid = front stitch · dashed = hidden travel</text>
  ${rowGuides}${pleatGuides}${coursePaths}
  <line x1="${left}" y1="${top - 7}" x2="${left}" y2="${top + plate.rows * rowHeight + 8}" stroke="#9b835f" stroke-dasharray="5 3"/>
  <line x1="${repeatX}" y1="${top - 7}" x2="${repeatX}" y2="${top + plate.rows * rowHeight + 8}" stroke="#9b835f" stroke-dasharray="5 3"/>
  <text x="${left + plate.repeatPleats * cell / 2}" y="${height - 28}" text-anchor="middle" class="label">ONE REPEAT</text>
  <line x1="${centerX}" y1="${top - 12}" x2="${centerX}" y2="${top + plate.rows * rowHeight + 12}" stroke="${monochrome ? ink : "#8e405c"}" stroke-width="1.5" stroke-dasharray="7 4"/>
  <text x="${centerX}" y="${height - 10}" text-anchor="middle" class="label">CENTER VALLEY</text>
  </svg>`;
}

export function plateHtml(plate: PlateMeta): string {
  const courses = getPlateCourses(plate);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${escape(plate.title)}</title>
<style>body{max-width:1100px;margin:32px auto;padding:0 24px;color:#403b36;font:15px/1.5 Georgia,serif}h1{margin-bottom:4px}dl{display:grid;grid-template-columns:12rem 1fr;gap:6px}svg{max-width:none;height:auto}.scroll{overflow-x:auto}.page{break-after:page}.key{display:grid;grid-template-columns:1fr 1fr;gap:8px}@media print{button{display:none}body{margin:0}.scroll{overflow:visible}svg{max-width:100%;width:100%;height:auto}}</style></head>
<body><button onclick="print()">Print / save PDF</button><h1>${escape(plate.title)}</h1><p>${escape(plate.description)}</p>
<dl><dt>Difficulty</dt><dd>${plate.difficulty}</dd><dt>Finished width</dt><dd>${plate.finishedWidth ?? "Calibrate with a sample"}</dd><dt>Fabric before pleating</dt><dd>${plate.fabricWidth ?? "Test fabric compression before cutting"}</dd><dt>Pleats / rows</dt><dd>${plate.pleats} / ${plate.rows}</dd><dt>Center line</dt><dd>${escape(plate.centerLine ?? "Center valley")}</dd><dt>Repeat</dt><dd>${plate.repeatPleats} pleats</dd><dt>Thread</dt><dd>${escape(plate.threadWeight ?? "3 strands cotton floss")}</dd></dl>
<h2>Working graph</h2><div class="scroll page">${plateSvg(plate)}</div>
<h2>Working order</h2><ol>${courses.map((course) => `<li><strong>${escape(course.label)}</strong> — ${course.direction.replaceAll("-", " ")}</li>`).join("")}</ol>
<ol>${plate.instructions.map((step) => `<li>${escape(step)}</li>`).join("")}</ol>
<h2>Thread key</h2><div class="key">${plate.threads.map((thread) => `<div><strong>${escape(thread.name)}</strong> · ${thread.hex}${thread.note ? `<br>${escape(thread.note)}` : ""}</div>`).join("")}</div>
<h2>Black-and-white reference</h2><div class="scroll">${plateSvg(plate, true)}</div></body></html>`;
}

export function downloadText(filename: string, content: string, type: string): void {
  const link = document.createElement("a");
  const url = URL.createObjectURL(new Blob([content], { type }));
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function downloadPng(plate: PlateMeta): Promise<void> {
  const image = new Image();
  const url = URL.createObjectURL(new Blob([plateSvg(plate)], { type: "image/svg+xml" }));
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Unable to render plate"));
    image.src = url;
  });
  const canvas = document.createElement("canvas");
  canvas.width = image.width * 2;
  canvas.height = image.height * 2;
  canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);
  URL.revokeObjectURL(url);
  const link = document.createElement("a");
  link.download = `${plate.slug}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export function printPlatePdf(plate: PlateMeta): boolean {
  const popup = window.open("", "_blank");
  if (!popup) return false;
  popup.document.write(plateHtml(plate));
  popup.document.close();
  popup.addEventListener("load", () => popup.print(), { once: true });
  return true;
}

