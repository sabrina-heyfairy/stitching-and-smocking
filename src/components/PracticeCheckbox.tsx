"use client";

import { useEffect, useState } from "react";

export function PracticeCheckbox({ id, label }: { id: string; label: string }) {
  const storageKey = `smocking-practice:${id}`;
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      setChecked(window.localStorage.getItem(storageKey) === "done");
    } catch {
      // Keep the checklist usable when Safari blocks persistent storage.
    }
  }, [storageKey]);

  return (
    <span className="flex min-h-11 min-w-11 shrink-0 items-start justify-center pt-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => {
          setChecked(event.target.checked);
          try {
            if (event.target.checked) window.localStorage.setItem(storageKey, "done");
            else window.localStorage.removeItem(storageKey);
          } catch {
            // The checkbox still works for this page when persistence is unavailable.
          }
        }}
        className="h-5 w-5 accent-[var(--burgundy)] print:accent-black"
        aria-label={`Mark complete: ${label}`}
      />
    </span>
  );
}

