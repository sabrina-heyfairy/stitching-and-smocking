import type { Difficulty } from "@/lib/types";
import { clsx } from "clsx";

const styles: Record<Difficulty, string> = {
  beginner: "bg-sage/15 text-sage border-sage/30",
  intermediate: "bg-dusty-blue/15 text-dusty-blue-deep border-dusty-blue/30",
  advanced: "bg-burgundy/10 text-burgundy border-burgundy/25",
};

const labels: Record<Difficulty, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export function DifficultyBadge({
  difficulty,
  className,
}: {
  difficulty: Difficulty;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium tracking-wide",
        styles[difficulty],
        className,
      )}
    >
      {labels[difficulty]}
    </span>
  );
}

export function StatusBadge({
  status,
}: {
  status: "complete" | "template" | "planned" | "in-progress";
}) {
  const map = {
    complete: "Complete",
    template: "Template",
    planned: "Coming soon",
    "in-progress": "In progress",
  };
  return (
    <span className="inline-flex rounded border border-border bg-cream-deep/50 px-2 py-0.5 text-xs text-ink-muted">
      {map[status]}
    </span>
  );
}
