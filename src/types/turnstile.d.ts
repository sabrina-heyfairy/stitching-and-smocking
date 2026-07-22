export {};

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: {
        sitekey: string;
        callback: (token: string) => void;
        "expired-callback": () => void;
        theme: "auto" | "light" | "dark";
      }) => string;
      reset: (widgetId: string) => void;
    };
  }
}
