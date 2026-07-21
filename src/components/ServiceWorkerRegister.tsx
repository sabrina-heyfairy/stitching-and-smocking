"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    const isLocal =
      window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    // Register in production builds; skip noisy reloads on local unless explicitly wanted
    if (process.env.NODE_ENV === "production" || isLocal) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* ignore registration failures on file:// or mismatched basePath */
      });
    }
  }, []);
  return null;
}
