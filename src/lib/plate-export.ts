import type { PlateMeta } from "./plate-types";
import { getPlateCell } from "./plate-types";

const escape = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] ?? char);

export function plateSvg(plate: PlateMeta, monochrome = false): string {
  const cell = 22;
  const left = 54;
  const top = 48;
  const width = left + plate.pleats * cell + 24;
  const height = top + plate.rows * cell + 64;
  const ink = monochrome ? "#111111" : "#403b36";
  const fabric = monochrome ? "#ffffff" : "#faf7ef";
  const center = left + (plate.pleats * cell) / 2;
  const cells: string[] = [];

  for (let row = 1; row <= plate.rows; row++) {
    cells.push(`<text x="${left - 10}" y="${top + (row - 0.5) * cell + 3}" text-anchor="end" class="small">R${row}</text>`);
    for (let pleat = 1; pleat <= plate.pleats; pleat++) {
      const item = getPlateCell(plate, row, pleat);
      const x = left + (pleat - 1) * cell;
      const y = top + (row - 1) * cell;
      const color = monochrome ? ink : item.kind === "empty" ? fabric : (item.color ?? ink);
      const symbol = ({ cable: "C", outline: "O", stem: "S", "wave-up": "↗", "wave-down": "↘", honeycomb: "H", trellis: "T", "van-dyke": "V", surface: "E", knot: "•", empty: "" } as const)[item.kind];
      cells.push(`<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${item.kind === "empty" ? fabric : `${color}22`}" stroke="#aaa" stroke-width=".6"/>`);
      if (item.kind !== "empty") {
        cells.push(`<circle cx="${x + cell / 2}" cy="${y + cell / 2}" r="6" fill="${color}"/><text x="${x + cell / 2}" y="${y + cell / 2 + 3}" text-anchor="middle" class="symbol">${symbol}</text>`);
      }
    }
  }

  const pleatNumbers = Array.from({ length: plate.pleats }, (_, i) =>
    `<text x="${left + i * cell + cell / 2}" y="${top - 10}" text-anchor="middle" class="tiny">${i + 1}</text>`,
  ).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${escape(plate.title)} smocking graph">
  <style>text{font-family:Georgia,serif;fill:${ink}}.small{font-size:9px}.tiny{font-size:7px}.symbol{font:700 7px Arial,sans-serif;fill:${monochrome ? "#fff" : "#fff"}}</style>
  <rect width="100%" height="100%" fill="${fabric}"/>
  <text x="${left}" y="23" font-size="16" font-weight="700">${escape(plate.title)}</text>
  <text x="${left}" y="37" class="small">${plate.rows} rows · ${plate.pleats} pleats · ${plate.repeatPleats}-pleat repeat</text>
  ${pleatNumbers}${cells.join("")}
  <line x1="${left}" y1="${top - 5}" x2="${left}" y2="${top + plate.rows * cell + 5}" stroke="${ink}" stroke-dasharray="3 2"/>
  <line x1="${left + plate.repeatPleats * cell}" y1="${top - 5}" x2="${left + plate.repeatPleats * cell}" y2="${top + plate.rows * cell + 5}" stroke="${ink}" stroke-dasharray="3 2"/>
  <text x="${left + plate.repeatPleats * cell / 2}" y="${height - 26}" text-anchor="middle" class="small">REPEAT</text>
  <line x1="${center}" y1="${top - 14}" x2="${center}" y2="${top + plate.rows * cell + 12}" stroke="${monochrome ? ink : "#9d4e52"}" stroke-width="1.5" stroke-dasharray="5 3"/>
  <text x="${center}" y="${height - 10}" text-anchor="middle" class="small">CENTER LINE</text>
  </svg>`;
}

export function plateHtml(plate: PlateMeta): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${escape(plate.title)}</title>
<style>body{max-width:1000px;margin:32px auto;padding:0 24px;color:#403b36;font:15px/1.5 Georgia,serif}h1{margin-bottom:4px}dl{display:grid;grid-template-columns:12rem 1fr;gap:6px}svg{max-width:100%;height:auto}.page{break-after:page}@media print{button{display:none}body{margin:0}}</style></head>
<body><button onclick="print()">Print / save PDF</button><h1>${escape(plate.title)}</h1><p>${escape(plate.description)}</p>
<dl><dt>Difficulty</dt><dd>${plate.difficulty}</dd><dt>Finished width</dt><dd>${plate.finishedWidth ?? "Sample to fit"}</dd><dt>Fabric before pleating</dt><dd>${plate.fabricWidth ?? "3× finished width"}</dd><dt>Pleats / rows</dt><dd>${plate.pleats} / ${plate.rows}</dd><dt>Center line</dt><dd>${escape(plate.centerLine ?? "Center valley")}</dd><dt>Repeat</dt><dd>${plate.repeatPleats} pleats</dd><dt>Symmetry</dt><dd>${escape(plate.symmetry ?? "Mirror repeat")}</dd><dt>Thread</dt><dd>${escape(plate.threadWeight ?? "3 strands cotton floss")}</dd></dl>
<div class="page">${plateSvg(plate)}</div><h2>Black-and-white template</h2>${plateSvg(plate, true)}
<h2>Working order</h2><ol>${plate.instructions.map((step) => `<li>${escape(step)}</li>`).join("")}</ol></body></html>`;
}

export function downloadText(filename: string, content: string, type: string): void {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([content], { type }));
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

export async function downloadPng(plate: PlateMeta): Promise<void> {
  const svg = plateSvg(plate);
  const image = new Image();
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
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

export function printPlatePdf(plate: PlateMeta): void {
  const popup = window.open("", "_blank");
  if (!popup) return;
  popup.document.write(plateHtml(plate));
  popup.document.close();
  popup.addEventListener("load", () => popup.print(), { once: true });
}

