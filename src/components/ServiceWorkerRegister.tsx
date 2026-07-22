"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    const isLocal =
      window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    // Register in production builds; skip noisy reloads on local unless explicitly wanted
    if (process.env.NODE_ENV === "production" || isLocal) {
      const hadController = Boolean(navigator.serviceWorker.controller);
      let reloading = false;
      const handleControllerChange = () => {
        if (!hadController || reloading) return;
        reloading = true;
        window.location.reload();
      };
      const nextScript = document.querySelector<HTMLScriptElement>('script[src*="/_next/"]');
      const scriptSource = nextScript?.getAttribute("src") ?? "";
      const nextIndex = scriptSource.indexOf("/_next/");
      const basePath = nextIndex >= 0 ? scriptSource.slice(0, nextIndex) : "";
      navigator.serviceWorker.addEventListener("controllerchange", handleControllerChange);
      navigator.serviceWorker
        .register(`${basePath}/sw.js`, { scope: `${basePath}/` })
        .then((registration) => registration.update())
        .catch(() => {
          /* Ignore registration failures on file:// or restricted browsers. */
        });
      return () => navigator.serviceWorker.removeEventListener("controllerchange", handleControllerChange);
    }
  }, []);
  return null;
}
