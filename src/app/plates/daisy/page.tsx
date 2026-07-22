import type { Metadata } from "next";
import { DaisyPlateChapter } from "@/components/plates/chapter/DaisyPlateChapter";

export const metadata: Metadata = {
  title: "Daisy Smocking Plate",
  description: "A beginner-readable, interactive chapter for interpreting and stitching the Daisy Smocking Plate on fabric pleated with a Read 16-needle pleater.",
};

export default function DaisyPlatePage() {
  return <DaisyPlateChapter />;
}
