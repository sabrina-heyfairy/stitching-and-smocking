import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const publicBasePath = process.env.GITHUB_PAGES === "true" && repoName ? `/${repoName}` : "";

export const metadata: Metadata = {
  title: {
    default: "Sabrina's Guide to Smocking & Stitching",
    template: "%s · Sabrina's Guide",
  },
  description:
    "The complete visual encyclopedia for the vintage Read 16-needle smocking pleater and hand smocking — stitches, machine reference, fabrics, and garment construction.",
  applicationName: "Sabrina's Guide to Smocking & Stitching",
  authors: [{ name: "Sabrina Dowling" }],
  keywords: [
    "smocking",
    "English smocking",
    "Read pleater",
    "16-needle pleater",
    "cable stitch",
    "hand smocking",
    "heirloom sewing",
  ],
  manifest: `${publicBasePath}/manifest.webmanifest`,
  appleWebApp: {
    capable: true,
    title: "Sabrina's Smocking Guide",
    statusBarStyle: "default",
  },
  openGraph: {
    title: "Sabrina's Guide to Smocking & Stitching",
    description:
      "The complete visual encyclopedia for the vintage Read 16-needle pleater and hand smocking.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f3eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1a17" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <a
          href="#main-content"
          className="fixed top-2 left-2 z-[100] -translate-y-20 rounded bg-ink px-4 py-3 text-paper transition focus:translate-y-0"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <ServiceWorkerRegister />
          <Header />
          <main id="main-content" className="min-h-[70vh]" tabIndex={-1}>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
