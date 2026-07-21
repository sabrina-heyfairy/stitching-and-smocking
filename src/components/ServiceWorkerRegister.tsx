"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    const isLocal =
      window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    // Register in production builds; skip noisy reloads on local unless explicitly wanted
    if (process.env.NODE_ENV === "production" || isLocal) {
      const nextScript = document.querySelector<HTMLScriptElement>('script[src*="/_next/"]');
      const scriptSource = nextScript?.getAttribute("src") ?? "";
      const nextIndex = scriptSource.indexOf("/_next/");
      const basePath = nextIndex >= 0 ? scriptSource.slice(0, nextIndex) : "";
      navigator.serviceWorker.register(`${basePath}/sw.js`, { scope: `${basePath}/` }).catch(() => {
        /* Ignore registration failures on file://. */
      });
    }
  }, []);
  return null;
}
