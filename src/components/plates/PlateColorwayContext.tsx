"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { PlateMeta } from "@/lib/plate-types";
import { PLATE_COLORWAYS } from "@/lib/plate-colorways";

type ColorwayName = keyof typeof PLATE_COLORWAYS;

interface ColorwayState {
  selected: ColorwayName | null;
  setSelected: (name: ColorwayName | null) => void;
}

const PlateColorwayContext = createContext<ColorwayState | null>(null);

export function PlateColorwayProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<ColorwayName | null>(null);
  const value = useMemo(() => ({ selected, setSelected }), [selected]);
  return <PlateColorwayContext.Provider value={value}>{children}</PlateColorwayContext.Provider>;
}

export function usePlateColorway() {
  return useContext(PlateColorwayContext);
}

export function useColorwayPlate(plate: PlateMeta): PlateMeta {
  const state = usePlateColorway();
  return useMemo(() => {
    if (!state?.selected) return plate;
    const palette = [...PLATE_COLORWAYS[state.selected]].reverse();
    return {
      ...plate,
      threads: plate.threads.map((thread, index) => ({
        ...thread,
        name: `${state.selected} · ${thread.name}`,
        hex: palette[index % palette.length],
      })),
    };
  }, [plate, state?.selected]);
}

